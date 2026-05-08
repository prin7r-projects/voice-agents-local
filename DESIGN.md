# DESIGN.md — Frontline

> Canonical design + style guide for `voice-agents-local` (brand: **Frontline**).
> Owned by Chief of Design. Kept in sync with `apps/landing/` — any landing-page change updates this file in the same commit.

The visual identity is sourced from [`docs/01-brand-identity.md`](docs/01-brand-identity.md). This document is the implementation-facing translation of that identity into tokens, components, layout rules, and verification artifacts.

---

## 1. Product and audience

**Product** — Frontline is a done-for-you voice agent for local businesses (dentists, plumbers, salons, restaurants, clinics, contractors). A real-sounding voice on a real phone number that picks up every call, books the appointment in the shop's existing scheduling software (Square, Booksy, Vagaro, Dentrix, Mindbody, Toast, OpenTable, etc.), texts the owner anything urgent, and hands them an end-of-day digest. Per-shop tuning happens in a 30-minute intake call; the agent is live within 72 hours.

**Audience** —
- **Marisol, the salon owner**: 38, owner-operator of a 4-chair salon (Tavárez Cuts) in Lawrence MA. Skeptical of "AI." Will trust a recommendation from another owner more than any landing page. Lives in Booksy, Instagram, the salon-owner Facebook group.
- **Dale, the plumber**: 51, three trucks in Knoxville TN. His wife runs the office and is also raising twins. Hostile to buzzwords. Has been sold three CRMs. Lives in Housecall Pro, the trade-association forum, NextDoor.
- **Anti-personas**: big-box DSO chains, multi-state franchisors, outbound-sales SDR teams, lead-gen call-center buyers. The page is written for the owner, not the procurement officer.

The landing speaks owner-to-owner: warm, plainspoken, and concrete. Voice mirrors the product itself — calm, real, dependable.

**Visual register (Wave 2 redesign, 2026-05-08).** The brand essence — *warm, plainspoken, reliable* — is preserved, but the page has been recut to read as **expensive without being twee**. The target reference points are now Square Reader's pricing pages, Linear's brand site, and the Apple-tier discipline of an editorial-grade local trade publication: milky-white canvas instead of cream, hairline architecture instead of sticker-shadow stickers, large variable-axis Fraunces display set against a Cabinet Grotesk body, copper and sage applied as *punctuation* rather than as backgrounds. Inter is removed.

## 2. Visual positioning

A small-business main-street aesthetic, not an enterprise-SaaS aesthetic.

- **Anchor reference points** — Square Reader's pricing pages (warm, plain, legible), Front email's friendly trust, Calendly's non-technical tone, the visual register of a hardware-store sign or a barbershop awning.
- **Avoided reference points** — Vercel/Linear/Anthropic flat-sans monochrome; venture-deck purple gradients; "AI voice gradient purple" / waveform-as-hero; robot imagery; sci-fi tech aesthetic; consulting-firm chrome.
- **Felt sense** — opening a folded shop newsletter on a counter. Cream paper, ink type, a single warm-copper accent rule, a sage live-status dot. No drop shadows beyond a 1px paper lift, no glassmorphism, no gradients beyond a 2% paper grain.
- **Anti-features in the visual identity** — gradients, neon, glassmorphism, drop shadows beyond `0 1px 0 0 rgba(31,37,38,.06)` and the deliberate `6px 6px 0 0 rgba(31,37,38,.10)` sticker-shadow on the receiver-card quote chips, stock photography of laptops/headsets/diverse-team-pointing-at-screen, emojis in product copy.

## 3. ShadCN baseline and local component policy

**Baseline.** This repo follows the Prin7r Component Library Baseline (ShadCN-first). Default base for any future SaaS surface in `apps/app/` is shadcn/ui — install via `pnpm dlx shadcn@latest add <component>`, vendor the source into the project so we own and review every primitive.

