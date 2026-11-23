/**
 * Cookie consent — single source of truth.
 *
 * The stored shape is also read synchronously by the inline consent-default
 * script in app/layout.tsx (before GTM loads). Keep key/shape in sync.
 */

export const CONSENT_STORAGE_KEY = "metapelet24-cookie-consent";
export const CONSENT_VERSION = 1;
export const OPEN_COOKIE_SETTINGS_EVENT = "metapelet24:open-cookie-settings";

export type ConsentPreferences = {
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = {
  version: number;
  timestamp: string;
  preferences: ConsentPreferences;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (
      parsed?.version !== CONSENT_VERSION ||
      typeof parsed?.preferences?.analytics !== "boolean" ||
      typeof parsed?.preferences?.marketing !== "boolean"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(preferences: ConsentPreferences): void {
  const record: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    preferences,
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable (private mode / blocked) — consent still applied for session.
  }
}

/**
 * Push a Google Consent Mode v2 update + a GTM-consumable event so tags
 * gated on consent react immediately without a page reload.
 */
export function applyConsent(preferences: ConsentPreferences): void {
  captureLeadAttribution(preferences.marketing);
  window.dataLayer = window.dataLayer || [];

  // Consent Mode requires an `arguments` object, matching gtag() semantics.
  const gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as (...args: unknown[]) => void;

  const marketing = preferences.marketing ? "granted" : "denied";
  gtag("consent", "update", {
    analytics_storage: preferences.analytics ? "granted" : "denied",
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  });

  window.dataLayer.push({
    event: "cookie_consent_update",
    consent_analytics: preferences.analytics,
    consent_marketing: preferences.marketing,
  });
}

export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
}

const LEAD_ATTRIBUTION_KEY = "metapelet24:lead-attribution";
const LEAD_ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "campaign_id",
  "adgroup_id",
  "ad_id",
  "keyword",
  "match_type",
  "target_id",
  "network",
  "device",
  "gclid",
  "utm_id",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gbraid",
  "wbraid",
] as const;

type LeadAttribution = Partial<Record<(typeof LEAD_ATTRIBUTION_PARAMS)[number], string>>;
type LeadTouches = { first: LeadAttribution; last: LeadAttribution };

export function sanitizeLeadAttribution(input: unknown): LeadAttribution {
  const fields: LeadAttribution = {};
  if (!input || typeof input !== "object") return fields;
  for (const key of LEAD_ATTRIBUTION_PARAMS) {
    const raw = (input as Record<string, unknown>)[key];
    if (typeof raw !== "string") continue;
    const value = raw.trim();
    if (value && !/^\{[^}]+\}$/.test(value)) fields[key] = value.slice(0, 500);
  }
  return fields;
}

export function captureLeadAttribution(marketingAllowed: boolean): LeadTouches | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    if (!marketingAllowed) {
      window.sessionStorage.removeItem(LEAD_ATTRIBUTION_KEY);
      return undefined;
    }

    const raw = window.sessionStorage.getItem(LEAD_ATTRIBUTION_KEY);
    const saved = raw ? JSON.parse(raw) : undefined;
    const first = sanitizeLeadAttribution(saved?.first);
    const last = sanitizeLeadAttribution(saved?.last);
    const incoming = sanitizeLeadAttribution(
      Object.fromEntries(new URLSearchParams(window.location.search)),
    );
    if (!Object.keys(incoming).length) {
      return Object.keys(last).length ? { first, last } : undefined;
    }

    const touches = { first: Object.keys(first).length ? first : incoming, last: incoming };
    window.sessionStorage.setItem(LEAD_ATTRIBUTION_KEY, JSON.stringify(touches));
    return touches;
  } catch {
    return undefined;
  }
}
