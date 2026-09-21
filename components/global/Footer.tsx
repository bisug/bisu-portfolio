import Image from "next/image";
import Link from "next/link";
import { footer } from "@/data/global";

function Footer() {
  return (
    <footer className="w-full px-5 sm:px-8 py-12 mt-20 border-t border-white/10 bg-bg">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8 justify-between items-start">
        {footer.columns.map((item) => {
          return (
            <div key={item.title} className="text-left mb-5 sm:mb-0">
              <h4 className="uppercase text-fun-gray text-sm font-bold">{item.title}</h4>
              <div>
                {item.links.map((item) => {
                  return (
                    <div key={item.name} className="my-4">
                      {item.leavesWebsite ? (
                        <a
                          href={item.link}
                          target="_blank"
                          className="items-center flex"
                          rel="noopener"
                        >
                          {item.icon && (
                            <span className="pr-2 -mb-1">
                              <Image src={item.icon} width={20} height={20} alt={item.name} />
                            </span>
                          )}
                          {item.name}
                        </a>
                      ) : (
                        <Link href={item.link}>{item.name}</Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="text-center col-span-2 sm:col-auto sm:text-left pt-8 sm:mt-0 sm:pt-0 text-fun-gray border-t border-fun-pink-dark sm:border-0">
          <h4 className="uppercase text-fun-gray text-sm font-bold">Get In Touch</h4>
          <div className="space-y-2 mt-4 w-full flex items-center sm:items-start flex-col">
            <div>
              <a href="mailto:bisu.ghlan@gmail.com">bisu.ghlan@gmail.com</a>
            </div>
            <p className="text-fun-gray text-xs pt-1">Based in Bhaktapur, Nepal</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl w-full mx-auto mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center border-t border-white/10">
        <p className="text-xs text-fun-gray order-2 sm:order-1">
          Made by{" "}
          <a href="mailto:bisu.ghlan@gmail.com" className="text-fun-gray-light font-medium">
            Bisu Ghalan
          </a>
          {" — "}All rights reserved.
        </p>
        <p className="flex items-center gap-2 text-xs text-fun-gray uppercase font-bold tracking-widest order-1 sm:order-2">
          Built with
          <span className="flex items-center gap-1.5">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              width="20"
              title="React"
              alt=""
            />
            <span className="sr-only">React</span>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg"
              width="32"
              className="invert"
              title="NextJS"
              alt=""
            />
            <span className="sr-only">NextJS</span>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
              width="20"
              title="TailwindCSS"
              alt=""
            />
            <span className="sr-only">TailwindCSS</span>
          </span>
        </p>
        <a
          className="inline-flex items-center font-semibold text-xs border border-fun-pink px-4 py-2 rounded-full text-fun-pink hover:bg-fun-pink hover:text-white transition order-3"
          href="https://github.com/bisug"
          target="_blank"
          rel="noopener nooreferrer"
        >
          <Image src="/static/icons/github.svg" width={16} height={16} alt="Github Icon" />
          <span className="ml-2">Source</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
