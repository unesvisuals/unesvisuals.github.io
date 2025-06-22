

// Google Analytics Enhanced Tracking Functions
function trackButtonClick(buttonName, category = 'engagement') {
    gtag('event', 'click', {
        event_category: category,
        event_label: buttonName,
        value: 1
    });
}

function trackSectionView(sectionName) {
    gtag('event', 'page_view', {
        event_category: 'navigation',
        event_label: `section_${sectionName}`,
        value: 1
    });
}

function trackSocialClick(platform) {
    gtag('event', 'click', {
        event_category: 'social_media',
        event_label: platform,
        value: 1
    });
}

function trackDownload(fileName) {
    gtag('event', 'download', {
        event_category: 'engagement',
        event_label: fileName,
        value: 1
    });
}


// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links and track navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Track navigation clicks
            const sectionName = link.getAttribute('href').replace('#', '');
            gtag('event', 'click', {
                event_category: 'navigation',
                event_label: `nav_${sectionName}`,
                value: 1
            });
            
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Typing animation
const typingText = document.getElementById('typing-text');
const phrases = [
    'Graphic Designer',
    'Visual Artist',
    'Brand Creator',
    'Digital Artist'
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const current = phrases[currentPhrase];

    if (!isDeleting) {
        typingText.textContent = current.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    } else {
        typingText.textContent = current.substring(0, currentChar - 1);
        currentChar--;

        if (currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start typing animation
if (typingText) {
    typeEffect();
}

// Hire button effect with analytics tracking
const hireBtn = document.getElementById('hire-btn');
if (hireBtn) {
    hireBtn.addEventListener('click', () => {
        // Track hire button click
        gtag('event', 'click', {
            event_category: 'engagement',
            event_label: 'hire_me_button',
            value: 1
        });
        
        // Scroll to contact section with enhanced animation
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            performSimpleScroll(contactSection);
        }
    });
}

// Contact form submission - removed old handler since Formspree is now used

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add special effects for different elements
            if (entry.target.classList.contains('portfolio-item')) {
                entry.target.style.animationDelay = `${Array.from(document.querySelectorAll('.portfolio-item')).indexOf(entry.target) * 0.1}s`;
            }
        }
    });
}, observerOptions);

// Simple smooth scrolling with fade transition
function addSimpleScrolling() {
    // Handle navigation clicks with simple smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                performSimpleScroll(targetElement);
            }
        });
    });
}

// Simple scroll function with basic smooth scrolling
function performSimpleScroll(targetElement) {
    targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize simple scrolling
addSimpleScrolling();

// Make performSimpleScroll globally available
window.performSimpleScroll = performSimpleScroll;

// Track social media clicks
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', () => {
        const platform = link.querySelector('i').className.includes('instagram') ? 'instagram' :
                        link.querySelector('i').className.includes('behance') ? 'behance' :
                        link.querySelector('i').className.includes('youtube') ? 'youtube' : 'unknown';
        
        trackSocialClick(platform);
    });
});

// Track service card interactions
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '_');
        gtag('event', 'click', {
            event_category: 'services',
            event_label: `service_${serviceName}`,
            value: 1
        });
    });
});

// Track FAQ interactions
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqTitle = question.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '_');
        gtag('event', 'click', {
            event_category: 'faq',
            event_label: `faq_${faqTitle}`,
            value: 1
        });
    });
});

// Track testimonial interactions
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        gtag('event', 'click', {
            event_category: 'testimonials',
            event_label: `testimonial_${index + 1}`,
            value: 1
        });
    });
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = Math.round((scrollTop / (docHeight - winHeight)) * 100);
    
    if (scrollPercent > maxScrollDepth && scrollPercent % 25 === 0) {
        maxScrollDepth = scrollPercent;
        gtag('event', 'scroll', {
            event_category: 'engagement',
            event_label: `scroll_depth_${scrollPercent}%`,
            value: scrollPercent
        });
    }
});

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate sections
    const animateElements = document.querySelectorAll('.about-content, .skills-grid, .portfolio-grid, .services-grid, .contact-content, .testimonial-slider, .faq-container');

    animateElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('fade-in');
        } else {
            el.classList.add('slide-in-left');
        }
        observer.observe(el);
    });

    // Animate individual cards
    const cards = document.querySelectorAll('.portfolio-item, .service-card, .skill-item');
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// Skills animation
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(easeOutCubic * (end - start) + start);

        element.textContent = currentValue + '%';

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');

            skillItems.forEach((item, index) => {
                const progressBar = item.querySelector('.skill-progress');
                const percentage = item.querySelector('.skill-percentage');
                const targetWidth = progressBar.dataset.width;

                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';

                    // Animate the percentage counter
                    animateCounter(percentage, 0, parseInt(targetWidth), 2000);
                }, index * 200);
            });

            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Testimonial Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

