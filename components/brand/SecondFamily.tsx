import type { CSSProperties } from "react";
import { buildWhatsAppUrl } from "@/lib/constants";
import { BRAND, LICENSE } from "./content";
import { CallButton, MobileCallBar, WhatsAppLink } from "./actions";
import { IconCheck, IconDocument, IconHands, IconHome, IconPerson, IconPhone, IconRefresh } from "./icons";
import SecondFamilyForm from "./SecondFamilyForm";
import {
  SECOND_FAMILY,
  SECOND_FAMILY_AREAS,
  SECOND_FAMILY_BENEFITS,
  SECOND_FAMILY_FAQ,
  SECOND_FAMILY_IMAGES,
  SECOND_FAMILY_PACKAGES,
  SECOND_FAMILY_PHONE_DISPLAY,
  SECOND_FAMILY_PHONE_HREF,
  SECOND_FAMILY_STEPS,
  SECOND_FAMILY_WHATSAPP,
} from "./second-family-copy";
import { BrandFooter, BrandRoot, CroppedImage, FaqList } from "./ui";
import BrandHeader from "./BrandHeader";

const SECTION = "mx-auto max-w-[1240px] px-5 lg:px-8";
const H2 = "mt-2 text-[25px] font-bold leading-tight lg:text-[38px]";
const AREA_ICONS = [IconPerson, IconHome, IconHands, IconDocument, IconPhone, IconRefresh] as const;

const familyPhone = {
  phoneHref: SECOND_FAMILY_PHONE_HREF,
  phoneDisplay: SECOND_FAMILY_PHONE_DISPLAY,
};

const warm = {
  "--sf-ivory": "#F7F1E8",
  "--sf-sage": "#E6EFE4",
} as CSSProperties;

