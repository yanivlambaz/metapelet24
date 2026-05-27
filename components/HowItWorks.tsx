import MotionReveal from "@/components/MotionReveal";

const steps = [
  {
    number: "1",
    title: "ממלאים בקשה קצרה",
    description:
      "משאירים פרטים בסיסיים — שם, טלפון, עיר וסוג הטיפול הנדרש. לוקח פחות מדקה.",
  },
  {
    number: "2",
    title: "מתאימים מטפל במהירות",
    description:
      "צוות ההתאמה שלנו בוחר מטפל/ת ישראלי/ת מתאים/ה לפי הצרכים, המיקום והדחיפות.",
  },
  {
    number: "3",
    title: "מתחילים טיפול תוך שעות",
    description:
      "המטפל/ת מגיע/ה אליכם — לבית, לבית החולים או לכל מקום שתזדקקו. זמינות 24/7.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-surface">
      <div className="container-main">
        <MotionReveal className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
            תהליך פשוט
          </span>
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            איך זה עובד?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            שלושה שלבים פשוטים — מהבקשה ועד לתחילת הטיפול
          </p>
        </MotionReveal>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div className="absolute top-16 hidden h-0.5 w-full bg-gradient-to-l from-accent/40 via-primary/20 to-accent/40 md:block" aria-hidden="true" />

          {steps.map((step, index) => (
            <MotionReveal key={step.number} delay={index * 0.12}>
              <div className="relative text-center">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white shadow-lg shadow-primary/25">
                  {step.number}
                  <div className="absolute -inset-1 rounded-2xl bg-accent/20 blur-sm" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-primary">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={0.3}>
          <div className="mt-12 text-center">
            <a href="#lead-form" className="btn-primary">
              התחילו עכשיו — זה חינם
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
