/**
 * Interactive 3D Isometric System Architecture Visualizer
 * Real-time 3D Pipeline: Nginx -> Laravel -> Redis Queues -> MySQL DB Cluster
 * 100% Custom Canvas Mathematics - Zero CDN Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    const canvas = document.getElementById('arch-3d-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resize() {
        width = canvas.width = canvas.parentElement.clientWidth || 900;
        height = canvas.height = 340;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 3D Nodes Definition
    const nodes = [
        { id: 'clients', label: 'Client / WebRTC Traffic', x: -280, y: 0, z: 0, color: '#38bdf8', metric: 'Real-time WebSocket & ICE' },
        { id: 'nginx', label: 'Nginx Reverse Proxy', x: -140, y: -20, z: 20, color: '#06b6d4', metric: '10k+ Concurrency / SSL Termination' },
        { id: 'laravel', label: 'Laravel Core & APIs', x: 0, y: 0, z: 0, color: '#6366f1', metric: 'Clean Architecture & Idempotency' },
        { id: 'redis', label: 'Redis Queues & Horizon', x: 150, y: -70, z: -30, color: '#ef4444', metric: '-42% API Latency Cut / PubSub' },
        { id: 'mysql', label: 'MySQL Enterprise DB', x: 160, y: 70, z: 30, color: '#10b981', metric: 'EXPLAIN Optimized / Zero Deadlocks' }
    ];

    // 3D Links / Data Pipelines
    const links = [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 }
    ];

    // 3D Data Packets
    const packets = [];
    for (let i = 0; i < 16; i++) {
        packets.push({
            linkIndex: Math.floor(Math.random() * links.length),
            progress: Math.random(),
            speed: 0.006 + Math.random() * 0.008
        });
    }

    let rotY = 0.2;
    let rotX = 0.35;
    let targetRotY = 0.2;
    let targetRotX = 0.35;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let hoveredNode = null;

    // Drag to Rotate 3D Architecture
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            targetRotY += dx * 0.008;
            targetRotX += dy * 0.008;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        }

        // Hit detection on 3D nodes
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        hoveredNode = null;
        for (let i = 0; i < projectedNodes.length; i++) {
            const p = projectedNodes[i];
            const dist = Math.hypot(p.x - mx, p.y - my);
            if (dist < 28) {
                hoveredNode = nodes[i];
                break;
            }
        }
    }, { passive: true });

    let projectedNodes = [];

    function project(x, y, z) {
        // Isometric 3D Projection
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);

        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const focal = 550;
        const scale = focal / (focal + z2);

        return {
            x: width / 2 + x1 * scale,
            y: height / 2 + y2 * scale,
            scale: scale,
            z: z2
        };
    }

    function render() {
        rotY += (targetRotY - rotY) * 0.08;
        rotX += (targetRotX - rotX) * 0.08;

        ctx.clearRect(0, 0, width, height);

        // Project all nodes
        projectedNodes = nodes.map(n => project(n.x, n.y, n.z));

        // Draw 3D Connecting Pipes
        ctx.lineWidth = 2.5;
        for (let i = 0; i < links.length; i++) {
            const p1 = projectedNodes[links[i].from];
            const p2 = projectedNodes[links[i].to];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.stroke();

            // Glow line
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw Flowing 3D Data Packets
        for (let i = 0; i < packets.length; i++) {
            const pkt = packets[i];
            pkt.progress += pkt.speed;
            if (pkt.progress >= 1) pkt.progress = 0;

            const link = links[pkt.linkIndex];
            const p1 = projectedNodes[link.from];
            const p2 = projectedNodes[link.to];

            const curX = p1.x + (p2.x - p1.x) * pkt.progress;
            const curY = p1.y + (p2.y - p1.y) * pkt.progress;

            ctx.beginPath();
            ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#06b6d4';
            ctx.shadowColor = '#06b6d4';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Draw 3D Isometric Server Nodes
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            const p = projectedNodes[i];
            const isHovered = hoveredNode === n;

            // 3D Hexagonal/Isometric Node Box
            const radius = isHovered ? 26 * p.scale : 20 * p.scale;

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? 'rgba(99, 102, 241, 0.4)' : 'rgba(13, 19, 34, 0.85)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = n.color;
            ctx.shadowColor = n.color;
            ctx.shadowBlur = isHovered ? 20 : 10;
            ctx.stroke();
            ctx.restore();

            // Node Label
            ctx.font = `${Math.round(11 * p.scale)}px var(--font-mono), monospace`;
            ctx.fillStyle = '#f8fafc';
            ctx.textAlign = 'center';
            ctx.fillText(n.label, p.x, p.y + radius + 15);

            if (isHovered) {
                ctx.font = '10px var(--font-mono), monospace';
                ctx.fillStyle = '#34d399';
                ctx.fillText(`● ${n.metric}`, p.x, p.y + radius + 30);
            }
        }

        // Instructions Hint
        ctx.font = '10px var(--font-mono), monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.textAlign = 'left';
        ctx.fillText('⚡ 3D Architecture Simulator: Drag to rotate 3D view | Hover nodes for metrics', 15, height - 12);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})();