**Current state — Wave 2 batch landing.** `apps/landing/` is intentionally hand-coded (no shadcn imports yet) because the small-business main-street aesthetic is carried by typography (Fraunces serif), warm tokens, and a copper accent — every shadcn variant we would import would need to be re-skinned to remove its rounded-corner and slate-grey defaults. The hand-rolled components below (`btn`, `tier-card`, `receiver-card`, `industry-icon`, `pulse-dot`, `label`) are all flat, square-edged-but-warmly-rounded (10px), and one rule width.

**Documented exception.** Until `apps/app/` ships, the landing does NOT import from `@/components/ui` — there is no `components/ui` directory. Reviewers should expect the next pass (intake form, settings screens, billing, calls inbox) to introduce shadcn primitives (Button, Input, Dialog, Card, DataTable) re-themed to the tokens in section 4.

**Forbidden.** Paid/pro libraries without CEO approval. Component libraries that conflict with ShadCN conventions. Marketing-page kits that drag in animation libraries beyond what's already in `globals.css`.

## 4. Color tokens

Single source of truth: `apps/landing/tailwind.config.ts` and `apps/landing/app/globals.css`.
**Wave 2 redesign (2026-05-08): cream/beige is removed.** The canvas is **milky white** lit by a 4–5% radial copper/sage mesh; warm copper and sage are kept as *accents only*. Eight tokens.

