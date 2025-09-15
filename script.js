// Pure Moringa Review Page JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    setupAnimations();
});

// Initialize page functionality
function initializePage() {
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Initialize product image gallery
    initializeImageGallery();
    
    // Setup FAQ functionality
    initializeFAQ();
    
    // Setup pricing interactions
    initializePricing();
    
    // Add loading animation
    addLoadingAnimations();
    
    // Setup scroll effects
    setupScrollEffects();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', highlightPricingCard);
        card.addEventListener('mouseleave', unhighlightPricingCard);
    });
    
    // CTA button tracking
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-cta');
    ctaButtons.forEach(button => {
        button.addEventListener('click', trackCTAClick);
    });
}


// Change product image
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Update main image with fade effect
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = imageSrc;
        mainImage.style.opacity = '1';
    }, 150);
    
    // Update active thumbnail
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}

// Initialize image gallery
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainProductImage');
    
    // Add click events to thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            changeImage(this.src);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add hover effects
        thumbnail.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        thumbnail.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1)';
            }
        });
    });
    
    // Auto-rotate images (optional)
    let currentImageIndex = 0;
    const images = ['images/PURE MORINGA.webp', 'images/MORINGA1.webp', 'images/MORINGA2.webp', 'images/MORINGA3.webp', 'images/MORINGA4.webp'];
    
    // Uncomment to enable auto-rotation
    // setInterval(() => {
    //     currentImageIndex = (currentImageIndex + 1) % images.length;
    //     changeImage(images[currentImageIndex]);
    // }, 5000);
}

// Setup smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Toggle functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) {
            answer.style.display = 'none';
        }
    });
    
    // Toggle current item
    const answer = faqItem.querySelector('.faq-answer');
    if (!isActive) {
        faqItem.classList.add('active');
        if (answer) {
            answer.style.display = 'block';
        }
    } else {
        faqItem.classList.remove('active');
        if (answer) {
            answer.style.display = 'none';
        }
    }
    
    // Add animation effect
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}

// Initialize FAQ
function initializeFAQ() {
    console.log('FAQ initialized'); // Debug log
    // FAQ is already initialized via onclick in HTML
}

// Pricing card interactions
function highlightPricingCard(event) {
    const card = event.currentTarget;
    if (!card.classList.contains('popular')) {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
    }
}

function unhighlightPricingCard(event) {
    const card = event.currentTarget;
    if (!card.classList.contains('popular')) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }
}

// Initialize pricing interactions
function initializePricing() {
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate order process
            showOrderModal(this);
        });
    });
}

// Show order modal (simulation)
function showOrderModal(button) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'order-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Redirecting to Order Page</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>You're being redirected to the official Pure Moringa order page...</p>
                <div class="loading-spinner"></div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 400px;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Simulate redirect after 2 seconds
    setTimeout(() => {
        window.open('https://mdrnremedy.com/#aff=raniere57', '_blank');
        closeModal(modal);
    }, 2000);
}

// Close modal
function closeModal(modal) {
    modal.style.opacity = '0';
    modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Track CTA clicks
function trackCTAClick(event) {
    const buttonText = event.target.textContent.trim();
    const section = event.target.closest('section');
    const sectionName = section ? section.className.split('-')[0] : 'unknown';
    
    console.log(`CTA Clicked: "${buttonText}" in section: ${sectionName}`);
    
    // Add click animation for CTA buttons
    if (event.target.classList.contains('btn-cta')) {
        event.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            event.target.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', { 
            'event_category': 'CTA', 
            'event_label': buttonText,
            'custom_parameter_1': sectionName
        });
        
        // Track conversions for affiliate links
        if (buttonText.toLowerCase().includes('official') || 
            buttonText.toLowerCase().includes('visit') || 
            buttonText.toLowerCase().includes('shop')) {
            gtag('event', 'conversion', {
                'send_to': 'AW-17539368572'
            });
        }
    }
}

// Add loading animations
function addLoadingAnimations() {
    const animatedElements = document.querySelectorAll('.benefit-card, .review-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Setup scroll effects
function setupScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Setup animations
function setupAnimations() {
    // Counter animation for stats
    animateCounters();
    
    // Progress bar animation
    animateProgressBars();
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat, .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace('%', ''));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (counter.textContent.includes('%') ? '%' : '');
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate progress bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for loading spinner
const style = document.createElement('style');
style.textContent = `
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #2c5530;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 1rem auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    
    .close-modal:hover {
        color: #333;
    }
    
    @media (max-width: 768px) {
        .nav.mobile-active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Welcome Modal Functions
let modalShown = false;

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.add('hidden');
    modalShown = true; // Mark as shown to prevent re-showing
    
    // Track modal close
    if (typeof gtag !== 'undefined') {
        gtag('event', 'modal_close', {
            'event_category': 'Welcome Modal',
            'event_label': 'Close Button'
        });
    }
}

function readReview() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.add('hidden');
    modalShown = true; // Mark as shown to prevent re-showing
    
    // Track read review choice
    if (typeof gtag !== 'undefined') {
        gtag('event', 'modal_action', {
            'event_category': 'Welcome Modal',
            'event_label': 'Read Review'
        });
    }
}

function goToOfficialPage() {
    // Track official page click
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-17539368572'
        });
        
        gtag('event', 'modal_action', {
            'event_category': 'Welcome Modal',
            'event_label': 'Official Page'
        });
    }
    
    // Redirect to affiliate link
    window.open('https://mdrnremedy.com/#aff=raniere57', '_blank');
}

// Show modal when page loads
function showWelcomeModal() {
    if (modalShown) return; // Don't show if already shown
    
    const modal = document.getElementById('welcomeModal');
    modal.classList.remove('hidden');
    
    // Track modal view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'modal_view', {
            'event_category': 'Welcome Modal',
            'event_label': 'Page Load'
        });
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('welcomeModal');
    
    if ((event.target === modal || event.target === modal.querySelector('.modal-overlay')) && !modal.classList.contains('hidden')) {
        closeWelcomeModal();
    }
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class for any final animations
    document.body.classList.add('loaded');
    
    // Show welcome modal after a short delay
    setTimeout(showWelcomeModal, 1000);
    
    // Initialize any remaining functionality
    console.log('Pure Moringa Review Page Loaded Successfully!');
});

// Fallback for older browsers
window.addEventListener('load', function() {
    if (!modalShown) {
        setTimeout(showWelcomeModal, 1000);
    }
});