function nextSlide() {
    if (slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}

// Auto-play testimonials
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Enhanced FAQ with search
function initializeFAQ() {
    // Add search box to FAQ section
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        const searchBox = document.createElement('div');
        searchBox.className = 'faq-search-container';
        searchBox.innerHTML = `
            <div class="faq-search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="faq-search" placeholder="Search frequently asked questions..." />
                <div class="search-suggestions" id="search-suggestions"></div>
            </div>
        `;
        faqContainer.insertBefore(searchBox, faqContainer.firstChild);
        
        // Add search functionality
        const searchInput = document.getElementById('faq-search');
        const suggestions = document.getElementById('search-suggestions');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            // Filter FAQ items
            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('p').textContent.toLowerCase();
                
                if (question.includes(query) || answer.includes(query)) {
                    item.style.display = 'block';
                    item.classList.add('search-highlight');
                } else {
                    item.style.display = query ? 'none' : 'block';
                    item.classList.remove('search-highlight');
                }
            });
            
            // Show suggestions
            if (query.length > 0) {
                const matches = Array.from(faqItems)
                    .filter(item => {
                        const question = item.querySelector('h3').textContent.toLowerCase();
                        return question.includes(query);
                    })
                    .slice(0, 3);
                
                suggestions.innerHTML = matches.map(item => {
                    const question = item.querySelector('h3').textContent;
                    return `<div class="suggestion-item" data-faq="${question}">${question}</div>`;
                }).join('');
                
                suggestions.classList.add('show');
            } else {
                suggestions.classList.remove('show');
            }
        });
        
        // Handle suggestion clicks
        suggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-item')) {
                const questionText = e.target.dataset.faq;
                const faqItem = Array.from(document.querySelectorAll('.faq-item'))
                    .find(item => item.querySelector('h3').textContent === questionText);
                
                if (faqItem) {
                    faqItem.scrollIntoView({ behavior: 'smooth' });
                    faqItem.classList.add('active');
                    searchInput.value = '';
                    suggestions.classList.remove('show');
                }
            }
        });
    }
}

// Enhanced FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        const answer = faqItem.querySelector('.faq-answer');

        // Close all FAQ items with animation
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const itemAnswer = item.querySelector('.faq-answer');
            itemAnswer.style.maxHeight = '0';
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'faq-ripple';
            question.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }
    });
});

// Initialize FAQ enhancements
initializeFAQ();

// Contact Form with better error handling and analytics tracking
const contactFormElement = document.getElementById('contact-form');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
        // Track contact form submission
        gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form',
            value: 1
        });
        
        const submitBtn = this.querySelector('.submit-btn');
        if (!submitBtn) return;
        
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Reset button after successful submission or timeout
        setTimeout(() => {
            if (submitBtn.disabled) {
                submitBtn.innerHTML = '<span>Message Sent!</span>';
                
                // Track successful form submission
                gtag('event', 'form_success', {
                    event_category: 'engagement',
                    event_label: 'contact_form_success',
                    value: 1
                });
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }
        }, 3000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-container');

    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Mouse cursor glow effect (optional enhancement)
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        const glowCursor = document.createElement('div');
        glowCursor.className = 'cursor-glow';
        glowCursor.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(glowCursor);
    }

    const glowElement = document.querySelector('.cursor-glow');
    if (glowElement) {
        glowElement.style.left = e.clientX - 10 + 'px';
        glowElement.style.top = e.clientY - 10 + 'px';
    }
});

// Enhanced Portfolio hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
        this.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.3)';
        
        // Add color pop effect
        const graphic = this.querySelector('.portfolio-graphic');
        if (graphic) {
            graphic.style.filter = 'brightness(1.2) saturate(1.3)';
        }
        
        // Reveal text with animation
        const overlay = this.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
            overlay.style.background = 'linear-gradient(transparent, rgba(0, 255, 255, 0.1), rgba(0, 0, 0, 0.9))';
        }
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
        
        // Reset effects
        const graphic = this.querySelector('.portfolio-graphic');
        if (graphic) {
            graphic.style.filter = '';
        }
        
        const overlay = this.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(100%)';
            overlay.style.background = 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))';
        }
    });
});

