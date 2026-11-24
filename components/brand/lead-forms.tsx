"use client";

import { useEffect, useId } from "react";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/constants";
import {
  CARE_OPTIONS,
  LEAD_MESSAGE_INTRO,
  TIMING_OPTIONS,
  useQuickLeadForm,
  useStepLeadForm,
  useTimedPopup,
  type CareOptionId,
  type LeadStatus,
} from "@/lib/leads/use-lead-forms";
import { CallButton, WhatsAppLink } from "./actions";
import { PROMISES } from "./content";
import { IconBed, IconCheck, IconClock, IconClose, IconHands, IconHome, IconMoon, IconPerson } from "./icons";

type Tone = "light" | "dark";

const INPUT = {
  light:
    "h-12 w-full rounded-[4px] border border-(--nc-line) bg-white px-3.5 text-[16px] text-(--nc-ink) placeholder:text-(--nc-muted) outline-none focus:border-(--nc-teal) focus:ring-2 focus:ring-(--nc-teal)/20",
  dark: "h-12 w-full rounded-[4px] border border-white/25 bg-white/5 px-3.5 text-[16px] text-white placeholder:text-white/55 outline-none focus:border-white focus:ring-2 focus:ring-white/20",
};

const SUBMIT = {
  light:
    "h-12 w-full rounded-[4px] bg-(--nc-ink) text-[16px] font-semibold text-white hover:bg-(--nc-navy) disabled:cursor-not-allowed disabled:opacity-70",
  dark: "h-12 w-full rounded-[4px] bg-white text-[16px] font-semibold text-(--nc-ink) hover:bg-(--nc-stone) disabled:cursor-not-allowed disabled:opacity-70",
};

const MUTED = { light: "text-(--nc-muted)", dark: "text-white/65" };

function PrivacyNote({ tone }: { tone: Tone }) {
  return (
    <p className={`mt-2.5 text-[12px] leading-relaxed ${MUTED[tone]}`}>
      שליחת הטופס מהווה אישור לכך שקראתי את{" "}
      <Link
        href="/privacy-policy"
        className={`font-semibold underline underline-offset-2 ${tone === "light" ? "text-(--nc-ink) decoration-(--nc-ink)/30" : "text-white decoration-white/40"}`}
      >
        מדיניות הפרטיות
      </Link>{" "}
      ואני מסכים/ה לשימוש במידע בהתאם לאמור בה.
    </p>
  );
}

function ErrorNote({ status }: { status: LeadStatus }) {
  if (status.state !== "error") return null;
  return (
    <p role="alert" className="mt-2.5 rounded-[4px] border border-[#E7B4B4] bg-[#FBEDED] px-3 py-2 text-[13px] font-semibold text-[#8A1C1C]">
      {status.message}
    </p>
  );
}

