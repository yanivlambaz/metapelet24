"use client";

import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/MotionReveal";
import AnimatedCounter from "@/components/AnimatedCounter";

const testimonials = [
  {
    quote: "קיבלנו מטפלת מצוינת תוך 3 שעות לאמא שלי אחרי הניתוח. שירות מדהים!",
    author: "רחל כ.",
    city: "תל אביב",
    initials: "רכ",
    color: "from-primary to-accent",
  },
  {
    quote: "התקשרתי בחצות וכבר בבוקר היה לנו מטפל. לא האמנתי שזה אפשרי.",
    author: "דוד מ.",
    city: "ירושלים",
    initials: "דמ",
    color: "from-[#0F2D6B] to-primary",
  },
  {
    quote: "מטפלת ישראלית מקצועית, סבלנית ואמינה. ממליצה בחום לכל אחד.",
    author: "מירי ש.",
    city: "חיפה",
    initials: "מש",
    color: "from-accent to-[#0284c7]",
  },
];

export default function SocialProof() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-padding bg-surface" aria-label="המלצות לקוחות">
      <div className="container-main">
        <MotionReveal className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            לקוחות מרוצים
          </span>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">מה הלקוחות שלנו אומרים</h2>
          <p className="mt-3 text-muted">
            <AnimatedCounter end={500} suffix="+ משפחות כבר בחרו בנו" />
          </p>
        </MotionReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.author}
              initial={reducedMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative rounded-2xl bg-white p-6 shadow-lg shadow-primary/5"
            >
              <span
                className="absolute top-4 left-5 text-6xl leading-none font-serif text-primary/10 select-none"
                aria-hidden="true"
              >
                "
              </span>

              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-sm font-bold text-white shadow-md`}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="font-bold text-primary">{item.author}</p>
                  <p className="text-xs text-muted">{item.city}</p>
                </div>
              </div>

              <div className="mb-3 text-amber-400 text-sm tracking-wider" aria-label="5 כוכבים">
                ★★★★★
              </div>

              <p className="relative text-sm leading-relaxed text-slate-700 sm:text-base">
                {item.quote}
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
