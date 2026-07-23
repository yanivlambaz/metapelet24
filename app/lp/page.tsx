import type { Metadata } from "next";
import Link from "next/link";
import LpHeader from "@/components/lp/LpHeader";
import LpFooter from "@/components/lp/LpFooter";
import LpStickyBar from "@/components/lp/LpStickyBar";
import LpCtaButtons from "@/components/lp/LpCtaButtons";
import LpLeadForm from "@/components/lp/LpLeadForm";
import FloatingWidgets from "@/components/FloatingWidgets";
import { LICENSE_URL } from "@/components/LicenseBanner";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "מטפלת סיעודית בדחיפות — מטפלת 24",
  description:
    "מטפלת 24 פועלת ברישיון ומפוקחת על ידי משרד העבודה. במקרים דחופים ניתן לקבל מטפל/ת בבית בתוך עד 5 שעות.",
  alternates: {
    canonical: `${SITE_URL}/lp`,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "מטפלת סיעודית בדחיפות — מטפלת 24",
    description:
      "מטפלת 24 פועלת ברישיון ומפוקחת על ידי משרד העבודה. במקרים דחופים ניתן לקבל מטפל/ת בבית בתוך עד 5 שעות.",
    locale: "he_IL",
    url: `${SITE_URL}/lp`,
  },
};

const valuePoints = [
  { icon: "⚡", text: "עד 5 שעות במקרים דחופים" },
  { icon: "🇮🇱", text: "מטפלים ומטפלות ישראלים" },
  { icon: "🪪", text: "חברה בעלת רישיון ומפוקחת" },
  { icon: "💰", text: "מחירים הוגנים ושקופים" },
];

const services = [
  { icon: "⚕️", title: "מטפלת לאחר ניתוח", desc: "ליווי והשגחה בימים הראשונים." },
  { icon: "👴", title: "מטפלת לקשיש", desc: "טיפול אישי ומכבד בבית." },
  { icon: "🏠", title: "השגחה בבית", desc: "עזרה יומיומית למשפחה." },
  { icon: "🏥", title: "ליווי בבית חולים", desc: "נוכחות מקצועית ליד המטופל." },
  { icon: "🌙", title: "מטפלת ללילה", desc: "שקט וביטחון בשעות הלילה." },
  { icon: "🚨", title: "עזרה מיידית למשפחה", desc: "כשצריך מענה דחוף — אנחנו כאן." },
];

const steps = [
  { num: "1", text: "משאירים פרטים או מתקשרים", short: "משאירים פרטים" },
  { num: "2", text: "מספרים לנו מה אתם צריכים", short: "מדברים איתנו" },
  {
    num: "3",
    text: "אנחנו מסייעים במציאת מטפל/ת מתאים/ה",
    short: "מקבלים התאמה",
    urgent: true,
  },
];

const faqs = [
  {
    q: "האם החברה פועלת ברישיון?",
    a: "כן. מטפלת 24 פועלת ברישיון ומפוקחת על ידי משרד העבודה. ניתן לצפות ברישיון החברה בקישור הממשלתי באתר.",
  },
  {
    q: "תוך כמה זמן ניתן לקבל מטפל/ת?",
    a: "במקרים דחופים ניתן לקבל מטפל/ת בבית בתוך עד 5 שעות. נחזור אליכם בהקדם לאחר כל פנייה.",
  },
  {
    q: "באילו אזורים אתם נותנים שירות?",
    a: "אנו מסייעים למשפחות בכל רחבי הארץ — ערים, יישובים ומושבים.",
  },
  {
    q: "האם אפשר לדבר עם נציג לפני שמתחייבים?",
    a: "בהחלט. ניתן להתקשר או לשלוח WhatsApp ולשוחח עם נציג לפני כל התחייבות.",
  },
  {
    q: "כיצד נקבע המחיר?",
    a: "המחיר נקבע לפי סוג השירות, משך השעות והצרכים הספציפיים. אנו מציעים מחירים הוגנים ושקופים, תוך שמירה על שכר המטפלים וזכויותיהם.",
  },
];

