/* ===================================
   RHYTHM DANCE ACADEMY — JavaScript
=================================== */

/* ===== LOADER ===== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.style.overflow = 'visible';
    initCounters();
    initParticles();
  }, 2200);
  document.body.style.overflow = 'hidden';
});

/* ===== CUSTOM CURSOR ===== */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursorDot.style.left  = e.clientX + 'px';
    cursorDot.style.top   = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .course-card, .instructor-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursorRing.style.borderColor = 'rgba(168,85,247,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(168,85,247,0.5)';
    });
  });
}

/* ===== NAVBAR ===== */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('mobile-open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('mobile-open');
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ===== SCROLL TO TOP ===== */
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== PARTICLES ===== */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 60; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;
    const colors = ['#a855f7', '#06b6d4', '#ec4899', '#f59e0b'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    Object.assign(particle.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      background: color,
      left: x + '%',
      bottom: '-10px',
      opacity: opacity,
      animation: `particleRise ${duration}s ${delay}s ease-in infinite`
    });

    container.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleRise {
      0%   { transform: translateY(0) scale(1); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 0.3; }
      100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

/* ===== STAT COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString('ar-SA');
    if (current < target) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('ar-SA');
  };
  requestAnimationFrame(update);
}

/* ===== COURSE FILTER ===== */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.filter;
    document.querySelectorAll('.course-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'all 0.4s ease';
      if (match) {
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => card.style.display = 'none', 400);
      }
    });
  });
});

/* ===== SCHEDULE ===== */
const scheduleData = {
  sun: [
    { time: '9:00 ص',  course: 'باليه كلاسيكي',     instructor: 'نورة الرشيدي',  duration: '60 دقيقة', level: 'مبتدئ',  status: 'open' },
    { time: '11:00 ص', course: 'زومبا فيتنس',       instructor: 'هنادي المطيري', duration: '50 دقيقة', level: 'كل المستويات', status: 'few' },
    { time: '2:00 م',  course: 'هيب هوب',           instructor: 'ماجد السهلي',   duration: '75 دقيقة', level: 'متوسط', status: 'open' },
    { time: '5:00 م',  course: 'سالسا لاتينية',     instructor: 'يوسف الحربي',   duration: '90 دقيقة', level: 'متقدم', status: 'full' },
    { time: '7:30 م',  course: 'كونتمبوراري',       instructor: 'لمياء العنزي',  duration: '75 دقيقة', level: 'متوسط', status: 'open' },
  ],
  mon: [
    { time: '9:30 ص',  course: 'سالسا — مستوى 1',   instructor: 'يوسف الحربي',   duration: '90 دقيقة', level: 'مبتدئ',  status: 'open' },
    { time: '12:00 م', course: 'باليه متقدم',         instructor: 'نورة الرشيدي',  duration: '75 دقيقة', level: 'متقدم', status: 'few' },
    { time: '4:00 م',  course: 'تانغو أرجنتيني',     instructor: 'سارة الغامدي',  duration: '60 دقيقة', level: 'متوسط', status: 'open' },
    { time: '6:30 م',  course: 'هيب هوب للأطفال',   instructor: 'ماجد السهلي',   duration: '45 دقيقة', level: 'أطفال', status: 'open' },
  ],
  tue: [
    { time: '10:00 ص', course: 'زومبا صباحية',       instructor: 'هنادي المطيري', duration: '50 دقيقة', level: 'كل المستويات', status: 'open' },
    { time: '1:00 م',  course: 'كونتمبوراري متقدم',  instructor: 'لمياء العنزي',  duration: '90 دقيقة', level: 'متقدم', status: 'few' },
    { time: '5:30 م',  course: 'باليه أساسيات',      instructor: 'نورة الرشيدي',  duration: '60 دقيقة', level: 'مبتدئ',  status: 'open' },
    { time: '8:00 م',  course: 'سالسا زوجي',        instructor: 'يوسف الحربي',   duration: '90 دقيقة', level: 'متوسط', status: 'full' },
  ],
  wed: [
    { time: '9:00 ص',  course: 'جاز دانس',          instructor: 'لمياء العنزي',  duration: '60 دقيقة', level: 'متوسط', status: 'open' },
    { time: '11:30 ص', course: 'بريكينج للمبتدئين', instructor: 'ماجد السهلي',   duration: '75 دقيقة', level: 'مبتدئ',  status: 'open' },
    { time: '3:00 م',  course: 'تانغو مستوى 2',     instructor: 'سارة الغامدي',  duration: '60 دقيقة', level: 'متقدم', status: 'few' },
    { time: '6:00 م',  course: 'زومبا مسائية',      instructor: 'هنادي المطيري', duration: '50 دقيقة', level: 'كل المستويات', status: 'open' },
    { time: '8:30 م',  course: 'هيب هوب متقدم',     instructor: 'ماجد السهلي',   duration: '75 دقيقة', level: 'متقدم', status: 'open' },
  ],
  thu: [
    { time: '10:00 ص', course: 'سالسا — مستوى 3',   instructor: 'يوسف الحربي',   duration: '90 دقيقة', level: 'متقدم', status: 'open' },
    { time: '12:30 م', course: 'باليه للبنات',       instructor: 'نورة الرشيدي',  duration: '60 دقيقة', level: 'كل المستويات', status: 'open' },
    { time: '4:30 م',  course: 'كونتمبوراري حر',    instructor: 'لمياء العنزي',  duration: '75 دقيقة', level: 'متوسط', status: 'few' },
    { time: '7:00 م',  course: 'ليلة السالسا',      instructor: 'يوسف الحربي',   duration: '120 دقيقة', level: 'مفتوح', status: 'few' },
  ]
};