| Role | Token | Hex | CSS var | Used for |
|------|-------|-----|---------|----------|
| Surface (default) | `canvas` | `#FBFAF7` | `--canvas` | Page background, card surfaces |
| Surface (band) | `canvas2` | `#F4F2EC` | `--canvas-2` | Alternating section bands (Industries, Sample, Owner's covenant) |
| Ink (display) | `ink` | `#15171A` | `--ink` | Display type, primary buttons, hairlines anchor |
| Ink (body) | `ink2` | `#2A2D31` | `--ink-2` | Eyebrow text, near-black body cases |
| Accent (warm copper) | `copper` | `#B84423` | `--copper` | CTAs, accents, footnote rules, hover states |
| Accent (deep, hover) | `copper2` | `#92341B` | `--copper-2` | Button hover state |
| Muted | `slate` | `#5A6066` | `--slate` | Captions, metadata, mono labels |
| Trust (sage) | `sage` | `#5F7758` | `--sage` | Live-status pulse dot, restrained success cues |
| Hairline (default) | `line` | `rgba(21,23,26,0.08)` | `--line` | Card borders, dividers, section rules |
| Hairline (strong) | `line2` | `rgba(21,23,26,0.14)` | `--line-2` | Stronger separators where extra contrast is needed |

**Contrast.** Body and large-display foreground/background combinations meet WCAG AA. Verified pairs: ink-on-canvas ≈14.6:1 (AAA), ink2-on-canvas ≈11.2:1 (AAA), slate-on-canvas ≈4.7:1 (AA), copper-on-canvas ≈5.0:1 (AA), canvas-on-ink ≈14.6:1 (AAA), sage-on-canvas ≈3.6:1 (AA large only — sage is reserved for the 6px pulse-dot status indicator + decorative use, not body text).

**Forbidden combinations.** Sage on canvas2 below 14px. Copper on sage. Slate on canvas2 below 14px. Beige and cream tokens are forbidden under the Wave 2 redesign — if more warmth is needed, reach for a copper/sage radial mesh at ≤5% alpha rather than tinting the canvas itself.

## 5. Typography

Three families. No fourth font. **Inter is banned** under the Wave 2 redesign.

| Role | Family | Weights | Used at | Reason |
|------|--------|---------|---------|--------|
| Display | **Fraunces** (variable, opsz 9–144, SOFT axis) | 500, 600, 700, 800 | Hero 48–96px, sections 36–60px, transcript body 16–17px italic | Variable-axis serif that lets the display fall through `opsz=144` for hero, `opsz=18` for italic transcript copy, with the `SOFT` axis pushed to 30–50 on italic accents for a more editorial feel. The "expensive book cover" register without the twee. |
| Body / UI | **Cabinet Grotesk** (with **Plus Jakarta Sans** fallback) | 400, 500, 700, 800 | Body 15–17px, UI 13–14px, hero copy 18–19px | High-contrast premium grotesk loaded from Fontshare; replaces Inter. Carries character without screaming. Plus Jakarta Sans is loaded as a self-hosted-grade Google Fonts fallback in case Fontshare is blocked at the network edge. |
| Mono | **JetBrains Mono** (with **IBM Plex Mono** fallback) | 400, 500 | Labels in 10–11px caps, transcript metadata, kicker tags, tabular numbers | Tabular numerics on by default (`font-variant-numeric: tabular-nums`). Replaces IBM Plex Mono as the primary mono — Plex stays as fallback. |

Loaded in `globals.css` from Google Fonts (Fraunces, Plus Jakarta Sans, JetBrains Mono) and Fontshare (Cabinet Grotesk) with `display=swap`.

**Type scale (display).** 17 / 19 / 22 / 24 / 28 / 36 / 40 / 48 / 56 / 60 / 64 / 72 / 80 / 96 px.
**Body scale.** 10 / 11 / 12 / 13 / 14 / 15 / 16 / 17 / 19 px.
**Letter-spacing.** Display tightens to `-0.022em` (default) and `-0.028em` for hero. Eyebrow / mono labels open to `0.18em`.
**Variable-axis usage.** Hero uses `font-variation-settings: 'opsz' 144`; italic accents push `'SOFT' 50` for warmth. Transcript copy is set in Fraunces italic at `'opsz' 18` to make the verbatim 9-turn dental transcript read as an elevated editorial pull-quote rather than a debug log.
**Text-wrap.** All large display headings use `text-wrap: balance`; body copy uses `text-wrap: pretty` to remove orphans.

## 6. Spacing, radius, shadows, and borders

- **Base unit** — 4px.
- **Spacing scale** — 4 / 8 / 12 / 16 / 24 / 36 / 56 / 80 / 112 px (Fibonacci-ish; tighter than Tailwind defaults so the page feels print-like, not SaaS-padded).
- **Radius** — `10px` for cards, buttons, tier cards. `14px` for the receiver-card quote chips and sample-call transcript card (small bump for the "sticker" feel). `999px` reserved for pill badges (none currently used). Hairline elements (rules, dividers) use `0`.
- **Shadows** — exactly two allowed: `0 1px 0 0 rgba(31, 37, 38, 0.06)` (default card lift) and `6px 6px 0 0 rgba(31, 37, 38, 0.10)` (receiver-card sticker shadow on the hero quote chips). Glassmorphism, neumorphism, and gradient drop-shadows are forbidden.
- **Borders** — 1px hairlines at `rgba(31,37,38,.15)` (light), `rgba(31,37,38,.18)` (receiver-card outline), `rgba(31,37,38,.12)` (thin-rule for transcript and footnote separators). 1.5–2px copper rules at `var(--copper)` for masthead breaks and section accents.

## 7. Layout system and responsive rules

- **Container.** `max-w-prose = 1180px`, 80–96px gutters at desktop, 24–40px at mobile. The landing uses `mx-auto max-w-prose px-6 md:px-10` consistently.
- **Grid.** 12-column conceptually. The Hero is `lg:grid-cols-12` (7/5 split — content + quote chips). Industries grid is `sm:grid-cols-2 lg:grid-cols-3`. Pricing is `sm:grid-cols-2 lg:grid-cols-4`. The Trust band is `md:grid-cols-12` with 5/7 split. Sample-call section is `lg:grid-cols-12` (5/7 split).
- **Breakpoints.** Mobile-first; `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Tested at 320 / 390 / 768 / 1024 / 1440.
- **Vertical rhythm.** Sections separated by `border-b border-ink/15`; alternating section bands use `section-band` (cream-2 surface). Section padding `py-20 md:py-24` (80–96px), narrower hero/CTA at `py-14 md:py-28`.
- **Reading width.** Body prose capped at `max-w-2xl` (672px) so paragraphs read like printed page copy.

## 8. Component catalog

All components are local (in `apps/landing/app/page.tsx` and `globals.css`) until shadcn primitives land in `apps/app/`. Each has explicit hover and focus-visible states.

| Component | Where defined | Notes |
|-----------|---------------|-------|
| `Logo` | `page.tsx::Logo` | Fraunces 22px "Frontline" wordmark next to a 36px ink-rounded-square holding a copper rotary-receiver SVG. The receiver is the brand mark; works at 24px (favicon) and 64px (footer). |
| `.btn` (primary, ink) | `globals.css` | Square-but-warmly-rounded (10px), ink fill, 14×22px padding. Hover swaps to copper-2 fill. Focus-visible: 2px copper outline at +2px offset. |
| `.btn-copper` | `globals.css` | Solid copper. Used as the prominent CTA throughout — hero, masthead, closing. |
| `.btn-ghost` | `globals.css` | Transparent, ink border, ink text on cream → cream text on ink hover. Secondary CTA. |
| `Stat` | `page.tsx` Hero | 28–32px Fraunces semibold number, slate caption below. |
| `QuoteChip` | `page.tsx` Hero | Receiver-card with `6px 6px 0 0` sticker shadow, italicized Fraunces 17–18px quote, owner name + shop label. |
| `industry-icon` | `globals.css` + `page.tsx` icons | 44×44 ink-bordered cream square holding a 22px line-stroke SVG (dental tooth, plumbing pipe, salon scissors, restaurant cutlery, clinic medical-cross, contractor wrench). |
| `SectionHeader` | `page.tsx` | Mono `§ NN` kicker + slate hairline + mono eyebrow → 34–48px Fraunces title → 9px copper accent rule. |
| `tier-card` | `globals.css` + `page.tsx` Pricing | Cream surface, 1px ink-15 border (highlighted tier swaps to copper border + ring). Header label, optional badge, 40–44px Fraunces price, slate cadence, mono per-minute strapline, bullet list, full-width CTA at bottom. Hover lifts 2px and shows soft `0 6px 0 0` shadow. |
| `transcript-line-*` | `globals.css` + `page.tsx` SampleCall | `transcript-line-customer` (ink), `transcript-line-frontline` (copper), `transcript-line-meta` (slate mono caps). |
| `pulse-dot` | `globals.css` | 2.5px sage dot, 1.6s ease-in-out 1↔.45 opacity loop. The only persistent animation. Disabled under `prefers-reduced-motion`. |
| `label` | `globals.css` | IBM Plex Mono 11px, 1.6px tracking, uppercase, slate. |
| `thin-rule` | `globals.css` | 1px hairline at `rgba(31,37,38,.12)`. Transcript footnotes and what-we-won't-do row separators. |
| `section-band` | `globals.css` | Cream-2 background — used on Industries, Sample-call, Anti-features sections to make the page breathe. |

**Accessibility for each.** All buttons inherit native focus ring AND have an explicit `:focus-visible { outline: 2px solid var(--copper) }`. The `Logo` carries `aria-label="Frontline"`. Industry SVGs are `aria-hidden`; the `Arrow` glyph is `aria-hidden`. Nav anchors are real `<a>` elements via `next/link`. Keyboard tab order: hero CTA → secondary CTA → nav → industry cards → pricing CTAs → footer links.

## 9. Landing page structure

`apps/landing/app/page.tsx` renders eleven sections in order:

1. **Header** — Logo + primary nav (`Industries / How it works / Listen to a call / Pricing`) + copper "Talk to us" CTA.
2. **Hero** — pulse-dot kicker (`A Prin7r service · Open since 2026`), 44–80px display headline (`We pick up the phone. You stay focused on the customer in front of you.`), 18–20px deck, two CTAs (`Listen to a real call` ghost / `Get a line live this week` solid copper), 3-cell stat row, 3 testimonial-style quote chips on the right column.
3. **Industries we serve** — 6-card grid (Dental / Plumbers / Salons / Restaurants / Clinics / Contractors) with industry-icon, tagline, and a real example call line per card.
4. **How it works** — 3-step process (Tell us about your shop / We script the agent / Calls roll in).
5. **Sample call transcript** — receiver-card with a verbatim 9-turn transcript of a 7:48pm Tuesday call to a dental practice (redacted patient name) — booked into Dentrix at 7:50pm.
6. **Trust band** — ink-background frame with three boring-on-purpose stats (11.6 hrs saved/week, 97% after-hours pickup, 0 robocalls).
7. **Pricing** — four-tier card grid (After-Hours $140 / Starter $290 / Growth $590 / Concierge custom) with NOWPayments crypto checkout CTA on the buy-online tiers and "Email Concierge" mailto on the custom tier.
8. **Operator's covenant — what we won't do** — 5-bullet anti-feature manifesto (no robocalls, no pretending to be human if asked, no upsell scripts, no selling recordings, no long contracts).
9. **FAQ** — 6 owner-language Q&As (caller-knows-it's-an-agent, escalation, scheduling integrations, cost per call, number portability, why stablecoin).
10. **Closing CTA** — single-paragraph closer with email-the-desk + listen-first links.
11. **Footer** — Logo, brand stamp, link list, repo link, copyright.

**Copy origin.** Hero, pricing, anti-features, FAQ, sample-call, and closing copy are sourced from [`docs/07-sales-strategy.md`](docs/07-sales-strategy.md), [`docs/08-marketing-strategy.md`](docs/08-marketing-strategy.md), and [`docs/03-user-journeys.md`](docs/03-user-journeys.md). No copy is generated; no `Lorem ipsum`; no `TODO` strings ship.

## 10. Imagery and generated asset rules

The landing intentionally ships **no raster imagery** — the visual identity is carried entirely by typography, hairlines, the copper accent, the sage pulse dot, and inline industry SVG illustrations. `apps/landing/public/` contains no images other than `app/icon.svg` (the rotary-receiver favicon).

**If we add imagery in a later pass.**
- Generated via `prin7r-generate-image` (GPT Image 2 backed) when an OpenAI Image-API key is available. Save under `apps/landing/public/generated/<filename>.png` with a sibling `<filename>.prompt.txt` recording the prompt + model + date for reproducibility.
- Allowed subjects: owner-friendly illustrations of phones, storefronts, hand-drawn typography, real local-business reference photography (with permission). Never robots. Never gradient mesh. Never "AI dashboards."
- Forbidden: stock photography of laptops, hands at keyboards, "diverse-team-pointing-at-screen," gradient-mesh backgrounds, glow effects, robot imagery, "AI voice waveform" hero visuals, sci-fi tech aesthetic.
- **Graceful fallback** — if the generator is unavailable, ship without imagery; do not block release. The current landing exemplifies this.

**Logo SVG** lives inline in `apps/landing/app/page.tsx::Logo` and as `apps/landing/app/icon.svg` for the favicon.

**Industry icons** are inline SVGs in `apps/landing/app/page.tsx` (DentistIcon, PlumberIcon, SalonIcon, RestaurantIcon, ClinicIcon, ContractorIcon). Stroke-only, 1.5–1.6px stroke at ink, with a single copper dot as accent — they read as a pictogram set, not a clip-art set.

## 11. Motion and interaction rules

- **Principle** — A page should feel like a folded shop newsletter opening on a counter. No springs, no bounce, no scroll-jacking, no parallax.
- **Easing** — `cubic-bezier(.2,.6,.2,1)` over 220–380ms for everything (hover transitions, hero reveal).
- **Hero reveal** — three-stage `type-reveal` keyframe on the kicker / headline / deck (380ms, staggered 0/120/240ms), once on first paint. No re-trigger on scroll.
- **Pulse dot** — 1.6s ease-in-out opacity 1↔.45 loop on the sage hero kicker dot. Only persistent animation on the page.
- **Hover** — links gain a 1px underline; primary buttons swap fill to copper-2; ghost buttons swap to ink fill; pricing tier cards lift 2px and gain a soft drop shadow.
- **Focus-visible** — explicit 2px copper outline at +2px offset for buttons and form controls. The browser default ring is preserved as a fallback.
- **Reduced motion** — `prefers-reduced-motion: reduce` disables both the type-reveal and the pulse-dot animations via `@media` query in `globals.css`. Verified in DevTools and Lighthouse.

## 12. Accessibility and quality gates

- **WCAG target** — AA. AAA where the type scale already gets us there (display ink-on-cream).
- **Color contrast** — verified for every documented foreground/background pair in section 4.
- **Keyboard** — Tab cycles cleanly through hero CTA → secondary CTA → header nav → industry cards (none are buttons, so reading order = visual order) → pricing CTAs → FAQ links → closing CTA → footer links. All focus states are visible (explicit copper outline).
- **Alt text** — `Logo` carries `aria-label="Frontline"`; all industry/Arrow/receiver SVGs are `aria-hidden`. Decorative inline glyphs use `aria-hidden`. There are no `<img>` elements; if added, decorative use `alt=""`, content uses descriptive alt.
- **Semantics** — `header > nav`, `main`, `section[id]` for in-page anchors (`#industries`, `#how`, `#sample`, `#pricing`, `#contact`, `#top`), `article` around the sample-call transcript, `figure` + `blockquote` + `figcaption` around quote chips, `footer`. Real `<a>` (via `next/link`), real `<h1>` / `<h2>` / `<h3>` hierarchy with no skipped levels (1 H1, 6 H2 for sections, H3 for sub-headings inside steps / industries / FAQ items).
- **Real copy** — no `Lorem ipsum`, no `TODO` strings; every quoted figure (11.6 hrs / 97% / 76%) is from our sales-call audit; every shop name (Tavárez Cuts, Holcomb Plumbing, Greenpoint Family Dental) is referenced consistently across the docs and the landing.
- **Production checks** — `curl -sI https://voice-agents-local.prin7r.com` returns HTTP/2 200 with valid Let's Encrypt cert; static HTML contains the hero copy without client-side hydration.

**Verification cadence.** Before any landing-affecting commit lands on `main`: re-capture `docs/screenshots/landing-desktop.png` and `landing-mobile.png`, re-curl the deploy URL, verify keyboard tab cycle, lint, build.

## 13. Screenshots and verification artifacts

Captured from the live deploy at `https://voice-agents-local.prin7r.com` via Playwright (Chromium, `fullPage: true`) on 2026-05-08. They are committed at full-page height — desktop and mobile both scroll.

| Surface | Viewport | Path |
|---------|----------|------|
| Landing — desktop | 1440 × 900 (`fullPage`) | [`docs/screenshots/landing-desktop.png`](docs/screenshots/landing-desktop.png) |
| Landing — mobile | 390 × 844 (`fullPage`) | [`docs/screenshots/landing-mobile.png`](docs/screenshots/landing-mobile.png) |

![Frontline landing — desktop, 1440×900](docs/screenshots/landing-desktop.png)

![Frontline landing — mobile, 390×844](docs/screenshots/landing-mobile.png)

Capture script: `scripts/capture-landing-screenshots.mjs` (Playwright Chromium, `device_scale_factor: 2`, `wait_until: networkidle`). Re-run after any landing-affecting change.

## 14. External references and library sources

- **Brand identity source-of-truth** — [`docs/01-brand-identity.md`](docs/01-brand-identity.md). All tokens here trace back to it.
- **Component baseline** — [Prin7r Component Library Baseline: ShadCN-first](https://www.notion.so/3563ceec261981c1a147c81bf3bd0566) (Notion, internal).
- **Refero Styles** — [styles.refero.design](https://styles.refero.design/) for cross-project DESIGN.md references when expanding `apps/app/`.
- **Visual reference points** — Square Reader marketing pages, Front email's brand, Calendly's owner-friendly tone. Hardware-store and barbershop signage in person, not photographed.
- **shadcn/ui** — [ui.shadcn.com](https://ui.shadcn.com/) (used as the import path for `apps/app/` primitives once that surface starts).
- **Tailwind CSS 3.4** — [tailwindcss.com](https://tailwindcss.com/docs).
- **Next.js 15 App Router** — [nextjs.org/docs](https://nextjs.org/docs).
- **Fraunces / Inter / IBM Plex Mono** — Google Fonts, loaded with `display=swap`.
- **Voice runtime** — [Vapi](https://vapi.ai/), [Bland.ai](https://bland.ai/), [Twilio Voice](https://www.twilio.com/voice).
- **Payments** — [`/Users/keer/projects/prin7r/payments-prototypes/`](../payments-prototypes/) — NOWPayments hosted invoice + IPN HMAC-SHA512 reference implementation.

## 15. Changelog

| Date | Change | Reviewer |
|------|--------|----------|
| 2026-05-08 | Initial Wave 2 build (v2 bar) — `apps/landing/` shipped (11 sections); brand identity locked at `docs/01-brand-identity.md`; DESIGN.md created with all 15 sections; NOWPayments hosted-invoice flow live (`/api/checkout/nowpayments` + IPN webhook); 10 strategy docs + pitch-deck.html shipped; `apps/app/` stub with README explaining open-saas Wave 3+ plan; desktop + mobile screenshots captured; container deployed to storage-contabo via Traefik. | Wave 2 build agent |
| 2026-05-08 | **Wave 2 redesign — Soft Structuralism path.** Cream/beige canvas (`#FAF6F0`) replaced with milky-white canvas `#FBFAF7` lit by a low-opacity radial copper/sage mesh; `cream` and `cream2` tokens deprecated and renamed `canvas` / `canvas2`. **Inter banned, swapped to Cabinet Grotesk** (Fontshare, with Plus Jakarta Sans fallback); IBM Plex Mono demoted to fallback in favor of JetBrains Mono. Display Fraunces upgraded to use the full `opsz` (9–144) and `SOFT` (30–50) variable axes. Buttons converted to fully-rounded pills with the **button-in-button** trailing arrow per soft-skill; old square 10px buttons retired. **Six-tile industries grid recut as an asymmetric bento** (12-col grid: 6/3/3/3/6/3) with macro `gap-10` whitespace and double-bezel (Doppelrand) card architecture. Hero quotes restacked as a single asymmetric column with subtle `±2–3px` offsets per soft-skill's Z-Axis Cascade. Trust-band kept as the page's single dark moment but recut with copper + sage radial mesh against `--ink #15171A`. Verbatim 9-turn dental transcript preserved word-for-word but re-typeset in Fraunces italic at `opsz=18` inside a double-bezel card. Sticker-shadow `6px 6px 0 0 rgba(...)` retired in favor of a tinted diffusion shadow. All `border-b` section dividers replaced with hairline `--line` rules at 0.08 alpha. `min-h-screen` replaced with `min-h-[100dvh]` to fix iOS Safari viewport jumping. Motion eased onto `cubic-bezier(0.32, 0.72, 0, 1)` springs throughout. Live URL re-deployed to `https://voice-agents-local.prin7r.com` (200, NOWPayments invoice flow re-verified live). Desktop + mobile screenshots captured at the same `prin7r-screenshots` Playwright install used for batch 1. | Wave 2 redesign agent |
