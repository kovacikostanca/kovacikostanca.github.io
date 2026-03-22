$(document).ready(function(){
  // ===== Unified Owl Carousel Initialization for Portfolio =====
  $('.portfolio-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true, // Keep this true
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    // Use the ➜ arrow for both sides; CSS will handle the flip
    navText: ['<span>➜</span>', '<span>➜</span>'], 
    responsive: {
      0: { items: 1, margin: 10 },
      640: { items: 2, margin: 20 },
      968: { items: 3, margin: 30 }
    }
  });

  // ===== Testimonial Carousel =====
  if ($('.testimonial-carousel').length || $('.testimonial-track').length) {
    $('.testimonial-carousel, .testimonial-track').owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 6000,
      smartSpeed: 800,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });
  }
});

// ===== Wait for Document Ready =====
$(document).ready(function(){
  
  // ===== Owl Carousel Initialization for Portfolio =====
  $('.portfolio-carousel').owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    navText: ['<span>‹</span>', '<span>›</span>'],
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
      640: {
        items: 2,
        margin: 20
      },
      968: {
        items: 3,
        margin: 30
      }
    }
  });

  // ===== Owl Carousel for Testimonials (Optional) =====
  if ($('.testimonial-carousel').length) {
    $('.testimonial-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1024: {
          items: 3
        }
      }
    });
  }

  // ===== Owl Carousel for Blog (Optional) =====
  if ($('.blog-carousel').length) {
    $('.blog-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4500,
      autoplayHoverPause: true,
      smartSpeed: 700,
      navText: ['<span>‹</span>', '<span>›</span>'],
      responsive: {
        0: {
          items: 1
        },
        640: {
          items: 2
        },
        968: {
          items: 3
        }
      }
    });
  }
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = htmlElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navToggle) navToggle.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== Smooth Scrolling =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const animateCounters = () => {
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCounter();
  });
  counterAnimated = true;
};

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated) {
        animateCounters();
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.service-card, .process-item, .portfolio-item, .blog-card, .tutorial-card, .testimonial-card');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for reveal elements
revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (you can customize this)
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // Here you would typically send the data to a server
    // Example: 
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  });
}

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
});

// ===== Image Lazy Loading =====
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// ===== Testimonial Slider (Optional Enhancement) =====
// If you want to add auto-sliding functionality to testimonials
let testimonialIndex = 0;
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');

function slideTestimonials() {
  if (window.innerWidth > 968 && testimonialCards.length > 2) {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    const offset = -testimonialIndex * (testimonialCards[0].offsetWidth + 30);
    testimonialTrack.style.transform = `translateX(${offset}px)`;
  }
}

// Auto-slide every 5 seconds (optional)
// setInterval(slideTestimonials, 5000);

// ===== Portfolio Filter (if you want to add filtering) =====
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioTags = new Set();

portfolioItems.forEach(item => {
  const tag = item.querySelector('.portfolio-tag').textContent;
  portfolioTags.add(tag);
});

// You can expand this to add filter buttons dynamically

// ===== Parallax Effect (Optional) =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero-image img');
  
  if (heroImage && window.innerWidth > 968) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== Loading Animation =====
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger initial animations
  setTimeout(() => {
    revealOnScroll();
  }, 100);
});

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(revealOnScroll));

// ===== Accessibility Enhancements =====
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
});

// ===== Print Styles (Optional) =====
window.addEventListener('beforeprint', () => {
  // Expand all collapsed sections for printing
  navMenu.classList.remove('active');
  navToggle.classList.remove('active');
});

// ===== Console Welcome Message =====
console.log('%c👋 Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c💼 Looking for a data scientist? Let\'s connect!', 'color: #8b5cf6; font-size: 14px;');
console.log('%c📧 kostanca@example.com', 'color: #94a3b8; font-size: 12px;');


// ===== Side Drawer =====
document.addEventListener('DOMContentLoaded', function() {
  const drawerOpen = document.getElementById('drawerOpen');
  const drawerClose = document.getElementById('drawerClose');
  const sideDrawer = document.getElementById('sideDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (drawerOpen) {
    drawerOpen.addEventListener('click', () => {
      sideDrawer.classList.add('open');
      drawerOverlay.classList.add('open');
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', () => {
      sideDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', () => {
      sideDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
    });
  }

  document.querySelectorAll('.side-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      sideDrawer.classList.remove('open');
      drawerOverlay.classList.remove('open');
    });
  });
});