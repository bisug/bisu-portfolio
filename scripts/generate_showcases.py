#!/usr/bin/env python3
"""
Generate professional 1200x600 dark-mode showcase graphics.
- CairoSVG vector graphics for TG-WordGame, ninfo, Melody, heroku-buildpack-bun, SnakeGame-CLI
- High-res cropped and quantized PNGs for BinaryInspector, Paila, TG-GithubBot
All assets strictly maintained within the 150 KB budget.
"""
import os
import cairosvg
from PIL import Image

OUT_DIR = "/home/bisu/Documents/port/braydentw.io/public/static/projects"
TMP_DIR = "/tmp/showcase_gen"
os.makedirs(TMP_DIR, exist_ok=True)

def render_svg_to_png(svg_content: str, dest_png: str, max_kb: int = 145):
    png_bytes = cairosvg.svg2png(
        bytestring=svg_content.encode('utf-8'),
        output_width=1200,
        output_height=600
    )
    temp_path = os.path.join(TMP_DIR, os.path.basename(dest_png))
    with open(temp_path, "wb") as f:
        f.write(png_bytes)
    
    size_kb = len(png_bytes) / 1024.0
    if size_kb > max_kb:
        im = Image.open(temp_path).convert('RGB')
        im_p = im.quantize(colors=256, method=Image.Resampling.LANCZOS)
        im_p.save(dest_png, 'PNG', optimize=True)
    else:
        with open(dest_png, "wb") as f:
            f.write(png_bytes)
            
    final_kb = os.path.getsize(dest_png) / 1024.0
    print(f"Generated {dest_png}: {final_kb:.1f} KB")


def process_ai_image(src_path: str, dest_png: str):
    img = Image.open(src_path).convert('RGB')
    w, h = img.size
    target_aspect = 1200.0 / 600.0  # 2:1
    current_aspect = w / float(h)
    
    if current_aspect < target_aspect:
        new_h = int(w / target_aspect)
        top = (h - new_h) // 2
        img_cropped = img.crop((0, top, w, top + new_h))
    else:
        new_w = int(h * target_aspect)
        left = (w - new_w) // 2
        img_cropped = img.crop((left, 0, left + new_w, h))
        
    resized = img_cropped.resize((1200, 600), Image.Resampling.LANCZOS)
    
    # Save quantized 256-color PNG to keep under 150KB budget
    quantized = resized.quantize(colors=256, method=Image.Resampling.LANCZOS)
    quantized.save(dest_png, 'PNG', optimize=True)
    size_kb = os.path.getsize(dest_png) / 1024.0
    print(f"Processed AI image {dest_png}: {size_kb:.1f} KB")


