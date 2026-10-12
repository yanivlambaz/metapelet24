export const SITE_NAME = "המרכז הארצי לשירותי מטפלים";
export const SITE_TAGLINE =
  "מטפלים ומטפלות ישראלים לבית ולבתי חולים, בפריסה ארצית";
export const SITE_URL = "https://www.siudi.org.il";

export const PHONE_DISPLAY = "072-393-9494";
export const PHONE_HREF = "tel:0723939494";
export const COMPANY_STREET_ADDRESS = "מצדה 9";
export const COMPANY_CITY = "בני ברק";
export const COMPANY_ADDRESS_DISPLAY = "מצדה 9, בני ברק";

/** Canonical sales WhatsApp destination — single source of truth */
export const SALES_WHATSAPP_NUMBER = "972533671855";
export const SALES_WHATSAPP_URL = "https://wa.me/972533671855";

export const WHATSAPP_NUMBER = SALES_WHATSAPP_NUMBER;
export const WHATSAPP_HREF = SALES_WHATSAPP_URL;

export function buildWhatsAppUrl(message: string): string {
  return `${SALES_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "שלום, אני מעוניין/ת במטפל/ת פרטי/ת. אשמח לפרטים נוספים.";
