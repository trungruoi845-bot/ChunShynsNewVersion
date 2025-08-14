// Initialize AOS
AOS.init({
  duration: 1000,
  easing: "ease-in-out-sine",
  once: true,
  mirror: false,
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  if (window.scrollY > 100) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = counter.innerText;
    const numericTarget = parseInt(target.replace(/\D/g, ""));
    const suffix = target.replace(/[0-9]/g, "");

    let current = 0;
    const increment = numericTarget / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        counter.innerText = numericTarget + suffix;
        clearInterval(timer);
      } else {
        counter.innerText = Math.floor(current) + suffix;
      }
    }, 20);
  });
}

// Intersection Observer for counter animation
const statsSection = document.querySelector(".stats-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

if (statsSection) {
  observer.observe(statsSection);
}

// Enhanced navbar mobile toggle
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

if (navbarToggler && navbarCollapse) {
  navbarToggler.addEventListener("click", function () {
    navbarCollapse.classList.toggle("show");
  });

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navbarCollapse.classList.remove("show");
    });
  });
}

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector(".footer-bottom p");
if (yearElement) {
  yearElement.innerHTML = yearElement.innerHTML.replace("2025", currentYear);
}

// Form validation for newsletter
const newsletterForm = document.querySelector(".input-group");
if (newsletterForm) {
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const submitBtn = newsletterForm.querySelector("button");

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
      emailInput.classList.add("is-invalid");
      return;
    }

    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");

    // Simulate successful subscription
    submitBtn.innerHTML = '<i class="fas fa-check"></i>';
    submitBtn.classList.add("btn-success");

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      submitBtn.classList.remove("btn-success");
      emailInput.classList.remove("is-valid");
      emailInput.value = "";
    }, 2000);
  });

  emailInput.addEventListener("input", function () {
    this.classList.remove("is-invalid", "is-valid");
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero-section::before");

  parallaxElements.forEach((element) => {
    const speed = 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Trigger animations after load
  setTimeout(() => {
    const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
    elementsToAnimate.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("animated");
      }, index * 100);
    });
  }, 300);
});

// Performance optimization: Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Testimonials carousel auto-play (if needed)
let testimonialIndex = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.opacity = i === index ? "1" : "0.7";
    testimonial.style.transform = i === index ? "scale(1.05)" : "scale(1)";
  });
}

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}, 5000);

// Enhanced scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade animation to cards
document
  .querySelectorAll(".feature-card, .testimonial-card, .process-step")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease";
    fadeObserver.observe(el);
  });

// Add CSS for loading state
const style = document.createElement("style");
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'ChunSync';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10000;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
    
    .loaded::before,
    .loaded::after {
        display: none !important;
    }
    
    /* Custom scrollbar styles */
    .navbar-nav {
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.3) transparent;
    }
    
    .navbar-nav::-webkit-scrollbar {
        width: 4px;
    }
    
    .navbar-nav::-webkit-scrollbar-track {
        background: transparent;
    }
    
    .navbar-nav::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.3);
        border-radius: 2px;
    }
    
    /* Enhanced mobile responsiveness */
    @media (max-width: 576px) {
        .hero-title {
            font-size: 1.8rem;
            line-height: 1.3;
        }
        
        .hero-subtitle {
            font-size: 1rem;
        }
        
        .btn-lg {
            padding: 0.75rem 1.5rem;
            font-size: 0.9rem;
        }
        
        .section-title h2 {
            font-size: 1.8rem;
        }
        
        .feature-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
        }
        
        .step-number {
            width: 70px;
            height: 70px;
            font-size: 1.5rem;
        }
        
        .stat-number {
            font-size: 2.5rem;
        }
        
        .testimonial-card {
            padding: 1.5rem;
        }
        
        .footer .row > div {
            margin-bottom: 2rem;
        }
    }
    
    /* Print styles */
    @media print {
        .navbar, .footer, .btn, .cta-section {
            display: none !important;
        }
        
        body {
            font-size: 12pt;
            line-height: 1.4;
        }
        
        .section-padding {
            padding: 20px 0;
        }
    }
`;
document.head.appendChild(style);
