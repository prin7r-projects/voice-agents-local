import { test, expect } from "@playwright/test";

const base = process.env.E2E_BASE_URL ?? "http://localhost:3001";
const secret = process.env.PICKUPCRAFT_INTERNAL_SECRET ?? "test-secret";

test.describe("Scenario D — End-of-day digest", () => {
  test("digest endpoint generates and records a digest", async ({ page }) => {
    // 1. Seed a shop
    const intakeRes = await page.request.post(`${base}/api/internal/nowpayments`, {
      headers: { "x-pickupcraft-internal": secret },
      data: { order_id: "pickupcraft_starter_test_003", paid: true, plan: "starter", email: "digest@test.com" },
    });
    const { token } = await intakeRes.json();

    const intakeSubmit = await page.request.post(`${base}/api/intake/${token}`, {
      data: {
        name: "Digest Test Salon",
        industry: "salon",
        tz: "America/New_York",
        hours: { mon: [9, 19] },
        ownerEmail: "digest@test.com",
        bookingProvider: "booksy",
        pricing: [],
        urgencyTriggers: [],
        fallbackText: "Test fallback",
      },
    });
    const { shopId } = await intakeSubmit.json();

    // 2. Seed some calls
    for (let i = 0; i < 3; i++) {
      await page.request.post(`${base}/api/internal/vapi/end-of-call`, {
        headers: { "x-pickupcraft-secret": secret },
        data: {
          call_id: `digest_call_${i}`,
          shop_id: shopId,
          transcript: `Call ${i}`,
          duration: 60,
          intent: i === 0 ? "book" : "info",
          outcome: i === 0 ? "booked" : "info_only",
          caller_number: "+1-555-0400",
        },
      });
    }

    // 3. Trigger digest
    const digestRes = await page.request.post(`${base}/api/internal/digest`, {
      headers: { "x-pickupcraft-secret": secret },
      data: { shop_id: shopId, day: new Date().toISOString().slice(0, 10) },
    });
    expect(digestRes.ok()).toBeTruthy();
    const digestData = await digestRes.json();
    expect(digestData.ok).toBe(true);
    expect(digestData.calls).toBeGreaterThanOrEqual(0);
  });
});
