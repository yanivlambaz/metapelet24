"use client";

import { useEffect, useRef } from "react";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE, PHONE_HREF } from "@/lib/constants";
import { trackLeadEvent } from "@/lib/leads/track";
import { useOptionalCallbackModal } from "./CallbackProvider";
import { CONTACT } from "./content";
import { IconPhone, IconWhatsApp } from "./icons";

export const WHATSAPP_HREF = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

export function CallButton({
  id,
  label = "התקשרו עכשיו",
  size = "md",
  className = "",
  phoneHref = PHONE_HREF,
  phoneDisplay = CONTACT.phone,
}: {
  id?: string;
  label?: string;
  size?: "md" | "lg";
  className?: string;
  phoneHref?: string;
  phoneDisplay?: string;
}) {
  const h = size === "lg" ? "h-14 px-5 text-[17px] lg:h-16 lg:px-7 lg:text-[19px]" : "h-14 px-5 text-[17px]";
  return (
    <a
      id={id}
      href={phoneHref}
      aria-label={`${label}: ${phoneDisplay}`}
      onClick={() => trackLeadEvent("phone_click", { source: id || "call-button" })}
      className={`flex w-full items-center justify-between gap-4 rounded-[4px] bg-(--nc-teal) ${h} font-semibold text-white transition-colors hover:bg-(--nc-teal-dark) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--nc-teal) ${className}`}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <IconPhone className="h-5 w-5 shrink-0" stroke={1.8} />
        <span>{label}</span>
      </span>
      <span dir="ltr" className="shrink-0 font-bold tabular-nums tracking-[0.01em]">
        {phoneDisplay}
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
      onClick={() => trackLeadEvent("whatsapp_click", { source: "whatsapp-link" })}
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

/**
 * Mobile-first conversion chrome:
 * - Sticky bottom bar (~50% "השאירו פרטים" + call + WhatsApp)
 * - Discreet desktop WhatsApp float (no duplicate phone bubble)
 */
export function MobileCallBar({
  whatsappMessage,
  phoneHref = PHONE_HREF,
  phoneDisplay = CONTACT.phone,
  formType = "mobile-sticky",
  callbackHeading,
  callbackDescription,
  callbackButtonLabel,
  intro,
}: {
  whatsappMessage?: string;
  phoneHref?: string;
  phoneDisplay?: string;
  formType?: string;
  callbackHeading?: string;
  callbackDescription?: string;
  callbackButtonLabel?: string;
  intro?: string;
} = {}) {
  const modal = useOptionalCallbackModal();
  const barRef = useRef<HTMLDivElement>(null);
  const whatsappHref = whatsappMessage ? buildWhatsAppUrl(whatsappMessage) : WHATSAPP_HREF;
  const modalOpen = Boolean(modal?.isOpen);

  useEffect(() => {
    const root = document.documentElement;
    function publishHeight() {
      const height = barRef.current?.offsetHeight ?? 0;
      if (height > 0) {
        root.style.setProperty("--nc-mobile-cta-h", `${height}px`);
      }
    }
    publishHeight();
    window.addEventListener("resize", publishHeight);
    return () => {
      window.removeEventListener("resize", publishHeight);
      root.style.removeProperty("--nc-mobile-cta-h");
    };
  }, [modalOpen]);

  return (
    <>
      {!modalOpen ? (
        <div
          ref={barRef}
          role="navigation"
          aria-label="יצירת קשר מהירה"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-(--nc-line) bg-white px-2.5 pt-2 lg:hidden"
          style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto flex max-w-lg items-stretch gap-1.5">
            <button
              type="button"
              onClick={() =>
                modal?.open({
                  formType,
                  heading: callbackHeading || "השאירו פרטים ונחזור אליכם",
                  description:
                    callbackDescription ||
                    "רכז שירות אנושי יחזור אליכם כדי להבין את הצורך ולסייע בהתאמת מטפל או מטפלת.",
                  buttonLabel: callbackButtonLabel || "חזרו אליי",
                  intro,
                })
              }
              className="flex min-h-12 basis-1/2 flex-[2] items-center justify-center rounded-[4px] bg-(--nc-ink) px-2 text-[14px] font-semibold text-white min-[360px]:min-h-14 min-[360px]:text-[15px]"
            >
              השאירו פרטים
            </button>
            <a
              href={phoneHref}
              aria-label={`התקשרו עכשיו: ${phoneDisplay}`}
              onClick={() => trackLeadEvent("phone_click", { source: "mobile-sticky" })}
              className="flex min-h-12 min-w-[44px] flex-1 items-center justify-center gap-1 rounded-[4px] bg-(--nc-teal) px-1.5 text-[13px] font-semibold text-white min-[360px]:min-h-14 min-[360px]:gap-1.5 min-[360px]:text-[14px]"
            >
              <IconPhone className="h-4 w-4 shrink-0" stroke={1.8} />
              <span>התקשרו</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="פתיחת שיחת WhatsApp"
              onClick={() => trackLeadEvent("whatsapp_click", { source: "mobile-sticky" })}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] border border-(--nc-line) text-[#1DA851] min-[360px]:h-14 min-[360px]:w-14"
            >
              <IconWhatsApp className="h-6 w-6 min-[360px]:h-7 min-[360px]:w-7" />
            </a>
          </div>
        </div>
      ) : null}

      {/* Desktop: single discreet WhatsApp float — no second phone bubble */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="פתיחת שיחת WhatsApp"
        onClick={() => trackLeadEvent("whatsapp_click", { source: "desktop-float" })}
        className="fixed bottom-6 left-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-colors hover:bg-[#1DA851] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] lg:flex"
      >
        <IconWhatsApp className="h-7 w-7 text-white" />
      </a>
    </>
  );
}
