import { type ReactNode, useEffect, useRef, useState } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in ms, applied as transition-delay. */
  delay?: number;
  className?: string;
};

/* One IntersectionObserver for every Reveal on the page — a page can hold 30+
   of them, and a single shared observer is cheaper than one each. */
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function observe(el: Element, reveal: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    reveal();
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        callbacks.get(entry.target)?.();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  callbacks.set(el, reveal);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer?.unobserve(el);
  };
}

function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setIsVisible(true));
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className ?? ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export default Reveal;
