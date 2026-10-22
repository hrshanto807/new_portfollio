/**
 * Multi-Layer 3D Depth Card Tilt & Specular Glare Physics
 * Child elements with .tilt-pop-lg or .tilt-pop-md physically pop out in 3D space!
 * 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach((card) => {
        // Ensure glare element exists
        let glare = card.querySelector('.tilt-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'tilt-glare';
            card.appendChild(glare);
        }

        const popLgElements = card.querySelectorAll('.tilt-pop-lg');
        const popMdElements = card.querySelectorAll('.tilt-pop-md');

        const MAX_TILT = 14; // Degrees

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const pctX = x / rect.width;
            const pctY = y / rect.height;

            const tiltX = (pctY - 0.5) * -MAX_TILT;
            const tiltY = (pctX - 0.5) * MAX_TILT;

            card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

            // Deep 3D Popout for internal layers
            popLgElements.forEach((el) => {
                el.style.transform = 'translateZ(42px)';
            });

            popMdElements.forEach((el) => {
                el.style.transform = 'translateZ(24px)';
            });

            if (glare) {
                glare.style.background = `radial-gradient(circle at ${(pctX * 100).toFixed(1)}% ${(pctY * 100).toFixed(1)}%, rgba(6, 182, 212, 0.22) 0%, rgba(255, 255, 255, 0.12) 25%, transparent 65%)`;
            }
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

            popLgElements.forEach((el) => {
                el.style.transform = 'translateZ(0px)';
            });

            popMdElements.forEach((el) => {
                el.style.transform = 'translateZ(0px)';
            });
        }, { passive: true });
    });

    // 3D Gyroscope Chamber Kinetic Mouse Tracking
    const heroSection = document.querySelector('.hero');
    const gyroChamber = document.querySelector('.gyro-chamber');

    if (heroSection && gyroChamber) {
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            targetX = x * 10; // Degrees tilt
            targetY = y * -10;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        }, { passive: true });

        function renderHero3DParallax() {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            gyroChamber.style.transform = `perspective(1200px) rotateY(${currentX.toFixed(2)}deg) rotateX(${currentY.toFixed(2)}deg)`;
            requestAnimationFrame(renderHero3DParallax);
        }
        requestAnimationFrame(renderHero3DParallax);
    }
})();
