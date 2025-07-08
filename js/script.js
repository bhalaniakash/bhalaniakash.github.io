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
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const body = document.body;
let currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
body.setAttribute('data-theme', currentTheme);

// Update both buttons
function updateThemeButtons() {
  const icon = currentTheme === 'light' ? '<i class="fas fa-moon text-white text-sm"></i>' : '<i class="fas fa-sun text-white text-sm"></i>';
  if (themeToggle) themeToggle.innerHTML = icon;
  if (themeToggleMobile) themeToggleMobile.innerHTML = icon;
}

// Initialize theme buttons
updateThemeButtons();

// Theme toggle function
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', currentTheme);
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeButtons();
}

// Add event listeners to both theme toggle buttons
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
  themeToggleMobile.addEventListener('click', toggleTheme);
}

// Enhanced Mobile Menu with GSAP
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

if (hamburger && mobileMenu) {
  // Enhanced mobile menu animation
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  
    if (mobileMenu.classList.contains('active')) {
      // Close animation
      gsap.to(mobileMenu, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          mobileMenu.classList.remove('active');
          mobileMenu.style.pointerEvents = 'none';
          mobileMenu.style.transform = 'translateY(-100%)';
        }
      });
    } else {
      // Open animation
      mobileMenu.classList.add('active');
      mobileMenu.style.pointerEvents = 'auto';
      mobileMenu.style.transform = 'translateY(0)';
      gsap.fromTo(mobileMenu, 
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        }
      );
    }
  });

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        gsap.to(mobileMenu, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            mobileMenu.classList.remove('active');
            mobileMenu.style.pointerEvents = 'none';
            mobileMenu.style.transform = 'translateY(-100%)';
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
        number: { value: 100, density: { enable: true, value_area: 1000 } },
        color: { value: "#aa48ec" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 4, random: true },
        line_linked: {
          enable: true,
          distance: 100,
          color: "#aa48ec",
          opacity: 1,
          width: 0.5
        },
        move: {
          enable: true,
          speed: 5,
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

// just joke

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

// Zigzag Scroll Path Animation
function initZigzagScrollPath() {
  const scrollDot = document.querySelector('.scroll-dot');
  const scrollPath = document.querySelector('.scroll-path');
  
  if (!scrollDot || !scrollPath) return;
  
  let ticking = false;
  
  function updateScrollDot() {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const pathLength = scrollPath.getTotalLength();
    const currentLength = pathLength * scrollProgress;
    
    // Get point on path
    const point = scrollPath.getPointAtLength(currentLength);
    
    // Update dot position with smooth animation
    gsap.to(scrollDot, {
      duration: 0.3,
      x: point.x - 8, // Center the dot
      y: point.y - 8,
      rotation: scrollProgress * 360,
      ease: "power2.out"
    });
    
    // Add pulsing effect when scrolling
    scrollDot.style.animation = 'pulse-glow 1s ease-out';
    setTimeout(() => {
      scrollDot.style.animation = '';
    }, 1000);
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateScrollDot);
      ticking = true;
    }
  }
  
  // Throttled scroll listener
  window.addEventListener('scroll', onScroll);
  
  // Initial position
  updateScrollDot();
}

// Enhanced Section Animations with Intersection Observer
function initAdvancedAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const elements = section.querySelectorAll('.animate-on-scroll');
        
        // Staggered animation for elements within the section
        gsap.fromTo(elements, 
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
          }
        );
        
        // Add special effects for specific sections
        if (section.id === 'skills') {
          initSkillBarsAnimation();
        }
        
        if (section.id === 'projects') {
          animateProjectCards();
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });
}

// Enhanced Skill Bars Animation
function initSkillBarsAnimation() {
  const skillBars = document.querySelectorAll('.skill-level');
  
  skillBars.forEach((bar, index) => {
    const level = bar.getAttribute('data-level');
    
    gsap.fromTo(bar, 
      { width: '0%' },
      { 
        width: level,
        duration: 1.5,
        delay: index * 0.1,
        ease: "power3.out",
        onComplete: () => {
          // Add shimmer effect
          bar.style.animation = 'shimmer 2s ease-in-out';
        }
      }
    );
  });
}

