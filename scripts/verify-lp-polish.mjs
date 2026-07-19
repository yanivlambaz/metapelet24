import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9256;
const outDir = path.join("c:/metapelet24/review/lp/conversion-polish");
const baseUrl = "http://localhost:3105";

fs.mkdirSync(outDir, { recursive: true });

const child = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    "--user-data-dir=c:/metapelet24/.tmp-lp-polish",
    `${baseUrl}/lp`,
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await fetch(`http://localhost:${port}/json/list`).then((r) => r.json());
      const page = list.find((x) => x.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      /* retry */
    }
    await sleep(250);
  }
  throw new Error("No page");
}

try {
  const ws = new WebSocket(await getWs());
  let id = 0;
  const pending = new Map();
  const problems = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method === "Runtime.exceptionThrown") {
      problems.push(msg.params.exceptionDetails?.text);
    }
  };
  await new Promise((r) => {
    ws.onopen = r;
  });
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const n = ++id;
      pending.set(n, resolve);
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  await send("Runtime.enable");
  await send("Page.enable");

  async function evalJs(expression) {
    const r = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails));
    return r.result.result.value;
  }

  async function setup(w, h) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w < 700,
    });
    await send("Page.navigate", { url: `${baseUrl}/lp` });
    await sleep(2500);
  }

  async function shot(name, full = false) {
    const data = await send("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: full,
    });
    fs.writeFileSync(path.join(outDir, name), Buffer.from(data.result.data, "base64"));
  }

  async function scrollToText(text) {
    await evalJs(
      `(() => { const el = Array.from(document.querySelectorAll('h1,h2,p,section')).find(e => (e.textContent||'').includes(${JSON.stringify(text)})); if(el) el.scrollIntoView({block:'center'}); })()`
    );
    await sleep(600);
  }

  const verifyExpr = `(() => {
    const sections = Array.from(document.querySelector('main')?.children || []);
    const labels = sections.slice(0, 3).map((el) => {
      if (el.getAttribute('aria-label') === 'הודעה על רישיון ופיקוח') return 'license';
      if (el.querySelector('h1')) return 'hero';
      return 'other';
    });
    const h1 = document.querySelector('h1')?.textContent?.trim();
    const phoneInput = document.querySelector('#lp-lead-form-hero-phone');
    const phoneStyles = phoneInput ? window.getComputedStyle(phoneInput) : null;
    const ctaGroups = Array.from(document.querySelectorAll('.btn-urgent')).length;
    const howItWorksCtas = document.querySelector('section:has(h2)') ? 0 : 0;
    const mainSiteLink = Array.from(document.querySelectorAll('a')).find(a => (a.textContent||'').trim() === 'לאתר המלא');
    return JSON.stringify({
      topOrder: labels,
      h1,
      phoneDir: phoneInput?.getAttribute('dir'),
      phoneTextAlign: phoneStyles?.textAlign,
      phonePlaceholderAlign: phoneStyles?.getPropertyValue('-webkit-rtl-ordering') || phoneStyles?.direction,
      formCta: document.querySelector('#lp-lead-form-hero button[type=submit]')?.textContent?.trim(),
      mainSiteLink: !!mainSiteLink,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      howItWorksHasCta: !!Array.from(document.querySelectorAll('section')).find(s => s.textContent?.includes('איך זה עובד') && s.querySelector('.btn-urgent')),
    });
  })()`;

  // Desktop
  await setup(1440, 900);
  const desktop = JSON.parse(await evalJs(verifyExpr));
  await shot("desktop-full-page.png", true);
  await send("Page.navigate", { url: `${baseUrl}/lp` });
  await sleep(2000);
  await shot("desktop-header-license-hero.png");
  await scrollToText("שם מלא");
  await shot("desktop-hero-form.png");
  await scrollToText("מתי אנחנו");
  await shot("desktop-trust-strip-services.png");
  await scrollToText("צריכים עזרה כבר היום");
  await shot("desktop-availability-how-it-works.png");
  await scrollToText("לא מוקד אוטומטי");
  await shot("desktop-human-trust.png");
  await scrollToText("צריכים מטפל/ת עכשיו");
  await shot("desktop-final-conversion.png");

  // Mobile
  await setup(390, 844);
  const mobile = JSON.parse(await evalJs(verifyExpr));
  await shot("mobile-full-page.png", true);
  await send("Page.navigate", { url: `${baseUrl}/lp` });
  await sleep(2000);
  await shot("mobile-header-license-hero.png");
  await scrollToText("שם מלא");
  await shot("mobile-hero-form.png");
  await scrollToText("מתי אנחנו");
  await shot("mobile-services.png");
  await scrollToText("איך זה עובד");
  await shot("mobile-how-it-works.png");
  await scrollToText("לא מוקד אוטומטי");
  await shot("mobile-human-trust.png");
  await scrollToText("צריכים מטפל/ת עכשיו");
  await shot("mobile-final-sticky-cta.png");

  // Popup
  await setup(390, 844);
  await sleep(31000);
  const popup = JSON.parse(
    await evalJs(`JSON.stringify({ hasPopup: document.body.innerText.includes('רגע לפני שאתה עוזב') })`)
  );
  await shot("mobile-popup.png");

  // Homepage unchanged
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${baseUrl}/` });
  await sleep(2000);
  const homepage = JSON.parse(
    await evalJs(`JSON.stringify({ heroH1: document.querySelector('h1')?.textContent?.trim() })`)
  );

  console.log(
    JSON.stringify({ desktop, mobile, popup, homepage, problems, screenshots: fs.readdirSync(outDir) }, null, 2)
  );
  ws.close();
  child.kill();
} catch (error) {
  console.error(error);
  child.kill();
  process.exit(1);
}