// Service cards glow animation
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const glow = this.querySelector('.service-glow');
        if (glow) {
            glow.style.opacity = '0.15';
        }
    });

    card.addEventListener('mouseleave', function() {
        const glow = this.querySelector('.service-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    });
});

// Create floating quick-access panel
function createQuickAccessPanel() {
    // Check if panel already exists to prevent duplicates
    if (document.getElementById('quick-access-panel')) return;
    
    const panel = document.createElement('div');
    panel.className = 'quick-access-panel';
    panel.id = 'quick-access-panel';
    panel.style.cssText = `
        position: fixed !important;
        left: 20px !important;
        bottom: 20px !important;
        z-index: 9998 !important;
        opacity: 1 !important;
    `;
    
    panel.innerHTML = `
        <div class="panel-toggle" id="panel-toggle">
            <i class="fas fa-magic"></i>
        </div>
        <div class="panel-content" id="panel-content">
            <div class="panel-item" data-action="chat">
                <i class="fas fa-comments"></i>
                <span>Chat</span>
            </div>
            <div class="panel-item" data-action="hire">
                <i class="fas fa-handshake"></i>
                <span>Hire Me</span>
            </div>
            <div class="panel-item" data-action="portfolio">
                <i class="fas fa-folder-open"></i>
                <span>Portfolio</span>
            </div>
            <div class="panel-item" data-action="theme">
                <i class="fas fa-palette"></i>
                <span>Theme</span>
            </div>
            <div class="panel-social">
                <a href="https://www.instagram.com/doomslayer.47/" target="_blank">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.behance.net/unesvisuals" target="_blank">
                    <i class="fab fa-behance"></i>
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    
    // Panel toggle functionality
    const toggle = document.getElementById('panel-toggle');
    const content = document.getElementById('panel-content');
    
    toggle.addEventListener('click', () => {
        panel.classList.toggle('expanded');
    });
    
    // Panel actions
    document.querySelectorAll('.panel-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            
            switch(action) {
                case 'chat':
                    document.getElementById('chatbot-toggle')?.click();
                    break;
                case 'hire':
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'portfolio':
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'theme':
                    toggleTheme();
                    break;
            }
            
            panel.classList.remove('expanded');
        });
    });
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const isLight = body.classList.contains('light-theme');
    
    if (isLight) {
        body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
}

const OPENAI_API_KEY = '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'; // 👈 TEMPORARY: never publish this live

async function sendMessage() {
    const input = document.getElementById("userInput");
    const userText = input.value.trim();
    if (!userText) return;

    appendToChat("You", userText);
    input.value = "";

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o", // or "gpt-3.5-turbo"
                messages: [
                    { role: "system", content: "You are a helpful assistant for a creative graphic designer's portfolio website." },
                    { role: "user", content: userText }
                ]
            })
        });

        const data = await res.json();
        const reply = data.choices[0].message.content.trim();
        appendToChat("AI", reply);
    } catch (err) {
        appendToChat("AI", "Something went wrong. Please try again later.");
        console.error(err);
    }
}

function appendToChat(sender, message) {
    const chatbox = document.getElementById("chatbox");
    const newMsg = document.createElement("p");
    newMsg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbox.appendChild(newMsg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Add loading animation with error checking and deployment fixes
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Enhanced deployment compatibility
    const isDeployment = window.location.hostname.includes('.42web.io') || 
                        window.location.hostname.includes('.replit.app') ||
                        !window.location.hostname.includes('replit.dev');
    
    const initDelay = isDeployment ? 3000 : 1000;
    
    // Delay initialization for deployment environment
    setTimeout(() => {
        createQuickAccessPanel();
        
        
        
        
    }, initDelay);

    // Animate hero elements with error checking
    setTimeout(() => {
        const animatedLogo = document.querySelector('.animated-logo');
        if (animatedLogo) {
            animatedLogo.style.opacity = '1';
            animatedLogo.style.transform = 'translateY(0)';
        }
    }, 200);

    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 400);

    setTimeout(() => {
        const heroDescription = document.querySelector('.hero-description');
        if (heroDescription) {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }
    }, 600);

    setTimeout(() => {
        const hireBtn = document.querySelector('.hire-btn');
        if (hireBtn) {
            hireBtn.style.opacity = '1';
            hireBtn.style.transform = 'translateY(0)';
        }
    }, 800);
});

// Project Modal System
const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const mainImage = document.getElementById('main-image');
const loadingPlaceholder = document.getElementById('loading-placeholder');
const thumbnailsContainer = document.getElementById('image-thumbnails');
const projectDescription = document.getElementById('project-description');
const projectDetails = document.getElementById('project-details');
const imageCounter = document.getElementById('image-counter');
const closeModal = document.getElementById('close-modal');
const navPrev = document.getElementById('nav-prev');
const navNext = document.getElementById('nav-next');

let currentProject = null;
let currentImageIndex = 0;
let projectImages = [];

// Project data with design-relevant images
const projectsData = {
    'project-1': {
        title: 'Brand Identity Design',
        description: 'A comprehensive brand identity design project featuring logo creation, color palette development, and brand guidelines. This project showcases modern design principles with a focus on versatility and memorability.',
        images: [
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="castle-grad" cx="50%" cy="30%" r="70%">
                            <stop offset="0%" style="stop-color:#4a0080;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#1a0030;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
                        </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#castle-grad)"/>
                    <polygon points="200,400 300,300 400,400 500,300 600,400 600,500 200,500" fill="#2a2a2a"/>
                    <rect x="250" y="350" width="50" height="150" fill="#1a1a1a"/>
                    <rect x="350" y="320" width="60" height="180" fill="#1a1a1a"/>
                    <rect x="450" y="360" width="50" height="140" fill="#1a1a1a"/>
                    <polygon points="225,350 275,300 325,350" fill="#4a0080"/>
                    <polygon points="320,320 380,270 440,320" fill="#4a0080"/>
                    <polygon points="425,360 475,310 525,360" fill="#4a0080"/>
                    <circle cx="300" cy="150" r="80" fill="#ff6b6b" opacity="0.3"/>
                    <text x="400" y="550" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">Haunted Castle</text>
                    <text x="400" y="580" fill="#cccccc" text-anchor="middle" font-family="Arial" font-size="14">Logo Design Project</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#0066cc;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <rect x="50" y="50" width="700" height="500" fill="url(#grad1)" opacity="0.1"/>
                    <circle cx="400" cy="300" r="100" fill="#00ffff" opacity="0.2"/>
                    <text x="400" y="280" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold">BRAND LOGO</text>
                    <text x="400" y="320" fill="#cccccc" text-anchor="middle" font-family="Arial" font-size="16">Color Variations</text>
                    <text x="400" y="520" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Brand Identity - Image 2</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <rect x="100" y="100" width="600" height="400" fill="#00ffff" opacity="0.1"/>
                    <rect x="150" y="150" width="200" height="100" fill="#00ffff" opacity="0.3"/>
                    <rect x="450" y="150" width="200" height="100" fill="#ff6b6b" opacity="0.3"/>
                    <rect x="150" y="350" width="200" height="100" fill="#4ecdc4" opacity="0.3"/>
                    <rect x="450" y="350" width="200" height="100" fill="#45b7d1" opacity="0.3"/>
                    <text x="400" y="80" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">Brand Guidelines</text>
                    <text x="400" y="520" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Brand Identity - Image 3</text>
                </svg>
            `)
        ],
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign'],
        client: 'TechStart Solutions',
        year: '2024',
        category: 'Branding'
    },
    'project-2': {
        title: 'Event Poster Campaign',
        description: 'A vibrant poster design campaign for a music festival featuring dynamic typography, bold colors, and engaging visual elements that capture the energy and excitement of the event.',
        images: [
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#4ecdc4;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#45b7d1;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grad2)"/>
                    <rect x="0" y="0" width="100%" height="100%" fill="#000" opacity="0.3"/>
                    <text x="400" y="200" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="48" font-weight="bold">MUSIC</text>
                    <text x="400" y="280" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="48" font-weight="bold">FESTIVAL</text>
                    <text x="400" y="380" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="24">2024</text>
                    <text x="400" y="520" fill="#cccccc" text-anchor="middle" font-family="Arial" font-size="14">Event Poster - Main Design</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <rect x="50" y="50" width="300" height="500" fill="#ff6b6b" opacity="0.8"/>
                    <rect x="450" y="50" width="300" height="500" fill="#4ecdc4" opacity="0.8"/>
                    <text x="200" y="300" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">INSTAGRAM</text>
                    <text x="200" y="330" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="16">STORY</text>
                    <text x="600" y="300" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">FACEBOOK</text>
                    <text x="600" y="330" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="16">POST</text>
                    <text x="400" y="580" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Social Media Variants</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <rect x="100" y="100" width="600" height="400" fill="#45b7d1" opacity="0.2"/>
                    <circle cx="250" cy="250" r="80" fill="#ff6b6b" opacity="0.7"/>
                    <circle cx="400" cy="200" r="60" fill="#4ecdc4" opacity="0.7"/>
                    <circle cx="550" cy="300" r="100" fill="#00ffff" opacity="0.7"/>
                    <text x="400" y="450" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold">Print Materials</text>
                    <text x="400" y="520" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Event Poster - Print Version</text>
                </svg>
            `)
        ],
        tools: ['Adobe Photoshop', 'Adobe Illustrator'],
        client: 'Summer Vibes Festival',
        year: '2024',
        category: 'Poster Design'
    },
    'project-3': {
        title: 'Digital Artwork',
        description: 'An abstract digital artwork exploring color theory and geometric compositions. This piece demonstrates mastery of digital painting techniques and creative expression through modern design elements.',
        images: [
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
                        </radialGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grad3)"/>
                    <polygon points="200,150 350,100 500,200 450,350 250,400 150,250" fill="#ff6b6b" opacity="0.6"/>
                    <polygon points="400,150 550,200 600,350 500,450 350,400 300,250" fill="#4ecdc4" opacity="0.6"/>
                    <text x="400" y="550" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Abstract Digital Art</text>
                    <text x="400" y="580" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Final Artwork</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <line x1="100" y1="100" x2="700" y2="100" stroke="#00ffff" stroke-width="2"/>
                    <line x1="100" y1="200" x2="700" y2="150" stroke="#ff6b6b" stroke-width="3"/>
                    <line x1="100" y1="300" x2="700" y2="250" stroke="#4ecdc4" stroke-width="2"/>
                    <circle cx="200" cy="300" r="30" fill="#00ffff" opacity="0.5"/>
                    <circle cx="400" cy="250" r="40" fill="#ff6b6b" opacity="0.5"/>
                    <circle cx="600" cy="350" r="35" fill="#4ecdc4" opacity="0.5"/>
                    <text x="400" y="480" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Process Sketches</text>
                    <text x="400" y="520" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Digital Art - Development Process</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <rect x="100" y="100" width="150" height="150" fill="#ff6b6b"/>
                    <rect x="300" y="100" width="150" height="150" fill="#4ecdc4"/>
                    <rect x="500" y="100" width="150" height="150" fill="#45b7d1"/>
                    <rect x="100" y="300" width="150" height="150" fill="#00ffff"/>
                    <rect x="300" y="300" width="150" height="150" fill="#ff9f43"/>
                    <rect x="500" y="300" width="150" height="150" fill="#a55eea"/>
                    <text x="400" y="500" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Color Studies</text>
                    <text x="400" y="530" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Digital Art - Color Exploration</text>
                </svg>
            `)
        ],
        tools: ['Adobe Photoshop', 'Procreate', 'Adobe Illustrator'],
        client: 'Personal Project',
        year: '2024',
        category: 'Digital Art'
    },
    'project-4': {
        title: 'Social Media Kit',
        description: 'A comprehensive social media design package featuring Instagram post templates, story designs, and brand-consistent graphics that enhance online presence and engagement.',
        images: [
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <rect x="150" y="50" width="500" height="500" fill="#ffffff" rx="25"/>
                    <rect x="180" y="80" width="60" height="60" fill="#ff6b6b" rx="30"/>
                    <rect x="250" y="90" width="200" height="20" fill="#e0e0e0" rx="10"/>
                    <rect x="250" y="120" width="150" height="15" fill="#cccccc" rx="7"/>
                    <rect x="180" y="170" width="440" height="300" fill="#4ecdc4" rx="15"/>
                    <rect x="180" y="490" width="440" height="40" fill="#f0f0f0" rx="20"/>
                    <text x="400" y="580" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="14">Instagram Post Template</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <rect x="200" y="50" width="180" height="320" fill="#ff6b6b" rx="90"/>
                    <rect x="420" y="50" width="180" height="320" fill="#4ecdc4" rx="90"/>
                    <text x="290" y="400" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="14">STORY 1</text>
                    <text x="510" y="400" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="14">STORY 2</text>
                    <text x="400" y="480" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Instagram Stories</text>
                    <text x="400" y="520" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Social Media Kit - Story Templates</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <rect x="50" y="100" width="200" height="150" fill="#45b7d1" rx="10"/>
                    <rect x="300" y="100" width="200" height="150" fill="#ff6b6b" rx="10"/>
                    <rect x="550" y="100" width="200" height="150" fill="#4ecdc4" rx="10"/>
                    <rect x="50" y="300" width="200" height="150" fill="#a55eea" rx="10"/>
                    <rect x="300" y="300" width="200" height="150" fill="#ff9f43" rx="10"/>
                    <rect x="550" y="300" width="200" height="150" fill="#00ffff" rx="10"/>
                    <text x="400" y="500" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Brand Templates</text>
                    <text x="400" y="530" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Social Media Kit - All Templates</text>
                </svg>
            `)
        ],
        tools: ['Adobe Photoshop', 'Canva Pro', 'Adobe Illustrator'],
        client: 'BrandLift Agency',
        year: '2024',
        category: 'Social Media Design'
    },
    'project-5': {
        title: 'Business Card Design',
        description: 'Professional business card designs that make a lasting impression. Features modern typography, premium materials, and sophisticated color schemes that reflect corporate identity.',
        images: [
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <rect x="200" y="150" width="400" height="250" fill="#ffffff" rx="15"/>
                    <rect x="220" y="170" width="50" height="50" fill="#00ffff" rx="25"/>
                    <rect x="290" y="180" width="150" height="15" fill="#333" rx="7"/>
                    <rect x="290" y="200" width="100" height="12" fill="#666" rx="6"/>
                    <rect x="220" y="250" width="120" height="8" fill="#999" rx="4"/>
                    <rect x="220" y="270" width="140" height="8" fill="#999" rx="4"/>
                    <rect x="220" y="290" width="100" height="8" fill="#999" rx="4"/>
                    <text x="400" y="450" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Business Card Front</text>
                    <text x="400" y="480" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Professional Corporate Design</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <rect x="200" y="150" width="400" height="250" fill="#00ffff" rx="15"/>
                    <rect x="220" y="170" width="360" height="80" fill="#ffffff" opacity="0.1" rx="10"/>
                    <circle cx="400" cy="300" r="40" fill="#ffffff" opacity="0.2"/>
                    <text x="400" y="380" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">LOGO PATTERN</text>
                    <text x="400" y="450" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Business Card Back</text>
                    <text x="400" y="480" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Brand Pattern Design</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <g transform="rotate(-15 400 300)">
                        <rect x="300" y="200" width="200" height="125" fill="#ffffff" rx="8"/>
                        <rect x="310" y="210" width="25" height="25" fill="#00ffff" rx="12"/>
                        <rect x="345" y="215" width="80" height="8" fill="#333" rx="4"/>
                        <rect x="345" y="225" width="60" height="6" fill="#666" rx="3"/>
                    </g>
                    <g transform="rotate(5 400 300) translate(50, 50)">
                        <rect x="300" y="200" width="200" height="125" fill="#ffffff" rx="8"/>
                        <rect x="310" y="210" width="25" height="25" fill="#ff6b6b" rx="12"/>
                        <rect x="345" y="215" width="80" height="8" fill="#333" rx="4"/>
                        <rect x="345" y="225" width="60" height="6" fill="#666" rx="3"/>
                    </g>
                    <text x="400" y="500" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Mockup Views</text>
                    <text x="400" y="530" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Business Cards - 3D Presentation</text>
                </svg>
            `)
        ],
        tools: ['Adobe Illustrator', 'Adobe InDesign', 'Adobe Photoshop'],
        client: 'Corporate Solutions Inc',
        year: '2024',
        category: 'Print Design'
    },
    'project-6': {
        title: 'Website Graphics & UI',
        description: 'Custom web graphics and user interface elements designed to enhance user experience. Includes icons, buttons, banners, and interactive elements with modern design principles.',
        images: [
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <rect x="50" y="50" width="700" height="500" fill="#1a1a1a" rx="10"/>
                    <rect x="50" y="50" width="700" height="50" fill="#333" rx="10 10 0 0"/>
                    <circle cx="80" cy="75" r="8" fill="#ff6b6b"/>
                    <circle cx="110" cy="75" r="8" fill="#ff9f43"/>
                    <circle cx="140" cy="75" r="8" fill="#4ecdc4"/>
                    <rect x="80" y="150" width="150" height="30" fill="#00ffff" rx="15"/>
                    <rect x="250" y="150" width="150" height="30" fill="#45b7d1" rx="15"/>
                    <rect x="420" y="150" width="150" height="30" fill="#4ecdc4" rx="15"/>
                    <rect x="80" y="220" width="300" height="200" fill="#333" rx="10"/>
                    <text x="400" y="500" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">UI Elements</text>
                    <text x="400" y="530" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Web Interface Components</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#1a1a1a"/>
                    <circle cx="200" cy="150" r="40" fill="#00ffff"/>
                    <circle cx="400" cy="150" r="40" fill="#ff6b6b"/>
                    <circle cx="600" cy="150" r="40" fill="#4ecdc4"/>
                    <rect x="150" y="250" width="100" height="100" fill="#45b7d1" rx="10"/>
                    <rect x="350" y="250" width="100" height="100" fill="#a55eea" rx="10"/>
                    <rect x="550" y="250" width="100" height="100" fill="#ff9f43" rx="10"/>
                    <polygon points="200,450 170,480 200,510 230,480" fill="#00ffff"/>
                    <polygon points="400,450 380,470 400,510 420,470" fill="#4ecdc4"/>
                    <polygon points="600,450 580,480 600,500 620,480" fill="#ff6b6b"/>
                    <text x="400" y="550" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Icon Set</text>
                    <text x="400" y="580" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Custom Web Icons</text>
                </svg>
            `),
            'data:image/svg+xml;base64,' + btoa(`
                <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#4ecdc4;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="#2a2a2a"/>
                    <rect x="100" y="100" width="600" height="80" fill="url(#grad4)" rx="40"/>
                    <text x="400" y="150" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold">Hero Banner</text>
                    <rect x="100" y="220" width="600" height="60" fill="#ff6b6b" opacity="0.8" rx="30"/>
                    <text x="400" y="260" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="18">Call to Action Button</text>
                    <rect x="100" y="320" width="600" height="40" fill="#45b7d1" opacity="0.6" rx="20"/>
                    <text x="400" y="345" fill="#ffffff" text-anchor="middle" font-family="Arial" font-size="14">Navigation Element</text>
                    <text x="400" y="450" fill="#00ffff" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold">Web Banners</text>
                    <text x="400" y="480" fill="#666" text-anchor="middle" font-family="Arial" font-size="14">Interactive UI Components</text>
                </svg>
            `)
        ],
        tools: ['Figma', 'Adobe XD', 'Adobe Illustrator', 'Sketch'],
        client: 'Digital Innovations Co',
        year: '2024',
        category: 'UI/UX Design'
    }
};

// Open project modal
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    currentProject = project;
    currentImageIndex = 0;
    projectImages = project.images;

    // Set modal content
    modalTitle.textContent = project.title;
    projectDescription.textContent = project.description;

    // Generate project details
    projectDetails.innerHTML = `
        <div class="detail-item">
            <div class="detail-label">Client</div>
            <div class="detail-value">${project.client}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Year</div>
            <div class="detail-value">${project.year}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Category</div>
            <div class="detail-value">${project.category}</div>
        </div>
        <div class="detail-item">
            <div class="detail-label">Tools Used</div>
            <div class="detail-value">
                <div class="tools-list">
                    ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    // Generate thumbnails
    generateThumbnails();

    // Load first image
    loadImage(0);

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Generate thumbnail navigation with lazy loading
function generateThumbnails() {
    thumbnailsContainer.innerHTML = '';
    projectImages.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.className = 'thumbnail';
        thumbnail.alt = `Image ${index + 1}`;
        if (index === 0) thumbnail.classList.add('active');

        // Create placeholder while loading
        thumbnail.src = 'data:image/svg+xml;base64,' + btoa(`
            <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#2a2a2a"/>
                <text x="50%" y="50%" fill="#666" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="12">${index + 1}</text>
            </svg>
        `);

        // Load actual thumbnail with retry logic
        loadThumbnail(thumbnail, image, index);

        thumbnail.addEventListener('click', () => loadImage(index));
        thumbnailsContainer.appendChild(thumbnail);
    });

    // Preload first few images for better UX
    preloadImages();
}

