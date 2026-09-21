#!/usr/bin/env bun
/** Serve the static export in out/ locally (clean URLs: /foo -> /foo.html). */

import { extname, resolve, sep } from "node:path";

const ROOT = new URL("../out", import.meta.url).pathname;
const PORT = Number(process.env.PORT ?? 3000);
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let path: string;
    try {
      path = decodeURIComponent(url.pathname);
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    if (path.endsWith("/")) path += "index.html";
    // join() normalizes ".." past the root (e.g. %2e%2e%2f traversal), so
    // resolve and refuse anything that lands outside out/.
    const resolved = resolve(ROOT, `.${path}`);
    if (resolved !== ROOT && !resolved.startsWith(ROOT + sep)) {
      return new Response("Not found", { status: 404 });
    }
    const candidates = [resolved, `${resolved}.html`, `${resolved}${sep}index.html`];
    for (const c of candidates) {
      const file = Bun.file(c);
      if (await file.exists()) {
        const type = TYPES[extname(c).toLowerCase()] ?? "application/octet-stream";
        return new Response(file, { headers: { "Content-Type": type } });
      }
    }
    const notFound = Bun.file(resolve(ROOT, "404.html"));
    if (await notFound.exists()) {
      return new Response(notFound, {
        status: 404,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`serving out/ at http://localhost:${PORT}`);
