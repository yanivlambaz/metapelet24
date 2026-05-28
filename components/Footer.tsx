import Link from "next/link";
import Logo from "@/components/Logo";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_NAME,
} from "@/lib/constants";
import LicenseBanner from "@/components/LicenseBanner";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";
import { cities } from "@/lib/data/cities";
import { services } from "@/lib/data/services";

export default function Footer() {
  return (
    <footer className="bg-[#0F2D6B] pb-28 text-white md:pb-10">
      <div className="container-main section-padding !pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Logo + description */}
          <div>
            <div className="mb-4">
              <Logo variant="white" className="h-[40px] w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-blue-100/90">
              פלטפורמה מובילה לאיתור מטפלים פרטיים ישראלים. שירות מקצועי, מהיר ואמין — 24 שעות ביממה.
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">שירותים</h3>
            <ul className="space-y-2">
              {Object.values(services).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-blue-100 transition-colors hover:text-accent"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#services" className="text-sm text-blue-100 transition-colors hover:text-accent">
                  כל השירותים
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Cities */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">ערים</h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
              {Object.values(cities).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${city.slug}`}
                    className="text-sm text-blue-100 transition-colors hover:text-accent"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">צרו קשר</h3>
            <div className="space-y-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <PhoneIcon className="h-5 w-5 text-accent" />
                <span>
                  קו חם 24/7 · <span dir="ltr">{PHONE_DISPLAY}</span>
                </span>
              </a>
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold transition-colors hover:bg-[#1fb855]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                שלח הודעה ב-WhatsApp
              </a>
            </div>
          </div>
        </div>

        <LicenseBanner />

        <div id="accessibility" className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-blue-200 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. כל הזכויות שמורות.</p>
          <p>אתר זה מותאם לגלישה נגישה · RTL · עברית</p>
        </div>
      </div>
    </footer>
  );
}
