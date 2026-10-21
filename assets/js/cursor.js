/**
 * 2026 Cyber Magnetic Cursor & Interactive Targeting Reticle
 * Features:
 *  - High-precision laser dot + Smooth Lerp trailing ring
 *  - Hover targeting lock & expansion on buttons/cards
 *  - Magnetic micro-displacement physics on buttons
 * 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Create cursor elements dynamically
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Instant laser dot update
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    // Smooth Lerp Trailing for Ring
    function loop() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Hover targeting detection on interactive targets
    const interactives = document.querySelectorAll('a, button, .tilt-card, .cmd-pill, input, textarea');

    interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('cursor-locked');
            dot.classList.add('dot-expanded');
        });

        el.addEventListener('mouseleave', () => {
            ring.classList.remove('cursor-locked');
            dot.classList.remove('dot-expanded');
            if (el.classList.contains('magnetic-btn')) {
                el.style.transform = 'translate3d(0, 0, 0)';
            }
        });

        // Magnetic Micro-Pull for magnetic buttons
        if (el.classList.contains('btn') || el.classList.contains('social-link')) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const btnCenterX = rect.left + rect.width / 2;
                const btnCenterY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - btnCenterX) * 0.22;
                const deltaY = (e.clientY - btnCenterY) * 0.22;
                el.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
            });
        }
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
})();

