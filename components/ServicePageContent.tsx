import MotionReveal from "@/components/MotionReveal";
import type { ServiceData } from "@/lib/data/services";

const processSteps = [
  { step: "1", title: "ממלאים בקשה קצרה", text: "פרטים בסיסיים — סוג טיפול, מיקום ודחיפות." },
  { step: "2", title: "מתאימים מטפל במהירות", text: "צוות ההתאמה בוחר מטפל/ת ישראלי/ת מתאים/ה." },
  { step: "3", title: "מתחילים טיפול תוך שעות", text: "המטפל/ת מגיע/ה אליכם — בבית, בבית החולים או בכל מקום." },
];

export default function ServicePageContent({ service }: { service: ServiceData }) {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-main mx-auto max-w-4xl">
          <MotionReveal>
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{service.content}</p>
          </MotionReveal>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main">
          <MotionReveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-primary">יתרונות השירות</h2>
          </MotionReveal>
          <div className="grid gap-5 md:grid-cols-3">
            {service.benefits.map((b, i) => (
              <MotionReveal key={b.title} delay={i * 0.08}>
                <article className="card-premium h-full text-center">
                  <span className="text-3xl">{b.icon}</span>
                  <h3 className="mt-3 text-lg font-bold text-primary">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted">{b.description}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <MotionReveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-primary">איך זה עובד?</h2>
          </MotionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {processSteps.map((s, i) => (
              <MotionReveal key={s.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.text}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
