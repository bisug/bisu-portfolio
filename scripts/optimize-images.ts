#!/usr/bin/env bun
/**
 * Keep derived image assets in sync and enforce a per-file byte budget.
 *
 * Sources of truth in the repo:
 *   public/static/projects/<Name>.png|jpg|jpeg  -> <Name>.webp (<=1200w) + <Name>-600.webp
 *   public/static/education/<name>.png|jpg|jpeg -> <name>.webp (<=320w)
 * The PNG/JPG is never rewritten: it stays the link-preview / og:image source.
 *
 * Data integrity: derivatives encode with `failOn: "error"`, so a truncated or
 * corrupt source aborts the run instead of shipping a silently damaged file.
 * If a source fails, re-export it from the original (the one known-bad case:
 * lincoln-college-logo.jpeg is truncated by 33 bytes).
 *
 * Usage:
 *   bun run images            # regenerate anything out of date
 *   bun run images:check      # verify presence + budget only (CI on PRs)
 *   bun scripts/optimize-images.ts --force      # regenerate every derivative
 *   bun scripts/optimize-images.ts --max-kb 120
 *
 * Regeneration is content-based, not mtime-based, so a fresh git checkout (where
 * every file shares one timestamp) behaves the same as a working tree.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import sharp from "sharp";

const ROOT = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const STATIC = join(ROOT, "public", "static");
const SOURCE_SUFFIXES = new Set([".png", ".jpg", ".jpeg"]);
const RASTER_SUFFIXES = new Set([".png", ".jpg", ".jpeg", ".webp", ".ico"]);

// Widths and quality tuned to what the layouts actually render.
const PROJECT_W = 1200;
const PROJECT_QUALITY = 82;
const THUMB_W = 600;
const THUMB_QUALITY = 80;
const LOGO_W = 320;
const LOGO_QUALITY = 82;

interface Derivative {
  src: string;
  dest: string;
  width: number;
  quality: number;
}

async function encode(src: string, width: number, quality: number): Promise<Buffer> {
  // failOn error: strict decode — a corrupt source aborts instead of shipping
  // a silently damaged derivative. Resize inside bounds without enlarging;
  // encode lossy WebP at quality.
  return sharp(src, { failOn: "error" })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer();
}

function derivatives(): Derivative[] {
  const out: Derivative[] = [];
  const stemOf = (f: string) => f.slice(0, -extname(f).length);

  for (const f of readdirSync(join(STATIC, "projects")).sort()) {
    if (!SOURCE_SUFFIXES.has(extname(f).toLowerCase()) || stemOf(f).endsWith("-600")) continue;
    const base = join(STATIC, "projects", stemOf(f));
    out.push({
      src: join(STATIC, "projects", f),
      dest: `${base}.webp`,
      width: PROJECT_W,
      quality: PROJECT_QUALITY,
    });
    out.push({
      src: join(STATIC, "projects", f),
      dest: `${base}-600.webp`,
      width: THUMB_W,
      quality: THUMB_QUALITY,
    });
  }

  for (const f of readdirSync(join(STATIC, "education")).sort()) {
    if (!SOURCE_SUFFIXES.has(extname(f).toLowerCase())) continue;
    out.push({
      src: join(STATIC, "education", f),
      dest: join(STATIC, "education", `${stemOf(f)}.webp`),
      width: LOGO_W,
      quality: LOGO_QUALITY,
    });
  }

  return out;
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function budgetFindings(maxKb: number): [string, number][] {
  return walk(STATIC)
    .filter((p) => RASTER_SUFFIXES.has(extname(p).toLowerCase()) && statSync(p).size > maxKb * 1024)
    .sort()
    .map((p) => [p, statSync(p).size]);
}

function orphanSources(): string[] {
  return readdirSync(join(STATIC, "projects"))
    .sort()
    .filter((f) => {
      const stem = f.slice(0, -extname(f).length);
      return (
        SOURCE_SUFFIXES.has(extname(f).toLowerCase()) &&
        !stem.endsWith("-600") &&
        !readdirSync(join(STATIC, "projects")).includes(`${stem}.webp`)
      );
    })
    .map((f) => join(STATIC, "projects", `${f.slice(0, -extname(f).length)}.webp`));
}

const args = new Set(process.argv.slice(2));
const checkOnly = args.has("--check");
const force = args.has("--force");
const maxKbFlag = process.argv.find((a) => a.startsWith("--max-kb"));
// "--max-kb" with no/invalid value must not become NaN — that would disable
// the budget check silently (every "size > NaN" comparison is false).
const maxKb = maxKbFlag
  ? Number(maxKbFlag.split("=")[1] ?? process.argv[process.argv.indexOf(maxKbFlag) + 1])
  : 150;
if (!Number.isFinite(maxKb) || maxKb <= 0) {
  console.error(`invalid --max-kb value (got "${maxKbFlag}")`);
  process.exit(1);
}

const rel = (p: string) => p.slice(ROOT.length + 1);
const items = derivatives();

// Strict decode all sources up front: a corrupt input fails the whole run
// clean, instead of leaving a half-written asset tree behind.
for (const { src } of items) {
  await sharp(src, { failOn: "error" }).metadata();
}
const missing: string[] = [];
let written = 0;
let kept = 0;

for (const { src, dest, width, quality } of items) {
  let exists = false;
  try {
    statSync(dest);
    exists = true;
  } catch {
    exists = false;
  }
  if (!exists) missing.push(dest);
  if (checkOnly) continue;
  const data = await encode(src, width, quality);
  const current = exists ? readFileSync(dest) : null;
  if (force || !current || !current.equals(data)) {
    const prev = current ? `${(current.length / 1024).toFixed(1)}KB -> ` : "";
    writeFileSync(dest, data);
    console.log(`wrote  ${rel(dest)}  ${prev}${(data.length / 1024).toFixed(1)}KB`);
    written++;
  } else {
    kept++;
  }
}

for (const dest of orphanSources()) missing.push(dest);

if (checkOnly) {
  for (const dest of missing) console.log(`missing: ${rel(dest)}`);
  if (missing.length > 0) {
    console.log(`\n${missing.length} derived asset(s) missing; run \`bun run images\``);
    process.exit(1);
  }
  console.log(`checked ${items.length} derived assets, all present`);
} else if (written > 0) {
  console.log(`\n${written} file(s) regenerated, ${kept} already current`);
} else {
  console.log(`all ${kept} derived assets current`);
}

const over = budgetFindings(maxKb);
const total = walk(STATIC)
  .filter((p) => RASTER_SUFFIXES.has(extname(p).toLowerCase()))
  .reduce((n, p) => n + statSync(p).size, 0);
console.log(
  `shipped image weight: ${(total / 1024 / 1024).toFixed(2)}MB, budget ${maxKb}KB per file`,
);
if (over.length > 0) {
  console.log("\nover budget:");
  for (const [path, size] of over)
    console.log(`  ${(size / 1024).toFixed(1).padStart(7)}KB  ${rel(path)}`);
  process.exit(1);
}
