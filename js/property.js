'use strict';

const nav = document.getElementById('prop-nav');
const stickyBar = document.getElementById('sticky-bar');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  nav.classList.toggle('solid', scrolled > 80);
  stickyBar.classList.toggle('show', scrolled > 400);
});

window.addEventListener('load', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) heroBg.classList.add('loaded');
});

window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
  }
});

const galleryImages = [
  'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1400&q=90',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=85',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=85',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
];

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCounter = document.getElementById('lb-counter');
let currentLbIndex = 0;

function openLightbox(index) {
  currentLbIndex = index;
  lbImg.src = galleryImages[index];
  lbCounter.textContent = `${index + 1} / ${galleryImages.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(dir) {
  currentLbIndex = (currentLbIndex + dir + galleryImages.length) % galleryImages.length;
  lbImg.style.opacity = '0';
  setTimeout(() => {
    lbImg.src = galleryImages[currentLbIndex];
    lbImg.style.opacity = '1';
    lbCounter.textContent = `${currentLbIndex + 1} / ${galleryImages.length}`;
  }, 150);
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => lbNav(-1));
document.getElementById('lb-next').addEventListener('click', () => lbNav(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft') lbNav(-1);
});

lbImg.style.transition = 'opacity 0.15s ease';

document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => { entry.target.classList.add('visible'); }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 80;
  revealObserver.observe(el);
});

function animateNum(el) {
  const target = parseFloat(el.dataset.target);
  const isFloat = el.dataset.float === 'true';
  const duration = 2200;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString('ar-SA');
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateNum(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

const form = document.getElementById('propForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit-gold');
    const success = document.querySelector('.form-success');
    btn.innerHTML = '⏳ جارٍ الإرسال...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'block';
    }, 1500);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
  videoPlaceholder.addEventListener('click', () => {
    alert('سيتم إضافة الجولة المرئية قريباً — تواصل معنا لتحديد موعد زيارة شخصية');
  });
}