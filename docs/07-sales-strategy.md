# 07 — Sales Strategy

> Hybrid PLG / consultative motion. The website handles discovery and trust; a 30-minute intake call handles activation. The first month settles via NOWPayments hosted invoice.

## Motion overview

- **Self-serve discovery** — landing page does the entire selling job (industry grid, sample call, pricing legible at a glance, anti-feature manifesto).
- **Light-touch human activation** — every sign-up runs through a 30-minute intake call (voice engineer + owner) before the agent goes live. This is non-negotiable in v1: it's how we maintain the per-shop quality bar that beats generic AI receptionists.
- **PLG retention** — once live, the owner sees the agent working; renewal is a no-decision automatic monthly invoice. Cancel any month.
- **Consultative expansion** — Concierge tier is sold by us directly; that's a sales-led conversation about multi-location, custom integrations, audit logs.

So: **PLG funnel front + sales-assist intake + PLG retention back**. The hybrid is the right shape because:

- The owner won't trust a fully-self-serve voice product without hearing it. The intake call is what produces the agent recording she listens to before any caller does.
- A fully sales-led motion is too expensive for a $290–$590/month subscription. We lean PLG as far as the trust-gate allows.

## Pricing tiers (Wave 2)

| Tier | Monthly base | Per-minute (after bucket) | Included minutes | Best for | NOWPayments? |
|---|---|---|---|---|---|
| **After-Hours** | $140 | 26¢ outside business hours | 80 | Plumbers, contractors, vet clinics — capture emergencies only | Yes |
| **Starter** | $290 | 22¢ | 250 | Single-location salon, dental practice, small clinic, single restaurant | Yes |
| **Growth** | $590 | 18¢ | 600 | 2–3 locations, higher-volume practice, restaurant group <5 venues | Yes |
| **Concierge** | Custom | Custom | Custom bucket | Multi-location chains, franchises, agency partners | No — `mailto:` |

### Pricing rationale

