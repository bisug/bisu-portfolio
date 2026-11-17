import Image from "next/image";
import { socials } from "@/data/global";

function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-2">
      {socials.map((item) => {
        const isEmail = item.link.startsWith("mailto:");
        return (
          <a
            key={item.name}
            href={item.link}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            aria-label={item.name}
            title={item.name}
            className="flex h-11 w-11 items-center justify-center rounded-lg transition hover:-translate-y-0.5 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Image
              src={item.icon}
              width={20}
              height={20}
              alt=""
              aria-hidden="true"
              className={item.accentIcon ? "icon-accent-light" : ""}
            />
          </a>
        );
      })}
    </div>
  );
}

export default SocialIcons;
