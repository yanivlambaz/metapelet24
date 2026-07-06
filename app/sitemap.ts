import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { citySlugs } from "@/lib/data/cities";
import { serviceSlugs } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const cityPages = citySlugs.map((city) => ({
    url: `${SITE_URL}/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const servicePages = serviceSlugs.map((service) => ({
    url: `${SITE_URL}/services/${service}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const legalPages = ["privacy-policy", "terms", "accessibility"].map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...cityPages,
    ...servicePages,
    ...legalPages,
  ];
}
