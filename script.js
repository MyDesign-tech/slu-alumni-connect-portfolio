/* ===============================================
   SLU Alumni Connect Portfolio - JavaScript
   =============================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ===============================================
    // Navigation
    // ===============================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // ===============================================
    // Back to Top Button
    // ===============================================
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===============================================
    // Animated Counter
    // ===============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = formatNumber(Math.floor(current));
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = formatNumber(target);
            }
        };

        updateCounter();
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    }

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                if (target) {
                    animateCounter(element, target);
                    counterObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===============================================
    // Scroll Animations
    // ===============================================
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add data-aos attribute to elements
    const animatedElements = [
        '.section-header',
        '.problem-card',
        '.stakeholder-card',
        '.research-stat',
        '.benchmark-card',
        '.feature-card',
        '.reason-card',
        '.data-stat-card',
        '.dashboard-feature',
        '.insight-card',
        '.kpi-card',
        '.layer-card',
        '.ethics-card',
        '.metric',
        '.timeline-item',
        '.team-member',
        '.lesson-card',
        '.resource-card',
        '.architecture-image',
        '.erd-section',
        '.quick-facts',
        '.impact-callout',
        '.challenges-callout'
    ];

    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.setAttribute('data-aos', 'fade-up');
            el.style.transitionDelay = `${index * 0.1}s`;
            animateOnScroll.observe(el);
        });
    });

    // ===============================================
    // Smooth Scroll for Anchor Links
    // ===============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===============================================
    // Parallax Effect for Hero Background
    // ===============================================
    const heroShapes = document.querySelectorAll('.floating-shapes .shape');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ===============================================
    // Typing Effect for Hero Title (Optional)
    // ===============================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ===============================================
    // Image Lazy Loading
    // ===============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ===============================================
    // Progress Circle Animation
    // ===============================================
    const progressCircles = document.querySelectorAll('.stat-circle');
    
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target.querySelector('.progress');
                if (circle) {
                    circle.style.strokeDashoffset = circle.style.strokeDashoffset;
                }
            }
        });
    }, { threshold: 0.5 });

    progressCircles.forEach(circle => {
        circleObserver.observe(circle);
    });

    // ===============================================
    // Tooltip for Tech Stack
    // ===============================================
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===============================================
    // Card Hover Effects
    // ===============================================
    const cards = document.querySelectorAll('.problem-card, .feature-card, .stakeholder-card, .benchmark-card, .ethics-card, .lesson-card, .resource-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===============================================
    // Browser Mockup Tilt Effect
    // ===============================================
    const browserMockup = document.querySelector('.browser-mockup');
    
    if (browserMockup) {
        const heroImage = browserMockup.closest('.hero-image');
        
        heroImage.addEventListener('mousemove', function(e) {
            const rect = heroImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            browserMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        heroImage.addEventListener('mouseleave', function() {
            browserMockup.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // ===============================================
    // Loading Animation
    // ===============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-stats');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });
    });

    // ===============================================
    // KPI Counter Animation
    // ===============================================
    const kpiCards = document.querySelectorAll('.kpi-value[data-count]');
    
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.getAttribute('data-count'));
                if (target && !element.classList.contains('counted')) {
                    element.classList.add('counted');
                    animateCounter(element, target);
                    kpiObserver.unobserve(element);
                }
            }
        });
    }, { threshold: 0.5 });

    kpiCards.forEach(kpi => {
        kpiObserver.observe(kpi);
    });

    // ===============================================
    // Easter Egg - Konami Code
    // ===============================================
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s linear infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Add rainbow animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // ===============================================
    // Console Message
    // ===============================================
    console.log(`
    %c SLU Alumni Connect Portfolio %c
    
    👋 Hey there, developer!
    
    🎓 Built with ❤️ for SLU Alumni
    
    📧 Contact the team for more info
    
    `, 'background: #003DA5; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;', '');
});

// ===============================================
// Preloader (Optional)
// ===============================================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
