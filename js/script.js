// Initialize page loader
window.addEventListener('load', function() {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => loader.style.display = 'none'
    });
  }
});

// Initialize AOS with faster settings
AOS.init({
  duration: 400,
  once: false,
  offset: 20,
  delay: 0
});

// Initialize Locomotive Scroll (disabled for better performance)
// const scroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   multiplier: 1,
//   lerp: 0.05
// });

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
body.setAttribute('data-theme', currentTheme);
if (themeToggle) {
  themeToggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'light' ? 
      '<i class="fas fa-moon"></i>' : 
      '<i class="fas fa-sun"></i>';
  });
}

// Enhanced Mobile Menu with GSAP
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu a');

if (hamburger && navMenu) {
  // Enhanced mobile menu animation
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
      // Close animation
      gsap.to(navLinks, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.in",
        onComplete: () => {
          navMenu.classList.remove('active');
        }
      });
    } else {
      // Open animation
      navMenu.classList.add('active');
      gsap.fromTo(navLinks, 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.1
        }
      );
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        gsap.to(navLinks, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            navMenu.classList.remove('active');
          }
        });
      }
    });
  });
}

// Enhanced scroll animations
ScrollTrigger.batch(".project, .certificate, .detail-item", {
  onEnter: (elements) => {
    gsap.fromTo(elements, 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.4, 
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  },
  onLeave: (elements) => {
    gsap.to(elements, {
      opacity: 0.8,
      scale: 0.98,
      duration: 0.2
    });
  },
  onEnterBack: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      scale: 1,
      duration: 0.3
    });
  }
});

// Enhanced skill bars animation with GSAP
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-level');
  
  ScrollTrigger.batch(skillBars, {
    onEnter: (elements) => {
      elements.forEach(bar => {
        const level = bar.getAttribute('data-level');
        gsap.fromTo(bar, 
          { width: '0%' },
          { 
            width: level,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.1
          }
        );
      });
    }
  });
}

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Use native smooth scroll if ScrollTo plugin not available
      if (typeof gsap.plugins.ScrollTo !== 'undefined') {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut"
        });
      } else {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Enhanced form animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    gsap.to(input, {
      scale: 1.01,
      duration: 0.2,
      ease: "power2.out"
    });
  });
  
  input.addEventListener('blur', () => {
    gsap.to(input, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  });
});

// Enhanced button hover effects
document.querySelectorAll('.btn:not([href^="http"]):not([href^="https"]):not([target="_blank"])').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out"
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  });
});

// Enhanced typing animation
function enhancedTypingEffect() {
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  
  if (!typedTextSpan || !cursorSpan) return;

  const textArray = [
    "beautiful websites", 
    "responsive applications", 
    "user-friendly interfaces", 
    "modern web solutions",
    "scalable backends",
    "interactive experiences"
  ];
  
  const typingDelay = 80;
  const erasingDelay = 40;
  const newTextDelay = 1500;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) {
        cursorSpan.classList.add("typing");
      }
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  // Start typing effect
  if (textArray.length) setTimeout(type, 500);
}

// Skills filter functionality
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter categories
      skillCategories.forEach(category => {
        if (filter === 'all' || category.getAttribute('data-category') === filter) {
          category.style.display = 'block';
          gsap.fromTo(category, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
          );
        } else {
          gsap.to(category, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => category.style.display = 'none'
          });
        }
      });
    });
  });
}

// Form validation and submission
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Add loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        form.reset();
        alert('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
    
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

// Particles.js initialization
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4f46e5" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#4f46e5",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        }
      },
      retina_detect: true
    });
  }
}

// Enhanced page load animation
window.addEventListener('load', function() {
  // Page loader
  const loader = document.querySelector('.page-loader');
  if (loader) {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => loader.style.display = 'none'
    });
  }

  // Stagger animations for main elements
  const timeline = gsap.timeline();
  
  timeline
    .from("header", { y: -100, opacity: 0, duration: 1, ease: "power3.out" })
    .from(".hero-text > *", { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.5")
    .from(".hero-image", { x: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.5");
});

// Fix external links
function ensureExternalLinksWork() {
  // Remove any event listeners that might interfere with external links
  const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"], a[target="_blank"]');
  
  externalLinks.forEach(link => {
    // Ensure the link is clickable
    link.style.pointerEvents = 'auto';
    link.style.cursor = 'pointer';
    
    // Add click handler to ensure it works
    link.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log('External link clicked:', this.href);
      
      // Force open in new tab for external links
      if (this.target === '_blank' || this.href.startsWith('http')) {
        window.open(this.href, '_blank');
        e.preventDefault();
      }
    });
  });
}

// Simple click handler for project and certificate links
document.addEventListener('click', function(e) {
  const target = e.target.closest('a[href^="http"], a[href^="https"], a[target="_blank"]');
  if (target) {
    console.log('External link clicked via delegation:', target.href);
    e.stopPropagation();
    window.open(target.href, '_blank');
    e.preventDefault();
  }
});

// Debug function to test links
function debugLinks() {
  console.log('Checking all external links:');
  const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"], a[target="_blank"]');
  externalLinks.forEach((link, index) => {
    console.log(`Link ${index + 1}:`, link.href, link.textContent.trim());
  });
}

// Call debug function
setTimeout(debugLinks, 1000);

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
  // Make elements immediately visible
  const elementsToShow = document.querySelectorAll('.detail-item, .project, .certificate');
  elementsToShow.forEach(el => {
    el.style.opacity = '1';
    el.style.visibility = 'visible';
    el.style.transform = 'none';
  });

  initializeSkillBars();
  enhancedTypingEffect();
  initSkillsFilter();
  initContactForm();
  initParticles();
  ensureExternalLinksWork(); // Ensure external links work
  
  // Add intersection observer for scroll animations with immediate trigger
  const observerOptions = {
    threshold: 0.01,
    rootMargin: '0px 0px 0px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all sections for animations
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Initialize smooth scrolling for all anchor links (only internal links)
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
  
  // Ensure external links work properly
  document.querySelectorAll('a[href^="http"], a[href^="https"], a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Don't prevent default for external links
      e.stopPropagation();
    });
  });

  ensureExternalLinksWork();
});