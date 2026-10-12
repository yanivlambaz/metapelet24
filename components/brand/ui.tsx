import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { getImageProps } from "next/image";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { PHONE_HREF } from "@/lib/constants";
import { cities } from "@/lib/data/cities";
import { services } from "@/lib/data/services";
import { brandFont } from "./fonts";
import { BRAND, CONTACT, IMAGE_DISCLOSURE, LICENSE, PROCESS, type FaqItem } from "./content";
import { WHATSAPP_HREF } from "./actions";
import { IconDocument, IconExternal, IconWhatsApp } from "./icons";

const theme = {
  "--nc-ink": "#0B1F3A",
  "--nc-navy": "#163463",
  "--nc-stone": "#F3F5F7",
  "--nc-line": "#D9DEE4",
  "--nc-muted": "#4B5B70",
  "--nc-teal": "#0D6B63",
  "--nc-teal-dark": "#0A5650",
  "--nc-teal-tint": "#E5F0EE",
  "--nc-footer": "#081729",
  fontFamily: "var(--font-brand), system-ui, sans-serif",
} as CSSProperties;

export function BrandRoot({ children }: { children: ReactNode }) {
  return (
    <div
      dir="rtl"
      style={theme}
      className={`${brandFont.variable} min-h-screen overflow-x-clip bg-white text-(--nc-ink) text-pretty antialiased [&_h2]:text-balance`}
    >
      {children}
    </div>
  );
}

/* ---------- Identity ---------- */

/** Logo Option A: two-line wordmark, no symbol. */
export function Wordmark({ tone = "dark", size = "header" }: { tone?: "dark" | "light"; size?: "header" | "footer" }) {
  const main = size === "header" ? "text-[17px] min-[390px]:text-[18px] lg:text-[22px]" : "text-[20px]";
  const sub = size === "header" ? "text-[11.5px] min-[390px]:text-[12px] lg:text-[13px]" : "text-[13px]";
  return (
    <span className="inline-flex flex-col leading-none">
      <span className={`${main} font-bold tracking-[-0.03em] ${tone === "dark" ? "text-(--nc-ink)" : "text-white"}`}>
        {BRAND.short}
      </span>
      <span className={`${sub} mt-[5px] font-medium tracking-[0.06em] ${tone === "dark" ? "text-(--nc-muted)" : "text-white/75"}`}>
        {BRAND.descriptor}
      </span>
    </span>
  );
}

/* ---------- License ---------- */