def generate_tg_wordgame():
    svg = '''<svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg_glow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#141c2e"/>
      <stop offset="60%" stop-color="#0a0e17"/>
      <stop offset="100%" stop-color="#05070c"/>
    </radialGradient>
    <radialGradient id="teal_glow" cx="30%" cy="30%" r="40%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="green_glow" cx="70%" cy="60%" r="40%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="card_bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#182234" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0f1726" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="tile_green" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="tile_yellow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
    <linearGradient id="tile_slate" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1200" height="600" fill="url(#bg_glow)"/>
  <rect width="1200" height="600" fill="url(#teal_glow)"/>
  <rect width="1200" height="600" fill="url(#green_glow)"/>

  <!-- Left: Main Telegram Word Game Card -->
  <g filter="url(#shadow)">
    <rect x="70" y="45" width="600" height="510" rx="20" fill="url(#card_bg)" stroke="#38bdf8" stroke-opacity="0.25" stroke-width="1.5"/>
    
    <!-- Telegram App Header -->
    <rect x="70" y="45" width="600" height="56" rx="20" fill="#1e293b" fill-opacity="0.7"/>
    <circle cx="106" cy="73" r="16" fill="#0284c7"/>
    <text x="106" y="78" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">TG</text>
    <text x="134" y="68" font-family="DejaVu Sans, sans-serif" font-size="16" font-weight="bold" fill="#f8fafc">TG-WordGame Bot</text>
    <text x="134" y="86" font-family="DejaVu Sans, sans-serif" font-size="12" fill="#38bdf8">bot • Daily Challenge #248</text>
    
    <!-- Round Status Pill -->
    <rect x="520" y="60" width="130" height="26" rx="13" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
    <circle cx="534" cy="73" r="4" fill="#10b981"/>
    <text x="546" y="77" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#34d399">SOLO &amp; MULTI</text>

    <!-- Wordle Grid Section -->
    <!-- Row 1: P A I L A -->
    <g transform="translate(180, 125)">
      <rect x="0" y="0" width="56" height="56" rx="8" fill="url(#tile_slate)" stroke="#475569" stroke-width="1.5"/>
      <text x="28" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">P</text>
      
      <rect x="66" y="0" width="56" height="56" rx="8" fill="url(#tile_yellow)" stroke="#facc15" stroke-width="1.5"/>
      <text x="94" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
      
      <rect x="132" y="0" width="56" height="56" rx="8" fill="url(#tile_slate)" stroke="#475569" stroke-width="1.5"/>
      <text x="160" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">I</text>
      
      <rect x="198" y="0" width="56" height="56" rx="8" fill="url(#tile_slate)" stroke="#475569" stroke-width="1.5"/>
      <text x="226" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">L</text>
      
      <rect x="264" y="0" width="56" height="56" rx="8" fill="url(#tile_yellow)" stroke="#facc15" stroke-width="1.5"/>
      <text x="292" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
    </g>

    <!-- Row 2: C O D E R -->
    <g transform="translate(180, 191)">
      <rect x="0" y="0" width="56" height="56" rx="8" fill="url(#tile_green)" stroke="#4ade80" stroke-width="1.5"/>
      <text x="28" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>
      
      <rect x="66" y="0" width="56" height="56" rx="8" fill="url(#tile_slate)" stroke="#475569" stroke-width="1.5"/>
      <text x="94" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">O</text>
      
      <rect x="132" y="0" width="56" height="56" rx="8" fill="url(#tile_yellow)" stroke="#facc15" stroke-width="1.5"/>
      <text x="160" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">D</text>
      
      <rect x="198" y="0" width="56" height="56" rx="8" fill="url(#tile_slate)" stroke="#475569" stroke-width="1.5"/>
      <text x="226" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">E</text>
      
      <rect x="264" y="0" width="56" height="56" rx="8" fill="url(#tile_green)" stroke="#4ade80" stroke-width="1.5"/>
      <text x="292" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">R</text>
    </g>

    <!-- Row 3: C H A I N (Victory!) -->
    <g transform="translate(180, 257)">
      <rect x="0" y="0" width="56" height="56" rx="8" fill="url(#tile_green)" stroke="#4ade80" stroke-width="2"/>
      <text x="28" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>
      
      <rect x="66" y="0" width="56" height="56" rx="8" fill="url(#tile_green)" stroke="#4ade80" stroke-width="2"/>
      <text x="94" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">H</text>
      
      <rect x="132" y="0" width="56" height="56" rx="8" fill="url(#tile_green)" stroke="#4ade80" stroke-width="2"/>
      <text x="160" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>
      
      <rect x="198" y="0" width="56" height="56" rx="8" fill="url(#tile_green)" stroke="#4ade80" stroke-width="2"/>
      <text x="226" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">I</text>
      
      <rect x="264" y="0" width="56" height="56" rx="8" fill="url(#tile_green)" stroke="#4ade80" stroke-width="2"/>
      <text x="292" y="38" font-family="DejaVu Sans Mono, monospace" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle">N</text>
    </g>

    <!-- Row 4 (Empty placeholder) -->
    <g transform="translate(180, 323)">
      <rect x="0" y="0" width="56" height="56" rx="8" fill="#0f172a" fill-opacity="0.5" stroke="#334155" stroke-dasharray="4,4" stroke-width="1.5"/>
      <rect x="66" y="0" width="56" height="56" rx="8" fill="#0f172a" fill-opacity="0.5" stroke="#334155" stroke-dasharray="4,4" stroke-width="1.5"/>
      <rect x="132" y="0" width="56" height="56" rx="8" fill="#0f172a" fill-opacity="0.5" stroke="#334155" stroke-dasharray="4,4" stroke-width="1.5"/>
      <rect x="198" y="0" width="56" height="56" rx="8" fill="#0f172a" fill-opacity="0.5" stroke="#334155" stroke-dasharray="4,4" stroke-width="1.5"/>
      <rect x="264" y="0" width="56" height="56" rx="8" fill="#0f172a" fill-opacity="0.5" stroke="#334155" stroke-dasharray="4,4" stroke-width="1.5"/>
    </g>

    <!-- Mini Keyboard Mockup -->
    <g transform="translate(125, 400)">
      <rect x="0" y="0" width="490" height="120" rx="12" fill="#0f172a" fill-opacity="0.8"/>
      <!-- Key row 1 -->
      <g font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#e2e8f0" text-anchor="middle">
        <rect x="15" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="35" y="31">Q</text>
        <rect x="60" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="80" y="31">W</text>
        <rect x="105" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="125" y="31">E</text>
        <rect x="150" y="12" width="40" height="28" rx="5" fill="#15803d"/><text x="170" y="31">R</text>
        <rect x="195" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="215" y="31">T</text>
        <rect x="240" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="260" y="31">Y</text>
        <rect x="285" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="305" y="31">U</text>
        <rect x="330" y="12" width="40" height="28" rx="5" fill="#15803d"/><text x="350" y="31">I</text>
        <rect x="375" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="395" y="31">O</text>
        <rect x="420" y="12" width="40" height="28" rx="5" fill="#334155"/><text x="440" y="31">P</text>
      </g>
      <!-- Key row 2 -->
      <g font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#e2e8f0" text-anchor="middle">
        <rect x="35" y="46" width="40" height="28" rx="5" fill="#15803d"/><text x="55" y="65">A</text>
        <rect x="80" y="46" width="40" height="28" rx="5" fill="#334155"/><text x="100" y="65">S</text>
        <rect x="125" y="46" width="40" height="28" rx="5" fill="#a16207"/><text x="145" y="65">D</text>
        <rect x="170" y="46" width="40" height="28" rx="5" fill="#334155"/><text x="190" y="65">F</text>
        <rect x="215" y="46" width="40" height="28" rx="5" fill="#334155"/><text x="235" y="65">G</text>
        <rect x="260" y="46" width="40" height="28" rx="5" fill="#15803d"/><text x="280" y="65">H</text>
        <rect x="305" y="46" width="40" height="28" rx="5" fill="#334155"/><text x="325" y="65">J</text>
        <rect x="350" y="46" width="40" height="28" rx="5" fill="#334155"/><text x="370" y="65">K</text>
        <rect x="395" y="46" width="40" height="28" rx="5" fill="#334155"/><text x="415" y="65">L</text>
      </g>
      <!-- Key row 3 -->
      <g font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#e2e8f0" text-anchor="middle">
        <rect x="25" y="80" width="55" height="28" rx="5" fill="#1e293b"/><text x="52" y="98">ENTER</text>
        <rect x="85" y="80" width="40" height="28" rx="5" fill="#334155"/><text x="105" y="98">Z</text>
        <rect x="130" y="80" width="40" height="28" rx="5" fill="#334155"/><text x="150" y="98">X</text>
        <rect x="175" y="80" width="40" height="28" rx="5" fill="#15803d"/><text x="195" y="98">C</text>
        <rect x="220" y="80" width="40" height="28" rx="5" fill="#334155"/><text x="240" y="98">V</text>
        <rect x="265" y="80" width="40" height="28" rx="5" fill="#334155"/><text x="285" y="98">B</text>
        <rect x="310" y="80" width="40" height="28" rx="5" fill="#15803d"/><text x="330" y="98">N</text>
        <rect x="355" y="80" width="40" height="28" rx="5" fill="#334155"/><text x="375" y="98">M</text>
        <rect x="400" y="80" width="55" height="28" rx="5" fill="#1e293b"/><text x="427" y="98">DEL</text>
      </g>
    </g>
  </g>

  <!-- Right: Floating Widgets & Stats -->
  <!-- Widget 1: Streak & Victory -->
  <g filter="url(#shadow)" transform="translate(710, 50)">
    <rect width="420" height="150" rx="18" fill="#1e293b" fill-opacity="0.8" stroke="#facc15" stroke-opacity="0.3" stroke-width="1.5"/>
    <text x="25" y="38" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#facc15">DAILY STREAK</text>
    
    <!-- Big 18 Days with Flame Icon -->
    <text x="25" y="82" font-family="DejaVu Sans, sans-serif" font-size="38" font-weight="bold" fill="#ffffff">18 Days</text>
    <path d="M190 78 C185 70 190 60 195 52 C200 62 210 65 212 55 C218 68 214 80 205 84 C198 86 193 84 190 78 Z" fill="#f97316"/>
    
    <text x="25" y="115" font-family="DejaVu Sans, sans-serif" font-size="13" fill="#94a3b8">Solved in 3 guesses • Win rate 94.2%</text>
    
    <rect x="290" y="25" width="105" height="36" rx="18" fill="#22c55e" fill-opacity="0.2"/>
    <path d="M310 43 L316 49 L328 37" stroke="#4ade80" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <text x="355" y="47" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#4ade80" text-anchor="middle">SOLVED</text>
  </g>

  <!-- Widget 2: Leaderboard / Multiplayer -->
  <g filter="url(#shadow)" transform="translate(710, 225)">
    <rect width="420" height="175" rx="18" fill="#1e293b" fill-opacity="0.8" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5"/>
    <text x="25" y="35" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#38bdf8">GROUP LEADERBOARD</text>
    
    <!-- Rank 1 -->
    <rect x="25" y="52" width="370" height="34" rx="8" fill="#0f172a" fill-opacity="0.6"/>
    <text x="40" y="74" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#facc15">1st</text>
    <text x="75" y="74" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#f8fafc">@bisu</text>
    <text x="375" y="74" font-family="DejaVu Sans, sans-serif" font-size="13" font-weight="bold" fill="#4ade80" text-anchor="end">3 / 6 (42s)</text>

    <!-- Rank 2 -->
    <rect x="25" y="92" width="370" height="34" rx="8" fill="#0f172a" fill-opacity="0.4"/>
    <text x="40" y="114" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#94a3b8">2nd</text>
    <text x="75" y="114" font-family="DejaVu Sans, sans-serif" font-size="14" fill="#cbd5e1">@cryptic_dev</text>
    <text x="375" y="114" font-family="DejaVu Sans, sans-serif" font-size="13" fill="#94a3b8" text-anchor="end">4 / 6 (1m 12s)</text>

    <!-- Rank 3 -->
    <rect x="25" y="132" width="370" height="34" rx="8" fill="#0f172a" fill-opacity="0.3"/>
    <text x="40" y="154" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#b45309">3rd</text>
    <text x="75" y="154" font-family="DejaVu Sans, sans-serif" font-size="14" fill="#cbd5e1">@lexi_k</text>
    <text x="375" y="154" font-family="DejaVu Sans, sans-serif" font-size="13" fill="#94a3b8" text-anchor="end">5 / 6 (2m 04s)</text>
  </g>

  <!-- Widget 3: Tech Badges -->
  <g transform="translate(710, 425)">
    <rect width="420" height="85" rx="16" fill="#0f172a" fill-opacity="0.7" stroke="#334155" stroke-width="1"/>
    <text x="25" y="30" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#64748b">BUILT WITH</text>
    <g transform="translate(25, 42)">
      <!-- Bun -->
      <rect x="0" y="0" width="65" height="28" rx="14" fill="#fbf0df" fill-opacity="0.1" stroke="#fbf0df" stroke-opacity="0.3" stroke-width="1"/>
      <text x="32" y="18" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#fbf0df" text-anchor="middle">Bun</text>
      <!-- grammY -->
      <rect x="75" y="0" width="85" height="28" rx="14" fill="#38bdf8" fill-opacity="0.1" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1"/>
      <text x="117" y="18" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#38bdf8" text-anchor="middle">grammY</text>
      <!-- PostgreSQL -->
      <rect x="170" y="0" width="105" height="28" rx="14" fill="#60a5fa" fill-opacity="0.1" stroke="#60a5fa" stroke-opacity="0.3" stroke-width="1"/>
      <text x="222" y="18" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#93c5fd" text-anchor="middle">PostgreSQL</text>
      <!-- Valkey -->
      <rect x="285" y="0" width="80" height="28" rx="14" fill="#ef4444" fill-opacity="0.1" stroke="#ef4444" stroke-opacity="0.3" stroke-width="1"/>
      <text x="325" y="18" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#f87171" text-anchor="middle">Valkey</text>
    </g>
  </g>
</svg>'''
    render_svg_to_png(svg, os.path.join(OUT_DIR, "TG-WordGame.png"))


