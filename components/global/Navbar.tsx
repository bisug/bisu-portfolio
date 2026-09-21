import Link from "next/link";
import { routes } from "@/data/global";

function Navbar({ currentPage }: { currentPage: string }) {
  return (
    <nav className="flex items-center justify-between py-2">
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
      <ul className="flex items-center gap-2">
        {routes.map((item) => {
          return (
            <li
              key={item.path}
              className={`list-none rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                currentPage === item.title
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Link href={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
