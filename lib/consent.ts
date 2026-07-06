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
