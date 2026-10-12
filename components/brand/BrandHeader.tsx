"use client";

import { useState } from "react";
import Link from "next/link";
import { PHONE_HREF } from "@/lib/constants";
import { BRAND, CONTACT, PROMISES } from "./content";
import { IconClose, IconMenu, IconPhone } from "./icons";
import { Wordmark } from "./ui";

const HOME_NAV = [
  { href: "#services", label: "שירותים" },
  { href: "/mishpacha-shniya", label: "משפחה שנייה" },
  { href: "#how-it-works", label: "איך זה עובד" },
  { href: "#license", label: "רישיון ופיקוח" },
  { href: "#coverage", label: "אזורי שירות" },
  { href: "#faq", label: "שאלות נפוצות" },
];

export default function BrandHeader({ variant = "home" }: { variant?: "home" | "landing" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = variant === "home";

  return (
    <header className="relative z-40 border-b border-(--nc-line) bg-white lg:sticky lg:top-0">
      <div className="mx-auto flex h-[60px] max-w-[1240px] items-center justify-between gap-3 px-4 lg:h-[84px] lg:px-8">
        <Link href="/" aria-label={`${BRAND.name}, לעמוד הבית`} className="shrink-0">
          <Wordmark />
        </Link>

        {isHome && (
          <nav className="hidden items-center gap-7 text-[15px] font-medium xl:gap-8 lg:flex" aria-label="ניווט ראשי">
            {HOME_NAV.map((item) =>
              item.href.startsWith("/") ? (
                <Link key={item.href} href={item.href} className="text-(--nc-ink) hover:text-(--nc-teal)">
                  {item.label}
                </Link>
              ) : (
                <a key={item.href} href={item.href} className="text-(--nc-ink) hover:text-(--nc-teal)">
                  {item.label}
                </a>
              ),
            )}
          </nav>
        )}

        <div className="hidden items-center gap-5 lg:flex">
          <div className="text-left leading-tight">
            <p className="text-[12px] font-medium text-(--nc-muted)">{PROMISES.human}</p>
            <a href={PHONE_HREF} dir="ltr" className="text-[22px] font-bold tabular-nums text-(--nc-ink)">
              {CONTACT.phone}
            </a>
          </div>
          <a
            href={PHONE_HREF}
            aria-label={`התקשרו: ${CONTACT.phone}`}
            className="flex h-12 items-center gap-2 rounded-[4px] bg-(--nc-teal) px-5 text-[15px] font-semibold text-white hover:bg-(--nc-teal-dark)"
          >
            <IconPhone className="h-[18px] w-[18px]" stroke={1.8} />
            התקשרו
          </a>
        </div>

        {isHome && (
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="brand-mobile-menu"
            aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-(--nc-line) lg:hidden"
          >
            {menuOpen ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        )}
      </div>

      {isHome && menuOpen && (
        <div
          id="brand-mobile-menu"
          className="absolute inset-x-0 top-full border-b border-(--nc-line) bg-white px-4 pb-5 shadow-[0_12px_24px_-12px_rgba(11,31,58,0.25)] lg:hidden"
        >
          <nav className="divide-y divide-(--nc-line)" aria-label="ניווט ראשי">
            {[...HOME_NAV, { href: "#lead-form", label: "השארת פרטים לחזרה" }].map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-[17px] font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-[17px] font-medium"
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
