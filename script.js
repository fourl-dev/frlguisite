document.addEventListener('DOMContentLoaded', function() {

    // --- Loading Animation ---
    const loadingAnimation = document.querySelector('.loading-animation');
    if (loadingAnimation) {
        // Set a minimum display time for the loading animation
        const minLoadTime = 1200; // milliseconds (adjusted from 1500)
        const startTime = performance.now();

        window.addEventListener('load', () => {
            const elapsedTime = performance.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);

            setTimeout(() => {
                loadingAnimation.style.opacity = '0';
                // Remove after fade out transition (0.5s in CSS)
                setTimeout(() => {
                    loadingAnimation.remove();
                }, 500);
            }, remainingTime);
        });

        // Fallback in case window.load doesn't fire or takes too long
        setTimeout(() => {
             if (loadingAnimation && loadingAnimation.style.opacity !== '0') {
                 loadingAnimation.style.opacity = '0';
                 setTimeout(() => loadingAnimation.remove(), 500);
             }
        }, 4000); // Max wait time
    }


    // --- Floating Blocks Generation ---
    const floatingBlocksContainer = document.querySelector('.floating-blocks');
    if (floatingBlocksContainer) {
        const colors = ['rgba(157, 0, 255, 0.1)', 'rgba(179, 136, 255, 0.1)', 'rgba(131, 56, 236, 0.1)', 'rgba(98, 0, 234, 0.1)']; // Subtler alpha
        const blockFragment = document.createDocumentFragment();
        const blockCount = 15; // Reduced number of blocks

        for (let i = 0; i < blockCount; i++) {
            const block = document.createElement('div');
            block.classList.add('block');

            const size = Math.floor(Math.random() * 50) + 20; // Smaller blocks
            block.style.width = `${size}px`;
            block.style.height = `${size}px`;

            const left = Math.floor(Math.random() * 100);
            // Start further down to ensure they come from bottom
            const top = Math.floor(Math.random() * 50) + 105;
            block.style.left = `${left}%`;
            block.style.top = `${top}%`; // Start below the viewport

            const colorIndex = Math.floor(Math.random() * colors.length);
            block.style.backgroundColor = colors[colorIndex];

            // Vary duration and delay
            const duration = Math.floor(Math.random() * 10) + 12; // Adjusted range
            const delay = Math.floor(Math.random() * 15); // Wider delay range
            block.style.animationDuration = `${duration}s`;
            block.style.animationDelay = `${delay}s`;

            blockFragment.appendChild(block);
        }
        floatingBlocksContainer.appendChild(blockFragment);
    }


    // --- Scroll Reveal Elements ---
    const revealElements = document.querySelectorAll('.reveal-element');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: Stop observing after revealed
                    // observer.unobserve(entry.target);
                }
                // Optional: Unreveal when scrolling up
                // else {
                //     entry.target.classList.remove('active');
                // }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }


    // --- Infinite Review Scroller ---
    const reviewsTrack = document.querySelector('.reviews-track');
    if (reviewsTrack) {
        const reviewCards = reviewsTrack.querySelectorAll('.review-card');
        if (reviewCards.length > 0) {
             // Duplicate cards for seamless loop
             reviewCards.forEach(card => {
                 const clone = card.cloneNode(true);
                 reviewsTrack.appendChild(clone);
             });
             // Note: The CSS animation handles the scrolling loop
        }
    }


    // --- Smooth Scroll for Navigation Links (using CSS scroll-behavior) ---
    // The JavaScript for smooth scroll is removed as `scroll-behavior: smooth;`
    // is added to the `html` element in CSS.
    // We still need JS to handle the offset caused by the fixed header.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Ensure it's an internal link and not just '#'
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Prevent default jump

                    const headerOffset = document.querySelector('header')?.offsetHeight || 80; // Get header height or fallback
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth' // CSS handles this, but good practice to keep
                    });
                }
            }
        });
    });

}); // End DOMContentLoaded
