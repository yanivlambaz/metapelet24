import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BrandFrame, LocalClose, LocalHero, LocalStory, RelatedLinks, RuledFacts } from "@/components/brand/BrandLocal";
import { LICENSE, PROMISES } from "@/components/brand/content";
import { cities } from "@/lib/data/cities";
import { getService, serviceSlugs, services } from "@/lib/data/services";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/constants";

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

  const title = service.h1;
  const description = `${service.description}. ${LICENSE.statement}. התקשר: ${PHONE_DISPLAY}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${SITE_NAME}`,
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
  const others = Object.values(services)
    .filter((item) => item.slug !== service.slug)
    .map((item) => ({ href: `/services/${item.slug}`, label: item.name }));

  const formTitles: Record<string, string> = {
    "hospital-caregiver": "צריכים מישהו שישגיח על בן משפחה בבית החולים?",
    "night-caregiver": "מחפשים מטפלת להשגחת לילה?",
    "post-surgery": "זקוקים לעזרה בבית לאחר ניתוח או אשפוז?",
    dementia: "מחפשים ליווי מתאים לבן משפחה עם דמנציה?",
    elderly: "מחפשים מטפל או מטפלת לקשיש בבית?",
  };
  const formTitle = formTitles[service.slug] || `צריכים ${service.name}? אנחנו כאן לעזור`;

  return (
    <BrandFrame>
      <JsonLd
        data={[
          serviceSchema(service.name, service.description, pageUrl),
          faqSchema(service.faqs),
        ]}
      />
      <main>
        <LocalHero
          kicker={PROMISES.coverage}
          title={service.h1}
          lede={`${service.description}. ${PROMISES.human}. ${PROMISES.urgent}, ${PROMISES.urgentQualifier}.`}
          whatsappMessage={`שלום, אני מחפש/ת ${service.name}`}
          formType={`service-${service.slug}`}
          careType={service.careType}
          formTitle={formTitle}
        />
        <section className="bg-white">
          <div className="mx-auto max-w-[820px] px-5 py-8 lg:max-w-[1100px] lg:px-8">
            <RuledFacts items={service.benefits.map((benefit) => ({ title: benefit.title, line: benefit.description }))} />
          </div>
        </section>
        <LocalStory
          heading="איך זה נראה בפועל"
          body={service.content}
          asideTitle="מה קורה אחרי שמשאירים פרטים"
          aside={[
            { name: "משאירים שם וטלפון", description: "רכז שירות חוזר אליכם — אדם, לא מרכזייה." },
            { name: "מספרים מה קרה", description: "רכז או רכזת שואלים מה המטופל צריך, ואיפה." },
            { name: "מתאמים הגעה", description: `${PROMISES.urgent}, ${PROMISES.urgentQualifier}.` },
          ]}
          formType={`service-${service.slug}-story`}
          careType={service.careType}
          callbackHeading={formTitle}
          callbackCopy="ספרו לנו בקצרה מה אתם צריכים, ונחזור אליכם עם האפשרויות המתאימות."
          callbackCta="השאירו פרטים לשיחה חוזרת"
        />
        <RelatedLinks title="שירותים נוספים" links={others} />
        <RelatedLinks
          title="בפריסה ארצית"
          links={Object.values(cities).map((city) => ({ href: `/${city.slug}`, label: `מטפלת פרטית ב${city.name}` }))}
        />
        <LocalClose
          heading={`שאלות על ${service.name}`}
          faqs={service.faqs.map((item) => ({ q: item.question, a: item.answer }))}
          defaultCareType={service.careType}
          formType={`service-${service.slug}-final`}
          formTitle={formTitle}
          whatsappMessage={`שלום, אני מחפש/ת ${service.name}`}
        />
      </main>
    </BrandFrame>
  );
}
