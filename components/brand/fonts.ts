import { IBM_Plex_Sans_Hebrew } from "next/font/google";

export const brandFont = IBM_Plex_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-brand",
  display: "swap",
});
