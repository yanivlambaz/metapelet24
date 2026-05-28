import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { serviceSlugs, getService } from "@/lib/data/services";
import { serviceSchema, faqSchema, localBusinessSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_HREF, buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

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
    alternates: { canonical: `https://metapelet24.co.il/services/${slug}` },
    openGraph: {
      title,
      description,
      locale: "he_IL",
      url: `https://metapelet24.co.il/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { service: slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const url = `https://metapelet24.co.il/services/${slug}`;

  return (
    <SiteShell homeHref="/">
      <JsonLd
        data={[
          localBusinessSchema(),
          serviceSchema(service.name, service.description, url),
          faqSchema(service.faqs),
        ]}
      />
      <main>
        <section className="gradient-hero section-padding text-white">
          <div className="container-main mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">{service.h1}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100">
              {service.intro}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-blue-200">{service.description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#lead-form" className="btn-urgent w-full sm:w-auto">
                מצא {service.name} עכשיו
              </a>
              <a href={PHONE_HREF} className="btn-outline w-full sm:w-auto">
                {PHONE_DISPLAY}
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

        <LeadForm defaultCareType={service.careType} />
        <FAQ
          items={service.faqs}
          title={`שאלות נפוצות — ${service.name}`}
          subtitle={`כל מה שצריך לדעת על ${service.name}`}
        />
      </main>
    </SiteShell>
  );
}
