"use client";

import { PHONE_HREF } from "@/lib/constants";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-primary p-3 shadow-2xl shadow-primary/30 md:hidden">
      <a
        href={PHONE_HREF}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-primary transition-transform active:scale-[0.98]"
      >
        <PhoneIcon className="h-5 w-5 animate-pulse text-accent" />
        צריך מטפל בדחיפות? התקשר עכשיו
      </a>
    </div>
  );
}
