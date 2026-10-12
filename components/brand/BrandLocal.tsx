import type { ReactNode } from "react";
import Link from "next/link";
import BrandHeader from "./BrandHeader";
import { CallButton, MobileCallBar, WhatsAppLink } from "./actions";
import { IMAGES, LICENSE, PROMISES } from "./content";
import { IconChevron } from "./icons";
import { CallbackPopup, StepLeadForm } from "./lead-forms";
import { BrandFooter, BrandRoot, CroppedImage, FaqList, LicensePanel } from "./ui";
import type { FaqItem } from "./content";

const SECTION = "mx-auto max-w-[820px] px-5 lg:max-w-[1100px] lg:px-8";

export function BrandFrame({ children, popupFormType = "popup" }: { children: ReactNode; popupFormType?: string }) {
  return (
    <BrandRoot>
      <div className="bg-(--nc-ink) text-white">
        <p className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-5 py-2 text-[12.5px] lg:px-8">
          <span>{LICENSE.statement}</span>
          <a href={LICENSE.url} target="_blank" rel="noopener noreferrer" className="shrink-0 font-semibold underline decoration-white/40 underline-offset-2">
            רישיון {LICENSE.number}
          </a>
        </p>
      </div>
      <BrandHeader variant="landing" />
      {children}
      <BrandFooter variant="full" />
      <MobileCallBar />
      <CallbackPopup formType={popupFormType} />
    </BrandRoot>
  );
}

function Prose({ children }: { children: string }) {
  const parts = children.split(/(?<=\.)\s+/).filter(Boolean);
  const chunks: string[] = [];
  for (let i = 0; i < parts.length; i += 2) chunks.push(parts.slice(i, i + 2).join(" "));
  return (
    <div className="space-y-4 text-[16.5px] leading-[1.75] text-(--nc-ink)/90 lg:text-[18px]">
      {chunks.map((p) => (
        <p key={p.slice(0, 24)}>{p}</p>
      ))}
    </div>
  );
}

export function LocalHero({
  kicker,
  title,
  lede,
  whatsappMessage,
}: {
  kicker: string;
  title: string;
  lede: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="border-b border-(--nc-line)">
      <div className={`${SECTION} grid gap-8 py-6 lg:grid-cols-12 lg:items-center lg:py-14`}>
        <div className="lg:col-span-7">
          <p className="text-[13px] font-semibold text-(--nc-teal)">{kicker}</p>
          <h1 className="mt-2 text-[30px] font-bold leading-[1.15] tracking-[-0.015em] text-balance lg:text-[46px] lg:leading-[1.08]">
            {title}
          </h1>
          <p className="mt-3 max-w-[38rem] text-[16.5px] leading-relaxed text-(--nc-muted) lg:text-[18px]">{lede}</p>
          <CallButton id="hero-call" size="lg" className="mt-5 lg:max-w-[30rem]" />
          <div className="mt-2.5 flex items-center justify-between gap-3 text-[13px] text-(--nc-muted) lg:max-w-[30rem]">
            <span>{PROMISES.human}</span>
            <WhatsAppLink message={whatsappMessage} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <CroppedImage
            alt={IMAGES.heroAlt}
            mobile={IMAGES.heroMobile}
            desktop={IMAGES.heroDesktop}
            sizes="(min-width: 1024px) 420px, 100vw"
            eager
            captionAt="top"
          />
        </div>
      </div>
    </section>
  );
}

export function RuledFacts({ items }: { items: { title: string; line: string }[] }) {
  return (
    <ul className="border-t border-(--nc-line)">
      {items.map((item) => (
        <li key={item.title} className="grid gap-1 border-b border-(--nc-line) py-4 lg:grid-cols-[220px_1fr] lg:gap-8 lg:py-5">
          <p className="text-[16px] font-bold">{item.title}</p>
          <p className="text-[15.5px] leading-relaxed text-(--nc-muted)">{item.line}</p>
        </li>
      ))}
    </ul>
  );
}