// Project Cards Animation
function animateProjectCards() {
  const cards = document.querySelectorAll('.project, .certificate');
  
  cards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 100,
        rotationX: -15,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out"
      }
    );
  });
}

// Enhanced Parallax Scrolling
function initParallaxScrolling() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  let ticking = false;
  
  function updateParallax() {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrollTop * speed);
      
      gsap.set(element, {
        transform: `translateY(${yPos}px) translateZ(0)`
  });
});

    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll);
}

// Smooth Mouse Cursor Following
function initCustomCursor() {
  if (window.innerWidth < 1024) return; // Skip on mobile
  
  const cursor = document.createElement('div');
  const follower = document.createElement('div');
  
  cursor.className = 'cursor-dot';
  follower.className = 'cursor-follower';
  
  document.body.appendChild(cursor);
  document.body.appendChild(follower);
  
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0
    });
  });
  
  // Smooth follower animation
  function updateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    gsap.set(follower, {
      x: followerX,
      y: followerY
    });
    
    requestAnimationFrame(updateFollower);
  }
  
  updateFollower();
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .project, .certificate');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });
}

// Enhanced Zigzag Scroll Path with Polls
class EnhancedScrollPath {
  constructor() {
    this.scrollContainer = document.querySelector('.scroll-path-container');
    this.scrollDot = document.querySelector('.scroll-dot');
    this.scrollPath = document.querySelector('.scroll-path');
    this.sections = document.querySelectorAll('section');
    this.sectionPolls = new Map();
    this.isScrolling = false;
    this.scrollTimeout = null;
    
    if (this.scrollContainer && this.scrollDot) {
      this.init();
    }
  }
  
  init() {
    this.createSectionPolls();
    this.bindScrollEvents();
    this.animatePathReveal();
    
    // Initial position
    this.updateDotPosition();
    this.updateSectionPolls();
  }
  
  createSectionPolls() {
    if (!this.scrollPath) return;
    
    this.sections.forEach((section, index) => {
      const poll = document.createElement('div');
      poll.className = 'section-poll';
      poll.dataset.section = section.id || `section-${index}`;
      
      // Calculate position along the path (zigzag pattern)
      const pathHeight = this.scrollPath.getBoundingClientRect().height;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(sectionTop / documentHeight, 1);
      
      // Zigzag positioning
      const zigzagOffset = Math.sin(progress * Math.PI * 6) * 15; // 6 curves
      poll.style.top = `${progress * pathHeight}px`;
      poll.style.left = `${50 + zigzagOffset}%`;
      
      this.scrollPath.appendChild(poll);
      this.sectionPolls.set(section, poll);
      
      // Add click handler for navigation
      poll.addEventListener('click', () => {
        this.scrollToSection(section);
      });
      
      // Add hover tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'poll-tooltip';
      tooltip.textContent = section.querySelector('h2')?.textContent || section.id || `Section ${index + 1}`;
      poll.appendChild(tooltip);
    });
  }
  
