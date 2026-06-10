import type { Metadata } from "next";
import Script from "next/script";
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
    default: "מטפלת 24 | מטפלת פרטית בזמינות מיידית 24/7",
    template: "%s | מטפלת 24",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231B4F8A'/><path d='M16 8C16 5 13.5 3 11 5C8.5 3 6 5 6 8C6 11 9 14 11 17C9 14 13 18 16 22C19 18 23 14 21 11C21 8 18.5 3 16 8Z' fill='white'/></svg>",
    shortcut:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231B4F8A'/><path d='M16 8C16 5 13.5 3 11 5C8.5 3 6 5 6 8C6 11 9 14 11 17C9 14 13 18 16 22C19 18 23 14 21 11C21 8 18.5 3 16 8Z' fill='white'/></svg>",
    apple:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%231B4F8A'/><path d='M16 8C16 5 13.5 3 11 5C8.5 3 6 5 6 8C6 11 9 14 11 17C9 14 13 18 16 22C19 18 23 14 21 11C21 8 18.5 3 16 8Z' fill='white'/></svg>",
  },
  description:
    "מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התאמה תוך שעות לבית, בית חולים ומצבים דחופים. התקשר: 072-393-9494",
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
      "מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התאמה תוך שעות לבית, בית חולים ומצבים דחופים. התקשר: 072-393-9494",
  },
  twitter: {
    card: "summary_large_image",
    title: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
    description: `מטפלים פרטיים ישראלים — זמינות מיידית. התקשר: ${PHONE_DISPLAY}`,
  },
  alternates: {
    canonical: "https://www.metapelet24.co.il",
  },
  verification: {
    google: "HhAPIiPZ7qoXm5PLroB8_S6UbAB0rTiGxceax4L6GeM",
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
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KNNXBD26');`,
          }}
        />
        <Script
          id="gtm-script-2"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N43LNDPH');`,
          }}
        />
      </head>
      <body className="min-h-full bg-white font-sans text-foreground antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KNNXBD26"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N43LNDPH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
