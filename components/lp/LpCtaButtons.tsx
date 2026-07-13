import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/constants";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

type LpCtaButtonsProps = {
  className?: string;
  showPhoneNumber?: boolean;
};

export default function LpCtaButtons({
  className = "",
  showPhoneNumber = true,
}: LpCtaButtonsProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-3 sm:flex-row ${className}`}
    >
      <a href={PHONE_HREF} className="btn-urgent w-full sm:w-auto">
        <PhoneIcon className="h-5 w-5" />
        {showPhoneNumber ? (
          <>
            התקשרו עכשיו — <span dir="ltr">{PHONE_DISPLAY}</span>
          </>
        ) : (
          "התקשרו עכשיו"
        )}
      </a>
      <a
        href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp w-full sm:w-auto"
      >
        <WhatsAppIcon className="h-5 w-5" />
        שלחו WhatsApp
      </a>
    </div>
  );
}
