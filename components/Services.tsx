"use client";

import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";

const services = [
  {
    title: "מטפל לבית חולים",
    description: "ליווי מקצועי ורגיש בבית החולים, 24 שעות ביממה.",
    href: "/services/hospital-caregiver",
    icon: "🏥",
  },
  {
    title: "מטפלת ללילה",
    description: "שמירה על שקט הלילה והשגחה רציפה על יקיריכם.",
    href: "/services/night-caregiver",
    icon: "🌙",
  },
  {
    title: "מטפל אחרי ניתוח",
    description: "שיקום והחלמה בבית עם מטפל מנוסה ומסור.",
    href: "/services/post-surgery",
    icon: "⚕️",
  },
  {
    title: "טיפול בקשישים",
    description: "טיפול מכבד ואישי לקשישים בביתם, בקצב המתאים.",
    href: "/services/elderly",
    icon: "👴",
  },
  {
    title: "טיפול בדמנציה",
    description: "מטפלים מנוסים באלצהיימר ודמנציה — סבלנות ומקצועיות.",
    href: "/services/dementia",
    icon: "🧠",
  },
  {
    title: "השגחה פרטית",
    description: "השגחה צמודה ומותאמת אישית לכל מצב וצורך.",
    href: "#lead-form",
    icon: "🛡️",
  },
  {
    title: "מטפלים 24/7",
    description: "זמינות מלאה סביב השעון — גם בלילות, סופ״ש וחגים.",
    href: "#lead-form",
    icon: "⚡",
  },
  {
    title: "מטפלים ישראלים",
    description: "מטפלים דוברי עברית, מנוסים ומאומתים מכל רחבי הארץ.",
    href: "#lead-form",
    icon: "🇮🇱",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-main">
        <MotionReveal className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            השירותים שלנו
          </span>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            פתרונות טיפול מותאמים לכל צורך
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            מטפלים מקצועיים ומנוסים לכל סוגי הטיפול — בבית, בבית החולים ובמצבים דחופים
          </p>
        </MotionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <MotionReveal key={service.title} delay={index * 0.06}>
              <article className="service-card group flex h-full flex-col">
                <div className="icon-gradient mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-md">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-primary">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors group-hover:text-primary"
                >
                  קרא עוד ←
                </Link>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
