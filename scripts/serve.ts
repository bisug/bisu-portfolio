#!/usr/bin/env bun
/** Serve the static export in out/ locally (clean URLs: /foo -> /foo.html). */

import { extname, join } from "node:path";

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
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith("/")) path += "index.html";
    const candidates = [path, `${path}.html`, `${path}/index.html`];
    for (const c of candidates) {
      const file = Bun.file(join(ROOT, c));
      if (await file.exists()) {
        const type = TYPES[extname(c).toLowerCase()] ?? "application/octet-stream";
        return new Response(file, { headers: { "Content-Type": type } });
      }
    }
    const notFound = Bun.file(join(ROOT, "404.html"));
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
