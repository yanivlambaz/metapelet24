const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const widths = [360, 375, 390, 412];
const label = process.argv[2] || "before";
const outDir = path.join("tmp-hero-crops", "screenshots", label);
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  for (const w of widths) {
    const page = await browser.newPage({
      viewport: { width: w, height: 900 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await page.goto("http://localhost:3210/", { waitUntil: "networkidle" });
    // Capture hero image region only
    const img = page.locator("section.hero-premium img").first();
    await img.waitFor({ state: "visible" });
    await img.screenshot({ path: path.join(outDir, `hero-${w}.png`) });
    // Also full hero section for context
    await page.locator("section.hero-premium").screenshot({
      path: path.join(outDir, `section-${w}.png`),
    });
    console.log("saved", label, w);
    await page.close();
  }
  await browser.close();
})();