function renderSchedule(day) {
  const grid = document.getElementById('scheduleGrid');
  const items = scheduleData[day] || [];
  const statusText = { open: 'متاح', full: 'مكتمل', few: 'مقاعد قليلة' };

  grid.innerHTML = items.map(item => `
    <div class="schedule-item reveal">
      <div class="sched-time">${item.time}</div>
      <div class="sched-info">
        <div class="sched-course">${item.course}</div>
        <div class="sched-details">
          <i class="fas fa-user"></i> ${item.instructor} &nbsp;|&nbsp;
          <i class="fas fa-clock"></i> ${item.duration} &nbsp;|&nbsp;
          <i class="fas fa-signal"></i> ${item.level}
        </div>
      </div>
      <div class="sched-status ${item.status}">${statusText[item.status]}</div>
    </div>
  `).join('');

  setTimeout(initReveal, 100);
}

document.querySelectorAll('.sched-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.sched-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    renderSchedule(this.dataset.day);
  });
});

renderSchedule('sun');

/* ===== TESTIMONIALS SLIDER ===== */
const slides = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let autoSlideTimer;

slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('slider-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
}

function startAutoSlide() {
  autoSlideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  startAutoSlide();
}

document.getElementById('nextBtn').addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
document.getElementById('prevBtn').addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });

startAutoSlide();

/* ===== PRICING TOGGLE ===== */
const billingToggle = document.getElementById('billingToggle');
if (billingToggle) {
  billingToggle.addEventListener('change', function() {
    const isYearly = this.checked;
    document.querySelectorAll('.monthly-price').forEach(el => el.style.display = isYearly ? 'none' : 'block');
    document.querySelectorAll('.yearly-price').forEach(el => el.style.display = isYearly ? 'block' : 'none');
    document.querySelectorAll('.pricing-toggle span').forEach((el, i) => {
      el.classList.toggle('active', i === (isYearly ? 2 : 0));
    });
  });
}

/* ===== LEVEL BUTTONS ===== */
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ===== FORMS ===== */
const enrollForm  = document.getElementById('enrollForm');
const contactForm = document.getElementById('contactForm');
const modal       = document.getElementById('successModal');
const closeModal  = document.getElementById('closeModal');

