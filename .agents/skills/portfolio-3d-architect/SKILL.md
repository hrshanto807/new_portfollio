---
name: portfolio-3d-architect
description: >-
  Architects, builds, and maintains a high-performance 2026 AI-era 3D Senior Full-Stack Developer portfolio using raw HTML, CSS3, modern Vanilla JavaScript, Three.js, and GSAP. Use this skill when modifying, adding 3D effects, tuning WebGL shaders/particles, expanding terminal CLI commands, or refining senior architecture showcases.
---

# Portfolio 3D Architect Skill

Use this skill to design, build, and optimize the 3D Senior Full-Stack Developer portfolio.

## Architecture Guidelines

1. **WebGL / Three.js Pipeline (`js/three-scene.js`):**
   - Initialize `THREE.Scene`, `THREE.PerspectiveCamera`, and `THREE.WebGLRenderer` with `antialias: true` and `alpha: true`.
   - Setup a mouse-responsive particle constellation or wireframe torus geometry with custom point materials.
   - Attach `resize` listener to maintain correct camera aspect ratio and renderer pixel ratio (`Math.min(window.devicePixelRatio, 2)`).
   - Clean up animations on hidden tabs using `requestAnimationFrame`.

2. **Interactive Terminal (`js/terminal.js`):**
   - Provide an in-browser Linux/CLI style prompt (`developer@portfolio:~$`).
   - Supported commands:
     - `help`: Lists all available commands.
     - `whoami` / `bio`: Outputs senior developer background and engineering philosophy.
     - `skills`: Displays categorized technical stack with proficiency.
     - `architecture`: Explains system design, high-concurrency patterns, and database scaling.
     - `projects`: Lists featured enterprise & full-stack projects with direct links.
     - `contact`: Outputs social links, email, and contact details.
     - `clear`: Clears the terminal screen.
     - `theme`: Toggles ambient cyber lighting (e.g. Cyan / Violet / Emerald).

3. **3D Cards & Parallax Dynamics (`js/cards-tilt.js`):**
   - Use CSS 3D Transforms (`perspective(1000px) rotateX() rotateY() scale3d()`).
   - Calculate cursor position relative to card center and apply subtle rotation.
   - Render a dynamic radial gradient overlay on `:before` for a real-time light reflection/glare.

4. **Senior Full-Stack Showcase:**
   - Feature real architectural patterns: Caching (Redis), Queue workers, Event-driven architecture, Database sharding, Microservices, and AI integrations (LLM APIs, Vector Search).

