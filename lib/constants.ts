export const SITE_NAME = "מטפלת 24";
export const SITE_TAGLINE =
  "פלטפורמה להתאמת מטפלים פרטיים ישראלים בזמינות מיידית";
export const SITE_URL = "https://www.metapelet24.co.il";

export const PHONE_DISPLAY = "072-393-9494";
export const PHONE_HREF = "tel:0723939494";
export const COMPANY_STREET_ADDRESS = "מצדה 9";
export const COMPANY_CITY = "בני ברק";
export const COMPANY_ADDRESS_DISPLAY = "מצדה 9, בני ברק";
export const WHATSAPP_NUMBER = "972559665055";
export const WHATSAPP_HREF = "https://wa.me/972559665055";

export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "שלום, אני מעוניין/ת במטפל/ת פרטי/ת. אשמח לפרטים נוספים.";
