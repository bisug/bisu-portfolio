import "@/styles/main.css";

import type { AppProps } from "next/app";
import DoodleBackground from "@/components/utility/DoodleBackground";
import { fontMono, fontSans } from "@/styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fontSans.variable} ${fontMono.variable} relative isolate`}>
      <DoodleBackground />
      <Component {...pageProps} />
    </div>
  );
}
