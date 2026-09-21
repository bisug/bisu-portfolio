import type { GetServerSideProps } from "next";
import projects, { allKebabTags, projectSlug } from "@/data/content/projects";
import { routes, SITE_URL } from "@/data/global";

function buildSitemap(paths: string[]): string {
  const urls = paths
    .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const paths = [
    ...routes.map((route) => route.path),
    ...projects.map((project) => `/projects/${projectSlug(project)}`),
    ...allKebabTags.map((tag) => `/projects/tag/${tag}`),
  ];

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.write(buildSitemap(paths));
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
