import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const debugPort = 9258;
const outDir = process.argv[2];
const baseUrl = process.argv[3];
const label = process.argv[4] || "capture";

if (!outDir || !baseUrl) {
  console.error("Usage: node capture-lp-compare.mjs <outDir> <baseUrl> [label]");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const child = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=c:/metapelet24/.tmp-lp-${label}`,
    `${baseUrl}/lp`,
  ],
  { stdio: "ignore" }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await fetch(`http://localhost:${debugPort}/json/list`).then((r) => r.json());
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
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
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
  await send("Page.enable");

  async function evalJs(expression) {
    const r = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
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

  const markersExpr = `(() => JSON.stringify({
    availPolish: document.body.innerHTML.includes('border-y border-slate-200 bg-surface px-4 py-14 sm:px-6 sm:py-20'),
    availDensity: document.body.innerHTML.includes('border-y border-slate-200 bg-surface px-4 py-10 sm:px-6 sm:py-14'),
    humanPolish: document.body.innerHTML.includes('bg-surface px-4 py-14 sm:px-6 sm:py-20'),
    humanDensity: document.body.innerHTML.includes('bg-surface px-4 py-11 sm:px-6 sm:py-16'),
    howMt10: document.body.innerHTML.includes('mt-10 hidden items-center justify-center gap-3 md:flex'),
    howMt7: document.body.innerHTML.includes('mt-7 hidden items-center justify-center gap-3 md:flex'),
    hero: document.querySelector('h1')?.textContent?.trim(),
    formCta: document.querySelector('button[type=submit]')?.textContent?.trim(),
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    pageHeight: Math.round(document.documentElement.scrollHeight),
  }))()`;

  await setup(1440, 900);
  const desktop = JSON.parse(await evalJs(markersExpr));
  await shot("desktop-full-page.png", true);
  await setup(390, 844);
  const mobile = JSON.parse(await evalJs(markersExpr));
  await shot("mobile-full-page.png", true);

  console.log(JSON.stringify({ label, baseUrl, desktop, mobile, outDir }, null, 2));
  ws.close();
  child.kill();
} catch (error) {
  console.error(error);
  child.kill();
  process.exit(1);
}
