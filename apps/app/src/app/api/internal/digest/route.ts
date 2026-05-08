import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function sendPostmarkEmail(to: string, subject: string, body: string) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    console.error("[POSTMARK] missing token");
    return false;
  }
  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify({
      From: process.env.FROM_EMAIL ?? "PickupCraft <noreply@pickupcraft.prin7r.com>",
      To: to,
      Subject: subject,
      TextBody: body,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("[POSTMARK] send failed:", res.status, text.slice(0, 500));
    return false;
  }
  return true;
}

/**
 * POST /api/internal/digest
 * Auth: shared secret via x-pickupcraft-secret
 *
 * Generates and sends the daily digest for a single shop.
 * Called by an external cron (or manually) for each shop at 18:00 local time.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-pickupcraft-secret");
  if (secret !== process.env.PICKUPCRAFT_INTERNAL_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { shop_id, day } = await req.json();
    const shop = await prisma.shop.findUnique({
      where: { id: shop_id },
      include: { calls: { where: { startedAt: { gte: new Date(day) } } } },
    });

    if (!shop) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    const calls = shop.calls;
    const booked = calls.filter((c) => c.outcome === "booked").length;
    const escalated = calls.filter((c) => c.outcome === "escalated").length;

    const lines = [
      `${shop.name} — Daily digest`,
      ``,
      `Total calls: ${calls.length}`,
      `Booked: ${booked}`,
      `Escalated: ${escalated}`,
      ``,
      calls
        .map(
          (c) =>
            `- ${c.callerNumber} · ${c.intent ?? "unknown"} · ${c.outcome ?? "unknown"}`
        )
        .join("\n") || "No calls today.",
      ``,
      `— PickupCraft`,
    ];

    const sent = await sendPostmarkEmail(
      shop.ownerEmail,
      `${shop.name} — ${calls.length} call${calls.length === 1 ? "" : "s"} today`,
      lines.join("\n")
    );

    if (sent) {
      await prisma.digest.create({
        data: {
          shopId: shop.id,
          day: new Date(day),
          callsTotal: calls.length,
          booked,
          escalated,
          sentAt: new Date(),
        },
      });
    }

    return NextResponse.json({ ok: true, sent, calls: calls.length });
  } catch (e: any) {
    console.error("Digest error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
