"use client";

import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import LiveIndicator from "@/components/LiveIndicator";
import {
  CARE_OPTIONS,
  TIMING_OPTIONS,
  useStepLeadForm,
  type CareOptionId,
} from "@/lib/leads/use-lead-forms";

const careEmoji: Record<CareOptionId, string> = {
  hospital: "🏥",
  night: "🌙",
  home: "🏠",
  surgery: "⚕️",
  elderly: "👴",
  urgent: "🚨",
};

type LeadFormProps = {
  defaultCity?: string;
  defaultCareType?: string;
  compact?: boolean;
};

export default function LeadForm({
  defaultCity = "",
  defaultCareType = "",
  compact = false,
}: LeadFormProps) {
  const {
    step,
    setStep,
    careType,
    timing,
    firstName,
    setFirstName,
    phone,
    setPhone,
    city,
    setCity,
    submitted,
    status,
    chooseCareType,
    chooseTiming,
    handleSubmit,
  } = useStepLeadForm({ defaultCity, defaultCareType });
  const reducedMotion = useReducedMotion();

  const progress = (step / 3) * 100;

  return (
    <section id="lead-form" className={compact ? "py-8" : "section-padding bg-surface"}>
      <div className="container-main">
        <div className="mx-auto max-w-2xl">
          {!compact && (
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <LiveIndicator />
              </div>
              <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
                בקשה מהירה — 3 שלבים
              </span>
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                מעדיפים שנחזור אליכם? השאירו פרטים
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                לשירות המהיר ביותר — התקשרו. בדחיפות מגיעים עד 5 שעות.
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-primary/5 sm:p-8">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-xs font-medium text-muted">
                    <span>שלב {step} מתוך 3</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: reducedMotion ? 0 : 0.4 }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3 }}
                    >
                      <h3 className="mb-4 text-lg font-bold text-primary">במה נוכל לעזור?</h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {CARE_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => chooseCareType(option.label)}
                            className={`rounded-xl border-2 p-4 text-center transition-all hover:border-accent hover:shadow-md ${
                              careType === option.label
                                ? "border-accent bg-accent/5"
                                : "border-slate-200 bg-surface"
                            }`}
                          >
                            <span className="text-2xl">{careEmoji[option.id]}</span>
                            <span className="mt-2 block text-xs font-semibold text-primary sm:text-sm">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3 }}
                    >
                      <h3 className="mb-4 text-lg font-bold text-primary">מתי תזדקק למטפל?</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {TIMING_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => chooseTiming(option)}
                            className={`rounded-xl border-2 px-4 py-4 text-sm font-semibold transition-all hover:border-accent ${
                              timing === option
                                ? "border-accent bg-accent/5 text-primary"
                                : "border-slate-200 bg-surface text-slate-700"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      {!defaultCareType && (
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="mt-4 text-sm text-muted hover:text-primary"
                        >
                          → חזרה
                        </button>
                      )}
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.form
                      key="step3"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: reducedMotion ? 0 : 0.3 }}
                    >
                      <h3 className="mb-4 text-lg font-bold text-primary">פרטי יצירת קשר</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">
                            שם פרטי
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                            מספר טלפון *
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            dir="ltr"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="050-000-0000"
                            className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                        <div>
                          <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
                            עיר
                          </label>
                          <input
                            id="city"
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-surface px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-muted"
                        >
                          חזרה
                        </button>
                        <button
                          type="submit"
                          disabled={status.state === "loading"}
                          className="btn-urgent flex-1 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {status.state === "loading" ? "שולח..." : "מצא לי מטפל עכשיו ←"}
                        </button>
                      </div>
                      {status.state === "error" && (
                        <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-center text-xs font-semibold text-red-700">
                          {status.message}
                        </p>
                      )}
                      <p className="mt-3 text-center text-xs leading-relaxed text-muted">
                        שליחת הטופס מהווה אישור לכך שקראתי את{" "}
                        <Link
                          href="/privacy-policy"
                          className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 hover:text-accent"
                        >
                          מדיניות הפרטיות
                        </Link>{" "}
                        ואני מסכים/ה לשימוש במידע בהתאם לאמור בה.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-primary">קיבלנו! נחזור אליך תוך 30 דקות</h3>
                <p className="mt-2 text-sm text-muted">נפתח גם WhatsApp לטיפול מיידי</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
