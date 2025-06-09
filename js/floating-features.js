
// Floating Features JavaScript
// Handles all floating UI elements and interactions

class FloatingFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.createFloatingElements();
        this.setupEventListeners();
        this.initScrollEffects();
    }

    // Create floating elements
    createFloatingElements() {
        this.createBackToTop();
        this.createFloatingNotifications();
        this.createProgressBar();
        this.setupTooltips();
    }

    // Create back to top button
    createBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'floating-back-to-top';
        backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(backToTop);
        this.backToTop = backToTop;
    }

    // Create floating notifications system
    createFloatingNotifications() {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.className = 'notification-container';
        this.notificationContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(this.notificationContainer);
    }

    // Show notification
    showNotification(message, type = 'info', duration = 4000) {
        const notification = document.createElement('div');
        notification.className = `floating-notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        this.notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    // Get notification icon
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }

    // Create progress bar
    createProgressBar() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'floating-progress';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'floating-progress-bar';
        
        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
        
        this.progressBar = progressBar;
    }

    // Update progress bar
    updateProgress(percentage) {
        if (this.progressBar) {
            this.progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
    }

    // Setup tooltips
    setupTooltips() {
        // Add tooltips to elements with title attribute
        document.querySelectorAll('[title]').forEach(element => {
            const title = element.getAttribute('title');
            if (title) {
                element.removeAttribute('title');
                this.addTooltip(element, title);
            }
        });

        // Add tooltips to specific elements
        this.addTooltip(document.querySelector('.hire-btn'), 'Contact me for your next project');
        this.addTooltip(document.querySelector('.chatbot-toggle'), 'Chat with Unes Assistant');
    }

    // Add tooltip to element
    addTooltip(element, text) {
        if (!element) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'floating-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);

        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 35 + 'px';
            tooltip.classList.add('show');
        });

        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Scroll events
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Resize events
        window.addEventListener('resize', this.throttle(() => {
            this.handleResize();
        }, 250));

        // Form submission notifications
        this.setupFormNotifications();
    }

    // Handle scroll events
    handleScroll() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        
        // Back to top button
        if (this.backToTop) {
            if (scrollTop > 300) {
                this.backToTop.classList.add('show');
            } else {
                this.backToTop.classList.remove('show');
            }
        }

        // Progress bar
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        this.updateProgress(scrollPercent);
    }

    // Handle resize events
    handleResize() {
        // Adjust floating elements for mobile
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            this.adjustForMobile();
        } else {
            this.adjustForDesktop();
        }
    }

    // Adjust for mobile
    adjustForMobile() {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach(el => {
            el.style.transform = 'scale(0.9)';
        });
    }

    // Adjust for desktop
    adjustForDesktop() {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach(el => {
            el.style.transform = 'scale(1)';
        });
    }

    // Setup form notifications
    setupFormNotifications() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                this.showNotification('Message sent successfully!', 'success');
            });
        }
    }

    // Initialize scroll effects
    initScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', this.throttle(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }, 16));
        }

        // Reveal animations on scroll
        this.setupScrollReveal();
    }

    // Setup scroll reveal animations
    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.service-card, .portfolio-item, .skill-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    // Utility: Throttle function
    throttle(func, limit) {
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

    // Show loading overlay
    showLoading() {
        let loadingOverlay = document.querySelector('.floating-loading');
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'floating-loading';
            loadingOverlay.innerHTML = `
                <div class="floating-loading-content">
                    <div class="floating-loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            `;
            document.body.appendChild(loadingOverlay);
        }
        loadingOverlay.classList.add('show');
    }

    // Hide loading overlay
    hideLoading() {
        const loadingOverlay = document.querySelector('.floating-loading');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('show');
        }
    }

    // Create floating search
    createFloatingSearch() {
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'floating-search';
        searchOverlay.innerHTML = `
            <input type="text" placeholder="Search..." id="floating-search-input">
            <div class="search-results" id="floating-search-results"></div>
        `;
        
        document.body.appendChild(searchOverlay);
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchOverlay.classList.remove('active');
            }
        });
        
        return searchOverlay;
    }

    // Show search
    showSearch() {
        let searchOverlay = document.querySelector('.floating-search');
        if (!searchOverlay) {
            searchOverlay = this.createFloatingSearch();
        }
        
        searchOverlay.classList.add('active');
        const input = searchOverlay.querySelector('input');
        if (input) {
            input.focus();
        }
    }

    // Hide search
    hideSearch() {
        const searchOverlay = document.querySelector('.floating-search');
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    }
}

// Initialize floating features
document.addEventListener('DOMContentLoaded', () => {
    window.floatingFeatures = new FloatingFeatures();
});

// Global functions for easy access
function showNotification(message, type, duration) {
    if (window.floatingFeatures) {
        window.floatingFeatures.showNotification(message, type, duration);
    }
}

function showLoading() {
    if (window.floatingFeatures) {
        window.floatingFeatures.showLoading();
    }
}

function hideLoading() {
    if (window.floatingFeatures) {
        window.floatingFeatures.hideLoading();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FloatingFeatures;
}
