import { writeFileSync } from "node:fs";
import projects, { allKebabTags, projectSlug } from "@/data/content/projects";
import { routes, SITE_URL } from "@/data/global";

/**
 * Writes public/sitemap.xml at build time. The site is a static export, so
 * there is no server to render the file per request — run this (bun run
 * sitemap) after changing routes or projects.
 */
const paths = [
  ...routes.map((route) => route.path),
  ...projects.map((project) => `/projects/${projectSlug(project)}`),
  ...allKebabTags.map((tag) => `/projects/tag/${tag}`),
];

const lastmod = new Date().toISOString().slice(0, 10);
const urls = paths
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), sitemap);
console.log(`sitemap: wrote ${paths.length} urls to public/sitemap.xml`);
