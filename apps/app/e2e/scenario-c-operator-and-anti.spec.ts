import { test, expect } from "@playwright/test";

const base = process.env.E2E_BASE_URL ?? "http://localhost:3001";
const secret = process.env.PICKUPCRAFT_INTERNAL_SECRET ?? "test-secret";

test.describe("Scenario C — Operator runs 72h checklist", () => {
  test("operator queue shows shops with onboarding status", async ({ page }) => {
    await page.goto(`${base}/operator`);
    // Verify queue page loads and shows onboarding status
    await expect(page.locator("text=Onboarding queue")).toBeVisible();
  });
});

test.describe("Scenario F — Edge fallback: agent uncertain", () => {
  test("function-call returns fallback for unknown questions", async ({ page }) => {
    const res = await page.request.post(`${base}/api/internal/vapi/function-call`, {
      headers: { "x-pickupcraft-secret": secret },
      data: {
        call_id: "call_fallback_001",
        function: "unknown_function",
        args: { question: "What is the owner's home address?" },
      },
    });
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.result).toBe("noop");
  });
});

test.describe("Anti-scenarios", () => {
  test("webhook rejects invalid secret", async ({ page }) => {
    const res = await page.request.post(`${base}/api/internal/vapi/end-of-call`, {
      headers: { "x-pickupcraft-secret": "bad-secret" },
      data: { call_id: "test" },
    });
    expect(res.status()).toBe(401);
  });

  test("intake rejects invalid token", async ({ page }) => {
    const res = await page.request.post(`${base}/api/intake/bad-token`, {
      data: { name: "Test" },
    });
    expect(res.status()).toBe(400);
  });
});
