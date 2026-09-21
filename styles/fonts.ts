import { Be_Vietnam_Pro, DM_Mono } from "next/font/google";

// Only the weights the design actually uses: sans 400/500/700/900 (the navbar
// wordmark is font-black), mono 400/500 (bold accents use font-medium).
export const fontSans = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-sans-v",
});

export const fontMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono-v",
});
