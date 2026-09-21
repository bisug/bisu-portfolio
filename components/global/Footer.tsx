import Image from "next/image";
import { socials } from "@/data/global";

function Footer() {
  return (
    <footer className="w-full px-5 sm:px-8 py-6 mt-20 border-t border-white/10 bg-bg">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener"
              aria-label={item.name}
              className="p-2.5 opacity-70 transition hover:-translate-y-0.5 hover:opacity-100"
            >
              <Image
                src={item.icon}
                width={20}
                height={20}
                alt=""
                aria-hidden="true"
                className={item.accentIcon ? "icon-accent-light" : "icon-invert-light"}
              />
            </a>
          ))}
        </div>
        <div className="text-center sm:text-right text-sm text-fun-gray">
          <a href="mailto:bisu.ghlan@gmail.com" className="hover:text-white transition-colors">
            bisu.ghlan@gmail.com
          </a>
          <p className="text-xs pt-1">Based in Bhaktapur, Nepal</p>
        </div>
      </div>
      <div className="max-w-5xl w-full mx-auto mt-6 pt-3 flex items-center justify-center text-center border-t border-white/10">
        <p className="text-xs text-fun-gray">
          Made by{" "}
          <a href="mailto:bisu.ghlan@gmail.com" className="text-fun-gray-light font-medium">
            Bisu Ghalan
          </a>
          {" — "}All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
