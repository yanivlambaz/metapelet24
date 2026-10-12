import { LICENSE_NUMBER, LICENSE_URL } from "@/components/LicenseBanner";
import { COMPANY_ADDRESS_DISPLAY, PHONE_DISPLAY } from "@/lib/constants";

export const BRAND = {
  name: "המרכז הארצי לשירותי מטפלים",
  short: "המרכז הארצי",
  descriptor: "לשירותי מטפלים",
} as const;

/** Wording follows the production license notice; do not broaden what the license covers. */
export const LICENSE = {
  number: LICENSE_NUMBER,
  url: LICENSE_URL,
  statement: "חברה בעלת רישיון ומפוקחת על ידי משרד העבודה",
  kind: "רישיון השמה (לשכה פרטית)",
  authority: "משרד העבודה",
  full: `חברה בעלת רישיון ומפוקחת על ידי משרד העבודה. רישיון השמה (לשכה פרטית) מס' ${LICENSE_NUMBER}.`,
  privateNote: "אנחנו חברה פרטית ואיננו גוף ממשלתי.",
  verify: "לצפייה ברישיון במאגר הממשלתי",
} as const;

export const CONTACT = {
  phone: PHONE_DISPLAY,
  address: COMPANY_ADDRESS_DISPLAY,
} as const;

export const PROMISES = {
  human: "מענה אנושי מיידי",
  urgent: "הגעה בתוך עד 5 שעות במקרים דחופים",
  urgentQualifier: "בהתאם לזמינות מטפלים באזור ולאופי הטיפול",
  coverage: "מטפלים ומטפלות ישראלים לבית ולבתי חולים בפריסה ארצית",
} as const;

/** Display form of the coverage line that never breaks "בתי חולים" across lines. */
export const COVERAGE_HEADLINE = PROMISES.coverage.replace("לבתי חולים", "לבתי\u00A0חולים");

export const PROMISE_LEDGER = [
  {
    id: "license",
    title: "רישיון ופיקוח",
    line: `${LICENSE.statement}. רישיון מס' ${LICENSE_NUMBER}.`,
  },
  {
    id: "human",
    title: PROMISES.human,
    line: "עונה לכם רכז או רכזת שירות, לא מענה ממוחשב.",
  },
  {
    id: "urgent",
    title: PROMISES.urgent,
    line: `לבית או לבית החולים, ${PROMISES.urgentQualifier}.`,
  },
  {
    id: "coverage",
    title: "פריסה ארצית",
    line: `${PROMISES.coverage}.`,
  },
] as const;

export type PromiseId = (typeof PROMISE_LEDGER)[number]["id"];

/** `href` points at an existing SEO service page where one exists. */
export const SITUATIONS = [
  { id: "hospital", title: "ההורה מאושפז וצריך מישהו לידו", tag: "ליווי בבית החולים", href: "/services/hospital-caregiver" },
  { id: "discharge", title: "חזרתם הביתה אחרי אשפוז או ניתוח", tag: "החלמה בבית", href: "/services/post-surgery" },
  { id: "elderly", title: "ההורה צריך עזרה יומיומית בבית", tag: "טיפול בהורה מבוגר", href: "/services/elderly" },
  { id: "night", title: "מישהו צריך להיות ער בלילה", tag: "השגחת לילה", href: "/services/night-caregiver" },
  { id: "dementia", title: "אלצהיימר או דמנציה", tag: "ליווי מותאם", href: "/services/dementia" },
  { id: "replacement", title: "המטפל הקבוע לא זמין", tag: "מטפל מחליף", href: null },
] as const;

export type SituationId = (typeof SITUATIONS)[number]["id"];

export const PROCESS = [
  { title: "מתקשרים", line: "עונה לכם אדם, לא מרכזייה." },
  { title: "מדברים עם רכז או רכזת", line: "מספרים מה קרה ומה המטופל צריך." },
  { title: "בודקים ומתאימים מטפל", line: "לפי המצב, השעות והמקום." },
  { title: "מתאמים הגעה", line: "לבית או לבית החולים." },
] as const;

