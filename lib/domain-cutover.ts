/**
 * Path-preserving redirects from the old domain to the new primary domain.
 * They stay off until ENABLE_DOMAIN_CUTOVER is exactly "true".
 * Do not redirect www.siudi.org.il or siudi.org.il from this file.
 */

export const PRIMARY_SITE_URL = "https://www.siudi.org.il";

export const LEGACY_HOSTS = ["metapelet24.co.il", "www.metapelet24.co.il"] as const;

export const DOMAIN_CUTOVER_ENV = "ENABLE_DOMAIN_CUTOVER";

export type HostRedirect = {
  source: string;
  has: [{ type: "host"; value: string }];
  destination: string;
  permanent: true;
};

export function isDomainCutoverEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env[DOMAIN_CUTOVER_ENV] === "true";
}

export function legacyDomainRedirects(enabled: boolean): HostRedirect[] {
  if (!enabled) return [];
  return LEGACY_HOSTS.map((host) => ({
    source: "/:path*",
    has: [{ type: "host", value: host }],
    destination: `${PRIMARY_SITE_URL}/:path*`,
    permanent: true,
  }));
}
