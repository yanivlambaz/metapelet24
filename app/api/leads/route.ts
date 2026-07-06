import { NextResponse } from "next/server";

const SOURCE = "metapelet24";
const SOURCE_DISPLAY_NAME = "אתר מטפלת";
const WEBSITE = "metapelet24";
const WEBHOOK_CONFIG_ERROR_MESSAGE = "המערכת אינה זמינה כרגע. נסו שוב בעוד רגע.";
const WEBHOOK_SUBMISSION_ERROR_MESSAGE = "שליחת הפרטים נכשלה. נסו שוב בעוד רגע.";

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

  console.info("[leads] /api/leads request received", {
    formType,
    hasCity: Boolean(city),
    hasEmail: Boolean(email),
    hasMessage: Boolean(message),
  });

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

  const webhookUrl = normalizeString(process.env.GHL_LEAD_WEBHOOK);

  if (!webhookUrl) {
    console.error("[leads] GHL_LEAD_WEBHOOK missing");
    return NextResponse.json(
      {
        ok: false,
        error: WEBHOOK_CONFIG_ERROR_MESSAGE,
        code: "WEBHOOK_CONFIG_MISSING",
      },
      { status: 500 }
    );
  }

  console.info("[leads] GHL_LEAD_WEBHOOK present");

  let webhookEndpoint: URL;

  try {
    webhookEndpoint = new URL(webhookUrl);
  } catch {
    console.error("[leads] GHL_LEAD_WEBHOOK invalid URL");
    return NextResponse.json(
      {
        ok: false,
        error: WEBHOOK_CONFIG_ERROR_MESSAGE,
        code: "WEBHOOK_CONFIG_INVALID",
      },
      { status: 500 }
    );
  }

  if (!["http:", "https:"].includes(webhookEndpoint.protocol)) {
    console.error("[leads] GHL_LEAD_WEBHOOK invalid URL");
    return NextResponse.json(
      {
        ok: false,
        error: WEBHOOK_CONFIG_ERROR_MESSAGE,
        code: "WEBHOOK_CONFIG_INVALID",
      },
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
    console.info("[leads] webhook request attempted", {
      formType,
      source: SOURCE,
      sourceDisplayName: SOURCE_DISPLAY_NAME,
      website: WEBSITE,
    });

    const response = await fetch(webhookEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crmPayload),
    });

    console.info("[leads] webhook response status", {
      formType,
      status: response.status,
      ok: response.ok,
    });

    if (!response.ok) {
      console.error("[leads] webhook upstream error", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        {
          ok: false,
          error: WEBHOOK_SUBMISSION_ERROR_MESSAGE,
          code: "WEBHOOK_UPSTREAM_ERROR",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[leads] webhook network exception", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      {
        ok: false,
        error: WEBHOOK_SUBMISSION_ERROR_MESSAGE,
        code: "WEBHOOK_NETWORK_ERROR",
      },
      { status: 502 }
    );
  }
}
