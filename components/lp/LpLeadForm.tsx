"use client";

import Link from "next/link";
import { LEAD_MESSAGE_INTRO, useQuickLeadForm } from "@/lib/leads/use-lead-forms";

type LpLeadFormProps = {
  formId?: string;
  compact?: boolean;
};

export default function LpLeadForm({
  formId = "lp-lead-form",
  compact = false,
}: LpLeadFormProps) {
  const { name, setName, phone, setPhone, submitted, status, handleSubmit } = useQuickLeadForm({
    formType: "landing-page",
    intro: LEAD_MESSAGE_INTRO.landingPage,
  });

  if (submitted) {
    return (
      <div
        id={formId}
        className="rounded-2xl border border-green-200 bg-green-50 px-4 py-5 text-center"
      >
        <p className="text-base font-bold text-green-700">✓ קיבלנו! נחזור אליכם בהקדם</p>
        <p className="mt-1 text-sm text-green-600">נפתח גם WhatsApp לטיפול מיידי</p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      dir="rtl"
      className={`rounded-2xl border border-slate-200 bg-white p-3 shadow-lg sm:p-4 ${
        compact ? "" : "shadow-xl"
      }`}
    >
      {!compact && (
        <p className="mb-2.5 text-center text-sm font-semibold text-primary">
          השאירו שם וטלפון ונחזור אליכם בהקדם
        </p>
      )}
      <div className="space-y-2">
        <div>
          <label htmlFor={`${formId}-name`} className="sr-only">
            שם מלא
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            required
            dir="rtl"
            placeholder="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-right text-sm text-slate-800 placeholder:text-right placeholder:text-slate-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="sr-only">
            טלפון
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            inputMode="tel"
            required
            dir="rtl"
            placeholder="טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-right text-sm text-slate-800 placeholder:text-right placeholder:text-slate-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-slate-500">
        ללא התחייבות • מענה אנושי מהיר • התאמה לצורכי המשפחה
      </p>
      <button
        type="submit"
        disabled={status.state === "loading"}
        className="btn-urgent mt-2.5 w-full !py-3 !text-sm disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status.state === "loading" ? "שולח..." : "מצאו לי מטפל/ת עכשיו"}
      </button>
      {status.state === "error" && (
        <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-700">
          {status.message}
        </p>
      )}
      <p className="mt-2.5 text-center text-xs leading-relaxed text-muted">
        שליחת הטופס מהווה אישור לכך שקראתי את{" "}
        <Link
          href="/privacy-policy"
          className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:text-accent"
        >
          מדיניות הפרטיות
        </Link>
        .
      </p>
    </form>
  );
}
