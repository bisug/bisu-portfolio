import type { Project } from "types";
import { kebabCase } from "@/utils/utils";

const projects: Project[] = [
  {
    id: 0,
    title: "BinaryInspector",
    desc: "Safe, local Rust CLI for inspecting ELF binaries, headers, and security mitigations without executing them.",
    img: "/static/projects/BinaryInspector.webp",
    github: "https://github.com/bisug/BinaryInspector",
    tags: ["Rust", "CLI", "Security"],
  },
  {
    id: 1,
    title: "Paila",
    desc: "Travel & community platform bridging tourists and local communities in Nepal, built with Next.js and Supabase.",
    img: "/static/projects/Paila.webp",
    link: "https://paila-prototype.vercel.app",
    github: "https://github.com/bisug/Paila",
    tags: ["NextJS", "TypeScript", "TailwindCSS"],
  },
  {
    id: 2,
    title: "TG-GithubBot",
    desc: "GitHub webhook handler bot for Telegram, streaming and formatting push, release, and deployment alerts.",
    img: "/static/projects/TG-GithubBot.webp",
    link: "https://t.me/DearGitNotifyBot",
    github: "https://github.com/bisug/TG-GithubBot",
    tags: ["Go", "Telegram", "MongoDB"],
  },
  {
    id: 3,
    title: "ninfo",
    desc: "Fast Linux system information CLI in Nim capturing a whole-system kernel and hardware snapshot as JSON.",
    img: "/static/projects/ninfo.webp",
    github: "https://github.com/bisug/ninfo",
    tags: ["Nim", "CLI", "Linux"],
  },
  {
    id: 4,
    title: "TG-WordGame",
    desc: "Wordle-style word game bot for Telegram with solo/multiplayer rounds, daily challenges, and leaderboards.",
    img: "/static/projects/TG-WordGame.webp",
    github: "https://github.com/bisug/TG-WordGame",
    tags: ["TypeScript", "Telegram", "Game"],
  },
  {
    id: 5,
    title: "Melody",
    desc: "Telegram group calls streaming bot for YouTube, Spotify, and Apple Music built with Python and Pyrogram.",
    img: "/static/projects/Melody.webp",
    github: "https://github.com/bisug/Melody",
    tags: ["Python", "Telegram", "API"],
  },
  {
    id: 6,
    title: "heroku-buildpack-bun",
    desc: "Unofficial Heroku buildpack for Bun: installs official binaries, caches builds, and runs bun install.",
    img: "/static/projects/heroku-buildpack-bun.webp",
    // No "Live site": bun.sh is Bun's homepage, not this project.
    github: "https://github.com/bisug/heroku-buildpack-bun",
    tags: ["Shell", "Bun", "DevOps"],
  },
  {
    id: 7,
    title: "SnakeGame-CLI",
    desc: "Cross-platform classic Snake game running entirely in the terminal with zero external GUI dependencies.",
    img: "/static/projects/SnakeGame-CLI.webp",
    github: "https://github.com/bisug/SnakeGame-CLI",
    tags: ["C++", "CLI", "Game"],
  },
];

export const allTags: string[] = [...new Set(projects.flatMap((project) => project.tags))];

export const allKebabTags = allTags.map((tag) => kebabCase(tag));

/** URL segment for a project's detail page: derived so titles stay the source of truth. */
export const projectSlug = (project: Project) => kebabCase(project.title);

/** Half-width variant of a project screenshot, for grid cards. */
export const projectThumb = (img: string) => img.replace(/\.webp$/, "-600.webp");

/* Note for future readers: React 19 serialises `srcSet`/`fetchPriority` in
   camelCase (verified against react-dom 19.3). The HTML parser lowercases
   attribute names, so browsers still receive `srcset`/`fetchpriority`. */

export default projects;
