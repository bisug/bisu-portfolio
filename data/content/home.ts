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

type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  desc: string;
  tags: string[];
};

type EducationItem = {
  degree: string;
  school: string;
  period: string;
  desc: string;
  logo?: string;
  link?: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Lead Developer",
    org: "Seal Your Waifu",
    period: "2026 — Present",
    desc: "Large-scale Telegram game bot + mini-app. High-concurrency state for thousands of players.",
    tags: ["FastAPI", "React", "Redis", "MongoDB"],
  },
  {
    role: "Creator",
    org: "Sumi Vibes AI",
    period: "2025",
    desc: "Gemini-powered Telegram chatbot. Reached 3,000+ users with games and group-management tools.",
    tags: ["Python", "Pyrogram", "Gemini AI", "MongoDB"],
  },
  {
    role: "Developer",
    org: "Moco Bot",
    period: "2025",
    desc: "Free Fire stats bot on third-party APIs — player info, stats, booster. Peaked at 5,000+ users.",
    tags: ["Python", "API Orchestration", "Reverse Engineering"],
  },
  {
    role: "Participant",
    org: "JunctionX Kathmandu",
    period: "2026",
    desc: "Hospitality & Heritage track with team Runtime Terrors. Co-built the Paila prototype.",
    tags: ["Next.js", "TypeScript", "Supabase", "OpenAI"],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Computer Science — Cyber Security & Network Technology (Hons)",
    school: "Lincoln International College, Kathmandu",
    period: "2025 — Present",
    desc: "Affiliated with Lincoln University College, Malaysia. Focus: network infrastructure and defensive security.",
    logo: "/static/education/lincoln-college-logo.jpeg",
    link: "https://licnepal.edu.np/",
  },
  {
    degree: "Higher Secondary Education (+2 Management)",
    school: "Janapremi World School, Bhaktapur",
    period: "2022 — 2024",
    desc: "",
    logo: "/static/education/janapremi-logo.png",
    link: "https://jws.edu.np/",
  },
];

export const testimonials: Testimonial[] = [];