export function LocalStory({
  heading,
  body,
  asideTitle,
  aside,
}: {
  heading: string;
  body: string;
  asideTitle: string;
  aside: { name: string; description: string }[];
}) {
  return (
    <section className="bg-white">
      <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:gap-14 lg:py-16`}>
        <div className="lg:col-span-7">
          <h2 className="text-[26px] font-bold leading-tight lg:text-[34px]">{heading}</h2>
          <div className="mt-5">
            <Prose>{body}</Prose>
          </div>
        </div>
        <div className="mt-8 lg:col-span-5 lg:mt-0">
          <h2 className="text-[15px] font-semibold text-(--nc-teal)">{asideTitle}</h2>
          <ul className="mt-3 border-t border-(--nc-ink)">
            {aside.map((item) => (
              <li key={item.name} className="border-b border-(--nc-line) py-4">
                <p className="text-[17px] font-bold">{item.name}</p>
                <p className="mt-1 text-[14.5px] leading-relaxed text-(--nc-muted)">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PlaceList({ title, places, note }: { title: string; places: string[]; note?: ReactNode }) {
  return (
    <section className="bg-(--nc-stone)">
      <div className={`${SECTION} py-10 lg:py-14`}>
        <h2 className="text-[24px] font-bold lg:text-[32px]">{title}</h2>
        <ul className="mt-5 columns-2 gap-x-10 text-[16.5px] font-medium lg:columns-3">
          {places.map((place) => (
            <li key={place} className="border-b border-(--nc-line) py-2.5">
              {place}
            </li>
          ))}
        </ul>
        {note && <p className="mt-5 text-[15px] text-(--nc-muted)">{note}</p>}
      </div>
    </section>
  );
}

export function RelatedLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section className="bg-white">
      <div className={`${SECTION} py-8`}>
        <h2 className="text-[15px] font-semibold text-(--nc-teal)">{title}</h2>
        <ul className="mt-2">
          {links.map((link) => (
            <li key={link.href} className="border-b border-(--nc-line)">
              <Link href={link.href} className="flex items-center justify-between py-3 text-[16px] font-semibold hover:text-(--nc-teal)">
                {link.label}
                <IconChevron className="h-4 w-4 text-(--nc-muted)" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LocalClose({
  heading,
  faqs,
  defaultCity,
  defaultCareType,
  whatsappMessage,
}: {
  heading: string;
  faqs: FaqItem[];
  defaultCity?: string;
  defaultCareType?: string;
  whatsappMessage?: string;
}) {
  return (
    <>
      <section id="faq" className="scroll-mt-24 border-t border-(--nc-line) bg-white">
        <div className={`${SECTION} py-10 lg:py-16`}>
          <h2 className="text-[24px] font-bold lg:text-[32px]">{heading}</h2>
          <div className="mt-4">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
      <section id="lead-form" className="scroll-mt-24 bg-(--nc-ink) text-white">
        <div className={`${SECTION} py-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-16`}>
          <div className="lg:col-span-5">
            <h2 className="text-[28px] font-bold leading-tight lg:text-[36px]">רוצים שנחזור אליכם?</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-white/75">
              {PROMISES.urgent}, {PROMISES.urgentQualifier}.
            </p>
            <CallButton className="mt-6" />
            <div className="mt-4">
              <WhatsAppLink tone="light" message={whatsappMessage} />
            </div>
          </div>
          <div className="mt-8 bg-white p-5 text-(--nc-ink) lg:col-span-7 lg:mt-0 lg:p-7">
            <StepLeadForm defaultCity={defaultCity} defaultCareType={defaultCareType} />
          </div>
        </div>
      </section>
      <section className="bg-(--nc-stone)">
        <div className={`${SECTION} py-8`}>
          <LicensePanel />
        </div>
      </section>
    </>
  );
}
