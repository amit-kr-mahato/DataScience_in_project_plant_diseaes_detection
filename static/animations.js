// GSAP Animations for Home Page
document.addEventListener('DOMContentLoaded', function() {
    // Only run these animations on home page
    if (document.querySelector('.hero')) {
        // Initialize GSAP
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        const heroTl = gsap.timeline();
        
        heroTl.from('.logo', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: "power3.out"
        })
        .from('.nav-links li', {
            duration: 0.8,
            y: -30,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.5")
        .from('.hero-title', {
            duration: 1.2,
            x: -100,
            opacity: 0,
            ease: "power3.out"
        })
        .from('.hero-subtitle', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: "power3.out"
        }, "-=0.8")
        .from('.cta-buttons', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power3.out"
        }, "-=0.5")
        .from('.image-container', {
            duration: 1.5,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .from('.floating-element', {
            duration: 1,
            scale: 0,
            opacity: 0,
            stagger: 0.3,
            ease: "back.out(1.7)"
        }, "-=0.5");
        
        // Features animations
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out"
        });
        
        // Steps animations
        gsap.from('.step', {
            scrollTrigger: {
                trigger: '.how-it-works',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: "power3.out"
        });
        
        // Floating elements continuous animation
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(el => {
            gsap.to(el, {
                y: -20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }
    
    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });
});