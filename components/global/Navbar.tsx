import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/data/global";

function Navbar({ currentPage }: { currentPage: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav className="relative">
      <div className="flex w-full items-center justify-between py-4">
        <Link href="/" aria-label="Home" className="flex items-center gap-2 font-black text-xl">
          <img
            className="transition-transform duration-500 hover:rotate-[360deg] hover:scale-90"
            src="/static/logos/logo_no_text.svg"
            width="48"
            alt=""
          />
          <span className="flex" aria-hidden="true">
            {"Bisu".split("").map((letter) => {
              return (
                <span
                  key={letter}
                  className="hover:text-fun-pink hover:-translate-y-0.5 transition-all duration-200"
                >
                  {letter}
                </span>
              );
            })}
          </span>
        </Link>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-100 transition hover:bg-white/10"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <CrossIcon /> : <MenuIcon />}
        </button>
      </div>
      <div
        className={`fixed inset-0 z-50 flex flex-col bg-bg/95 backdrop-blur transition-opacity duration-200 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex w-full items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-2 font-black text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src="/static/logos/logo_no_text.svg" width="48" alt="" />
            <span aria-hidden="true">Bisu</span>
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-100 transition hover:bg-white/10"
            aria-label="Close menu"
            type="button"
            onClick={() => setIsMenuOpen(false)}
          >
            <CrossIcon />
          </button>
        </div>
        <ul className="flex flex-1 flex-col items-center justify-center gap-2 px-5">
          {routes.map((item, index) => (
            <li
              key={item.path}
              className={`transition-all duration-200 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? `${100 + index * 60}ms` : "0ms" }}
            >
              <Link
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-6 py-3 text-3xl sm:text-4xl font-bold tracking-tight transition-colors ${
                  currentPage === item.title ? "text-fun-pink" : "text-white/70 hover:text-white"
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="pb-10 text-center font-mono text-sm text-fun-gray">bisu.ghlan@gmail.com</p>
      </div>
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6 text-gray-100" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <title>Menu</title>
      <path d="M3 7H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 17H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="h-6 w-6 text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <title>Close</title>
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export default Navbar;
