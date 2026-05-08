/**
 * [PICKUPCRAFT_NOWPAYMENTS] Server-side helpers for the NOWPayments hosted invoice.
 *
 * PickupCraft ships three self-serve tiers visible on the Pricing section. All
 * three flow through `POST /v1/invoice` (hosted page → customer pays in
 * USDT/USDC, with a fiat on-ramp partner where the NOWPayments account has
 * card enabled). Concierge tier is intentionally sales-led and never hits
 * this endpoint (mailto in page.tsx).
 *
 * `verifyNowpaymentsIpn` is the canonical HMAC-SHA512 verifier copied from
 * `/Users/keer/projects/prin7r/payments-prototypes/src/lib/signatures.ts`.
 * The provider posts a JSON body and signs the JSON of the alphabetically
 * sorted payload with the IPN secret. We never trust an unverified IPN.
 */

import crypto from "node:crypto";
import { MissingEnvError, optionalEnv } from "@/lib/env";

export type PlanId = "starter" | "growth" | "afterhours";

export type Plan = {
  id: PlanId;
  name: string;
  /** Total USD billed at checkout when the customer clicks "Start". */
  priceUsd: number;
  /** Short single-line description that shows up in the NOWPayments invoice. */
  description: string;
  /** What the buyer sees on the success page (also stored on the order). */
  cadence: string;
};

/**
 * NOTE: For Wave 2 launch we charge the FIRST month upfront via NOWPayments.
 * Per-minute usage above the included bucket is reconciled monthly through
 * desk@ — voice usage data lives in Vapi/Bland, not in this landing.
 * Pricing copy mirrors `docs/07-sales-strategy.md`.
 */
export const PLANS: Record<PlanId, Plan> = {
  starter: {
    id: "starter",
    name: "PickupCraft — Starter (first month)",
    priceUsd: 290,
    cadence: "$290 / month + 22¢ per minute after 250 included minutes",
    description:
      "PickupCraft Starter — single trade-line voice agent, 250 included minutes per month, scheduling + after-hours coverage. First month upfront in stablecoin.",
  },
  growth: {
    id: "growth",
    name: "PickupCraft — Growth (first month)",
    priceUsd: 590,
    cadence: "$590 / month + 18¢ per minute after 600 included minutes",
    description:
      "PickupCraft Growth — up to three locations, 600 included minutes, intake form sync, daily call digest, three voice templates per location.",
  },
  afterhours: {
    id: "afterhours",
    name: "PickupCraft — After-Hours (first month)",
    priceUsd: 140,
    cadence: "$140 / month + 26¢ per minute outside business hours",
    description:
      "PickupCraft After-Hours — evening + weekend coverage only, calls roll over to your voicemail during business hours, 80 included after-hours minutes.",
  },
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLANS;
}

export type CreateInvoiceInput = {
  plan: Plan;
  baseUrl: string;
  /** Optional shop/business name captured from the buy form. */
  business?: string;
};

export type NowpaymentsInvoice = {
  id: string;
  invoice_url: string;
  raw: Record<string, unknown>;
};

/**
 * Calls NOWPayments `POST /v1/invoice` to create a hosted invoice and
 * returns the invoice id + redirect URL. Never logs the API key.
 */
export async function createNowpaymentsInvoice(
  input: CreateInvoiceInput,
): Promise<NowpaymentsInvoice> {
  const apiKey = optionalEnv("NOWPAYMENTS_API_KEY");
  if (!apiKey) throw new MissingEnvError("NOWPAYMENTS_API_KEY");

  const sandbox =
    (optionalEnv("NOWPAYMENTS_SANDBOX") ?? "false").toLowerCase() === "true";
  const apiBase = sandbox
    ? "https://api-sandbox.nowpayments.io"
    : "https://api.nowpayments.io";

  const orderId = `pickupcraft_${input.plan.id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const body = {
    price_amount: input.plan.priceUsd,
    price_currency: "usd",
    order_id: orderId,
    order_description: input.plan.description,
    ipn_callback_url: `${input.baseUrl}/api/webhooks/nowpayments`,
    success_url: `${input.baseUrl}/?order=${orderId}&status=paid`,
    cancel_url: `${input.baseUrl}/?order=${orderId}&status=cancelled`,
    is_fee_paid_by_user: false,
    is_fixed_rate: false,
  };

  const response = await fetch(`${apiBase}/v1/invoice`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(text) as Record<string, unknown>;
  } catch {
    parsed = { raw: text };
  }
  if (!response.ok) {
    throw new Error(
      `NOWPayments returned HTTP ${response.status}: ${text.slice(0, 500)}`,
    );
  }

  const invoiceUrl =
    typeof parsed.invoice_url === "string" ? parsed.invoice_url : "";
  const invoiceId =
    typeof parsed.id === "string" || typeof parsed.id === "number"
      ? String(parsed.id)
      : orderId;

  if (!invoiceUrl) {
    throw new Error("NOWPayments response did not include invoice_url");
  }

  return {
    id: invoiceId,
    invoice_url: invoiceUrl,
    raw: parsed,
  };
}

/* ------------------------------------------------------------------ */
/* HMAC-SHA512 IPN verification — copied from payments-prototypes.    */
/* ------------------------------------------------------------------ */

function timingSafeEqualHex(left: string, right: string): boolean {
  const a = left.trim().toLowerCase();
  const b = right.trim().toLowerCase();
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

function sortObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortObject);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((result, key) => {
        result[key] = sortObject((value as Record<string, unknown>)[key]);
        return result;
      }, {});
  }
  return value;
}

export function verifyNowpaymentsIpn(
  payload: unknown,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false;
  const sorted = JSON.stringify(sortObject(payload));
  const expected = crypto
    .createHmac("sha512", secret.trim())
    .update(sorted)
    .digest("hex");
  return timingSafeEqualHex(expected, signature);
}