function SuccessNote({
  id,
  tone,
  title,
  whatsappMessage,
}: {
  id?: string;
  tone: Tone;
  title: string;
  whatsappMessage?: string;
}) {
  return (
    <div id={id} role="status" className={`border-r-[3px] border-(--nc-teal) px-4 py-3.5 ${tone === "light" ? "bg-(--nc-teal-tint)" : "bg-white/10"}`}>
      <p className="flex items-center gap-2 text-[16px] font-bold">
        <IconCheck className="h-5 w-5 text-[#3FB7A6]" stroke={2.2} />
        {title}
      </p>
      <p className={`mt-1 text-[14px] ${MUTED[tone]}`}>
        רכז שירות יחזור אליכם לבירור הצרכים. משאירים שם וטלפון — בלי התחייבות.
      </p>
      {whatsappMessage ? (
        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex text-[14px] font-semibold underline underline-offset-4 ${tone === "light" ? "text-(--nc-ink)" : "text-white"}`}
        >
          אפשר גם להוסיף פרטים ב־WhatsApp
        </a>
      ) : null}
    </div>
  );
}

/** Name + phone callback form. Lead logic lives in `useQuickLeadForm`. */
export function QuickLeadForm({
  formId,
  formType,
  intro = LEAD_MESSAGE_INTRO.landingPage,
  tone = "light",
  buttonLabel = "חזרו אליי עם פרטים על מטפל/ת",
  city,
  careType,
  openWhatsApp = false,
  onSuccess,
}: {
  formId: string;
  formType: string;
  intro?: string;
  tone?: Tone;
  buttonLabel?: string;
  city?: string;
  careType?: string;
  openWhatsApp?: boolean;
  onSuccess?: () => void;
}) {
  const { name, setName, phone, setPhone, submitted, status, handleSubmit, whatsappMessage } = useQuickLeadForm({
    formType,
    intro,
    formId,
    city,
    careType,
    openWhatsApp,
    onSuccess,
  });

  if (submitted) {
    return (
      <SuccessNote
        id={formId}
        tone={tone}
        title="קיבלנו את הפרטים. נחזור אליכם בהקדם."
        whatsappMessage={whatsappMessage || undefined}
      />
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} dir="rtl" noValidate>
      <div className="grid gap-2">
        <label htmlFor={`${formId}-name`} className="sr-only">
          שם מלא
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={INPUT[tone]}
        />
        <label htmlFor={`${formId}-phone`} className="sr-only">
          מספר טלפון
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="מספר טלפון"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${INPUT[tone]} text-right`}
        />
        <button type="submit" disabled={status.state === "loading"} className={SUBMIT[tone]}>
          {status.state === "loading" ? "שולח..." : buttonLabel}
        </button>
      </div>
      <ErrorNote status={status} />
      <PrivacyNote tone={tone} />
    </form>
  );
}

/** Compact hero / mid-page lead card with heading and reassurance. */
export function LeadCaptureCard({
  formId,
  formType,
  title = "צריכים מטפל או מטפלת? אנחנו כאן לעזור",
  description = "השאירו שם ומספר טלפון, ורכז שירות אנושי יחזור אליכם לבירור הצרכים והתאמת מטפל.",
  buttonLabel = "חזרו אליי עם פרטים על מטפל/ת",
  reassurance = "שיחה ראשונית ללא התחייבות",
  intro = LEAD_MESSAGE_INTRO.site,
  tone = "light",
  city,
  careType,
  className = "",
}: {
  formId: string;
  formType: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  reassurance?: string;
  intro?: string;
  tone?: Tone;
  city?: string;
  careType?: string;
  className?: string;
}) {
  return (
    <div className={`${tone === "light" ? "border border-(--nc-line) bg-white" : "bg-white/5"} p-5 lg:p-6 ${className}`}>
      <p className="text-[18px] font-bold leading-snug lg:text-[20px]">{title}</p>
      <p className={`mt-1.5 text-[14px] leading-relaxed ${MUTED[tone]}`}>{description}</p>
      <p className={`mt-2 text-[13px] font-semibold ${tone === "light" ? "text-(--nc-teal)" : "text-[#7FC8BC]"}`}>{reassurance}</p>
      <div className="mt-4">
        <QuickLeadForm
          formId={formId}
          formType={formType}
          intro={intro}
          tone={tone}
          buttonLabel={buttonLabel}
          city={city}
          careType={careType}
          openWhatsApp={false}
        />
      </div>
      <p className={`mt-3 text-[12.5px] leading-relaxed ${MUTED[tone]}`}>
        משאירים שם וטלפון, רכז שירות חוזר אליכם, מבין את הצרכים ובודק אפשרויות מתאימות.
      </p>
    </div>
  );
}

const CARE_ICONS: Record<CareOptionId, typeof IconBed> = {
  hospital: IconBed,
  night: IconMoon,
  home: IconHome,
  surgery: IconHands,
  elderly: IconPerson,
  urgent: IconClock,
};

const OPTION =
  "flex items-center gap-3 rounded-[4px] border bg-white px-3.5 py-3.5 text-right text-[15px] font-semibold transition-colors hover:border-(--nc-teal)";

/** Three-step homepage form. Prefer LeadCaptureCard / QuickLeadForm for conversion. */
export function StepLeadForm({
  defaultCity = "",
  defaultCareType = "",
}: {
  defaultCity?: string;
  defaultCareType?: string;
} = {}) {
  const form = useStepLeadForm({ defaultCity, defaultCareType });
  const { step, setStep, careType, timing, status } = form;

  if (form.submitted) {
    return <SuccessNote tone="light" title="קיבלנו את הפרטים. רכז שירות יחזור אליכם בהקדם." />;
  }

  return (
    <div>
      <p className="text-[13px] font-medium text-(--nc-muted)">שלב {step} מתוך 3</p>
      <div className="mt-2 grid grid-cols-3 gap-1" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`h-1 ${n <= step ? "bg-(--nc-teal)" : "bg-(--nc-line)"}`} />
        ))}
      </div>

      {step === 1 && (
        <fieldset className="mt-5">
          <legend className="text-[17px] font-bold">במה נוכל לעזור?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {CARE_OPTIONS.map((option) => {
              const Icon = CARE_ICONS[option.id];
              const selected = careType === option.label;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => form.chooseCareType(option.label)}
                  className={`${OPTION} ${selected ? "border-(--nc-teal) bg-(--nc-teal-tint)" : "border-(--nc-line)"}`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-(--nc-navy)" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="mt-5">
          <legend className="text-[17px] font-bold">מתי צריך את המטפל?</legend>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {TIMING_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={timing === option}
                onClick={() => form.chooseTiming(option)}
                className={`${OPTION} justify-center ${timing === option ? "border-(--nc-teal) bg-(--nc-teal-tint)" : "border-(--nc-line)"}`}
              >
                {option}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setStep(1)} className="mt-4 text-[14px] font-medium text-(--nc-muted) underline underline-offset-4">
            חזרה
          </button>
        </fieldset>
      )}

      {step === 3 && (
        <form onSubmit={form.handleSubmit} className="mt-5">
          <p className="text-[17px] font-bold">לאן לחזור אליכם?</p>
          <div className="mt-3 grid gap-3">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-[14px] font-medium">
                שם
              </label>
              <input
                id="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={form.firstName}
                onChange={(e) => form.setFirstName(e.target.value)}
                className={INPUT.light}
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-[14px] font-medium">
                טלפון
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                required
                dir="ltr"
                autoComplete="tel"
                placeholder="050-000-0000"
                value={form.phone}
                onChange={(e) => form.setPhone(e.target.value)}
                className={`${INPUT.light} text-right`}
              />
            </div>
            <div>
              <label htmlFor="city" className="mb-1 block text-[14px] font-medium">
                עיר
              </label>
              <input
                id="city"
                type="text"
                required
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => form.setCity(e.target.value)}
                className={INPUT.light}
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="h-12 shrink-0 rounded-[4px] border border-(--nc-line) px-4 text-[15px] font-medium text-(--nc-muted)"
            >
              חזרה
            </button>
            <button type="submit" disabled={status.state === "loading"} className={SUBMIT.light}>
              {status.state === "loading" ? "שולח..." : "שליחה וחזרה אליי"}
            </button>
          </div>
          <ErrorNote status={status} />
          <PrivacyNote tone="light" />
        </form>
      )}
    </div>
  );
}

