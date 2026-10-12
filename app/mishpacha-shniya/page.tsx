import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SecondFamily from "@/components/brand/SecondFamily";
import { SECOND_FAMILY, SECOND_FAMILY_FAQ, SECOND_FAMILY_PHONE_DISPLAY } from "@/components/brand/second-family-copy";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

const PATH = "/mishpacha-shniya";
const CANONICAL = `${SITE_URL}${PATH}`;
const TITLE = "משפחה שנייה | ליווי אישי להורים מבוגרים בבית – המרכז הארצי";
const DESCRIPTION = `ביקורים קבועים, חברה ועזרה בדברים הקטנים להורים בבית, ועדכונים למשפחה. ליווי אישי לגיל השלישי, לא טיפול רפואי. התקשרו: ${SECOND_FAMILY_PHONE_DISPLAY}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    locale: "he_IL",
    url: CANONICAL,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function SecondFamilyPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema(
            SECOND_FAMILY.name,
            "ליווי אישי, חברה וסיוע מעשי להורים מבוגרים בבית, עם עדכונים למשפחה. השירות אינו טיפול רפואי או סיעודי.",
            CANONICAL,
            SECOND_FAMILY_PHONE_DISPLAY,
          ),
          faqSchema(SECOND_FAMILY_FAQ.map((item) => ({ question: item.q, answer: item.a }))),
        ]}
      />
      <SecondFamily />
    </>
  );
}
