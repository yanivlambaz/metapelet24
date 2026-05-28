import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons";
import { cities } from "@/lib/data/cities";
import { services } from "@/lib/data/services";

const footerLinks = [
  { href: "/#services", label: "שירותים" },
  { href: "/#how-it-works", label: "איך זה עובד" },
  { href: "/#lead-form", label: "בקשת מטפל" },
  { href: "/#faq", label: "שאלות נפוצות" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-primary pb-28 text-white md:pb-8">
      <div className="container-main section-padding !pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg font-bold">
                24
              </span>
              <div>
                <div className="text-lg font-bold">{SITE_NAME}</div>
                <div className="text-sm text-blue-200">{SITE_TAGLINE}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-blue-100">
              פלטפורמה מובילה לאיתור מטפלים פרטיים ישראלים. שירות מקצועי, מהיר ואמין — 24 שעות ביממה.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-blue-200">קישורים</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-blue-50 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-blue-200">ערים</h3>
            <ul className="grid grid-cols-2 gap-1">
              {Object.values(cities).map((city) => (
                <li key={city.slug}>
                  <a href={`/${city.slug}`} className="text-sm text-blue-50 hover:text-white">
                    מטפלת ב{city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold text-blue-200">צרו קשר</h3>
            <div className="space-y-3">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-sm font-semibold text-white hover:text-accent"
              >
                קו חם 24/7 · <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1fb855]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
            <h3 className="mb-2 mt-5 text-sm font-bold text-blue-200">שירותים</h3>
            <ul className="space-y-1">
              {Object.values(services).map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/services/${service.slug}`}
                    className="text-sm text-blue-50 hover:text-white"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-xs text-blue-200">
          © {new Date().getFullYear()} {SITE_NAME}. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