/** Optional timed popup — prefer user-initiated CallbackProvider modal. */
export function CallbackPopup({ formType }: { formType: string }) {
  const popup = useTimedPopup();
  const titleId = useId();
  const { open, close } = popup;

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-(--nc-ink)/60 p-3 sm:items-center sm:p-4">
      <div role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative w-full max-w-md rounded-[4px] bg-white p-5 shadow-2xl sm:p-6">
        <button
          type="button"
          onClick={close}
          aria-label="סגירה"
          className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-[4px] text-(--nc-muted) hover:bg-(--nc-stone) hover:text-(--nc-ink)"
        >
          <IconClose className="h-5 w-5" />
        </button>
        <h2 id={titleId} className="pl-10 text-[21px] font-bold leading-tight">
          רוצים שנחזור אליכם?
        </h2>
        <p className="mt-1.5 text-[15px] text-(--nc-muted)">{PROMISES.human}. השאירו שם וטלפון — שיחה ראשונית ללא התחייבות.</p>
        <div className="mt-4">
          <QuickLeadForm
            formId="popup-lead-form"
            formType={formType}
            intro={LEAD_MESSAGE_INTRO.site}
            buttonLabel="חזרו אליי עם פרטים על מטפל/ת"
            openWhatsApp={false}
            onSuccess={() => setTimeout(close, 2000)}
          />
        </div>
        <div className="my-4 flex items-center gap-3 text-[13px] text-(--nc-muted)">
          <span className="h-px flex-1 bg-(--nc-line)" />
          או התקשרו עכשיו
          <span className="h-px flex-1 bg-(--nc-line)" />
        </div>
        <CallButton />
        <div className="mt-3">
          <WhatsAppLink />
        </div>
      </div>
    </div>
  );
}
