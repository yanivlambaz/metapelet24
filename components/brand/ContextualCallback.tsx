"use client";

import { useOptionalCallbackModal } from "./CallbackProvider";

type Props = {
  formType: string;
  heading: string;
  copy: string;
  cta: string;
  buttonLabel?: string;
  description?: string;
  city?: string;
  careType?: string;
  className?: string;
};

/** Mid-page conversion band that opens the shared callback modal. */
export function ContextualCallback({
  formType,
  heading,
  copy,
  cta,
  buttonLabel,
  description,
  city,
  careType,
  className = "",
}: Props) {
  const modal = useOptionalCallbackModal();

  return (
    <aside className={`border-r-[3px] border-(--nc-teal) bg-(--nc-teal-tint) px-5 py-5 lg:px-7 lg:py-6 ${className}`}>
      <h3 className="text-[18px] font-bold leading-snug lg:text-[22px]">{heading}</h3>
      <p className="mt-1.5 max-w-[40rem] text-[14.5px] leading-relaxed text-(--nc-muted) lg:text-[16px]">{copy}</p>
      <button
        type="button"
        onClick={() =>
          modal?.open({
            formType,
            heading: description ? heading : "השאירו פרטים ונחזור אליכם",
            description: description || copy,
            buttonLabel: buttonLabel || "חזרו אליי",
            city,
            careType,
          })
        }
        className="mt-4 inline-flex h-12 items-center justify-center rounded-[4px] bg-(--nc-ink) px-5 text-[15px] font-semibold text-white hover:bg-(--nc-navy)"
      >
        {cta}
      </button>
    </aside>
  );
}
