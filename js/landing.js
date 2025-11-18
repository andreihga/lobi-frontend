// Landing page specific functionality

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar background on scroll
function initializeNavbarScrollEffect() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Animate floating game elements
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-game');
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animation = 'float 3s ease-in-out infinite';
    });
}

// Intersection Observer for animations on scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe feature cards and step cards
    document.querySelectorAll('.feature-card, .step-card').forEach(card => {
        observer.observe(card);
    });
}

// Count up animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        if (!isNaN(target)) {
            animateCounter(counter, target);
        }
    });
}

function animateCounter(element, target) {
    let start = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        start += increment;
        const value = Math.floor(start);
        
        if (value >= target) {
            element.textContent = formatStatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatNumber(value);
        }
    }, 20);
}

function formatStatNumber(num) {
    if (num >= 1000) {
        return Math.floor(num / 1000) + 'K+';
    }
    return num.toString();
}

// Console gaming animation
function initializeConsoleAnimation() {
    const consoleGlow = document.querySelector('.console-glow');
    if (consoleGlow) {
        setInterval(() => {
            consoleGlow.style.animationPlayState = 'running';
        }, 3000);
    }
}

// Hero particles effect
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Check if user is already logged in
function checkAuthStatus() {
    // Placeholder for future authentication check
    const isLoggedIn = localStorage.getItem('lobiUserToken');
    
    if (isLoggedIn) {
        // User is already logged in, show dashboard option
        const loginBtn = document.querySelector('a[href="login.html"]');
        const registerBtn = document.querySelector('a[href="register.html"]');
        
        if (loginBtn) {
            loginBtn.textContent = 'Dashboard';
            loginBtn.href = 'dashboard.html';
            loginBtn.innerHTML = '<i class="bi bi-speedometer2 me-1"></i>Dashboard';
        }
        
        if (registerBtn) {
            registerBtn.style.display = 'none';
        }
    }
}

// Easter egg - Konami code
function initializeEasterEgg() {
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showEasterEgg();
            konamiCode = [];
        }
    });
}

function showEasterEgg() {
    // Create temporary easter egg overlay
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.innerHTML = `
        <div class="easter-egg-content">
            <h1>🎮 KONAMI CODE ACTIVATED! 🎮</h1>
            <p>You've unlocked the secret gamer achievement!</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                Continue Gaming
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        if (overlay.parentElement) {
            overlay.remove();
        }
    }, 5000);
}

// Performance monitoring
function trackPagePerformance() {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Landing page loaded in ${loadTime}ms`);
        
        // Track to analytics (placeholder)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                event_category: 'Performance',
                event_label: 'Landing Page',
                value: loadTime
            });
        }
    });
}

// Initialize all landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    initializeSmoothScrolling();
    initializeNavbarScrollEffect();
    initializeScrollAnimations();
    
    // Visual effects
    animateFloatingElements();
    createParticles();
    initializeConsoleAnimation();
    
    // User experience
    checkAuthStatus();
    
    // Fun features
    initializeEasterEgg();
    
    // Analytics
    trackPagePerformance();
    
    // Animate counters when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.disconnect(); // Only animate once
            }
        });
    });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    console.log('🎮 Lobi Landing Page initialized successfully');
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeSmoothScrolling,
        initializeNavbarScrollEffect,
        animateFloatingElements,
        animateCounters,
        checkAuthStatus
    };
}