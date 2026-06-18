/* ================================================
   ALBAIK RESTAURANT - JavaScript
   ================================================ */

'use strict';

// ======= LOADER =======
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2200);
});

// ======= NAVBAR =======
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link on scroll
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back to top
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ======= MOBILE MENU =======
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
const overlay = document.getElementById('overlay');

function openMobile() {
  mobileMenu.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobile);
mobileClose.addEventListener('click', closeMobile);

// ======= BACK TO TOP =======
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======= MENU TABS =======
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const target = document.getElementById(`tab-${tab}`);
    if (target) {
      target.classList.add('active');
      // Re-trigger AOS for new tab content
      target.querySelectorAll('[data-aos]').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 50);
      });
    }
  });
});

// ======= ADD TO CART =======
const cartToast = document.getElementById('cartToast');
let toastTimer;

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.menu-card');
    const name = card.querySelector('h3').textContent;

    cartToast.querySelector('span').textContent = `تمت إضافة "${name}" للطلب!`;
    cartToast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      cartToast.classList.remove('show');
    }, 3000);

    // Button animation
    btn.style.transform = 'scale(0.95)';
    btn.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
    setTimeout(() => {
      btn.style.transform = '';
      btn.innerHTML = '<i class="fas fa-plus"></i> أضف للطلب';
    }, 1500);
  });
});

// ======= COUNTDOWN TIMER =======
function updateTimer() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(23, 59, 59, 999);
  const diff = midnight - now;

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const h = document.getElementById('hours');
  const m = document.getElementById('minutes');
  const s = document.getElementById('seconds');

  if (h) h.textContent = String(hours).padStart(2, '0');
  if (m) m.textContent = String(minutes).padStart(2, '0');
  if (s) s.textContent = String(seconds).padStart(2, '0');
}
updateTimer();
setInterval(updateTimer, 1000);

// ======= REVIEWS SLIDER =======
const reviewsTrack = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
const dots = document.querySelectorAll('.dot');
const reviewCards = document.querySelectorAll('.review-card');

let currentReview = 0;
const reviewsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
const maxReview = Math.max(0, reviewCards.length - reviewsPerView);

function updateReviews() {
  const cardWidth = reviewCards[0].offsetWidth + 24;
  reviewsTrack.style.transform = `translateX(${currentReview * cardWidth}px)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentReview);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentReview = currentReview < maxReview ? currentReview + 1 : 0;
    updateReviews();
  });
}
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentReview = currentReview > 0 ? currentReview - 1 : maxReview;
    updateReviews();
  });
}
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentReview = Math.min(i, maxReview);
    updateReviews();
  });
});

// Auto-slide reviews
setInterval(() => {
  currentReview = currentReview < maxReview ? currentReview + 1 : 0;
  updateReviews();
}, 5000);

// ======= BRANCH SEARCH =======
const branchSearch = document.getElementById('branchSearch');
const branchCards = document.querySelectorAll('.branch-card');

if (branchSearch) {
  branchSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    branchCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? 'flex' : 'none';
    });
  });
}

// ======= CONTACT FORM =======
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
      btn.style.background = '#22C55E';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> أرسل الرسالة';
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 2000);
  });
}

// ======= AOS (Animate On Scroll) =======
function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}
initAOS();

// ======= COUNTER ANIMATION =======
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = Math.floor(current);
        }, 16);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}
animateCounters();

// ======= PARTICLES =======
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 1}px;
      height: ${Math.random() * 4 + 1}px;
      background: ${Math.random() > 0.5 ? 'rgba(200, 16, 46, 0.4)' : 'rgba(255, 184, 0, 0.3)'};
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite ${Math.random() * 5}s;
    `;
    container.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0) opacity(0.5); }
      33% { transform: translateY(-30px) translateX(10px); opacity: 1; }
      66% { transform: translateY(-15px) translateX(-10px); opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
}
createParticles();

// ======= SMOOTH SCROLL =======
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ======= MENU CARD TILT EFFECT =======
document.querySelectorAll('.menu-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ======= NEWSLETTER FORM =======
const newsletterBtn = document.querySelector('.newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');
if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener('click', () => {
    if (newsletterInput.value.trim()) {
      newsletterBtn.innerHTML = '<i class="fas fa-check"></i>';
      newsletterBtn.style.background = '#22C55E';
      newsletterInput.value = '';
      setTimeout(() => {
        newsletterBtn.innerHTML = '<i class="fas fa-arrow-left"></i>';
        newsletterBtn.style.background = '';
      }, 3000);
    }
  });
}

// ======= RESPONSIVE REVIEWS =======
window.addEventListener('resize', () => {
  currentReview = 0;
  updateReviews();
});

console.log('%c🍗 البيك - موقع رسمي', 'color: #C8102E; font-size: 20px; font-weight: bold;');
console.log('%cتم تطوير الموقع بأعلى معايير الجودة', 'color: #FFB800; font-size: 14px;');
