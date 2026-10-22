/**
 * Cybernetic Project Gallery Lightbox & Responsive Slider
 * Features:
 *  - High-res multi-device viewport slider (Desktop, Laptop, Tablet, Mobile)
 *  - Thumbnail navigation strip with active neon indicators
 *  - Keyboard navigation (Left/Right arrows, Escape to exit)
 *  - Mobile touch swipe gestures (Swipe Left / Swipe Right)
 *  - 100% Custom JavaScript - Zero Dependencies
 * Hasibur Rahman Shanto - Senior Full-Stack Portfolio
 */

(function () {
    'use strict';

    // Gallery Database
    const galleryData = {
        'bnsmsoft': {
            title: 'BNSMSoft – Enterprise Multi-Tenant SaaS ERP',
            caption: 'Dedicated database per tenant, inventory auditing, accounts receivable/payable, and automated billing engine.',
            slides: [
                {
                    src: 'assets/images/projects/bnsmsoft/desktop.png',
                    device: 'Desktop 4K View (1920×1080)',
                    desc: 'Executive analytics dashboard with real-time gross margin, cashflow metrics, and stock alerts.'
                },
                {
                    src: 'assets/images/projects/bnsmsoft/laptop.png',
                    device: 'Laptop Resolution (1440×900)',
                    desc: 'Compact layout with responsive data tables, stock ledger, and quick action shortcuts.'
                },
                {
                    src: 'assets/images/projects/bnsmsoft/tablet.png',
                    device: 'Tablet Touch View (1024×768)',
                    desc: 'Touch-optimized drawer navigation with collapsible cards and fast date range filtering.'
                },
                {
                    src: 'assets/images/projects/bnsmsoft/mobile.png',
                    device: 'Mobile Phone PWA (390×844)',
                    desc: 'Finger-friendly mobile management interface for on-the-go stock approvals and alerts.'
                }
            ]
        },
        'school': {
            title: 'EduTab – School Management & Result Engine',
            caption: 'Automated GPA grading calculations, student progress analytics, report card generation, and secure cloud storage.',
            slides: [
                {
                    src: 'assets/images/projects/school/result.png',
                    device: 'Production Academic Dashboard',
                    desc: 'Institutional grading overview with subject breakdowns, pass/fail ratios, and grade sheet generation.'
                }
            ]
        },
        'pos': {
            title: 'Omnichannel Retail POS & Real-Time Sync',
            caption: 'High-speed barcode scanning, thermal receipt generation, multi-payment checkout, and instant stock deduction.',
            slides: [
                {
                    src: 'assets/images/projects/pos/desktop.png',
                    device: 'Desktop POS Terminal (1920×1080)',
                    desc: 'High-throughput retail counter checkout with rapid barcode lookup, customer ledger, and split payments.'
                },
                {
                    src: 'assets/images/projects/pos/laptop.png',
                    device: 'Laptop POS View (1440×900)',
                    desc: 'Cashier interface featuring keyboard shortcuts, discount coupons, and instant thermal receipt printing.'
                },
                {
                    src: 'assets/images/projects/pos/tablet.png',
                    device: 'Tablet Portable POS (1024×768)',
                    desc: 'Handheld floor sales terminal for mobile retail staff with instant inventory lookup.'
                },
                {
                    src: 'assets/images/projects/pos/mobile.png',
                    device: 'Mobile Pocket Scanner (390×844)',
                    desc: 'Camera-based barcode scanning and stock taking for warehouse auditing.'
                }
            ]
        }
    };

    // Elements
    const modal = document.getElementById('project-gallery-modal');
    if (!modal) return;

    const backdrop = document.getElementById('gallery-backdrop');
    const closeBtn = document.getElementById('gallery-close-btn');
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');
    const titleEl = document.getElementById('gallery-title');
    const deviceBadgeEl = document.getElementById('gallery-device-badge');
    const counterEl = document.getElementById('gallery-counter');
    const mainImg = document.getElementById('gallery-main-img');
    const captionEl = document.getElementById('gallery-caption');
    const thumbnailsWrap = document.getElementById('gallery-thumbnails');

    let currentProjectKey = 'bnsmsoft';
    let currentSlideIdx = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Open Gallery
    function openGallery(projectKey) {
        if (!galleryData[projectKey]) {
            projectKey = 'bnsmsoft';
        }
        currentProjectKey = projectKey;
        currentSlideIdx = 0;

        renderGalleryUI();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close Gallery
    function closeGallery() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Render Current Slide & Thumbnails
    function renderGalleryUI() {
        const project = galleryData[currentProjectKey];
        const slides = project.slides;
        const currentSlide = slides[currentSlideIdx];

        titleEl.textContent = project.title;
        deviceBadgeEl.textContent = currentSlide.device;
        counterEl.textContent = `0${currentSlideIdx + 1} / 0${slides.length}`;
        captionEl.textContent = currentSlide.desc;

        // Image Transition
        mainImg.classList.add('fade-out');
        setTimeout(() => {
            mainImg.src = currentSlide.src;
            mainImg.alt = `${project.title} - ${currentSlide.device}`;
            mainImg.classList.remove('fade-out');
        }, 120);

        // Render Thumbnails
        thumbnailsWrap.innerHTML = '';
        slides.forEach((s, idx) => {
            const thumbBtn = document.createElement('button');
            thumbBtn.className = `gallery-thumb-btn ${idx === currentSlideIdx ? 'active' : ''}`;
            thumbBtn.setAttribute('aria-label', `View ${s.device}`);
            
            const thumbImg = document.createElement('img');
            thumbImg.src = s.src;
            thumbImg.alt = s.device;
            
            const thumbLabel = document.createElement('span');
            thumbLabel.className = 'thumb-device-label';
            thumbLabel.textContent = s.device.split(' ')[0];

            thumbBtn.appendChild(thumbImg);
            thumbBtn.appendChild(thumbLabel);

            thumbBtn.addEventListener('click', () => {
                currentSlideIdx = idx;
                renderGalleryUI();
            });

            thumbnailsWrap.appendChild(thumbBtn);
        });
    }

    // Slide Controls
    function nextSlide() {
        const slides = galleryData[currentProjectKey].slides;
        currentSlideIdx = (currentSlideIdx + 1) % slides.length;
        renderGalleryUI();
    }

    function prevSlide() {
        const slides = galleryData[currentProjectKey].slides;
        currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
        renderGalleryUI();
    }

    // Event Listeners
    if (closeBtn) closeBtn.addEventListener('click', closeGallery);
    if (backdrop) backdrop.addEventListener('click', closeGallery);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Touch Swipe Gestures
    const stage = document.querySelector('.gallery-stage');
    if (stage) {
        stage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
            if (diff < 0) {
                nextSlide(); // Swipe Left -> Next
            } else {
                prevSlide(); // Swipe Right -> Prev
            }
        }
    }

    // Attach click events to all trigger buttons & project preview boxes
    document.addEventListener('DOMContentLoaded', () => {
        const triggers = document.querySelectorAll('[data-gallery-trigger]');
        triggers.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const key = btn.getAttribute('data-gallery-trigger') || 'bnsmsoft';
                openGallery(key);
            });
        });
    });

    // Expose openGallery globally if needed
    window.openProjectGallery = openGallery;
})();
