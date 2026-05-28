"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

type AnimatedCounterProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
};

export default function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  className,
  duration = 2000,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const value = useCountUp(ref, { end, duration, enabled: !reducedMotion });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reducedMotion ? end : value}
      {suffix}
    </span>
  );
}
