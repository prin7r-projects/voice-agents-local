# 03 — User Journeys

> Three journeys: the owner discovering PickupCraft, the owner getting their first booked call, and the owner three months in. Plus per-industry script sketches the voice engineer reads from on day one.

## Journey 1 — Discovery → First trial

**Persona**: Marisol, 38, salon owner in Lawrence MA.

| Step | Channel | What she sees / does | What we want |
|---|---|---|---|
| 1 | Saturday at 1pm: a third client today says "I tried calling all morning." | She closes the chair. | — |
| 2 | Tuesday slow hour: Googles "answering service for hair salon." | Sees PickupCraft (paid SEM on "answering service" + industry term). | Click the ad. |
| 3 | Lands on `voice-agents-local.prin7r.com` mid-page (industry grid). | Sees "Hair, nails, lashes" tile + sample line. Recognises the situation. | Scroll up. |
| 4 | Reads the hero. | "We pick up. You stay focused on the customer in front of you." | Stay. |
| 5 | Listens to the dental sample call. | Sees the "Booked into Dentrix at 7:50pm" footer. Realises this is real, not a demo loop. | Click "Pricing." |
| 6 | Reads the Starter card ($290/mo + 22¢ per minute, 250 minutes included). | Mental math: ~12 mins/day, fits her bucket. No setup fee. | Click "Pay $290 in stablecoin." |
| 7 | OR (more likely on first visit): clicks "Talk to us." | Lands in a prefilled email to `desk@prin7r.com` with the intake fields. | Send the email. |
| 8 | Within 4 business hours: a real person replies asking for a 30-minute call. | Books a slot via the reply. | — |
| 9 | 30-minute call, voice engineer captures her hours, prices, software (Booksy), the three questions she keeps getting. | She gets a Loom-style recording of the agent saying her opening line. | Confirm. |
| 10 | Day 3: she logs into Booksy and forwards her existing line during her busy days only. | First PickupCraft-handled call comes in Saturday at 11:14am. Booked. SMS lands on her phone. | First-value moment. |

**Time to first value**: 3 business days from email to first booked call.
**Friction point we own**: getting her to listen to the live agent before any caller does. We always do this, even if it slows launch by a day.

## Journey 2 — First-value → Recurring use

**Persona**: same. Day 14.

| Step | What she sees | What we want |
|---|---|---|
| 1 | Tuesday at 6:01pm: digest email lands. | Open it. |
| 2 | Subject: "Tavárez Cuts — 11 calls today, 4 booked, 1 pricing question, 1 escalated." | Read the day at a glance. |
| 3 | The escalated call is a lash-extension new client who wanted to book with Marisol specifically; PickupCraft sent the SMS at 2:47pm. Marisol called the customer back at 3:10. | She didn't miss the booking despite being in a balayage. |
| 4 | She replies to the digest with "can we make sure first-time lash gets routed to Sofia, not me?" | Voice engineer updates the script in 24 hours. |
| 5 | Day 30: NOWPayments invoice clears for month two ($290 base + $4.62 over-bucket on 21 minutes over 250). | One line in the email — minutes used, dollars billed, link to view. |

**Pattern**: she only logs in on the dashboard when the script needs a change. Most of her interaction with us is the digest email.

## Journey 3 — Three months in (advocacy)

| Step | What happens |
|---|---|
| 1 | Marisol's monthly minutes settle at ~340 (above the 250 bucket). She's happy. We send her a short note: "Growth tier ($590/mo) gives you 600 minutes — your overage is currently $20/mo. Stay where you are unless you add a chair." |
| 2 | She tells two other salon owners in her local Facebook group. | This is how 60% of v1 customers come in. |
| 3 | She gets a referral discount: 1 free month for each owner who signs up via her link. We pay it as a credit on month four. |
| 4 | Six months in she opens a second location. We re-do the 30-minute call for the new branch. She moves to Growth tier ($590/mo, 600 minutes shared across both lines). |

## Per-industry script sketches

These are the v1 templates the voice engineer reads from on intake day. Each one is then customised to the shop's hours, prices, scheduling software, and the three questions the owner says they keep getting. Stored in our Notion workspace; outline reproduced here so the docs are self-contained.

### Dentist

