"use client";

import { useReducedMotion } from "framer-motion";

type PulsingDotProps = {
  size?: "sm" | "md";
  className?: string;
};

export default function PulsingDot({ size = "sm", className = "" }: PulsingDotProps) {
  const reducedMotion = useReducedMotion();
  const dotSize = size === "md" ? "h-3 w-3" : "h-2 w-2";
  const pingSize = size === "md" ? "h-3 w-3" : "h-2 w-2";

  return (
    <span className={`relative inline-flex shrink-0 ${className}`} aria-hidden="true">
      {!reducedMotion && (
        <>
          <span
            className={`absolute inline-flex ${pingSize} animate-ping rounded-full bg-green-400 opacity-75`}
          />
          <span
            className={`absolute inline-flex ${pingSize} animate-pulse rounded-full bg-green-400/40`}
            style={{ animationDuration: "1.5s" }}
          />
        </>
      )}
      <span className={`relative inline-flex ${dotSize} rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]`} />
    </span>
  );
}
