'use strict';

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const mmClose = document.querySelector('.mm-close button');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

mmClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-menu nav a').forEach(a => a.addEventListener('click', closeMenu));

// ===== SEARCH TABS =====
document.querySelectorAll('.stab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.querySelector('.scroll-top');
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('ar-SA');
  }, 16);
}

const countersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.number[data-target]').forEach(el => countersObserver.observe(el));

// ===== FADE IN ANIMATION =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ===== PROPERTY FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.property-card').forEach(card => {
      if (filter === 'all' || card.dataset.type === filter) {
        card.style.display = '';
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ===== FAVORITES =====
document.querySelectorAll('.pc-fav').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('liked');
    btn.textContent = btn.classList.contains('liked') ? '❤️' : '🤍';
  });
});

// ===== CATEGORIES =====
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
});

// ===== TESTIMONIALS SLIDER =====
const track = document.querySelector('.testimonials-track');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slidesToShow = window.innerWidth > 768 ? 3 : 1;
const totalSlides = cards.length;

function goToSlide(index) {
  if (index < 0) index = totalSlides - slidesToShow;
  if (index > totalSlides - slidesToShow) index = 0;
  currentSlide = index;

  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(${currentSlide * cardWidth}px)`;

  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

document.querySelector('.slider-btn.prev').addEventListener('click', () => goToSlide(currentSlide + 1));
document.querySelector('.slider-btn.next').addEventListener('click', () => goToSlide(currentSlide - 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

// Auto-play slider
let sliderAuto = setInterval(() => goToSlide(currentSlide + 1), 5000);
track.parentElement.addEventListener('mouseenter', () => clearInterval(sliderAuto));
track.parentElement.addEventListener('mouseleave', () => {
  sliderAuto = setInterval(() => goToSlide(currentSlide + 1), 5000);
});

window.addEventListener('resize', () => {
  slidesToShow = window.innerWidth > 768 ? 3 : 1;
  goToSlide(0);
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    btn.innerHTML = '✅ تم إرسال رسالتك بنجاح!';
    btn.style.background = 'linear-gradient(135deg, #28a745, #20883a)';

    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = '<span>📨</span> إرسال الرسالة';
      btn.style.background = '';
    }, 3500);
  });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const btn = newsletterForm.querySelector('button');
    if (input.value.trim()) {
      btn.textContent = '✓';
      btn.style.background = '#28a745';
      input.value = '';
      setTimeout(() => {
        btn.textContent = '←';
        btn.style.background = '';
      }, 2500);
    }
  });
}
