import Image from "next/image";
import { socials } from "@/data/global";

function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-2">
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
  );
}

export default SocialIcons;
