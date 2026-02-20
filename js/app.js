/**
 * ╔════════════════════════════════════════════════════════════════╗
 * ║         Beautiful Mind University - Main Application           ║
 * ║                    Version 2.0 Enhanced                        ║
 * ║                  Optimized & Professional Code                 ║
 * ╚════════════════════════════════════════════════════════════════╝
 * 
 * 📋 TABLE OF CONTENTS
 * ─────────────────────────────────────────────────────────────────
 * 1  > Initialization & Configuration
 * 2  > Navigation & Mobile Menu
 * 3  > Dark Mode Management
 * 4  > Stats Counter Animation
 * 5  > Sliders & Carousels
 * 6  > Forms & Validation
 * 7  > Modals & Dialogs
 * 8  > Utility Functions
 * ─────────────────────────────────────────────────────────────────
 */

'use strict';

/**
 * 1️⃣ INITIALIZATION & CONFIGURATION
 * ──────────────────────────────────────────────────────────────────
 */

const APP = {
	version: '2.0',
	debug: true,
	
	// 🎯 Selectors
	selectors: {
		navbar: '.modern-navbar',
		navLinks: '.nav-links',
		navLink: '.nav-link',
		hamburger: '.hamburger',
		mobileMenu: '#mobileMenu',
		mobileMenuOverlay: '#mobileMenuOverlay',
		statsSection: '#stats',
		statCount: '.stat-count',
		darkModeToggle: '#darkModeToggle',
		darkModeToggleMobile: '#darkModeToggleMobile',
		loginButton: '#open-login-modal',
		loginModal: '#loginModalContainer',
		loginModalOverlay: '#loginModalOverlay',
		loginForm: '#loginForm',
		testimonialSlider: '#testimonials-slider-modern',
	},
	
	// 📊 Configuration
	config: {
		statsAnimationDuration: 2000,
		scrollThreshold: 200,
		mobileBreakpoint: 768,
	},
	
	// 🔍 State Management
	state: {
		statsAnimated: false,
		mobileMenuOpen: false,
		darkMode: localStorage.getItem('theme') || 'light',
	},

	/**
	 * 🚀 Initialize Application
	 */
	init: function() {
		if (this.debug) console.log('🚀 Beautiful Mind App v' + this.version + ' Initializing...');
		
		this.setupEventListeners();
		this.setupDarkMode();
		this.setupScrollBehavior();
		
		if (this.debug) console.log('✅ Initialization Complete');
	},

	/**
	 * 📌 Setup all event listeners
	 */
	setupEventListeners: function() {
		// Navigation events
		const hamburger = document.querySelector(this.selectors.hamburger);
		if (hamburger) {
			hamburger.addEventListener('click', () => this.toggleMobileMenu());
		}

		// Mobile menu overlay click
		const overlay = document.querySelector(this.selectors.mobileMenuOverlay);
		if (overlay) {
			overlay.addEventListener('click', () => this.closeMobileMenu());
		}

		// Smooth scroll for nav links
		document.querySelectorAll(this.selectors.navLink).forEach(link => {
			link.addEventListener('click', (e) => this.handleNavClick(e));
		});

		// Login button events
		this.setupLoginModal();

		// Window events
		window.addEventListener('scroll', () => this.handleScroll());
		window.addEventListener('resize', () => this.handleResize());
	},

	/**
	 * ✅ Log helper for debugging
	 */
	log: function(message, type = 'info') {
		if (this.debug) {
			const icons = {
				'info': 'ℹ️',
				'success': '✅',
				'error': '❌',
				'warning': '⚠️',
				'debug': '🔍'
			};
			console.log(`${icons[type]} ${message}`);
		}
	},
};


/**
 * 2️⃣ NAVIGATION & MOBILE MENU
 * ──────────────────────────────────────────────────────────────────
 */

APP.toggleMobileMenu = function() {
	if (this.state.mobileMenuOpen) {
		this.closeMobileMenu();
	} else {
		this.openMobileMenu();
	}
};