export function LicenseStrip() {
  return (
    <div className="bg-(--nc-ink) text-white">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-2 text-[12px] leading-tight lg:px-8 lg:py-2.5 lg:text-[13px]">
        <p className="flex min-w-0 items-center gap-1.5">
          <IconDocument className="h-4 w-4 shrink-0 text-[#7FC8BC]" />
          <span>
            {LICENSE.statement}
            <span className="hidden md:inline"> · {LICENSE.kind} מס&apos; {LICENSE.number}</span>
          </span>
        </p>
        <a
          href={LICENSE.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${LICENSE.verify} (רישיון מס' ${LICENSE.number}, נפתח בחלון חדש)`}
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
        >
          <span className="md:hidden">{LICENSE.number}</span>
          <span className="hidden md:inline">לצפייה ברישיון</span>
          <IconExternal className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

export function LicensePanel() {
  const rows = [
    ["סוג הרישיון", LICENSE.kind],
    ["גורם מפקח", LICENSE.authority],
    ["מספר רישיון", LICENSE.number],
  ];
  return (
    <div className="border border-(--nc-line) bg-white">
      <div className="flex items-center gap-2 border-b border-(--nc-line) px-5 py-3.5">
        <IconDocument className="h-5 w-5 text-(--nc-teal)" />
        <p className="text-[15px] font-bold">רישיון ופיקוח</p>
      </div>
      <dl className="divide-y divide-(--nc-line) px-5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-3 text-[14px]">
            <dt className="text-(--nc-muted)">{k}</dt>
            <dd className="text-left font-semibold tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-(--nc-line) bg-(--nc-stone) px-5 py-3.5">
        <a
          href={LICENSE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-(--nc-teal) underline decoration-(--nc-teal)/30 underline-offset-4 hover:decoration-(--nc-teal)"
        >
          {LICENSE.verify}
          <IconExternal className="h-4 w-4" />
        </a>
        <p className="mt-1.5 text-[12.5px] text-(--nc-muted)">{LICENSE.privateNote}</p>
      </div>
    </div>
  );
}

/* ---------- Content blocks ---------- */

export function SectionLabel({ index, children, className = "" }: { index: string; children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold text-(--nc-teal) ${className}`}>
      <span className="tabular-nums">{index}</span>
      <span className="h-px w-8 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}

export function ProcessList() {
  return (
    <ol className="grid lg:grid-cols-4 lg:gap-8">
      {PROCESS.map((step, i) => (
        <li
          key={step.title}
          className="relative flex gap-4 pb-6 last:pb-0 lg:block lg:border-t-2 lg:border-(--nc-ink) lg:pb-0 lg:pt-5"
        >
          <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] bg-(--nc-ink) text-[15px] font-bold tabular-nums text-white lg:h-auto lg:w-auto lg:justify-start lg:bg-transparent lg:text-[13px] lg:text-(--nc-teal)">
            {String(i + 1).padStart(2, "0")}
          </span>
          {i < PROCESS.length - 1 && (
            <span className="absolute right-[17px] top-9 bottom-0 w-px bg-(--nc-line) lg:hidden" aria-hidden="true" />
          )}
          <div className="pt-1 lg:pt-3">
            <p className="text-[17px] font-bold lg:text-[20px]">{step.title}</p>
            <p className="mt-0.5 text-[14.5px] text-(--nc-muted) lg:mt-1.5 lg:text-[15.5px]">{step.line}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-(--nc-line)">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-(--nc-line)">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold lg:py-5 lg:text-[18px] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="relative h-4 w-4 shrink-0 text-(--nc-teal)" aria-hidden="true">
              <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-current" />
              <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-current transition-transform group-open:scale-y-0" />
            </span>
          </summary>
          <p className="pb-5 text-[15px] leading-relaxed text-(--nc-muted) lg:max-w-[62ch] lg:text-[16px]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Images ---------- */

export type ImageSource = {
  src: string;
  width: number;
  height: number;
  /** Region of the source image to show, in source pixels. */
  crop: { x: number; y: number; w: number; h: number };
};

function cropVars(source: ImageSource, key: "m" | "d") {
  const { width, crop } = source;
  return {
    [`--ar-${key}`]: `${crop.w} / ${crop.h}`,
    [`--iw-${key}`]: `${(width / crop.w) * 100}%`,
    [`--il-${key}`]: `${(-crop.x / crop.w) * 100}%`,
    [`--it-${key}`]: `${(-crop.y / crop.h) * 100}%`,
  };
}

/**
 * Shows an exact source region at every width (unlike object-position, which drifts
 * with the box ratio), so a crop chosen to exclude a detail stays excluded.
 */
export function CroppedImage({
  alt,
  mobile,
  desktop = mobile,
  sizes,
  eager = false,
  disclosureSide = "right",
  captionAt = "bottom",
  className = "",
}: {
  alt: string;
  mobile: ImageSource;
  desktop?: ImageSource;
  sizes: string;
  eager?: boolean;
  disclosureSide?: "left" | "right";
  captionAt?: "top" | "bottom";
  className?: string;
}) {
  const common = eager
    ? { alt, sizes, loading: "eager" as const, fetchPriority: "high" as const }
    : { alt, sizes, loading: "lazy" as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height });

  const style = { ...cropVars(mobile, "m"), ...cropVars(desktop, "d") } as CSSProperties;

  return (
    <figure style={style} className={`relative overflow-hidden bg-(--nc-stone) aspect-(--ar-m) lg:aspect-(--ar-d) ${className}`}>
      <picture>
        {desktop !== mobile && <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />}
        <img
          {...imgProps}
          srcSet={mobileSrcSet}
          alt={alt}
          className="absolute h-auto max-w-none w-(--iw-m) left-(--il-m) top-(--it-m) lg:w-(--iw-d) lg:left-(--il-d) lg:top-(--it-d)"
        />
      </picture>
      <figcaption
        className={`absolute ${captionAt === "top" ? "top-2" : "bottom-2"} ${disclosureSide === "right" ? "right-2" : "left-2"} rounded-[3px] bg-(--nc-ink)/75 px-2 py-1 text-[11px] font-medium leading-none text-white`}
      >
        {IMAGE_DISCLOSURE}
      </figcaption>
    </figure>
  );
}

/* ---------- Footer ---------- */

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

export function BrandFooter({ variant = "full" }: { variant?: "full" | "minimal" }) {
  return (
    <footer className="bg-(--nc-footer) pb-28 text-white lg:pb-0">
      <div className="mx-auto max-w-[1240px] px-5 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-9 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${BRAND.name}, לעמוד הבית`}>
              <Wordmark tone="light" size="footer" />
            </Link>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-white/75">{LICENSE.full}</p>
            <p className="mt-1 text-[13.5px] text-white/75">{LICENSE.privateNote}</p>
            <a
              href={LICENSE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[13.5px] font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
            >
              {LICENSE.verify}
              <IconExternal className="h-3.5 w-3.5" />
            </a>
          </div>

          {variant === "full" && (
            <>
              <nav aria-label="שירותים" className="lg:col-span-3">
                <p className="text-[13px] font-semibold text-white/55">שירותים</p>
                <ul className="mt-3 space-y-2 text-[14px]">
                  {Object.values(services).map((service) => (
                    <li key={service.slug}>
                      <Link href={`/services/${service.slug}`} className="text-white/85 hover:text-white">
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="ערים" className="lg:col-span-2">
                <p className="text-[13px] font-semibold text-white/55">ערים</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[14px] lg:grid-cols-1">
                  {Object.values(cities).map((city) => (
                    <li key={city.slug}>
                      <Link href={`/${city.slug}`} className="text-white/85 hover:text-white">
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}

          <div className={variant === "full" ? "lg:col-span-3" : "lg:col-span-4 lg:col-start-9"}>
            <p className="text-[13px] font-semibold text-white/55">יצירת קשר</p>
            <a href={PHONE_HREF} dir="ltr" className="mt-2 block text-right text-[22px] font-bold tabular-nums text-white">
              {CONTACT.phone}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1.5 text-[14px] text-white/85 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              <IconWhatsApp className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </a>
            <p className="mt-3 text-[14px] text-white/75">{CONTACT.address}</p>
            {variant === "minimal" && (
              <Link href="/" className="mt-4 inline-block text-[14px] font-semibold text-white underline decoration-white/40 underline-offset-4">
                לאתר המלא
              </Link>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-[12.5px] text-white/65 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="קישורים משפטיים" className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
            <CookiePreferencesButton className="cursor-pointer hover:text-white" />
          </nav>
          <p>
            © {new Date().getFullYear()} {BRAND.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
