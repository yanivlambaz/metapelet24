import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { PHONE_DISPLAY } from "@/lib/constants";
import { layoutFaqs } from "@/lib/data/seo-faq";
import { faqSchema, localBusinessSchema } from "@/lib/schema";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.metapelet24.co.il"),
  title: {
    default: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
    template: "%s | מטפלת 24",
  },
  description:
    "מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התאמה תוך שעות לבית, בית חולים ומצבים דחופים. התקשר: 072-394-0350",
  keywords: [
    "מטפלת פרטית",
    "מטפל פרטי",
    "מטפלת סיעודית",
    "מטפל לבית חולים",
    "מטפלת ללילה",
    "מטפל ישראלי",
    "סיעוד פרטי",
  ],
  authors: [{ name: "מטפלת 24" }],
  creator: "מטפלת 24",
  publisher: "מטפלת 24",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://www.metapelet24.co.il",
    siteName: "מטפלת 24",
    title: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
    description:
      "מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התאמה תוך שעות לבית, בית חולים ומצבים דחופים. התקשר: 072-394-0350",
  },
  twitter: {
    card: "summary_large_image",
    title: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
    description: `מטפלים פרטיים ישראלים — זמינות מיידית. התקשר: ${PHONE_DISPLAY}`,
  },
  alternates: {
    canonical: "https://www.metapelet24.co.il",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full scroll-smooth`}>
      <head>
        <JsonLd data={[localBusinessSchema(), faqSchema(layoutFaqs)]} />
      </head>
      <body className="min-h-full bg-white font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
