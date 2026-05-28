import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import ServicePageContent from "@/components/ServicePageContent";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { serviceSlugs, getService } from "@/lib/data/services";
import { serviceSchema, faqSchema, medicalOrganizationSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_HREF, SITE_URL, buildWhatsAppUrl } from "@/lib/constants";

type PageProps = {
  params: Promise<{ service: string }>;
};

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const title = `${service.h1} | מטפלת 24`;
  const description = service.description;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      locale: "he_IL",
      url: `${SITE_URL}/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const pageUrl = `${SITE_URL}/services/${slug}`;

  return (
    <SiteShell homeHref="/">
      <JsonLd
        data={[
          medicalOrganizationSchema(pageUrl),
          serviceSchema(service.name, service.description, pageUrl),
          faqSchema(service.faqs),
        ]}
      />
      <main>
        <section className="gradient-hero section-padding text-white">
          <div className="container-main mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">{service.h1}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">{service.description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#lead-form" className="btn-urgent w-full sm:w-auto">
                מצא {service.name} עכשיו
              </a>
              <a href={PHONE_HREF} className="btn-outline w-full sm:w-auto">
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={buildWhatsAppUrl(`שלום, אני מחפש/ת ${service.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        <ServicePageContent service={service} />
        <LeadForm defaultCareType={service.careType} />
        <FAQ
          items={service.faqs}
          title={`שאלות נפוצות — ${service.name}`}
          subtitle={`כל מה שצריך לדעת על ${service.name}`}
        />
        <CTASection
          title={`מחפשים ${service.name}?`}
          subtitle="התקשרו עכשיו — נתאים מטפל מקצועי תוך שעות"
        />
      </main>
    </SiteShell>
  );
}
