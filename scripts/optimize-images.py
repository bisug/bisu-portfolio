#!/usr/bin/env python3
"""Keep derived image assets in sync and enforce a per-file byte budget.

Sources of truth in the repo:
  public/static/projects/<Name>.png|jpg|jpeg  -> <Name>.webp (<=1200w) + <Name>-600.webp
  public/static/education/<name>.png|jpg|jpeg -> <name>.webp (<=320w)
The PNG/JPG is never rewritten: it stays the link-preview / og:image source.

Usage:
  python3 scripts/optimize-images.py            # regenerate anything out of date
  python3 scripts/optimize-images.py --check    # verify presence + budget only (CI on PRs)
  python3 scripts/optimize-images.py --force    # regenerate every derivative
  python3 scripts/optimize-images.py --max-kb 120

Regeneration is content-based, not mtime-based, so a fresh git checkout (where
every file shares one timestamp) behaves the same as a working tree.
"""

from __future__ import annotations

import argparse
import io
import sys
from pathlib import Path

from PIL import Image, ImageFile

# A truncated source (one of the college logos is) should still be usable.
ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = Path(__file__).resolve().parent.parent
STATIC = ROOT / "public" / "static"
SOURCE_SUFFIXES = (".png", ".jpg", ".jpeg")
RASTER_SUFFIXES = (".png", ".jpg", ".jpeg", ".webp", ".ico")

# Widths and quality tuned to what the layouts actually render.
PROJECT_W, PROJECT_QUALITY = 1200, 82
THUMB_W, THUMB_QUALITY = 600, 80
LOGO_W, LOGO_QUALITY = 320, 82


def encode(src: Path, width: int, quality: int) -> bytes:
    """Encode src as WebP, downscaled to width (never upscaled)."""
    with Image.open(src) as im:
        im = im.convert("RGBA") if im.mode in ("P", "RGBA", "LA") else im.convert("RGB")
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, "WEBP", quality=quality, method=6)
        return buf.getvalue()


def derivatives() -> list[tuple[Path, Path, int, int]]:
    """(source, output, width, quality) for every derived asset."""
    out: list[tuple[Path, Path, int, int]] = []

    for png in sorted((STATIC / "projects").glob("*")):
        if png.suffix.lower() not in SOURCE_SUFFIXES or png.stem.endswith("-600"):
            continue
        out.append((png, png.with_suffix(".webp"), PROJECT_W, PROJECT_QUALITY))
        out.append((png, png.with_name(f"{png.stem}-600.webp"), THUMB_W, THUMB_QUALITY))

    for logo in sorted((STATIC / "education").glob("*")):
        if logo.suffix.lower() not in SOURCE_SUFFIXES:
            continue
        out.append((logo, logo.with_suffix(".webp"), LOGO_W, LOGO_QUALITY))

    return out


def budget_findings(max_kb: int) -> list[tuple[Path, int]]:
    """Every shipped raster over the per-file budget."""
    over = []
    for path in sorted(STATIC.rglob("*")):
        if path.suffix.lower() in RASTER_SUFFIXES and path.stat().st_size > max_kb * 1024:
            over.append((path, path.stat().st_size))
    return over


def orphan_sources() -> list[Path]:
    """JPG/PNG in projects/ with no matching .webp — the asset the site serves."""
    return [
        p
        for p in sorted((STATIC / "projects").glob("*"))
        if p.suffix.lower() in SOURCE_SUFFIXES
        and not p.stem.endswith("-600")
        and not p.with_suffix(".webp").exists()
    ]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="verify only, never write")
    parser.add_argument("--force", action="store_true", help="regenerate every derivative")
    parser.add_argument("--max-kb", type=int, default=150, help="per-file budget (default 150)")
    args = parser.parse_args()

    items = derivatives()
    missing, stale, written = [], [], []
    kept = 0

    for src, dest, width, quality in items:
        if not src.exists():
            continue
        if not dest.exists():
            missing.append(dest)
            if args.check:
                continue
        if args.check:
            continue
        data = encode(src, width, quality)
        if args.force or not dest.exists() or dest.read_bytes() != data:
            previous = dest.stat().st_size if dest.exists() else None
            dest.write_bytes(data)
            written.append((dest, previous, len(data)))
        else:
            kept += 1

    for src in orphan_sources():
        missing.append(src.with_suffix(".webp"))

    if args.check:
        for dest in missing:
            print(f"missing: {dest.relative_to(ROOT)}")
        if missing:
            print(f"\n{len(missing)} derived asset(s) missing; run `bun run images`")
            return 1
        print(f"checked {len(items)} derived assets, all present")
    else:
        for dest, previous, size in written:
            was = f"{previous / 1024:.1f}KB -> " if previous else ""
            print(f"wrote  {dest.relative_to(ROOT)}  {was}{size / 1024:.1f}KB")
        if written:
            print(f"\n{len(written)} file(s) regenerated, {kept} already current")
        else:
            print(f"all {kept} derived assets current")

    over = budget_findings(args.max_kb)
    total = sum(p.stat().st_size for p in STATIC.rglob("*") if p.suffix.lower() in RASTER_SUFFIXES)
    print(f"shipped image weight: {total / 1024 / 1024:.2f}MB, budget {args.max_kb}KB per file")
    if over:
        print("\nover budget:")
        for path, size in over:
            print(f"  {size / 1024:7.1f}KB  {path.relative_to(ROOT)}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
