"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  applyConsent,
  ConsentPreferences,
  OPEN_COOKIE_SETTINGS_EVENT,
  readStoredConsent,
  saveConsent,
} from "@/lib/consent";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12l1.8 1.8 3.2-3.6" />
    </svg>
  );
}

const legalLinks = [
  { href: "/privacy-policy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

type CategoryRowProps = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

function CategoryRow({ id, title, description, checked, disabled, onChange }: CategoryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-surface px-4 py-3">
      <div>
        <label htmlFor={id} className="text-sm font-bold text-slate-800">
          {title}
        </label>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">{description}</p>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-primary disabled:opacity-60"
      />
    </div>
  );
}

function SettingsDialog({
  initial,
  onSave,
  onClose,
}: {
  initial: ConsentPreferences;
  onSave: (prefs: ConsentPreferences) => void;
  onClose: () => void;
}) {
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [marketing, setMarketing] = useState(initial.marketing);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

    focusables()[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-settings-title"
        dir="rtl"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id="cookie-settings-title" className="text-lg font-bold text-primary">
            הגדרות עוגיות
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="סגור"
            className="rounded-lg p-1 text-muted transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <CategoryRow
            id="cookie-cat-necessary"
            title="עוגיות הכרחיות"
            description="נדרשות להפעלה תקינה של האתר, לרבות שמירת העדפות העוגיות שלך. פעילות תמיד."
            checked
            disabled
          />
          <CategoryRow
            id="cookie-cat-analytics"
            title="עוגיות אנליטיקה"
            description="עוזרות לנו להבין כיצד משתמשים באתר ולשפר את הביצועים והתוכן."
            checked={analytics}
            onChange={setAnalytics}
          />
          <CategoryRow
            id="cookie-cat-marketing"
            title="עוגיות שיווק"
            description="משמשות למדידת קמפיינים ולהתאמת פרסום, ככל שמופעלות באתר."
            checked={marketing}
            onChange={setMarketing}
          />
        </div>

        <button
          type="button"
          onClick={() => onSave({ analytics, marketing })}
          className="mt-5 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#164070] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          שמור העדפות
        </button>
      </div>
    </div>
  );
}

export default function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [current, setCurrent] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Deferred so first paint isn't blocked and the sync-setState lint rule is respected.
    const timer = setTimeout(() => {
      const stored = readStoredConsent();
      if (stored) {
        setCurrent(stored.preferences);
      } else {
        setBannerVisible(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function onOpenSettings() {
      const stored = readStoredConsent();
      if (stored) setCurrent(stored.preferences);
      setBannerVisible(false);
      setSettingsOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const decide = useCallback((prefs: ConsentPreferences) => {
    saveConsent(prefs);
    applyConsent(prefs);
    setCurrent(prefs);
    setBannerVisible(false);
    setSettingsOpen(false);
  }, []);

  if (!bannerVisible && !settingsOpen) return null;

  return (
    <>
      {bannerVisible && (
        <div
          dir="rtl"
          role="region"
          aria-label="הודעת עוגיות"
          className="fixed inset-x-3 bottom-[148px] z-[80] mx-auto max-w-[640px] rounded-xl border border-slate-200 bg-white/95 p-2.5 shadow-xl shadow-slate-900/10 backdrop-blur-sm sm:p-3 md:bottom-[104px] lg:bottom-5"
        >
          <div className="flex items-start gap-2.5">
            <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-primary sm:text-sm">אנו מכבדים את פרטיותך</p>
              <p className="mt-0.5 overflow-hidden text-[11px] leading-snug text-slate-600 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] sm:text-xs sm:[-webkit-line-clamp:unset] sm:[display:block]">
                אנו משתמשים בעוגיות הכרחיות להפעלת האתר, וכן — בכפוף להסכמתך — בעוגיות לניתוח
                השימוש באתר ולשיפור חוויית המשתמש. ניתן לשנות את העדפותיך בכל עת.
              </p>
              <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] sm:text-xs">
                {legalLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </p>
            </div>
          </div>
          <div className="mt-1.5 grid grid-cols-3 items-center gap-1.5 sm:mt-2 sm:flex sm:flex-wrap sm:gap-2">
            <button
              type="button"
              onClick={() => decide({ analytics: true, marketing: true })}
              className="min-h-9 rounded-lg bg-primary px-2.5 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-[#164070] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:py-2 sm:text-sm"
            >
              קבל הכל
            </button>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="min-h-9 rounded-lg border border-slate-300 px-2 py-1.5 text-[11px] font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:py-2 sm:text-sm"
            >
              הגדרות עוגיות
            </button>
            <button
              type="button"
              onClick={() => decide({ analytics: false, marketing: false })}
              className="min-h-9 rounded-lg px-1 py-1.5 text-[11px] font-semibold text-slate-500 transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:py-2 sm:text-sm"
            >
              דחה לא-הכרחיות
            </button>
          </div>
        </div>
      )}

      {settingsOpen && (
        <SettingsDialog
          initial={current}
          onSave={decide}
          onClose={() => {
            setSettingsOpen(false);
            if (!readStoredConsent()) setBannerVisible(true);
          }}
        />
      )}
    </>
  );
}
