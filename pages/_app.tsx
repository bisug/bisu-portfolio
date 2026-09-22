import "@/styles/main.css";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChatAssistant from "@/components/global/ChatAssistant";
import DoodleBackground from "@/components/utility/DoodleBackground";
import { fontMono, fontSans } from "@/styles/fonts";

/* Thin cyan progress bar during route transitions: instant pages never show
   it (150ms grace), slow networks get feedback instead of a dead click. */
function RouteProgress() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      timer = setTimeout(() => setActive(true), 150);
    };
    const done = () => {
      clearTimeout(timer);
      setActive(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", done);
    router.events.on("routeChangeError", done);
    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", done);
      router.events.off("routeChangeError", done);
    };
  }, [router]);

  if (!active) return null;
  return <div className="route-progress" aria-hidden="true" />;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${fontSans.variable} ${fontMono.variable} relative isolate`}>
      <RouteProgress />
      <DoodleBackground />
      <Component {...pageProps} />
      <ChatAssistant />
    </div>
  );
}
