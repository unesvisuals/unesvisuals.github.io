
// Unes Assistant Chatbot
class UnesAssistant {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.predefinedResponses = {
            // Primary Q&A pairs - exact matches
            "who is unes rebeiro": "Unes Rebeiro is a Bangladeshi creative visionary, graphic designer, and digital brand developer. He is the founder and creator of Unes Visuals and the Unes Assistant AI.",
            "who is unes": "Unes Rebeiro is a Bangladeshi creative visionary, graphic designer, and digital brand developer. He is the founder and creator of Unes Visuals and the Unes Assistant AI.",
            "what is unes visuals": "Unes Visuals is a creative design brand founded by Unes Rebeiro, offering graphic design, image manipulation, and digital branding services with a unique gothic and cinematic style.",
            "who created you": "I was created and developed by Unes Rebeiro — a visionary designer and developer behind Unes Visuals.",
            "who made you": "I was created and developed by Unes Rebeiro — a visionary designer and developer behind Unes Visuals.",
            "what can you do": "I can answer your questions, help with creative ideas, provide information about Unes Visuals, explain design terms, and even guide you on freelancing or branding. I'm your personal assistant on this website.",
            "are you like chatgpt": "I'm powered by AI like ChatGPT, but I've been customized by Unes Rebeiro to represent Unes Visuals and assist with creative, design, and personal brand-related topics.",
            "what is graphic design": "Graphic design is the art and practice of creating visual content to communicate messages through typography, imagery, color, and layout — often used in branding, marketing, and communication.",
            "how can i start freelancing": "To start freelancing, build a strong portfolio, choose your skill focus, create profiles on platforms like Fiverr or Upwork, and start promoting your services. Stay consistent and learn from feedback.",
            "can ai replace humans": "AI can assist and automate many tasks, but human creativity, emotion, and ethical judgment are irreplaceable. AI works best when collaborating with humans.",
            "tell me a fun fact": "Did you know? Honey never spoils. Archaeologists found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
            "how do i contact unes rebeiro": "You can contact Unes Rebeiro through, or email at spondonrebeiro79@gmail.com or send message below.",
            
            // Additional variations and legacy responses
            "about unes": "Unes Rebeiro is a Bangladeshi creative visionary, graphic designer, and digital brand developer. He is the founder and creator of Unes Visuals and the Unes Assistant AI.",
            "contact": "You can contact Unes Rebeiro through, or email at spondonrebeiro79@gmail.com or send message below.",
            "email": "You can contact Unes Rebeiro at spondonrebeiro79@gmail.com",
            "freelancing": "To start freelancing, build a strong portfolio, choose your skill focus, create profiles on platforms like Fiverr or Upwork, and start promoting your services. Stay consistent and learn from feedback.",
            "fun fact": "Did you know? Honey never spoils. Archaeologists found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
            
            // Greetings
            "hello": "Hello! I'm Unes Assistant, created by Unes Rebeiro! 🚀 I can help with creative ideas, answer questions about Unes Visuals, design guidance, freelancing tips, or just have an engaging conversation. What would you like to know?",
            "hi": "Hi there! I'm Unes Assistant, created by Unes Rebeiro! 🚀 I can help with creative ideas, answer questions about Unes Visuals, design guidance, freelancing tips, or just have an engaging conversation. What would you like to know?",
            "hey": "Hey! I'm Unes Assistant, created by Unes Rebeiro! 🚀 I can help with creative ideas, answer questions about Unes Visuals, design guidance, freelancing tips, or just have an engaging conversation. What would you like to know?",
            
            // Thank you
            "thank you": "You're welcome! If you have any more questions about Unes Visuals or need help with anything else, feel free to ask. I'm here to help!",
            "thanks": "You're welcome! If you have any more questions about Unes Visuals or need help with anything else, feel free to ask. I'm here to help!"
        };
        
