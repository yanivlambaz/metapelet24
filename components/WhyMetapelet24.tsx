"use client";

import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/MotionReveal";

const WHY_US_IMAGE =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&q=80";

const benefits = [
  "מטפלים ישראלים דוברי עברית בלבד",
  "אימות מקצועי ובדיקת רקע לכל מטפל",
  "התאמה אישית לפי צרכים ספציפיים",
  "זמינות מלאה 24 שעות 7 ימים בשבוע",
  "ביטוח מקצועי מלא לכל מטפל",
];

export default function WhyMetapelet24() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="why-us" className="section-padding bg-white">
      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <MotionReveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={WHY_US_IMAGE}
                alt="מטפלת ישראלית מחייכת בבגדי עבודה"
                width={500}
                height={625}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D6B]/40 to-transparent" />
            </div>
          </MotionReveal>

          <div className="order-1 lg:order-2">
            <MotionReveal>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                למה אנחנו?
              </span>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                למה מטפלת 24?
              </h2>
              <p className="mt-4 text-muted">
                הפלטפורמה המובילה בישראל להתאמה מהירה של מטפלים פרטיים — מקצועיים, אמינים וזמינים.
              </p>
            </MotionReveal>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={reducedMotion ? false : { opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-surface px-4 py-3.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-slate-800 sm:text-base">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
