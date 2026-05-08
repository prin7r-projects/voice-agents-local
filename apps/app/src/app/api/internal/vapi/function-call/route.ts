import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function sendTwilioSms(to: string, body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_SMS_FROM;
  if (!sid || !token || !from) {
    console.error("[TWILIO] missing credentials");
    return;
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: to, From: from, Body: body }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("[TWILIO] send failed:", res.status, text.slice(0, 500));
  }
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-pickupcraft-secret");
  if (secret !== process.env.PICKUPCRAFT_INTERNAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { call_id, function: fn, args, shop_id } = await req.json();

    // Pass-through for booking function calls
    if (fn === "book_appointment" || fn === "lookup_calendar_availability") {
      // TODO: route to provider adapter
      return NextResponse.json({ ok: true, callId: call_id, result: "deferred" });
    }

    if (fn === "send_owner_sms") {
      const shop = shop_id
        ? await prisma.shop.findUnique({ where: { id: shop_id } })
        : null;
      if (shop?.ownerSms) {
        const summary = args?.summary ?? "Urgent call received";
        await sendTwilioSms(shop.ownerSms, `[PickupCraft] ${summary}`);
        return NextResponse.json({ ok: true, callId: call_id, result: "sms_sent" });
      }
      return NextResponse.json({ ok: true, callId: call_id, result: "no_owner_sms" });
    }

    return NextResponse.json({ ok: true, callId: call_id, result: "noop" });
  } catch (e: any) {
    console.error("Vapi function-call webhook error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
