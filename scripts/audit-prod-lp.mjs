async function audit(url, label) {
  const r = await fetch(url, { redirect: "follow" });
  const h = await r.text();
  const telMatches = [...h.matchAll(/href="(tel:[^"]+)"/g)].map((m) => m[1]);
  const telUnique = [...new Set(telMatches)];
  const displayCount = (h.match(/072-393-9494/g) || []).length;
  console.log(
    JSON.stringify(
      {
        label,
        url,
        status: r.status,
        telHrefs: telUnique,
        telHrefCount: telMatches.length,
        telHrefAllSame: telUnique.every((t) => t === "tel:0723939494"),
        phoneDisplayCount: displayCount,
        heroForm: h.includes("lp-lead-form-hero"),
        finalForm: h.includes("lp-lead-form-final"),
        popupMarkup: h.includes("רגע לפני שאתה עוזב") || h.includes("FloatingWidgets"),
        webhookInHtml: /ghl|gohighlevel|leadconnector/i.test(h),
      },
      null,
      2
    )
  );
}

async function testApi() {
  const r = await fetch("https://metapelet24.co.il/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "x", phone: "bad" }),
  });
  const data = await r.json().catch(() => null);
  console.log(
    JSON.stringify(
      {
        label: "production-api-leads-invalid",
        status: r.status,
        ok: data?.ok,
        error: data?.error,
        code: data?.code,
        routeReachable: r.status === 400,
      },
      null,
      2
    )
  );
}

await audit("https://metapelet24.co.il/lp", "production-lp");
await audit("https://metapelet24.co.il/", "production-home");
await testApi();
