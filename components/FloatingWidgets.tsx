"use client";

import { FormEvent, useEffect, useState } from "react";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE, PHONE_HREF, WHATSAPP_HREF } from "@/lib/constants";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

function ExitIntentForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(
      buildWhatsAppUrl(`שלום, השארתי פרטים באתר.\nשם: ${name}\nטלפון: ${phone}`),
      "_blank",
      "noopener,noreferrer"
    );
    setDone(true);
    setTimeout(onClose, 2000);
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
              <button type="submit" className="btn-urgent w-full">
                שלח — נחזור אליך מהר
              </button>
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
        href={`${WHATSAPP_HREF}?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-bubble floating-bubble-whatsapp animate-pulse-soft max-md:bottom-20"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <a
        href={PHONE_HREF}
        className="floating-bubble floating-bubble-phone animate-pulse-soft max-md:bottom-20"
        aria-label="התקשר"
      >
        <PhoneIcon className="h-6 w-6" />
      </a>
      {showExit && !exitDismissed && <ExitIntentForm onClose={closeExit} />}
    </>
  );
}
