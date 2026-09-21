import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/global/ThemeToggle";
import { routes } from "@/data/global";

function Navbar({ currentPage }: { currentPage: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
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
            height="48"
            decoding="async"
            alt=""
          />
          <span className="flex" aria-hidden="true">
            {"Bisu".split("").map((letter) => {
              return (
                <span
                  key={letter}
                  className="hover:text-fun-accent hover:-translate-y-0.5 transition-all duration-200"
                >
                  {letter}
                </span>
              );
            })}
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="relative" ref={menuRef}>
            <button
              className={`flex h-11 w-11 items-center justify-center rounded-lg transition ${
                isMenuOpen ? "bg-white/10 text-white" : "text-gray-100 hover:bg-white/10"
              }`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <MenuIcon />
            </button>
            <div
              inert={!isMenuOpen}
              className={`absolute right-0 top-full z-50 mt-2 w-52 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-fun-navy-dark shadow-2xl shadow-black/60 transition-all duration-150 ${
                isMenuOpen
                  ? "scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
            >
              <ul className="p-2">
                {routes.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={currentPage === item.title ? "page" : undefined}
                      className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        currentPage === item.title
                          ? "bg-white/10 text-fun-accent"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:bisu.ghlan@gmail.com"
                className="block border-t border-white/10 px-6 py-3 font-mono text-xs text-fun-gray transition-colors hover:text-white"
              >
                bisu.ghlan@gmail.com
              </a>
            </div>
          </div>
        </div>
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

export default Navbar;
