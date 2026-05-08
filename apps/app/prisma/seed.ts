import { prisma } from "@/lib/prisma";

async function main() {
  console.log("Seeding database...");

  // Create an unused intake token for testing
  const intakeToken = await prisma.intakeToken.create({
    data: {
      email: "marisol@example.com",
      plan: "starter",
      used: false,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  console.log(`Created intake token: ${intakeToken.id}`);

  // Create a sample shop in onboarding
  const shop = await prisma.shop.create({
    data: {
      name: "Marisol's Salon",
      industry: "salon",
      tz: "America/New_York",
      hours: {
        mon: [9, 19],
        tue: [9, 19],
        wed: [9, 19],
        thu: [9, 19],
        fri: [9, 19],
        sat: [10, 17],
        sun: [],
      },
      ownerEmail: "marisol@example.com",
      ownerSms: "+1-555-0199",
      status: "onboarding",
    },
  });

  await prisma.scriptProfile.create({
    data: {
      shopId: shop.id,
      pricing: [
        { service: "Women's haircut", priceCents: 6500 },
        { service: "Men's haircut", priceCents: 3500 },
        { service: "Color", priceCents: 12000 },
        { service: "Blowout", priceCents: 4500 },
      ],
      urgencyTriggers: ["emergency", "walk-in", "complaint"],
      fallbackText:
        "I'm not sure about that — let me take your number and have the owner call you back within 30 minutes.",
    },
  });

  await prisma.integration.create({
    data: {
      shopId: shop.id,
      bookingProvider: "square",
      status: "disconnected",
    },
  });

  console.log(`Created sample shop: ${shop.id}`);

  // Create a live shop
  const liveShop = await prisma.shop.create({
    data: {
      name: "Dale's Plumbing",
      industry: "plumber",
      tz: "America/Chicago",
      hours: {
        mon: [7, 18],
        tue: [7, 18],
        wed: [7, 18],
        thu: [7, 18],
        fri: [7, 18],
        sat: [8, 14],
        sun: [],
      },
      ownerEmail: "dale@example.com",
      ownerSms: "+1-555-0142",
      status: "live",
    },
  });

  await prisma.scriptProfile.create({
    data: {
      shopId: liveShop.id,
      pricing: [
        { service: "Service call", priceCents: 12500 },
        { service: "Leak repair", priceCents: 25000 },
        { service: "Drain cleaning", priceCents: 18000 },
      ],
      urgencyTriggers: ["flood", "burst pipe", "no water", "sewage"],
      fallbackText:
        "Let me connect you directly with Dale — this sounds like it needs immediate attention.",
    },
  });

  await prisma.number.create({
    data: {
      shopId: liveShop.id,
      twilioPhoneNumber: "+15551234567",
      publicBusinessNumber: "+15551234567",
      status: "live",
    },
  });

  console.log(`Created live shop: ${liveShop.id}`);
  console.log("Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