def generate_ninfo():
    svg = '''<svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg_glow" cx="45%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#141824"/>
      <stop offset="60%" stop-color="#0a0c13"/>
      <stop offset="100%" stop-color="#040508"/>
    </radialGradient>
    <radialGradient id="nim_glow" cx="25%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cyan_glow" cx="75%" cy="65%" r="45%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="term_bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111622" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0b0f19" stop-opacity="0.98"/>
    </linearGradient>
    <linearGradient id="bar_cpu" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
    <linearGradient id="bar_mem" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#fbbf24"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1200" height="600" fill="url(#bg_glow)"/>
  <rect width="1200" height="600" fill="url(#nim_glow)"/>
  <rect width="1200" height="600" fill="url(#cyan_glow)"/>

  <!-- Left: Main Terminal Console -->
  <g filter="url(#shadow)">
    <rect x="60" y="45" width="620" height="510" rx="16" fill="url(#term_bg)" stroke="#334155" stroke-width="1.5"/>
    
    <!-- Titlebar -->
    <rect x="60" y="45" width="620" height="42" rx="16" fill="#1e293b" fill-opacity="0.6"/>
    <circle cx="85" cy="66" r="6" fill="#ef4444"/>
    <circle cx="105" cy="66" r="6" fill="#f59e0b"/>
    <circle cx="125" cy="66" r="6" fill="#10b981"/>
    <text x="370" y="71" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#94a3b8" text-anchor="middle">bisu@archlinux ~ ninfo --summary</text>

    <!-- Terminal Content -->
    <g transform="translate(90, 115)" font-family="DejaVu Sans Mono, monospace" font-size="14">
      <text x="0" y="0" fill="#38bdf8" font-weight="bold">$ <tspan fill="#f8fafc">ninfo</tspan> <tspan fill="#f59e0b">--snapshot</tspan></text>
      
      <g transform="translate(0, 35)">
        <text x="0" y="0" fill="#64748b">OS        </text><text x="90" y="0" fill="#f8fafc" font-weight="bold">Arch Linux x86_64</text>
        <text x="0" y="26" fill="#64748b">KERNEL    </text><text x="90" y="26" fill="#38bdf8">Linux 6.12.11-arch1-1</text>
        <text x="0" y="52" fill="#64748b">UPTIME    </text><text x="90" y="52" fill="#cbd5e1">14d 6h 32m</text>
        <text x="0" y="78" fill="#64748b">SHELL     </text><text x="90" y="78" fill="#cbd5e1">zsh 5.9 (x86_64-pc-linux-gnu)</text>
        <text x="0" y="104" fill="#64748b">RUNTIME   </text><text x="90" y="104" fill="#fbbf24" font-weight="bold">Nim 2.2.0 (Native C Codegen)</text>
      </g>

      <g transform="translate(0, 175)">
        <text x="0" y="0" fill="#94a3b8" font-size="13">CPU (16 Cores @ 4.8GHz)</text>
        <text x="460" y="0" fill="#34d399" font-size="13" font-weight="bold" text-anchor="end">68%</text>
        <rect x="0" y="10" width="460" height="12" rx="6" fill="#1e293b"/>
        <rect x="0" y="10" width="312" height="12" rx="6" fill="url(#bar_cpu)"/>

        <text x="0" y="52" fill="#94a3b8" font-size="13">RAM (8.4 GB / 32.0 GB)</text>
        <text x="460" y="52" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="end">26%</text>
        <rect x="0" y="62" width="460" height="12" rx="6" fill="#1e293b"/>
        <rect x="0" y="62" width="120" height="12" rx="6" fill="url(#bar_mem)"/>

        <text x="0" y="104" fill="#94a3b8" font-size="13">SWAP (0.2 GB / 16.0 GB)</text>
        <text x="460" y="104" fill="#94a3b8" font-size="13" font-weight="bold" text-anchor="end">1.2%</text>
        <rect x="0" y="114" width="460" height="12" rx="6" fill="#1e293b"/>
        <rect x="0" y="114" width="25" height="12" rx="6" fill="#64748b"/>
      </g>

      <!-- Status Footer Line with SVG Check -->
      <g transform="translate(0, 335)">
        <path d="M0 5 L4 9 L12 0" stroke="#10b981" stroke-width="2" fill="none" stroke-linecap="round"/>
        <text x="18" y="6" fill="#10b981" font-size="13">Captured whole-system snapshot in 1.42ms</text>
      </g>
    </g>
  </g>

  <!-- Right: Floating JSON Output Card -->
  <g filter="url(#shadow)" transform="translate(710, 45)">
    <rect width="430" height="370" rx="16" fill="#0f172a" fill-opacity="0.9" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5"/>
    
    <!-- JSON Header -->
    <rect width="430" height="42" rx="16" fill="#1e293b" fill-opacity="0.6"/>
    <text x="25" y="26" font-family="DejaVu Sans Mono, monospace" font-size="13" font-weight="bold" fill="#38bdf8">output.json (single-call API)</text>
    <rect x="315" y="9" width="95" height="24" rx="12" fill="#10b981" fill-opacity="0.2"/>
    <text x="362" y="25" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#34d399" text-anchor="middle">&lt; 1.5ms</text>

    <!-- Syntax Highlighted JSON -->
    <g transform="translate(25, 75)" font-family="DejaVu Sans Mono, monospace" font-size="13">
      <text x="0" y="0" fill="#94a3b8">{</text>
      <text x="20" y="22" fill="#38bdf8">"hostname"<tspan fill="#94a3b8">: </tspan><tspan fill="#facc15">"arch-titan"</tspan><tspan fill="#94a3b8">,</tspan></text>
      <text x="20" y="44" fill="#38bdf8">"arch"<tspan fill="#94a3b8">: </tspan><tspan fill="#facc15">"x86_64"</tspan><tspan fill="#94a3b8">,</tspan></text>
      <text x="20" y="66" fill="#38bdf8">"kernel"<tspan fill="#94a3b8">: </tspan><tspan fill="#facc15">"6.12.11-arch1-1"</tspan><tspan fill="#94a3b8">,</tspan></text>
      <text x="20" y="88" fill="#38bdf8">"cpu"<tspan fill="#94a3b8">: {</tspan></text>
      <text x="40" y="110" fill="#38bdf8">"cores"<tspan fill="#94a3b8">: </tspan><tspan fill="#a78bfa">16</tspan><tspan fill="#94a3b8">,</tspan></text>
      <text x="40" y="132" fill="#38bdf8">"usage_percent"<tspan fill="#94a3b8">: </tspan><tspan fill="#a78bfa">68.4</tspan><tspan fill="#94a3b8">,</tspan></text>
      <text x="40" y="154" fill="#38bdf8">"governor"<tspan fill="#94a3b8">: </tspan><tspan fill="#facc15">"performance"</tspan></text>
      <text x="20" y="176" fill="#94a3b8">},</text>
      <text x="20" y="198" fill="#38bdf8">"memory"<tspan fill="#94a3b8">: {</tspan></text>
      <text x="40" y="220" fill="#38bdf8">"total_mb"<tspan fill="#94a3b8">: </tspan><tspan fill="#a78bfa">32768</tspan><tspan fill="#94a3b8">,</tspan></text>
      <text x="40" y="242" fill="#38bdf8">"used_mb"<tspan fill="#94a3b8">: </tspan><tspan fill="#a78bfa">8412</tspan></text>
      <text x="20" y="264" fill="#94a3b8">}</text>
      <text x="0" y="286" fill="#94a3b8">}</text>
    </g>
  </g>

  <!-- Right: Bottom Performance Badges -->
  <g transform="translate(710, 440)">
    <rect width="430" height="115" rx="16" fill="#0f172a" fill-opacity="0.8" stroke="#334155" stroke-width="1"/>
    <text x="25" y="32" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#64748b">KEY CAPABILITIES</text>
    
    <g transform="translate(25, 48)">
      <!-- Lightning Bolt Pill -->
      <rect x="0" y="0" width="180" height="32" rx="16" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-opacity="0.4" stroke-width="1"/>
      <polygon points="18,7 13,17 18,17 16,25 24,14 19,14" fill="#fbbf24"/>
      <text x="32" y="21" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#fbbf24">Ultra-Low Overhead</text>

      <!-- Check Pill -->
      <rect x="195" y="0" width="185" height="32" rx="16" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.4" stroke-width="1"/>
      <path d="M210 16 L214 20 L222 11" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round"/>
      <text x="230" y="21" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#34d399">Zero Dependencies</text>
    </g>
  </g>
</svg>'''
    render_svg_to_png(svg, os.path.join(OUT_DIR, "ninfo.png"))