function handleFormSubmit(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.original || btn.innerHTML;
    modal.classList.add('active');
    this.reset();
    document.querySelectorAll('.level-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  }, 1800);
}

[enrollForm, contactForm].forEach(form => {
  if (!form) return;
  const btn = form.querySelector('button[type="submit"]');
  if (btn) btn.dataset.original = btn.innerHTML;
  form.addEventListener('submit', handleFormSubmit);
});

closeModal.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

/* ===== NEWSLETTER ===== */
document.querySelector('.newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn   = e.target.querySelector('button');
  btn.innerHTML = '<i class="fas fa-check"></i>';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-arrow-left"></i>';
    btn.style.background = '';
    input.value = '';
  }, 3000);
});

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function addRevealClasses() {
  const selectors = [
    '.course-card', '.instructor-card', '.about-content',
    '.about-visual', '.section-header', '.pricing-card',
    '.contact-info', '.contact-form', '.gallery-item',
    '.exp-item', '.testimonial-card'
  ];
  selectors.forEach((sel, groupIndex) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.1) + 's';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  addRevealClasses();
  initReveal();
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* ===== GALLERY LIGHTBOX ===== */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
    const span = this.querySelector('.gallery-overlay span');
    const title = span ? span.textContent : '';

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed; inset:0; z-index:9000;
      background:rgba(0,0,0,0.92);
      display:flex; align-items:center; justify-content:center;
      animation:fadeIn 0.3s ease;
    `;

    const cloned = this.cloneNode(true);
    cloned.style.cssText = `
      width:min(90vw,700px); height:min(60vh,500px);
      border-radius:20px; cursor:default;
      box-shadow:0 30px 80px rgba(0,0,0,0.6);
    `;
    cloned.querySelector('.gallery-overlay')?.remove();

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
      position:absolute; top:24px; right:24px;
      width:48px; height:48px; border-radius:50%;
      background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
      color:white; font-size:18px; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
    `;

    const label = document.createElement('p');
    label.textContent = title;
    label.style.cssText = 'color:white; font-size:20px; font-weight:700; margin-top:16px; font-family:Cairo,sans-serif;';

    const inner = document.createElement('div');
    inner.style.cssText = 'display:flex; flex-direction:column; align-items:center;';
    inner.appendChild(cloned);
    inner.appendChild(label);

    overlay.appendChild(inner);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const close = () => {
      overlay.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 300);
    };

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); }, { once: true });

    const style = document.createElement('style');
    style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes fadeOut{from{opacity:1}to{opacity:0}}';
    document.head.appendChild(style);
  });
});

/* ===== PARALLAX HERO ===== */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero-content');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.15}px)`;
    hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
  }
});

/* ===== TYPED TEXT EFFECT ===== */
const heroDesc = document.querySelector('.hero-desc');
if (heroDesc) {
  const originalText = heroDesc.innerHTML;
  heroDesc.style.opacity = '0';
  setTimeout(() => {
    heroDesc.style.opacity = '1';
    heroDesc.style.transition = 'opacity 0.5s ease';
  }, 1000);
}

/* ===== EASTER EGG — KONAMI CODE ===== */
let konamiCode = [];
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown', e => {
  konamiCode.push(e.key);
  if (konamiCode.length > 10) konamiCode.shift();
  if (konamiCode.join(',') === konami.join(',')) {
    document.body.style.animation = 'partyMode 0.5s ease infinite alternate';
    const style = document.createElement('style');
    style.textContent = '@keyframes partyMode{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}';
    document.head.appendChild(style);
    alert('🎉 وجدت السر! انضم لحفلتنا الخاصة بخصم 50%!');
  }
});

console.log('%c🎵 Rhythm Dance Academy', 'color:#a855f7;font-size:24px;font-weight:900');
console.log('%cأكاديمية الرقص الأولى في العالم العربي', 'color:#06b6d4;font-size:14px');
