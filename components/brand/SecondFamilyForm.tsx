"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { submitLead } from "@/lib/leads/submit-lead";
import { buildWhatsAppUrl } from "@/lib/constants";
import { isValidPhone, phoneDigits } from "@/lib/leads/use-lead-forms";
import { trackLeadEvent } from "@/lib/leads/track";
import { IconCheck } from "./icons";
import { SECOND_FAMILY_CRM_INTRO, SECOND_FAMILY_FORM_TYPE, SECOND_FAMILY_WHATSAPP } from "./second-family-copy";

const FIELD =
  "h-12 w-full rounded-[4px] border border-(--nc-line) bg-white px-3.5 text-[16px] text-(--nc-ink) outline-none focus:border-(--nc-teal) focus:ring-2 focus:ring-(--nc-teal)/20";

export default function SecondFamilyForm({ formId = "sf-lead-form" }: { formId?: string } = {}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    trackLeadEvent("lead_form_view", { formType: SECOND_FAMILY_FORM_TYPE, formId });
  }, [formId]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackLeadEvent("lead_form_start", { formType: SECOND_FAMILY_FORM_TYPE, formId });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;

    const trimmedName = name.trim();
    const digits = phoneDigits(phone);

    if (trimmedName.length < 2 || !isValidPhone(digits)) {
      setError("נא להזין שם מלא ומספר טלפון תקין");
      trackLeadEvent("lead_form_error", { formType: SECOND_FAMILY_FORM_TYPE, formId });
      return;
    }

    const message = [SECOND_FAMILY_CRM_INTRO, `שם: ${trimmedName}`, `טלפון: ${digits}`].filter(Boolean).join("\n");

    setLoading(true);
    setError("");
    trackLeadEvent("lead_form_submit", { formType: SECOND_FAMILY_FORM_TYPE, formId });

    try {
      await submitLead({
        name: trimmedName,
        phone: digits,
        message,
        formType: SECOND_FAMILY_FORM_TYPE,
      });
      setSubmitted(true);
      trackLeadEvent("lead_form_success", { formType: SECOND_FAMILY_FORM_TYPE, formId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "שליחת הפרטים נכשלה. נסו שוב בעוד רגע.");
      trackLeadEvent("lead_form_error", { formType: SECOND_FAMILY_FORM_TYPE, formId });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div id={formId} role="status" className="border-r-[3px] border-(--nc-teal) bg-(--sf-sage) px-4 py-3.5">
        <p className="flex items-center gap-2 text-[16px] font-bold">
          <IconCheck className="h-5 w-5 text-(--nc-teal)" stroke={2.2} />
          קיבלנו את הפרטים. נחזור אליכם לגבי משפחה שנייה.
        </p>
        <p className="mt-1 text-[14px] text-(--nc-muted)">רכז שירות יחזור אליכם לשיחה ראשונית ללא התחייבות.</p>
        <a
          href={buildWhatsAppUrl(SECOND_FAMILY_WHATSAPP)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLeadEvent("whatsapp_click", { source: "second-family-success" })}
          className="mt-3 inline-flex text-[14px] font-semibold text-(--nc-ink) underline underline-offset-4"
        >
          אפשר גם להוסיף פרטים ב־WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} dir="rtl" noValidate>
      <div className="grid gap-3">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-1 block text-[14px] font-medium">
            שם מלא
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => {
              markStarted();
              setName(e.target.value);
            }}
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="mb-1 block text-[14px] font-medium">
            מספר טלפון
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              markStarted();
              setPhone(e.target.value);
            }}
            className={`${FIELD} text-right`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-[4px] bg-(--nc-teal) text-[17px] font-semibold text-white hover:bg-(--nc-teal-dark) disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "שולח..." : "השאירו פרטים על משפחה שנייה"}
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-2.5 rounded-[4px] border border-[#E7B4B4] bg-[#FBEDED] px-3 py-2 text-[13px] font-semibold text-[#8A1C1C]">
          {error}
        </p>
      ) : null}
      <p className="mt-2.5 text-[12px] leading-relaxed text-(--nc-muted)">
        שליחת הטופס מהווה אישור לכך שקראתי את{" "}
        <Link href="/privacy-policy" className="font-semibold text-(--nc-ink) underline decoration-(--nc-ink)/30 underline-offset-2">
          מדיניות הפרטיות
        </Link>{" "}
        ואני מסכים/ה לשימוש במידע בהתאם לאמור בה.
      </p>
    </form>
  );
}
