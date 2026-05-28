"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionReveal from "@/components/MotionReveal";
import { homepageFaqs, type FAQItem } from "@/lib/data/faq";

type FAQProps = {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
};

export default function FAQ({
  items = homepageFaqs,
  title = "כל מה שצריך לדעת על מטפלים פרטיים",
  subtitle = "תשובות לשאלות הנפוצות ביותר על שירותי הטיפול שלנו",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-main">
        <MotionReveal className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            שאלות נפוצות
          </span>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">{subtitle}</p>
        </MotionReveal>

        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((faq, index) => {
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
