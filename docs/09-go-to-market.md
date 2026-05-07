# 09 — Go-to-Market: 90-day plan

> Target: **30 paying customers** (across 6 industries), **$11k MRR** by day 90. The plan below stages the work week by week.

## North-star metric and trip-wires

- **North star**: paying customers active on day 90.
- **Leading indicator**: completed 30-min intake calls per week.
- **Trip-wires** (any one triggers a re-plan): NPS < 30 at day 30; customer-reported "agent sounded robotic" > 5% of weekly calls; weekly intake-call no-show rate > 30%; AWS/Twilio/Vapi cost per shop > $130/mo.

## Week-by-week schedule

### Week 1 — Foundations are already laid (Wave 2 build)

- Landing live at `voice-agents-local.prin7r.com` ✓ (this build)
- Six industry script templates documented ✓
- NOWPayments hosted invoice flow live ✓
- Voice engineer ready to take intake calls (Marisol is a friendly first signup)

### Week 2 — First three customers (the pilot trio)

- Outreach: three friendly owners we already know — one salon (Marisol), one plumber (Dale), one dentist (Dr. Petrosyan).
- 30-min intake calls run. Voice engineer hand-tunes scripts. Recordings shipped within 72h.
- All three forward their existing line on Friday at 5pm.
- **Goal**: 3 paying, agent-live customers, 1 per priority industry. They are our pilot trio and our first three weekly Pillar-1 video clips.

### Week 3 — Tighten the intake script

- Run a debrief with the pilot trio. Find the failure modes: what did they hear in the recording that surprised them? What did the agent get wrong on the first day?
- Update the per-industry script templates. (Wave 2 we are deliberately iterating with humans in the loop, not training.)
- **Goal**: written changelog of what changed and why, posted internally.

### Week 4 — First content pillar 2 ("How a salon should answer the phone")

- Video and blog post live.
- Promoted in two owner Facebook groups (with Marisol's permission and her endorsement).
- First Pillar-1 weekly clip drops on Instagram.
- **Goal**: 5 inbound emails to `desk@` that week.

### Week 5 — Open SEM (paid)

- Google Ads launches with 6 industries × 4 priority geos = 24 ad groups.
- Daily spend cap $200/day for first two weeks ($2,800 total budget).
- Target: $40 CPL (cost per intake-call signup), $200 CAC.
- **Goal**: 8 inbound demo requests, 5 intake calls scheduled.

### Week 6 — Hit cadence on Pillar-1 video

- Weekly call clip out by Friday 9am (consistent slot).
- Consolidated into a `/listen` archive on the landing.
- **Goal**: 12,000 cumulative video plays on IG.

### Week 7-8 — First agency partnership

- Pitch one Local Services Ads agency (one we've been on email with). Offer the 10% rev share + co-branded landing.
- Agency commits to introducing 5 of their plumbing clients by end of week 9.
- **Goal**: signed agency partner and a co-branded landing variant in production.

### Week 9-10 — Open referrals

- Email all current customers (~10–12 by then) the copy-paste referral pack.
- $50/mo credit per qualifying referral (1 free month after referred customer's month 1).
- **Goal**: 3 referrals come in via this loop.

### Week 11-12 — Growth-tier upsell

- Two of the salon customers say they're opening second locations. We offer Growth tier ($590/mo, 600 minutes shared).
- **Goal**: 2 Growth-tier upgrades, signaling first ARPU expansion.

### Week 13 (day 90 review)

- 30 customers, $11k MRR.
- Two early churns documented honestly: what didn't work, what we'd do differently.
- Wave 3 plan kicks off: build `apps/app/` (open-saas SaaS dashboard) so the day-90 customer base has a self-serve surface.

## Launch sequence (the public moment, week 5)

We don't do a big launch. The product is too quiet for that. Instead:

1. **Day 0** — landing live (silent).
2. **Day 14** — pilot trio public, IG clip #1 dropped.
3. **Day 21** — first long-form blog post live, owner-Facebook share.
4. **Day 35** — SEM live, agency outreach starts.
5. **Day 60** — second long-form post (different industry); owner-podcast spot drops.
6. **Day 90** — quarterly recap email to the customer base. "Here's what 30 shops sound like over 12 weeks."

## Channel mix budget (90-day total)

| Line item | Budget |
|---|---|
| Voice engineer (1 part-time, 80 hrs/week × 12 weeks × $40/hr) | $38,400 |
| Twilio + Vapi runtime cost (30 shops avg, $110/shop/mo) | $9,900 |
| Google Ads | $9,000 |
| 4 industry-podcast spots | $3,200 |
| Trade-show micro-event 1 (ISSE local) | $4,500 |
| Tools: Postmark, Vercel/Cloudflare, NocoDB CRM, Loom | $1,200 |
| **Total** | **$66,200** |

Against $11k MRR at day 90 (= $33k of paid customer ARR captured). Net cash burn at quarter end ~$33k, in line with what we budgeted at Wave 2 dispatch.

## Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Voice quality drops on a single shop** | Medium | Per-shop on-call recording listen-through every Friday for first 4 weeks. |
| **NOWPayments account flagged / API rate-limited** | Low | Plisio is the documented backup (`/docs/02-architecture.md` §Payment flow). |
| **One agency partner becomes >25% of revenue** | Medium | Cap at 25%; refer additional agencies to a "preferred-partner" pool. |
| **Customer wants HIPAA BAA (healthcare)** | High | Concierge tier sells the BAA + audit-log addendum. v1 self-serve doesn't claim HIPAA-certified. |
| **Generic competitor (Numa, Goodcall) lowers price** | Medium | We compete on tuning quality, not price. Our anti-feature manifesto is the moat. |
| **Twilio/Vapi outage during a customer's busy hour** | Low-Medium | Bland.ai is the documented runtime failover; on-call rota covers Friday 5pm – Sunday noon. |

## What "good" looks like at day 90 (re-stated)

- 30 paying shops, ~$11k MRR.
- 3 of those came via owner-to-owner referral (10% of base — beating the 40% steady-state goal is a year-2 outcome).
- 4 weekly clips out the door without missing a Friday.
- One signed agency partner.
- Voice engineer hand-off to a junior + script-template improvement loop visible in changelog.
- Wave 3 (the SaaS dashboard) actively in development.
