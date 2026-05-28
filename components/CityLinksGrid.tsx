import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import { PHONE_HREF } from "@/lib/constants";
import { cities } from "@/lib/data/cities";

export default function CityLinksGrid() {
  return (
    <section id="cities" className="section-padding bg-surface">
      <div className="container-main">
        <MotionReveal className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">אנו משרתים את כל הארץ</h2>
          <p className="mt-3 text-muted">
            מטפלת פרטית בזמינות מיידית בכל רחבי ישראל — מהצפון ועד הנגב
          </p>
        </MotionReveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {Object.values(cities).map((city, i) => (
            <MotionReveal key={city.slug} delay={i * 0.05}>
              <Link
                href={`/${city.slug}`}
                className="card-premium block text-center font-semibold text-primary hover:text-accent"
              >
                מטפלת ב{city.name}
              </Link>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal className="mt-8 text-center">
          <p className="text-base text-slate-700 sm:text-lg">
            ועוד עשרות ערים ויישובים ברחבי הארץ — התקשר ונבדוק זמינות באזורך
          </p>
          <a
            href={PHONE_HREF}
            className="mt-5 inline-flex items-center justify-center rounded-xl border-2 border-primary px-6 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            לא רואה את עירך? התקשר עכשיו ←
          </a>
          <p className="mt-6 text-xs italic text-muted sm:text-sm">
            * השירות זמין בכל אזורי הארץ, כולל ערים קטנות, מושבים וקיבוצים
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
