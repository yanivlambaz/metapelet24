import type { MetadataRoute } from "next";
import { citySlugs } from "@/lib/data/cities";
import { serviceSlugs } from "@/lib/data/services";

const BASE = "https://metapelet24.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const cityPages = citySlugs.map((city) => ({
    url: `${BASE}/${city}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const servicePages = serviceSlugs.map((service) => ({
    url: `${BASE}/services/${service}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...cityPages,
    ...servicePages,
  ];
}
