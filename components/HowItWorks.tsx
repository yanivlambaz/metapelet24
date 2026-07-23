"use client";

import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/MotionReveal";
import { PHONE_HREF } from "@/lib/constants";
import { PhoneIcon } from "@/components/icons";

const steps = [
  {
    number: "1",
    icon: "📞",
    title: "מתקשרים אלינו",
    description: "עונה לכם רכז/ת אנושי/ת — בלי מוקד אוטומטי. מספרים בקצרה מה צריך.",
  },
  {
    number: "2",
    icon: "🔍",
    title: "מתאימים מטפל/ת במהירות",
    description: "צוות ההתאמה בוחר מטפל/ת ישראלי/ת מתאים/ה לפי הצרכים והדחיפות.",
  },
  {
    number: "3",
    icon: "✅",
    title: "מטפל/ת מגיע/ה — עד 5 שעות",
    description: "בדחיפות המטפל/ת מגיע/ה אליכם הביתה, לבית החולים או לכל מקום. 24/7.",
  },
];

export default function HowItWorks() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="section-padding bg-surface">
      <div className="container-main">
        <MotionReveal className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
            תהליך פשוט
          </span>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">איך זה עובד?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            שלושה שלבים פשוטים — מהבקשה ועד לתחילת הטיפול
          </p>
        </MotionReveal>

        <div className="relative mx-auto max-w-4xl">
          {/* Desktop horizontal line */}
          <div
            className="absolute top-10 right-[16%] left-[16%] hidden h-1 rounded-full bg-gradient-to-l from-accent via-primary to-accent md:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 md:grid md:grid-cols-3 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={reducedMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-extrabold text-white shadow-xl shadow-primary/30">
                  {step.number}
                </div>
                <span className="mb-3 text-3xl">{step.icon}</span>
                <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <MotionReveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center gap-3">
            <a href={PHONE_HREF} className="btn-urgent w-full max-w-xs">
              <PhoneIcon className="h-5 w-5" />
              התקשרו עכשיו
            </a>
            <a href="#lead-form" className="text-sm font-semibold text-primary underline underline-offset-4">
              או השאירו פרטים ונחזור אליכם
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
