/**
 * Main JavaScript for Only Truth Travel Agency
 * Features:
 * - Language switching
 * - Mobile menu
 * - Testimonial carousel
 * - Scroll effects
 * - Form validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    initLanguage();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Testimonial carousel
    initTestimonialCarousel();
    
    // Scroll effects
    initScrollEffects();
    
    // Form validation
    initFormValidation();
    
    // FAQ toggle
    initFaqToggle();
});

/**
 * Language Switching
 */
function initLanguage() {
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;
    
    // Set default language
    if (!body.hasAttribute('data-lang')) {
        body.setAttribute('data-lang', 'zh');
    }
    
    // Toggle language
    langToggle.addEventListener('click', function() {
        const currentLang = body.getAttribute('data-lang');
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        
        body.setAttribute('data-lang', newLang);
        langToggle.textContent = newLang === 'zh' ? 'EN' : '中';
        langToggle.setAttribute('data-lang', newLang);
        
        // Save language preference
        localStorage.setItem('preferredLanguage', newLang);
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        body.setAttribute('data-lang', savedLang);
        langToggle.textContent = savedLang === 'zh' ? 'EN' : '中';
        langToggle.setAttribute('data-lang', savedLang);
    }
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);
    
    // Create close button
    const closeButton = document.createElement('div');
    closeButton.className = 'mobile-menu-close';
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    mainNav.appendChild(closeButton);
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        mainNav.classList.add('active');
        menuOverlay.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    // Close menu
    function closeMenu() {
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    }
    
    closeButton.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
    
    // Close menu on link click
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            closeMenu();
        }
    });
}

/**
 * Testimonial Carousel
 */
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Show slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current slide
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) {
            next = 0;
        }
        showSlide(next);
    }
    
    // Previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) {
            prev = slides.length - 1;
        }
        showSlide(prev);
    }
    
    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
        
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Initialize carousel
    if (slides.length > 0) {
        showSlide(0);
        startInterval();
    }
}

/**
 * Scroll Effects
 */
function initScrollEffects() {
    const header = document.querySelector('header');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
}

/**
 * FAQ Toggle
 */
function initFaqToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other open FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        });
        
        // Open first FAQ by default
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    }
}

/**
 * Form Validation
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Email validation
            const emailInput = contactForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    valid = false;
                    emailInput.classList.add('error');
                }
            }
            
            if (valid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<span class="cn">发送中...</span><span class="en">Sending...</span>';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(function() {
                    contactForm.reset();
                    submitButton.innerHTML = '<span class="cn">发送成功!</span><span class="en">Sent Successfully!</span>';
                    
                    setTimeout(function() {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitButton = newsletterForm.querySelector('button');
            
            if (emailInput && emailInput.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailPattern.test(emailInput.value)) {
                    // Simulate subscription
                    const originalHTML = submitButton.innerHTML;
                    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    
                    setTimeout(function() {
                        newsletterForm.reset();
                        submitButton.innerHTML = '<i class="fas fa-check"></i>';
                        
                        setTimeout(function() {
                            submitButton.innerHTML = originalHTML;
                        }, 2000);
                    }, 1500);
                } else {
                    emailInput.classList.add('error');
                }
            }
        });
    }
}
