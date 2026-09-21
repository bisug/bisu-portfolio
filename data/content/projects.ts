import type { Project } from "types";
import { kebabCase } from "@/utils/utils";

const projects: Project[] = [
  {
    id: 0,
    title: "BinaryInspector",
    desc: "Safe, local Rust CLI for inspecting ELF binaries without executing them.",
    img: "https://opengraph.githubassets.com/1/bisug/BinaryInspector",
    github: "https://github.com/bisug/BinaryInspector",
    tags: ["Rust", "CLI", "Security"],
  },
  {
    id: 1,
    title: "Paila",
    desc: "A seamless travel & community platform bridging tourists and local communities in Nepal.",
    img: "https://opengraph.githubassets.com/1/bisug/Paila",
    link: "https://paila-prototype.vercel.app",
    github: "https://github.com/bisug/Paila",
    tags: ["NextJS", "TypeScript", "TailwindCSS"],
  },
  {
    id: 2,
    title: "TG-GithubBot",
    desc: "GitHub webhook handler bot for Telegram, formatting push, deployment, and all events.",
    img: "https://opengraph.githubassets.com/1/bisug/TG-GithubBot",
    link: "https://t.me/DearGitNotifyBot",
    github: "https://github.com/bisug/TG-GithubBot",
    tags: ["Go", "Telegram", "MongoDB"],
  },
  {
    id: 3,
    title: "ninfo",
    desc: "A Linux system information CLI written in Nim that does a whole-system snapshot as JSON in a single call.",
    img: "https://opengraph.githubassets.com/1/bisug/ninfo",
    github: "https://github.com/bisug/ninfo",
    tags: ["Nim", "CLI", "Linux"],
  },
  {
    id: 4,
    title: "TG-WordGame",
    desc: "Wordle-style word game bot for Telegram — solo & multiplayer rounds, daily challenge, leaderboards.",
    img: "https://opengraph.githubassets.com/1/bisug/TG-WordGame",
    github: "https://github.com/bisug/TG-WordGame",
    tags: ["TypeScript", "Telegram", "Game"],
  },
  {
    id: 5,
    title: "Melody",
    desc: "Telegram group calls streaming bot with useful features, written in Python with Pyrogram.",
    img: "https://opengraph.githubassets.com/1/bisug/Melody",
    github: "https://github.com/bisug/Melody",
    tags: ["Python", "Telegram", "API"],
  },
  {
    id: 6,
    title: "heroku-buildpack-bun",
    desc: "Unofficial Heroku buildpack for Bun: installs official binaries, caches builds, runs bun install.",
    img: "https://opengraph.githubassets.com/1/bisug/heroku-buildpack-bun",
    link: "https://bun.sh",
    github: "https://github.com/bisug/heroku-buildpack-bun",
    tags: ["Shell", "Bun", "DevOps"],
  },
  {
    id: 7,
    title: "SnakeGame-CLI",
    desc: "A cross-platform Snake game that runs entirely in the terminal.",
    img: "https://opengraph.githubassets.com/1/bisug/SnakeGame-CLI",
    github: "https://github.com/bisug/SnakeGame-CLI",
    tags: ["C++", "CLI", "Game"],
  },
];

export const allTags: string[] = [...new Set(projects.flatMap((project) => project.tags))];

export const allKebabTags = allTags.map((tag) => kebabCase(tag));

export default projects;
