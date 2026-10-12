import type { Metadata } from "next";
import BrandLanding from "@/components/brand/BrandLanding";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "מטפלת סיעודית בדחיפות | המרכז הארצי לשירותי מטפלים" },
  description:
    "המרכז הארצי לשירותי מטפלים פועל ברישיון ומפוקח על ידי משרד העבודה. במקרים דחופים — הגעה בתוך עד 5 שעות, בהתאם לזמינות באזור.",
  alternates: {
    canonical: `${SITE_URL}/lp`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "מטפלת סיעודית בדחיפות | המרכז הארצי לשירותי מטפלים",
    description:
      "חברה בעלת רישיון ומפוקחת על ידי משרד העבודה. במקרים דחופים — הגעה בתוך עד 5 שעות, בהתאם לזמינות באזור.",
    locale: "he_IL",
    url: `${SITE_URL}/lp`,
  },
};

export default function LandingPage() {
  return <BrandLanding />;
}
