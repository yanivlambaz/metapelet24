import UrgencyBanner from "@/components/UrgencyBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import FloatingWidgets from "@/components/FloatingWidgets";

type SiteShellProps = {
  children: React.ReactNode;
  homeHref?: string;
};

export default function SiteShell({ children, homeHref = "/" }: SiteShellProps) {
  return (
    <>
      <UrgencyBanner />
      <Header homeHref={homeHref} />
      {children}
      <Footer />
      <StickyCTA />
      <FloatingWidgets />
    </>
  );
}