  bindScrollEvents() {
    let ticking = false;
    
    const updatePosition = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateDotPosition();
          this.updateSectionPolls();
          this.handleScrollingState();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', () => {
      this.repositionSectionPolls();
      this.updateDotPosition();
    });
  }
  
  updateDotPosition() {
    if (!this.scrollDot || !this.scrollPath) return;
    
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollTop / documentHeight, 1);
    
    const pathHeight = this.scrollPath.getBoundingClientRect().height;
    const dotPosition = scrollProgress * pathHeight;
    
    // Zigzag positioning for the main dot
    const zigzagOffset = Math.sin(scrollProgress * Math.PI * 6) * 20;
    
    this.scrollDot.style.top = `${dotPosition}px`;
    this.scrollDot.style.left = `${50 + (zigzagOffset * 0.5)}%`;
    
    // Add dynamic color based on progress
    const hue = 220 + (scrollProgress * 60); // Blue to purple range
    this.scrollDot.style.background = `hsl(${hue}, 80%, 60%)`;
    this.scrollDot.style.boxShadow = `
      0 0 20px hsla(${hue}, 80%, 60%, 0.6),
      0 0 40px hsla(${hue}, 80%, 60%, 0.4),
      0 0 60px hsla(${hue}, 80%, 60%, 0.3)
    `;
  }
  
  updateSectionPolls() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    this.sectionPolls.forEach((poll, section) => {
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top + scrollTop;
      const sectionBottom = sectionTop + sectionRect.height;
      
      const isActive = scrollTop >= sectionTop - windowHeight * 0.3 && 
                      scrollTop <= sectionBottom - windowHeight * 0.3;
      
      poll.classList.toggle('active', isActive);
      
      if (isActive) {
        // Animate active poll
        gsap.to(poll, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(poll, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  }
  
  handleScrollingState() {
    this.isScrolling = true;
    this.scrollDot.classList.add('scrolling');
    
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isScrolling = false;
      this.scrollDot.classList.remove('scrolling');
    }, 150);
  }
  
  scrollToSection(section) {
    const targetTop = section.getBoundingClientRect().top + window.pageYOffset - 80;
    
    // Animate the scroll
    gsap.to(window, {
      duration: 1.2,
      scrollTo: targetTop,
      ease: "power3.inOut"
    });
    
    // Pulse effect on target poll
    const poll = this.sectionPolls.get(section);
    if (poll) {
      gsap.fromTo(poll, 
        { scale: 1.5 },
        { 
          scale: 2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    }
  }
  
  repositionSectionPolls() {
    this.sectionPolls.forEach((poll, section) => {
      const pathHeight = this.scrollPath.getBoundingClientRect().height;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(sectionTop / documentHeight, 1);
      
      const zigzagOffset = Math.sin(progress * Math.PI * 6) * 15;
      poll.style.top = `${progress * pathHeight}px`;
      poll.style.left = `${50 + zigzagOffset}%`;
    });
  }
  
  animatePathReveal() {
    if (!this.scrollPath) return;
    
    // Animate path drawing
    gsap.fromTo(this.scrollPath.querySelector('path'), {
      strokeDasharray: "1000",
      strokeDashoffset: "1000"
    }, {
      strokeDashoffset: "0",
      duration: 3,
      ease: "power2.inOut",
      delay: 2
    });
    
    // Animate container fade in
    gsap.fromTo(this.scrollContainer, {
      opacity: 0,
      x: -30
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      delay: 1.5
    });
    
    // Animate dot appearance
    gsap.fromTo(this.scrollDot, {
      scale: 0,
      opacity: 0
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 2.5
    });
  }
}

// Advanced Parallax Effects
class ParallaxManager {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }
  
  init() {
    if (this.elements.length === 0) return;
    
    this.elements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      
      gsap.registerPlugin(ScrollTrigger);
      
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }
}

// Enhanced Custom Cursor
class EnhancedCursor {
  constructor() {
    this.cursor = null;
    this.follower = null;
    this.isDesktop = window.innerWidth >= 1024;
    
    if (this.isDesktop && !('ontouchstart' in window)) {
      this.init();
    }
  }
  
  init() {
    this.createCursor();
    this.bindEvents();
  }
  
  createCursor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
    
    this.follower = document.createElement('div');
    this.follower.className = 'custom-cursor-follower';
    this.follower.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background: rgba(79, 70, 229, 0.1);
      border: 2px solid rgba(79, 70, 229, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: all 0.3s ease;
      opacity: 0;
    `;
    document.body.appendChild(this.follower);
  }
  
  bindEvents() {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      this.cursor.style.left = mouseX + 'px';
      this.cursor.style.top = mouseY + 'px';
      this.cursor.classList.add('active');
      this.follower.style.opacity = '1';
    });
    
    document.addEventListener('mouseenter', () => {
      this.cursor.classList.add('active');
      this.follower.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
      this.cursor.classList.remove('active');
      this.follower.style.opacity = '0';
    });
    
    // Smooth follower animation
    const animate = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      this.follower.style.left = followerX + 'px';
      this.follower.style.top = followerY + 'px';
      
      requestAnimationFrame(animate);
    };
    animate();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
        this.follower.style.transform = 'scale(1.5)';
      });
      
      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
        this.follower.style.transform = 'scale(1)';
      });
    });
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.isMonitoring = false;
    
    if (window.location.search.includes('debug=true')) {
      this.startMonitoring();
    }
  }
  
  startMonitoring() {
    this.isMonitoring = true;
    this.createUI();
    this.monitor();
  }
  
  createUI() {
    const monitor = document.createElement('div');
    monitor.id = 'performance-monitor';
    monitor.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
    `;
    document.body.appendChild(monitor);
  }
  
  monitor() {
    if (!this.isMonitoring) return;
    
    const now = performance.now();
    this.frameCount++;
    
    if (now >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
      this.frameCount = 0;
      this.lastTime = now;
      
      const monitor = document.getElementById('performance-monitor');
      if (monitor) {
        monitor.innerHTML = `
          FPS: ${this.fps}<br>
          Memory: ${this.getMemoryUsage()}<br>
          Scroll: ${Math.round(window.pageYOffset)}px
        `;
      }
    }
    
    requestAnimationFrame(() => this.monitor());
  }
  
  getMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      return `${Math.round(memory.usedJSHeapSize / 1048576)}MB`;
    }
    return 'N/A';
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize enhanced scroll path
  const scrollPath = new EnhancedScrollPath();
  
  // Initialize parallax effects
  const parallax = new ParallaxManager();
  
  // Initialize enhanced cursor
  const cursor = new EnhancedCursor();
  
  // Initialize performance monitor
  const monitor = new PerformanceMonitor();
  
  // Enhanced scroll animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Trigger GSAP animations for specific elements
        if (entry.target.classList.contains('skill-category')) {
          const skillBars = entry.target.querySelectorAll('.skill-level');
          skillBars.forEach((bar, index) => {
            const level = bar.getAttribute('data-level');
            gsap.to(bar, {
              width: level,
              duration: 1.2,
              delay: index * 0.1,
              ease: "power2.out"
            });
          });
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animations
  document.querySelectorAll('.skill-category, .project, .certificate, .detail-item').forEach(el => {
    observer.observe(el);
  });
  
  // Enhanced mobile performance
  if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    document.documentElement.style.setProperty('--transition-slow', 'all 0.4s ease');
  }
});