- **Floor at $140** for After-Hours: any lower and we lose the ability to keep a Twilio number provisioned and a voice runtime ready. The 80 included minutes covers ~50 evening calls — enough for a 3-truck plumber.
- **Anchor at $290** for Starter: this is the "single shop, full-day" price. We picked $290 because: (a) it sits below the $480/mo most owners pay for a generic answering service; (b) it's just below Booksy Pro + Vagaro Pro stacked together so the owner has mental room; (c) margin-test: assuming 15 minutes/day average call volume × 30 days = 450 minutes minus 250 included = 200 minutes overage at 22¢ = $44, total $334 ARR-ish per shop, against ~$110/shop in Twilio + Vapi + Postmark cost, leaving ~$224 contribution margin per shop per month.
- **Growth at $590** with 600 included: the per-minute drops to 18¢ — we earn it back through volume. 3-location shops pay $590 instead of 3 × $290 = $870; we lose nominal revenue per shop and earn lower CAC by getting one buyer to commit to all three.
- **Per-minute pricing**, not per-call: aligns with how owners do mental math (calls vary by industry; minutes don't). We round to the nearest second, not the nearest minute. This is a small honesty signal.
- **First month upfront via NOWPayments invoice**: settles in 5–15 minutes, no card-not-present friction, lets us start agent provisioning the same day money clears.

## Objection handling

### "Will my callers know it's not a person?"
> Most don't. If they ask directly, the agent says it's the answering desk for the shop and doesn't pretend. That's a deliberate choice — we think customers deserve the truth if they ask. In practice 2–3% of callers ask, and they almost always continue the call after the answer.

### "What if it gets a question wrong?"
> The agent escalates. If a caller is frustrated, asking for a person, or hits a question outside its script, you get an SMS with the caller's number and a one-line summary inside 60 seconds. You also see the full transcript at end-of-day.

### "What if I want to cancel?"
> Cancel any month. We don't have contracts. Your number is yours; if you ported it to us we port it back at no charge. You keep the call recordings up to 30 days.

### "Why don't you take cards?"
> The first month settles via NOWPayments (USDT or USDC stablecoin) because it clears in 15 minutes and there's no chargeback friction. Month two onwards we send a single monthly invoice covering base + over-minutes; you can pay the same way, by US bank transfer, or by ACH. We also accept credit card via Stripe in Concierge tier (the spread is bigger so we can absorb the card fee) — but for self-serve we keep stablecoin only because it keeps the price honest. **Not comfortable with stablecoin? Email the desk and we'll send a US bank wire/ACH invoice the same day.**

### "How do I know it works?"
> You hear it before any customer does. We hand you a 90-second recording of the agent in your shop's voice on day three. You forward your line only when you're ready — usually that's day five. If you don't like it, we don't bill.

### "Can it speak Spanish?"
> Yes. The agent picks the language from the caller automatically (Vapi's auto-detect) for English/Spanish. Other languages by request — most common: Vietnamese, Mandarin, Russian, Polish.

### "What about HIPAA?"
> v1 is HIPAA-aware (BAA available, audio retention configurable to 30 days, transcripts redacted on delivery), not HIPAA-certified yet. Concierge tier customers get a signed BAA and audit logs. For Wave 2 self-serve dental/clinic customers, we encrypt transcripts at rest and redact patient identifiers on the digest email.

### "I tried Numa / Goodcall — why is this different?"
> Three things. (1) The voice we ship for your shop is industry-tuned, not a generic template — we hand-tune the script in the intake call. (2) The agent actually books in your existing scheduling software; we do the integration so you don't fill out a 12-page wizard. (3) Pricing is monthly base + cents per minute, all on the homepage. No tiers locked behind sales calls.

### "Can I see a demo before I sign?"
> The sample call on the homepage is real. If you want a demo of *your* shop's voice, send us your hours / prices / scheduling-software in the intake email and we'll record a 60-second mock-up of your opening line within 24 hours, no commitment.

## The 30-minute intake call (sales play)

The intake call is the one human sales touch. Script:

1. **Set tone (1 min)**. "We're going to spend 30 minutes mapping your shop. At the end you'll have a working agent in your inbox in 72 hours."
2. **Capture the basics (5 min)**. Hours. Holiday closures. Number of staff who can take a booking. Hourly/per-service prices. Your existing scheduling software credentials (we hand them to the voice engineer, never to a salesperson).
3. **Capture the questions you keep getting (5 min)**. "What's the question you've answered in your sleep ten times this week?" Three to five common questions becomes the script's response library.
4. **Capture the escalation rules (5 min)**. "Tell me what would *make you want* the phone to ring on your hip." Those are the SMS triggers.
5. **Pick a voice (5 min)**. Three voices to choose from (warm female, warm male, neutral). The owner picks.
6. **Set expectations (5 min)**. "You'll get a recording in 72 hours. You forward your line when you're happy. First-month invoice clears via NOWPayments USDT/USDC in 15 minutes."
7. **Close (4 min)**. The owner sends the NOWPayments invoice link to themselves; we provision once it clears.

## Forecasting

- **Wave 2 (90 days)**: 30 customers across all six industries. Average ARR/customer ~$3,800. Year-1 revenue target $114k.
- **Wave 3 (months 4-12)**: scale to 200 customers via owner-to-owner referral and SEM.
- **Wave 4+ (year 2)**: international, additional industries (vet, optometrist, MedSpa, locksmith, towing).

## What we deliberately don't do (sales-side)

- **No "free trial" without an intake call.** A free trial without the intake produces a generic agent — exactly the failure mode we're trying to fix. We do offer a 60-second mock-up before commitment.
- **No discounts for annual.** The price is the price. Discounts make the buyer feel like they overpaid last month.
- **No salesperson cold-calling owners.** We ourselves don't make outbound calls. (See our anti-feature manifesto.)
- **No "boost your reviews" upsell add-on.** That's a different product. We are voice.
