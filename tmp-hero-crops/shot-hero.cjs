const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const widths = [360, 375, 390, 412];
const label = process.argv[2] || "after";
const outDir = path.join("tmp-hero-crops", "screenshots", label);
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  for (const w of widths) {
    const page = await browser.newPage({
      viewport: { width: w, height: 1100 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await page.goto("http://localhost:3210/", { waitUntil: "networkidle" });

    // Dismiss cookie banner if present
    try {
      const btn = page.locator("button").filter({ hasText: /Accept|קבל|אישור|הסכמ/i }).first();
      if (await btn.isVisible({ timeout: 1500 })) await btn.click();
    } catch {}

    await page.locator("section.hero-premium img").first().waitFor({ state: "visible" });

    // Screenshot the rounded image frame (parent of img/picture)
    const box = await page.evaluate(() => {
      const img = document.querySelector("section.hero-premium img");
      const frame = img?.closest(".overflow-hidden") || img?.parentElement;
      if (!frame) return null;
      const r = frame.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    });

    if (box) {
      await page.screenshot({
        path: path.join(outDir, `hero-${w}.png`),
        clip: {
          x: Math.max(0, box.x),
          y: Math.max(0, box.y),
          width: box.width,
          height: box.height,
        },
      });
    }

    await page.locator("section.hero-premium").screenshot({
      path: path.join(outDir, `section-${w}.png`),
    });
    console.log("saved", label, w, box);
    await page.close();
  }
  await browser.close();
})();