export default function LandingPage() {
  return (
    <>
      <LpHeader />
      <main className="pb-24 md:pb-0">
        {/* LICENSE TRUST NOTICE */}
        <section
          dir="rtl"
          className="border-b border-amber-200 bg-amber-50 px-4 py-4 text-amber-900 sm:px-6 sm:py-5"
          aria-label="הודעה על רישיון ופיקוח"
        >
          <div className="container-main mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold sm:text-base">
              לפני שבוחרים חברת סיעוד — חשוב לוודא שהיא פועלת ברישיון
            </p>
            <p className="mt-1.5 text-sm leading-relaxed sm:text-[0.95rem]">
              מטפלת 24 פועלת ברישיון ומפוקחת על ידי משרד העבודה.{" "}
              <a
                href={LICENSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-950 underline decoration-amber-400 underline-offset-2 transition-colors hover:text-amber-800"
              >
                לצפייה ברישיון החברה
              </a>
            </p>
          </div>
        </section>

        {/* HERO */}
        <section className="gradient-hero px-4 py-12 text-white sm:px-6 sm:py-16">
          <div className="container-main mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
              מטפל/ת ישראלי/ת בביתכם — בתוך עד 5 שעות
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-relaxed text-white sm:text-lg">
              מענה אנושי מיידי — בלי מוקד אוטומטי, בלי המתנה.
            </p>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-blue-100 sm:text-base">
              חברה בעלת רישיון ומפוקחת על ידי משרד העבודה, בפריסה ארצית.
            </p>
            <LpCtaButtons className="mt-7" />
            <div className="mt-6">
              <LpLeadForm formId="lp-lead-form-hero" compact />
            </div>
          </div>
        </section>

        {/* TRUST / BENEFITS STRIP */}
        <section className="border-b border-slate-100 bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
          <div className="container-main">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
              {valuePoints.map((point) => (
                <div
                  key={point.text}
                  className="flex flex-col items-center rounded-xl border border-slate-200/80 bg-white px-3 py-4 text-center shadow-sm"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {point.icon}
                  </span>
                  <span className="mt-2 text-xs font-semibold leading-snug text-primary sm:text-sm">
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
          <div className="container-main">
            <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
              מתי אנחנו יכולים לעזור?
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-primary">{service.title}</h3>
                  <p className="mt-1 text-sm text-muted">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMMEDIATE AVAILABILITY BREAK */}
        <section className="border-y border-slate-200 bg-surface px-4 py-14 sm:px-6 sm:py-20">
          <div className="container-main mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">צריכים עזרה כבר היום?</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              במקרים דחופים ניתן לקבל מטפל/ת אצלכם בבית בתוך עד 5 שעות
            </p>
            <LpCtaButtons className="mt-7" showPhoneNumber={false} />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
          <div className="container-main mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">איך זה עובד?</h2>

            {/* Desktop: horizontal steps */}
            <div className="mt-10 hidden items-center justify-center gap-3 md:flex">
              {steps.map((step, index) => (
                <div key={step.num} className="flex items-center gap-3">
                  <div className="flex w-[11rem] flex-col items-center text-center">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-base font-bold text-white">
                      {step.num}
                    </span>
                    <p className="mt-3 text-sm font-semibold text-slate-800">{step.short}</p>
                    {step.urgent && (
                      <p className="mt-1 text-xs font-medium text-accent">
                        במקרים דחופים — בתוך עד 5 שעות
                      </p>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <span className="text-2xl text-accent/60" aria-hidden="true">
                      ←
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: vertical steps */}
            <ol className="mt-8 space-y-3 md:hidden">
              {steps.map((step) => (
                <li
                  key={step.num}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-surface px-4 py-3 text-right"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-base font-bold text-white">
                    {step.num}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-800">{step.text}</span>
                    {step.urgent && (
                      <p className="mt-0.5 text-xs font-medium text-accent">
                        במקרים דחופים — בתוך עד 5 שעות
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* HUMAN TRUST */}
        <section className="bg-surface px-4 py-14 sm:px-6 sm:py-20">
          <div className="container-main">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="/why-us-caregiver.png"
                  alt="מטפלת ישראלית מחייכת בבגדי עבודה"
                  width={500}
                  height={375}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-primary sm:text-3xl">
                  לא מוקד אוטומטי. אנשים שמבינים מה המשפחה שלכם צריכה.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                  אנחנו כאן כדי להקשיב, להבין את הצורך ולסייע במציאת מטפל/ת מתאים/ה במהירות
                  ובאחריות.
                </p>
                <LpCtaButtons className="mt-7" showPhoneNumber={false} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
          <div className="container-main mx-auto max-w-2xl">
            <h2 className="text-center text-2xl font-bold text-primary sm:text-3xl">
              שאלות נפוצות
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-surface"
                >
                  <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-primary marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-3">
                      {faq.q}
                      <span className="text-accent transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </span>
                  </summary>
                  <p className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* SECONDARY NAVIGATION TO MAIN WEBSITE */}
        <section className="border-t border-slate-100 bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
          <div className="container-main mx-auto max-w-xl text-center">
            <p className="text-sm text-muted sm:text-base">
              רוצים להכיר אותנו ואת השירותים שלנו לעומק?
            </p>
            <Link
              href="/"
              className="mt-3 inline-block text-sm font-semibold text-primary underline decoration-slate-300 underline-offset-4 transition-colors hover:text-accent"
            >
              לאתר המלא
            </Link>
          </div>
        </section>

        {/* FINAL CONVERSION */}
        <section className="gradient-hero px-4 py-14 text-white sm:px-6 sm:py-20">
          <div className="container-main mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">צריכים מטפל/ת עכשיו?</h2>
            <p className="mt-4 text-base leading-relaxed text-blue-100">
              מטפלת 24 פועלת ברישיון ומפוקחת על ידי משרד העבודה — עם מענה אנושי מיידי.
            </p>
            <p className="mt-2 text-sm text-blue-200">
              במקרים דחופים ניתן לתאם מטפל/ת בבית בתוך עד 5 שעות.
            </p>
            <LpCtaButtons className="mt-7" />
            <div className="mt-6">
              <LpLeadForm formId="lp-lead-form-final" />
            </div>
          </div>
        </section>
      </main>
      <LpFooter />
      <LpStickyBar />
      <FloatingWidgets popupFormType="landing-page-popup" />
    </>
  );
}
