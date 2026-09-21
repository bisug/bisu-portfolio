import { Be_Vietnam_Pro, DM_Mono } from "next/font/google";

// Only the weights the design actually uses: 400/500/700. Anything else is
// synthesised by the browser but still costs a preloaded font file.
export const fontSans = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans-v",
});

export const fontMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-mono-v",
});
