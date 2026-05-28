import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import LeadForm from "@/components/LeadForm";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { PHONE_DISPLAY } from "@/lib/constants";
import { homepageFaqs } from "@/lib/data/faq";
import { faqSchema, localBusinessSchema, medicalOrganizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
  description: `מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התאמה תוך שעות לבית, בית חולים ומצבים דחופים. התקשר עכשיו: ${PHONE_DISPLAY}`,
  alternates: {
    canonical: "https://metapelet24.co.il",
  },
  openGraph: {
    title: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
    description: `מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התקשר: ${PHONE_DISPLAY}`,
    locale: "he_IL",
    url: "https://metapelet24.co.il",
  },
};

export default function Home() {
  return (
    <SiteShell>
      <JsonLd
        data={[
          localBusinessSchema(),
          medicalOrganizationSchema(),
          faqSchema(homepageFaqs),
        ]}
      />
      <main>
        <Hero />
        <SocialProof />
        <LeadForm />
        <Services />
        <HowItWorks />
        <FAQ />
      </main>
    </SiteShell>
  );
}
