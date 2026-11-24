import BrandHeader from "./BrandHeader";
import { CallButton, MobileCallBar, WhatsAppLink } from "./actions";
import { ContextualCallback } from "./ContextualCallback";
import { COVERAGE_HEADLINE, IMAGES, LANDING_FAQ, PROMISES, PROMISE_LEDGER, type PromiseId } from "./content";
import { IconClock, IconDocument, IconMap, IconPerson } from "./icons";
import { LeadCaptureCard, QuickLeadForm } from "./lead-forms";
import { BrandFooter, BrandRoot, CroppedImage, FaqList, LicensePanel, LicenseStrip, ProcessList } from "./ui";

const PROMISE_ICONS: Record<PromiseId, typeof IconClock> = {
  license: IconDocument,
  human: IconPerson,
  urgent: IconClock,
  coverage: IconMap,
};

const SECTION = "mx-auto max-w-[1240px] px-5 lg:px-8";

export default function BrandLanding() {
  return (
    <BrandRoot>
      <LicenseStrip />
      <BrandHeader variant="landing" />

      <main>
        {/* HERO — form first */}
        <section>
          <div className={`${SECTION} pt-5 lg:grid lg:grid-cols-12 lg:gap-10 lg:py-14`}>
            <div className="lg:col-span-6 lg:pt-2">
              <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.015em] text-balance min-[390px]:text-[30px] lg:text-[48px] lg:leading-[1.07]">
                צריכים מטפל בדחיפות? עונים לכם עכשיו.
              </h1>
              <p className="mt-3 text-[16px] leading-normal text-(--nc-muted) lg:mt-5 lg:max-w-[36rem] lg:text-[19px]">
                <span className="font-semibold text-(--nc-ink)">{PROMISES.urgent}</span>, בהתאם לזמינות באזור.{" "}
                {COVERAGE_HEADLINE}.
              </p>

              <div className="mt-4 lg:hidden">
                <LeadCaptureCard formId="lp-hero-mobile" formType="landing-page" />
              </div>

              <div className="mt-5 hidden lg:block lg:max-w-[30rem]">
                <CallButton id="hero-call" size="lg" label="צריכים מטפלת? דברו איתנו" />
                <div className="mt-2.5 flex items-center justify-between gap-3 text-[13px] text-(--nc-muted) lg:text-[14px]">
                  <span>{PROMISES.human} · ללא התחייבות</span>
                  <WhatsAppLink className="!text-[13px] lg:!text-[14px]" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 text-[13px] text-(--nc-muted) lg:hidden">
                <span>{PROMISES.human} · ללא התחייבות</span>
                <WhatsAppLink className="!text-[13px]" />
              </div>

              <ol className="mt-10 hidden border-t border-(--nc-line) lg:grid lg:grid-cols-2">
                {PROMISE_LEDGER.map((item) => {
                  const Icon = PROMISE_ICONS[item.id];
                  return (
                    <li key={item.id} className="flex gap-3 border-b border-(--nc-line) py-4 odd:border-l odd:pl-5 even:pr-5">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-(--nc-teal)" />
                      <div>
                        <p className="text-[15.5px] font-bold leading-snug">{item.title}</p>
                        <p className="mt-0.5 text-[14px] leading-snug text-(--nc-muted)">{item.line}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-6 lg:col-span-6 lg:mt-0">
              <div className="hidden lg:block">
                <LeadCaptureCard formId="lp-lead-form-hero" formType="landing-page" />
              </div>
              <div className="-mx-5 mt-5 lg:mx-0 lg:mt-5">
                <CroppedImage
                  alt={IMAGES.heroAlt}
                  mobile={IMAGES.heroMobile}
                  desktop={IMAGES.heroDesktop}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  eager
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROMISES — mobile */}
        <section aria-label="מה חשוב לדעת" className="border-b border-(--nc-line) lg:hidden">
          <ol className="divide-y divide-(--nc-line) px-5">
            {PROMISE_LEDGER.map((item) => {
              const Icon = PROMISE_ICONS[item.id];
              return (
                <li key={item.id} className="flex gap-3.5 py-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-(--nc-teal)" />
                  <div>
                    <p className="text-[16px] font-bold leading-snug">{item.title}</p>
                    <p className="mt-0.5 text-[14px] leading-snug text-(--nc-muted)">{item.line}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* PROCESS */}
        <section className="bg-(--nc-stone)">
          <div className={`${SECTION} py-10 lg:py-16`}>
            <h2 className="text-[23px] font-bold leading-tight lg:text-[32px]">מה קורה אחרי שמשאירים פרטים</h2>
            <div className="mt-6 lg:mt-10">
              <ProcessList />
            </div>
            <div className="mt-8">
              <ContextualCallback
                formType="landing-process"
                heading="אפשר להתחיל בשיחה קצרה"
                copy="אין צורך לדעת מראש איזה שירות מתאים. נשמח להבין את הצורך ולסייע."
                cta="בקשו שיחזרו אליכם"
                className="bg-white"
              />
            </div>
          </div>
        </section>

        {/* HUMAN + LICENSE */}
        <section className="bg-white">
          <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-20`}>
            <div className="lg:col-span-7">
              <div className="-mx-5 lg:mx-0">
                <CroppedImage alt={IMAGES.humanAlt} mobile={IMAGES.human} sizes="(min-width: 1024px) 680px, 100vw" />
              </div>
              <h2 className="mt-7 text-[23px] font-bold leading-tight lg:text-[32px]">מאחורי כל פנייה עומד אדם שמקשיב</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--nc-muted) lg:mt-4 lg:max-w-[38rem] lg:text-[17px]">
                כשאתם פונים אלינו, אתם מדברים עם רכז או רכזת שירות שמבינים את הצורך, בודקים את האפשרויות ומסייעים למצוא פתרון מתאים.
              </p>
            </div>
            <div className="mt-8 lg:col-span-5 lg:mt-0">
              <LicensePanel />
              <div className="mt-6">
                <ContextualCallback
                  formType="landing-availability"
                  heading="רוצים לבדוק זמינות באזור שלכם?"
                  copy="רכז שירות יבדוק איתכם מי זמין — שיחה אנושית, לא בדיקה אוטומטית."
                  cta="בדקו זמינות עם רכז שירות"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-(--nc-line) bg-white">
          <div className="mx-auto max-w-[820px] px-5 py-10 lg:px-8 lg:py-16">
            <h2 className="text-[23px] font-bold leading-tight lg:text-[32px]">שאלות נפוצות</h2>
            <div className="mt-5">
              <FaqList items={LANDING_FAQ} />
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section id="lead-form" className="scroll-mt-24 bg-(--nc-ink) text-white">
          <div className={`${SECTION} py-11 lg:grid lg:grid-cols-12 lg:gap-14 lg:py-16`}>
            <div className="lg:col-span-6">
              <h2 className="text-[26px] font-bold leading-tight lg:text-[40px]">השאירו מספר טלפון — ונחזור אליכם</h2>
              <p className="mt-2.5 text-[16px] text-white/75 lg:text-[18px]">
                {PROMISES.urgent}, {PROMISES.urgentQualifier}. שיחה ראשונית ללא התחייבות.
              </p>
              <CallButton size="lg" className="mt-6 lg:max-w-[30rem]" />
              <WhatsAppLink tone="light" className="mt-4" />
            </div>
            <div className="mt-9 border-t border-white/15 pt-7 lg:col-span-6 lg:mt-0 lg:border-t-0 lg:pt-0">
              <p className="text-[17px] font-bold">מעדיפים שנחזור אליכם?</p>
              <p className="mt-1 text-[14px] text-white/65">השאירו שם ומספר בלבד.</p>
              <div className="mt-4">
                <QuickLeadForm formId="lp-lead-form-final" formType="landing-page" tone="dark" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <BrandFooter variant="minimal" />
      <MobileCallBar />
    </BrandRoot>
  );
}