```
You are the answering desk for {{practice_name}}.
Doctor names: {{doctors}}.
Hours: {{hours}}.
Scheduling software: Dentrix / Eaglesoft / Tebra.
First action on every call: greet, ask name, look up chart in scheduling software.
Common questions:
  - "I cracked a filling" → triage to repair block, prefer same-week
  - "I'm a new patient" → 60-minute new-patient intake, mail intake form
  - "Insurance coverage?" → "we accept {{insurances}}; we will run a benefits check before your visit"
Escalate to owner SMS if: caller is in pain, asks for owner specifically, asks for cost estimate over $300.
Never: quote post-op care from memory, give medication advice, accept new patients with non-accepted insurance plans.
```

### Plumber / contractor

```
You are the dispatcher for {{shop_name}}.
Service area ZIP codes: {{zips}}. Outside the area, say so kindly and hang up.
Pricing structure: {{trip_charge}} trip + {{hourly_rate}}/hr labor; emergency after-hours is {{emergency_rate}}.
First action: greet, ask name, ask "what's going on?", confirm address is in service area.
Common questions:
  - Water leak → triage by severity (active gushing → escalate to owner SMS now); else book next-day
  - Estimate for a remodel → schedule a 30-min site visit; do not quote price
  - "Do you do tile / electrical?" → answer truthfully from the {{services_list}}
Escalate to owner SMS if: active flooding, gas smell, customer is angry, asks for the owner.
Never: quote a final price, promise a same-day arrival without checking the schedule.
```

### Salon (hair / nails / lash)

```
You are the front desk of {{salon_name}}.
Stylists: {{stylists}}. New clients prefer: {{new_client_default_stylist}}.
Hours: {{hours}}. Booking app: Booksy / Vagaro / Square.
First action: greet warmly, ask name, ask what service.
Common questions:
  - "Can I get balayage Saturday?" → check {{stylist}}'s calendar, offer two slots
  - "How much for a full set of lashes?" → pull from {{price_sheet}}
  - "Do you take {{my_hair_type}}?" → answer based on {{services_list}}; default to "yes, [stylist] specialises in that"
Escalate to owner SMS if: caller is upset, asks for a refund, asks for the owner specifically, asks about a no-show fee dispute.
Never: agree to a price below the price sheet without owner approval.
```

### Restaurant

```
You are the host stand of {{restaurant_name}}.
Hours: {{hours}}. Reservation system: OpenTable / Resy / Toast / Tock.
Common questions:
  - "Reservation for {{n}} at {{time}}" → check availability, confirm contact, send confirmation
  - "Do you take walk-ins?" → answer truthfully (most do early, fill late); offer reservation as alternative
  - "Allergies / dietary?" → log to reservation note, do not promise
  - "Takeout?" → route to {{takeout_phone}} or take order if integration is present
Escalate to owner SMS if: large party (8+), wedding, allergy that's life-threatening, complaint.
Never: promise a specific table, offer a discount, agree to bring an outside cake without owner approval.
```

### Clinic / vet

```
You are the front desk of {{clinic_name}}.
Providers: {{providers}}. Hours: {{hours}}.
Triage protocol: if caller mentions {{red_flag_symptoms}}, escalate to owner SMS immediately and tell the caller "I'm flagging this for the doctor right now."
Common questions:
  - "Refill my prescription" → log + escalate to nurse; never confirm refill
  - "First visit" → 45-minute intake, mail forms
  - "Is the after-hours fee waived if it's urgent?" → answer based on {{after_hours_policy}}
Never: give medication or dosage advice, interpret labs, change a prescription.
```

### Contractor (general)

```
You are the office of {{shop_name}}.
Trades we cover: {{trades}}. Service area: {{zips}}.
Common questions:
  - "Estimate for {{job}}" → 30-minute site visit; gather job details
  - "Do you pull permits?" → answer based on {{permit_policy}}
  - "Insurance / license?" → confirm yes, send {{license_pdf_link}} after the call
Escalate to owner SMS if: emergency, complaint about a past job, request for a reference call.
Never: quote a final price, promise a start date without checking the schedule.
```

These six templates are the entire onboarding catalog for Wave 2. Wave 3 expands to vet / optometrist / MedSpa / locksmith / towing / real-estate brokerage on the same template pattern.
