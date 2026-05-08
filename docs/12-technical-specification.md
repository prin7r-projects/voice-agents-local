# 12 · Technical specification

> PickupCraft = per-shop Vapi voice agent + Twilio number + booking integrations + end-of-day digest.
> Wave 2 = landing + checkout. Wave 3 = onboarding flow + per-shop runtime + dashboard.

## 1. Architecture overview

```mermaid
flowchart LR
  Caller[Caller] -- PSTN --> Twilio
  Twilio -- WebSocket --> Vapi
  Vapi -- LLM --> Anthropic[Claude 4.7]
  Vapi -- function call --> Booksy
  Vapi -- function call --> Vagaro
  Vapi -- function call --> Square
  Vapi -- function call --> Dentrix
  Vapi -- function call --> Mindbody
  Vapi -- transcript --> AppAPI[apps/app · Wasp]
  AppAPI -- urgent SMS --> OwnerSMS[Twilio SMS]
  AppAPI -- daily digest --> Postmark
  Owner -- web dashboard --> AppAPI
  AppAPI --> PG[(Postgres)]
  Recordings -- 30 day --> B2[(Backblaze B2)]
  subgraph PublicLanding[apps/landing · Next.js]
    L[Marketing + tier picker]
    CK[/api/checkout/nowpayments]
    WH[/api/webhooks/nowpayments]
    INTAKE[/intake/:token]
  end
  L --> CK --> NP[NOWPayments] --> WH
```

**Topology.** Single VPS (storage-contabo). Vapi + Twilio external. Per-shop config stored in
Postgres; Vapi assistant config replicated via Vapi API.

## 2. Data model

```mermaid
erDiagram
  SHOPS ||--o{ NUMBERS : has
  SHOPS ||--|| SCRIPT_PROFILES : configured_by
  SHOPS ||--o{ CALLS : received
  CALLS ||--o| BOOKINGS : produced
  SHOPS ||--o{ DIGESTS : sent
  SHOPS ||--|| INTEGRATIONS : connects
  SHOPS {
    uuid id PK
    text name
    text industry "salon|plumber|dentist|restaurant|clinic|contractor|..."
    text tz
    jsonb hours "{mon:[9,19], tue:[9,19], ...}"
    text owner_email
    text owner_sms
    text status "onboarding|live|paused|cancelled"
    timestamptz created_at
  }
  NUMBERS {
    uuid id PK
    uuid shop_id FK
    text twilio_phone_number
    text public_business_number "what customers see"
    text status "provisioning|live|forwarded"
  }
  SCRIPT_PROFILES {
    uuid id PK
    uuid shop_id FK
    text vapi_assistant_id
    jsonb pricing
    jsonb urgency_triggers
    text fallback_text
  }
  CALLS {
    uuid id PK
    uuid shop_id FK
    text caller_number
    timestamptz started_at
    int duration_s
    text intent "book|info|emergency|complaint|robocall|other"
    text outcome "booked|escalated|info_only|hung_up"
    text recording_url
    text transcript
  }
  BOOKINGS {
    uuid id PK
    uuid call_id FK UK
    text booking_id "external in Booksy/Vagaro/etc"
    timestamptz scheduled_at
    int amount_cents
  }
  DIGESTS {
    uuid id PK
    uuid shop_id FK
    date day
    int calls_total
    int booked
    int escalated
    timestamptz sent_at
  }
  INTEGRATIONS {
    uuid id PK
    uuid shop_id FK UK
    text booking_provider "booksy|vagaro|square|dentrix|mindbody|toast|resy"
    jsonb oauth_state
    text status "connected|expired|disconnected"
  }
```

Indexes: `shops.status`, `(numbers.twilio_phone_number)` UNIQUE, `calls.started_at`,
`(bookings.call_id)` UNIQUE.

## 3. API contracts

### Public

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/api/checkout/nowpayments` | none | `{plan}` | `{invoice_url}` |
| POST | `/api/webhooks/nowpayments` | HMAC-SHA512 | NOWPayments IPN | `{ok:true}` |
| POST | `/intake/:token` | one-time intake | `{shop config}` | `{shop_id}` |

### Webhook (Vapi → app)

| Method | Path | Auth | Body |
|---|---|---|---|
| POST | `/api/internal/vapi/end-of-call` | shared secret | `{call_id, transcript, duration, intent, outcome, function_calls[]}` |
| POST | `/api/internal/vapi/function-call` | shared secret | `{call_id, function, args}` (booking pass-through) |

### Owner dashboard (Wave 3)

| Method | Path | Auth | Body |
|---|---|---|---|
| GET | `/api/v1/calls` | session(owner) | `?day=` |
| GET | `/api/v1/digests` | session(owner) | — |
| POST | `/api/v1/integrations/oauth/:provider` | session(owner) | OAuth callback |

## 4. Integrations

| 3rd-party | Auth | Rate | Fallback |
|---|---|---|---|
| Vapi | API key | tier | Bland.ai fallback |
| Twilio | account SID + auth token | tier | n/a (we are the line) |
| Anthropic Claude 4.7 | API key | tier | GLM 5.1 fallback |
| Booksy / Vagaro / Square / Dentrix / Mindbody / Toast / Resy | OAuth2 per shop | provider | Manual booking + SMS to owner |
| Postmark | server token | 10k/day | Resend |
| NOWPayments | x-api-key + IPN HMAC | 100 RPM | Manual invoice |

## 5. Storage

- Postgres 16: shops/numbers/calls/bookings/digests/integrations.
- B2: call recordings, 30-day retention; transcripts indefinite.
- PII: caller phone numbers stored; redacted by area-code only in shared logs.
- Audit: every onboarding step, every OAuth rotate, every integration disconnect.

## 6. Auth

- **Wave 2:** anonymous checkout.
- **Wave 3:** Wasp magic-link for owners. Shop-level role per `users.shop_id`. Onboarding
  operator role flag.
- OAuth handshake per booking provider per shop.

## 7. Security

- Secrets in `.env` per shop in DB (libsodium-encrypted booking provider tokens).
- Rate limits: intake 5/hr/IP; OAuth callback 30/min/IP.
- IPN HMAC; idempotent.
- Recording access: signed URLs, 5-min expiry, owner-only.
- PII: PCI-out-of-scope (we do not handle cards on the call).

## 8. Observability

- Pino JSON logs → Loki.
- Metrics: `pickupcraft.call.duration_s`, `pickupcraft.call.intent_distribution`, `pickupcraft.booking.success_rate`,
  `pickupcraft.urgent.sms_lag_s`.
- Alerts: provider OAuth expired; Vapi 4xx > 5/hr; urgent SMS lag > 60s.

## 9. Performance budgets

| Path | p50 | p95 |
|---|---|---|
| Twilio → Vapi pickup | 200ms | 600ms |
| Vapi LLM round-trip | 800ms | 1.8s |
| End-of-call webhook → dashboard | 400ms | 1.2s |
| Booking creation in provider | 1s | 4s |
| Daily digest send | 200ms | 800ms |

Throughput: 100 shops per VPS; 1k concurrent calls cluster-wide.

## 10. Non-goals

- No outbound dialing for marketing.
- No PCI in the agent.
- No multi-month contracts.
- No private-info disclosure.
- No "robotic" voice tier.
- No language translation in Wave 2/3 (Spanish toggle Wave 3 candidate).
- No support for non-listed booking providers (Wave 4).
