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
        'webrtc': {
            title: 'Real-Time WebRTC Video & Live Chat Platform',
            caption: 'Ultra-low latency (0.8ms) peer-to-peer audio/video streaming, WebSocket signaling, screen sharing, and end-to-end encrypted messaging.',
            slides: [
                {
                    src: 'assets/images/projects/webrtc/desktop.png',
                    device: 'Conference Room (1080p 60FPS)',
                    desc: 'Active 1-on-1 and multi-party video call with real-time Opus audio telemetry, floating media controls, and instant chat sidebar.'
                }
            ]
        },
        'school': {
            title: 'EduTab – School Management & Result Engine',
            caption: 'High-concurrency academic result engine, automated GPA calculations, report card generator, and fee ledger management.',
            slides: [
                {
                    src: 'assets/images/projects/school/dashboard.png',
                    device: 'Academic ERP Dashboard (1440×900)',
                    desc: 'Executive institutional dashboard with active student headcount, class distribution, attendance telemetry, and quick admin shortcuts.'
                },
                {
                    src: 'assets/images/projects/school/marksheet.png',
                    device: 'Official Student Marksheet & GPA Engine',
                    desc: 'Automated transcript generation calculating GPA, letter grade, total marks, subject-wise breakdowns, and official school seal.'
                },
                {
                    src: 'assets/images/projects/school/merit_list.png',
                    device: 'Automated Merit List & Ranking',
                    desc: 'Batch result calculation sorting thousands of students by total marks and GPA with instant rank determination.'
                },
                {
                    src: 'assets/images/projects/school/broadsheet.png',
                    device: 'Institutional Broadsheet Matrix',
                    desc: 'Comprehensive multi-subject tabulation sheet displaying class-wide academic performance across exam sessions.'
                },
                {
                    src: 'assets/images/projects/school/marks_entry.png',
                    device: 'High-Speed Marks Entry Ledger',
                    desc: 'Teacher grading interface featuring keyboard navigation, validation rules, and automatic calculation of continuous assessments.'
                },
                {
                    src: 'assets/images/projects/school/fees_collection.png',
                    device: 'Fees Collection & Receipt Generator',
                    desc: 'Accounts module tracking student tuition payments, automated receipt printing, and outstanding balance ledgers.'
                },
                {
                    src: 'assets/images/projects/school/public_portal.png',
                    device: 'Public Result Portal',
                    desc: 'High-concurrency public student portal for instantaneous roll/registration based exam result lookup.'
                }
            ]
        },
        'construction': {
            title: 'Kadamati ERP – Construction Operations & Logistics',
            caption: 'Heavy machinery fleet tracking, BNBC compliance inspections, daily site labor payroll, and ৳25.5 Cr contractor billing.',
            slides: [
                {
                    src: 'assets/images/projects/construction/equipment.jpeg',
                    device: 'Equipment Fleet & Machinery',
                    desc: 'Heavy machinery tracking (Tower Cranes, Excavators, Concrete Mixers) with maintenance alerts, utilization ratios, and site deployments.'
                },
                {
                    src: 'assets/images/projects/construction/quality-control.jpeg',
                    device: 'Quality Control & BNBC Audits',
                    desc: 'Field inspection schedules, BNBC structural compliance audits, defect photo documentation, and Non-Conformance Reports (NCR).'
                },
                {
                    src: 'assets/images/projects/construction/labour.jpeg',
                    device: 'Site Labour & Wage Engine',
                    desc: 'Biometric attendance tracking across 12 active sites, trade categorization, daily wage calculations, and monthly payroll disbursement.'
                },
                {
                    src: 'assets/images/projects/construction/billing.jpeg',
                    device: 'Billing, Running Bills & Cashflow',
                    desc: 'Contractor milestone disbursements, ৳25.5 Cr contract portfolio tracking, running bill approvals, and net monthly cashflow.'
                },
                {
                    src: 'assets/images/projects/construction/client-portal.jpeg',
                    device: 'Client Progress Portal',
                    desc: 'Owner-facing milestone dashboard (Green Valley Residence), architectural drawing vault, and photographic site progress updates.'
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
        },
        'courier': {
            title: 'Automated Courier & Logistics Dispatch Engine',
            caption: 'High-throughput order dispatching, dynamic vehicle routing, GPS vehicle telemetry, and real-time delivery status updates.',
            slides: [
                {
                    src: 'assets/images/projects/courier/desktop.png',
                    device: 'Dispatcher Control Room (1920×1080)',
                    desc: 'Interactive GIS delivery map with GPS courier telemetry, fleet SLA metrics (99.4%), and automated parcel dispatch queue.'
                }
            ]
        },
        'multivendor': {
            title: 'Enterprise Multi-Vendor E-Commerce Platform',
            caption: 'Scalable marketplace architecture featuring vendor store management, catalog moderation, automated commission splits, and multi-currency payout ledger.',
            slides: [
                {
                    src: 'assets/images/projects/multivendor/desktop.png',
                    device: 'Marketplace Operations Center (1920×1080)',
                    desc: 'Real-time GMV analytics ($1.82M), vendor sales leaderboard, live customer order stream, and Stripe Connect / bKash payout ledger.'
                }
            ]
        },
        'invoice': {
            title: 'Enterprise Order Management & Automated Invoice Engine',
            caption: 'High-concurrency order fulfillment pipeline with parallel Redis queues, automated tax/VAT calculations, and sub-100ms PDF invoice generation.',
            slides: [
                {
                    src: 'assets/images/projects/invoice/desktop.png',
                    device: 'Order Queue & Tax Invoice Preview (1920×1080)',
                    desc: 'Dual-pane workspace: real-time order processing stream (18,450 orders/day) and live rendered tax invoice preview with QR code verification.'
                }
            ]
        }
    };

    // Elements
    const modal = document.getElementById('project-gallery-modal');
    if (!modal) return;

    const container = document.getElementById('gallery-container') || modal.querySelector('.gallery-container');
    const backdrop = document.getElementById('gallery-backdrop');
    const closeBtn = document.getElementById('gallery-close-btn');
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');
    const viewmodeBtn = document.getElementById('gallery-viewmode-btn');
    const viewmodeLabel = document.getElementById('gallery-viewmode-label');
    const fullscreenBtn = document.getElementById('gallery-fullscreen-btn');
    const openRawBtn = document.getElementById('gallery-open-raw');
    const titleEl = document.getElementById('gallery-title');
    const deviceBadgeEl = document.getElementById('gallery-device-badge');
    const counterEl = document.getElementById('gallery-counter');
    const mainImg = document.getElementById('gallery-main-img');
    const slideWrap = document.getElementById('gallery-slide-wrap');
    const scrollHintEl = document.getElementById('gallery-scroll-hint');
    const captionEl = document.getElementById('gallery-caption');
    const thumbnailsWrap = document.getElementById('gallery-thumbnails');

    let currentProjectKey = 'bnsmsoft';
    let currentSlideIdx = 0;
    let isFitMode = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Auto-detect image aspect ratio for full-width responsive view
    function updateImageAspect() {
        if (!mainImg || !mainImg.naturalWidth) return;
        const isTall = mainImg.naturalHeight > mainImg.naturalWidth * 1.15;
        if (isTall) {
            mainImg.classList.add('is-tall-capture');
            mainImg.classList.remove('is-landscape');
            if (viewmodeBtn) viewmodeBtn.style.display = 'inline-flex';
            if (isFitMode) {
                mainImg.classList.add('is-fit-mode');
                if (scrollHintEl) scrollHintEl.style.display = 'none';
                if (viewmodeLabel) viewmodeLabel.textContent = 'Full Width';
            } else {
                mainImg.classList.remove('is-fit-mode');
                if (scrollHintEl) scrollHintEl.style.display = 'inline-flex';
                if (viewmodeLabel) viewmodeLabel.textContent = 'Fit Height';
            }
        } else {
            mainImg.classList.remove('is-tall-capture', 'is-fit-mode');
            mainImg.classList.add('is-landscape');
            if (scrollHintEl) scrollHintEl.style.display = 'none';
            if (viewmodeBtn) viewmodeBtn.style.display = 'none';
        }
        if (slideWrap) slideWrap.scrollTop = 0;
    }

    if (mainImg) {
        mainImg.onload = updateImageAspect;
    }

    // Toggle View Mode (Full Width Scrollable vs Fit Screen)
    function toggleViewMode() {
        isFitMode = !isFitMode;
        updateImageAspect();
    }

    // Toggle Fullscreen
    function toggleFullscreen() {
        if (container) {
            container.classList.toggle('is-fullscreen');
        }
        if (!document.fullscreenElement) {
            if (modal.requestFullscreen) {
                modal.requestFullscreen().catch(() => {});
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            }
        }
    }

    // Open Gallery
    function openGallery(projectKey) {
        if (!galleryData[projectKey]) {
            projectKey = 'bnsmsoft';
        }
        currentProjectKey = projectKey;
        currentSlideIdx = 0;
        isFitMode = false; // Reset to full width for sharpest view

        renderGalleryUI();
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Close Gallery
    function closeGallery() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (container) container.classList.remove('is-fullscreen');
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        }
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
        if (openRawBtn) openRawBtn.href = currentSlide.src;

        // Image Transition
        mainImg.classList.add('fade-out');
        setTimeout(() => {
            mainImg.src = currentSlide.src;
            mainImg.alt = `${project.title} - ${currentSlide.device}`;
            mainImg.classList.remove('fade-out');
            if (mainImg.complete) {
                updateImageAspect();
            }
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
    if (viewmodeBtn) viewmodeBtn.addEventListener('click', toggleViewMode);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'f' || e.key === 'F') toggleFullscreen();
        if (e.key === 'v' || e.key === 'V') toggleViewMode();
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
