import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — every route is prerendered from repo data, so the
  // build output in `out/` can be dropped on any static host.
  output: "export",
  poweredByHeader: false,
  // Static export has no image optimizer; assets are pre-sized (webp) instead.
  images: { unoptimized: true },
  // Response headers live in public/_headers (Cloudflare Pages, Netlify) and
  // vercel.json — `headers()` in this file is ignored in export mode.
};

export default nextConfig;
