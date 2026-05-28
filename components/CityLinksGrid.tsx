import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import { cities } from "@/lib/data/cities";

export default function CityLinksGrid() {
  return (
    <section id="cities" className="section-padding bg-surface">
      <div className="container-main">
        <MotionReveal className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">ערים שאנו משרתים</h2>
          <p className="mt-3 text-muted">מטפלת פרטית בזמינות מיידית בכל רחבי הארץ</p>
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
      </div>
    </section>
  );
}
