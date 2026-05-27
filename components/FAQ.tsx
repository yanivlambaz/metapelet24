"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionReveal from "@/components/MotionReveal";

const faqs = [
  {
    question: "מה זה מטפל/ת פרטי/ת ומתי צריך אחד/ת?",
    answer:
      "מטפל/ת פרטי/ת הוא/היא איש מקצוע שמספק/ת טיפול אישי וצמוד — בבית, בבית החולים או אחרי ניתוח. מומלץ כשיש צורך בהשגחה רציפה, עזרה בפעולות יומיומיות, ליווי רפואי או כשבני המשפחה אינם יכולים להיות נוכחים.",
  },
  {
    question: "כמה מהר אפשר למצוא מטפל/ת?",
    answer:
      "במטפלת 24 אנחנו מתאימים מטפל/ת תוך שעות — ובמצבים דחופים גם באותו היום. לאחר מילוי בקשה קצרה, צוות ההתאמה שלנו יצור איתכם קשר מיד ויציע מטפל/ת מתאים/ה.",
  },
  {
    question: "האם המטפלים הם ישראלים ודוברי עברית?",
    answer:
      "כן. כל המטפלים בפלטפורמה שלנו הם ישראלים, דוברי עברית, עם ניסיון מוכח בתחום. אנחנו מוודאים התאמה תרבותית ושפתית מלאה לנוחות המטופל/ת ולמשפחה.",
  },
  {
    question: "מה ההבדל בין מטפל/ת לבית חולים לבין מטפל/ת בבית?",
    answer:
      "מטפל/ת לבית חולים מלווה/ה את המטופל/ת במהלך שהותו/ה בבית החולים — השגחה, עזרה בסיסית ותקשורת עם הצוות הרפואי. מטפל/ת בבית מספק/ת טיפול שוטף בבית המטופל/ת — ארוחות, היגיינה, תרופות, ליווי ועוד.",
  },
  {
    question: "האם השירות זמין 24 שעות ביממה?",
    answer:
      "בהחלט. מטפלת 24 פועלת סביב השעון — 24/7, כולל לילות, סופי שבוע וחגים. ניתן לבקש מטפל/ת ללילה, לשבועות או לתקופה ארוכה יותר.",
  },
  {
    question: "כמה עולה שירות מטפל/ת פרטי/ת?",
    answer:
      "המחיר משתנה לפי סוג הטיפול, משך השהות, מיקום ורמת הדחיפות. לאחר מילוי הבקשה, נספק הצעת מחיר שקופה ומותאמת — ללא התחייבות.",
  },
  {
    question: "האם אפשר להחליף מטפל/ת אם אין התאמה?",
    answer:
      "כן, בהחלט. שביעות הרצון שלכם חשובה לנו. אם המטפל/ת אינו/ה מתאים/ה, נחליף/החליף במהירות ללא עלות נוספת.",
  },
  {
    question: "באילו אזורים בארץ אתם פועלים?",
    answer:
      "אנחנו פועלים בכל רחבי ישראל — מתל אביב ומרכז, ירושלים, חיפה, באר שבע ועד יישובים קטנים. מלאו את העיר בטופס ונמצא מטפל/ת באזורכם.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-main">
        <MotionReveal className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            שאלות נפוצות
          </span>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            כל מה שצריך לדעת על מטפלים פרטיים
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            תשובות לשאלות הנפוצות ביותר על שירותי הטיפול שלנו
          </p>
        </MotionReveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <MotionReveal key={faq.question} delay={index * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-surface transition-colors hover:border-accent/30">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-primary sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen ? "bg-accent text-white" : "bg-primary/10 text-primary"
                      }`}
                    >
                      <svg
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <p className="border-t border-slate-200/80 px-5 py-4 text-sm leading-relaxed text-muted sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
