import { test, expect } from "@playwright/test";

const base = process.env.E2E_BASE_URL ?? "http://localhost:3001";
const secret = process.env.PICKUPCRAFT_INTERNAL_SECRET ?? "test-secret";

test.describe("Scenario A — Marisol onboards PickupCraft", () => {
  test("intake form creates a shop in onboarding queue", async ({ page }) => {
    // 1. Create an intake token via internal API
    const tokenRes = await page.request.post(`${base}/api/internal/nowpayments`, {
      headers: { "x-pickupcraft-internal": secret },
      data: {
        order_id: "pickupcraft_starter_test_001",
        paid: true,
        plan: "starter",
        email: "marisol@test.com",
      },
    });
    expect(tokenRes.ok()).toBeTruthy();
    const tokenData = await tokenRes.json();
    expect(tokenData.ok).toBe(true);
    const token = tokenData.token;

    // 2. Visit intake form
    await page.goto(`${base}/intake/${token}`);
    await expect(page.locator("text=Set up your shop")).toBeVisible();

    // 3. Fill and submit form
    await page.fill('input[name="name"]', "Tavárez Cuts");
    await page.selectOption('select[name="industry"]', "salon");
    await page.fill('input[name="mon_open"]', "9");
    await page.fill('input[name="mon_close"]', "19");
    await page.fill('input[name="tue_open"]', "9");
    await page.fill('input[name="tue_close"]', "19");
    await page.fill('input[name="ownerEmail"]', "marisol@test.com");
    await page.fill('input[name="ownerSms"]', "+1-555-0100");
    await page.selectOption('select[name="bookingProvider"]', "booksy");
    await page.fill('input[name="urgencyTriggers"]', "wedding, photoshoot");
    await page.fill('textarea[name="fallbackText"]', "Let me text the owner and they'll get back to you within an hour.");
    await page.fill('input[name="service_name"]', "Haircut");
    await page.fill('input[name="service_price"]', "35");

    await page.click('button[type="submit"]');

    // 4. Verify success
    await expect(page.locator("text=You're all set!")).toBeVisible();

    // 5. Verify shop appears in operator queue
    await page.goto(`${base}/operator`);
    await expect(page.locator("text=Tavárez Cuts")).toBeVisible();
    await expect(page.locator("text=marisol@test.com")).toBeVisible();
  });
});
