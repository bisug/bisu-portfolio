export const SITE_URL = "https://bisu.com.np";

export const SITE_NAME = "Bisu Ghalan";

/** Single-sentence entity description, reused by structured data and llms.txt. */
export const SITE_DESC =
  "Bisu Ghalan is a computer science student and security researcher from Bhaktapur, Nepal who builds Telegram bots, command-line tools, and full-stack web apps.";

type Route = {
  title: string;
  path: string;
  desc: string;
};

type SocialLink = {
  name: string;
  link: string;
  icon: string;
  /** Accent-cyan icon — darkens (not inverts) in light mode. */
  accentIcon?: boolean;
};

export const routes: Route[] = [
  {
    title: "Home",
    path: "/",
    desc: "Start here — intro & contact",
  },
  {
    title: "Projects",
    path: "/projects",
    desc: "CLI tools, bots & games I've built",
  },
  {
    title: "Experience",
    path: "/experience",
    desc: "Roles, teams & hackathons",
  },
  {
    title: "Education",
    path: "/education",
    desc: "Degrees & schools",
  },
  {
    title: "Tech Stack",
    path: "/tech-stack",
    desc: "Languages & tools I use",
  },
  {
    title: "Contact",
    path: "/contact",
    desc: "Email & socials — say hello",
  },
];

export const socials: SocialLink[] = [
  {
    name: "GitHub",
    link: "https://github.com/bisug",
    icon: "/static/icons/github-f.svg",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/bisug/",
    icon: "/static/icons/linkedin-f.svg",
  },
  {
    name: "Email",
    link: "mailto:bisu.ghlan@gmail.com",
    icon: "/static/icons/mail-f.svg",
  },
];
