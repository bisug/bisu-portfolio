import type { CSSProperties } from "react";

type Skill = {
  title: string;
  icon: string;
  style?: CSSProperties;
  /** White monochrome SVG — inverts in light mode via .icon-invert-light. */
  mono?: boolean;
  /** Black SVG — inverts in dark mode only via .icon-invert-dark. */
  invertDark?: boolean;
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
    icon: "/static/icons/tech/python.svg",
    category: "Languages",
  },
  {
    title: "TypeScript",
    icon: "/static/icons/tech/typescript.svg",
    category: "Languages",
  },
  {
    title: "Rust",
    icon: "/static/icons/tech/rust.svg",
    category: "Languages",
  },
  {
    title: "Go",
    icon: "/static/icons/tech/go.svg",
    category: "Languages",
  },
  {
    title: "Markdown",
    icon: "/static/icons/tech/markdown.svg",
    category: "Languages",
  },
  // Frameworks & Web
  {
    title: "FastAPI",
    icon: "/static/icons/tech/fastapi.svg",
    category: "Frameworks & Web",
  },
  {
    title: "Flask",
    icon: "/static/icons/tech/flask.svg",
    category: "Frameworks & Web",
  },
  {
    title: "Kurigram",
    icon: "/static/icons/tech/kurigram.svg",
    category: "Frameworks & Web",
  },
  {
    title: "React",
    icon: "/static/icons/tech/react.svg",
    category: "Frameworks & Web",
  },
  {
    title: "NextJS",
    icon: "/static/icons/tech/nextjs.svg",
    invertDark: true,
    category: "Frameworks & Web",
  },
  {
    title: "TailwindCSS",
    icon: "/static/icons/tech/tailwindcss.svg",
    category: "Frameworks & Web",
  },
  {
    title: "NodeJS",
    icon: "/static/icons/tech/nodejs.svg",
    category: "Frameworks & Web",
  },
  {
    title: "Bun",
    icon: "/static/icons/tech/bun.svg",
    category: "Frameworks & Web",
  },
  // Databases
  {
    title: "MongoDB",
    icon: "/static/icons/tech/mongodb.svg",
    category: "Databases",
  },
  {
    title: "PostgreSQL",
    icon: "/static/icons/tech/postgresql.svg",
    category: "Databases",
  },
  {
    title: "Redis",
    icon: "/static/icons/tech/redis.svg",
    category: "Databases",
  },
  { title: "Valkey", icon: "/static/icons/valkey.svg", category: "Databases" },
  {
    title: "SQLite",
    icon: "/static/icons/tech/sqlite.svg",
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
    // 194KB of Tux paths as SVG; a 128px WebP is 4KB at the 36px it renders.
    icon: "/static/icons/tech/linux.webp",
    category: "Systems & Ops",
  },
  {
    title: "Kali Linux",
    icon: "/static/icons/tech/kali-linux.svg",
    category: "Systems & Ops",
  },
  {
    title: "Linux Mint",
    icon: "/static/icons/tech/linux-mint.svg",
    category: "Systems & Ops",
  },
  {
    title: "Windows",
    icon: "/static/icons/tech/windows.svg",
    category: "Systems & Ops",
  },
  {
    title: "Docker",
    icon: "/static/icons/tech/docker.svg",
    category: "Systems & Ops",
  },
  {
    title: "GitHub Actions",
    icon: "/static/icons/tech/github-actions.svg",
    category: "Systems & Ops",
  },
  { title: "VMware", icon: "/static/icons/tech/vmware.svg", category: "Systems & Ops" },
  {
    title: "Git",
    icon: "/static/icons/tech/git.svg",
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
    logo: "/static/education/lincoln-college-logo.webp",
    link: "https://licnepal.edu.np/",
  },
  {
    degree: "Higher Secondary Education (+2 Management)",
    school: "Janapremi World School, Bhaktapur",
    period: "Passout 2024",
    desc: "",
    logo: "/static/education/janapremi-logo.webp",
    link: "https://jws.edu.np/",
  },
];

export const testimonials: Testimonial[] = [];
