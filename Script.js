// ===== Navigation & Scroll Functionality =====

// Get DOM elements
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const navLinkElements = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Smooth Scrolling & Active Link Update =====
window.addEventListener('scroll', () => {
    // Add shadow to navbar on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveLink();
});

function updateActiveLink() {
    const sections = document.querySelectorAll('.section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            
            // Remove active class from all links
            navLinkElements.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section's link
            const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ===== Scroll to Section Function =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// ===== Contact Form Handling =====
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    // Validate form (basic validation)
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    // Show success message
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');

    // Reset form
    this.reset();
    this.querySelector('input[type="text"]').focus();

    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
});

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles to notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: '500',
        zIndex: '2000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    // Set color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #16c784 0%, #00d4ff 100%)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 5px 20px rgba(22, 199, 132, 0.4)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 5px 20px rgba(255, 107, 107, 0.4)';
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Add Animation Styles for Notifications =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ===== Scroll Animation Observer =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and service items
document.querySelectorAll('.feature-card, .service-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===== Parallax Effect on Scroll =====
const parallaxElements = document.querySelectorAll('.floating-shape');

window.addEventListener('scroll', () => {
    parallaxElements.forEach((element, index) => {
        const scrollPosition = window.scrollY;
        const movement = scrollPosition * (0.5 + index * 0.1);
        element.style.transform = `translateY(${movement}px)`;
    });
});

// ===== Enhanced Interactivity =====

// Feature cards - add click interaction
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', function() {
        // Toggle active state
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Service items - add interactive color change
document.querySelectorAll('.service-item').forEach((item, index) => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(22, 199, 132, 0.15)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

// ===== Button Ripple Effect =====
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        // Animate ripple
        const size = Math.max(rect.width, rect.height);
        ripple.animate([
            { width: '0px', height: '0px', opacity: 1 },
            { width: size + 'px', height: size + 'px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    updateActiveLink();

    // Add smooth scroll behavior fallback for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        console.log('Smooth scroll not supported, using polyfill');
    }

    // Log that script loaded successfully
    console.log('Website framework initialized successfully!');
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Quick navigation with keyboard shortcuts (Alt + Number)
    if (e.altKey) {
        const sections = ['home', 'features', 'services', 'about', 'contact'];
        const sectionIndex = parseInt(e.key) - 1;
        
        if (sectionIndex >= 0 && sectionIndex < sections.length) {
            scrollToSection(sections[sectionIndex]);
        }
    }
});

// ===== Performance Optimization - Lazy Loading =====
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===== Detect Reduce Motion Preference =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    console.log('Reduced motion preference detected');
}