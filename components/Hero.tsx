"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/lib/constants";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";
import LiveIndicator from "@/components/LiveIndicator";
import PulsingDot from "@/components/PulsingDot";

const HERO_IMAGE = "/hero-caregiver.png";

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="hero-premium relative overflow-hidden text-white">
      {/* Diagonal decorative shape */}
      <div
        className="pointer-events-none absolute -left-32 top-0 hidden h-full w-1/2 skew-x-[-12deg] bg-white/5 lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rotate-12 rounded-[3rem] bg-accent/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="container-main relative px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT — content */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-green-400/40 bg-green-500/20 px-4 py-2 text-sm font-semibold"
            >
              <PulsingDot size="md" />
              מטפל/ת ישראלי/ת בבית — עד 5 שעות בדחיפות
            </motion.div>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              צריכים מטפל/ת בדחיפות?{" "}
              <span className="gradient-text">אנחנו כאן בשבילכם</span>
            </motion.h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg lg:mx-0"
            >
              מענה אנושי מיידי • מטפלים ומטפלות ישראלים • הגעה עד 5 שעות לבית
              החולים או לבית הלקוח
            </motion.p>

            {/* CTA — call first */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
            >
              <a href={PHONE_HREF} className="btn-urgent w-full text-base sm:w-auto">
                <PhoneIcon className="h-5 w-5" />
                התקשרו עכשיו — <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                שלחו WhatsApp
              </a>
            </motion.div>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-3 text-center text-sm text-blue-100 lg:text-right"
            >
              או{" "}
              <a href="#lead-form" className="font-semibold text-white underline underline-offset-4">
                השאירו פרטים ונחזור אליכם
              </a>
            </motion.p>

            {/* Trust row at the decision point */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-blue-100 lg:justify-start"
            >
              <span className="inline-flex items-center gap-1.5">🛡️ רישיון משרד העבודה 3203</span>
              <span className="inline-flex items-center gap-1.5">🇮🇱 מטפלים ישראלים</span>
              <span className="inline-flex items-center gap-1.5">👤 מענה אנושי אמיתי</span>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex justify-center lg:justify-start"
            >
              <LiveIndicator />
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto mt-8 w-full max-w-xs lg:mt-0 lg:max-w-none"
          >
            {/* Mobile: dedicated crop (faces + hands). Desktop: full portrait. */}
            <div className="relative aspect-[8/7] overflow-hidden rounded-2xl border border-white/20 shadow-xl lg:aspect-[5/6]">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="/hero-caregiver-mobile.jpg"
                  type="image/jpeg"
                />
                <img
                  src={HERO_IMAGE}
                  alt="מטפלת ישראלית מחזיקה ידיים של קשיש ומחייכת אליו"
                  width={600}
                  height={750}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full rounded-2xl object-cover object-center"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D6B]/25 via-transparent to-transparent lg:from-[#0F2D6B]/60" />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md lg:block">
              <p className="text-sm font-bold">✓ מטפלים מאומתים</p>
              <p className="text-xs text-blue-100">מענה אנושי 24/7</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
