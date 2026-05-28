import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { citySlugs, getCity } from "@/lib/data/cities";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_HREF, buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

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
  const description = `${city.intro.slice(0, 150)}... התקשר: ${PHONE_DISPLAY}`;

  return {
    title,
    description,
    alternates: { canonical: `https://metapelet24.co.il/${slug}` },
    openGraph: { title, description, locale: "he_IL", url: `https://metapelet24.co.il/${slug}` },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = getCity(slug);

  if (!city) notFound();

  return (
    <SiteShell homeHref="/">
      <JsonLd
        data={[localBusinessSchema(city.name), faqSchema(city.faqs)]}
      />
      <main>
        <section className="gradient-hero section-padding text-white">
          <div className="container-main mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
              מטפלת פרטית ב{city.name} — זמינות מיידית 24/7
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
              {city.intro}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#lead-form" className="btn-urgent w-full sm:w-auto">
                מצא מטפל ב{city.name} עכשיו
              </a>
              <a href={PHONE_HREF} className="btn-outline w-full sm:w-auto">
                התקשר: {PHONE_DISPLAY}
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

        <LeadForm defaultCity={city.name} />
        <FAQ
          items={city.faqs}
          title={`שאלות נפוצות — מטפלים ב${city.name}`}
          subtitle={`כל מה שצריך לדעת על שירותי מטפלת 24 ב${city.name}`}
        />
      </main>
    </SiteShell>
  );
}
