import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { BrandFrame, LocalClose, LocalHero, LocalStory, PlaceList, RelatedLinks, RuledFacts } from "@/components/brand/BrandLocal";
import { LICENSE, PROMISES } from "@/components/brand/content";
import { citySlugs, cities, getCity } from "@/lib/data/cities";
import { services } from "@/lib/data/services";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { PHONE_DISPLAY, SITE_NAME, SITE_URL } from "@/lib/constants";

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

  const title = `מטפלת פרטית ב${city.name}`;
  const description = `מטפלים ומטפלות ישראלים ב${city.name}, לבית ולבתי החולים. ${LICENSE.statement}. התקשר: ${PHONE_DISPLAY}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
    openGraph: {
      type: "website",
      title: `${title} | ${SITE_NAME}`,
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
  const others = Object.values(cities)
    .filter((item) => item.slug !== city.slug)
    .slice(0, 4)
    .map((item) => ({ href: `/${item.slug}`, label: `מטפלת פרטית ב${item.name}` }));

  return (
    <BrandFrame>
      <JsonLd data={[localBusinessSchema({ city: city.name, url: pageUrl }), faqSchema(city.faqs)]} />
      <main>
        <LocalHero
          kicker={`${LICENSE.statement} · רישיון ${LICENSE.number}`}
          title={`מטפלת פרטית ב${city.name}`}
          lede={`${PROMISES.human}. ${PROMISES.urgent}, ${PROMISES.urgentQualifier}.`}
        />
        <section className="bg-white">
          <div className="mx-auto max-w-[820px] px-5 py-8 lg:max-w-[1100px] lg:px-8">
            <RuledFacts
              items={[
                { title: "איפה", line: `בבית, בבתי החולים ב${city.name}, ובשכונות שמסביב.` },
                { title: "מי מגיע", line: "מטפלים ומטפלות ישראלים, דוברי עברית." },
                { title: "מתי", line: `${PROMISES.urgent}. ${PROMISES.urgentQualifier}.` },
                { title: "למה אפשר לסמוך", line: `${LICENSE.full} ${LICENSE.privateNote}` },
              ]}
            />
          </div>
        </section>
        <LocalStory
          heading={`טיפול ב${city.name}, לפי מה שקורה במשפחה`}
          body={city.intro}
          asideTitle={`בתי חולים ב${city.name}`}
          aside={city.hospitals}
        />
        <PlaceList
          title={`שכונות ואזורים ב${city.name}`}
          places={city.neighborhoods}
          note="לא מצאתם את השכונה? בשיחה נבדוק מי זמין באזור."
        />
        <RelatedLinks title="שירותים" links={Object.values(services).map((service) => ({ href: `/services/${service.slug}`, label: service.name }))} />
        <RelatedLinks title="ערים נוספות" links={others} />
        <LocalClose
          heading={`שאלות על טיפול ב${city.name}`}
          faqs={city.faqs.map((item) => ({ q: item.question, a: item.answer }))}
          defaultCity={city.name}
        />
      </main>
    </BrandFrame>
  );
}
