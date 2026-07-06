import Link from "next/link";
import SiteShell from "@/components/SiteShell";

const legalNav = [
  { href: "/privacy-policy", label: "מדיניות פרטיות" },
  { href: "/terms", label: "תנאי שימוש" },
  { href: "/accessibility", label: "הצהרת נגישות" },
];

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  currentPath: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  lastUpdated,
  currentPath,
  children,
}: LegalPageLayoutProps) {
  return (
    <SiteShell>
      <main className="overflow-x-hidden">
        <section className="gradient-hero py-12 text-white sm:py-16">
          <div className="container-main px-4 text-center sm:px-6">
            <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">{title}</h1>
            <p className="mt-3 text-sm text-blue-100">עודכן לאחרונה: {lastUpdated}</p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-main px-4 sm:px-6">
            <nav
              aria-label="עמודים משפטיים"
              className="mb-10 flex max-w-full flex-wrap justify-center gap-1.5 sm:gap-2"
            >
              {legalNav.map((item) =>
                item.href === currentPath ? (
                  <span
                    key={item.href}
                    aria-current="page"
                    className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:text-sm"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary sm:px-4 sm:text-sm"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <article className="legal-content mx-auto max-w-3xl">{children}</article>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
