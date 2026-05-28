"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_HREF,
} from "@/lib/constants";
import { WhatsAppIcon, CheckBadgeIcon, ShieldIcon, BoltIcon, FlagIcon } from "@/components/icons";

const socialProofBar = [
  "500+ משפחות מרוצות",
  "זמין 24/7",
  "מטפלים ישראלים בלבד",
];

const trustBadges = [
  { icon: CheckBadgeIcon, label: "מטפלים מאומתים" },
  { icon: ShieldIcon, label: "ביטוח מלא" },
  { icon: BoltIcon, label: "זמינות מיידית" },
  { icon: FlagIcon, label: "ישראלים בלבד" },
];

function ResponseTimeCounter() {
  const [minutes, setMinutes] = useState(47);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const interval = setInterval(() => {
      setMinutes((m) => {
        const next = m + (Math.random() > 0.5 ? 1 : -1);
        return Math.max(35, Math.min(55, next));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <span className="font-bold text-accent">
      {minutes} דקות
    </span>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="hero-animated relative overflow-hidden text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="container-main section-padding relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/15 px-4 py-2 text-sm font-semibold"
          >
            <span>🟢</span>
            3 מטפלים זמינים עכשיו באזורך
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm"
          >
            ממוצע זמן תגובה: <ResponseTimeCounter />
          </motion.div>

          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            מטפלים פרטיים ישראלים{" "}
            <span className="gradient-text">בזמינות מיידית 24/7</span>
          </motion.h1>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-blue-100 sm:text-base"
          >
            {socialProofBar.map((item, i) => (
              <span key={item} className="flex items-center gap-1.5">
                {i > 0 && <span className="hidden text-white/30 sm:inline">|</span>}
                <span className="text-accent">✓</span> {item}
              </span>
            ))}
          </motion.p>

          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg"
          >
            התאמה מהירה של מטפל מקצועי לבית, בית חולים ומצבים דחופים
          </motion.p>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <a href="#lead-form" className="btn-urgent w-full sm:w-auto">
              מצא מטפל עכשיו
            </a>
            <a
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              שלח WhatsApp
            </a>
            <a href={PHONE_HREF} className="btn-outline hidden sm:inline-flex">
              התקשר עכשיו
            </a>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-sm"
              >
                <Icon className="h-6 w-6 text-accent" />
                <span className="text-xs font-semibold text-blue-50 sm:text-sm">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
