"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  buildWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_HREF,
} from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons";
import LiveIndicator from "@/components/LiveIndicator";
import PulsingDot from "@/components/PulsingDot";

const HERO_IMAGE =
  "/hero-caregiver.png";

function FloatingParticles() {
  const reducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 4 + p.delay, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="hero-premium relative overflow-hidden text-white">
      <FloatingParticles />

      {/* Diagonal decorative shape */}
      <div
        className="pointer-events-none absolute -left-32 top-0 hidden h-full w-1/2 skew-x-[-12deg] bg-white/5 lg:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rotate-12 rounded-[3rem] bg-accent/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="container-main section-padding relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT — content */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mb-4 inline-flex items-center gap-2.5 rounded-full border border-green-400/40 bg-green-500/20 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(34,197,94,0.25)] ${
                reducedMotion ? "" : "animate-availability-badge"
              }`}
            >
              <PulsingDot size="md" />
              3 מטפלים זמינים עכשיו באזורך
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm"
            >
              ממוצע זמן שליחת מטפלת:{" "}
              <span className="font-bold text-accent">4 שעות</span>
            </motion.div>

            <motion.h1
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              מטפלים פרטיים ישראלים{" "}
              <span className="gradient-text">בזמינות מיידית 24/7</span>
            </motion.h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg lg:mx-0"
            >
              התאמה מהירה של מטפל מקצועי לבית, בית חולים ומצבים דחופים — שירות פרימיום, אמין ומיידי.
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <a href="#lead-form" className="btn-urgent w-full sm:w-auto">
                מצא מטפל עכשיו
              </a>
              <a
                href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-5 w-5" />
                שלח WhatsApp
              </a>
              <a href={PHONE_HREF} className="btn-outline hidden sm:inline-flex">
                התקשר עכשיו
              </a>
            </motion.div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-5 flex justify-center lg:justify-start"
            >
              <LiveIndicator />
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/20 shadow-xl sm:aspect-[5/6]">
              <img
                src={HERO_IMAGE}
                alt="מטפלת פרטית מקצועית ומחייכת"
                width={600}
                height={750}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D6B]/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md lg:block">
              <p className="text-sm font-bold">✓ מטפלים מאומתים</p>
              <p className="text-xs text-blue-100">זמינות 24/7</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
