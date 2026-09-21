import type { CSSProperties } from "react";

type Skill = {
  title: string;
  icon: string;
  style?: CSSProperties;
};
type Testimonial = {
  quote: string;
  name: string;
  job: string;
};

export const skills: Skill[] = [
  {
    title: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    title: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    title: "Rust",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  {
    title: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    title: "NextJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
    style: { filter: "invert(1)" },
  },
  {
    title: "TailwindCSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    title: "NodeJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    title: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    title: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    title: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    title: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    title: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
];

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
  },
  {
    degree: "Higher Secondary Education (+2 Management)",
    school: "Janapremi World School, Bhaktapur",
    period: "2022 — 2024",
    desc: "",
    logo: "/static/education/janapremi-logo.png",
  },
];

export const testimonials: Testimonial[] = [];
