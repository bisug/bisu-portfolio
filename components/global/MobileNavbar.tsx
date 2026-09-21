import Link from "next/link";
import { useEffect, useState } from "react";
import { routes } from "@/data/global";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav className="relative">
      <div className="flex w-full items-center justify-between p-5">
        <Link href="/" aria-label="Home">
          <img className="mr-3" src="/static/logos/logo_full.svg" width="160" alt="" />
        </Link>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-100 transition hover:bg-white/10 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <CrossIcon /> : <MenuIcon />}
        </button>
      </div>
      <div
        className={`fixed inset-0 top-[76px] z-50 bg-bg/95 backdrop-blur transition-opacity duration-200 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pt-4">
          {routes.map((item, index) => (
            <li
              key={item.path}
              className={`border-b border-white/10 text-lg font-semibold text-gray-100 transition-all duration-200 ${
                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? `${80 + index * 50}ms` : "0ms" }}
            >
              <Link
                href={item.path}
                className="block w-auto py-4"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5 text-gray-100" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <title>Menu</title>
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="h-5 w-5 text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
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
