"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/MotionReveal";

const testimonials = [
  {
    quote:
      "קיבלנו מטפלת מצוינת תוך 3 שעות לאמא שלי אחרי הניתוח. שירות מדהים!",
    author: "רחל כ.",
    city: "תל אביב",
  },
  {
    quote:
      "התקשרתי בחצות וכבר בבוקר היה לנו מטפל. לא האמנתי שזה אפשרי.",
    author: "דוד מ.",
    city: "ירושלים",
  },
  {
    quote:
      "מטפלת ישראלית מקצועית, סבלנית ואמינה. ממליצה בחום לכל אחד.",
    author: "מירי ש.",
    city: "חיפה",
  },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let start = 0;
        const duration = 1800;
        const startTime = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - startTime) / duration, 1);
          start = Math.floor(progress * target);
          setCount(start);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, reducedMotion]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-primary sm:text-5xl">
      {count}+
    </span>
  );
}

export default function SocialProof() {
  return (
    <section className="section-padding border-b border-slate-100 bg-white" aria-label="המלצות לקוחות">
      <div className="container-main">
        <MotionReveal className="mb-10 text-center">
          <p className="text-sm font-semibold text-accent">לקוחות מרוצים</p>
          <div className="mt-2 flex flex-col items-center gap-1">
            <AnimatedCounter target={500} />
            <p className="text-lg font-bold text-primary">משפחות כבר בחרו בנו</p>
          </div>
        </MotionReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <MotionReveal key={item.author} delay={index * 0.1}>
              <blockquote className="card-premium h-full">
                <div className="mb-3 text-amber-400" aria-label="5 כוכבים">
                  ⭐⭐⭐⭐⭐
                </div>
                <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-4 text-sm font-semibold text-primary">
                  — {item.author}, {item.city}
                </footer>
              </blockquote>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
