# 11 · User stories and scenarios

> Rollcall is a done-for-you voice agent on a real phone number for local businesses. We answer the
> phone so the owner doesn't have to.

## 1. Personas summary

- **Marisol the Salon Owner.** 38, 4-chair salon in Lawrence MA. Drops calls during haircuts.
  Wants Sundays off. — see `05-audience-profile.md` §Marisol.
- **Dale the Plumber.** 51, 3-truck plumbing shop in Knoxville TN. Wants after-hours emergency
  capture. — see `05-audience-profile.md` §Dale.
- **Rollcall onboarding operator (internal).** Configures the per-shop script + integrations
  during the 72h setup window.

## 2. Primary user stories (12)

1. **As Marisol**, I want to give Rollcall my industry + my hours + my booking software, so that
   the agent picks up calls in my voice without a 12-page configuration manual.
2. **As Marisol**, I want Rollcall live on my line in 72 hours, so that I can stop dropping calls
   this week.
3. **As Marisol**, I want bookings written directly into Booksy, so that I don't have a second
   calendar to reconcile.
4. **As Marisol**, I want an end-of-day digest of every call (caller, intent, outcome,
   appointment booked), so that I have a record without listening to recordings.
5. **As Marisol**, I want the agent to escalate urgent calls (e.g., wedding emergency hair
   appointment) to my cell via SMS, so that I never miss a high-revenue call.
6. **As Dale**, I want after-hours emergency calls flagged + dispatched via SMS, so that I capture
   $500 service calls instead of voicemail.
7. **As Dale**, I want pricing for plumbing service ranges baked into the script ("emergency drain
   $250–$450, after-hours surcharge $75"), so that the agent can quote.
8. **As Marisol**, I want to cancel anytime, no contract, so that I'm not locked in if the
   experience drops.
9. **As onboarding operator**, I want a 72h setup checklist with per-industry templates, so that
   I configure consistently.
10. **As onboarding operator**, I want a sandbox that I can dial to QA the agent before going live,
    so that the customer's first real call works.
11. **As Marisol**, I want a fallback when the agent is uncertain (e.g., "let me text the owner
    and they'll get back to you within an hour"), so that an edge case isn't a lost customer.
12. **As Marisol**, I want monthly billing flat ($299/mo + per-minute over 500 min/mo), so that
    I can budget.

## 3. Main scenarios (happy paths)

### Scenario A — Marisol onboards Rollcall in 72h

1. **Trigger.** Marisol Googles "answering service for hair salon" Wednesday afternoon.
2. **Steps.**
   1. Lands on `/`. Reads tagline: "We pick up. You stay focused."
   2. Picks Salon plan ($299/mo + per-min). Pays in USDC via NOWPayments.
   3. Receives a setup intake link in the receipt email.
   4. Fills in: industry = salon; hours = Tue–Sat 9-7; phones forward when busy/no-answer; booking
      software = Booksy; pricing list (haircut $35, color $120, blowout $40); urgency triggers
      (wedding, photoshoot, today-only).
   5. Onboarding operator picks up the ticket within 4 BH; configures Vapi voice agent + Twilio
      number forwarding + Booksy integration.
   6. 36h later, sandbox number ready; Marisol dials, books a test appointment in Booksy, listens
      to the recording.
   7. 60h later, Marisol greenlights; the existing salon line forwards to Rollcall on busy/no-answer.
3. **Success criteria.** Live within 72h; first real booking by hour 96.
4. **Frontend.** Landing, intake, sandbox dialer page.
5. **Backend.** NOWPayments → onboarding workflow → Vapi config → Twilio number → Booksy OAuth.

### Scenario B — Dale captures an after-hours emergency

1. **Trigger.** 23:14 Tuesday: a homeowner with a backed-up drain calls Dale's shop number.
2. **Steps.**
   1. Twilio routes to Vapi.
   2. Agent greets in Dale's branded voice: "Knox Plumbing emergency line. I can dispatch a tech
      tonight or schedule first thing tomorrow."
   3. Caller says "tonight." Agent quotes $325 emergency + $75 after-hours.
   4. Caller agrees. Agent collects address, phone, payment method. Books the slot.
   5. SMS dispatch fires to Dale: "Backed-up drain at 1402 Maple St, $400 quoted, on-call tech needed."
   6. Dale dispatches.
3. **Success criteria.** Emergency captured + dispatched within 5 min.

### Scenario C — Onboarding operator runs the 72h checklist

1. **Trigger.** New customer ticket in queue.
2. **Steps.** Operator opens checklist; configures Vapi + Twilio + booking integration; runs sandbox
   QA; greenlights customer.
3. **Success criteria.** Setup completed in <72h with checklist green.

### Scenario D — End-of-day digest

1. **Trigger.** Cron 18:00 local per shop.
2. **Steps.** Worker queries calls of the day; composes digest (bookings, urgents, missed, voicemail
   transcripts); emails owner.
3. **Success criteria.** Digest lands within 15 min of close-of-day.

### Scenario E — Cancel mid-month

1. **Trigger.** Marisol decides to part ways.
2. **Steps.** Cancel button on /me/subscription. Service runs until period end. Twilio number
   forwarding undone at expiry.
3. **Success criteria.** Clean off-boarding; no overage bill.

### Scenario F — Edge fallback: agent uncertain

1. **Trigger.** Caller asks for "the owner's home address."
2. **Steps.** Agent recognizes out-of-script ask, says "let me text the owner; they'll respond
   within an hour." Logs the ticket; SMS to owner.
3. **Success criteria.** No private info disclosed; owner notified.

## 4. Edge case scenarios

### Edge A — Caller language mismatch

If caller speaks Spanish, agent detects + switches if Spanish-mode enabled (Wave 3 toggle);
otherwise agent says "let me have someone call you back in your language" and routes.

### Edge B — Booking software OAuth expires

Onboarding operator paged; bookings fall back to "we'll book you in once we're back online";
operator re-OAuths within 4 BH.

### Edge C — Caller is a robocall

Agent detects (silence-then-dial-tone, or known-spam ANI lookup); hangs up; no log.

### Edge D — Agent hits per-minute over

If a single call exceeds 6 min (max conversation length), agent gracefully ends with "I'll have
someone call you within the hour." Logged for owner review.

### Edge E — Twilio outage

Calls land in voicemail (Twilio's fallback); voicemails transcribed; included in digest. Operator
alerted on outage.

### Edge F — Customer wants to listen to a call recording

Recordings stored 30 days in B2; per-customer dashboard shows the day's calls with playback.

## 5. Anti-scenarios

1. **No outbound cold calling.** Rollcall is inbound-only; we will not dial-on-behalf for
   marketing.
2. **No "robotic" voice.** We ship each shop on a real-sounding voice; if the customer doesn't
   like the voice option, we offer 2 alternatives.
3. **No PCI in the agent.** Payments collected via the booking software, not by the agent
   directly.
4. **No privacy-violating disclosures.** Agent never discloses owner home, personal cell, or
   non-public info.
5. **No multi-month contracts.** Cancel anytime is the policy.
