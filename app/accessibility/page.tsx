import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout from "@/components/LegalPageLayout";
import {
  COMPANY_ADDRESS_DISPLAY,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";

const LAST_UPDATED = "6 ביולי 2026";

export const metadata: Metadata = {
  title: "הצהרת נגישות | Metapelet24",
  description:
    "הצהרת הנגישות של אתר Metapelet24 והמידע על הסדרי הנגישות ודרכי יצירת קשר בנושא נגישות.",
  alternates: { canonical: `${SITE_URL}/accessibility` },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: `${SITE_URL}/accessibility`,
    title: "הצהרת נגישות | Metapelet24",
    description:
      "הצהרת הנגישות של אתר Metapelet24 והמידע על הסדרי הנגישות ודרכי יצירת קשר בנושא נגישות.",
  },
};

export default function AccessibilityPage() {
  return (
    <LegalPageLayout
      title="הצהרת נגישות"
      lastUpdated={LAST_UPDATED}
      currentPath="/accessibility"
    >
      <h2>מחויבותנו לנגישות</h2>
      <p>
        {SITE_NAME} רואה חשיבות רבה במתן שירות שוויוני ונגיש לכלל המשתמשים, לרבות אנשים עם
        מוגבלות. אנו פועלים באופן שוטף לשיפור נגישות האתר ולהתאמתו לדרישות הדין החל, מתוך
        הבנה שנגישות דיגיטלית היא חלק מהותי מהשירות שאנו מעניקים — במיוחד בתחום הטיפול
        והסיעוד.
      </p>

      <h2>הסדרי הנגישות באתר</h2>
      <p>האתר תוכנן ופותח תוך שימת דגש על עקרונות הנגישות הבאים:</p>
      <ul>
        <li>תמיכה מלאה בעברית ובכיווניות ימין-לשמאל (RTL);</li>
        <li>עיצוב רספונסיבי המותאם למחשב, לטאבלט ולנייד;</li>
        <li>מבנה HTML סמנטי התומך בקוראי מסך;</li>
        <li>אפשרות ניווט באמצעות מקלדת, לרבות סימוני פוקוס נראים;</li>
        <li>טקסט חלופי (alt) לתמונות מהותיות;</li>
        <li>טיפוגרפיה קריאה וניגודיות צבעים בין טקסט לרקע;</li>
        <li>הפחתת אנימציות עבור משתמשים שהגדירו העדפת תנועה מופחתת (prefers-reduced-motion);</li>
        <li>תוויות ARIA ותיאורים נגישים ברכיבים אינטראקטיביים מרכזיים.</li>
      </ul>

      <h2>מגבלות ידועות</h2>
      <p>
        אנו פועלים לשיפור מתמיד של נגישות האתר, אך ייתכן שחלק מהעמודים או הרכיבים טרם
        הונגשו באופן מלא, וכן ייתכנו רכיבי צד שלישי (כגון שירותי WhatsApp) שנגישותם אינה
        בשליטתנו. האתר טרם עבר בדיקת הסמכה פורמלית לתקן הישראלי (ת&quot;י 5568), ואנו
        ממשיכים לפעול לצמצום פערים ולשיפור חוויית השימוש לכלל הגולשים.
      </p>

      <h2>דרכי פנייה בנושא נגישות</h2>
      <p>
        נתקלת בקושי או בבעיה בשימוש באתר? נשמח שתדווח/י לנו כדי שנוכל לטפל בכך בהקדם. ניתן
        לפנות אלינו באמצעים הבאים:
      </p>
      <ul>
        <li>
          טלפון:{" "}
          <a href={PHONE_HREF}>
            <span dir="ltr">{PHONE_DISPLAY}</span>
          </a>
          ;
        </li>
        <li>כתובת: {COMPANY_ADDRESS_DISPLAY}.</li>
      </ul>
      <p>
        בפנייתך מומלץ לציין את מהות הבעיה, העמוד שבו התרחשה, סוג המכשיר והדפדפן וכל פרט נוסף
        שיסייע לנו לאתר ולתקן את התקלה.
      </p>

      <h2>עדכון ההצהרה</h2>
      <p>
        הצהרת נגישות זו עודכנה לאחרונה בתאריך המצוין בראש העמוד, והיא תעודכן מעת לעת בהתאם
        לשיפורים שיבוצעו באתר.
      </p>

      <h2>עמודים קשורים</h2>
      <p>
        ראו גם את <Link href="/privacy-policy">מדיניות הפרטיות</Link> ואת{" "}
        <Link href="/terms">תנאי השימוש</Link> של האתר.
      </p>
    </LegalPageLayout>
  );
}
