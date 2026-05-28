import MotionReveal from "@/components/MotionReveal";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

type CTASectionProps = {
  title: string;
  subtitle?: string;
};

export default function CTASection({ title, subtitle }: CTASectionProps) {
  return (
    <section className="section-padding gradient-hero text-white">
      <div className="container-main text-center">
        <MotionReveal>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {subtitle && <p className="mx-auto mt-4 max-w-xl text-blue-100">{subtitle}</p>}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#lead-form" className="btn-urgent w-full sm:w-auto">
              מצא מטפל עכשיו
            </a>
            <a href={PHONE_HREF} className="btn-outline w-full sm:w-auto">
              התקשר: <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
