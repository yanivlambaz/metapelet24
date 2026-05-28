"use client";

import { useState } from "react";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_NAME,
} from "@/lib/constants";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";

const navLinks = [
  { href: "#services", label: "שירותים" },
  { href: "#how-it-works", label: "איך זה עובד" },
  { href: "#lead-form", label: "בקשת מטפל" },
  { href: "#faq", label: "שאלות נפוצות" },
];

type HeaderProps = {
  homeHref?: string;
};

export default function Header({ homeHref = "/" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-[36px] z-50 border-b border-slate-200/60 bg-white/95 backdrop-blur-md">
      <div className="container-main flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href={homeHref} className="group flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-md shadow-primary/25">
            24
          </span>
          <div className="leading-tight">
            <span className="block text-lg font-bold text-primary">{SITE_NAME}</span>
            <span className="hidden text-xs font-semibold text-[#DC2626] sm:block">זמינות מיידית</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="ניווט ראשי">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-1.5 rounded-lg border border-primary/20 px-2.5 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/5 md:px-3"
            aria-label={`התקשר ${PHONE_DISPLAY}`}
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            <span dir="ltr" className="hidden md:inline">{PHONE_DISPLAY}</span>
          </a>

          <a
            href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !px-3 !py-2.5 !text-sm max-sm:!px-2.5"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="hidden sm:inline">שלח הודעה</span>
          </a>

          <a href="#lead-form" className="btn-urgent !px-3 !py-2.5 !text-sm max-sm:hidden sm:inline-flex">
            מצא מטפל עכשיו
          </a>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="תפריט"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-surface"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#lead-form" className="btn-urgent w-full !text-sm" onClick={() => setMenuOpen(false)}>
              מצא מטפל עכשיו
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
