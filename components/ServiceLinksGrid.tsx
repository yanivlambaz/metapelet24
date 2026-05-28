import Link from "next/link";
import MotionReveal from "@/components/MotionReveal";
import { services } from "@/lib/data/services";

export default function ServiceLinksGrid() {
  return (
    <section id="service-pages" className="section-padding bg-white">
      <div className="container-main">
        <MotionReveal className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">השירותים שלנו</h2>
          <p className="mt-3 text-muted">פתרונות טיפול מותאמים לכל צורך</p>
        </MotionReveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.values(services).map((service, i) => (
            <MotionReveal key={service.slug} delay={i * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="card-premium block"
              >
                <h3 className="font-bold text-primary">{service.name}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </Link>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
