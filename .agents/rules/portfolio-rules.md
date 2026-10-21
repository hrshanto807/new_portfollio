# Portfolio Development Rules

## 1. STRICT PROHIBITION OF CDNs (100% Custom & Self-Contained)
- **Zero External CDNs:** No Cloudflare, Google Fonts, FontAwesome, unpkg, cdnjs, or any third-party CDN scripts or stylesheets.
- **Custom 3D Engine:** High-performance custom 3D Canvas / WebGL physics engine written from scratch in vanilla JS.
- **Native Typography:** High-grade system typography stack (Apple SF Pro, Segoe UI, Roboto, JetBrains Mono).
- **Custom SVG Icons:** Clean inline or local SVG icons.

## 2. Directory Structure Rule
All static assets must be inside the `assets/` directory:
- `assets/css/`
- `assets/js/`
- `assets/images/`
- `assets/plugins/`

## 3. STRICT PROHIBITION: No Inline/Internal CSS or JS
- **NO `style="..."` attributes** in any HTML elements.
- **NO `<style>` tags** in `index.html`.
- **NO inline JS handlers** (e.g. `onclick="..."`, `onsubmit="..."`).
- **NO internal `<script>` code blocks** in `index.html`. All JS must be modular and linked externally from `assets/js/`.

## 4. Kinetic & 3D Interactive UI ("Nora-Cora / Living 2026 UI")
- Custom 3D background canvas reacting to mouse movements and scroll depth.
- 3D perspective tilt on all cards with dynamic pointer glare.
- Live CLI terminal with real executable commands and keyboard navigation.
- Smooth kinetic motion and animated statistics counters.

## 5. Real Data Integrity
- Content must strictly use Hasibur Rahman Shanto's authentic credentials, projects, metrics, and experience from his resume and CV.