APP.openMobileMenu = function() {
	const menu = document.querySelector(this.selectors.mobileMenu);
	const overlay = document.querySelector(this.selectors.mobileMenuOverlay);
	
	if (menu && overlay) {
		menu.classList.add('active');
		overlay.classList.add('active');
		this.state.mobileMenuOpen = true;
		document.body.style.overflow = 'hidden';
		this.log('Mobile menu opened', 'info');
	}
};

APP.closeMobileMenu = function() {
	const menu = document.querySelector(this.selectors.mobileMenu);
	const overlay = document.querySelector(this.selectors.mobileMenuOverlay);
	
	if (menu && overlay) {
		menu.classList.remove('active');
		overlay.classList.remove('active');
		this.state.mobileMenuOpen = false;
		document.body.style.overflow = 'auto';
		this.log('Mobile menu closed', 'info');
	}
};

APP.handleNavClick = function(e) {
	// Close mobile menu on link click
	if (window.innerWidth < this.config.mobileBreakpoint) {
		this.closeMobileMenu();
	}

	// Set active state
	document.querySelectorAll(this.selectors.navLink).forEach(link => {
		link.classList.remove('active');
	});
	e.target.classList.add('active');
};


/**
 * 3️⃣ DARK MODE MANAGEMENT
 * ──────────────────────────────────────────────────────────────────
 */

APP.setupDarkMode = function() {
	const darkToggle = document.querySelector(this.selectors.darkModeToggle);
	const darkToggleMobile = document.querySelector(this.selectors.darkModeToggleMobile);

	if (darkToggle) {
		darkToggle.addEventListener('click', () => this.toggleDarkMode());
	}
	if (darkToggleMobile) {
		darkToggleMobile.addEventListener('click', () => this.toggleDarkMode());
	}

	// Apply saved theme on load
	this.applyTheme(this.state.darkMode);

	// Keyboard shortcut: Ctrl/Cmd + Shift + D
	document.addEventListener('keydown', (e) => {
		if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
			e.preventDefault();
			this.toggleDarkMode();
		}
	});

	this.log('Dark mode initialized', 'success');
};

APP.toggleDarkMode = function() {
	const newTheme = this.state.darkMode === 'dark' ? 'light' : 'dark';
	this.state.darkMode = newTheme;
	localStorage.setItem('theme', newTheme);
	this.applyTheme(newTheme);
	this.log(`Dark Mode: ${newTheme === 'dark' ? 'ON 🌙' : 'OFF ☀️'}`);
};

APP.applyTheme = function(theme) {
	document.documentElement.setAttribute('data-theme', theme);
};


/**
 * 4️⃣ STATS COUNTER ANIMATION
 * ──────────────────────────────────────────────────────────────────
 */

APP.animateStats = function() {
	if (this.state.statsAnimated) return;

	const statsSection = document.querySelector(this.selectors.statsSection);
	if (!statsSection) return;

	const counts = document.querySelectorAll(this.selectors.statCount);
	
	counts.forEach(counter => {
		const target = parseInt(counter.getAttribute('data-target'), 10);
		const duration = this.config.statsAnimationDuration;
		const start = 0;
		const increment = target / (duration / 16); // 60fps

		let current = start;

		const updateCount = () => {
			current += increment;
			if (current < target) {
				counter.textContent = Math.floor(current).toLocaleString('ar-EG');
				requestAnimationFrame(updateCount);
			} else {
				counter.textContent = target.toLocaleString('ar-EG');
			}
		};

		updateCount();
	});

	this.state.statsAnimated = true;
	this.log('Stats animation started', 'success');
};

APP.handleScroll = function() {
	// Trigger stats animation when section is visible
	const statsSection = document.querySelector(this.selectors.statsSection);
	if (statsSection && !this.state.statsAnimated) {
		const rect = statsSection.getBoundingClientRect();
		if (rect.top < window.innerHeight) {
			this.animateStats();
		}
	}

	// Update navbar on scroll
	const navbar = document.querySelector(this.selectors.navbar);
	if (navbar) {
		if (window.scrollY > this.config.scrollThreshold) {
			navbar.classList.add('scrolled');
		} else {
			navbar.classList.remove('scrolled');
		}
	}
};


