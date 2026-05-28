"use client";

import PulsingDot from "@/components/PulsingDot";

type LiveIndicatorProps = {
  className?: string;
};

export default function LiveIndicator({ className = "" }: LiveIndicatorProps) {
  return (
    <div
      dir="rtl"
      className={`inline-flex items-center gap-3 rounded-full border border-green-200 bg-green-50 px-4 py-2.5 sm:px-5 sm:py-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <PulsingDot size="md" />
      <div className="text-right">
        <p className="text-sm font-bold text-green-900 sm:text-base">
          נציג פנוי עכשיו — זמין לשיחה
        </p>
        <p className="text-xs text-green-700 sm:text-sm">ממוצע זמן תגובה: 47 דקות</p>
      </div>
    </div>
  );
}
