# `apps/app/` — Frontline SaaS surface (deferred)

This folder is intentionally empty for Wave 2.

## What lives here eventually

A fork of [`wasp-lang/open-saas`](https://github.com/wasp-lang/open-saas) tuned to Frontline's product:

- **Owner login** (Google OAuth + magic-link). Each owner sees only their shop's calls.
- **Calls inbox** — the day's transcripts, transcripts on demand, redacted audio.
- **Booking pulse** — confirmed appointments, urgent SMS alerts, missed/escalated calls.
- **Voice settings** — opening line, hours, pricing, FAQ overrides. The owner edits the script in plain English; we re-ingest into the live agent.
- **Billing** — base + per-minute usage rendered as a single monthly invoice (NOWPayments hosted, same flow as `apps/landing/api/checkout/nowpayments`).
- **Team seats** — front-desk staff / multi-location owners / accountants.

## Why deferred

Wave 2 ships **per-shop voice agent provisioning by hand** — the desk takes the
order, our voice engineer wires up the Vapi/Bland agent and the Twilio number,
the customer is billed via the NOWPayments invoice generated from the landing,
and we send the day's call digest by email.

That manual loop is intentional: it lets us learn the per-industry quirks
(Square integration vs. Booksy integration vs. Dentrix integration) before we
codify them in a self-serve dashboard. We onboard the dashboard once the
manual loop has settled into a stable shape, expected Wave 3+.

## Skeleton plan

```
apps/app/
├── main.wasp                # Wasp config: app, auth, db (PostgreSQL), entities, routes, jobs
├── src/
│   ├── auth/                # Google OAuth + magic-link wiring
│   ├── client/
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── CallsPage.tsx
│   │   │   ├── VoiceSettingsPage.tsx
│   │   │   └── BillingPage.tsx
│   │   └── components/      # ShadCN re-themed to Frontline tokens (DESIGN.md §4–6)
│   ├── server/
│   │   ├── webhooks/
│   │   │   ├── nowpayments.ts   # IPN → orders table + agent provisioner trigger
│   │   │   ├── twilio.ts        # call status → calls table
│   │   │   └── vapi.ts          # transcript callback → call.transcript
│   │   ├── jobs/
│   │   │   └── nightlyDigest.ts # 6pm local-time digest email
│   │   └── integrations/
│   │       ├── square.ts
│   │       ├── booksy.ts
│   │       ├── vagaro.ts
│   │       ├── dentrix.ts
│   │       ├── housecallpro.ts
│   │       └── opentable.ts
│   └── shared/types.ts
└── DESIGN.md                # apps/app surface DESIGN.md (mirrors root DESIGN.md §3 ShadCN policy)
```

## DESIGN.md commitment

When the SaaS surface lands it will use **shadcn/ui primitives**, re-themed
to the Frontline tokens in the root `DESIGN.md`. No paid component
libraries; no marketing-page expressiveness inside the dashboard. The
expressive aesthetic stays in `apps/landing/`; the dashboard stays
restrained per the Prin7r Component Library Baseline (ShadCN-first).

## What you can do today

- **Get an agent live**: email `desk@prin7r.com` from the landing page CTA. We
  do the provisioning by hand.
- **See the script template**: `docs/03-user-journeys.md` carries the
  per-industry script outlines.
- **Run the landing locally**: see root `README.md`.