// Helper function to load thumbnails with retry
function loadThumbnail(thumbnail, imageSrc, index, retryCount = 0) {
    const maxRetries = 2;
    const img = new Image();
    
    img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            thumbnail.src = img.src;
        } else if (retryCount < maxRetries) {
            setTimeout(() => loadThumbnail(thumbnail, imageSrc, index, retryCount + 1), 500);
        } else {
            showThumbnailError(thumbnail, index);
        }
    };
    
    img.onerror = () => {
        if (retryCount < maxRetries) {
            setTimeout(() => loadThumbnail(thumbnail, imageSrc, index, retryCount + 1), 500);
        } else {
            showThumbnailError(thumbnail, index);
        }
    };
    
    // Add cache-busting for external images
    if (imageSrc.startsWith('http')) {
        img.crossOrigin = 'anonymous';
        img.src = imageSrc + (imageSrc.includes('?') ? '&' : '?') + 't=' + Date.now();
    } else {
        img.src = imageSrc;
    }
}

// Helper function to show thumbnail error
function showThumbnailError(thumbnail, index) {
    thumbnail.src = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#2a2a2a"/>
            <text x="50%" y="45%" fill="#ff6b6b" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="9">Error</text>
            <text x="50%" y="65%" fill="#666" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="8">${index + 1}</text>
        </svg>
    `);
}

// Load specific image with improved error handling and retry mechanism
function loadImage(index, retryCount = 0) {
    if (index < 0 || index >= projectImages.length) return;

    currentImageIndex = index;
    const maxRetries = 2;

    // Show loading placeholder
    loadingPlaceholder.style.display = 'flex';
    loadingPlaceholder.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    mainImage.style.display = 'none';

    // Create timeout for loading (increased to 10 seconds)
    const loadTimeout = setTimeout(() => {
        if (retryCount < maxRetries) {
            loadingPlaceholder.innerHTML = '<i class="fas fa-redo"></i> Retrying...';
            setTimeout(() => loadImage(index, retryCount + 1), 1000);
            return;
        }
        
        showImageError();
    }, 10000);

    // Load image with retry logic
    const img = new Image();
    
    img.onload = () => {
        clearTimeout(loadTimeout);
        
        // Additional check to ensure image actually loaded
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            mainImage.src = img.src;
            mainImage.style.display = 'block';
            loadingPlaceholder.style.display = 'none';
            updateImageCounter();
            updateActiveThumbnail();
        } else {
            // Image didn't load properly, retry
            if (retryCount < maxRetries) {
                setTimeout(() => loadImage(index, retryCount + 1), 1000);
            } else {
                showImageError();
            }
        }
    };
    
    img.onerror = () => {
        clearTimeout(loadTimeout);
        
        if (retryCount < maxRetries) {
            loadingPlaceholder.innerHTML = '<i class="fas fa-redo"></i> Retrying...';
            setTimeout(() => loadImage(index, retryCount + 1), 1000);
        } else {
            showImageError();
        }
    };
    
    // Add cache-busting parameter and crossorigin for external images
    const imageSrc = projectImages[index];
    if (imageSrc.startsWith('http')) {
        img.crossOrigin = 'anonymous';
        img.src = imageSrc + (imageSrc.includes('?') ? '&' : '?') + 't=' + Date.now();
    } else {
        img.src = imageSrc;
    }
}

// Helper function to show image error
function showImageError() {
    loadingPlaceholder.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Image unavailable';
    setTimeout(() => {
        loadingPlaceholder.style.display = 'none';
        mainImage.style.display = 'block';
        mainImage.src = 'data:image/svg+xml;base64,' + btoa(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#1a1a1a"/>
                <text x="50%" y="50%" fill="#00ffff" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24">
                    Image not available
                </text>
                <text x="50%" y="75%" fill="#cccccc" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="14">
                    Please try refreshing or contact support
                </text>
            </svg>
        `);
        updateImageCounter();
        updateActiveThumbnail();
    }, 2000);
}

