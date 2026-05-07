import Link from "next/link";
import { PricingCta, type PricingPlanId } from "./pricing-cta";

export default function HomePage() {
  return (
    <main className="min-h-screen text-ink">
      <Header />
      <Hero />
      <IndustriesWeServe />
      <HowItWorks />
      <SampleCallTranscript />
      <TrustBand />
      <Pricing />
      <WhatWeWontDo />
      <FaqSection />
      <ClosingCta />
      <Footer />
    </main>
  );
}

const DESK_MAILTO =
  "mailto:desk@prin7r.com?subject=Frontline%20-%20get%20a%20line%20live%20for%20my%20shop&body=Business%20name%3A%0A%0AIndustry%20(dentist%2C%20plumber%2C%20salon%2C%20restaurant%2C%20clinic%2C%20contractor)%3A%0A%0ABusiness%20phone%20number%3A%0A%0AHours%20you%20want%20covered%3A%0A%0AOne-line%20description%20of%20your%20typical%20customer%20question%3A%0A";

const CONCIERGE_MAILTO =
  "mailto:desk@prin7r.com?subject=Frontline%20Concierge%20-%20multi-location%20setup&body=Number%20of%20locations%3A%0A%0AAverage%20daily%20call%20volume%20across%20locations%3A%0A%0AScheduling%20software%20you%20use%20today%20(Square%2C%20Booksy%2C%20Vagaro%2C%20Dentrix%2C%20Mindbody%2C%20etc.)%3A%0A%0AWho%20handles%20the%20phone%20today%3A%0A";

/* ---------------- Header ---------------- */

function Header() {
  return (
    <header className="border-b border-ink/15">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-5 flex items-center justify-between gap-6">
        <Link href="#top" className="flex items-center gap-3" aria-label="Frontline home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-sm">
          <Link href="#industries" className="hover:text-copper">
            Industries
          </Link>
          <Link href="#how" className="hover:text-copper">
            How it works
          </Link>
          <Link href="#sample" className="hover:text-copper">
            Listen to a call
          </Link>
          <Link href="#pricing" className="hover:text-copper">
            Pricing
          </Link>
          <a href={DESK_MAILTO} className="btn btn-copper">
            Talk to us
            <Arrow />
          </a>
        </nav>
        <a href={DESK_MAILTO} className="md:hidden btn btn-copper text-[12px] !px-4 !py-2">
          Talk to us
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5" aria-label="Frontline">
      {/* Old-school receiver mark, copper, on a small ink card. */}
      <span
        aria-hidden
        className="inline-flex w-9 h-9 items-center justify-center rounded-[10px] bg-ink"
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path
            d="M9 11.6c0-1.4 1-2.6 2.4-2.7l1.6-.1c.6 0 1.1.4 1.3 1l1.1 3.4c.1.5 0 1.1-.5 1.4l-1.4 1c.6 1.3 1.7 2.4 3 3l1-1.4c.3-.4.9-.6 1.4-.5l3.4 1.1c.6.2 1 .7 1 1.3l-.1 1.6c-.1 1.4-1.3 2.4-2.7 2.4-7.5 0-12.5-5-12.5-12.5z"
            fill="#C2462A"
          />
        </svg>
      </span>
      <span className="font-display text-[22px] font-semibold tracking-tight">Frontline</span>
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="font-mono text-[14px]">
      →
    </span>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="border-b border-ink/15">
      <div className="mx-auto max-w-prose px-6 md:px-10 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-14 items-start">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 reveal">
              <span
                className="inline-block w-2.5 h-2.5 rounded-full bg-sage pulse-dot"
                aria-hidden
              />
              <span className="label">A Prin7r service · Open since 2026</span>
            </div>

            <h1 className="reveal mt-5 font-display font-semibold leading-[0.96] tracking-tight text-[44px] sm:text-[56px] md:text-[72px] lg:text-[80px]">
              We pick up the phone.
              <br />
              <span className="text-copper">You stay focused</span> on the customer
              in front of you.
            </h1>

            <p className="reveal-2 mt-8 max-w-[620px] text-[18px] md:text-[20px] leading-[1.55] text-ink/85">
              Frontline runs the front-of-house phone for local businesses —
              dentists, plumbers, salons, restaurants, clinics, contractors. A
              calm, real-sounding voice answers every call, books the
              appointment in your calendar, and hands you a clean note at the
              end of the day. No missed calls. No phone tag. No "press 1 for
              English."
            </p>

            <div className="reveal-3 mt-10 flex flex-wrap gap-3">
              <Link href="#sample" className="btn btn-ghost">
                Listen to a real call
                <Arrow />
              </Link>
              <a href={DESK_MAILTO} className="btn btn-copper">
                Get a line live this week
                <Arrow />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 max-w-2xl">
              <Stat n="3 days" t="From signup to your first booked call" />
              <Stat n="0" t="Calls dropped, ever, on the live agents" />
              <Stat n="$290" t="Starts here. No setup fee. Cancel anytime." />
            </div>
          </div>

          {/* Quote chips column — three local-business owners. */}
          <aside className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <QuoteChip
              quote="My chair time used to get eaten by the phone. Now I don't even hear it ring — I just see the booking come in."
              who="Marisol Tavárez"
              shop="Tavárez Cuts · Lawrence, MA"
              tone="copper"
            />
            <QuoteChip
              quote="Customers call about a clogged drain at 11 p.m. on a Tuesday. Used to lose them. Now we book Wednesday morning."
              who="Dale Holcomb"
              shop="Holcomb Plumbing · Knoxville, TN"
              tone="ink"
            />
            <QuoteChip
              quote="We tested it on hold-music nights for two weeks. Front desk got their breath back."
              who="Dr. Anya Petrosyan"
              shop="Greenpoint Family Dental · Brooklyn"
              tone="sky"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, t }: { n: string; t: string }) {
  return (
    <div>
      <div className="font-display font-semibold text-[28px] md:text-[32px] leading-none">
        {n}
      </div>
      <div className="text-slate text-[13px] mt-2 leading-snug">{t}</div>
    </div>
  );
}

