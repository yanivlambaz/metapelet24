import type { ReactNode } from "react";

type IconProps = {
  className?: string;
  stroke?: number;
};

function Line({ className, stroke = 1.6, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconPhone(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.5 1.5C10.5 20.5 3.5 13.5 3.5 5.5A1.5 1.5 0 0 1 5 4Z" />
    </Line>
  );
}

export function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 6.66 2.76 9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.42 9.42M20.07 3.98A11.3 11.3 0 0 0 12.05.66C5.8.66.71 5.75.7 12.01c0 2 .52 3.95 1.52 5.67L.6 23.6l6.04-1.58a11.3 11.3 0 0 0 5.41 1.38h.01c6.25 0 11.34-5.09 11.35-11.35a11.28 11.28 0 0 0-3.33-8.03" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <Line {...p}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </Line>
  );
}

export function IconDocument(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M6 3.5h8.5L19 8v12.5H6Z" />
      <path d="M14 3.5V8.5h5" />
      <path d="M9 13h7M9 16.5h5" />
    </Line>
  );
}

export function IconClock(p: IconProps) {
  return (
    <Line {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Line>
  );
}

export function IconPerson(p: IconProps) {
  return (
    <Line {...p}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6" />
    </Line>
  );
}

export function IconMap(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Line>
  );
}

export function IconHome(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M4 10.5 12 4l8 6.5V20H4Z" />
      <path d="M10 20v-5h4v5" />
    </Line>
  );
}

export function IconBed(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M3.5 18.5V6M3.5 14h17v4.5M20.5 14v-2.5a2.5 2.5 0 0 0-2.5-2.5h-7v5" />
      <circle cx="7" cy="11" r="1.8" />
    </Line>
  );
}

export function IconMoon(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />
    </Line>
  );
}

export function IconHands(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M4 13.5 8.5 9a2 2 0 0 1 2.8 0L13 10.7" />
      <path d="m8 16 2 2a2 2 0 0 0 2.8 0L20 10.8" />
      <path d="M4 13.5 8 17.5M13 10.7l2.2-2.2a2 2 0 0 1 2.8 0L20 10.8" />
    </Line>
  );
}

export function IconRefresh(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M19 12a7 7 0 0 1-12.2 4.7M5 12a7 7 0 0 1 12.2-4.7" />
      <path d="M17.5 3.5v4h-4M6.5 20.5v-4h4" />
    </Line>
  );
}

export function IconAlert(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M12 3.5 21 19.5H3Z" />
      <path d="M12 10v4.5M12 16.5v1" />
    </Line>
  );
}

export function IconExternal(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M14 4.5h5.5V10M19.5 4.5 11 13M17 14v5.5H4.5V7H10" />
    </Line>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <Line {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Line>
  );
}

export function IconClose(p: IconProps) {
  return (
    <Line {...p}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Line>
  );
}

export function IconChevron(p: IconProps) {
  return (
    <Line {...p}>
      <path d="m15 6-6 6 6 6" />
    </Line>
  );
}
