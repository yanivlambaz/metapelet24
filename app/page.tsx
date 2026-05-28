import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import SocialProof from "@/components/SocialProof";
import LeadForm from "@/components/LeadForm";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyMetapelet24 from "@/components/WhyMetapelet24";
import FAQ from "@/components/FAQ";
import CityLinksGrid from "@/components/CityLinksGrid";
import ServiceLinksGrid from "@/components/ServiceLinksGrid";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
  description: `מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התאמה תוך שעות לבית, בית חולים ומצבים דחופים. התקשר: ${PHONE_DISPLAY}`,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: "מטפלת פרטית בזמינות מיידית 24/7 | מטפלת 24",
    description: `מצא מטפל/ת פרטי/ת ישראלי/ת בזמינות מיידית. התקשר: ${PHONE_DISPLAY}`,
    locale: "he_IL",
    url: SITE_URL,
  },
};

export default function Home() {
  return (
    <SiteShell>
      <main>
        <Hero />
        <TrustBadges />
        <SocialProof />
        <LeadForm />
        <Services />
        <HowItWorks />
        <WhyMetapelet24 />
        <FAQ />
        <CityLinksGrid />
        <ServiceLinksGrid />
      </main>
    </SiteShell>
  );
}
