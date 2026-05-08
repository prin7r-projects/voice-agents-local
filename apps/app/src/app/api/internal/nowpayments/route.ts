import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

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

    // Send intake email via Resend
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://voice-agents-local.prin7r.com";
    const intakeLink = `${appUrl}/intake/${token}`;

    const resendKey = process.env.AUTH_RESEND_KEY;
    if (resendKey && email) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: process.env.AUTH_RESEND_FROM ?? "PickupCraft <noreply@pickupcraft.prin7r.com>",
          to: email,
          subject: "Set up your PickupCraft voice agent",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
              <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 8px;">Welcome to PickupCraft</h1>
              <p style="color: #6B7280; margin-bottom: 24px;">
                Your payment was received. Complete your shop setup so we can get your voice agent live within 72 hours.
              </p>
              <a href="${intakeLink}" style="display: inline-block; background: #111827; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px;">
                Set up your shop
              </a>
              <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">
                This link expires in 7 days. If you didn't request this, ignore this email.
              </p>
            </div>
          `,
        });
        console.log(`[PICKUPCRAFT_INTAKE] email sent to=${email} token=${token}`);
      } catch (emailErr) {
        console.error("[PICKUPCRAFT_INTAKE] email send failed:", emailErr);
        // Don't fail the request if email fails — token is still valid
      }
    } else {
      console.log(
        `[PICKUPCRAFT_INTAKE] email skipped (resendKey=${!!resendKey} email=${!!email}) token=${token}`
      );
    }

    console.log(
      `[PICKUPCRAFT_INTAKE] token=${token} plan=${plan} order=${order_id}`
    );

    return NextResponse.json({ ok: true, token, expiresAt, intakeLink });
  } catch (e: any) {
    console.error("Internal nowpayments bridge error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
