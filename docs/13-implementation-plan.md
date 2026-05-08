# 13 · Implementation plan

> **Hand-off ready.** Read `01`, `02`, `11`, `12` first. Phase 0 (landing + checkout) is COMPLETE.
> Phases 1–6 ship the per-shop runtime + onboarding flow.
>
> **Repo:** https://github.com/prin7r-projects/voice-agents-local
> **Live:** https://voice-agents-local.prin7r.com (landing live as Rollcall)
> **Deploy:** storage-contabo `/opt/prin7r-deploys/voice-agents-local`
> **Secrets:** NOWPAYMENTS_API_KEY, NOWPAYMENTS_IPN_SECRET, POSTMARK_SERVER_TOKEN,
> TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VAPI_API_KEY, ANTHROPIC_API_KEY, ZAI_API_KEY,
> per-provider OAuth secrets, DATABASE_URL.
> **Tone:** Rollcall. Warm. Plainspoken. Steady. See `01-brand-identity.md` §Voice.

## Phase 0 — Wave 2 landing + checkout (DONE)

- ✅ Rollcall brand; canvas #FBFAF7; NOWPayments invoice; live unpaid invoice tested in prod.
  Screenshots in `/docs/screenshots/`.

## Phase 1 — Wasp scaffold + intake form + onboarding queue

- **Goal.** Customer pays → intake link → owner fills shop config → ticket lands in onboarding
  queue.
- **Tasks.**
  1. Wasp app scaffold; magic-link auth.
  2. `POST /intake/:token` form: industry, hours, owner contact, booking provider, pricing,
     urgency triggers, fallback text.
  3. Onboarding queue page for operator with 72h SLA.
- **Deps.** Phase 0; Postmark.
- **Effort.** 130 tool-uses, 6h.
- **DoD.**
  - Marisol scenario A end-to-end up through "ticket lands in queue."

## Phase 2 — Twilio number provisioning + Vapi assistant per-shop

- **Goal.** Operator can provision a Twilio number + create a Vapi assistant from a shop config in
  <30 min.
- **Tasks.**
  1. Twilio API: search and buy a local number for the shop's area code; configure forwarding.
  2. Vapi API: create assistant with shop's industry-specific system prompt + price list +
     urgency triggers + fallback.
  3. Sandbox dial: a test number that the operator can call to QA the agent before greenlight.
- **Deps.** Phase 1; Twilio + Vapi accounts.
- **Effort.** 200 tool-uses, 10h.
- **DoD.**
  - Operator can buy + assign + sandbox-dial a new shop's number end-to-end.
  - Sandbox conversation matches the configured pricing + urgency triggers.

## Phase 3 — Booksy + Vagaro + Square integrations (3 starter providers)

- **Goal.** Bookings flow into the shop's booking software via OAuth + function-call.
- **Tasks.**
  1. OAuth handshake per provider; encrypted token storage.
  2. Vapi function-call adapter: `book(slot, name, phone)` → provider API.
  3. Per-provider ICP test; per-shop sandbox confirms first real booking.
- **Deps.** Phase 2.
- **Effort.** 250 tool-uses, 12h.
- **DoD.**
  - Marisol scenario A end-to-end including real Booksy booking via test call.
  - OAuth-expired flow alerts operator + customer.

## Phase 4 — End-of-call → dashboard + urgent SMS + daily digest

- **Goal.** Owner sees calls; gets urgent SMS within 60s; daily digest at 18:00.
- **Tasks.**
  1. Vapi end-of-call webhook → `calls` row + recording URL.
  2. Urgency detector: keywords + intent classification → SMS to owner via Twilio.
  3. Daily digest cron at 18:00 local per shop.
  4. Owner dashboard: today's calls, recordings, digest history.
- **Deps.** Phase 2.
- **Effort.** 180 tool-uses, 9h.
- **DoD.**
  - Dale scenario B end-to-end: emergency call → SMS within 5 min.
  - Daily digest end-to-end.

## Phase 5 — Cancel + refund + 4 more provider integrations

- **Goal.** Self-serve cancel; per-minute overage billing; expand to Dentrix + Mindbody + Toast +
  Resy.
- **Tasks.**
  1. `/me/subscription` cancel.
  2. Monthly billing cycle: $299 base + $0.15/min over 500 min.
  3. 4 more provider integrations following Phase 3's pattern.
- **Deps.** Phase 3.
- **Effort.** 220 tool-uses, 11h.
- **DoD.**
  - Cancel scenario E end-to-end.
  - 7 booking providers connected via the same adapter pattern.

## Phase 6 — Production polish + ops

- **Goal.** Hit perf budgets; ops dashboard; backups.
- **Tasks.**
  1. Vapi 4xx alerts; OAuth-expiry alerts.
  2. Loki + Grafana.
  3. B2 backup + restore drill.
  4. Lighthouse pass on `/`.
- **Effort.** 130 tool-uses, 6h.
- **DoD.**
  - p95 latencies in `12 §9` met.
  - Restore drill passes.

## Cross-cutting concerns

- **Accessibility:** WCAG AA on owner dashboard.
- **i18n:** EN-only; Spanish toggle Phase 5/6 candidate (deferred).
- **Mobile:** dashboard mobile-readable.
- **Telemetry:** Phase 1 logs; Phase 6 metrics + alerts.

## Risk register

| Risk | Owner | Mitigation |
|---|---|---|
| Vapi outage during peak hours | Eng | Bland.ai fallback adapter; documented procedure. |
| Booking provider API breaks | Eng | Provider-version pinning; CI + sandbox tests; manual booking + SMS fallback. |
| Customer ports their number out | Ops | Documented port-out process; preserve call history; close account cleanly. |
| Recording PII compliance | Ops | 30-day retention; signed URLs; opt-out per call ("do not record" signal). |
| LLM hallucinations on pricing | Eng | Hard-coded price guardrails in system prompt; agent says "let me confirm with the owner" if unsure. |

## Resume instructions

1. `git clone https://github.com/prin7r-projects/voice-agents-local && cd voice-agents-local`
2. Read `01`, `02`, `11`, `12`.
3. Pick the next phase.
