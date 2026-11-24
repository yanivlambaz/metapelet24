/**
 * Capture CRO before/after screenshots with Playwright if available.
 * Falls back gracefully if playwright is not installed.
 *
 * AFTER local: http://localhost:3215
 * BEFORE prod: https://www.siudi.org.il
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("review/cro-optimization");
const LOCAL = process.env.CRO_LOCAL_URL || "http://localhost:3215";
const PROD = process.env.CRO_PROD_URL || "https://www.siudi.org.il";

const shots = [
  { name: "home", path: "/", desktop: true, mobile: true },
  { name: "city-tel-aviv", path: "/tel-aviv", desktop: true, mobile: true },
  { name: "service-hospital", path: "/services/hospital-caregiver", desktop: true },
  { name: "lp", path: "/lp", desktop: true, mobile: true },
  { name: "second-family", path: "/mishpacha-shniya", desktop: true, mobile: true },
];

async function main() {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.error("playwright not installed — skip automated capture; use browser MCP instead.");
    process.exit(0);
  }

  await mkdir(OUT, { recursive: true });
  const browser = await playwright.chromium.launch();

  async function capture(base, prefix) {
    for (const shot of shots) {
      if (shot.desktop) {
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto(`${base}${shot.path}`, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(OUT, `${prefix}-${shot.name}-desktop-1440.png`), fullPage: false });
        await page.close();
        console.log(`saved ${prefix}-${shot.name}-desktop-1440.png`);
      }
      if (shot.mobile) {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
        await page.goto(`${base}${shot.path}`, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(OUT, `${prefix}-${shot.name}-mobile-390.png`), fullPage: false });
        await page.close();
        console.log(`saved ${prefix}-${shot.name}-mobile-390.png`);
      }
    }
  }

  try {
    await capture(LOCAL, "after");
  } catch (error) {
    console.error("local capture failed:", error.message);
  }

  try {
    await capture(PROD, "before");
  } catch (error) {
    console.error("prod capture failed:", error.message);
  }

  await writeFile(
    path.join(OUT, "capture-note.txt"),
    `Captured ${new Date().toISOString()}\nLocal: ${LOCAL}\nProd: ${PROD}\n`,
  );
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
