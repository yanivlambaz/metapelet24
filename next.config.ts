import type { NextConfig } from "next";
import { isDomainCutoverEnabled, legacyDomainRedirects } from "./lib/domain-cutover";

const nextConfig: NextConfig = {
  async redirects() {
    return legacyDomainRedirects(isDomainCutoverEnabled());
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
