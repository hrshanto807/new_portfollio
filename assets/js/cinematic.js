/**
 * 2026 VIP Cinematic & Video-Reel Simulation Engine
 * Features:
 *  - Real-time Audio/Data Frequency Waveform Visualizer
 *  - Interactive 4K Canvas Project Video Simulations (WebRTC streams, Queue charts)
 *  - Cinematic Film Flares & Live Status Telemetry
 * 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    // 1. Audio / HUD Frequency Spectrum Visualizer in Header
    const eqBars = document.querySelectorAll('.eq-bar');
    if (eqBars.length > 0) {
        function animateEQ() {
            eqBars.forEach((bar) => {
                const height = Math.floor(Math.random() * 16) + 4;
                bar.style.height = `${height}px`;
            });
            setTimeout(() => requestAnimationFrame(animateEQ), 100);
        }
        requestAnimationFrame(animateEQ);
    }

    // 2. Interactive Video Simulation Canvases inside Project Cards (Optimized with Visibility Tracking)
    const projectCanvases = document.querySelectorAll('.project-sim-canvas');

    projectCanvases.forEach((canvas) => {
        const type = canvas.getAttribute('data-type');
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let step = 0;
        let isVisible = false;
        let animId = null;

        function resize() {
            width = canvas.width = canvas.parentElement.clientWidth || 340;
            height = canvas.height = canvas.parentElement.clientHeight || 215;
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });

        // Viewport intersection observer to avoid CPU/GPU throttling
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (isVisible && !animId) {
                        animId = requestAnimationFrame(drawSim);
                    } else if (!isVisible && animId) {
                        cancelAnimationFrame(animId);
                        animId = null;
                    }
                });
            }, { rootMargin: '100px' });
            observer.observe(canvas);
        } else {
            isVisible = true;
            animId = requestAnimationFrame(drawSim);
        }

        function drawSim() {
            if (!isVisible) {
                animId = null;
                return;
            }
            step += 0.05;
            ctx.clearRect(0, 0, width, height);

            if (type === 'webrtc') {
                // Draw WebRTC Live Audio/Video Stream Waveforms
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#06b6d4';
                ctx.beginPath();
                for (let x = 0; x < width; x += 4) {
                    const y = height / 2 + Math.sin(x * 0.04 + step) * 25 * Math.sin(x * 0.01 + step * 0.5);
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();

                // Secondary harmonic wave
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
                ctx.beginPath();
                for (let x = 0; x < width; x += 4) {
                    const y = height / 2 + Math.cos(x * 0.03 - step) * 18;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();

            } else if (type === 'saas') {
                // Draw Real-time Multi-tenant DB & Horizon Queues Bar Chart
                const barCount = 18;
                const barWidth = (width - 40) / barCount;
                for (let i = 0; i < barCount; i++) {
                    const h = Math.abs(Math.sin(step + i * 0.4)) * 60 + 15;
                    const x = 20 + i * barWidth;
                    const y = height - h - 15;

                    ctx.fillStyle = i % 2 === 0 ? 'rgba(99, 102, 241, 0.7)' : 'rgba(6, 182, 212, 0.7)';
                    ctx.fillRect(x, y, barWidth - 4, h);
                }

            } else if (type === 'edutab') {
                // Draw High-Concurrency Result Engine Chunked Processing Stream
                ctx.fillStyle = '#10b981';
                for (let i = 0; i < 12; i++) {
                    const px = (i * 32 + step * 40) % (width + 40) - 20;
                    const py = 40 + Math.sin(px * 0.02) * 20;
                    ctx.beginPath();
                    ctx.arc(px, py, 4, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Metric baseline
                ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
                ctx.beginPath();
                ctx.moveTo(0, 40);
                ctx.lineTo(width, 40);
                ctx.stroke();

            } else {
                // Default Dynamic Cyber Grid Pulse
                ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
                for (let x = 0; x < width; x += 30) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, height);
                    ctx.stroke();
                }
                const sweepY = (Math.sin(step) * 0.5 + 0.5) * height;
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.8)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, sweepY);
                ctx.lineTo(width, sweepY);
                ctx.stroke();
            }

            animId = requestAnimationFrame(drawSim);
        }
    });
})();
