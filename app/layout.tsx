import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://metapelet24.co.il"),
  title: {
    default: "מטפלת 24 | מטפלים פרטיים ישראלים בזמינות מיידית 24/7",
    template: "%s | מטפלת 24",
  },
  description:
    "מטפלת 24 — פלטפורמה לאיתור מטפלים פרטיים ישראלים בזמינות מיידית. התאמה מהירה של מטפל מקצועי לבית, בית חולים ומצבים דחופים. שירות 24/7.",
  keywords: [
    "מטפלים פרטיים",
    "מטפלת לקשיש",
    "מטפל לבית חולים",
    "מטפלת לילה",
    "מטפלים ישראלים",
    "טיפול בקשישים",
    "השגחה פרטית",
    "מטפל אחרי ניתוח",
    "מטפלים 24/7",
    "מטפלת 24",
  ],
  authors: [{ name: "מטפלת 24" }],
  creator: "מטפלת 24",
  publisher: "מטפלת 24",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://metapelet24.co.il",
    siteName: "מטפלת 24",
    title: "מטפלת 24 | מטפלים פרטיים ישראלים בזמינות מיידית 24/7",
    description:
      "התאמה מהירה של מטפל מקצועי לבית, בית חולים ומצבים דחופים. מטפלים ישראלים, זמינות 24/7.",
  },
  twitter: {
    card: "summary_large_image",
    title: "מטפלת 24 | מטפלים פרטיים ישראלים בזמינות מיידית",
    description:
      "פלטפורמה לאיתור מטפלים פרטיים ישראלים בזמינות מיידית 24/7.",
  },
  alternates: {
    canonical: "https://metapelet24.co.il",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-white font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
