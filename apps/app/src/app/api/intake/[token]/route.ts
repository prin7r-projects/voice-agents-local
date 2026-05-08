import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { intakeSchema } from "@/lib/schemas";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Verify token against database
  const intakeToken = await prisma.intakeToken.findUnique({
    where: { id: token },
  });

  if (!intakeToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
  if (intakeToken.used) {
    return NextResponse.json({ error: "Token already used" }, { status: 400 });
  }
  if (intakeToken.expiresAt < new Date()) {
    return NextResponse.json({ error: "Token expired" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const parsed = intakeSchema.parse(body);

    const shop = await prisma.shop.create({
      data: {
        name: parsed.name,
        industry: parsed.industry,
        tz: parsed.tz,
        hours: parsed.hours as any,
        ownerEmail: parsed.ownerEmail,
        ownerSms: parsed.ownerSms ?? null,
        status: "onboarding",
        scriptProfile: {
          create: {
            pricing: (parsed.pricing ?? []) as any,
            urgencyTriggers: (parsed.urgencyTriggers ?? []) as any,
            fallbackText: parsed.fallbackText ?? null,
          },
        },
        integration: {
          create: {
            bookingProvider: parsed.bookingProvider ?? null,
            status: "disconnected",
          },
        },
      },
    });

    await prisma.intakeToken.update({
      where: { id: token },
      data: { used: true },
    });

    return NextResponse.json({
      shopId: shop.id,
      message: "Configuration saved. Our team will set up your voice agent within 72 hours.",
    });
  } catch (e: any) {
    if (e.name === "ZodError") {
      return NextResponse.json({ error: e.errors }, { status: 400 });
    }
    console.error("Intake error:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
