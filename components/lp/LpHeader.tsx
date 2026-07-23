import Link from "next/link";
import Logo from "@/components/Logo";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_HREF,
} from "@/lib/constants";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export default function LpHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/95 backdrop-blur-md">
      <div className="container-main flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0" aria-label="מטפלת 24 — לאתר הראשי">
          <Logo className="shrink-0" />
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="btn-urgent !px-3 !py-2.5 !text-sm"
            aria-label="התקשרו עכשיו"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            <span>התקשרו</span>
          </a>
          <a
            href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !px-3 !py-2.5 !text-sm"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
