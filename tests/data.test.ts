import { describe, expect, it } from "bun:test";
import projects, {
  allKebabTags,
  allTags,
  projectSlug,
  projectThumb,
} from "@/data/content/projects";
import { routes, SITE_URL } from "@/data/global";

describe("projects data", () => {
  it("has valid and unique project definitions", () => {
    expect(projects.length).toBeGreaterThan(0);
    const ids = new Set<number>();
    const slugs = new Set<string>();

    for (const project of projects) {
      expect(ids.has(project.id)).toBe(false);
      ids.add(project.id);

      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.desc.trim().length).toBeGreaterThan(0);
      expect(project.img.startsWith("/static/projects/")).toBe(true);
      expect(project.img.endsWith(".webp")).toBe(true);

      const slug = projectSlug(project);
      expect(slug.trim().length).toBeGreaterThan(0);
      expect(slugs.has(slug)).toBe(false);
      slugs.add(slug);

      const thumb = projectThumb(project.img);
      expect(thumb).toBe(project.img.replace(/\.webp$/, "-600.webp"));
    }
  });

  it("extracts unique tags and kebab tags", () => {
    expect(allTags.length).toBeGreaterThan(0);
    expect(allKebabTags.length).toBe(allTags.length);
    const uniqueTags = new Set(allTags);
    expect(uniqueTags.size).toBe(allTags.length);
  });
});

describe("routes data", () => {
  it("defines unique routes with valid paths", () => {
    expect(routes.length).toBeGreaterThan(0);
    const paths = new Set<string>();

    for (const route of routes) {
      expect(route.path.startsWith("/")).toBe(true);
      expect(paths.has(route.path)).toBe(false);
      paths.add(route.path);
      expect(route.title.trim().length).toBeGreaterThan(0);
      expect(route.desc.trim().length).toBeGreaterThan(0);
    }
  });

  it("specifies a valid HTTPS SITE_URL", () => {
    expect(SITE_URL.startsWith("https://")).toBe(true);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});