export const TRUST_POINTS = [
  { title: "רישיון ופיקוח של משרד העבודה", line: `רישיון מס' ${LICENSE_NUMBER}, שאפשר לבדוק בעצמכם במאגר הממשלתי.` },
  { title: "מטפלים ומטפלות ישראלים", line: "דוברי עברית, שמבינים את המטופל ואת המשפחה." },
  { title: "התאמה לפי המצב", line: "בית או בית חולים, יום או לילה, לתקופה קצרה או ארוכה." },
  { title: "מחיר ברור לפני שמתחייבים", line: "מקבלים הצעה בטלפון, לפני כל התחייבות." },
] as const;

export type FaqItem = { q: string; a: string };

const FAQ_URGENT: FaqItem = {
  q: "תוך כמה זמן אפשר לקבל מטפל?",
  a: `במקרים דחופים אנחנו מתאמים הגעה בתוך עד 5 שעות, לבית או לבית החולים, ${PROMISES.urgentQualifier}. כבר בשיחה נאמר לכם בכנות מה אפשרי.`,
};

const FAQ_GOVERNMENT: FaqItem = {
  q: "האם אתם גוף ממשלתי?",
  a: `לא. אנחנו חברה פרטית בעלת רישיון השמה (לשכה פרטית) ממשרד העבודה, מס' ${LICENSE_NUMBER}, ומפוקחת על ידו. אפשר לבדוק את הרישיון במאגר הממשלתי.`,
};

const FAQ_AREAS: FaqItem = {
  q: "באילו אזורים אתם עובדים?",
  a: "אנחנו עובדים עם מטפלים ומטפלות ישראלים בכל רחבי הארץ, בערים וביישובים. בשיחה נבדוק מי זמין באזור שלכם.",
};

const FAQ_PRICE: FaqItem = {
  q: "כמה זה עולה?",
  a: "המחיר תלוי בסוג הטיפול, במספר השעות ובמקום. תקבלו הצעה ברורה בטלפון, לפני כל התחייבות.",
};

const FAQ_TALK_FIRST: FaqItem = {
  q: "אפשר לדבר עם מישהו לפני שמחליטים?",
  a: "כן. השיחה הראשונה נועדה בדיוק לזה: להבין מה קרה, להסביר מה האפשרויות ולענות על השאלות שלכם, בלי התחייבות.",
};

const FAQ_PLACES: FaqItem = {
  q: "המטפלים מגיעים גם לבית החולים?",
  a: "כן. אנחנו מתאמים מטפלים ומטפלות לבית המטופל ולבתי חולים, ביום ובלילה, לפי מה שהמשפחה צריכה.",
};

export const HOME_FAQ: FaqItem[] = [FAQ_URGENT, FAQ_GOVERNMENT, FAQ_PLACES, FAQ_AREAS, FAQ_PRICE, FAQ_TALK_FIRST];

export const LANDING_FAQ: FaqItem[] = [FAQ_URGENT, FAQ_GOVERNMENT, FAQ_PRICE, FAQ_TALK_FIRST];

export const IMAGE_DISCLOSURE = "תמונה להמחשה · נוצרה בבינה מלאכותית";

/**
 * Illustrative photographs composed so the full head, face and hands stay inside
 * the frame. The crop is the whole file: the container uses that aspect ratio.
 */
export const IMAGES = {
  heroAlt: "תמונה להמחשה: מטפלת משוחחת עם אדם מבוגר ומחזיקה את ידיו",
  heroMobile: { src: "/care-hero-mobile.jpg", width: 840, height: 600, crop: { x: 0, y: 0, w: 840, h: 600 } },
  heroDesktop: { src: "/care-hero-desktop.jpg", width: 1280, height: 630, crop: { x: 0, y: 0, w: 1280, h: 630 } },
  humanAlt: "תמונה להמחשה: מטפלת יושבת מול אישה מבוגרת ומחזיקה את ידיה",
  human: { src: "/care-trust.jpg", width: 1280, height: 720, crop: { x: 0, y: 0, w: 1280, h: 720 } },
} as const;
