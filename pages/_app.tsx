import "@/styles/main.css";

import type { AppProps } from "next/app";
import { fontMono, fontSans } from "@/styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fontSans.variable} ${fontMono.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
