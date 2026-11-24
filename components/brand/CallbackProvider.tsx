"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { LEAD_MESSAGE_INTRO } from "@/lib/leads/use-lead-forms";
import { trackLeadEvent } from "@/lib/leads/track";
import { IconClose } from "./icons";
import { QuickLeadForm } from "./lead-forms";

export type CallbackOpenOptions = {
  formType: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  intro?: string;
  city?: string;
  careType?: string;
};

type CallbackContextValue = {
  open: (options: CallbackOpenOptions) => void;
  close: () => void;
  isOpen: boolean;
};

const CallbackContext = createContext<CallbackContextValue | null>(null);

export function useCallbackModal() {
  const ctx = useContext(CallbackContext);
  if (!ctx) {
    throw new Error("useCallbackModal must be used within CallbackProvider");
  }
  return ctx;
}

/** Safe optional hook for chrome that may render outside the provider in tests. */
export function useOptionalCallbackModal() {
  return useContext(CallbackContext);
}

export function CallbackProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<CallbackOpenOptions | null>(null);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOptions(null), []);
  const open = useCallback((next: CallbackOpenOptions) => {
    setOptions(next);
    trackLeadEvent("callback_modal_open", { formType: next.formType });
  }, []);

  useEffect(() => {
    if (!options) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.callbackOpen = "true";
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    /** Keep the sheet inside the visible viewport when the mobile keyboard opens. */
    function onViewport() {
      const vv = window.visualViewport;
      if (!vv || !panelRef.current) return;
      const inset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      panelRef.current.style.setProperty("--nc-keyboard-inset", `${inset}px`);
    }

    onViewport();
    window.visualViewport?.addEventListener("resize", onViewport);
    window.visualViewport?.addEventListener("scroll", onViewport);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      delete document.documentElement.dataset.callbackOpen;
      window.visualViewport?.removeEventListener("resize", onViewport);
      window.visualViewport?.removeEventListener("scroll", onViewport);
      window.removeEventListener("keydown", onKey);
    };
  }, [options, close]);

  const value = useMemo(() => ({ open, close, isOpen: Boolean(options) }), [open, close, options]);

  return (
    <CallbackContext.Provider value={value}>
      {children}
      {options ? (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-(--nc-ink)/55 p-0 sm:items-center sm:p-4"
          style={{ paddingBottom: "var(--nc-keyboard-inset, 0px)" }}
        >
          <button type="button" className="absolute inset-0 cursor-default" aria-label="סגירת חלון" onClick={close} />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[1] flex max-h-[min(88dvh,640px)] w-full max-w-md flex-col overflow-hidden rounded-t-[8px] bg-white shadow-2xl sm:rounded-[4px]"
            style={{ marginBottom: "var(--nc-keyboard-inset, 0px)" }}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-(--nc-line) px-5 py-4 sm:px-6">
              <div className="min-w-0 pl-2">
                <h2 id={titleId} className="text-[20px] font-bold leading-tight sm:text-[21px]">
                  {options.heading || "השאירו פרטים ונחזור אליכם"}
                </h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-(--nc-muted) sm:text-[15px]">
                  {options.description ||
                    "רכז שירות אנושי יחזור אליכם כדי להבין את הצורך ולסייע בהתאמת מטפל או מטפלת."}
                </p>
                <p className="mt-2 text-[13px] font-medium text-(--nc-teal)">שיחה ראשונית ללא התחייבות</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="סגירה"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] text-(--nc-muted) hover:bg-(--nc-stone) hover:text-(--nc-ink)"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <div
              className="overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5"
              style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
            >
              <QuickLeadForm
                formId={`callback-modal-${options.formType}`}
                formType={options.formType}
                intro={options.intro || LEAD_MESSAGE_INTRO.site}
                buttonLabel={options.buttonLabel || "חזרו אליי"}
                city={options.city}
                careType={options.careType}
                openWhatsApp={false}
                onSuccess={() => setTimeout(close, 2200)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </CallbackContext.Provider>
  );
}
