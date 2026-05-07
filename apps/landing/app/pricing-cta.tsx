"use client";
/**
 * [FRONTLINE_PRICING_CTA] Client component that turns each self-serve pricing
 * tier into a NOWPayments hosted-invoice CTA.
 *
 * On click → `POST /api/checkout/nowpayments` → redirect to the returned
 * `invoice_url`. If the route returns 503 (env not yet wired) or any other
 * error, we surface a small line under the button and fall back to the
 * desk@ mailto so the buyer never hits a dead end.
 */

import { useState } from "react";
import Link from "next/link";

export type PricingPlanId = "starter" | "growth" | "afterhours";

type Props = {
  plan: PricingPlanId;
  label: string;
  className?: string;
};

const FALLBACK_MAILTO =
  "mailto:desk@prin7r.com?subject=Frontline%20-%20get%20a%20line%20live%20for%20my%20shop&body=Business%20name%3A%0A%0AIndustry%20(dentist%2C%20plumber%2C%20salon%2C%20restaurant%2C%20clinic%2C%20contractor)%3A%0A%0ABusiness%20phone%20number%3A%0A%0AHours%20you%20want%20covered%3A%0A%0AOne-line%20description%20of%20your%20typical%20customer%20question%3A%0A";

export function PricingCta({ plan, label, className }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const response = await fetch("/api/checkout/nowpayments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = (await response.json().catch(() => null)) as
        | { invoice_url?: string; message?: string; error?: string }
        | null;

      if (response.ok && data?.invoice_url) {
        window.location.href = data.invoice_url;
        return;
      }

      const message =
        data?.message ??
        `Checkout unavailable (HTTP ${response.status}). Email the desk and we will send you a stablecoin invoice the same day.`;
      setError(message);
    } catch {
      setError(
        "Checkout unavailable. Email the desk and we will send you a stablecoin invoice the same day.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-7 flex flex-col">
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-busy={busy}
        className={
          (className ?? "btn justify-center") +
          (busy ? " opacity-60 cursor-not-allowed" : "")
        }
      >
        {busy ? "Opening invoice…" : label}
        <span aria-hidden className="font-mono text-[14px]">
          →
        </span>
      </button>
      {error && (
        <p className="mt-3 text-[12px] text-slate italic">
          {error}{" "}
          <Link href={FALLBACK_MAILTO} className="copper underline">
            Email the desk
          </Link>
          .
        </p>
      )}
    </div>
  );
}
