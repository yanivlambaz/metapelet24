"use client";

import { motion, useReducedMotion } from "framer-motion";

const badges = [
  {
    emoji: "🏅",
    title: "500+",
    subtitle: "משפחות מרוצות",
    description: "לקוחות שבחרו בנו",
  },
  {
    emoji: "⚡",
    title: "47 דק'",
    subtitle: "זמן תגובה ממוצע",
    description: "התאמה מהירה תוך שעות",
  },
  {
    emoji: "✅",
    title: "ישראלים",
    subtitle: "מטפלים ישראלים בלבד",
    description: "דוברי עברית מלאה",
  },
  {
    emoji: "🔒",
    title: "מאומתים",
    subtitle: "מאומתים ומבוטחים",
    description: "בדיקת רקע מקצועית",
  },
];

export default function TrustBadges() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative z-10 -mt-8 pb-4 sm:-mt-12">
      <div className="container-main">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.subtitle}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-lg shadow-primary/5 sm:p-5"
            >
              <span className="text-2xl">{badge.emoji}</span>
              <p className="mt-2 text-xl font-extrabold text-primary sm:text-2xl">{badge.title}</p>
              <p className="mt-1 text-sm font-bold text-slate-800">{badge.subtitle}</p>
              <p className="mt-0.5 text-xs text-muted">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
