import Link from "next/link";
import { useEffect, useState } from "react";
import Page from "@/components/utility/Page";
import { routes } from "@/data/global";

const TERMINAL_LINES = [
  { text: "$ bisu --locate requested-page", accent: false },
  { text: "error: 404 — path not found in this universe.", accent: true },
  { text: "$ bisu --suggest --limit 3", accent: false },
];

function useTypewriter(target: string, start: boolean, speed = 34) {
  const [shown, setShown] = useState(start ? "" : target);
  useEffect(() => {
    if (!start) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(target);
      return;
    }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [target, start, speed]);
  return shown;
}

function Page404() {
  const line1 = useTypewriter(TERMINAL_LINES[0].text, true, 36);
  const line1Done = line1.length === TERMINAL_LINES[0].text.length;
  const line2 = useTypewriter(TERMINAL_LINES[1].text, line1Done, 26);
  const line2Done = line2.length === TERMINAL_LINES[1].text.length;
  const line3 = useTypewriter(TERMINAL_LINES[2].text, line2Done, 36);
  const line3Done = line3.length === TERMINAL_LINES[2].text.length;

  const suggestions = routes.filter((r) => r.title !== "Home").slice(0, 3);

  return (
    <Page
      currentPage="404"
      meta={{
        desc: "That page is missing. Head back home to see my work.",
        noindex: true,
      }}
    >
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center py-20 text-center">
        <p
          aria-hidden="true"
          className="error-glitch font-mono font-bold text-white text-7xl sm:text-8xl"
          data-text="404"
        >
          404
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-fun-gray">
          lost packet · route not found
        </p>

        <div
          aria-hidden="true"
          className="mt-10 w-full max-w-md rounded-xl border border-white/10 bg-white/[0.02] p-5 text-left font-mono text-xs sm:text-sm"
        >
          <p className="text-fun-gray-light">
            {line1}
            {!line1Done && <span className="terminal-caret" />}
          </p>
          {line1Done && (
            <p className="mt-2 text-fun-accent">
              {line2}
              {!line2Done && <span className="terminal-caret" />}
            </p>
          )}
          {line2Done && (
            <p className="mt-2 text-fun-gray-light">
              {line3}
              {!line3Done && <span className="terminal-caret" />}
            </p>
          )}
        </div>

        <p className="mt-8 text-fun-gray sm:text-lg">
          Sorry, that page wandered off.{" "}
          <strong className="text-white font-medium">Here&apos;s where to go:</strong>
        </p>

        <div
          className={`mt-6 flex flex-wrap items-center justify-center gap-3 transition-opacity duration-500 ${
            line3Done ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {suggestions.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              tabIndex={line3Done ? undefined : -1}
              className="rounded-full border border-white/20 px-5 py-2 text-sm text-fun-gray-light transition hover:border-fun-accent hover:text-white"
            >
              {route.title}
            </Link>
          ))}
          <Link
            href="/"
            tabIndex={line3Done ? undefined : -1}
            className="rounded-full border border-fun-accent bg-fun-navy-dark px-6 py-2 text-sm font-bold text-fun-accent transition-colors hover:bg-fun-accent hover:text-fun-navy-darkest"
          >
            Return Home
          </Link>
        </div>
      </div>
    </Page>
  );
}

export default Page404;
