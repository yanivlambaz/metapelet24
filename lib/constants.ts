export const SITE_NAME = "מטפלת 24";
export const SITE_TAGLINE =
  "פלטפורמה לאיתור מטפלים פרטיים ישראלים בזמינות מיידית";

export const PHONE_DISPLAY = "1800-123-456";
export const PHONE_HREF = "tel:1800123456";
export const WHATSAPP_NUMBER = "972501234567";
export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildWhatsAppUrl(message: string): string {
  return `${WHATSAPP_HREF}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "שלום, אני מעוניין/ת במטפל/ת פרטי/ת. אשמח לפרטים נוספים.";
