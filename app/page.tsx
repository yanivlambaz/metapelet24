import type { Metadata } from "next";
import BrandHome from "@/components/brand/BrandHome";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "מטפלת פרטית בזמינות מיידית | המרכז הארצי לשירותי מטפלים" },
  description: `מטפלים ומטפלות ישראלים לבית ולבתי חולים, בפריסה ארצית. מענה אנושי מיידי. התקשר: ${PHONE_DISPLAY}`,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: "מטפלת פרטית בזמינות מיידית | המרכז הארצי לשירותי מטפלים",
    description: `מטפלים ומטפלות ישראלים לבית ולבתי חולים. התקשר: ${PHONE_DISPLAY}`,
    locale: "he_IL",
    url: SITE_URL,
  },
};

export default function Home() {
  return <BrandHome />;
}
