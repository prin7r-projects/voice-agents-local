// [PICKUPCRAFT_SCREENSHOT_CAPTURE]
// Capture desktop + mobile fullPage screenshots of the production landing.
// Used to regenerate the assets in /docs/screenshots/ after any landing-affecting change.
//
// Usage:
//   node scripts/capture-landing-screenshots.mjs [URL]
//
// Defaults to https://voice-agents-local.prin7r.com.
// Requires: pnpm dlx playwright install chromium  (one-time per host)

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const outDir = join(repoRoot, "docs", "screenshots");

const url = process.argv[2] ?? "https://voice-agents-local.prin7r.com";

async function capture(viewport, name) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  console.log(`[PICKUPCRAFT_SCREENSHOT_CAPTURE] ${name} ${viewport.width}x${viewport.height} -> ${url}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  // Give web fonts a beat to settle even after networkidle.
  await page.waitForTimeout(800);
  const out = join(outDir, `${name}.png`);
  await page.screenshot({ path: out, fullPage: true });
  console.log(`[PICKUPCRAFT_SCREENSHOT_CAPTURE] wrote ${out}`);
  await browser.close();
}

await mkdir(outDir, { recursive: true });
await capture({ width: 1440, height: 900 }, "landing-desktop");
await capture({ width: 390, height: 844 }, "landing-mobile");
console.log("[PICKUPCRAFT_SCREENSHOT_CAPTURE] done.");