// Update image counter
function updateImageCounter() {
    imageCounter.textContent = `${currentImageIndex + 1} / ${projectImages.length}`;
}

// Update active thumbnail
function updateActiveThumbnail() {
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Close modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
    currentImageIndex = 0;
    projectImages = [];
}

// Navigation functions
function nextImage() {
    const nextIndex = (currentImageIndex + 1) % projectImages.length;
    loadImage(nextIndex);
}

function prevImage() {
    const prevIndex = currentImageIndex === 0 ? projectImages.length - 1 : currentImageIndex - 1;
    loadImage(prevIndex);
}

// Event listeners for modal
closeModal.addEventListener('click', closeProjectModal);
navNext.addEventListener('click', nextImage);
navPrev.addEventListener('click', prevImage);

// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!projectModal.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeProjectModal();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
    }
});

// Image cache for better performance
const imageCache = new Map();

// Preload images for better performance
function preloadImages() {
    // Preload first 3 images with cache
    const imagesToPreload = projectImages.slice(0, 3);
    imagesToPreload.forEach((imageSrc, index) => {
        if (!imageCache.has(imageSrc)) {
            const img = new Image();
            img.onload = () => {
                imageCache.set(imageSrc, img);
            };
            img.onerror = () => {
                console.warn(`Failed to preload image: ${imageSrc}`);
            };
            
            // Add cache-busting for external images
            if (imageSrc.startsWith('http')) {
                img.crossOrigin = 'anonymous';
                img.src = imageSrc + (imageSrc.includes('?') ? '&' : '?') + 't=' + Date.now();
            } else {
                img.src = imageSrc;
            }
        }
    });
}

// Clear image cache when modal closes
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
    currentImageIndex = 0;
    projectImages = [];
    
    // Clear cache for memory management
    if (imageCache.size > 10) {
        imageCache.clear();
    }
}

// Add click event listeners to portfolio items with tracking
document.querySelectorAll('.portfolio-item[data-project]').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = item.getAttribute('data-project');
        
        // Track portfolio item clicks
        gtag('event', 'click', {
            event_category: 'portfolio',
            event_label: `portfolio_${projectId}`,
            value: 1
        });
        
        openProjectModal(projectId);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Parallax effect
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-container');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 16)); // ~60fps
