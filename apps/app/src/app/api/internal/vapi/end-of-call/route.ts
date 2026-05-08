import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-pickupcraft-secret");
  if (secret !== process.env.PICKUPCRAFT_INTERNAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      call_id,
      shop_id,
      transcript,
      duration,
      intent,
      outcome,
      caller_number,
      recording_url,
    } = body;

    const call = await prisma.call.create({
      data: {
        id: call_id,
        shopId: shop_id,
        callerNumber: caller_number,
        durationS: duration ?? 0,
        intent: intent ?? "other",
        outcome: outcome ?? "hung_up",
        transcript: transcript ?? "",
        recordingUrl: recording_url,
      },
    });

    return NextResponse.json({ ok: true, callId: call.id });
  } catch (e: any) {
    console.error("Vapi end-of-call webhook error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