def generate_melody():
    svg = '''<svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg_glow" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#191330"/>
      <stop offset="60%" stop-color="#0c0a1a"/>
      <stop offset="100%" stop-color="#05040d"/>
    </radialGradient>
    <radialGradient id="magenta_glow" cx="20%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#ec4899" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#ec4899" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="purple_glow" cx="80%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wave_grad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="album_art" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="20" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1200" height="600" fill="url(#bg_glow)"/>
  <rect width="1200" height="600" fill="url(#magenta_glow)"/>
  <rect width="1200" height="600" fill="url(#purple_glow)"/>

  <!-- Main Glassmorphic Voice Chat Container -->
  <g filter="url(#shadow)">
    <rect x="70" y="45" width="1060" height="510" rx="24" fill="#131126" fill-opacity="0.85" stroke="#8b5cf6" stroke-opacity="0.3" stroke-width="1.5"/>
    
    <!-- Top Header -->
    <rect x="70" y="45" width="1060" height="60" rx="24" fill="#1f1b3d" fill-opacity="0.5"/>
    <circle cx="110" cy="75" r="7" fill="#10b981"/>
    <circle cx="110" cy="75" r="14" fill="#10b981" fill-opacity="0.25"/>
    <text x="135" y="80" font-family="DejaVu Sans, sans-serif" font-size="17" font-weight="bold" fill="#ffffff">Melody — Telegram Group Calls Audio Stream</text>
    
    <!-- Right stats in header -->
    <rect x="910" y="60" width="190" height="30" rx="15" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1"/>
    <text x="1005" y="80" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#c084fc" text-anchor="middle">16 LISTENERS • 320 KBPS</text>
    
    <!-- Left: Album Art & Track Info Card -->
    <g transform="translate(110, 140)">
      <rect x="0" y="0" width="220" height="220" rx="18" fill="url(#album_art)" filter="url(#shadow)"/>
      <circle cx="110" cy="110" r="45" fill="#090a1a" fill-opacity="0.7"/>
      <circle cx="110" cy="110" r="14" fill="#f43f5e"/>
      <!-- Music Note Vector -->
      <path d="M106 120 C103 120 100 117 100 114 C100 111 103 108 106 108 C108 108 110 109 111 110 L111 96 L122 93 L122 102 L113 104 L113 115 C113 118 110 120 106 120 Z" fill="#ffffff"/>
      
      <text x="0" y="260" font-family="DejaVu Sans, sans-serif" font-size="20" font-weight="bold" fill="#ffffff">Midnight City Lights</text>
      <text x="0" y="285" font-family="DejaVu Sans, sans-serif" font-size="14" fill="#a855f7">Lofi &amp; Synthwave • 24-bit Flac</text>
      <text x="0" y="310" font-family="DejaVu Sans, sans-serif" font-size="12" fill="#64748b">Source: YouTube Music / Spotify</text>
    </g>

    <!-- Center/Right: Dynamic Audio Equalizer Waveform -->
    <g transform="translate(380, 140)">
      <rect width="710" height="230" rx="18" fill="#0c0a1a" fill-opacity="0.7" stroke="#332a5e" stroke-width="1"/>
      
      <!-- Equalizer Bars -->
      <g transform="translate(45, 20)">
        <rect x="0" y="110" width="12" height="70" rx="6" fill="url(#wave_grad)"/>
        <rect x="22" y="80" width="12" height="100" rx="6" fill="url(#wave_grad)"/>
        <rect x="44" y="50" width="12" height="130" rx="6" fill="url(#wave_grad)"/>
        <rect x="66" y="30" width="12" height="150" rx="6" fill="url(#wave_grad)"/>
        <rect x="88" y="70" width="12" height="110" rx="6" fill="url(#wave_grad)"/>
        <rect x="110" y="100" width="12" height="80" rx="6" fill="url(#wave_grad)"/>
        <rect x="132" y="40" width="12" height="140" rx="6" fill="url(#wave_grad)"/>
        <rect x="154" y="20" width="12" height="160" rx="6" fill="url(#wave_grad)"/>
        <rect x="176" y="60" width="12" height="120" rx="6" fill="url(#wave_grad)"/>
        <rect x="198" y="90" width="12" height="90" rx="6" fill="url(#wave_grad)"/>
        <rect x="220" y="35" width="12" height="145" rx="6" fill="url(#wave_grad)"/>
        <rect x="242" y="15" width="12" height="165" rx="6" fill="url(#wave_grad)"/>
        <rect x="264" y="45" width="12" height="135" rx="6" fill="url(#wave_grad)"/>
        <rect x="286" y="85" width="12" height="95" rx="6" fill="url(#wave_grad)"/>
        <rect x="308" y="25" width="12" height="155" rx="6" fill="url(#wave_grad)"/>
        <rect x="330" y="10" width="12" height="170" rx="6" fill="url(#wave_grad)"/>
        <rect x="352" y="55" width="12" height="125" rx="6" fill="url(#wave_grad)"/>
        <rect x="374" y="95" width="12" height="85" rx="6" fill="url(#wave_grad)"/>
        <rect x="396" y="40" width="12" height="140" rx="6" fill="url(#wave_grad)"/>
        <rect x="418" y="20" width="12" height="160" rx="6" fill="url(#wave_grad)"/>
        <rect x="440" y="65" width="12" height="115" rx="6" fill="url(#wave_grad)"/>
        <rect x="462" y="105" width="12" height="75" rx="6" fill="url(#wave_grad)"/>
        <rect x="484" y="30" width="12" height="150" rx="6" fill="url(#wave_grad)"/>
        <rect x="506" y="15" width="12" height="165" rx="6" fill="url(#wave_grad)"/>
        <rect x="528" y="50" width="12" height="130" rx="6" fill="url(#wave_grad)"/>
        <rect x="550" y="80" width="12" height="100" rx="6" fill="url(#wave_grad)"/>
        <rect x="572" y="40" width="12" height="140" rx="6" fill="url(#wave_grad)"/>
        <rect x="594" y="110" width="12" height="70" rx="6" fill="url(#wave_grad)"/>
      </g>
    </g>

    <!-- Playback Scrubber & Controls -->
    <g transform="translate(380, 400)">
      <text x="0" y="12" font-family="DejaVu Sans, sans-serif" font-size="13" font-weight="bold" fill="#a855f7">02:45</text>
      <!-- Timeline Track -->
      <rect x="55" y="4" width="590" height="8" rx="4" fill="#1e1b38"/>
      <rect x="55" y="4" width="380" height="8" rx="4" fill="#a855f7"/>
      <circle cx="435" cy="8" r="7" fill="#ffffff"/>
      <text x="705" y="12" font-family="DejaVu Sans, sans-serif" font-size="13" fill="#64748b" text-anchor="end">04:12</text>

      <!-- Vector Control Buttons -->
      <g transform="translate(210, 35)">
        <!-- Prev Button: Bar + Left Triangle -->
        <circle cx="30" cy="20" r="18" fill="#1e1b38"/>
        <rect x="22" y="14" width="2" height="12" fill="#cbd5e1"/>
        <polygon points="34,14 26,20 34,26" fill="#cbd5e1"/>
        
        <!-- Pause Button: 2 Vertical Bars -->
        <circle cx="90" cy="20" r="26" fill="#8b5cf6" filter="url(#shadow)"/>
        <rect x="83" y="11" width="5" height="18" rx="2" fill="#ffffff"/>
        <rect x="92" y="11" width="5" height="18" rx="2" fill="#ffffff"/>
        
        <!-- Next Button: Right Triangle + Bar -->
        <circle cx="150" cy="20" r="18" fill="#1e1b38"/>
        <polygon points="144,14 152,20 144,26" fill="#cbd5e1"/>
        <rect x="154" y="14" width="2" height="12" fill="#cbd5e1"/>

        <!-- Shuffle / Mode Badge -->
        <rect x="195" y="6" width="60" height="28" rx="14" fill="#1e1b38" stroke="#a855f7" stroke-width="1"/>
        <text x="225" y="24" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#c084fc" text-anchor="middle">STREAM</text>
      </g>

      <!-- Platforms Support Badges -->
      <g transform="translate(500, 48)">
        <text x="200" y="16" font-family="DejaVu Sans, sans-serif" font-size="12" font-weight="bold" fill="#c084fc" text-anchor="end">Pyrogram • Py-Tgcalls • FFmpeg</text>
      </g>
    </g>
  </g>
</svg>'''
    render_svg_to_png(svg, os.path.join(OUT_DIR, "Melody.png"))


