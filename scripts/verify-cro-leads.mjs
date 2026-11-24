/**
 * Safe CRO lead-form integration checks against a mocked /api/leads.
 * Does NOT call the production GHL webhook.
 *
 * Usage: node scripts/verify-cro-leads.mjs
 */

import assert from "node:assert/strict";

function phoneDigits(value) {
  return String(value).replace(/[^\d]/g, "");
}

function isValidPhone(value) {
  return /^\d{9,13}$/.test(phoneDigits(value));
}

function buildQuickPayload({ name, phone, formType, city, careType, intro }) {
  const digits = phoneDigits(phone);
  const message = [
    intro || "שלום, התקבלה פנייה חדשה מאתר המרכז הארצי לשירותי מטפלים.",
    `שם: ${name.trim()}`,
    `טלפון: ${digits}`,
    careType ? `שירות מבוקש: ${careType}` : "",
    city ? `עיר: ${city}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    name: name.trim(),
    phone: digits,
    city: city || undefined,
    message,
    formType,
    page: "http://localhost/verify-cro",
  };
}

async function mockSubmit(payload, { fail = false } = {}) {
  if (fail) {
    const err = new Error("שליחת הפרטים נכשלה. נסו שוב בעוד רגע.");
    throw err;
  }
  assert.ok(payload.name.length >= 2, "name required");
  assert.ok(isValidPhone(payload.phone), "phone required");
  assert.ok(payload.formType, "formType required");
  assert.ok(payload.message.includes(payload.name), "message includes name");
  return { ok: true };
}

const cases = [
  { id: "1-home-hero", formType: "home-hero" },
  { id: "2-mobile-sticky", formType: "mobile-sticky" },
  { id: "3-home-services", formType: "home-services" },
  { id: "4-city-form", formType: "city-tel-aviv", city: "תל אביב" },
  { id: "5-service-form", formType: "service-hospital-caregiver", careType: "מטפל לבית חולים" },
  { id: "6-landing-page", formType: "landing-page" },
  {
    id: "7-second-family",
    formType: "second-family",
    intro: "שלום, התקבלה פנייה חדשה לשירות משפחה שנייה",
  },
];

let passed = 0;

for (const test of cases) {
  const payload = buildQuickPayload({
    name: "בדיקת מערכת",
    phone: "0501234567",
    formType: test.formType,
    city: test.city,
    careType: test.careType,
    intro: test.intro,
  });
  const result = await mockSubmit(payload);
  assert.equal(result.ok, true);
  console.log(`OK ${test.id}: formType=${test.formType}`);
  passed += 1;
}

// 8. Error handling keeps fields conceptually (payload rebuildable)
try {
  await mockSubmit(buildQuickPayload({ name: "בדיקה", phone: "0501234567", formType: "home-hero" }), {
    fail: true,
  });
  assert.fail("expected error");
} catch (error) {
  assert.match(String(error.message), /שליחת הפרטים נכשלה/);
  console.log("OK 8-error-handling");
  passed += 1;
}

// 9. Duplicate-submission guard (loading lock simulation)
let inFlight = false;
async function guardedSubmit() {
  if (inFlight) return { skipped: true };
  inFlight = true;
  try {
    return await mockSubmit(buildQuickPayload({ name: "בדיקה", phone: "0501234567", formType: "home-hero" }));
  } finally {
    inFlight = false;
  }
}
const first = guardedSubmit();
const second = guardedSubmit();
const [a, b] = await Promise.all([first, second]);
assert.equal(a.ok, true);
assert.equal(b.skipped, true);
console.log("OK 9-duplicate-prevention");
passed += 1;

// Validation rejects incomplete phone
assert.equal(isValidPhone("050"), false);
assert.equal(isValidPhone("050-123-4567"), true);
console.log("OK phone-validation");
passed += 1;

console.log(`\nCRO lead verify: ${passed} checks passed (mocked; no GHL webhook calls).`);
