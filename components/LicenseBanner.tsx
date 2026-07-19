export const LICENSE_URL =
  "https://www.gov.il/he/Departments/DynamicCollectors/contractor-database?skip=0&companyname=%D7%A1%D7%A7%D7%90%D7%99%20%D7%A4%D7%99%D7%A4%D7%9C";

export const LICENSE_NUMBER = "3203";

export default function LicenseBanner() {
  return (
    <div
      dir="rtl"
      className="relative z-20 mt-4 border-y border-amber-200 bg-amber-50 px-4 py-3 text-amber-900"
      role="note"
      aria-label="הודעה על רישיון השמה"
    >
      <div className="container-main">
        <p className="text-center text-sm leading-relaxed sm:text-base">
          <span className="me-1.5" aria-hidden="true">
            ⚠️
          </span>
          היזהרו מחברות הפועלות ללא רישיון ופיקוח! החברה שלנו מפוקחת ובעלת רישיון השמה (לשכה
          פרטית) ממשרד העבודה, מס&apos; 3203.{" "}
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-950 underline decoration-amber-400 underline-offset-2 transition-colors hover:text-amber-800"
          >
            לצפייה ברישיון לחצו כאן
          </a>
        </p>
      </div>
    </div>
  );
}