function QuoteChip({
  quote,
  who,
  shop,
  tone,
}: {
  quote: string;
  who: string;
  shop: string;
  tone: "copper" | "ink" | "sky";
}) {
  const accent =
    tone === "copper"
      ? "border-copper/50"
      : tone === "ink"
        ? "border-ink/30"
        : "border-sky/40";
  return (
    <figure
      className={`receiver-card p-5 md:p-6 border ${accent}`}
      style={{ background: "#FFFAF2" }}
    >
      <blockquote className="font-display text-[17px] md:text-[18px] leading-[1.45] text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-[12px] text-slate">
        <span className="font-medium text-ink">{who}</span>
        <span className="block label mt-1">{shop}</span>
      </figcaption>
    </figure>
  );
}

/* ---------------- Industries we serve ---------------- */

function IndustriesWeServe() {
  const industries = [
    {
      key: "dentist",
      label: "Dental practices",
      tagline: "Recall calls, new-patient intake, insurance pre-checks.",
      sample: "&ldquo;Hi — I think I cracked a filling. Can someone see me Friday?&rdquo;",
      icon: <DentistIcon />,
    },
    {
      key: "plumber",
      label: "Plumbers & home services",
      tagline: "Triage, dispatch, after-hours coverage.",
      sample: "&ldquo;Water under the kitchen sink, getting worse — how soon?&rdquo;",
      icon: <PlumberIcon />,
    },
    {
      key: "salon",
      label: "Hair, nails, lashes",
      tagline: "Booking, rebooking, stylist preferences, deposits.",
      sample: "&ldquo;Can I get balayage with Marisol next Saturday afternoon?&rdquo;",
      icon: <SalonIcon />,
    },
    {
      key: "restaurant",
      label: "Restaurants",
      tagline: "Reservations, menu questions, takeout, large-party intake.",
      sample: "&ldquo;Eight people, Friday at 7. Anywhere quiet enough to talk?&rdquo;",
      icon: <RestaurantIcon />,
    },
    {
      key: "clinic",
      label: "Clinics & vet offices",
      tagline: "Triage, prescription refills, pre-visit screening.",
      sample: "&ldquo;Mango ate a sock — is the after-hours fee waived if it's urgent?&rdquo;",
      icon: <ClinicIcon />,
    },
    {
      key: "contractor",
      label: "Contractors & trades",
      tagline: "Estimates, scheduling, &ldquo;is this within your service area?&rdquo;",
      sample: "&ldquo;We're remodeling the upstairs bathroom — do you do tile?&rdquo;",
      icon: <ContractorIcon />,
    },
  ];

  return (
    <section id="industries" className="border-b border-ink/15 section-band">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20 md:py-24">
        <SectionHeader
          kicker="01"
          eyebrow="Who we pick up for"
          title="Built for the businesses where the phone is the front door."
        />
        <p className="mt-5 max-w-2xl text-ink/85 text-[16px] md:text-[17px]">
          We are not a generic AI receptionist. Frontline is six tuned scripts
          — one per industry — that we adapt to your shop's hours, prices,
          quirks, and the real things your customers actually ask for. The
          examples below are pulled, lightly edited, from real calls we
          handled in the last sixty days.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((i) => (
            <article
              key={i.key}
              className="bg-cream border border-ink/15 rounded-card p-6 flex flex-col"
            >
              <div className="flex items-start gap-3">
                <span className="industry-icon" aria-hidden>
                  {i.icon}
                </span>
                <div>
                  <h3 className="font-display text-[20px] md:text-[22px] font-semibold leading-tight">
                    {i.label}
                  </h3>
                  <p className="mt-1 text-[14px] text-slate">{i.tagline}</p>
                </div>
              </div>
              <div className="mt-5 thin-rule pt-4 text-[14.5px] leading-[1.5] text-ink/80 italic">
                <span dangerouslySetInnerHTML={{ __html: i.sample }} />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-[14px] text-slate italic max-w-2xl">
          Don't see your trade? Veterinarians, optometrists, MedSpas, towing,
          locksmiths, real-estate brokerages — same architecture, we tune the
          script in a 30-minute call. Email{" "}
          <a className="copper" href={DESK_MAILTO}>
            desk@prin7r.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Tell us about your shop",
      d: "A 30-minute call with a real person. We capture your hours, your prices, your booking software, the questions you keep getting asked, and the answers you'd give if you weren't elbow-deep in a customer.",
    },
    {
      n: "02",
      t: "We script the agent and forward your line",
      d: "Within 72 hours we hand you a working agent on a real phone number. You hear it before any customer does. You forward your existing line — or we port the number — only when you're happy.",
    },
    {
      n: "03",
      t: "Calls roll in. You see the day's notes at 6pm.",
      d: "The agent answers, books into your calendar, and texts you anything urgent. At end-of-day you get a one-screen summary: who called, what they needed, what got booked. That is the whole product.",
    },
  ];

  return (
    <section id="how" className="border-b border-ink/15">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20 md:py-24">
        <SectionHeader
          kicker="02"
          eyebrow="How it works"
          title="Three steps. The longest one is the first call."
        />
        <p className="mt-5 max-w-2xl text-ink/85 text-[16px] md:text-[17px]">
          We deliberately avoid the &ldquo;sign up, watch a video, configure 40
          fields&rdquo; pattern. You're a small-business owner. Your time is
          worth more than that. The whole onboarding is one phone call and one
          listen-through.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-x-8 gap-y-12">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="font-display text-[44px] md:text-[52px] font-semibold text-copper leading-none">
                {s.n}
              </div>
              <span aria-hidden className="block w-9 h-[2px] bg-ink mt-3" />
              <h3 className="font-display text-[22px] md:text-[24px] font-semibold mt-3">
                {s.t}
              </h3>
              <p className="text-ink/80 mt-2 text-[15.5px] leading-[1.6]">
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sample call transcript ---------------- */

function SampleCallTranscript() {
  return (
    <section id="sample" className="border-b border-ink/15 section-band">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              kicker="03"
              eyebrow="Listen to a real call"
              title="A late-evening call to a dental practice."
            />
            <p className="mt-5 text-[16px] md:text-[17px] text-ink/85 leading-[1.6]">
              Below is a verbatim transcript from a Tuesday-evening call to
              one of our dental clients. The patient's name and phone number
              are redacted. The agent is reading from the practice's intake
              script and the patient's existing chart, then writing the
              appointment straight into the office's scheduling software.
            </p>
            <div className="mt-6 transcript-line-meta">
              Tuesday · 7:48 PM · Greenpoint Family Dental · 2m 14s · Booked.
            </div>
            <div className="mt-8 flex flex-col gap-3 text-[14px]">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="w-2 h-2 rounded-full bg-copper"
                />
                <span>Frontline (the agent)</span>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden className="w-2 h-2 rounded-full bg-ink" />
                <span>Caller (the patient)</span>
              </div>
            </div>
          </div>

          <article
            aria-label="Sample call transcript"
            className="lg:col-span-7 receiver-card p-7 md:p-9"
          >
            <div className="thin-rule pb-4 mb-5 flex items-center justify-between text-[12px] text-slate">
              <span className="label">Call · 7:48pm Tuesday</span>
              <span className="label">2 min 14 sec</span>
            </div>

            <ol className="space-y-4 text-[15.5px] leading-[1.55]">
              <li>
                <p className="transcript-line-frontline">
                  <strong>Frontline</strong> &mdash; Greenpoint Family Dental,
                  this is the answering desk. How can I help you tonight?
                </p>
              </li>
              <li>
                <p className="transcript-line-customer">
                  <strong>Caller</strong> &mdash; Hi &mdash; uh, sorry to call
                  late. I think I cracked a filling on a popcorn kernel. It's
                  not bleeding, but it's sharp when I drink something cold.
                </p>
              </li>
              <li>
                <p className="transcript-line-frontline">
                  <strong>Frontline</strong> &mdash; That sounds uncomfortable.
                  We can absolutely get you in. Can I have your first and last
                  name so I can pull your chart?
                </p>
              </li>
              <li>
                <p className="transcript-line-customer">
                  <strong>Caller</strong> &mdash; [REDACTED], yeah, I was in
                  for a cleaning in February.
                </p>
              </li>
              <li>
                <p className="transcript-line-frontline">
                  <strong>Frontline</strong> &mdash; Got it. I see Dr.
                  Petrosyan does your work. She has a 9:40 tomorrow, or a
                  12:15 if you'd rather come during lunch. The 9:40 is a
                  little better for cracked-filling work because she keeps her
                  morning blocks for repairs.
                </p>
              </li>
              <li>
                <p className="transcript-line-customer">
                  <strong>Caller</strong> &mdash; 9:40 is fine. I'll move my
                  call.
                </p>
              </li>
              <li>
                <p className="transcript-line-frontline">
                  <strong>Frontline</strong> &mdash; Booked. I'll send you a
                  confirmation text in a minute. One thing &mdash; Dr.
                  Petrosyan asks new repair patients to skip cold drinks the
                  morning of. Coffee is fine, just at room temp. Anything else
                  I can do for you tonight?
                </p>
              </li>
              <li>
                <p className="transcript-line-customer">
                  <strong>Caller</strong> &mdash; That's it. Thanks &mdash;
                  this was easier than I thought.
                </p>
              </li>
              <li>
                <p className="transcript-line-frontline">
                  <strong>Frontline</strong> &mdash; You're welcome. Take it
                  easy on the popcorn.
                </p>
              </li>
            </ol>

            <div className="thin-rule mt-6 pt-4 text-[12.5px] text-slate italic">
              Booked into Dentrix at 7:50pm · Confirmation SMS sent at 7:51pm ·
              Dr. Petrosyan saw the day's call summary at 6:00am Wednesday.
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust band ---------------- */

function TrustBand() {
  const items = [
    {
      n: "11.6 hrs",
      t: "Saved per week, on average, in front-desk phone time across our first 14 shops.",
    },
    {
      n: "97%",
      t: "Of after-hours calls answered within three rings on the After-Hours plan.",
    },
    {
      n: "0",
      t: "Robocalls. We do not run outbound campaigns. We only answer when you ring.",
    },
  ];

  return (
    <section className="border-b border-ink/15 bg-ink text-cream">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <div className="label" style={{ color: "#C99A2D" }}>
              Boring, on purpose
            </div>
            <h2 className="mt-4 font-display font-semibold text-[36px] md:text-[48px] leading-[1.06] tracking-tight">
              Front-desk relief, measured the way an
              owner&nbsp;measures&nbsp;it.
            </h2>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-3 gap-x-8 gap-y-8">
            {items.map((i) => (
              <div key={i.t}>
                <div className="font-display font-semibold text-[44px] md:text-[52px] leading-none text-cream">
                  {i.n}
                </div>
                <p className="text-cream/80 mt-3 text-[14.5px] leading-[1.55]">
                  {i.t}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */

type PricingTier = {
  name: string;
  badge?: string;
  price: string;
  cadence: string;
  perMin: string;
  bullets: string[];
  cta: string;
  highlight: boolean;
  planId?: PricingPlanId;
};

function Pricing() {
  const tiers: PricingTier[] = [
    {
      name: "After-Hours",
      price: "$140",
      cadence: "per month, billed monthly",
      perMin: "26¢ per minute outside business hours · 80 included after-hours minutes",
      bullets: [
        "Evening + weekend coverage only",
        "Calls during business hours roll to your existing voicemail",
        "Daily morning recap text",
        "Cancel any month — no contract",
      ],
      cta: "Pay $140 in stablecoin",
      highlight: false,
      planId: "afterhours",
    },
    {
      name: "Starter",
      badge: "Most owners pick this",
      price: "$290",
      cadence: "per month, billed monthly",
      perMin: "22¢ per minute after 250 included minutes",
      bullets: [
        "One trade-line voice agent, 24/7 coverage",
        "Bookings written straight into your software",
        "Daily call digest + urgent-call SMS",
        "One round of script revisions per month",
      ],
      cta: "Pay $290 in stablecoin",
      highlight: true,
      planId: "starter",
    },
    {
      name: "Growth",
      price: "$590",
      cadence: "per month, billed monthly",
      perMin: "18¢ per minute after 600 included minutes",
      bullets: [
        "Up to three locations or trade lines",
        "Three voice templates per location",
        "Intake form sync (Square, Booksy, Vagaro, Mindbody, Dentrix)",
        "Quarterly script tune-up + A/B test of voice",
      ],
      cta: "Pay $590 in stablecoin",
      highlight: false,
      planId: "growth",
    },
    {
      name: "Concierge",
      price: "Talk to us",
      cadence: "Multi-location chains, franchises, partner channels",
      perMin: "Custom per-minute, blended bucket across locations",
      bullets: [
        "Dedicated voice engineer for your chain",
        "Custom CRM / DSP / EHR integrations",
        "Quarterly business review with our chief of voice",
        "SLA, audit logs, and data-residency controls",
      ],
      cta: "Email Concierge",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="border-b border-ink/15">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20 md:py-24">
        <SectionHeader
          kicker="04"
          eyebrow="Honest pricing"
          title="A monthly base plus per-minute usage. No setup fee. No tricks."
        />
        <p className="mt-5 max-w-2xl text-ink/85 text-[16px] md:text-[17px]">
          The first month settles upfront in stablecoin (USDT or USDC) via
          NOWPayments hosted invoice — usually clears in fifteen minutes. From
          month two on, we send a single invoice on the first of the month
          covering the base plan plus any minutes over your bucket. We don't
          mark up Twilio. We don't mark up Vapi. The sheet is yours to read.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                "tier-card border bg-cream rounded-card p-7 flex flex-col " +
                (t.highlight
                  ? "border-copper ring-1 ring-copper"
                  : "border-ink/15")
              }
            >
              <div className="flex items-start justify-between">
                <div className="label">{t.name}</div>
                {t.badge && (
                  <span
                    className="label"
                    style={{ color: "var(--copper)" }}
                    aria-label={t.badge}
                  >
                    {t.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 font-display text-[40px] md:text-[44px] font-semibold leading-none">
                {t.price}
              </div>
              <div className="text-slate text-[13px] mt-1">{t.cadence}</div>
              <span aria-hidden className="block w-9 h-[1.5px] bg-copper mt-5" />
              <div className="font-mono text-[11px] tracking-wide text-slate uppercase mt-4 leading-snug">
                {t.perMin}
              </div>
              <ul className="mt-5 space-y-2.5 text-[14.5px] text-ink/85">
                {t.bullets.map((b) => (
                  <li key={b} className="grid grid-cols-[14px,1fr] gap-2">
                    <span aria-hidden className="font-mono text-copper text-[12px] mt-1">
                      ·
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                {t.planId ? (
                  <PricingCta
                    plan={t.planId}
                    label={t.cta}
                    className={
                      "btn justify-center w-full " +
                      (t.highlight ? "btn-copper" : "btn-ghost")
                    }
                  />
                ) : (
                  <a
                    href={CONCIERGE_MAILTO}
                    className="btn btn-ghost justify-center w-full mt-7"
                  >
                    {t.cta}
                    <Arrow />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[13.5px] text-slate italic max-w-2xl">
          A note on per-minute: we round up to the nearest second, not the
          nearest minute. Most calls are under 90 seconds. We will tell you on
          a pre-launch call what we expect your monthly minutes to look like
          based on your industry and your existing call volume — and we put
          that estimate in writing.
        </p>
      </div>
    </section>
  );
}

/* ---------------- What we won't do ---------------- */

function WhatWeWontDo() {
  const items = [
    "Run outbound campaigns. We never call your customers unless they call us first.",
    "Pretend to be a person when asked directly. The agent will tell a caller it's an answering desk if they ask.",
    "Push high-pressure upsell scripts. We answer the question they actually called about.",
    "Sell or share your call recordings. Audio is yours; we delete it on a 30-day rolling window unless you keep it.",
    "Lock you into a long contract. Cancel any month, take your number with you.",
  ];

  return (
    <section className="border-b border-ink/15 section-band">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20 md:py-24">
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-8">
          <div className="md:col-span-5">
            <SectionHeader
              kicker="05"
              eyebrow="Owner's covenant"
              title="What we won't do."
            />
            <p className="mt-5 text-[15.5px] text-ink/80 max-w-md">
              Some of these are unusual things to print on a homepage. We
              think small-business owners have been burned enough by phone
              software that they deserve to read the limits in plain English
              before they pick up the contract.
            </p>
          </div>
          <ul className="md:col-span-7 space-y-5 text-[17px] md:text-[18px] font-display leading-[1.5]">
            {items.map((i) => (
              <li
                key={i}
                className="grid grid-cols-[28px,1fr] gap-3 thin-rule pt-5"
              >
                <span
                  aria-hidden
                  className="font-mono text-copper text-[14px] mt-1.5"
                >
                  ×
                </span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FaqSection() {
  const faqs = [
    {
      q: "Will my callers know they're talking to a voice agent?",
      a: "If they ask, the agent says so plainly. We don't think it's right to deceive callers. In practice, almost no one asks — what they care about is whether their question got handled and whether they got an appointment.",
    },
    {
      q: "What if it gets a question wrong?",
      a: "The agent is built to escalate. If a caller is frustrated, asking for a person, or hits a question outside its script, it sends you an SMS with the caller's number and a one-line summary so you can call back inside an hour. You also see the full transcript at end-of-day.",
    },
    {
      q: "Which scheduling software do you connect to?",
      a: "Square, Booksy, Vagaro, Mindbody, Dentrix, Eaglesoft, Tebra, Practice Q, Jobber, Housecall Pro, OpenTable, Resy, Toast, Tock. If yours isn't listed, we will add it — most integrations take us 3–5 business days.",
    },
    {
      q: "What does a call actually cost me?",
      a: "Most calls are 60 to 120 seconds. On Starter at 22¢ per minute, that's 22–44¢ per call after your first 250 included minutes. We send you a daily minutes-used number so there are no end-of-month surprises.",
    },
    {
      q: "Do I have to switch my phone number?",
      a: "No. The simplest way is to forward your existing line during the hours you want covered. If you'd rather port your number to us, we handle the paperwork — but we'd rather start with forwarding so you can back out without paperwork.",
    },
    {
      q: "Why do you take stablecoin payments?",
      a: "Honestly: it's the cleanest, fastest rail for a small monthly invoice that crosses borders, and we're paid in the same currency we pay our infrastructure providers. If stablecoin isn't comfortable for you, email the desk — we will send a US bank transfer or ACH invoice the same day.",
    },
  ];

  return (
    <section className="border-b border-ink/15">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20 md:py-24">
        <SectionHeader
          kicker="06"
          eyebrow="The questions every owner asks"
          title="FAQ — written for the owner, not the procurement officer."
        />
        <div className="mt-12 grid md:grid-cols-2 gap-x-10 gap-y-10">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-display text-[20px] md:text-[22px] font-semibold leading-snug">
                {f.q}
              </h3>
              <p className="mt-3 text-[15.5px] leading-[1.6] text-ink/85">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Closing CTA ---------------- */

function ClosingCta() {
  return (
    <section id="contact" className="border-b border-ink/15">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="label">Last thing</div>
          <h2 className="mt-4 font-display font-semibold text-[36px] md:text-[56px] leading-[1.06] tracking-tight">
            Email the desk.{" "}
            <span className="text-copper italic">We'll have a line live by Friday.</span>
          </h2>
          <p className="mt-7 max-w-xl text-ink/85 text-[16.5px] leading-[1.6]">
            Tell us your business name, your hours, and the one question you
            keep getting asked when you can't pick up. That's the whole
            intake. We'll send you back a working agent by the end of the
            week.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={DESK_MAILTO} className="btn btn-copper">
              Email desk@prin7r.com
              <Arrow />
            </a>
            <Link href="#sample" className="btn btn-ghost">
              Listen first
              <Arrow />
            </Link>
          </div>
          <p className="font-mono text-[11px] tracking-wide text-slate uppercase mt-7">
            desk@prin7r.com · +1 (929) 295-1207 (rings our desk, never an agent) · Mon–Fri 9–5 ET
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-prose px-6 md:px-10 py-12 grid gap-8 md:grid-cols-3 items-end">
        <div>
          <Logo />
          <p className="mt-5 text-slate text-[13.5px] max-w-xs leading-[1.55]">
            Frontline is operated by Prin7r. Voice infrastructure on Twilio +
            Vapi/Bland under the hood. Built and serviced from Brooklyn,
            Lawrence, and Tbilisi.
          </p>
        </div>
        <div className="md:text-center">
          <div className="label">Built 2026 · v1</div>
          <p className="mt-3 font-display italic text-[15px]">
            &ldquo;Your voice while you're cutting hair.&rdquo;
          </p>
        </div>
        <div className="md:text-right">
          <ul className="space-y-2 text-[13.5px]">
            <li>
              <Link href="#industries" className="copper">
                Industries
              </Link>
            </li>
            <li>
              <Link href="#how" className="copper">
                How it works
              </Link>
            </li>
            <li>
              <Link href="#sample" className="copper">
                Listen to a call
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="copper">
                Pricing
              </Link>
            </li>
            <li>
              <a
                className="copper"
                href="https://github.com/prin7r-projects/voice-agents-local"
                target="_blank"
                rel="noreferrer"
              >
                Repository
              </a>
            </li>
          </ul>
          <p className="font-mono text-[10px] tracking-wide text-slate uppercase mt-5">
            © 2026 Prin7r · desk@prin7r.com
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Helpers ---------------- */

function SectionHeader({
  kicker,
  eyebrow,
  title,
}: {
  kicker: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="label">§ {kicker}</span>
        <span aria-hidden className="block w-8 h-[1px] bg-slate" />
        <span className="label">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display font-semibold text-[34px] md:text-[48px] leading-[1.05] tracking-tight max-w-3xl">
        {title}
      </h2>
      <span aria-hidden className="block w-9 h-[2px] bg-copper mt-5" />
    </div>
  );
}

/* ---------------- Industry icons (inline SVG, no raster) ---------------- */

function DentistIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4.5c1.6-1 3-1 5 0 2-1 3.4-1 5 0 1.5.9 2 2.4 1.6 4.4-.5 2.6-1.2 4.5-2.1 6.2-.6 1.1-1.1 2-1.6 3-.5 1-1.4 1.4-2.4.7-.4-.3-.6-.7-.7-1.2l-.5-2.4c-.1-.5-.4-.9-.9-1-.5.1-.8.5-.9 1l-.5 2.4c-.1.5-.3.9-.7 1.2-1 .7-1.9.3-2.4-.7-.5-1-1-1.9-1.6-3-.9-1.7-1.6-3.6-2.1-6.2-.4-2 .1-3.5 1.6-4.4z"
        stroke="#1F2526"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlumberIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 3v8" stroke="#1F2526" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 11h6" stroke="#1F2526" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11 11v3a3 3 0 0 0 3 3h2" stroke="#1F2526" strokeWidth="1.6" />
      <rect x="15" y="15" width="5" height="5" rx="1" stroke="#1F2526" strokeWidth="1.6" />
      <circle cx="5" cy="3" r="1.6" fill="#C2462A" />
    </svg>
  );
}

function SalonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.5" stroke="#1F2526" strokeWidth="1.5" />
      <circle cx="7" cy="17" r="2.5" stroke="#1F2526" strokeWidth="1.5" />
      <path d="M9 8.5 20 16" stroke="#1F2526" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 15.5 20 8" stroke="#1F2526" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="12" r="1.4" fill="#C2462A" />
    </svg>
  );
}

function RestaurantIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 3v8" stroke="#1F2526" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 3v4a2 2 0 0 0 4 0V3" stroke="#1F2526" strokeWidth="1.5" />
      <path d="M7 11v10" stroke="#1F2526" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M16 3c-2 0-3 2-3 5s1 4 3 4v9"
        stroke="#1F2526"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="6.4" r="1.4" fill="#C2462A" />
    </svg>
  );
}

function ClinicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="6" width="16" height="13" rx="1.5" stroke="#1F2526" strokeWidth="1.5" />
      <path d="M9 6V4h6v2" stroke="#1F2526" strokeWidth="1.5" />
      <path d="M12 10v6" stroke="#C2462A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 13h6" stroke="#C2462A" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ContractorIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m4 18 6-6 4 4 6-6"
        stroke="#1F2526"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 6h6v6" stroke="#1F2526" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="14" cy="16" r="1.4" fill="#C2462A" />
    </svg>
  );
}
