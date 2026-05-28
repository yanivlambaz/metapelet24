import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import CityPageContent from "@/components/CityPageContent";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { citySlugs, getCity } from "@/lib/data/cities";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_HREF, SITE_URL, buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

type PageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};

  const title = `מטפלת פרטית ב${city.name} — זמינות מיידית 24/7 | מטפלת 24`;
  const description = `${city.description}. התאמה תוך שעות. התקשר: ${PHONE_DISPLAY}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      locale: "he_IL",
      url: `${SITE_URL}/${slug}`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = getCity(slug);

  if (!city) notFound();

  const pageUrl = `${SITE_URL}/${slug}`;

  return (
    <SiteShell homeHref="/">
      <JsonLd
        data={[
          localBusinessSchema({ city: city.name, url: pageUrl }),
          faqSchema(city.faqs),
        ]}
      />
      <main>
        <section className="gradient-hero section-padding text-white">
          <div className="container-main mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              מטפלת פרטית ב{city.name} — זמינות מיידית 24/7
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">{city.description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#lead-form" className="btn-urgent w-full sm:w-auto">
                מצא מטפל ב{city.name} עכשיו
              </a>
              <a href={PHONE_HREF} className="btn-outline w-full sm:w-auto">
                התקשר: <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <CityPageContent city={city} />
        <LeadForm defaultCity={city.name} />
        <FAQ
          items={city.faqs}
          title={`שאלות נפוצות — מטפלים ב${city.name}`}
          subtitle={`כל מה שצריך לדעת על שירותי מטפלת 24 ב${city.name}`}
        />
        <CTASection
          title={`צריכים מטפלת ב${city.name}?`}
          subtitle="התקשרו עכשיו — נתאים מטפל תוך שעות"
        />
      </main>
    </SiteShell>
  );
}