/**
 * 5️⃣ SLIDERS & CAROUSELS
 * ──────────────────────────────────────────────────────────────────
 */

APP.initializeSliders = function() {
	// Testimonials Slider with Owl Carousel
	const $testimonialSlider = $('#testimonials-slider-modern');
	if ($testimonialSlider.length) {
		$testimonialSlider.owlCarousel({
			items: 1,
			loop: true,
			margin: 10,
			autoplay: true,
			autoplayTimeout: 6000,
			autoplayHoverPause: true,
			nav: false,
			dots: false,
			rtl: true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
		});

		// Custom navigation
		$('.testimonial-nav .custom-next').click(function() {
			$testimonialSlider.trigger('next.owl.carousel');
		});
		$('.testimonial-nav .custom-prev').click(function() {
			$testimonialSlider.trigger('prev.owl.carousel');
		});

		this.log('Testimonial slider initialized', 'success');
	}
};


/**
 * 6️⃣ FORMS & VALIDATION
 * ──────────────────────────────────────────────────────────────────
 */

APP.setupLoginModal = function() {
	const loginBtn = document.querySelector(this.selectors.loginButton);
	const modal = document.querySelector(this.selectors.loginModalOverlay);
	const closeBtn = document.querySelector('#loginModalClose');

	if (loginBtn && modal) {
		loginBtn.addEventListener('click', () => this.openLoginModal());
	}

	if (closeBtn && modal) {
		closeBtn.addEventListener('click', () => this.closeLoginModal());
	}

	// Close on overlay click
	if (modal) {
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				this.closeLoginModal();
			}
		});
	}
};

APP.openLoginModal = function() {
	const modal = document.querySelector(this.selectors.loginModalOverlay);
	if (modal) {
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
		this.log('Login modal opened', 'info');
	}
};

APP.closeLoginModal = function() {
	const modal = document.querySelector(this.selectors.loginModalOverlay);
	if (modal) {
		modal.classList.remove('active');
		document.body.style.overflow = 'auto';
		this.log('Login modal closed', 'info');
	}
};

/**
 * Validate email format
 */
APP.isValidEmail = function(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

/**
 * Validate password strength
 */
APP.isValidPassword = function(password) {
	return password.length >= 6;
};


/**
 * 7️⃣ MODALS & DIALOGS
 * ──────────────────────────────────────────────────────────────────
 */

APP.showNotification = function(message, type = 'info', duration = 3000) {
	// Create notification element
	const notification = document.createElement('div');
	notification.className = `notification notification-${type}`;
	notification.textContent = message;
	notification.style.cssText = `
		position: fixed;
		top: 20px;
		right: 20px;
		padding: 15px 20px;
		background: var(--${type === 'error' ? 'accent' : 'primary'});
		color: white;
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.2);
		z-index: 10000;
		animation: slideIn 0.3s ease;
	`;

	document.body.appendChild(notification);

	setTimeout(() => {
		notification.style.animation = 'slideOut 0.3s ease';
		setTimeout(() => notification.remove(), 300);
	}, duration);
};


/**
 * 8️⃣ UTILITY FUNCTIONS
 * ──────────────────────────────────────────────────────────────────
 */

APP.handleResize = function() {
	// Close mobile menu on resize to desktop
	if (window.innerWidth >= this.config.mobileBreakpoint) {
		this.closeMobileMenu();
	}
};

APP.debounce = function(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};


/**
 * 🎯 DOCUMENT READY - Start Application
 */

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		APP.init();
		if (typeof $ !== 'undefined') {
			APP.initializeSliders();
		}
	});
} else {
	APP.init();
	if (typeof $ !== 'undefined') {
		APP.initializeSliders();
	}
}


/**
 * 📤 Export for use in other scripts if needed
 */
if (typeof module !== 'undefined' && module.exports) {
	module.exports = APP;
}
