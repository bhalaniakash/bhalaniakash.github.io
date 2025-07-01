// Initialize AOS with modified settings
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  disable: 'mobile'
});

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1,
  lerp: 0.05
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
let currentTheme = body.dataset.theme || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.dataset.theme = currentTheme;
  themeToggle.innerHTML = currentTheme === 'light' ? 
    '<i class="fas fa-moon"></i>' : 
    '<i class="fas fa-sun"></i>';
});

// Initialize skill bars animation
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-level');
  skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    bar.style.setProperty('--level', level);
    
    // Create observer for each skill bar
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.classList.add('animated');
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(bar);
  });
}

// Initialize projects and certificates
function initializeSections() {
  const sections = document.querySelectorAll('.projects-grid, .certificates-grid');
  sections.forEach(section => {
    section.style.opacity = '1';
    section.style.transform = 'none';
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeSkillBars();
  initializeSections();
  
  // Initialize skill filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const categories = document.querySelectorAll('.skill-category');
      categories.forEach(category => {
        if (filter === 'all' || category.dataset.category === filter) {
          category.style.removeProperty('display');
          category.style.opacity = '1';
          category.style.transform = 'none';
        } else {
          category.style.display = 'none';
          category.style.opacity = '0';
          category.style.transform = 'scale(0.8)';
        }
      });
    });
  });
});

// Mobile Menu with GSAP
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  
  if (navMenu.classList.contains('active')) {
    gsap.to(navMenu, {
      x: '100%',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => navMenu.classList.remove('active')
    });
  } else {
    navMenu.classList.add('active');
    gsap.fromTo(navMenu, 
      { x: '100%' },
      { x: '0%', duration: 0.5, ease: 'power2.inOut' }
    );
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      scroll.scrollTo(target);
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
});

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["beautiful websites", "responsive applications", "user-friendly interfaces", "modern web solutions"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Basic validation
    let isValid = true;
    const errorMessages = contactForm.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');

    if (!data.name.trim()) {
      isValid = false;
      contactForm.querySelector('[name="name"]').nextElementSibling.textContent = 'Name is required';
    }

    if (!data.email.trim()) {
      isValid = false;
      contactForm.querySelector('[name="email"]').nextElementSibling.textContent = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      isValid = false;
      contactForm.querySelector('[name="email"]').nextElementSibling.textContent = 'Invalid email format';
    }

    if (!data.message.trim()) {
      isValid = false;
      contactForm.querySelector('[name="message"]').nextElementSibling.textContent = 'Message is required';
    }

    if (!isValid) {
      e.preventDefault(); // Only prevent submission if invalid
    }
    // If valid, allow the form to submit to Formspree
  });
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    gsap.to(scrollToTopBtn, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  } else {
    gsap.to(scrollToTopBtn, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
});

scrollToTopBtn.addEventListener('click', () => {
  scroll.scrollTo('top');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Project hover effects
const projects = document.querySelectorAll('.project');
projects.forEach(project => {
  project.addEventListener('mouseenter', () => {
    gsap.to(project, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  project.addEventListener('mouseleave', () => {
    gsap.to(project, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Parallax Hero
gsap.to("#hero", {
  backgroundPosition: "50% 100%",
  ease: "none",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Hero Animations
gsap.from(".hero-text > *", {
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#hero",
    start: "top 80%"
  }
});

gsap.from(".hero-image", {
  opacity: 0,
  x: 50,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#hero",
    start: "top 80%"
  }
});

// Timeline Animation
gsap.from(".timeline-item", {
  opacity: 0,
  y: 50,
  stagger: 0.3,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".timeline",
    start: "top 80%"
  }
});

// Navigation Active State
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Scroll Progress
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// Update scroll on window resize
window.addEventListener('resize', () => {
  scroll.update();
});

// Particles.js Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#4f46e5'
    },
    shape: {
      type: 'circle'
    },
    opacity: {
      value: 0.5,
      random: false
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#4f46e5',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// Initialize Lottie Animations
const heroAnimation = lottie.loadAnimation({
  container: document.getElementById('hero-lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets2.lottiefiles.com/packages/lf20_xyadoh9h.json' // Developer animation
});

const skillsAnimation = lottie.loadAnimation({
  container: document.getElementById('skills-lottie'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'https://assets9.lottiefiles.com/packages/lf20_49rdyysj.json' // Skills animation
});

// Pause animations when not in viewport
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.play();
    } else {
      entry.target.pause();
    }
  });
}, observerOptions);

observer.observe(heroAnimation);
observer.observe(skillsAnimation);