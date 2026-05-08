import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Internal bridge from landing NOWPayments webhook.
 * Landing verifies the IPN signature, then forwards the paid event here
 * so the app can create an intake token and onboarding record.
 *
 * Auth: shared secret via x-pickupcraft-internal header.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-pickupcraft-internal");
  if (secret !== process.env.PICKUPCRAFT_INTERNAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { order_id, paid, plan, email } = await req.json();
    if (!paid) {
      return NextResponse.json({ ok: true, action: "ignored_unpaid" });
    }

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    await prisma.intakeToken.create({
      data: {
        id: token,
        email: email ?? "unknown@pickupcraft.prin7r.com",
        plan: plan ?? "starter",
        used: false,
        expiresAt,
      },
    });

    // TODO: send email with intake link via Postmark/Resend
    console.log(
      `[PICKUPCRAFT_INTAKE] token=${token} plan=${plan} order=${order_id}`
    );

    return NextResponse.json({ ok: true, token, expiresAt });
  } catch (e: any) {
    console.error("Internal nowpayments bridge error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
