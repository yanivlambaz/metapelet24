import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

export default function UrgencyBanner() {
  const text = `⚡ זמינות מיידית — מטפלים פנויים עכשיו באזורך | התקשר: ${PHONE_DISPLAY}`;

  return (
    <div className="urgency-banner sticky top-0 z-[60] overflow-hidden bg-[#DC2626] py-2 text-white">
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <span key={i} className="marquee-item inline-flex shrink-0 items-center px-8 text-sm font-semibold">
            {text}
            <span className="mx-8 opacity-50">•</span>
          </span>
        ))}
      </div>
      <a href={PHONE_HREF} className="sr-only">
        התקשר עכשיו {PHONE_DISPLAY}
      </a>
    </div>
  );
}