export default function SecondFamily() {
  return (
    <BrandRoot>
      <div style={warm}>
        <div className="bg-(--nc-ink) text-white">
          <p className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-5 py-2 text-[12.5px] lg:px-8">
            <span>{LICENSE.statement}</span>
            <a href={LICENSE.url} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold underline decoration-white/40 underline-offset-2">
              רישיון {LICENSE.number}
            </a>
          </p>
        </div>
        <BrandHeader variant="landing" {...familyPhone} />

        <main>
          <section className="bg-(--sf-ivory)">
            <div className={`${SECTION} pt-5 lg:grid lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-16`}>
              <div className="lg:col-span-6">
                <p className="text-[13px] font-semibold text-(--nc-teal)">{SECOND_FAMILY.parent}</p>
                <p className="mt-2 text-[22px] font-bold leading-none text-(--nc-navy) lg:text-[28px]">{SECOND_FAMILY.name}</p>
                <p className="mt-3 max-w-[36rem] text-[16px] font-medium leading-snug text-(--nc-ink) lg:text-[18px]">{SECOND_FAMILY.slogan}</p>
                <h1 className="mt-5 text-[28px] font-bold leading-[1.18] tracking-[-0.015em] min-[390px]:text-[30px] lg:text-[46px] lg:leading-[1.12]">
                  {SECOND_FAMILY.h1}
                </h1>
                <p className="mt-3 max-w-[38rem] text-[16px] leading-relaxed text-(--nc-muted) lg:text-[18px]">{SECOND_FAMILY.sub}</p>
                <ul className="mt-4 grid gap-1.5 text-[15px] font-semibold lg:text-[16px]">
                  {SECOND_FAMILY_BENEFITS.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <IconCheck className="h-4 w-4 shrink-0 text-(--nc-teal)" stroke={2.2} />
                      {item}
                    </li>
                  ))}
                </ul>
                <CallButton {...familyPhone} id="hero-call" label="דברו איתנו על ההורים שלכם" size="lg" className="mt-5 !h-auto min-h-14 py-3 lg:max-w-[30rem]" />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 lg:max-w-[30rem]">
                  <a href="#packages" className="text-[15px] font-semibold text-(--nc-navy) underline decoration-(--nc-line) underline-offset-4 hover:decoration-(--nc-navy)">
                    קבלו פרטים על המסלולים
                  </a>
                  <WhatsAppLink message={SECOND_FAMILY_WHATSAPP} />
                </div>
              </div>
              <div className="-mx-5 mt-6 lg:col-span-6 lg:mx-0 lg:mt-0">
                <CroppedImage
                  alt={SECOND_FAMILY_IMAGES.alt}
                  mobile={SECOND_FAMILY_IMAGES.mobile}
                  desktop={SECOND_FAMILY_IMAGES.desktop}
                  sizes="(min-width: 1024px) 580px, 100vw"
                  eager
                />
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className={`${SECTION} max-w-[820px] py-10 lg:py-20`}>
              <h2 className={H2}>אתם לא תמיד יכולים להיות שם. אנחנו יכולים לעזור.</h2>
              <div className="mt-4 space-y-4 text-[16.5px] leading-[1.75] text-(--nc-ink)/90 lg:text-[18px]">
                <p>
                  בנים ובנות מבוגרים מחלקים את השבוע בין עבודה, הבית שלהם, והאחריות להורים. גם כשההורה עדיין מתנהל בעצמו, הימים בבית יכולים להיות ארוכים ושקטים מדי.
                </p>
                <p>
                  משפחה שנייה נולדה בשביל הרגע הזה: מישהו שמגיע באופן קבוע, יושב, מקשיב, ושם לב אם חסר משהו קטן. ההורה נשאר בביתו, עם שגרה וקשר אנושי. אתם מקבלים עדכון וכתובת אחת ברורה.
                </p>
                <p>המטרה היא לתמוך בהורה בלי לקחת ממנו את העצמאות, ולתת למשפחה שקט. זה ליווי וחברה, לא טיפול רפואי ולא השגחה סיעודית.</p>
              </div>
            </div>
          </section>

          <section className="bg-(--sf-sage)">
            <div className={`${SECTION} py-10 lg:py-20`}>
              <h2 className={H2}>מישהו שמגיע, מקשיב ודואג לדברים הקטנים</h2>
              <p className="mt-3 max-w-[46rem] text-[16px] leading-relaxed text-(--nc-muted) lg:text-[17px]">
                ליווי לקשישים בבית: חברה, עזרה להורים מבוגרים, וביקורי בית לקשישים. שירותי ליווי לגיל השלישי, לא משמרת סיעודית.
              </p>
              <ol className="mt-6 border-t border-(--nc-ink)/15">
                {SECOND_FAMILY_AREAS.map((area, index) => {
                  const Icon = AREA_ICONS[index];
                  return (
                    <li key={area.title} className="grid gap-2 border-b border-(--nc-ink)/15 py-4 sm:grid-cols-[auto_1fr] sm:gap-4 lg:py-5">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 shrink-0 text-(--nc-navy)" />
                        <h3 className="text-[17px] font-bold lg:text-[19px]">
                          <span className="me-2 text-[12px] font-semibold tabular-nums text-(--nc-teal)">{String(index + 1).padStart(2, "0")}</span>
                          {area.title}
                        </h3>
                      </div>
                      <p className="text-[15px] leading-relaxed text-(--nc-muted) sm:col-start-2 lg:text-[16.5px]">{area.line}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          <section className="bg-(--nc-ink) text-white">
            <div className={`${SECTION} py-10 lg:py-16`}>
              <h2 className="max-w-[20ch] text-[26px] font-bold leading-tight lg:text-[40px]">כדי שתוכלו להיות רגועים יותר, גם כשאתם רחוקים</h2>
              <ul className="mt-6 grid gap-3 text-[16px] lg:grid-cols-2 lg:gap-x-10 lg:text-[18px]">
                {["מישהו מגיע באופן קבוע.", "מישהו שם לב אם משהו חסר.", "מישהו שומר על קשר במהלך השבוע.", "מישהו מעדכן את המשפחה כשצריך תשומת לב."].map((line) => (
                  <li key={line} className="border-t border-white/20 pt-3">
                    {line}
                  </li>
                ))}
              </ul>
              <CallButton {...familyPhone} label="בואו נדבר על מה שההורים שלכם צריכים" size="lg" className="mt-7 !h-auto min-h-14 py-3 lg:max-w-[34rem]" />
            </div>
          </section>

          <section id="packages" className="scroll-mt-24 bg-(--sf-ivory)">
            <div className={`${SECTION} py-10 lg:py-20`}>
              <h2 className={H2}>בוחרים את רמת הליווי המתאימה למשפחה שלכם</h2>
              <p className="mt-3 max-w-[42rem] text-[15.5px] leading-relaxed text-(--nc-muted) lg:text-[17px]">
                משך ביקור ומספר שיחות נקבעים בשיחה, לפי המסלול והאזור.
              </p>
              <div className="mt-6 grid gap-px bg-(--nc-line) lg:grid-cols-3">
                {SECOND_FAMILY_PACKAGES.map((pack) => (
                  <article key={pack.name} className="bg-(--sf-ivory) p-5 lg:p-7">
                    <h3 className="text-[22px] font-bold">{pack.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-(--nc-muted)">{pack.forWhom}</p>
                    <ul className="mt-4 space-y-2 text-[15.5px]">
                      {pack.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <IconCheck className="mt-1 h-4 w-4 shrink-0 text-(--nc-teal)" stroke={2.2} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <CallButton {...familyPhone} label="בואו נתאים להורים שלכם את המסלול הנכון" size="lg" className="mt-6 !h-auto min-h-14 py-3 lg:max-w-[36rem]" />
            </div>
          </section>

          <section className="bg-white">
            <div className={`${SECTION} py-10 lg:py-16`}>
              <h2 className={H2}>כך פשוט מתחילים</h2>
              <ol className="mt-6 grid gap-4 lg:grid-cols-4">
                {SECOND_FAMILY_STEPS.map((step, index) => (
                  <li key={step.title} className="border-t-2 border-(--nc-teal) pt-3">
                    <p className="text-[12px] font-semibold tabular-nums text-(--nc-teal)">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-[17px] font-bold">{step.title}</h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-(--nc-muted)">{step.line}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section aria-labelledby="sf-video-title" className="border-t border-(--nc-line) bg-white">
            <div className={`${SECTION} grid items-center gap-6 py-10 lg:grid-cols-[minmax(0,1.15fr)_auto] lg:gap-14 lg:py-16`}>
              <div>
                <h2 id="sf-video-title" className={H2}>גם כשאתם לא שם, תמיד יש מי שידאג.</h2>
                <p className="mt-3 max-w-[38rem] text-[15.5px] leading-relaxed text-(--nc-muted) lg:text-[17px]">
                  לא תמיד אפשר להגיע להורים, אבל תמיד רוצים לדעת שהם בסדר. עם משפחה שנייה יש מי שמבקר, מתעניין, דואג לדברים הקטנים ומעדכן את המשפחה.
                </p>
              </div>
              <video
                className="mx-auto aspect-[9/16] w-full max-w-[300px] rounded-[4px] bg-(--nc-stone) sm:max-w-[320px]"
                controls
                playsInline
                preload="metadata"
                poster="/second-family-video-poster.jpg"
                width={720}
                height={1280}
                aria-label="סרטון: גם כשאתם לא שם, תמיד יש מי שידאג"
              >
                <source src="/second-family-video.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          <section className="bg-(--sf-ivory)">
            <div className="mx-auto grid max-w-[1240px] lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <CroppedImage alt={SECOND_FAMILY_IMAGES.alt} mobile={SECOND_FAMILY_IMAGES.desktop} sizes="(min-width: 1024px) 720px, 100vw" />
              </div>
              <div className="px-5 py-8 lg:col-span-5 lg:px-12">
                <h2 className="text-[24px] font-bold leading-snug lg:text-[32px]">לא רק ביקור. קשר אנושי שממשיך גם אחריו.</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-(--nc-muted) lg:text-[17px]">
                  השירות מחבר תשומת לב קבועה להורה עם שיחה ועדכון למשפחה. הפגת בדידות אצל קשישים, ושקט למי שלא יכול להיות שם כל יום.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white">
            <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-20`}>
              <div className="lg:col-span-4">
                <h2 className={H2}>שאלות לפני שמתחילים</h2>
              </div>
              <div className="mt-5 lg:col-span-8 lg:mt-2">
                <FaqList items={SECOND_FAMILY_FAQ} />
              </div>
            </div>
          </section>

          <section id="lead-form" className="scroll-mt-24 bg-(--nc-navy) text-white">
            <div className={`${SECTION} py-11 lg:grid lg:grid-cols-12 lg:gap-14 lg:py-20`}>
              <div className="lg:col-span-6">
                <h2 className="text-[27px] font-bold leading-tight lg:text-[40px]">רוצים לדעת שיש מי שדואג להורים שלכם?</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-white/80 lg:text-[18px]">השאירו פרטים ונחזור אליכם כדי להתאים למשפחה את הליווי הנכון.</p>
                <CallButton {...familyPhone} label="דברו איתנו על ההורים שלכם" size="lg" className="mt-6 !h-auto min-h-14 py-3 lg:max-w-[30rem]" />
                <WhatsAppLink message={SECOND_FAMILY_WHATSAPP} tone="light" className="mt-4" />
                <p className="mt-6 text-[13px] text-white/60">
                  {BRAND.name}. {LICENSE.privateNote}
                </p>
              </div>
              <div className="mt-8 bg-(--sf-ivory) p-5 text-(--nc-ink) lg:col-span-6 lg:mt-0 lg:p-8">
                <p className="text-[18px] font-bold">השאירו פרטים על משפחה שנייה</p>
                <p className="mt-1 text-[14.5px] text-(--nc-muted)">שם וטלפון מספיקים. אין צורך בפרטים רפואיים.</p>
                <div className="mt-5">
                  <SecondFamilyForm />
                </div>
              </div>
            </div>
          </section>
        </main>

        <BrandFooter variant="full" whatsappHref={buildWhatsAppUrl(SECOND_FAMILY_WHATSAPP)} {...familyPhone} />
        <MobileCallBar whatsappMessage={SECOND_FAMILY_WHATSAPP} {...familyPhone} />
      </div>
    </BrandRoot>
  );
}
