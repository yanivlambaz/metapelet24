/**
 * WP-CRO-02 mobile floating bar + cookie + modal captures.
 * Requires: npm start on PORT (default 3215) and playwright available via npx.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("review/cro-optimization/cro-02");
const BASE = process.env.CRO_LOCAL_URL || "http://localhost:3215";
const WIDTHS = [320, 360, 375, 390, 412, 430, 768];

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error("Install playwright temporarily: npm i -D playwright && npx playwright install chromium");
    process.exit(1);
  }

  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const width of WIDTHS) {
    const page = await browser.newPage({
      viewport: { width, height: width >= 768 ? 900 : 844 },
      isMobile: width < 768,
      hasTouch: width < 768,
    });
    await page.goto(`${BASE}/`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(600);
    // Clear consent so first-visit cookie appears
    await page.evaluate(() => localStorage.removeItem("metapelet24-cookie-consent"));
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT, `home-cookie-top-${width}.png`), fullPage: false });

    // Dismiss cookie
    const accept = page.getByRole("button", { name: "קבל הכל" });
    if (await accept.count()) await accept.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT, `home-bar-${width}.png`), fullPage: false });

    // Open callback modal
    const details = page.getByRole("button", { name: "השאירו פרטים" });
    if (await details.count()) {
      await details.first().click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(OUT, `home-modal-${width}.png`), fullPage: false });
      await page.keyboard.press("Escape");
    }
    await page.close();
    console.log(`captured width ${width}`);
  }

  // Second Family phone routing visual
  const sf = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await sf.goto(`${BASE}/mishpacha-shniya`, { waitUntil: "networkidle" });
  await sf.evaluate(() => localStorage.setItem("metapelet24-cookie-consent", JSON.stringify({ version: 1, preferences: { analytics: false, marketing: false } })));
  await sf.reload({ waitUntil: "networkidle" });
  await sf.waitForTimeout(500);
  const callHref = await sf.locator('a[aria-label*="073"]').first().getAttribute("href");
  console.log("SF sticky call href:", callHref);
  await sf.screenshot({ path: path.join(OUT, "second-family-bar-390.png"), fullPage: false });
  await sf.close();

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
