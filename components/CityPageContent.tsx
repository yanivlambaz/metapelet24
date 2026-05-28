import MotionReveal from "@/components/MotionReveal";
import type { CityData } from "@/lib/data/cities";

export default function CityPageContent({ city }: { city: CityData }) {
  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-main mx-auto max-w-4xl">
          <MotionReveal>
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{city.intro}</p>
          </MotionReveal>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main">
          <MotionReveal className="mb-8">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              בתי חולים ב{city.name} שאנו משרתים
            </h2>
          </MotionReveal>
          <div className="grid gap-5 md:grid-cols-3">
            {city.hospitals.map((hospital, i) => (
              <MotionReveal key={hospital.name} delay={i * 0.08}>
                <article className="card-premium h-full">
                  <h3 className="text-lg font-bold text-primary">{hospital.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{hospital.description}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-main">
          <MotionReveal className="mb-8">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              אזורים ב{city.name} שאנו מכסים
            </h2>
          </MotionReveal>
          <MotionReveal>
            <div className="flex flex-wrap gap-3">
              {city.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                >
                  {n}
                </span>
              ))}
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
