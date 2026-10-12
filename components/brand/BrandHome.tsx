import Link from "next/link";
import { PHONE_HREF } from "@/lib/constants";
import { cities } from "@/lib/data/cities";
import BrandHeader from "./BrandHeader";
import { CallButton, MobileCallBar, WhatsAppLink } from "./actions";
import {
  COVERAGE_HEADLINE,
  HOME_FAQ,
  IMAGES,
  LICENSE,
  PROMISES,
  PROMISE_LEDGER,
  SITUATIONS,
  TRUST_POINTS,
  type PromiseId,
  type SituationId,
} from "./content";
import {
  IconBed,
  IconCheck,
  IconChevron,
  IconClock,
  IconDocument,
  IconExternal,
  IconHands,
  IconHome,
  IconMap,
  IconMoon,
  IconPerson,
  IconRefresh,
} from "./icons";
import { CallbackPopup, StepLeadForm } from "./lead-forms";
import {
  BrandFooter,
  BrandRoot,
  CroppedImage,
  FaqList,
  LicensePanel,
  LicenseStrip,
  ProcessList,
  SectionLabel,
} from "./ui";

const PROMISE_ICONS: Record<PromiseId, typeof IconClock> = {
  license: IconDocument,
  human: IconPerson,
  urgent: IconClock,
  coverage: IconMap,
};

const SITUATION_ICONS: Record<SituationId, typeof IconClock> = {
  hospital: IconBed,
  discharge: IconHome,
  elderly: IconHands,
  night: IconMoon,
  dementia: IconPerson,
  replacement: IconRefresh,
};

const SECTION = "mx-auto max-w-[1240px] px-5 lg:px-8";
const H2 = "mt-3 text-[25px] font-bold leading-tight lg:text-[38px]";

