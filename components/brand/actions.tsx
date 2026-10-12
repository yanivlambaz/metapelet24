import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE, PHONE_HREF } from "@/lib/constants";
import { CONTACT } from "./content";
import { IconPhone, IconWhatsApp } from "./icons";

export const WHATSAPP_HREF = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

export function CallButton({
  id,
  label = "התקשרו עכשיו",
  size = "md",
  className = "",
}: {
  id?: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const h = size === "lg" ? "h-14 px-5 text-[17px] lg:h-16 lg:px-7 lg:text-[19px]" : "h-14 px-5 text-[17px]";
  return (
    <a
      id={id}
      href={PHONE_HREF}
      aria-label={`${label}: ${CONTACT.phone}`}
      className={`flex w-full items-center justify-between gap-4 rounded-[4px] bg-(--nc-teal) ${h} font-semibold text-white transition-colors hover:bg-(--nc-teal-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nc-teal) ${className}`}
    >
      <span className="flex items-center gap-2.5">
        <IconPhone className="h-5 w-5" stroke={1.8} />
        {label}
      </span>
      <span dir="ltr" className="font-bold tabular-nums tracking-[0.01em]">
        {CONTACT.phone}
      </span>
    </a>
  );
}

export function WhatsAppLink({
  tone = "dark",
  className = "",
  message = DEFAULT_WHATSAPP_MESSAGE,
}: {
  tone?: "dark" | "light";
  className?: string;
  message?: string;
}) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-[14px] font-semibold underline underline-offset-4 ${
        tone === "dark"
          ? "text-(--nc-ink) decoration-(--nc-line) hover:decoration-(--nc-ink)"
          : "text-white decoration-white/40 hover:decoration-white"
      } ${className}`}
    >
      <IconWhatsApp className="h-4 w-4 text-[#1DA851]" />
      כתבו לנו ב־WhatsApp
    </a>
  );
}

/** The only floating element on brand pages: one call bar, mobile only. */
export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-(--nc-line) bg-white px-3 pt-2.5 lg:hidden"
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2">
        <a
          href={PHONE_HREF}
          aria-label={`התקשרו עכשיו: ${CONTACT.phone}`}
          className="flex h-14 flex-1 items-center justify-center gap-2.5 rounded-[4px] bg-(--nc-teal) text-[16px] font-semibold text-white"
        >
          <IconPhone className="h-5 w-5" stroke={1.8} />
          התקשרו
          <span dir="ltr" className="font-bold tabular-nums">
            {CONTACT.phone}
          </span>
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-[4px] border border-(--nc-line) text-[#1DA851]"
        >
          <IconWhatsApp className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
