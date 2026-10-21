# Senior Full-Stack 3D Portfolio - Project Rules & Guidelines

These rules govern the architecture, design, and code quality for the 2026 Senior Full-Stack Developer 3D Portfolio.

## 1. Engineering Philosophy (Senior Developer Standard)
- **Zero Bloat, Zero CDN, Maximum Independence:**
  - **NO CDNs:** Absolutely NO external CDN links (no Cloudflare, Google Fonts, FontAwesome, unpkg, cdnjs, etc.). The entire portfolio must be 100% self-contained, offline-capable, and custom-engineered.
  - **Custom 3D Engine:** High-performance custom 3D WebGL / Canvas math engine written in pure Vanilla JavaScript (3D perspective projection, particle constellations, dynamic rotational matrices, and physics damping).
  - **Custom SVG Icons:** Clean inline SVG icons or local SVG assets; no bloated icon font CDNs.
  - **System Font Stack:** Modern, crisp native typography stack (SF Pro, Apple System, BlinkMacSystemFont, Segoe UI, Roboto, JetBrains Mono) without external font downloads.
- **60+ FPS Render Budget:** Hardware-accelerated animations using `requestAnimationFrame`, CSS 3D transforms, and passive event listeners.
- **Strict Directory Organization (`assets/`):**
  All stylesheets, scripts, images, and vendor plugins MUST reside strictly inside the `assets/` folder:
  - `assets/css/` for all style sheets.
  - `assets/js/` for all JavaScript logic.
  - `assets/images/` for all photos, icons, and graphical assets.
  - `assets/plugins/` for any local self-contained utilities.
- **STRICT PROHIBITION OF INLINE & INTERNAL CSS/JS:**
  - **NO inline CSS:** Never use the `style="..."` attribute anywhere in HTML tags.
  - **NO internal CSS:** Never put `<style>...</style>` tags inside `index.html`.
  - **NO inline JavaScript:** Never use inline event handlers (e.g., `onclick="..."`, `onload="..."`, `onchange="..."`).
  - **NO internal JavaScript:** Never write JavaScript code directly inside `<script>...</script>` blocks in `index.html`. All JavaScript must be isolated in external `.js` files located in `assets/js/` and linked via `<script src="assets/js/..."></script>`.

## 2. 2026 Kinetic & 3D Standards ("Living / Moving / Nora-Cora" UI)
- **Custom 3D WebGL / Canvas (`assets/js/canvas-3d.js`):** 100% custom-written 3D particle constellation & cybernetic rotating geometric matrix reacting to cursor tracking (lerp damping) and scroll parallax.
- **3D Card Physics & Holographic Glare (`assets/js/tilt.js`):** Real-time perspective rotation (`perspective(1000px) rotateX() rotateY() translateZ()`) with dynamic cursor-following radial light reflection.
- **Interactive Developer Console / AI Terminal (`assets/js/terminal.js`):** Real-time interactive CLI allowing visitors to run commands (`whoami`, `skills`, `architecture`, `projects`, `contact`, `clear`).
- **Kinetic Typography & Living Elements (`assets/js/motion.js` / `assets/js/main.js`):** Staggered viewport reveals, animated counter numbers (e.g. 4+ years, 42% latency cut), and breathing neon pulse indicators.

## 3. Real Professional Content (Hasibur Rahman Shanto)
- Real identity: Hasibur Rahman Shanto, Full-Stack Software Developer (4+ years experience).
- Real core skills: PHP, Laravel 10–13, MySQL, Redis, Vue.js, Inertia.js, Alpine.js, WebSockets, WebRTC, Docker, Linux VPS, Nginx, CI/CD, OpenAI/Gemini APIs.
- Real projects: BNSMSoft (Multi-Tenant SaaS ERP), Real-Time WebRTC Calling & Chat, Manufacturing ERP, Construction Logistics ERP, Omnichannel POS Sync, EduTab Result Engine, Courier Logistics Dispatch Engine.
- Real achievements: Cut API latency by 42% via Redis queues, optimized complex SQL with EXPLAIN/composite indexes, built zero-downtime CI/CD workflows.
