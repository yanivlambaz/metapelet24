"use client";

import { RefObject, useEffect, useRef, useState } from "react";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

type UseCountUpOptions = {
  end: number;
  duration?: number;
  enabled?: boolean;
};

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  { end, duration = 2000, enabled = true }: UseCountUpOptions
) {
  const [value, setValue] = useState(enabled ? 0 : end);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setValue(end);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          setValue(Math.floor(eased * end));

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setValue(end);
          }
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, end, duration, enabled]);

  return value;
}
