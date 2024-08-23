// Object to hold references to DOM elements
const selector = {
    paragraph: Splitting({
        target: '.hero_paragraph_text',
        by: 'words',
    }),
    image: document.querySelector('.hero_background'),
    navItems: document.querySelectorAll('.nav_item'),
};

// Function to initialize Lenis smooth scrolling
const initLenis = () => {
    const lenis = new Lenis({
        lerp: 0.06, // Controls the easing amount (0 to 1)
        smoothWheel: true, // Enables smooth scrolling with the mouse wheel
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP's ticker to synchronize animations
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0); // Disable lag smoothing to avoid jumping

    // Initialize scroll animations
    initScroll();
};

// Function to initialize scroll-triggered animations using GSAP and ScrollTrigger
const initScroll = () => {
    // Initial states for image and words
    gsap.set(selector.image, { autoAlpha: 1, scale: 1, yPercent: 0 });
    gsap.set('.word', { autoAlpha: 0.4 });

    // Timeline for scroll-triggered animations
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero', // Element to trigger the scroll animations
            start: 'top top', // Start when the top of '.hero' reaches the top of the viewport
            end: 'bottom bottom', // End when the bottom of '.hero' reaches the bottom of the viewport
            scrub: 1, // Smoothly scrub animation based on scroll position
        },
    });

    // Animate words to fade in sequentially
    tl.to('.word', {
        duration: 2,
        autoAlpha: 1,
        stagger: 1, // Stagger animation start times for each word
    })
    .to(
        selector.image,
        {
            duration: 20,
            scale: 0.95, // Slightly scale down the background image
            autoAlpha: 0, // Fade out the image
            yPercent: -5, // Move image up slightly
        },
        0 // Start this animation at the beginning of the timeline
    )
    .to(
        [selector.navItems[1], selector.navItems[2]], // Select specific nav items
        {
            duration: 20,
            yPercent: -100, // Move nav items up out of view
            autoAlpha: 0, // Fade out nav items
        },
        0 // Start this animation at the beginning of the timeline
    );
};

// Initialize Lenis on DOMContentLoaded event
window.addEventListener('DOMContentLoaded', initLenis);