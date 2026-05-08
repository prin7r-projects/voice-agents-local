import Link from "next/link";
import { PricingCta, type PricingPlanId } from "./pricing-cta";

export default function HomePage() {
  return (
    <main className="min-h-[100dvh] text-ink">
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
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-canvas/72 section-rule">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-4 md:py-5 flex items-center justify-between gap-6">
        <Link href="#top" className="flex items-center gap-3" aria-label="Frontline home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8 text-[13.5px] text-ink/70">
          <Link href="#industries" className="hover:text-ink transition-colors duration-300">
            Industries
          </Link>
          <Link href="#how" className="hover:text-ink transition-colors duration-300">
            How it works
          </Link>
          <Link href="#sample" className="hover:text-ink transition-colors duration-300">
            Listen
          </Link>
          <Link href="#pricing" className="hover:text-ink transition-colors duration-300">
            Pricing
          </Link>
          <a href={DESK_MAILTO} className="btn btn-copper">
            Talk to us
            <ArrowIcon />
          </a>
        </nav>
        <a href={DESK_MAILTO} className="md:hidden btn btn-copper !text-[12.5px] !py-2 !pl-4 !pr-2">
          Talk to us
          <ArrowIcon />
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="inline-flex items-center gap-3" aria-label="Frontline">
      {/* Receiver mark — refined: copper-tinted hairline cell, no solid ink block. */}
      <span
        aria-hidden
        className="relative inline-flex w-9 h-9 items-center justify-center rounded-[12px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(184,68,35,0.12), rgba(184,68,35,0.04))",
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(21,23,26,0.08), 0 6px 14px -10px rgba(184,68,35,0.4)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
          <path
            d="M9 11.6c0-1.4 1-2.6 2.4-2.7l1.6-.1c.6 0 1.1.4 1.3 1l1.1 3.4c.1.5 0 1.1-.5 1.4l-1.4 1c.6 1.3 1.7 2.4 3 3l1-1.4c.3-.4.9-.6 1.4-.5l3.4 1.1c.6.2 1 .7 1 1.3l-.1 1.6c-.1 1.4-1.3 2.4-2.7 2.4-7.5 0-12.5-5-12.5-12.5z"
            fill="#B84423"
          />
        </svg>
      </span>
      <span className="font-display text-[22px] font-semibold tracking-tight leading-none">
        Frontline
      </span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <span aria-hidden className="btn-icon font-mono">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h8m0 0L6.5 2.5M10 6 6.5 9.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* (legacy <Arrow /> removed — replaced by <ArrowIcon /> button-in-button.) */

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto max-w-prose px-6 md:px-10 pt-16 pb-24 md:pt-28 md:pb-36">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-20 items-start">
          <div className="lg:col-span-7">
            <span className="eyebrow reveal">
              <span className="eyebrow-dot pulse-dot" aria-hidden />
              <span>A Prin7r service · Open since 2026</span>
            </span>

            <h1 className="reveal mt-7 font-display font-semibold leading-[0.92] tracking-[-0.028em] text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px]">
              We pick up
              <br />
              the phone.
              <br />
              <span className="font-display italic text-copper [font-variation-settings:'opsz'_144,'SOFT'_50]">
                You stay focused.
              </span>
            </h1>

            <p
              className="reveal-2 mt-10 max-w-[600px] text-[18px] md:text-[19px] leading-[1.65] text-ink/75"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              Frontline runs the front-of-house phone for local businesses —
              dentists, plumbers, salons, restaurants, clinics, contractors. A
              calm, real-sounding voice answers every call, books the
              appointment in your calendar, and hands you a clean note at the
              end of the day. No missed calls. No phone tag. No &ldquo;press 1
              for English.&rdquo;
            </p>

            <div className="reveal-3 mt-12 flex flex-wrap gap-3">
              <a href={DESK_MAILTO} className="btn btn-copper">
                Get a line live this week
                <ArrowIcon />
              </a>
              <Link href="#sample" className="btn btn-ghost">
                Listen to a real call
                <ArrowIcon />
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 max-w-2xl">
              <Stat n="3 days" t="From signup to your first booked call" />
              <Stat n="0" t="Calls dropped on live agents" />
              <Stat n="$290" t="No setup fee. Cancel anytime." />
            </div>
          </div>

          {/* Quote chips — asymmetric stack, light z-axis offset. */}
          <aside className="lg:col-span-5 lg:pl-6 lg:pt-8 grid grid-cols-1 gap-5">
            <QuoteChip
              quote="My chair time used to get eaten by the phone. Now I don't even hear it ring — I just see the booking come in."
              who="Marisol Tavárez"
              shop="Tavárez Cuts · Lawrence, MA"
              tone="copper"
              offset="lg:translate-x-2"
            />
            <QuoteChip
              quote="Customers call about a clogged drain at 11 p.m. on a Tuesday. Used to lose them. Now we book Wednesday morning."
              who="Dale Holcomb"
              shop="Holcomb Plumbing · Knoxville, TN"
              tone="ink"
              offset="lg:-translate-x-3"
            />
            <QuoteChip
              quote="We tested it on hold-music nights for two weeks. Front desk got their breath back."
              who="Dr. Anya Petrosyan"
              shop="Greenpoint Family Dental · Brooklyn"
              tone="sage"
              offset="lg:translate-x-1"
            />
          </aside>
        </div>
      </div>
      <div className="section-rule" />
    </section>
  );
}

