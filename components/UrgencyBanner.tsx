import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";
import { PhoneIcon } from "@/components/icons";

export default function UrgencyBanner() {
  return (
    <a
      href={PHONE_HREF}
      className="urgency-banner sticky top-0 z-[60] flex h-9 items-center justify-center gap-2 bg-[#DC2626] px-4 text-center text-[0.8125rem] font-semibold text-white transition-colors hover:bg-[#b91c1c] sm:text-sm"
      aria-label={`התקשרו עכשיו ${PHONE_DISPLAY}`}
    >
      <PhoneIcon className="h-4 w-4 shrink-0" />
      <span>צריכים מטפל/ת דחוף? מענה אנושי מיידי —</span>
      <span dir="ltr" className="font-extrabold underline underline-offset-2">
        {PHONE_DISPLAY}
      </span>
    </a>
  );
}
