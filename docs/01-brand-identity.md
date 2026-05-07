# 01 — Brand Identity

> Brand: **Frontline**
> Slug: `voice-agents-local`
> Tagline: "We pick up. You stay focused."
> One-liner: Done-for-you voice agents for local businesses — dentists, plumbers, salons, restaurants, clinics, contractors. We answer the phone so the owner doesn't have to.

## 1. Brand pyramid

| Layer | Value |
|---|---|
| **Essence (1 word)** | Reliability |
| **Personality (3 traits)** | Warm · Plainspoken · Steady |
| **Values (3)** | (1) The owner's time is the scarcest resource we have. (2) Honest pricing beats clever pricing. (3) A calm voice on a stressful day is worth more than a slick demo. |
| **Attributes (5)** | (1) Real-sounding · (2) Industry-tuned · (3) Same-day setup · (4) End-of-day digest · (5) Cancellable any month |

## 2. Positioning statement

> For **local-business owners** (dentist offices, plumbing shops, salons, restaurants, clinics, contractors) **who lose customers and revenue every time the front desk can't pick up**, **Frontline** is **a done-for-you voice agent on a real phone number** **that books, triages, and answers in your shop's voice — without sounding like a robot or burying you in dashboards** **unlike** generic AI receptionists, voicemail-to-text apps, and overseas answering services **because we wire your industry's exact intake, your scheduling software, and your hours into the script — and we hand you a working agent in 72 hours, not a 12-page configuration manual.**

## 3. Audience persona

### Primary — Marisol the Salon Owner

- **Profile**: 38, owns a 4-chair salon (Tavárez Cuts) in Lawrence, MA. Five staff, three of them part-time. Takes ~50 calls a week, half during haircuts.
- **Goals**: Don't drop the phone during a colour appointment. Don't lose a Saturday booking to voicemail. Get her Sunday off.
- **Frustrations**: Booksy's auto-reply is robotic. The receptionist she tried to hire ghosted after week three. She tried a "free AI receptionist" from a Facebook ad and it greeted callers as "Beauty Bar" because it was a generic template.
- **Channels she lives in**: Instagram DMs, WhatsApp, neighborhood Facebook group, the Booksy app, Google Business Profile reviews.
- **Trigger**: A repeat client texts "tried calling four times" on a Wednesday afternoon. She closes the chair, rebooks them, and Googles "answering service for hair salon."

### Secondary — Dale the Plumber