function Stat({ n, t }: { n: string; t: string }) {
  return (
    <div>
      <div className="font-display font-semibold text-[34px] md:text-[40px] leading-none tracking-[-0.025em] tabular">
        {n}
      </div>
      <div className="text-slate text-[12.5px] mt-3 leading-snug max-w-[200px]">
        {t}
      </div>
    </div>
  );
}

function QuoteChip({
  quote,
  who,
  shop,
  tone,
  offset,
}: {
  quote: string;
  who: string;
  shop: string;
  tone: "copper" | "ink" | "sage";
  offset?: string;
}) {
  const accentRing =
    tone === "copper"
      ? "ring-1 ring-copper/25"
      : tone === "ink"
        ? "ring-1 ring-ink/10"
        : "ring-1 ring-sage/30";
  const dotColor =
    tone === "copper" ? "bg-copper" : tone === "ink" ? "bg-ink" : "bg-sage";
  return (
    <figure
      className={`receiver-card relative p-6 md:p-7 ${accentRing} ${
        offset ?? ""
      } transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1`}
    >
      <span
        aria-hidden
        className={`absolute -top-1.5 left-7 w-2 h-2 rounded-full ${dotColor}`}
      />
      <blockquote
        className="font-display text-[17px] md:text-[18.5px] leading-[1.5] text-ink/90 [font-variation-settings:'opsz'_18]"
        style={{ textWrap: "pretty" } as React.CSSProperties}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-[12px]">
        <span className="font-medium text-ink">{who}</span>
        <span className="block label mt-1.5">{shop}</span>
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

  // Asymmetric bento — first card spans wide on desktop for visual hierarchy.
  const tileSpan = (idx: number) => {
    // 6 items: row 1 = wide-narrow-narrow; row 2 = narrow-wide-narrow → broken grid.
    if (idx === 0) return "lg:col-span-6";
    if (idx === 1) return "lg:col-span-3";
    if (idx === 2) return "lg:col-span-3";
    if (idx === 3) return "lg:col-span-3";
    if (idx === 4) return "lg:col-span-6";
    return "lg:col-span-3";
  };

  return (
    <section id="industries" className="section-band">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-36">
        <SectionHeader
          kicker="01"
          eyebrow="Who we pick up for"
          title="Built for the businesses where the phone is the front door."
        />
        <p
          className="mt-7 max-w-2xl text-ink/75 text-[16.5px] md:text-[17.5px] leading-[1.65]"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          We are not a generic AI receptionist. Frontline is six tuned scripts
          — one per industry — that we adapt to your shop&rsquo;s hours,
          prices, quirks, and the real things your customers actually ask for.
          The examples below are pulled, lightly edited, from real calls we
          handled in the last sixty days.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7 md:gap-8 lg:gap-10">
          {industries.map((i, idx) => (
            <article
              key={i.key}
              className={`group relative ${tileSpan(idx)} bezel transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1`}
            >
              <div className="bezel-inner p-7 md:p-9 h-full flex flex-col">
                <div className="flex items-start gap-4">
                  <span className="industry-icon shrink-0" aria-hidden>
                    {i.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[22px] md:text-[24px] font-semibold leading-[1.1] tracking-[-0.018em]">
                      {i.label}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate leading-[1.55]">
                      {i.tagline}
                    </p>
                  </div>
                </div>
                <div
                  className="mt-7 pt-5 thin-rule font-display italic text-[16px] md:text-[16.5px] leading-[1.55] text-ink/85 [font-variation-settings:'opsz'_18]"
                  style={{ textWrap: "pretty" } as React.CSSProperties}
                >
                  <span dangerouslySetInnerHTML={{ __html: i.sample }} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 text-[13.5px] text-slate italic max-w-2xl">
          Don&rsquo;t see your trade? Veterinarians, optometrists, MedSpas,
          towing, locksmiths, real-estate brokerages &mdash; same architecture,
          we tune the script in a 30-minute call. Email{" "}
          <a
            className="text-copper underline-offset-4 hover:underline"
            href={DESK_MAILTO}
          >
            desk@prin7r.com
          </a>
          .
        </p>
      </div>
      <div className="section-rule" />
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
    <section id="how" className="relative">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-36">
        <SectionHeader
          kicker="02"
          eyebrow="How it works"
          title="Three steps. The longest one is the first call."
        />
        <p
          className="mt-7 max-w-2xl text-ink/75 text-[16.5px] md:text-[17.5px] leading-[1.65]"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          We deliberately avoid the &ldquo;sign up, watch a video, configure 40
          fields&rdquo; pattern. You&rsquo;re a small-business owner. Your time
          is worth more than that. The whole onboarding is one phone call and
          one listen-through.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-x-12 gap-y-14">
          {steps.map((s, idx) => (
            <div
              key={s.n}
              className="relative"
              style={{
                paddingTop: idx === 1 ? "0" : idx === 2 ? "1.5rem" : "0",
              }}
            >
              <div className="font-display text-[56px] md:text-[68px] font-semibold text-copper leading-none tracking-[-0.04em] tabular [font-variation-settings:'opsz'_144]">
                {s.n}
              </div>
              <span
                aria-hidden
                className="block w-12 h-[1px] bg-ink/30 mt-5"
              />
              <h3 className="font-display text-[24px] md:text-[26px] font-semibold mt-5 leading-[1.15] tracking-[-0.02em] [font-variation-settings:'opsz'_72]">
                {s.t}
              </h3>
              <p
                className="text-ink/75 mt-4 text-[15.5px] leading-[1.65] max-w-[36ch]"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                {s.d}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-rule" />
    </section>
  );
}

/* ---------------- Sample call transcript ---------------- */

function SampleCallTranscript() {
  // Verbatim 9-turn transcript — preserved exactly, only typography changes.
  const turns: { who: "frontline" | "caller"; line: string }[] = [
    {
      who: "frontline",
      line:
        "Greenpoint Family Dental, this is the answering desk. How can I help you tonight?",
    },
    {
      who: "caller",
      line:
        "Hi — uh, sorry to call late. I think I cracked a filling on a popcorn kernel. It's not bleeding, but it's sharp when I drink something cold.",
    },
    {
      who: "frontline",
      line:
        "That sounds uncomfortable. We can absolutely get you in. Can I have your first and last name so I can pull your chart?",
    },
    {
      who: "caller",
      line: "[REDACTED], yeah, I was in for a cleaning in February.",
    },
    {
      who: "frontline",
      line:
        "Got it. I see Dr. Petrosyan does your work. She has a 9:40 tomorrow, or a 12:15 if you'd rather come during lunch. The 9:40 is a little better for cracked-filling work because she keeps her morning blocks for repairs.",
    },
    { who: "caller", line: "9:40 is fine. I'll move my call." },
    {
      who: "frontline",
      line:
        "Booked. I'll send you a confirmation text in a minute. One thing — Dr. Petrosyan asks new repair patients to skip cold drinks the morning of. Coffee is fine, just at room temp. Anything else I can do for you tonight?",
    },
    {
      who: "caller",
      line: "That's it. Thanks — this was easier than I thought.",
    },
    {
      who: "frontline",
      line: "You're welcome. Take it easy on the popcorn.",
    },
  ];

  return (
    <section id="sample" className="section-band relative">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-36">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-14 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeader
              kicker="03"
              eyebrow="Listen to a real call"
              title="A late-evening call to a dental practice."
            />
            <p
              className="mt-7 text-[16.5px] md:text-[17px] text-ink/75 leading-[1.65]"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              A verbatim transcript from a Tuesday-evening call to one of our
              dental clients. The patient&rsquo;s name and phone number are
              redacted. The agent is reading from the practice&rsquo;s intake
              script and the patient&rsquo;s existing chart, then writing the
              appointment straight into the office&rsquo;s scheduling
              software.
            </p>
            <div className="mt-8 transcript-line-meta">
              Tuesday · 7:48 PM · Greenpoint Family Dental · 2m 14s · Booked
            </div>
            <div className="mt-9 flex flex-col gap-3.5 text-[13px]">
              <div className="flex items-center gap-3">
                <span aria-hidden className="w-2 h-2 rounded-full bg-copper" />
                <span className="text-ink/85">Frontline — the agent</span>
              </div>
              <div className="flex items-center gap-3">
                <span aria-hidden className="w-2 h-2 rounded-full bg-ink" />
                <span className="text-ink/85">Caller — the patient</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <article
              aria-label="Sample call transcript"
              className="bezel"
            >
              <div className="bezel-inner p-8 md:p-10">
                <div className="pb-5 mb-6 thin-rule flex items-center justify-between">
                  <span className="label">Call · 7:48 PM Tuesday</span>
                  <span className="label tabular">2 min 14 sec</span>
                </div>

                <ol className="space-y-5 text-[15.5px] md:text-[16px] leading-[1.62] font-display [font-variation-settings:'opsz'_18]">
                  {turns.map((t, idx) => (
                    <li key={idx} className="grid grid-cols-[80px_1fr] gap-4">
                      <span className="label pt-[3px]">
                        {t.who === "frontline" ? "Frontline" : "Caller"}
                      </span>
                      <p
                        className={
                          t.who === "frontline"
                            ? "transcript-line-frontline"
                            : "transcript-line-customer"
                        }
                        style={{ textWrap: "pretty" } as React.CSSProperties}
                      >
                        {t.line}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="thin-rule mt-8 pt-5 text-[12px] text-slate italic leading-[1.6]">
                  Booked into Dentrix at 7:50 PM · Confirmation SMS sent at
                  7:51 PM · Dr. Petrosyan saw the day&rsquo;s call summary at
                  6:00 AM Wednesday.
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <div className="section-rule" />
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
    <section className="trust-band">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-32">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5">
            <span
              className="label"
              style={{ color: "rgba(255,251,235,0.6)" }}
            >
              Boring, on purpose
            </span>
            <h2
              className="mt-5 font-display font-semibold text-[40px] md:text-[56px] leading-[1.02] tracking-[-0.025em] text-canvas [font-variation-settings:'opsz'_144]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Front-desk relief, measured the way an
              owner&nbsp;measures&nbsp;it.
            </h2>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-3 gap-x-10 gap-y-12">
            {items.map((i) => (
              <div key={i.t}>
                <div className="font-display font-semibold text-[48px] md:text-[60px] leading-none text-canvas tracking-[-0.04em] tabular [font-variation-settings:'opsz'_144]">
                  {i.n}
                </div>
                <span
                  aria-hidden
                  className="block w-9 h-[1px] mt-5"
                  style={{ background: "rgba(255,251,235,0.25)" }}
                />
                <p className="text-canvas/70 mt-5 text-[14px] leading-[1.6]">
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
    <section id="pricing" className="relative">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-36">
        <SectionHeader
          kicker="04"
          eyebrow="Honest pricing"
          title="A monthly base plus per-minute usage. No setup fee. No tricks."
        />
        <p
          className="mt-7 max-w-2xl text-ink/75 text-[16.5px] md:text-[17.5px] leading-[1.65]"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          The first month settles upfront in stablecoin (USDT or USDC) via
          NOWPayments hosted invoice &mdash; usually clears in fifteen
          minutes. From month two on, we send a single invoice on the first of
          the month covering the base plan plus any minutes over your bucket.
          We don&rsquo;t mark up Twilio. We don&rsquo;t mark up Vapi. The
          sheet is yours to read.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                "tier-card relative p-8 flex flex-col " +
                (t.highlight ? "tier-highlight" : "")
              }
            >
              {t.badge && (
                <span
                  className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper text-canvas text-[10px] tracking-[0.16em] uppercase font-semibold font-mono"
                  aria-label={t.badge}
                >
                  <span
                    aria-hidden
                    className="w-1.5 h-1.5 rounded-full bg-canvas/80"
                  />
                  {t.badge}
                </span>
              )}
              <div className="label">{t.name}</div>
              <div className="mt-4 font-display text-[44px] md:text-[48px] font-semibold leading-[0.95] tracking-[-0.03em] tabular [font-variation-settings:'opsz'_144]">
                {t.price}
              </div>
              <div className="text-slate text-[12.5px] mt-2 leading-[1.5]">
                {t.cadence}
              </div>
              <span
                aria-hidden
                className="block w-9 h-[1px] bg-copper/60 mt-6"
              />
              <div className="font-mono text-[10px] tracking-[0.14em] text-slate uppercase mt-5 leading-[1.55]">
                {t.perMin}
              </div>
              <ul className="mt-6 space-y-3 text-[14px] text-ink/85 leading-[1.55]">
                {t.bullets.map((b) => (
                  <li key={b} className="grid grid-cols-[16px_1fr] gap-2">
                    <span
                      aria-hidden
                      className="text-copper font-mono text-[14px] mt-[2px] leading-none"
                    >
                      —
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
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
                    <ArrowIcon />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 text-[13px] text-slate italic max-w-2xl leading-[1.65]">
          A note on per-minute: we round up to the nearest second, not the
          nearest minute. Most calls are under 90 seconds. We will tell you on
          a pre-launch call what we expect your monthly minutes to look like
          based on your industry and your existing call volume &mdash; and we
          put that estimate in writing.
        </p>
      </div>
      <div className="section-rule" />
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
    <section className="section-band relative">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-36">
        <div className="grid md:grid-cols-12 gap-x-12 gap-y-10">
          <div className="md:col-span-5 lg:col-span-4">
            <SectionHeader
              kicker="05"
              eyebrow="Owner's covenant"
              title="What we won't do."
            />
            <p
              className="mt-7 text-[15.5px] text-ink/75 max-w-md leading-[1.65]"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              Some of these are unusual things to print on a homepage. We
              think small-business owners have been burned enough by phone
              software that they deserve to read the limits in plain English
              before they pick up the contract.
            </p>
          </div>
          <ul className="md:col-span-7 lg:col-span-8 lg:pl-6 space-y-7 font-display text-[17px] md:text-[19px] leading-[1.45] tracking-[-0.01em] [font-variation-settings:'opsz'_18]">
            {items.map((i) => (
              <li
                key={i}
                className="grid grid-cols-[36px_1fr] gap-3 pt-6 thin-rule"
              >
                <span
                  aria-hidden
                  className="text-copper mt-2"
                  style={{ fontFamily: '"JetBrains Mono", monospace' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 3l10 10M13 3 3 13"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span
                  className="text-ink/90"
                  style={{ textWrap: "pretty" } as React.CSSProperties}
                >
                  {i}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="section-rule" />
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
    <section className="relative">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-36">
        <SectionHeader
          kicker="06"
          eyebrow="The questions every owner asks"
          title="FAQ — written for the owner, not the procurement officer."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-12">
          {faqs.map((f, idx) => (
            <div
              key={f.q}
              className="pt-7 thin-rule"
              style={{ paddingTop: idx < 2 ? "0" : undefined, borderTop: idx < 2 ? "0" : undefined }}
            >
              <h3
                className="font-display text-[20px] md:text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] [font-variation-settings:'opsz'_18]"
                style={{ textWrap: "balance" } as React.CSSProperties}
              >
                {f.q}
              </h3>
              <p
                className="mt-4 text-[15px] leading-[1.65] text-ink/75"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="section-rule" />
    </section>
  );
}

/* ---------------- Closing CTA ---------------- */

function ClosingCta() {
  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-28 md:py-40">
        <div className="max-w-3xl">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden style={{ background: "var(--copper)" }} />
            Last thing
          </span>
          <h2
            className="mt-7 font-display font-semibold text-[40px] md:text-[64px] lg:text-[72px] leading-[0.98] tracking-[-0.028em] [font-variation-settings:'opsz'_144]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Email the desk.{" "}
            <span className="text-copper italic [font-variation-settings:'opsz'_144,'SOFT'_50]">
              We&rsquo;ll have a line live by Friday.
            </span>
          </h2>
          <p
            className="mt-9 max-w-xl text-ink/75 text-[16.5px] leading-[1.65]"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            Tell us your business name, your hours, and the one question you
            keep getting asked when you can&rsquo;t pick up. That&rsquo;s the
            whole intake. We&rsquo;ll send you back a working agent by the end
            of the week.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <a href={DESK_MAILTO} className="btn btn-copper">
              Email desk@prin7r.com
              <ArrowIcon />
            </a>
            <Link href="#sample" className="btn btn-ghost">
              Listen first
              <ArrowIcon />
            </Link>
          </div>
          <p className="label mt-10">
            desk@prin7r.com &nbsp;·&nbsp; +1 (929) 295-1207 &nbsp;·&nbsp;
            Mon&ndash;Fri 9&ndash;5 ET
          </p>
        </div>
      </div>
      <div className="section-rule" />
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-prose px-6 md:px-10 py-16 grid gap-12 md:grid-cols-3 items-start">
        <div>
          <Logo />
          <p className="mt-6 text-slate text-[13px] max-w-xs leading-[1.65]">
            Frontline is operated by Prin7r. Voice infrastructure on Twilio +
            Vapi/Bland under the hood. Built and serviced from Brooklyn,
            Lawrence, and Tbilisi.
          </p>
        </div>
        <div className="md:text-center">
          <div className="label">Built 2026 · v2</div>
          <p
            className="mt-4 font-display italic text-[15.5px] text-ink/85 [font-variation-settings:'opsz'_18,'SOFT'_40]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            &ldquo;Your voice while you&rsquo;re cutting hair.&rdquo;
          </p>
        </div>
        <div className="md:text-right">
          <ul className="space-y-2.5 text-[13px] text-ink/70">
            <li>
              <Link
                href="#industries"
                className="hover:text-copper transition-colors duration-300"
              >
                Industries
              </Link>
            </li>
            <li>
              <Link
                href="#how"
                className="hover:text-copper transition-colors duration-300"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                href="#sample"
                className="hover:text-copper transition-colors duration-300"
              >
                Listen to a call
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="hover:text-copper transition-colors duration-300"
              >
                Pricing
              </Link>
            </li>
            <li>
              <a
                className="hover:text-copper transition-colors duration-300"
                href="https://github.com/prin7r-projects/voice-agents-local"
                target="_blank"
                rel="noreferrer"
              >
                Repository
              </a>
            </li>
          </ul>
          <p className="label mt-6">
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
        <span className="eyebrow tabular">
          <span aria-hidden>§ {kicker}</span>
          <span aria-hidden className="block w-6 h-[1px] bg-ink/20" />
          <span>{eyebrow}</span>
        </span>
      </div>
      <h2
        className="mt-7 font-display font-semibold text-[36px] md:text-[52px] lg:text-[60px] leading-[1.0] tracking-[-0.025em] max-w-3xl [font-variation-settings:'opsz'_144]"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {title}
      </h2>
      <span aria-hidden className="block w-12 h-[1px] bg-copper mt-7" />
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
