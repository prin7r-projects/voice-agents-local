/**
 * [ROLLCALL_NOWPAYMENTS_CHECKOUT] POST /api/checkout/nowpayments
 *
 * Body:    { plan: "starter" | "growth" | "afterhours", business?: string }
 * Returns: { invoice_url: string, invoice_id: string, plan: string, mode: "live" }
 *
 * Errors:
 *   HTTP 400 — unknown plan id
 *   HTTP 503 — missing env (operator gap, not auth)
 *   HTTP 502 — upstream NOWPayments failure (provider error message bubbled)
 *
 * Never logs the API key. The NOWPayments hosted invoice is the redirect target;
 * the buyer pays in stablecoin (USDT/USDC). When the merchant account has card
 * enabled, the invoice itself surfaces the fiat-on-ramp partner.
 */

import { NextResponse } from "next/server";
import { MissingEnvError, appUrlFromRequest } from "@/lib/env";
import { PLANS, createNowpaymentsInvoice, isPlanId } from "@/lib/nowpayments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckoutBody = {
  plan?: string;
  business?: string;
};

export async function POST(request: Request) {
  let body: CheckoutBody = {};
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    body = {};
  }

  const planId = body.plan;
  if (!isPlanId(planId)) {
    return NextResponse.json(
      {
        error: "unknown_plan",
        message: `Unknown plan: ${String(planId)}. Allowed: ${Object.keys(PLANS).join(", ")}.`,
      },
      { status: 400 },
    );
  }
  const plan = PLANS[planId];

  const baseUrl = appUrlFromRequest(request);

  try {
    const invoice = await createNowpaymentsInvoice({
      plan,
      baseUrl,
      business: typeof body.business === "string" ? body.business : undefined,
    });
    return NextResponse.json({
      mode: "live",
      plan: plan.id,
      price_usd: plan.priceUsd,
      invoice_id: invoice.id,
      invoice_url: invoice.invoice_url,
    });
  } catch (error) {
    if (error instanceof MissingEnvError) {
      return NextResponse.json(
        {
          error: "missing_env",
          missing: error.envName,
          message:
            "NOWPayments is not configured on this deployment yet. Email desk@prin7r.com — we will pick up your shop and send a stablecoin invoice the same day.",
        },
        { status: 503 },
      );
    }
    const message = error instanceof Error ? error.message : "unknown_error";
    return NextResponse.json(
      {
        error: "upstream_error",
        message,
      },
      { status: 502 },
    );
  }
}