- **Profile**: 51, runs a 3-truck plumbing shop in Knoxville, TN. His wife handles the phone from home most days; she's also raising their twins.
- **Goals**: Capture after-hours emergencies (drains and water heaters don't break at 9 a.m.). Stop losing $500 service calls to "we'll call you back."
- **Frustrations**: Hates "AI" anything; been sold three CRMs that promised "voice automation" and delivered email blasts. His existing answering service costs $480/month and routes everything to him no matter what.
- **Channels he lives in**: Facebook, NextDoor, his trade association forum, Housecall Pro app, voicemail.
- **Trigger**: His wife says "the phone or the boys, pick one" on a Tuesday. He asks his trade-association group thread.

## 4. Voice & tone

### Three do's

1. **Speak the way an owner talks to another owner.** Plain English, no acronyms, no SaaS jargon. ("We answer the phone." not "AI-powered customer engagement automation.")
2. **Anchor every claim in a real call.** Quote the customer or the situation, then the result. ("Customer called at 11 p.m. about a clogged drain. Booked Wednesday morning.")
3. **Lead with the limit.** Tell the buyer what we won't do (no robocalls, no upsell scripts, no long contracts) before we say what we will.

### Three don'ts

1. **Don't use the word "AI" as a feature.** It is plumbing, not a feature. The buyer cares about the result.
2. **Don't write hero copy that could apply to any product.** "Boost engagement" is for someone else.
3. **Don't talk to procurement.** This is an owner-to-owner site. Procurement-style pages live behind `/concierge` if we ever need them.

### Sample sentence

> "Frontline is a voice that picks up your shop's phone. It books appointments, answers the questions you keep getting asked, and texts you anything urgent. You read the day's notes at 6 p.m. That is the whole product."

## 5. Visual system

### Palette

| Role | Token | Hex | Usage |
|---|---|---|---|
| Surface (default) | `cream` | `#FAF6F0` | Page background, card surface |
| Surface (band) | `cream2` | `#F2EBDF` | Alternating section bands |
| Ink | `ink` | `#1F2526` | All body copy, primary buttons, hairlines |
| Accent (warm copper) | `copper` | `#C2462A` | CTAs, accents, footnote rules, hover states |
| Accent (deep copper, hover) | `copper2` | `#9F3520` | Button hover state |
| Muted | `slate` | `#5C6266` | Captions, metadata, mono labels |
| Trust (sage) | `sage` | `#6F8869` | Live-status pulse dot, subtle success cues |
| Calm (sky) | `sky` | `#3A6E8F` | Quote chip variant, sparing use |

The palette is deliberately a small-business main-street palette — copper and cream, not gradient purple. It reads as a hardware-store sign or a barbershop awning, not an AI dashboard.

### Typography pairing

| Role | Family | Used at |
|---|---|---|
| Display | **Fraunces** (variable, opsz 9–144, 400/600/800) | Hero 44–80px, sections 34–48px, callout 18–22px |
| Body | **Inter** (400/500/600/700) | Body 15–17px, UI 14px, labels 11px |
| Mono | **IBM Plex Mono** (400/500) | Labels, metadata, transcript timestamps |

Loaded from Google Fonts in `globals.css` with `display=swap`.

Reasoning: Fraunces is a warm, optical-size serif that reads as "shop sign" / "book cover" / "kindness," not "dashboard." Inter is a workhorse sans that gives the body the same legibility at small sizes that owners want when they're reading on a phone in low light. Plex Mono is used sparingly for labels and transcript metadata — it signals machine output, but it never carries body text.

### Logo concept

A small **ink-coloured rounded square** holding a **copper old-school telephone receiver** glyph, with the word **"Frontline"** set in Fraunces 22px next to it.

The receiver is intentionally a 1960s rotary handset, not a smartphone — that's the visual anchor for "we pick up." The mark works at 24px (favicon) and at 64px (footer signature). SVG is inline in `app/page.tsx::Logo` and as `app/icon.svg` for the favicon. There is no raster logo file.

### Spacing & radius scale

- **Base unit** — 4px.
- **Spacing** — 4 / 8 / 12 / 16 / 24 / 36 / 56 / 80 / 112.
- **Radius** — `10px` (cards, buttons), `14px` (receiver-card mockups), `999px` (pill badges, none used currently). Square-edged hairline elements (rule, divider) use `0`.
- **Borders** — 1px hairlines at `rgba(31,37,38,.15)` (light), `rgba(31,37,38,.18)` (receiver card). Copper accent rules at `1.5–2px`.
- **Shadows** — exactly two allowed: `0 1px 0 0 rgba(31,37,38,.06)` (default card lift) and `6px 6px 0 0 rgba(31,37,38,.10)` (the "sticker shadow" on the receiver-card quote chips). Glassmorphism, neumorphism, and gradient drop-shadows are forbidden.

### Motion principles

- A page should feel like a folded shop newsletter opening, not a slideshow.
- Easing: `cubic-bezier(.2,.6,.2,1)` over 220–380ms.
- Hero reveal is three-stage `type-reveal` (380ms, 0/120/240ms stagger), once on first paint.
- Pulse dot loops at 1.6s ease-in-out (the only persistent animation).
- `prefers-reduced-motion` is respected with a media query that disables both keyframes.

## 6. Forbidden moves

- Copy-pasting the editorial-broadsheet aesthetic from `market-research-on-demand` (Cited's serif/scarlet broadsheet voice is for analysts, not salon owners).
- Using **gradient purple, neon mesh, "AI voice waveform"** illustrations, or **robot imagery** anywhere on the landing.
- Stock photography of laptops, headsets, "diverse-team-pointing-at-screen," or office buildings.
- Using "AI" as a hero noun. Use it where it earns its keep (the FAQ) or not at all.
- Using emoji or exclamation points in product copy. (One italic phrase carries the warmth instead.)
- Mimicking Anthropic, OpenAI, Vercel, Linear, Square, or Calendly visual systems wholesale. Square-Reader pricing-pages are an *anchor reference*, not a copy.

## 7. Brand sign-off

Frontline is the warm voice across the counter. The brand exists to convince a tired shop owner that handing the phone to us will not feel like handing it to a corporation, and the visual identity has to earn that — every type choice, every hairline, every color is doing that one job.
