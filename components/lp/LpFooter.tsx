import Link from "next/link";
import Logo from "@/components/Logo";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_NAME,
} from "@/lib/constants";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export default function LpFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0F2D6B] pb-24 pt-10 text-white md:pb-10">
      <div className="container-main px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Logo variant="white" />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              <PhoneIcon className="h-4 w-4 text-accent" />
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#1fb855]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
          <nav
            aria-label="קישורים משפטיים"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-blue-200"
          >
            <Link href="/privacy-policy" className="transition-colors hover:text-accent">
              מדיניות פרטיות
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent">
              תנאי שימוש
            </Link>
            <Link href="/accessibility" className="transition-colors hover:text-accent">
              הצהרת נגישות
            </Link>
          </nav>
          <p className="text-xs text-blue-200">
            © {new Date().getFullYear()} {SITE_NAME}. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
}
