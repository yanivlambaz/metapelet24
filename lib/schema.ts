import {
  PHONE_DISPLAY,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/constants";
import type { FAQItem } from "@/lib/data/faq";

export function localBusinessSchema(options?: {
  city?: string;
  url?: string;
}) {
  const url = options?.url ?? SITE_URL;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url,
    telephone: PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IL",
      ...(options?.city ? { addressLocality: options.city } : {}),
    },
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    areaServed: options?.city ?? "Israel",
  };
}

export function medicalOrganizationSchema(url = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url,
    telephone: PHONE_DISPLAY,
    medicalSpecialty: "HomeHealth",
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
  };
}

export function faqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "MedicalOrganization",
      name: SITE_NAME,
      telephone: PHONE_DISPLAY,
    },
    url,
    areaServed: {
      "@type": "Country",
      name: "Israel",
    },
  };
}
