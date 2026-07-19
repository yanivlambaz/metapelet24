import { spawn } from "node:child_process";
import fs from "node:fs";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const debugPort = 9259;
const baseUrl = process.argv[2] || "http://localhost:3107";

const child = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${debugPort}`,
    "--user-data-dir=c:/metapelet24/.tmp-lp-release-verify",
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
  const consoleErrors = [];
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method === "Runtime.exceptionThrown") {
      consoleErrors.push(msg.params.exceptionDetails?.text);
    } else if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      consoleErrors.push(msg.params.args?.map((a) => a.value || a.description).join(" "));
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

  const lpExpr = `(() => JSON.stringify({
    hero: document.querySelector('h1')?.textContent?.trim(),
    polishSpacing: document.body.innerHTML.includes('border-y border-slate-200 bg-surface px-4 py-14 sm:px-6 sm:py-20'),
    logoHref: document.querySelector('header a[aria-label*="לאתר הראשי"]')?.getAttribute('href'),
    mainSiteLink: Array.from(document.querySelectorAll('a')).find(a => a.textContent?.trim() === 'לאתר המלא')?.getAttribute('href'),
    licenseHref: Array.from(document.querySelectorAll('a')).find(a => a.textContent?.includes('לצפייה ברישיון'))?.getAttribute('href'),
    phoneHrefs: Array.from(document.querySelectorAll('a[href^="tel:"]')).length,
    whatsappHrefs: Array.from(document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]')).length,
    stickyBar: !!document.querySelector('.fixed.inset-x-0.bottom-0'),
    heroForm: !!document.querySelector('#lp-lead-form-hero'),
    finalForm: !!document.querySelector('#lp-lead-form-final'),
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }))()`;

  await setup(1440, 900);
  const desktop = JSON.parse(await evalJs(lpExpr));

  await setup(390, 844);
  const mobile = JSON.parse(await evalJs(lpExpr));

  await sleep(31000);
  const popup = JSON.parse(
    await evalJs(`JSON.stringify({ hasPopup: document.body.innerText.includes('רגע לפני שאתה עוזב') })`)
  );

  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${baseUrl.replace(/\/$/, "")}/` });
  await sleep(2000);
  const homepage = JSON.parse(
    await evalJs(`JSON.stringify({ heroH1: document.querySelector('h1')?.textContent?.trim() })`)
  );

  console.log(JSON.stringify({ baseUrl, desktop, mobile, popup, homepage, consoleErrors }, null, 2));
  ws.close();
  child.kill();
} catch (error) {
  console.error(error);
  child.kill();
  process.exit(1);
}
