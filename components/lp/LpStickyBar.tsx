import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_HREF,
} from "@/lib/constants";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export default function LpStickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-white/95 p-3 shadow-2xl backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="container-main flex gap-2 px-1">
        <a
          href={PHONE_HREF}
          className="btn-urgent flex-1 !py-3.5 !text-sm"
        >
          <PhoneIcon className="h-5 w-5" />
          התקשרו
        </a>
        <a
          href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1 !py-3.5 !text-sm"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
