import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9257;
const outDir = path.join("c:/metapelet24/review/lp/vertical-density");
const baseUrl = "http://localhost:3000";

fs.mkdirSync(outDir, { recursive: true });

const child = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${port}`,
    "--user-data-dir=c:/metapelet24/.tmp-lp-density",
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
      `(() => { const el = Array.from(document.querySelectorAll('h2,section')).find(e => (e.textContent||'').includes(${JSON.stringify(text)})); if(el) el.scrollIntoView({block:'center'}); })()`
    );
    await sleep(600);
  }

  const heightsExpr = `(() => {
    const byHeading = (t) => Array.from(document.querySelectorAll('section')).find(s => s.textContent?.includes(t));
    const h = (el) => el ? Math.round(el.getBoundingClientRect().height) : null;
    const availability = byHeading('צריכים עזרה כבר היום');
    const how = byHeading('איך זה עובד');
    const human = byHeading('לא מוקד אוטומטי');
    return JSON.stringify({
      availability: h(availability),
      howItWorks: h(how),
      humanTrust: h(human),
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    });
  })()`;

  await setup(1440, 900);
  const desktopHeights = JSON.parse(await evalJs(heightsExpr));
  await shot("desktop-full-page.png", true);
  await send("Page.navigate", { url: `${baseUrl}/lp` });
  await sleep(2000);
  await scrollToText("מתי אנחנו");
  await shot("desktop-services-to-availability.png");
  await scrollToText("צריכים עזרה כבר היום");
  await shot("desktop-availability-to-how-it-works.png");
  await scrollToText("איך זה עובד");
  await shot("desktop-how-it-works-to-human-trust.png");
  await scrollToText("לא מוקד אוטומטי");
  await shot("desktop-human-trust-to-faq.png");

  await setup(390, 844);
  const mobileHeights = JSON.parse(await evalJs(heightsExpr));
  await shot("mobile-full-page.png", true);

  console.log(
    JSON.stringify({ desktopHeights, mobileHeights, problems, screenshots: fs.readdirSync(outDir) }, null, 2)
  );
  ws.close();
  child.kill();
} catch (error) {
  console.error(error);
  child.kill();
  process.exit(1);
}
