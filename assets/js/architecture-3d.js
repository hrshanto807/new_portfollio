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
        height = canvas.height = canvas.parentElement.clientHeight || 340;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // 3D Nodes Metadata
    const nodes = [
        { 
            id: 'clients', 
            label: 'Client / WebRTC Traffic', 
            shortLabel: 'Client Traffic', 
            color: '#38bdf8', 
            metric: 'Real-time WebSocket & ICE' 
        },
        { 
            id: 'nginx', 
            label: 'Nginx Reverse Proxy', 
            shortLabel: 'Nginx Proxy', 
            color: '#06b6d4', 
            metric: '10k+ Concurrency / SSL' 
        },
        { 
            id: 'laravel', 
            label: 'Laravel Core & APIs', 
            shortLabel: 'Laravel APIs', 
            color: '#6366f1', 
            metric: 'Clean Architecture & Idempotency' 
        },
        { 
            id: 'redis', 
            label: 'Redis Queues & Horizon', 
            shortLabel: 'Redis Queues', 
            color: '#ef4444', 
            metric: '-42% Latency Cut / PubSub' 
        },
        { 
            id: 'mysql', 
            label: 'MySQL Enterprise DB', 
            shortLabel: 'MySQL DB', 
            color: '#10b981', 
            metric: 'EXPLAIN Optimized / Zero Deadlocks' 
        }
    ];

    // Responsive 3D Coordinates:
    // Desktop (width >= 600): Wide linear pipeline
    // Mobile (width < 600): Balanced multi-tier cloud topology (no overlapping text)
    function getNodeCoords(index) {
        if (width < 600) {
            // Tier 1: Client (top-left) & Nginx (top-right)
            // Tier 2: Laravel Core (center)
            // Tier 3: Redis Queues (bottom-left) & MySQL DB (bottom-right)
            const mobileCoords = [
                { x: -110, y: -75, z: 10 },
                { x: 65,   y: -60, z: 20 },
                { x: -25,  y: 5,   z: 0 },
                { x: -95,  y: 75,  z: -20 },
                { x: 85,   y: 75,  z: 20 }
            ];
            return mobileCoords[index];
        } else {
            const desktopCoords = [
                { x: -280, y: 0,   z: 0 },
                { x: -140, y: -20, z: 20 },
                { x: 0,    y: 0,   z: 0 },
                { x: 150,  y: -70, z: -30 },
                { x: 160,  y: 70,  z: 30 }
            ];
            return desktopCoords[index];
        }
    }

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

    let rotY = 0.15;
    let rotX = 0.25;
    let targetRotY = 0.15;
    let targetRotX = 0.25;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let hoveredNode = null;

    // Drag to Rotate
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

    // Mobile Touch Drag & Tap Support
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;

            // Touch tap detection
            const rect = canvas.getBoundingClientRect();
            const tx = e.touches[0].clientX - rect.left;
            const ty = e.touches[0].clientY - rect.top;

            let touched = null;
            for (let i = 0; i < projectedNodes.length; i++) {
                const p = projectedNodes[i];
                const dist = Math.hypot(p.x - tx, p.y - ty);
                if (dist < 32) {
                    touched = nodes[i];
                    break;
                }
            }
            if (touched) {
                hoveredNode = (hoveredNode === touched) ? null : touched;
            }
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
            const dx = e.touches[0].clientX - lastMouseX;
            const dy = e.touches[0].clientY - lastMouseY;
            targetRotY += dx * 0.008;
            targetRotX += dy * 0.008;
            lastMouseX = e.touches[0].clientX;
            lastMouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    let projectedNodes = [];

    function project(x, y, z) {
        // Isometric 3D Projection with responsive scale
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
        
        let responsiveScale;
        if (width < 480) {
            responsiveScale = Math.min(1.0, Math.max(0.75, (width - 20) / 360));
        } else if (width < 768) {
            responsiveScale = Math.min(1.0, Math.max(0.70, (width - 40) / 520));
        } else {
            responsiveScale = Math.min(1.15, Math.max(0.75, (width - 60) / 740));
        }

        return {
            x: width / 2 + x1 * scale * responsiveScale,
            y: height / 2 + y2 * scale * responsiveScale,
            scale: scale * responsiveScale,
            z: z2
        };
    }

    function render() {
        rotY += (targetRotY - rotY) * 0.08;
        rotX += (targetRotX - rotX) * 0.08;

        ctx.clearRect(0, 0, width, height);

        const isMobile = width < 600;

        // Project all nodes with responsive coordinates
        projectedNodes = nodes.map((n, idx) => {
            const c = getNodeCoords(idx);
            return project(c.x, c.y, c.z);
        });

        // Draw 3D Connecting Pipes
        ctx.lineWidth = 2.5;
        for (let i = 0; i < links.length; i++) {
            const p1 = projectedNodes[links[i].from];
            const p2 = projectedNodes[links[i].to];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.stroke();

            // Glow line
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.28)';
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
            ctx.arc(curX, curY, isMobile ? 3 : 3.5, 0, Math.PI * 2);
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
            const radius = isHovered ? (isMobile ? 22 : 26) * p.scale : (isMobile ? 17 : 20) * p.scale;

            ctx.save();
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? 'rgba(99, 102, 241, 0.45)' : 'rgba(13, 19, 34, 0.9)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = n.color;
            ctx.shadowColor = n.color;
            ctx.shadowBlur = isHovered ? 20 : 10;
            ctx.stroke();
            ctx.restore();

            // Node Label (Responsive string & size)
            const labelText = isMobile ? n.shortLabel : n.label;
            const fontSize = Math.max(9, Math.round((isMobile ? 10 : 11) * p.scale));
            ctx.font = `${fontSize}px var(--font-mono), monospace`;
            ctx.fillStyle = '#f8fafc';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText(labelText, p.x, p.y + radius + (isMobile ? 12 : 15));

            // Hover / Tap Telemetry Badge
            if (isHovered) {
                const metricText = `● ${n.metric}`;
                ctx.font = `${isMobile ? 9 : 10}px var(--font-mono), monospace`;
                const textWidth = ctx.measureText(metricText).width;
                const pillH = isMobile ? 18 : 20;
                const pillW = textWidth + 14;
                const pillY = p.y + radius + (isMobile ? 24 : 28);

                ctx.save();
                ctx.fillStyle = 'rgba(6, 12, 24, 0.92)';
                ctx.strokeStyle = n.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(p.x - pillW / 2, pillY - pillH / 2, pillW, pillH, 8);
                } else {
                    ctx.rect(p.x - pillW / 2, pillY - pillH / 2, pillW, pillH);
                }
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#34d399';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(metricText, p.x, pillY);
                ctx.restore();
            }
        }

        // Instructions Hint (Responsive layout & truncation fix)
        ctx.font = isMobile ? '9px var(--font-mono), monospace' : '10px var(--font-mono), monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        if (isMobile) {
            ctx.textAlign = 'center';
            ctx.fillText('⚡ Drag to rotate 3D view • Tap nodes for metrics', width / 2, height - 10);
        } else {
            ctx.textAlign = 'left';
            ctx.fillText('⚡ 3D Architecture Simulator: Drag to rotate 3D view | Hover nodes for metrics', 15, height - 12);
        }

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})();
