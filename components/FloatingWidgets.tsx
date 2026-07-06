"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE, PHONE_HREF } from "@/lib/constants";
import { submitLead } from "@/lib/leads/submit-lead";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

function ExitIntentForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<{ state: "idle" | "loading" | "error"; message?: string }>({
    state: "idle",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.info("[leads] form submission started", {
      formType: "popup",
    });

    if (status.state === "loading") return;

    if (!name.trim() || !phone.trim()) {
      setStatus({ state: "error", message: "נא למלא שם וטלפון" });
      return;
    }

    const message = `שלום, התקבלה פנייה חדשה מאתר מטפלת 24.\nשם: ${name}\nטלפון: ${phone}`;
    setStatus({ state: "loading" });

    try {
      await submitLead({
        name,
        phone,
        message,
        formType: "popup",
      });
      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      setDone(true);
      setTimeout(onClose, 2000);
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "שליחת הפרטים נכשלה. נסו שוב בעוד רגע.",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 text-muted hover:text-primary"
          aria-label="סגור"
        >
          ✕
        </button>
        {!done ? (
          <>
            <h3 className="text-xl font-bold text-primary">רגע לפני שאתה עוזב...</h3>
            <p className="mt-2 text-sm text-muted">השאר פרטים ונחזור אליך תוך 30 דקות</p>
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="text"
                required
                placeholder="שם"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-accent"
              />
              <input
                type="tel"
                required
                dir="ltr"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={status.state === "loading"}
                className="btn-urgent w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status.state === "loading" ? "שולח..." : "שלח — נחזור אליך מהר"}
              </button>
              {status.state === "error" && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-700">
                  {status.message}
                </p>
              )}
              <p className="text-center text-xs leading-relaxed text-muted">
                שליחת הטופס מהווה אישור לכך שקראתי את{" "}
                <Link
                  href="/privacy-policy"
                  className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:text-accent"
                >
                  מדיניות הפרטיות
                </Link>{" "}
                ואני מסכים/ה לשימוש במידע בהתאם לאמור בה.
              </p>
            </form>
          </>
        ) : (
          <p className="py-4 text-center font-semibold text-green-600">✓ קיבלנו! ניצור קשר בקרוב</p>
        )}
      </div>
    </div>
  );
}

export default function FloatingWidgets() {
  const [showExit, setShowExit] = useState(false);
  const [exitDismissed, setExitDismissed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (exitDismissed) return;

    const timer = setTimeout(() => setShowExit(true), 30000);
    return () => clearTimeout(timer);
  }, [exitDismissed]);

  function closeExit() {
    setShowExit(false);
    setExitDismissed(true);
  }

  return (
    <>
      <a
        href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-bubble floating-bubble-whatsapp relative max-md:bottom-20 ${
          reducedMotion ? "" : "animate-whatsapp-pulse"
        }`}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-md ring-2 ring-white">
          1
        </span>
      </a>
      <a
        href={PHONE_HREF}
        className="floating-bubble floating-bubble-phone max-md:bottom-20"
        aria-label="התקשר"
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
      {showExit && !exitDismissed && <ExitIntentForm onClose={closeExit} />}
    </>
  );
}
