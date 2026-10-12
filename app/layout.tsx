import type { Metadata } from "next";
import Script from "next/script";
import { Heebo } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/constants";
import { layoutFaqs } from "@/lib/data/seo-faq";
import { faqSchema, localBusinessSchema } from "@/lib/schema";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "המרכז הארצי לשירותי מטפלים | מטפלת פרטית בזמינות מיידית",
    template: "%s | המרכז הארצי",
  },
  icons: {
    icon: [{ url: "/icon-mark.png", type: "image/png", sizes: "32x32" }],
    shortcut: [{ url: "/icon-mark.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
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
  authors: [{ name: "המרכז הארצי לשירותי מטפלים" }],
  creator: "המרכז הארצי לשירותי מטפלים",
  publisher: "המרכז הארצי לשירותי מטפלים",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: SITE_URL,
    siteName: "המרכז הארצי לשירותי מטפלים",
    title: "מטפלת פרטית בזמינות מיידית | המרכז הארצי לשירותי מטפלים",
    description:
      "מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התאמה תוך שעות לבית, בית חולים ומצבים דחופים. התקשר: 072-393-9494",
  },
  twitter: {
    card: "summary_large_image",
    title: "מטפלת פרטית בזמינות מיידית | המרכז הארצי לשירותי מטפלים",
    description: `מטפלים ומטפלות ישראלים לבית ולבתי חולים. התקשר: ${PHONE_DISPLAY}`,
  },
  alternates: {
    canonical: SITE_URL,
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
            __html: `(function(w,d){
w.dataLayer=w.dataLayer||[];
function gtag(){w.dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{
  var c=JSON.parse(w.localStorage.getItem('metapelet24-cookie-consent'));
  if(c&&c.version===1&&c.preferences){
    var m=c.preferences.marketing?'granted':'denied';
    gtag('consent','update',{analytics_storage:c.preferences.analytics?'granted':'denied',ad_storage:m,ad_user_data:m,ad_personalization:m});
  }
}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(w,d,'script','dataLayer','GTM-KNNXBD26');
})(window,document);`,
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
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
