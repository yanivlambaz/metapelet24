"use client";

import { FormEvent, useState } from "react";
import MotionReveal from "@/components/MotionReveal";
import { buildWhatsAppUrl } from "@/lib/constants";

const careTypes = [
  "מטפל לבית חולים",
  "מטפלת ללילה",
  "מטפל אחרי ניתוח",
  "טיפול בקשישים",
  "השגחה פרטית",
  "מטפל זמני",
  "מטפלים 24/7",
  "אחר",
];

const urgencyOptions = [
  "מיידי — היום",
  "מחר",
  "תוך שבוע",
  "גמיש",
];

type FormData = {
  firstName: string;
  phone: string;
  city: string;
  careType: string;
  urgency: string;
};

const initialForm: FormData = {
  firstName: "",
  phone: "",
  city: "",
  careType: "",
  urgency: "",
};

export default function LeadForm() {
  const [form, setForm] = useState<FormData>(initialForm);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const message = [
      "שלום, אני מעוניין/ת במטפל/ת פרטי/ת.",
      "",
      `שם: ${form.firstName}`,
      `טלפון: ${form.phone}`,
      `עיר: ${form.city}`,
      `סוג טיפול: ${form.careType}`,
      `מתי נדרש: ${form.urgency}`,
    ].join("\n");

    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section id="lead-form" className="section-padding bg-surface">
      <div className="container-main">
        <MotionReveal className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
              בקשה מהירה
            </span>
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              מצאו מטפל/ת מתאים/ה תוך שעות
            </h2>
            <p className="mt-3 text-muted">
              מלאו את הפרטים ונחזור אליכם מיד עם התאמה אישית
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-primary/5 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-slate-700">
                  שם פרטי
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  placeholder="ישראל"
                  className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                  טלפון
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="050-000-0000"
                  className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">
                  עיר
                </label>
                <input
                  id="city"
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  placeholder="תל אביב"
                  className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="careType" className="mb-1.5 block text-sm font-medium text-slate-700">
                  סוג טיפול
                </label>
                <select
                  id="careType"
                  required
                  value={form.careType}
                  onChange={(e) => updateField("careType", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">בחרו סוג טיפול</option>
                  {careTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="urgency" className="mb-1.5 block text-sm font-medium text-slate-700">
                  מתי נדרש
                </label>
                <select
                  id="urgency"
                  required
                  value={form.urgency}
                  onChange={(e) => updateField("urgency", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">בחרו מועד</option>
                  {urgencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary mt-6 w-full">
              שלח בקשה עכשיו
              <svg className="h-5 w-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <p className="mt-4 text-center text-xs text-muted">
              בלחיצה על שליחה, הבקשה תישלח אלינו ב-WhatsApp לטיפול מיידי
            </p>
          </form>
        </MotionReveal>
      </div>
    </section>
  );
}
