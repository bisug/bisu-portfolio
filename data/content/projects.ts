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
    title: "tgcrypto-c",
    desc: "Forked pyrogram/tgcrypto because the original is unmaintained and doesn't support newer Python versions. Added AES-NI hardware acceleration (6-14x faster), reusable streaming contexts, type stubs, and wheels for Linux/macOS/Windows. Drop-in replacement for tgcrypto, works with Pyrogram and Kurigram.",
    img: "/static/projects/tgcrypto-c.webp",
    link: "https://pypi.org/project/tgcrypto-c/",
    github: "https://github.com/bisug/tgcrypto-c",
    tags: ["C", "Python", "Cryptography"],
  },
  {
    id: 3,
    title: "ninfo",
    desc: "Built to explore Nim. A Linux system information CLI that captures a whole-system snapshot as JSON in a single call — system, CPU, memory, storage, network, processes, sensors, and battery. No root, no dependencies, single static binary.",
    img: "/static/projects/ninfo.webp",
    github: "https://github.com/bisug/ninfo",
    tags: ["Nim", "CLI", "Linux"],
  },
  {
    id: 4,
    title: "heroku-buildpack-bun",
    desc: "Unofficial Heroku buildpack for Bun: installs official binaries, caches builds, and runs bun install.",
    img: "/static/projects/heroku-buildpack-bun.webp",
    // No "Live site": bun.sh is Bun's homepage, not this project.
    github: "https://github.com/bisug/heroku-buildpack-bun",
    tags: ["Shell", "Bun", "DevOps"],
  },
  {
    id: 5,
    title: "SnakeGame-CLI",
    desc: "Cross-platform classic Snake game running entirely in the terminal with zero external GUI dependencies.",
    img: "/static/projects/SnakeGame-CLI.webp",
    github: "https://github.com/bisug/SnakeGame-CLI",
    tags: ["C++", "CLI", "Game"],
  },
];

export const allTags: string[] = [
  ...new Set(projects.flatMap((project) => project.tags)),
];

export const allKebabTags = allTags.map((tag) => kebabCase(tag));

/** URL segment for a project's detail page: derived so titles stay the source of truth. */
export const projectSlug = (project: Project) => kebabCase(project.title);

/** Half-width variant of a project screenshot, for grid cards. */
export const projectThumb = (img: string) =>
  img.replace(/\.webp$/, "-600.webp");

/* Note for future readers: React 19 serialises `srcSet`/`fetchPriority` in
   camelCase (verified against react-dom 19.3). The HTML parser lowercases
   attribute names, so browsers still receive `srcset`/`fetchpriority`. */

export default projects;
