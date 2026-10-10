import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

function ThemeToggle() {
  const [isLight, setIsLight] = useState<boolean | null>(null);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));

    // Follow live OS theme changes until the user has picked explicitly:
    // a stored choice always wins over the system.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    function onChange(event: MediaQueryListEvent) {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem("theme");
      } catch {}
      if (stored) return;
      document.documentElement.classList.toggle("light", event.matches);
      setIsLight(event.matches);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function applyTheme(next: boolean) {
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {}
  }

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (isTransitioningRef.current) return;

    const next = !isLight;

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fallback if View Transitions API is not supported or reduced motion is requested
    if (!doc.startViewTransition || isReducedMotion) {
      applyTheme(next);
      return;
    }

    isTransitioningRef.current = true;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    try {
      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          applyTheme(next);
        });
      });

      transition.ready
        .then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ];
          const anim = document.documentElement.animate(
            {
              clipPath,
            },
            {
              duration: 350,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
          anim.onfinish = () => {
            isTransitioningRef.current = false;
          };
          anim.oncancel = () => {
            isTransitioningRef.current = false;
          };
        })
        .catch(() => {
          isTransitioningRef.current = false;
        });

      transition.finished.finally(() => {
        isTransitioningRef.current = false;
      });
    } catch {
      applyTheme(next);
      isTransitioningRef.current = false;
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-100 transition-colors duration-200 hover:bg-white/10 hover:text-fun-accent active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fun-accent"
    >
      <div className="relative h-5 w-5 flex items-center justify-center" aria-hidden="true">
        {/* Sun Icon (displayed in dark mode to prompt switching to light) */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-[transform,opacity] duration-300 ease-out will-change-transform ${
            isLight
              ? "opacity-0 rotate-90 scale-0 pointer-events-none"
              : "opacity-100 rotate-0 scale-100 text-fun-accent group-hover:rotate-45"
          }`}
        >
          <SunIcon />
        </span>

        {/* Moon Icon (displayed in light mode to prompt switching to dark) */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-[transform,opacity] duration-300 ease-out will-change-transform ${
            isLight
              ? "opacity-100 rotate-0 scale-100 text-fun-accent group-hover:-rotate-12"
              : "opacity-0 -rotate-90 scale-0 pointer-events-none"
          }`}
        >
          <MoonIcon />
        </span>
      </div>
    </button>
  );
}

function SunIcon() {
  return (
    <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <title>Sun</title>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <title>Moon</title>
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ThemeToggle;
