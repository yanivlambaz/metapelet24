"use client";

import { openCookieSettings } from "@/lib/consent";

export default function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      העדפות עוגיות
    </button>
  );
}
