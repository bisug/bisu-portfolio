export const SITE_URL = "https://bisu.com.np";

type Route = {
  title: string;
  path: string;
  desc: string;
};

type SocialLink = {
  name: string;
  link: string;
  icon: string;
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
    name: "Website",
    link: "https://bisu.com.np",
    icon: "/static/icons/external-link.svg",
  },
  {
    name: "Email",
    link: "mailto:bisu.ghlan@gmail.com",
    icon: "/static/icons/mail-f.svg",
  },
];
