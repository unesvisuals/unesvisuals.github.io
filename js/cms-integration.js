
// CMS Integration JavaScript
// This file handles content management and dynamic content loading

// Content Management System
class CMSIntegration {
    constructor() {
        this.apiBase = './api/';
        this.init();
    }

    init() {
        this.loadDynamicContent();
        this.setupContentUpdates();
    }

    // Load dynamic content from CMS
    async loadDynamicContent() {
        try {
            // Load portfolio projects
            await this.loadPortfolioProjects();
            
            // Load testimonials
            await this.loadTestimonials();
            
            // Load services
            await this.loadServices();
            
        } catch (error) {
            console.log('CMS Integration: Using static content fallback');
        }
    }

    // Load portfolio projects
    async loadPortfolioProjects() {
        try {
            const response = await fetch(this.apiBase + 'projects.php');
            if (response.ok) {
                const projects = await response.json();
                this.updatePortfolioGrid(projects);
            }
        } catch (error) {
            console.log('Portfolio: Using static content');
        }
    }

    // Update portfolio grid with dynamic content
    updatePortfolioGrid(projects) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid || !projects.length) return;

        // Keep existing static portfolio items and enhance them
        const existingItems = portfolioGrid.querySelectorAll('.portfolio-item');
        
        projects.forEach((project, index) => {
            if (existingItems[index]) {
                const item = existingItems[index];
                const overlay = item.querySelector('.portfolio-overlay h3');
                const description = item.querySelector('.portfolio-overlay p');
                
                if (overlay) overlay.textContent = project.title;
                if (description) description.textContent = project.description;
                if (project.id) item.setAttribute('data-project', project.id);
            }
        });
    }

    // Load testimonials
    async loadTestimonials() {
        try {
            const response = await fetch(this.apiBase + 'content.php?type=testimonials');
            if (response.ok) {
                const testimonials = await response.json();
                this.updateTestimonials(testimonials);
            }
        } catch (error) {
            console.log('Testimonials: Using static content');
        }
    }

    // Update testimonials with dynamic content
    updateTestimonials(testimonials) {
        const testimonialTrack = document.getElementById('testimonial-track');
        if (!testimonialTrack || !testimonials.length) return;

        // Keep existing testimonials as fallback
        testimonials.forEach((testimonial, index) => {
            const slide = testimonialTrack.children[index];
            if (slide) {
                const quote = slide.querySelector('p');
                const author = slide.querySelector('h4');
                const position = slide.querySelector('span');
                
                if (quote) quote.textContent = `"${testimonial.quote}"`;
                if (author) author.textContent = testimonial.author;
                if (position) position.textContent = testimonial.position;
            }
        });
    }

    // Load services
    async loadServices() {
        try {
            const response = await fetch(this.apiBase + 'content.php?type=services');
            if (response.ok) {
                const services = await response.json();
                this.updateServices(services);
            }
        } catch (error) {
            console.log('Services: Using static content');
        }
    }

    // Update services with dynamic content
    updateServices(services) {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid || !services.length) return;

        // Enhance existing service cards
        const existingCards = servicesGrid.querySelectorAll('.service-card');
        
        services.forEach((service, index) => {
            if (existingCards[index]) {
                const card = existingCards[index];
                const title = card.querySelector('h3');
                const description = card.querySelector('p');
                const icon = card.querySelector('.service-icon i');
                
                if (title) title.textContent = service.title;
                if (description) description.textContent = service.description;
                if (icon && service.icon) icon.className = service.icon;
            }
        });
    }

    // Setup content updates
    setupContentUpdates() {
        // Real-time content updates (if needed)
        this.setupPolling();
    }

    // Setup polling for content updates
    setupPolling() {
        // Poll for content updates every 5 minutes
        setInterval(() => {
            this.loadDynamicContent();
        }, 300000);
    }

    // Get content by type
    async getContent(type) {
        try {
            const response = await fetch(`${this.apiBase}content.php?type=${type}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.log(`Content loading failed for ${type}`);
            return null;
        }
    }

    // Update specific content section
    async updateContentSection(type, elementSelector) {
        const content = await this.getContent(type);
        if (!content) return;

        const element = document.querySelector(elementSelector);
        if (element) {
            // Update content based on type
            this.renderContent(element, content, type);
        }
    }

    // Render content based on type
    renderContent(element, content, type) {
        switch (type) {
            case 'hero':
                this.renderHeroContent(element, content);
                break;
            case 'about':
                this.renderAboutContent(element, content);
                break;
            case 'contact':
                this.renderContactContent(element, content);
                break;
            default:
                console.log(`Unknown content type: ${type}`);
        }
    }

    // Render hero content
    renderHeroContent(element, content) {
        const title = element.querySelector('.hero-title');
        const description = element.querySelector('.hero-description');
        
        if (title && content.title) title.innerHTML = content.title;
        if (description && content.description) description.textContent = content.description;
    }

    // Render about content
    renderAboutContent(element, content) {
        const aboutText = element.querySelector('.about-text p');
        const stats = element.querySelectorAll('.stat-number');
        
        if (aboutText && content.description) aboutText.textContent = content.description;
        
        if (stats && content.stats) {
            stats.forEach((stat, index) => {
                if (content.stats[index]) {
                    stat.textContent = content.stats[index].value;
                }
            });
        }
    }

    // Render contact content
    renderContactContent(element, content) {
        const contactItems = element.querySelectorAll('.contact-item span');
        
        if (contactItems && content.contact) {
            contactItems.forEach((item, index) => {
                if (content.contact[index]) {
                    item.textContent = content.contact[index].value;
                }
            });
        }
    }
}

// Initialize CMS Integration
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if CMS API is available
    if (typeof fetch !== 'undefined') {
        window.cmsIntegration = new CMSIntegration();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CMSIntegration;
}
