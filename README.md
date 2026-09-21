# [bisu.com.np](https://bisu.com.np)

Portfolio of **Bisu Ghalan** — CS student and security researcher from Nepal. Built with Next.js (pages router), React, Tailwind CSS v4, TypeScript, and Biome, running on Bun.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (Turbopack, pages router) |
| UI | React 19 + Tailwind CSS v4 (CSS-first `@theme` in `styles/main.css`) |
| Types | TypeScript 7 |
| Lint / format | Biome |
| Package manager | Bun |

## Development

```bash
bun install
bun run dev        # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `bun run dev` | Dev server |
| `bun run build` | Production build (all routes prerendered) |
| `bun run start` | Serve the production build |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run check` | Biome lint + format (writes) |

## Content

All copy lives in data files — no CMS, no database.

| File | Contents |
| --- | --- |
| `data/content/home.ts` | Skills, experience, education, testimonials |
| `data/content/projects.ts` | Projects and their tags (`/projects/tag/*` pages are generated from these) |
| `data/global.ts` | Routes and footer columns |

Design tokens (colors, fonts, animations) are defined once in the `@theme` block in `styles/main.css`.

## Credits

Built on the open-source portfolio template by [Brayden W](https://braydentw.io) ([@BraydenTW](https://github.com/BraydenTW)). His guidelines for the original work — use it as inspiration, don't copy it verbatim, and credit the author — are respected here: the content, design system, and structure have been reworked for this site.

