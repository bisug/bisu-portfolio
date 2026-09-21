import type { CSSProperties } from "react";

type Skill = {
  title: string;
  icon: string;
  style?: CSSProperties;
  /** White monochrome SVG — inverts in light mode via .icon-invert-light. */
  mono?: boolean;
  category: string;
};

export const CATEGORY_ORDER = [
  "Languages",
  "Frameworks & Web",
  "Databases",
  "AI & Tools",
  "Systems & Ops",
] as const;

export const skills: Skill[] = [
  // Languages
  {
    title: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Languages",
  },
  {
    title: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Languages",
  },
  {
    title: "Rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
    category: "Languages",
  },
  {
    title: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    category: "Languages",
  },
  {
    title: "Markdown",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
    category: "Languages",
  },
  // Frameworks & Web
  {
    title: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    category: "Frameworks & Web",
  },
  {
    title: "Flask",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    category: "Frameworks & Web",
  },
  {
    title: "Kurigram",
    icon: "https://cdn.simpleicons.org/telegram/26a5e4",
    category: "Frameworks & Web",
  },
  {
    title: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frameworks & Web",
  },
  {
    title: "NextJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
    style: { filter: "invert(1)" },
    category: "Frameworks & Web",
  },
  {
    title: "TailwindCSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "Frameworks & Web",
  },
  {
    title: "NodeJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Frameworks & Web",
  },
  {
    title: "Bun",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg",
    category: "Frameworks & Web",
  },
  // Databases
  {
    title: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Databases",
  },
  {
    title: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    category: "Databases",
  },
  {
    title: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    category: "Databases",
  },
  { title: "Valkey", icon: "/static/icons/valkey.svg", category: "Databases" },
  {
    title: "SQLite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    category: "Databases",
  },
  // AI & Tools
  {
    title: "Claude Code",
    icon: "/static/icons/claude-code.svg",
    mono: true,
    category: "AI & Tools",
  },
  { title: "Codex", icon: "/static/icons/codex.svg", mono: true, category: "AI & Tools" },
  { title: "Copilot", icon: "/static/icons/copilot.svg", mono: true, category: "AI & Tools" },
  { title: "Zed", icon: "/static/icons/zed.svg", mono: true, category: "AI & Tools" },
  // Systems & Ops
  {
    title: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    category: "Systems & Ops",
  },
  {
    title: "Kali Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kalilinux/kalilinux-original.svg",
    category: "Systems & Ops",
  },
  {
    title: "Linux Mint",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linuxmint/linuxmint-original.svg",
    category: "Systems & Ops",
  },
  {
    title: "Windows",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows11/windows11-original.svg",
    category: "Systems & Ops",
  },
  {
    title: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    category: "Systems & Ops",
  },
  {
    title: "GitHub Actions",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
    category: "Systems & Ops",
  },
  { title: "VMware", icon: "https://cdn.simpleicons.org/vmware/607078", category: "Systems & Ops" },
  {
    title: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Systems & Ops",
  },
];
type Testimonial = {
  quote: string;
  name: string;
  job: string;
};

type EventItem = {
  title: string;
  organizer: string;
  date: string;
  venue: string;
  team: string;
  project: string;
  projectDesc?: string;
  status: string;
  link?: string;
};

type EducationItem = {
  degree: string;
  school: string;
  period: string;
  desc: string;
  logo?: string;
  link?: string;
};

export const events: EventItem[] = [
  {
    title: "Build Nepal Hackathon",
    organizer: "Mid-Valley International College (MVIC)",
    date: "1–2 August 2026",
    venue: "Mid Valley International College, Gyaneshwor, Kathmandu",
    team: "Team Bugger",
    project: "NetGuard",
    projectDesc:
      "An explainable intrusion detection and prevention platform designed for small organizations.",
    status: "Participant",
  },
  {
    title: "JunctionX Kathmandu",
    organizer: "SUMS Nepal & Cogknit",
    date: "May 29–31, 2026",
    venue: "AITM College, Khumaltar Height, Lalitpur",
    team: "Team Runtime Terrors",
    project: "Paila",
    projectDesc:
      "A seamless travel & community platform bridging tourists and local communities in Nepal.",
    status: "Participant",
    link: "https://junctionxkathmandu.com/past-events/2026",
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Computer Science — Cyber Security & Network Technology (Hons)",
    school: "Lincoln International College, Kathmandu",
    period: "Batch of Sept 2025",
    desc: "Affiliated with Lincoln University College, Malaysia. Focus: network infrastructure and defensive security.",
    logo: "/static/education/lincoln-college-logo.jpeg",
    link: "https://licnepal.edu.np/",
  },
  {
    degree: "Higher Secondary Education (+2 Management)",
    school: "Janapremi World School, Bhaktapur",
    period: "Passout 2024",
    desc: "",
    logo: "/static/education/janapremi-logo.png",
    link: "https://jws.edu.np/",
  },
];

export const testimonials: Testimonial[] = [];