        this.init();
    }

    init() {
        this.createElements();
        this.bindEvents();
    }

    createElements() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.messages = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.typingIndicator = document.getElementById('typing-indicator');
    }

    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Attachment button with quick questions popup
        const attachmentBtn = document.getElementById('chatbot-attachment');
        this.createQuickQuestionsPopup();
        
        attachmentBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleQuickQuestions();
        });
        
        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.quick-questions-popup') && !e.target.closest('.chatbot-attachment')) {
                this.hideQuickQuestions();
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.input.focus();
        }
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Generate response after delay
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        
        this.messages.appendChild(messageDiv);
        
        // Smooth scroll to bottom with delay to ensure proper rendering
        setTimeout(() => {
            this.messages.scrollTo({
                top: this.messages.scrollHeight,
                behavior: 'smooth'
            });
        }, 50);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for exact matches first
        for (const [key, response] of Object.entries(this.predefinedResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Check for partial matches and keywords
        if (lowerMessage.includes('logo') && lowerMessage.includes('design')) {
            return "Unes specializes in creating unique and memorable logos that represent your brand's identity and values. Would you like to know more about the logo design process?";
        }
        
        if (lowerMessage.includes('social media')) {
            return "Unes creates eye-catching social media graphics that boost engagement and brand awareness. He can help with Instagram posts, Facebook covers, and more!";
        }
        
        if (lowerMessage.includes('branding')) {
            return "Unes offers complete brand identity solutions including logos, color schemes, and visual guidelines to make your brand stand out.";
        }
        
        if (lowerMessage.includes('poster')) {
            return "Unes designs eye-catching event posters and marketing materials that grab attention and communicate your message effectively.";
        }
        
        if (lowerMessage.includes('business card')) {
            return "Unes creates professional business cards that make a lasting first impression and represent your brand perfectly.";
        }
        
        if (lowerMessage.includes('hire') || lowerMessage.includes('work together')) {
            return "Great! You can contact Unes at spondonrebeiro79@gmail.com or +(880) 1638521639 to discuss your project. He'd love to bring your vision to life!";
        }
        
        if (lowerMessage.includes('photoshop') || lowerMessage.includes('illustrator')) {
            return "Unes is highly skilled in both Photoshop (92% proficiency) and Illustrator (90% proficiency), along with other design tools.";
        }
        
        // Default response
        return "That's an interesting question! For specific inquiries about Unes' design services, pricing, or to discuss your project, please contact him directly at spondonrebeiro79@gmail.com. Is there anything else about his services I can help you with?";
    }

    showTyping() {
        this.typingIndicator.style.display = 'flex';
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    createQuickQuestionsPopup() {
        const popup = document.createElement('div');
        popup.className = 'quick-questions-popup';
        popup.id = 'quick-questions-popup';
        
        const questions = [
            "Who is Unes Rebeiro?",
            "What is Unes Visuals?",
            "Who created you?",
            "What can you do?",
            "Are you like ChatGPT?",
            "What is graphic design?",
            "How can I start freelancing?",
            "Can AI replace humans?",
            "Tell me a fun fact",
            "How do I contact Unes Rebeiro?"
        ];
        
        popup.innerHTML = `
            <div class="quick-questions-header">
                <i class="fas fa-question-circle"></i>
                <span>Quick Questions</span>
            </div>
            ${questions.map(question => 
                `<div class="quick-question-item" data-question="${question}">${question}</div>`
            ).join('')}
        `;
        
        // Add click handlers to question items
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-question-item')) {
                const question = e.target.getAttribute('data-question');
                this.hideQuickQuestions();
                
                // Add user message
                this.addMessage(question, 'user');
                
                // Show typing indicator
                this.showTyping();
                
                // Generate and show response after delay
                setTimeout(() => {
                    this.hideTyping();
                    const response = this.generateResponse(question);
                    this.addMessage(response, 'bot');
                }, 800 + Math.random() * 500);
            }
        });
        
        this.window.appendChild(popup);
        this.quickQuestionsPopup = popup;
    }

    toggleQuickQuestions() {
        if (this.quickQuestionsPopup.classList.contains('show')) {
            this.hideQuickQuestions();
        } else {
            this.showQuickQuestions();
        }
    }

    showQuickQuestions() {
        this.quickQuestionsPopup.classList.add('show');
    }

    hideQuickQuestions() {
        this.quickQuestionsPopup.classList.remove('show');
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UnesAssistant();
});