function PromiseLedger() {
  return (
    <ol className="grid border-t border-(--nc-line) sm:grid-cols-2">
      {PROMISE_LEDGER.map((item, i) => {
        const Icon = PROMISE_ICONS[item.id];
        return (
          <li key={item.id} className="flex gap-3.5 border-b border-(--nc-line) py-4 sm:odd:border-l sm:odd:pl-5 sm:even:pr-5">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-(--nc-teal)" />
            <div>
              <p className="flex items-baseline gap-2 text-[16px] font-bold leading-snug">
                <span className="text-[12px] font-semibold tabular-nums text-(--nc-teal)">{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </p>
              <p className="mt-0.5 text-[14px] leading-snug text-(--nc-muted)">{item.line}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function BrandHome() {
  return (
    <BrandRoot>
      <LicenseStrip />
      <BrandHeader variant="home" />

      <main>
        {/* HERO */}
        <section>
          <div className={`${SECTION} lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-16`}>
            <div className="-mx-5 lg:order-2 lg:col-span-6 lg:mx-0">
              <CroppedImage
                alt={IMAGES.heroAlt}
                mobile={IMAGES.heroMobile}
                desktop={IMAGES.heroDesktop}
                sizes="(min-width: 1024px) 580px, 100vw"
                eager
              />
              <div className="mt-6 hidden lg:block">
                <PromiseLedger />
              </div>
            </div>

            <div className="pt-4 lg:order-1 lg:col-span-6 lg:pt-0">
              <p className="hidden items-center gap-2.5 text-[14px] font-semibold text-(--nc-teal) lg:flex">
                <span className="h-px w-6 bg-(--nc-teal)" />
                {LICENSE.statement}
              </p>
              <h1 className="text-[26px] font-bold leading-[1.18] tracking-[-0.015em] text-balance min-[390px]:text-[28px] lg:mt-5 lg:text-[48px] lg:leading-[1.1]">
                {COVERAGE_HEADLINE}
              </h1>
              <p className="mt-2 text-[16px] leading-normal text-(--nc-muted) lg:mt-6 lg:text-[20px]">
                <span className="font-semibold text-(--nc-ink)">{PROMISES.human}.</span>{" "}
                <span className="font-semibold text-(--nc-ink)">{PROMISES.urgent}</span>, בהתאם לזמינות באזור.
              </p>
              <p className="mt-3 hidden text-[17px] leading-relaxed text-(--nc-muted) lg:block">
                כשמישהו יקר צריך השגחה, לא צריך לחכות. רכזי השירות שלנו מבינים מה קרה ומתאמים מטפל לבית או לבית החולים.
              </p>
              <CallButton id="hero-call" size="lg" className="mt-4 lg:mt-9 lg:max-w-[30rem]" />
              <div className="mt-2.5 flex items-center justify-between gap-3 text-[13px] text-(--nc-muted) lg:mt-4 lg:max-w-[30rem] lg:text-[14px]">
                <span>עונה לכם אדם, לא מרכזייה</span>
                <WhatsAppLink className="!text-[13px] lg:!text-[14px]" />
              </div>
            </div>
          </div>
        </section>

        {/* PROMISES — mobile */}
        <section aria-label="מה חשוב לדעת" className={`${SECTION} mt-7 lg:hidden`}>
          <PromiseLedger />
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-24 border-b border-(--nc-line) lg:bg-(--nc-stone)">
          <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-24`}>
            <div className="lg:col-span-4">
              <SectionLabel index="01">שירותים</SectionLabel>
              <h2 className={H2}>כל משפחה מגיעה אלינו ממקום אחר</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--nc-muted) lg:text-[17px]">
                לא צריך לדעת מראש איזה שירות מתאים. מספיק לספר מה קורה, ונבנה את זה יחד.
              </p>
            </div>
            <ul className="mt-5 border-t border-(--nc-line) lg:col-span-8 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:border-t-0">
              {SITUATIONS.map((s) => {
                const Icon = SITUATION_ICONS[s.id];
                const body = (
                  <>
                    <Icon className="h-6 w-6 shrink-0 text-(--nc-navy) lg:h-7 lg:w-7" />
                    <span className="flex-1">
                      <span className="block text-[16.5px] font-semibold leading-snug lg:text-[19px]">{s.title}</span>
                      <span className="block text-[14px] font-medium text-(--nc-teal) lg:mt-1 lg:text-[15px]">{s.tag}</span>
                    </span>
                  </>
                );
                return (
                  <li key={s.id} className="border-b border-(--nc-line) lg:border-t lg:border-b-0 lg:border-(--nc-ink)/15">
                    {s.href ? (
                      <Link href={s.href} className="group flex items-center gap-3.5 py-4 lg:items-start lg:py-6">
                        {body}
                        <IconChevron className="h-5 w-5 shrink-0 text-(--nc-muted) group-hover:text-(--nc-teal)" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-3.5 py-4 lg:items-start lg:py-6">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section id="second-family" className="scroll-mt-24 border-b border-(--nc-line) bg-white">
          <div className={`${SECTION} py-9 lg:flex lg:items-end lg:justify-between lg:gap-16 lg:py-16`}>
            <div className="max-w-2xl">
              <p className="text-[13px] font-semibold tracking-wide text-(--nc-teal)">משפחה שנייה</p>
              <h2 className="mt-2 text-[24px] font-bold leading-snug lg:text-[34px]">
                גם כשאתם לא יכולים להיות ליד ההורים — יש מי שידאג להם.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--nc-muted) lg:text-[17px]">
                ביקורים קבועים, חברה, סיוע יומיומי, קשר במהלך השבוע ועדכונים למשפחה.
              </p>
            </div>
            <Link
              href="/mishpacha-shniya"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-[4px] bg-(--nc-ink) px-5 text-[16px] font-semibold text-white hover:bg-(--nc-navy) lg:mt-0 lg:shrink-0"
            >
              הכירו את משפחה שנייה
            </Link>
          </div>
        </section>

        {/* PROCESS */}
        <section id="how-it-works" className="scroll-mt-24 bg-(--nc-stone) lg:bg-white">
          <div className={`${SECTION} py-10 lg:py-24`}>
            <div className="lg:flex lg:items-end lg:justify-between">
              <div>
                <SectionLabel index="02">איך זה עובד</SectionLabel>
                <h2 className={H2}>מה קורה אחרי שמתקשרים</h2>
              </div>
              <p className="mt-2 text-[15px] text-(--nc-muted) lg:mt-0 lg:max-w-sm lg:text-[16px]">
                ארבעה שלבים, בלי טפסים מסובכים ובלי המתנה למענה ממוחשב.
              </p>
            </div>
            <div className="mt-7 lg:mt-12">
              <ProcessList />
            </div>
            <div className="mt-8 flex gap-3 border-r-[3px] border-(--nc-teal) bg-white px-4 py-3.5 lg:mt-14 lg:max-w-3xl lg:bg-(--nc-teal-tint) lg:px-6 lg:py-5">
              <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-(--nc-teal)" />
              <p className="text-[14.5px] leading-relaxed lg:text-[16px]">
                <span className="font-semibold">{PROMISES.urgent}</span>, לבית המטופל או לבית החולים, {PROMISES.urgentQualifier}.
              </p>
            </div>
          </div>
        </section>

        {/* HUMAN */}
        <section className="lg:bg-(--nc-ink) lg:text-white">
          <div className="mx-auto max-w-[1240px] lg:grid lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <CroppedImage
                alt={IMAGES.humanAlt}
                mobile={IMAGES.human}
                sizes="(min-width: 1024px) 720px, 100vw"
              />
            </div>
            <div className="px-5 py-9 lg:col-span-5 lg:px-14 lg:py-12">
              <SectionLabel index="03" className="lg:text-[#7FC8BC]">
                אנשים, לא מוקד
              </SectionLabel>
              <h2 className="mt-3 text-[24px] font-bold leading-snug lg:text-[32px]">
                המטרה שלנו פשוטה: שתסיימו את השיחה רגועים יותר ממה שהתחלתם.
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--nc-muted) lg:mt-5 lg:text-[17px] lg:text-white/75">
                רכזי השירות שלנו מקשיבים, שואלים את השאלות הנכונות, מסבירים מה האפשרויות ומלווים אתכם עד שהמטפל מגיע.
              </p>
            </div>
          </div>
        </section>

        {/* LICENSE & TRUST */}
        <section id="license" className="scroll-mt-24 border-y border-(--nc-line) bg-white">
          <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:gap-14 lg:py-24`}>
            <div className="lg:col-span-7">
              <SectionLabel index="04">רישיון ופיקוח</SectionLabel>
              <h2 className={H2}>למה משפחות סומכות עלינו</h2>
              <ul className="mt-6 grid gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
                {TRUST_POINTS.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-(--nc-teal)" stroke={2} />
                    <div>
                      <p className="text-[16px] font-semibold lg:text-[18px]">{p.title}</p>
                      <p className="mt-0.5 text-[14.5px] text-(--nc-muted) lg:text-[15.5px]">{p.line}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 lg:col-span-5 lg:mt-0">
              <LicensePanel />
            </div>
          </div>
        </section>

        {/* COVERAGE */}
        <section id="coverage" className="scroll-mt-24 bg-(--nc-stone)">
          <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-20`}>
            <div className="lg:col-span-4">
              <SectionLabel index="05">פריסה ארצית</SectionLabel>
              <h2 className={H2}>מטפלים ומטפלות בכל הארץ</h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-(--nc-muted) lg:text-[17px]">
                בערים, ביישובים, בבית ובבית החולים. בשיחה נבדוק מי זמין באזור שלכם.
              </p>
            </div>
            <div className="mt-6 lg:col-span-8 lg:mt-0">
              <ul className="grid grid-cols-2 border-t border-(--nc-line) sm:grid-cols-4">
                {Object.values(cities).map((city) => (
                  <li key={city.slug} className="border-b border-(--nc-line)">
                    <Link href={`/${city.slug}`} className="flex items-center justify-between gap-2 py-3.5 pl-3 text-[15.5px] font-semibold hover:text-(--nc-teal)">
                      מטפלים ב{city.name}
                      <IconChevron className="h-4 w-4 shrink-0 text-(--nc-muted)" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14.5px] text-(--nc-muted)">
                לא מצאתם את האזור שלכם?{" "}
                <a href={PHONE_HREF} className="font-semibold text-(--nc-ink) underline decoration-(--nc-line) underline-offset-4 hover:decoration-(--nc-ink)">
                  התקשרו ונבדוק זמינות
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-white">
          <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-24`}>
            <div className="lg:col-span-4">
              <SectionLabel index="06">שאלות</SectionLabel>
              <h2 className={H2}>מה משפחות שואלות אותנו</h2>
            </div>
            <div className="mt-5 lg:col-span-8 lg:mt-0">
              <FaqList items={HOME_FAQ} />
            </div>
          </div>
        </section>

        {/* FINAL + CALLBACK */}
        <section id="lead-form" className="scroll-mt-24 bg-(--nc-ink) text-white">
          <div className={`${SECTION} py-11 lg:grid lg:grid-cols-12 lg:gap-14 lg:py-20`}>
            <div className="lg:col-span-6">
              <h2 className="text-[27px] font-bold leading-tight lg:text-[44px]">רוצים לדבר עם מישהו עכשיו?</h2>
              <p className="mt-2.5 text-[16px] text-white/75 lg:mt-4 lg:text-[19px]">
                לא צריך להכין כלום. ספרו מה קרה, ונמשיך משם יחד.
              </p>
              <CallButton size="lg" className="mt-6 lg:mt-9 lg:max-w-[30rem]" />
              <WhatsAppLink tone="light" className="mt-4" />
              <a
                href={LICENSE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 hidden items-center gap-1.5 text-[14px] text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white lg:flex"
              >
                <IconDocument className="h-4 w-4 text-[#7FC8BC]" />
                {LICENSE.statement} · רישיון מס&apos; {LICENSE.number}
                <IconExternal className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-9 bg-white p-5 text-(--nc-ink) lg:col-span-6 lg:mt-0 lg:p-8">
              <p className="text-[18px] font-bold">מעדיפים שנחזור אליכם?</p>
              <p className="mt-1 text-[14.5px] text-(--nc-muted)">שלוש שאלות קצרות, ורכז שירות יחזור אליכם.</p>
              <div className="mt-5">
                <StepLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <BrandFooter variant="full" />
      <MobileCallBar />
      <CallbackPopup formType="popup" />
    </BrandRoot>
  );
}
