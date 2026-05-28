/**
 * Website Configuration File
 * Edit this file to customize site content, colors, and settings
 * All values are easily modifiable for quick customization
 */

const SITE_CONFIG = {
    // ===== Site Information =====
    site: {
        name: 'Modern Framework',
        tagline: 'Your Digital Canvas',
        description: 'A modern framework for building exceptional digital experiences'
    },

    // ===== Brand Colors =====
    colors: {
        primary: '#1a1a2e',
        secondary: '#16c784',
        accent: '#00d4ff',
        textLight: '#ffffff',
        textDark: '#1a1a2e',
        bgLight: '#f8f9fa',
        bgDark: '#0f1419'
    },

    // ===== Navigation Links =====
    nav: [
        { label: 'Home', id: 'home' },
        { label: 'Features', id: 'features' },
        { label: 'Services', id: 'services' },
        { label: 'About', id: 'about' },
        { label: 'Contact', id: 'contact' }
    ],

    // ===== Hero Section =====
    hero: {
        title: 'Welcome to the Future',
        subtitle: 'A modern framework for building exceptional digital experiences',
        buttonText: 'Explore Now',
        buttonTarget: 'features'
    },

    // ===== Features Section =====
    features: [
        {
            icon: '🚀',
            title: 'Lightning Fast',
            description: 'Optimized performance that keeps your visitors engaged and happy.'
        },
        {
            icon: '🎨',
            title: 'Beautiful Design',
            description: 'Stunning visuals that showcase your brand with elegance.'
        },
        {
            icon: '📱',
            title: 'Fully Responsive',
            description: 'Perfect on every device, from mobile to desktop.'
        },
        {
            icon: '🔒',
            title: 'Secure & Reliable',
            description: 'Built with security best practices and industry standards.'
        }
    ],

    // ===== Services Section =====
    services: [
        {
            number: '01',
            title: 'Web Design',
            description: 'Creating visually stunning websites that convert visitors into customers.'
        },
        {
            number: '02',
            title: 'Development',
            description: 'Building robust, scalable applications with modern technologies.'
        },
        {
            number: '03',
            title: 'Strategy',
            description: 'Developing comprehensive digital strategies for growth and success.'
        },
        {
            number: '04',
            title: 'Support',
            description: '24/7 support to ensure your projects run smoothly.'
        }
    ],

    // ===== About Section =====
    about: {
        heading: 'About Our Framework',
        paragraphs: [
            'We believe in creating digital experiences that matter. Our framework combines cutting-edge technology with timeless design principles to deliver solutions that not only look beautiful but also perform exceptionally.',
            'Whether you\'re a startup looking to make an impact or an established brand seeking to innovate, our framework provides the foundation you need to succeed in today\'s digital landscape.'
        ],
        stats: [
            { number: '1000+', label: 'Projects Completed' },
            { number: '500+', label: 'Happy Clients' },
            { number: '10+', label: 'Years Experience' }
        ]
    },

    // ===== Contact Section =====
    contact: {
        heading: 'Get In Touch',
        subheading: 'Ready to start your next project?',
        fields: [
            { type: 'text', placeholder: 'Your Name', required: true },
            { type: 'email', placeholder: 'Your Email', required: true },
            { type: 'textarea', placeholder: 'Your Message', required: true }
        ]
    },

    // ===== Footer =====
    footer: {
        copyright: '© 2024 Modern Framework. All rights reserved.',
        links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Social', href: '#' }
        ]
    },

    // ===== Animation Settings =====
    animations: {
        enabled: true,
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },

    // ===== Form Settings =====
    form: {
        showSuccessMessage: true,
        successMessage: 'Message sent successfully! We\'ll get back to you soon.',
        showErrorMessage: true,
        errorMessage: 'Please fill in all fields correctly.'
    },

    // ===== Accessibility =====
    accessibility: {
        respectReducedMotion: true,
        enableKeyboardNavigation: true,
        focusOutlineWidth: 2
    }
};

// ===== Helper Functions =====

/**
 * Get a configuration value
 * @param {string} path - Dot notation path (e.g., 'colors.primary')
 * @returns {any} - Configuration value
 */
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj[key], SITE_CONFIG);
}

/**
 * Update a configuration value
 * @param {string} path - Dot notation path
 * @param {any} value - New value
 */
function setConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const obj = keys.reduce((o, k) => o[k], SITE_CONFIG);
    obj[lastKey] = value;
}

/**
 * Apply color theme to CSS variables
 */
function applyTheme(colorScheme = 'default') {
    const theme = SITE_CONFIG.colors;
    const root = document.documentElement;

    Object.entries(theme).forEach(([key, value]) => {
        const cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(cssVar, value);
    });
}

/**
 * Dynamically update site title
 */
function updateSiteTitle() {
    const titleElement = document.querySelector('.logo-text');
    if (titleElement) {
        titleElement.textContent = SITE_CONFIG.site.name.split(' ')[0];
    }
}

/**
 * Dynamically update hero content
 */
function updateHeroContent() {
    const titleElement = document.querySelector('.hero-title');
    const subtitleElement = document.querySelector('.hero-subtitle');
    const buttonElement = document.querySelector('.cta-button');

    if (titleElement) titleElement.textContent = SITE_CONFIG.hero.title;
    if (subtitleElement) subtitleElement.textContent = SITE_CONFIG.hero.subtitle;
    if (buttonElement) buttonElement.textContent = SITE_CONFIG.hero.buttonText;
}

// ===== Initialize Configuration =====
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    updateSiteTitle();
    updateHeroContent();
    
    console.log('Configuration loaded:', SITE_CONFIG);
});

// Make config globally accessible
window.SITE_CONFIG = SITE_CONFIG;
window.getConfig = getConfig;
window.setConfig = setConfig;
window.applyTheme = applyTheme;