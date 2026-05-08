# 10 — Pitch Deck (PickupCraft)

> 10 slides. Plain English. Designed to be read by an owner first, an investor second.

---

## Slide 1 — Title

# PickupCraft
### Your voice while you're cutting hair.

A done-for-you voice agent for local businesses — dentists, plumbers, salons, restaurants, clinics, contractors.

`voice-agents-local.prin7r.com`

---

## Slide 2 — The problem

The phone is the front door of every local business. It rings while the owner is with the customer who walked through it.

- **76% of voicemails go unanswered** in our wedge industries.
- Owners pay $200–$2,000/month for either (a) an answering service that takes a message and routes everything to the owner's mobile, or (b) a part-time front-desk who quits in 6 months.
- "Press 1 for English" auto-attendants are the worst answer the industry currently offers.

> "My chair time used to get eaten by the phone." — Marisol Tavárez, Tavárez Cuts, Lawrence MA

---

## Slide 3 — The product

PickupCraft is a real-sounding voice agent on a real phone number, hand-tuned per industry.

- Picks up. Books the appointment in your existing software. Texts you anything urgent. Sends a clean digest at end of day.
- Six tuned scripts: dental, plumbing, salon, restaurant, clinic, contractor.
- Live in 72 hours, not 12 weeks.

The product is the **outcome**: a Saturday off; bookings instead of voicemails. We sell a result, not a dashboard.

---

## Slide 4 — Why now (2026)

- Voice quality crossed the line in 2025: ElevenLabs / Vapi / Bland sound human enough that callers don't ask.
- LLM tool-use against scheduling APIs is reliable.
- Twilio number provisioning + SMS escalation is commodity.

**The market gap is the done-for-you, plain-English layer on top of those primitives.**

Anyone can plug Twilio into Vapi. Almost no one has shipped a per-shop tuned product to the dentist next door.

---

## Slide 5 — Who it's for

| ICP | Detail |
|---|---|
| Industries | Dental, plumbing, salon, restaurant, clinic, contractor |
| Headcount | 2–25 |
| Locations | 1–3 |
| Daily call volume | 15–80 |
| Buying decision | Owner. Single signature. |

Two anchor personas: Marisol (38, salon, MA) and Dale (51, plumber, TN). Profiles in `docs/05-audience-profile.md`.

Not for: DSO chains, franchises, outbound-sales SDR teams. We refer them out or sell Concierge.

---

## Slide 6 — Pricing

| Tier | Monthly base | Per-minute (after bucket) | Included |
|---|---|---|---|
| **After-Hours** | $140 | 26¢ | 80 minutes |
| **Starter** | $290 | 22¢ | 250 minutes |
| **Growth** | $590 | 18¢ | 600 minutes |
| **Concierge** | Custom | Custom | Custom |

First month upfront via NOWPayments USDT/USDC stablecoin invoice (clears in 15 min). Month 2+: monthly invoice.

No setup fee. No long contract. Cancel any month.

Margin: ~$224 contribution / shop / month at Starter tier (Twilio + Vapi + Postmark cost ~$110/shop/mo).

---

## Slide 7 — Why this wins

Three sharp comparison axes:

| vs. | They are | We are |
|---|---|---|
| Live answering services (LASA, AnswerNet) | Per-minute message-takers | Industry-tuned bookers |
| Generic AI receptionists (Numa, Goodcall) | Wizard-configured templates | Hand-tuned in 72 hours |
| Voicemail / Google Voice | A funnel that drops 76% of callers | A line that picks up |

The defensibility lives in the per-industry tuning loop: every new shop's quirks get folded into the next shop's intake. The script library is the product.

---

## Slide 8 — Distribution

Channel mix engineered for owner trust gradient:

| Channel | Share at 90 days |
|---|---|
| Owner-to-owner referral | 40% |
| Industry-specific paid SEM | 25% |
| Instagram + TikTok call clips | 12% |
| Local Services Ads / agency partnership | 10% |
| Industry podcast sponsorship | 8% |
| Trade-show / conference | 5% |

Detail in `docs/06-sales-channels.md`. We don't do TechCrunch launches, LinkedIn outbound, or Hacker News. Wrong audience.

---

## Slide 9 — Plan

90-day target: **30 paying shops, $11k MRR**.

| Phase | What lands |
|---|---|
| Weeks 1-2 | Pilot trio (1 salon, 1 plumber, 1 dental) — agent live |
| Weeks 3-6 | Per-industry blog posts; weekly call-clip; first SEM |
| Weeks 7-10 | First agency partnership; referral loop opens |
| Weeks 11-13 | Growth-tier upsells; day-90 recap; Wave 3 dashboard kicks off |

Wave 3 (months 4-12): scale to 200 customers; ship `apps/app/` open-saas dashboard for owner self-serve.

---

## Slide 10 — Ask

PickupCraft is operated by Prin7r as one of 20 productized services. We'd invite three things from a partner:

1. **Owner introductions** — if you know a salon, plumber, dentist, restaurant, clinic, or contractor in a US Sun Belt or secondary-city market, we'd like to send them the sample call.
2. **Agency partnership conversations** — we're recruiting 3-5 Local Services Ads agencies to sell-with us.
3. **Industry-podcast hosts** who run their own shop and would do a mid-roll read with their own example.

Email **desk@prin7r.com** or reach the team at `voice-agents-local.prin7r.com`.

> **"We pick up. You stay focused."**