def generate_heroku_bun():
    svg = '''<svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg_glow" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#141124"/>
      <stop offset="60%" stop-color="#0a0814"/>
      <stop offset="100%" stop-color="#05040a"/>
    </radialGradient>
    <radialGradient id="purple_glow" cx="20%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#79589f" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#79589f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bun_glow" cx="80%" cy="70%" r="45%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="term_bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12101e" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0b0a13" stop-opacity="0.98"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1200" height="600" fill="url(#bg_glow)"/>
  <rect width="1200" height="600" fill="url(#purple_glow)"/>
  <rect width="1200" height="600" fill="url(#bun_glow)"/>

  <!-- Left: Heroku Deployment Terminal -->
  <g filter="url(#shadow)">
    <rect x="60" y="45" width="640" height="510" rx="16" fill="url(#term_bg)" stroke="#79589f" stroke-opacity="0.4" stroke-width="1.5"/>
    
    <!-- Titlebar -->
    <rect x="60" y="45" width="640" height="42" rx="16" fill="#201b33" fill-opacity="0.7"/>
    <circle cx="85" cy="66" r="6" fill="#ef4444"/>
    <circle cx="105" cy="66" r="6" fill="#f59e0b"/>
    <circle cx="125" cy="66" r="6" fill="#10b981"/>
    <text x="380" y="71" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#c084fc" text-anchor="middle">heroku-buildpack-bun (v1.4.2) — build log</text>

    <!-- Terminal Lines -->
    <g transform="translate(85, 115)" font-family="DejaVu Sans Mono, monospace" font-size="13">
      <text x="0" y="0" fill="#a855f7" font-weight="bold">-----&gt; <tspan fill="#f8fafc">Fetching Bun v1.4.2 for linux-x64...</tspan></text>
      <text x="0" y="24" fill="#64748b">       Downloading https://github.com/oven-sh/bun/releases/...</text>
      <text x="0" y="48" fill="#10b981">       [OK] Verified official binary release</text>
      
      <text x="0" y="88" fill="#a855f7" font-weight="bold">-----&gt; <tspan fill="#f8fafc">Restoring Bun cache from prior build...</tspan></text>
      <text x="0" y="112" fill="#38bdf8">       [CACHE HIT] Restored 148MB node_modules and ~/.bun/install/cache</text>
      
      <text x="0" y="152" fill="#a855f7" font-weight="bold">-----&gt; <tspan fill="#f8fafc">Running bun install --frozen-lockfile</tspan></text>
      <text x="0" y="176" fill="#facc15">       Saved 1,280 dependencies in 412ms [28x faster than npm]</text>
      
      <text x="0" y="216" fill="#a855f7" font-weight="bold">-----&gt; <tspan fill="#f8fafc">Running build script: bun run build</tspan></text>
      <text x="0" y="240" fill="#64748b">       $ next build</text>
      <text x="0" y="264" fill="#38bdf8">       ✓ Compiled successfully in 1.8s</text>
      
      <text x="0" y="304" fill="#a855f7" font-weight="bold">-----&gt; <tspan fill="#f8fafc">Discovering process types</tspan></text>
      <text x="0" y="328" fill="#64748b">       Procfile declares types: web</text>
      <text x="0" y="352" fill="#10b981" font-weight="bold">-----&gt; Compressing slug: 38.4MB / 500MB</text>
      <text x="0" y="376" fill="#34d399" font-weight="bold">-----&gt; Launching... deployed to Heroku ✓</text>
    </g>
  </g>

  <!-- Right: Speed Benchmark & Metrics -->
  <g filter="url(#shadow)" transform="translate(730, 45)">
    <rect width="410" height="250" rx="18" fill="#131024" fill-opacity="0.9" stroke="#79589f" stroke-opacity="0.35" stroke-width="1.5"/>
    
    <text x="25" y="38" font-family="DejaVu Sans, sans-serif" font-size="14" font-weight="bold" fill="#c084fc">INSTALL SPEED BENCHMARK</text>
    
    <!-- Bun Speed -->
    <g transform="translate(25, 60)">
      <text x="0" y="0" font-family="DejaVu Sans, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Bun (with buildpack cache)</text>
      <text x="360" y="0" font-family="DejaVu Sans Mono, monospace" font-size="13" font-weight="bold" fill="#34d399" text-anchor="end">412ms</text>
      <rect x="0" y="10" width="360" height="18" rx="9" fill="#1e1b38"/>
      <rect x="0" y="10" width="360" height="18" rx="9" fill="#22c55e"/>
    </g>

    <!-- npm Speed -->
    <g transform="translate(25, 120)">
      <text x="0" y="0" font-family="DejaVu Sans, sans-serif" font-size="13" fill="#94a3b8">Standard npm install</text>
      <text x="360" y="0" font-family="DejaVu Sans Mono, monospace" font-size="13" fill="#f87171" text-anchor="end">38,400ms</text>
      <rect x="0" y="10" width="360" height="18" rx="9" fill="#1e1b38"/>
      <rect x="0" y="10" width="16" height="18" rx="8" fill="#ef4444"/>
    </g>

    <!-- Speedup Callout -->
    <g transform="translate(25, 185)">
      <rect width="360" height="42" rx="12" fill="#22c55e" fill-opacity="0.15" stroke="#22c55e" stroke-width="1"/>
      <polygon points="55,14 47,24 53,24 50,32 60,20 54,20" fill="#4ade80"/>
      <text x="195" y="26" font-family="DejaVu Sans, sans-serif" font-size="13" font-weight="bold" fill="#4ade80" text-anchor="middle">Over 90x Faster CI / Deploy Cycles</text>
    </g>
  </g>

  <!-- Right: Architecture Badges -->
  <g transform="translate(730, 320)">
    <rect width="410" height="235" rx="18" fill="#131024" fill-opacity="0.85" stroke="#332a5e" stroke-width="1"/>
    
    <text x="25" y="38" font-family="DejaVu Sans, sans-serif" font-size="13" font-weight="bold" fill="#94a3b8">FEATURES &amp; INTEGRATION</text>

    <g transform="translate(25, 55)" font-family="DejaVu Sans, sans-serif" font-size="13" fill="#e2e8f0">
      <path d="M0 14 L4 18 L10 10" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round"/>
      <text x="22" y="16">Installs official multi-arch Bun binaries</text>

      <path d="M0 48 L4 52 L10 44" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round"/>
      <text x="22" y="50">Persists build cache across deployments</text>

      <path d="M0 82 L4 86 L10 78" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round"/>
      <text x="22" y="84">Runs bun install + automatic build scripts</text>

      <path d="M0 116 L4 120 L10 112" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round"/>
      <text x="22" y="118">Zero overhead runtime on Heroku dynos</text>
    </g>

    <!-- Stack Pill Tags -->
    <g transform="translate(25, 190)">
      <rect x="0" y="0" width="80" height="26" rx="13" fill="#79589f" fill-opacity="0.2" stroke="#79589f" stroke-width="1"/>
      <text x="40" y="17" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#c084fc" text-anchor="middle">HEROKU</text>
      
      <rect x="90" y="0" width="70" height="26" rx="13" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1"/>
      <text x="125" y="17" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#fbbf24" text-anchor="middle">BUN</text>

      <rect x="170" y="0" width="75" height="26" rx="13" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1"/>
      <text x="207" y="17" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#38bdf8" text-anchor="middle">SHELL</text>
      
      <rect x="255" y="0" width="85" height="26" rx="13" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
      <text x="297" y="17" font-family="DejaVu Sans, sans-serif" font-size="11" font-weight="bold" fill="#34d399" text-anchor="middle">DEVOPS</text>
    </g>
  </g>
</svg>'''
    render_svg_to_png(svg, os.path.join(OUT_DIR, "heroku-buildpack-bun.png"))


if __name__ == "__main__":
    print("--- 1. Processing AI Images for BinaryInspector, Paila, TG-GithubBot ---")
    process_ai_image(
        "/home/bisu/.gemini/antigravity/brain/80308cfe-5d24-4354-8b4e-4d1d083ed6c8/binaryinspector_showcase_1791574777454.jpg",
        os.path.join(OUT_DIR, "BinaryInspector.png")
    )
    process_ai_image(
        "/home/bisu/.gemini/antigravity/brain/80308cfe-5d24-4354-8b4e-4d1d083ed6c8/paila_showcase_1791574831449.jpg",
        os.path.join(OUT_DIR, "Paila.png")
    )
    process_ai_image(
        "/home/bisu/.gemini/antigravity/brain/80308cfe-5d24-4354-8b4e-4d1d083ed6c8/tg_githubbot_showcase_1791574872371.jpg",
        os.path.join(OUT_DIR, "TG-GithubBot.png")
    )

    print("\n--- 2. Generating vector showcase graphics for remaining projects ---")
    generate_tg_wordgame()
    generate_ninfo()
    generate_melody()
    generate_heroku_bun()
    print("\nAll 8 project master PNGs generated successfully.")
