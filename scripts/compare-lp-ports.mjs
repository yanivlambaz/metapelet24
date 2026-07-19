import fs from "node:fs";

const ports = [
  { port: 3105, label: "approved-3105" },
  { port: 3106, label: "reconstructed-3106" },
];

const markers = [
  "border-y border-slate-200 bg-surface px-4 py-14 sm:px-6 sm:py-20",
  "border-y border-slate-200 bg-surface px-4 py-10 sm:px-6 sm:py-14",
  "bg-white px-4 py-14 sm:px-6 sm:py-20",
  "bg-white px-4 py-10 sm:px-6 sm:py-14",
  "bg-surface px-4 py-14 sm:px-6 sm:py-20",
  "bg-surface px-4 py-11 sm:px-6 sm:py-16",
  "mt-10 hidden items-center justify-center gap-3 md:flex",
  "mt-7 hidden items-center justify-center gap-3 md:flex",
  "gap-8 lg:grid-cols-2 lg:gap-12",
  "gap-6 lg:grid-cols-2 lg:gap-10",
  "מטפל/ת סיעודי/ת כשצריך — גם בתוך 5 שעות",
  "מצאו לי מטפל/ת עכשיו",
  "לא מוקד אוטומטי",
  "לאתר המלא",
];

async function probe(port) {
  const html = await fetch(`http://localhost:${port}/lp`).then((r) => r.text());
  const result = { port, length: html.length, markers: {} };
  for (const m of markers) result.markers[m] = html.includes(m);
  result.overflow = false;
  return result;
}

const results = [];
for (const { port, label } of ports) {
  try {
    const r = await probe(port);
    r.label = label;
    results.push(r);
  } catch (e) {
    results.push({ port, label, error: String(e) });
  }
}

const a = results.find((r) => r.port === 3105);
const b = results.find((r) => r.port === 3106);
const markerMatch =
  a && b && markers.every((m) => a.markers[m] === b.markers[m]);
const lengthDelta = a && b ? Math.abs(a.length - b.length) : null;

console.log(
  JSON.stringify(
    {
      results,
      markerMatch,
      lengthDelta,
      match: markerMatch && lengthDelta <= 200,
    },
    null,
    2
  )
);
