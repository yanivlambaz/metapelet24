import Link from "next/link";
import { BrandFrame } from "@/components/brand/BrandLocal";

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
    <BrandFrame>
      <main>
        <section className="border-b border-(--nc-line)">
          <div className="mx-auto max-w-3xl px-5 py-8 lg:px-8 lg:py-12">
            <h1 className="text-[30px] font-bold leading-tight lg:text-[40px]">{title}</h1>
            <p className="mt-2 text-[14px] text-(--nc-muted)">עודכן לאחרונה: {lastUpdated}</p>
          </div>
        </section>
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-5 py-8 lg:px-8 lg:py-12">
            <nav aria-label="עמודים משפטיים" className="mb-8 flex flex-wrap gap-x-5 gap-y-2 border-b border-(--nc-line) pb-4 text-[14px]">
              {legalNav.map((item) =>
                item.href === currentPath ? (
                  <span key={item.href} aria-current="page" className="font-bold text-(--nc-ink)">
                    {item.label}
                  </span>
                ) : (
                  <Link key={item.href} href={item.href} className="font-medium text-(--nc-muted) underline decoration-(--nc-line) underline-offset-4 hover:text-(--nc-ink)">
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <article className="legal-content">{children}</article>
          </div>
        </section>
      </main>
    </BrandFrame>
  );
}
