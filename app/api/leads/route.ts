import { NextResponse } from "next/server";

const SOURCE = "metapelet24";
const SOURCE_DISPLAY_NAME = "אתר מטפלת";
const WEBSITE = "metapelet24";

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function digitsOnly(value: unknown): string {
  return normalizeString(value).replace(/[^\d]/g, "");
}

function isValidPhone(phoneDigits: string): boolean {
  return /^\d{9,13}$/.test(phoneDigits);
}

function isValidEmail(email: string): boolean {
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "גוף בקשה לא תקין" },
      { status: 400 }
    );
  }

  const data = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = normalizeString(data.name);
  const phone = digitsOnly(data.phone);
  const city = normalizeString(data.city);
  const email = normalizeString(data.email);
  const message = normalizeString(data.message);
  const formType = normalizeString(data.formType) || "unknown";
  const page = normalizeString(data.page) || request.headers.get("referer") || "";

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "נא להזין שם תקין" },
      { status: 400 }
    );
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "נא להזין מספר טלפון תקין" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "נא להזין כתובת אימייל תקינה" },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GHL_LEAD_WEBHOOK;

  if (!webhookUrl) {
    console.error("[leads] Missing GHL_LEAD_WEBHOOK configuration");
    return NextResponse.json(
      { ok: false, error: "המערכת אינה זמינה כרגע. נסו שוב בעוד רגע." },
      { status: 500 }
    );
  }

  const crmPayload = {
    name,
    phone,
    city,
    email,
    message,
    formType,
    page,
    source: SOURCE,
    sourceDisplayName: SOURCE_DISPLAY_NAME,
    website: WEBSITE,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crmPayload),
    });

    if (!response.ok) {
      console.error("[leads] CRM webhook failed", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        { ok: false, error: "שליחת הפרטים נכשלה. נסו שוב בעוד רגע." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[leads] CRM webhook request error", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { ok: false, error: "שליחת הפרטים נכשלה. נסו שוב בעוד רגע." },
      { status: 502 }
    );
  }
}
