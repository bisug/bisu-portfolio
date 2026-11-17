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

  // Hide header on scroll down, show on scroll up with smooth hysteresis
  useEffect(() => {
    let lastScrollY = Math.max(
      0,
      window.pageYOffset ||
        document.documentElement.scrollTop ||
        window.scrollY ||
        0,
    );
    let ticking = false;

    const updateScrollDir = () => {
      const currentScrollY = Math.max(
        0,
        window.pageYOffset ||
          document.documentElement.scrollTop ||
          window.scrollY ||
          0,
      );

      // Always show near the top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;
      // Sensitive yet stable thresholds for mobile portrait and desktop scrolling
      if (diff > 8) {
        // Intentional scroll down: slide header away
        setIsVisible(false);
        lastScrollY = currentScrollY;
      } else if (diff < -8) {
        // Intentional scroll up: reveal header
        setIsVisible(true);
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
      if (!menuRef.current?.contains(event.target as Node))
        setIsMenuOpen(false);
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
      onFocusCapture={() => setIsVisible(true)}
      className={`sticky top-0 z-40 w-full border-b border-line bg-paper/85 backdrop-blur-md transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none ${
        shouldShow ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
        <nav className="relative" aria-label="Main navigation">
          <div className="flex w-full items-center justify-between py-4">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center gap-2 font-black text-xl tracking-tight text-ink"
            >
              <img
                className="transition-transform duration-300 hover:scale-95"
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
                    aria-current={
                      currentPage === item.title ? "page" : undefined
                    }
                    className={`rounded-lg px-3.5 py-2.5 min-h-[44px] inline-flex items-center text-sm font-medium transition-colors ${
                      currentPage === item.title
                        ? "bg-surface text-accent font-semibold"
                        : "text-muted hover:bg-surface hover:text-ink"
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
                  className={`flex h-11 items-center gap-2 rounded-xl px-3 transition-colors duration-200 ${
                    isMenuOpen
                      ? "bg-surface text-ink"
                      : "text-ink hover:bg-surface"
                  }`}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-nav-menu"
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                >
                  <MenuIcon isOpen={isMenuOpen} />
                  <span className="text-sm font-medium">Menu</span>
                </button>
                <div
                  id="mobile-nav-menu"
                  inert={!isMenuOpen}
                  className={`absolute right-0 top-full z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-card border border-line-strong bg-paper/95 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMenuOpen
                      ? "scale-100 opacity-100 translate-y-0"
                      : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                  }`}
                >
                  <ul className="p-2 space-y-0.5">
                    {routes.map((item) => (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={
                            currentPage === item.title ? "page" : undefined
                          }
                          className={`block rounded-xl px-4 py-3 min-h-[44px] text-sm font-medium transition-colors ${
                            currentPage === item.title
                              ? "bg-surface text-accent font-semibold"
                              : "text-muted hover:bg-surface hover:text-ink"
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:bisu.ghlan@gmail.com"
                    className="block border-t border-line px-5 py-3 font-mono text-xs text-muted transition-colors hover:text-ink"
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

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="relative h-6 w-6 flex items-center justify-center"
      aria-hidden="true"
    >
      <span
        className={`absolute block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
        }`}
      />
      <span
        className={`absolute block h-0.5 w-5 bg-current rounded-full transition-all duration-200 ease-out ${
          isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
        }`}
      />
      <span
        className={`absolute block h-0.5 w-5 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
        }`}
      />
    </div>
  );
}

export default Navbar;
