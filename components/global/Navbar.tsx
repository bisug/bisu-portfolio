import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/global/ThemeToggle";
import { routes } from "@/data/global";

function Navbar({ currentPage }: { currentPage: string }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Reset visibility and close menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsVisible(true);
      setIsMenuOpen(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;

      // Always show near the top of the page
      if (currentScrollY <= 60) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      // Check bounds to avoid bounce effects at the bottom of the page
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      if (currentScrollY >= maxScrollY - 20) {
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;
      // Minimum delta to filter out minor touch twitches or scroll bounce
      if (Math.abs(diff) > 8) {
        if (diff > 0) {
          // Scrolling down: hide header
          setIsVisible(false);
        } else {
          // Scrolling up: show header
          setIsVisible(true);
        }
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      // Return focus to the toggle so keyboard users aren't dropped to body
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const shouldShow = isVisible || isMenuOpen;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-white/5 bg-bg/80 backdrop-blur-md transition-transform duration-300 ease-in-out focus-within:translate-y-0 motion-reduce:transition-none ${
        shouldShow ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <nav className="relative" aria-label="Main navigation">
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
            <div className="flex items-center gap-2">
              {/* Desktop navigation */}
              <div className="hidden md:flex items-center gap-1.5 mr-1">
                {routes.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    aria-current={currentPage === item.title ? "page" : undefined}
                    className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                      currentPage === item.title
                        ? "bg-white/10 text-fun-accent font-semibold"
                        : "text-white/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              <ThemeToggle />

              {/* Mobile navigation toggle */}
              <div className="relative md:hidden" ref={menuRef}>
                <button
                  ref={buttonRef}
                  className={`flex h-11 w-11 items-center justify-center rounded-lg transition ${
                    isMenuOpen ? "bg-white/10 text-white" : "text-gray-100 hover:bg-white/10"
                  }`}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  <MenuIcon />
                </button>
                <div
                  inert={!isMenuOpen}
                  className={`absolute right-0 top-full z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-white/15 bg-fun-navy-dark/95 backdrop-blur-xl shadow-2xl shadow-black/70 transition-all duration-150 ${
                    isMenuOpen
                      ? "scale-100 opacity-100"
                      : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                  }`}
                >
                  <ul className="p-2 space-y-0.5">
                    {routes.map((item) => (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={currentPage === item.title ? "page" : undefined}
                          className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                            currentPage === item.title
                              ? "bg-white/10 text-fun-accent font-semibold"
                              : "text-white/75 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:bisu.ghlan@gmail.com"
                    className="block border-t border-white/10 px-5 py-3 font-mono text-xs text-fun-gray-light transition-colors hover:text-white"
                  >
                    bisu.ghlan@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
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
