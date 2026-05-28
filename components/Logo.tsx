type LogoProps = {
  variant?: "default" | "white";
  className?: string;
};

export default function Logo({ variant = "default", className = "" }: LogoProps) {
  const isWhite = variant === "white";

  const heartColor = isWhite ? "#93C5FD" : "#0EA5E9";
  const titleColor = isWhite ? "#FFFFFF" : "#1B4F8A";
  const numberColor = isWhite ? "#FFFFFF" : "#0EA5E9";
  const taglineColor = isWhite ? "#FFFFFF" : "#64748B";

  return (
    <div
      className={className}
      style={{ textAlign: "right", lineHeight: 1.2 }}
      role="img"
      aria-label="מטפלת 24 — זמינות מיידית"
    >
      <div>
        <span style={{ color: heartColor, fontSize: "18px" }}>♥ </span>
        <span style={{ color: titleColor, fontWeight: 700, fontSize: "22px" }}>מטפלת</span>
        <span style={{ color: numberColor, fontWeight: 700, fontSize: "24px" }}>24</span>
      </div>
      <div style={{ color: taglineColor, fontSize: "11px" }}>זמינות מיידית 24/7</div>
    </div>
  );
}
