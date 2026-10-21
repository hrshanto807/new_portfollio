/**
 * Ultra-Modern 2026 3D Canvas Cybernetic Engine
 * Features:
 *  - 3D Rotating Cyber Icosahedron / Geodesic Polyhedron Core
 *  - 3D Particle Cloud with Connecting Neural Synapses
 *  - Interactive Mouse Repulsion & Spring Gravity Physics
 *  - Perspective 3D Grid receding into depth
 * 100% Custom Vanilla JavaScript - Zero CDN Dependencies
 */

(function () {
    'use strict';

    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;

    // 3D Engine Parameters
    const PARTICLE_COUNT = 160;
    const MAX_SYNAPSE_DIST = 120;
    const FOCAL_LENGTH = 500;
    const SPHERE_RADIUS = 380;

    // Camera & Damping
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let scrollDepth = 0;
    let targetScrollDepth = 0;

    // 3D Particles
    const particles = [];

    class Particle3D {
        constructor() {
            this.reset(true);
        }

        reset(randomZ = false) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = SPHERE_RADIUS * (0.5 + Math.random() * 0.8);

            this.originX = radius * Math.sin(phi) * Math.cos(theta);
            this.originY = radius * Math.sin(phi) * Math.sin(theta);
            this.originZ = randomZ ? (Math.random() * SPHERE_RADIUS * 2 - SPHERE_RADIUS) : radius * Math.cos(phi);

            this.x = this.originX;
            this.y = this.originY;
            this.z = this.originZ;

            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.vz = (Math.random() - 0.5) * 0.5;

            this.baseSize = 1.2 + Math.random() * 1.8;
            this.hue = Math.random() > 0.4 ? 'cyan' : 'violet';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.z += this.vz;

            const bound = SPHERE_RADIUS * 1.6;
            if (Math.abs(this.x) > bound || Math.abs(this.y) > bound || Math.abs(this.z) > bound) {
                this.reset(false);
            }
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle3D());
    }

    // 3D Polyhedron / Icosahedron Geometry
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const polyVertices = [
        [-1,  t,  0], [ 1,  t,  0], [-1, -t,  0], [ 1, -t,  0],
        [ 0, -1,  t], [ 0,  1,  t], [ 0, -1, -t], [ 0,  1, -t],
        [ t,  0, -1], [ t,  0,  1], [-t,  0, -1], [-t,  0,  1]
    ].map(v => {
        const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        const r = 160; // radius of core
        return { x: (v[0] / len) * r, y: (v[1] / len) * r, z: (v[2] / len) * r };
    });

    const polyEdges = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
        [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
        [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
        [4, 9], [2, 4], [6, 2], [8, 6], [9, 8],
        [4, 5], [5, 9], [9, 1], [1, 8], [8, 7],
        [7, 6], [6, 10], [10, 2], [2, 11], [11, 4]
    ];

    let polyAngleX = 0;
    let polyAngleY = 0;
    let polyAngleZ = 0;

    // Resize Handler
    function handleResize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        centerX = width / 2;
        centerY = height / 2;
    }
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Mouse Tracking
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const normX = (e.clientX / width) * 2 - 1;
        const normY = (e.clientY / height) * 2 - 1;
        targetRotY = normX * 0.75;
        targetRotX = -normY * 0.75;
    }, { passive: true });

    // Scroll Tracking
    window.addEventListener('scroll', () => {
        targetScrollDepth = window.pageYOffset * 0.4;
    }, { passive: true });

    // 3D Projection Math
    function project3D(x, y, z, cosX, sinX, cosY, sinY) {
        // Rotate Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const depth = FOCAL_LENGTH + z2;
        if (depth <= 10) return null;

        const scale = FOCAL_LENGTH / depth;
        return {
            x: centerX + x1 * scale,
            y: centerY + y2 * scale,
            z: z2,
            scale: scale
        };
    }

    // Render Loop
    function render() {
        rotX += (targetRotX - rotX) * 0.05;
        rotY += (targetRotY - rotY) * 0.05 + 0.0018;
        scrollDepth += (targetScrollDepth - scrollDepth) * 0.08;

        polyAngleX += 0.004;
        polyAngleY += 0.006;
        polyAngleZ += 0.003;

        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);

        ctx.clearRect(0, 0, width, height);

        // --- LAYER 1: 3D CYBERNETIC PERSPECTIVE GRID FLOOR ---
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
        ctx.lineWidth = 1;
        const gridZStart = 100;
        const gridZEnd = 1200;
        const gridStep = 80;
        const groundY = 240;

        // Horizontal lines
        for (let gz = gridZStart; gz <= gridZEnd; gz += gridStep) {
            const zEff = gz - (scrollDepth % gridStep);
            const pLeft = project3D(-900, groundY, zEff, cosX, sinX, cosY, sinY);
            const pRight = project3D(900, groundY, zEff, cosX, sinX, cosY, sinY);
            if (pLeft && pRight) {
                const alpha = Math.max(0, 0.07 * (1 - zEff / gridZEnd));
                ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                ctx.beginPath();
                ctx.moveTo(pLeft.x, pLeft.y);
                ctx.lineTo(pRight.x, pRight.y);
                ctx.stroke();
            }
        }

        // Longitudinal lines
        for (let gx = -800; gx <= 800; gx += 160) {
            const pNear = project3D(gx, groundY, gridZStart, cosX, sinX, cosY, sinY);
            const pFar = project3D(gx, groundY, gridZEnd, cosX, sinX, cosY, sinY);
            if (pNear && pFar) {
                ctx.strokeStyle = 'rgba(6, 182, 212, 0.035)';
                ctx.beginPath();
                ctx.moveTo(pNear.x, pNear.y);
                ctx.lineTo(pFar.x, pFar.y);
                ctx.stroke();
            }
        }

        // --- LAYER 2: 3D ROTATING CYBER CORE (GEODESIC ICOSAHEDRON) ---
        // Calculate core rotation
        const cosPX = Math.cos(polyAngleX);
        const sinPX = Math.sin(polyAngleX);
        const cosPY = Math.cos(polyAngleY);
        const sinPY = Math.sin(polyAngleY);

        const coreProjected = [];
        for (let i = 0; i < polyVertices.length; i++) {
            const v = polyVertices[i];
            // Rotate core on its own axes
            const x1 = v.x * cosPY + v.z * sinPY;
            const z1 = -v.x * sinPY + v.z * cosPY;
            const y2 = v.y * cosPX - z1 * sinPX;
            const z2 = v.y * sinPX + z1 * cosPX;

            // Project through global camera
            const p = project3D(x1, y2 - 40, z2 + 80, cosX, sinX, cosY, sinY);
            coreProjected.push(p);
        }

        // Draw core edges
        ctx.lineWidth = 1.2;
        for (let i = 0; i < polyEdges.length; i++) {
            const [idx1, idx2] = polyEdges[i];
            const p1 = coreProjected[idx1];
            const p2 = coreProjected[idx2];
            if (p1 && p2) {
                const edgeAlpha = Math.max(0.1, Math.min(0.5, (p1.scale + p2.scale) * 0.28));
                ctx.strokeStyle = `rgba(6, 182, 212, ${edgeAlpha})`;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        // Draw glowing core vertices
        for (let i = 0; i < coreProjected.length; i++) {
            const p = coreProjected[i];
            if (!p) continue;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(1, 3.2 * p.scale), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.75)';
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
        }

        // --- LAYER 3: 3D PARTICLE SWARM & SYNAPSE LINES ---
        const projectedParticles = [];
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.update();

            const proj = project3D(p.x, p.y, p.z, cosX, sinX, cosY, sinY);
            if (!proj) continue;

            // Mouse Repulsion in 2D Screen Space
            const dx = proj.x - mouseX;
            const dy = proj.y - mouseY;
            const mouseDist = Math.sqrt(dx * dx + dy * dy);
            if (mouseDist < 140 && mouseDist > 0) {
                const force = (1 - mouseDist / 140) * 18;
                proj.x += (dx / mouseDist) * force;
                proj.y += (dy / mouseDist) * force;
            }

            const alpha = Math.max(0.12, Math.min(0.85, (p.z + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));
            projectedParticles.push({
                x: proj.x,
                y: proj.y,
                z: proj.z,
                size: p.baseSize * proj.scale,
                alpha: alpha,
                hue: p.hue
            });
        }

        // Synapses between particles
        const pLen = projectedParticles.length;
        for (let i = 0; i < pLen; i++) {
            const p1 = projectedParticles[i];
            for (let j = i + 1; j < pLen; j++) {
                const p2 = projectedParticles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_SYNAPSE_DIST) {
                    const lineAlpha = (1 - dist / MAX_SYNAPSE_DIST) * 0.25 * Math.min(p1.alpha, p2.alpha);
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw Particles
        for (let i = 0; i < pLen; i++) {
            const p = projectedParticles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.6, p.size), 0, Math.PI * 2);
            if (p.hue === 'cyan') {
                ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
            } else {
                ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
            }
            ctx.fill();
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})();
