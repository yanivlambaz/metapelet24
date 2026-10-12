"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { submitLead } from "@/lib/leads/submit-lead";
import { buildWhatsAppUrl } from "@/lib/constants";
import { IconCheck } from "./icons";
import { SECOND_FAMILY_CRM_INTRO, SECOND_FAMILY_FORM_TYPE, SECOND_FAMILY_WHATSAPP } from "./second-family-copy";

const FIELD =
  "h-12 w-full rounded-[4px] border border-(--nc-line) bg-white px-3.5 text-[16px] text-(--nc-ink) outline-none focus:border-(--nc-teal) focus:ring-2 focus:ring-(--nc-teal)/20";

export default function SecondFamilyForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) return;

    const trimmedName = name.trim();
    const digits = phone.replace(/[^\d]/g, "");
    const trimmedCity = city.trim();

    if (trimmedName.length < 2 || !/^\d{9,13}$/.test(digits)) {
      setError("נא להזין שם וטלפון תקינים");
      return;
    }

    const message = [SECOND_FAMILY_CRM_INTRO, `שם: ${trimmedName}`, `טלפון: ${digits}`, trimmedCity ? `עיר: ${trimmedCity}` : ""]
      .filter(Boolean)
      .join("\n");

    setLoading(true);
    setError("");

    try {
      await submitLead({
        name: trimmedName,
        phone: digits,
        city: trimmedCity || undefined,
        message,
        formType: SECOND_FAMILY_FORM_TYPE,
      });
      setSubmitted(true);
      window.open(buildWhatsAppUrl(SECOND_FAMILY_WHATSAPP), "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "שליחת הפרטים נכשלה. נסו שוב בעוד רגע.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div id="sf-lead-form" role="status" className="border-r-[3px] border-(--nc-teal) bg-(--sf-sage) px-4 py-3.5">
        <p className="flex items-center gap-2 text-[16px] font-bold">
          <IconCheck className="h-5 w-5 text-(--nc-teal)" stroke={2.2} />
          קיבלנו את הפרטים. נחזור אליכם לגבי משפחה שנייה.
        </p>
        <p className="mt-1 text-[14px] text-(--nc-muted)">נפתחה גם שיחת WhatsApp, אם תרצו להוסיף פרטים.</p>
      </div>
    );
  }

  return (
    <form id="sf-lead-form" onSubmit={handleSubmit} dir="rtl" noValidate>
      <div className="grid gap-3">
        <div>
          <label htmlFor="sf-name" className="mb-1 block text-[14px] font-medium">
            שם מלא
          </label>
          <input id="sf-name" name="name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={FIELD} />
        </div>
        <div>
          <label htmlFor="sf-phone" className="mb-1 block text-[14px] font-medium">
            טלפון
          </label>
          <input
            id="sf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${FIELD} text-right`}
          />
        </div>
        <div>
          <label htmlFor="sf-city" className="mb-1 block text-[14px] font-medium">
            עיר <span className="font-normal text-(--nc-muted)">(לא חובה)</span>
          </label>
          <input id="sf-city" name="city" type="text" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} className={FIELD} />
        </div>
        <button type="submit" disabled={loading} className="h-14 w-full rounded-[4px] bg-(--nc-teal) text-[17px] font-semibold text-white hover:bg-(--nc-teal-dark) disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "שולח..." : "חזרו אליי לגבי ההורים"}
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
