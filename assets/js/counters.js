/**
 * Kinetic Number Counters & Viewport Scroll Reveal Engine
 * 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    // Kinetic Number Counters
    const counterElements = document.querySelectorAll('.counter-val');
    let countersStarted = false;

    function runCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counterElements.forEach((el) => {
            const target = parseFloat(el.getAttribute('data-target'));
            const isFloat = el.getAttribute('data-float') === 'true';
            const duration = 1800; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic: 1 - Math.pow(1 - progress, 3)
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentVal = eased * target;

                if (isFloat) {
                    el.textContent = currentVal.toFixed(1);
                } else {
                    el.textContent = Math.floor(currentVal);
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = isFloat ? target.toFixed(1) : target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Observe Metrics Section
    const metricsSection = document.getElementById('metrics');
    if (metricsSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    runCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(metricsSection);
    } else {
        // Fallback for older browsers
        runCounters();
    }

    // Scroll Reveal for Kinetic Elements
    const revealElements = document.querySelectorAll('.reveal-init');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealElements.forEach((el) => {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach((el) => el.classList.add('revealed'));
    }
})();

