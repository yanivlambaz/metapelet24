"use client";

import { FormEvent, useEffect, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/constants";
import { submitLead } from "@/lib/leads/submit-lead";

/** CRM-facing message intros. Changing these changes what the CRM and WhatsApp receive. */
export const LEAD_MESSAGE_INTRO = {
  site: "שלום, התקבלה פנייה חדשה מאתר המרכז הארצי לשירותי מטפלים.",
  landingPage: "שלום, התקבלה פנייה חדשה מדף נחיתה — המרכז הארצי לשירותי מטפלים.",
} as const;

/** `label` is sent to the CRM as "שירות מבוקש". */
export const CARE_OPTIONS = [
  { id: "hospital", label: "מטפל לבית חולים" },
  { id: "night", label: "מטפלת ללילה" },
  { id: "home", label: "מטפל לבית" },
  { id: "surgery", label: "אחרי ניתוח" },
  { id: "elderly", label: "טיפול בקשיש" },
  { id: "urgent", label: "דחוף עכשיו" },
] as const;

export type CareOptionId = (typeof CARE_OPTIONS)[number]["id"];

export const TIMING_OPTIONS = ["היום", "מחר", "השבוע", "תאריך אחר"] as const;

export const POPUP_DELAY_MS = 30000;

export type LeadStatus = { state: "idle" | "loading" | "error"; message?: string };

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "שליחת הפרטים נכשלה. נסו שוב בעוד רגע.";
}

function openWhatsApp(message: string) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

/** Name + phone lead form (landing page forms and the callback popup). */
export function useQuickLeadForm({
  formType,
  intro,
  onSuccess,
}: {
  formType: string;
  intro: string;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<LeadStatus>({ state: "idle" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.info("[leads] form submission started", {
      formType,
    });

    if (status.state === "loading") return;

    if (!name.trim() || !phone.trim()) {
      setStatus({ state: "error", message: "נא למלא שם וטלפון" });
      return;
    }

    const message = [intro, `שם: ${name}`, `טלפון: ${phone}`].join("\n");

    setStatus({ state: "loading" });

    try {
      await submitLead({
        name,
        phone,
        message,
        formType,
      });
      setSubmitted(true);
      openWhatsApp(message);
      onSuccess?.();
    } catch (error) {
      setStatus({ state: "error", message: errorMessage(error) });
    }
  }

  return { name, setName, phone, setPhone, submitted, status, handleSubmit };
}

/** Three-step lead form: care type → timing → contact details (homepage, service and city pages). */
export function useStepLeadForm({
  defaultCity = "",
  defaultCareType = "",
}: {
  defaultCity?: string;
  defaultCareType?: string;
}) {
  const [step, setStep] = useState(defaultCareType ? 2 : 1);
  const [careType, setCareType] = useState(defaultCareType);
  const [timing, setTiming] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(defaultCity);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<LeadStatus>({ state: "idle" });

  function buildMessage() {
    return [
      LEAD_MESSAGE_INTRO.site,
      firstName ? `שם: ${firstName}` : "",
      phone ? `טלפון: ${phone}` : "",
      careType ? `שירות מבוקש: ${careType}` : "",
      timing ? `מתי נדרש: ${timing}` : "",
      city ? `עיר: ${city}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function getFormType() {
    if (defaultCareType) return "service";
    if (defaultCity) return "city";
    return "homepage";
  }

  function chooseCareType(label: string) {
    setCareType(label);
    setStep(2);
  }

  function chooseTiming(option: string) {
    setTiming(option);
    setStep(3);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formType = getFormType();

    console.info("[leads] form submission started", {
      formType,
      step,
    });

    if (status.state === "loading") return;

    if (!firstName.trim() || !phone.trim() || !city.trim()) {
      setStatus({ state: "error", message: "נא למלא שם, טלפון ועיר" });
      return;
    }

    const message = buildMessage();
    setStatus({ state: "loading" });

    try {
      await submitLead({
        name: firstName,
        phone,
        city,
        message,
        formType,
      });
      setSubmitted(true);
      openWhatsApp(message);
    } catch (error) {
      setStatus({ state: "error", message: errorMessage(error) });
    }
  }

  return {
    step,
    setStep,
    careType,
    timing,
    firstName,
    setFirstName,
    phone,
    setPhone,
    city,
    setCity,
    submitted,
    status,
    chooseCareType,
    chooseTiming,
    handleSubmit,
  };
}

/** Opens once after `delayMs`; closing dismisses it for the rest of the page view. */
export function useTimedPopup(delayMs = POPUP_DELAY_MS) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [dismissed, delayMs]);

  function close() {
    setOpen(false);
    setDismissed(true);
  }

  return { open: open && !dismissed, close };
}
