/**
 * 2026 Kinetic Hacker / Cyber Text Decryption Scramble Engine
 * 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    const CHARS = '!<>-_\\/[]{}—=+*^?#________0101';

    class TextScramble {
        constructor(el) {
            this.el = el;
            this.originalText = el.innerText;
            this.frame = 0;
            this.queue = [];
            this.isAnimating = false;
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            this.queue = [];

            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 20);
                const end = start + Math.floor(Math.random() * 20);
                this.queue.push({ from, to, start, end, char: '' });
            }

            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
        }

        update() {
            let output = '';
            let complete = 0;

            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = CHARS[Math.floor(Math.random() * CHARS.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }

            this.el.innerHTML = output;

            if (complete === this.queue.length) {
                this.isAnimating = false;
            } else {
                this.frameRequest = requestAnimationFrame(this.update.bind(this));
                this.frame++;
            }
        }

        scramble() {
            if (this.isAnimating) return;
            this.isAnimating = true;
            this.setText(this.originalText);
        }
    }

    const scrambleElements = document.querySelectorAll('.scramble-trigger');
    const instances = [];

    scrambleElements.forEach((el) => {
        const scrambler = new TextScramble(el);
        instances.push({ el, scrambler });

        el.addEventListener('mouseenter', () => {
            scrambler.scramble();
        });
    });

    // Viewport Intersection Trigger for Scramble
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const match = instances.find(item => item.el === entry.target);
                    if (match) {
                        setTimeout(() => match.scrambler.scramble(), 150);
                    }
                }
            });
        }, { threshold: 0.3 });

        scrambleElements.forEach((el) => observer.observe(el));
    }
})();

