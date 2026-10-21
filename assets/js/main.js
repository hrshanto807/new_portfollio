/**
 * Main Application & Navigation Controller
 * 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    // Elements
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const currentYearEl = document.getElementById('current-year');
    const terminalLauncher = document.getElementById('launch-terminal-btn');
    const terminalInput = document.getElementById('terminal-input');

    // Dynamic Copyright Year
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Mobile Hamburger Navigation
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Active Link Highlighting on Scroll
    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 180;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // Quick Launch Terminal CTA
    if (terminalLauncher && terminalInput) {
        terminalLauncher.addEventListener('click', (e) => {
            e.preventDefault();
            const terminalSection = document.getElementById('terminal');
            if (terminalSection) {
                terminalSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    terminalInput.focus();
                }, 500);
            }
        });
    }
})();

