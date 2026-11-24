"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { buildWhatsAppUrl } from "@/lib/constants";
import { submitLead } from "@/lib/leads/submit-lead";
import { trackLeadEvent } from "@/lib/leads/track";

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

export const POPUP_DELAY_MS = 45000;

export type LeadStatus = { state: "idle" | "loading" | "error"; message?: string };

export function phoneDigits(value: string) {
  return value.replace(/[^\d]/g, "");
}

export function isValidPhone(value: string) {
  return /^\d{9,13}$/.test(phoneDigits(value));
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "שליחת הפרטים נכשלה. נסו שוב בעוד רגע.";
}

function openWhatsAppWindow(message: string) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

/** Name + phone lead form (hero, landing, popup, modal, contextual). */
export function useQuickLeadForm({
  formType,
  intro,
  formId,
  city,
  careType,
  openWhatsApp = false,
  onSuccess,
}: {
  formType: string;
  intro: string;
  formId?: string;
  city?: string;
  careType?: string;
  openWhatsApp?: boolean;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<LeadStatus>({ state: "idle" });
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    trackLeadEvent("lead_form_view", { formType, formId });
  }, [formType, formId]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackLeadEvent("lead_form_start", { formType, formId });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.info("[leads] form submission started", { formType });

    if (status.state === "loading") return;

    const trimmedName = name.trim();
    const digits = phoneDigits(phone);

    if (trimmedName.length < 2 || !isValidPhone(digits)) {
      setStatus({ state: "error", message: "נא להזין שם מלא ומספר טלפון תקין" });
      trackLeadEvent("lead_form_error", { formType, formId });
      return;
    }

    const message = [
      intro,
      `שם: ${trimmedName}`,
      `טלפון: ${digits}`,
      careType ? `שירות מבוקש: ${careType}` : "",
      city ? `עיר: ${city}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setWhatsappMessage(message);
    setStatus({ state: "loading" });
    trackLeadEvent("lead_form_submit", { formType, formId });

    try {
      await submitLead({
        name: trimmedName,
        phone: digits,
        city: city || undefined,
        message,
        formType,
      });
      setSubmitted(true);
      setStatus({ state: "idle" });
      trackLeadEvent("lead_form_success", { formType, formId });
      if (openWhatsApp) openWhatsAppWindow(message);
      onSuccess?.();
    } catch (error) {
      setStatus({ state: "error", message: errorMessage(error) });
      trackLeadEvent("lead_form_error", { formType, formId });
    }
  }

  return {
    name,
    setName: (value: string) => {
      markStarted();
      setName(value);
    },
    phone,
    setPhone: (value: string) => {
      markStarted();
      setPhone(value);
    },
    submitted,
    status,
    handleSubmit,
    whatsappMessage,
  };
}

/** Three-step lead form kept for compatibility; prefer QuickLeadForm for conversion. */
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

    console.info("[leads] form submission started", { formType, step });

    if (status.state === "loading") return;

    const digits = phoneDigits(phone);
    if (firstName.trim().length < 2 || !isValidPhone(digits) || !city.trim()) {
      setStatus({ state: "error", message: "נא למלא שם, טלפון ועיר" });
      return;
    }

    const message = buildMessage();
    setStatus({ state: "loading" });
    trackLeadEvent("lead_form_submit", { formType });

    try {
      await submitLead({
        name: firstName.trim(),
        phone: digits,
        city: city.trim(),
        message,
        formType,
      });
      setSubmitted(true);
      trackLeadEvent("lead_form_success", { formType });
    } catch (error) {
      setStatus({ state: "error", message: errorMessage(error) });
      trackLeadEvent("lead_form_error", { formType });
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
