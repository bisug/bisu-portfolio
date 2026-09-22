import Link from "next/link";
import { routes } from "@/data/global";

function PageNav({ currentPage }: { currentPage: string }) {
  const currentIndex = routes.findIndex((route) => route.title === currentPage);
  // Not a listed page (404): no nav. The 404 page has its own "Return Home" link.
  if (currentIndex === -1) return null;

  const prevRoute = routes[currentIndex - 1];
  const nextRoute = routes[currentIndex + 1];

  return (
    <nav aria-label="Page navigation" className="mt-12 grid grid-cols-2 gap-3">
      {prevRoute && <NavCard label="Previous" route={prevRoute} direction="prev" />}
      {nextRoute && (
        <NavCard
          label="Next"
          route={nextRoute}
          direction="next"
          className={prevRoute ? undefined : "col-start-2"}
        />
      )}
    </nav>
  );
}

type NavCardProps = {
  label: string;
  route: { title: string; path: string; desc: string };
  direction: "prev" | "next";
  className?: string;
};

function NavCard({ label, route, direction, className }: NavCardProps) {
  const isNext = direction === "next";
  return (
    <Link
      href={route.path}
      className={`group flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-3 transition-colors hover:border-fun-accent/60 hover:bg-white/10 ${
        isNext ? "flex-row-reverse text-right" : ""
      } ${className ?? ""}`}
    >
      <span
        className={`shrink-0 text-fun-accent transition-transform ${
          isNext ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
        }`}
      >
        <ArrowIcon direction={direction} />
      </span>
      <span className="min-w-0">
        <span className="font-mono text-[10px] uppercase tracking-widest text-fun-gray">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-bold text-white">{route.title}</span>
        <span className="mt-0.5 hidden truncate text-xs text-fun-gray sm:block">{route.desc}</span>
      </span>
    </Link>
  );
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg className="h-4 w-4" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <title>{direction === "next" ? "Next page" : "Previous page"}</title>
      <path
        d={direction === "next" ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PageNav;
