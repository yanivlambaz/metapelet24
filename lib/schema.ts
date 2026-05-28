import {
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_NAME,
  SITE_TAGLINE,
  WHATSAPP_HREF,
} from "@/lib/constants";
import type { FAQItem } from "@/lib/data/faq";

const BASE_URL = "https://metapelet24.co.il";

export function localBusinessSchema(city?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: city ? `${BASE_URL}/${city}` : BASE_URL,
    telephone: PHONE_DISPLAY,
    areaServed: city
      ? {
          "@type": "City",
          name: city,
        }
      : {
          "@type": "Country",
          name: "Israel",
        },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    sameAs: [WHATSAPP_HREF],
  };
}

export function medicalOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    url: BASE_URL,
    telephone: PHONE_HREF.replace("tel:", ""),
    medicalSpecialty: "HomeHealth",
    availableService: [
      "Private Caregiver",
      "Hospital Caregiver",
      "Night Caregiver",
      "Elderly Care",
    ],
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
      "@type": "LocalBusiness",
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
