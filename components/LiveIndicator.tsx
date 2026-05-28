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
          🟢 מטפלת זמינה עכשיו — התאמה תוך שעות
        </p>
        <p className="text-xs text-green-700 sm:text-sm">ממוצע זמן אספקת מטפלת: 3-5 שעות</p>
      </div>
    </div>
  );
}