console.log('Enhanced portfolio loaded successfully! 🚀');

// --- Mouse-based movement for scroll path and dot ---
const scrollPathContainer = document.querySelector('.scroll-path-container');
const scrollDot = document.querySelector('.scroll-dot');
const zigzagPath = document.querySelector('.scroll-path path');

if (scrollPathContainer && scrollDot && zigzagPath) {
  scrollPathContainer.addEventListener('mousemove', (e) => {
    const rect = scrollPathContainer.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    // Move the dot vertically (clamp to container)
    scrollDot.style.top = `${Math.max(0, Math.min(rect.height, mouseY))}px`;

    // Parallax/morph the zigzag path based on mouse X
    const mouseX = e.clientX - rect.left;
    // Calculate a small offset for the zigzag amplitude
    const amplitude = 30 + (mouseX / rect.width) * 40; // 30-70
    // Build a new zigzag path with this amplitude
    let d = `M50,0 `;
    for (let y = 40; y <= 1000; y += 40) {
      const x = (y / 40) % 2 === 0 ? 50 + amplitude : 50 - amplitude;
      d += `Q${x},${y - 20} 50,${y} `;
    }
    zigzagPath.setAttribute('d', d.trim());
  });

  // Optional: reset on mouse leave
  scrollPathContainer.addEventListener('mouseleave', () => {
    scrollDot.style.top = `0px`;
    // Reset to default zigzag
    zigzagPath.setAttribute('d', 'M50,0 Q80,40 50,80 Q20,120 50,160 Q80,200 50,240 Q20,280 50,320 Q80,360 50,400 Q20,440 50,480 Q80,520 50,560 Q20,600 50,640 Q80,680 50,720 Q20,760 50,800 Q80,840 50,880 Q20,920 50,960 Q80,980 50,1000');
  });
}