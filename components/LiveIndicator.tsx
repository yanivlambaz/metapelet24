type LiveIndicatorProps = {
  className?: string;
};

export default function LiveIndicator({ className = "" }: LiveIndicatorProps) {
  return (
    <div
      dir="rtl"
      className={`inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-2.5 sm:px-5 sm:py-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="text-right">
        <p className="text-sm font-bold text-green-900 sm:text-base">
          🟢 זמינים עכשיו — מטפל/ת בבית תוך עד 5 שעות
        </p>
        <p className="text-xs text-green-700 sm:text-sm">מענה אנושי מיידי, בלי מוקד אוטומטי</p>
      </div>
    </div>
  );
}
