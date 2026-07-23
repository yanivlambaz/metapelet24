"use client";

import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE, PHONE_HREF } from "@/lib/constants";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch gap-2 border-t border-slate-200 bg-white p-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] md:hidden">
      <a
        href={PHONE_HREF}
        className="flex flex-[3] items-center justify-center gap-2 rounded-xl bg-[#EA580C] py-3.5 text-[0.95rem] font-extrabold text-white transition-transform active:scale-[0.98]"
      >
        <PhoneIcon className="h-5 w-5 shrink-0" />
        התקשרו עכשיו
      </a>
      <a
        href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
      </a>
    </div>
  );
}
