/* ═══════════════════════════════════════════════════
   TP POULTRY AND FEEDS — JavaScript
   Features: Language Toggle, Scroll Reveal, Navbar,
             Particles, WhatsApp, Form Handling
═══════════════════════════════════════════════════ */

// ── STATE ───────────────────────────────────────────
let currentLang = 'ta'; // Default: Tamil

// ── DOM READY ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initScrollReveal();
  initNavbar();
  initParticles();
  initBackToTop();
  initSmoothLinks();
});

/* ═════════════════════════════════════════════════
   LANGUAGE TOGGLE
═════════════════════════════════════════════════ */
function toggleLanguage() {
  currentLang = currentLang === 'ta' ? 'en' : 'ta';
  applyLanguage(currentLang);
}

function initLanguage() {
  applyLanguage(currentLang);
}

function applyLanguage(lang) {
  // Update label
  const label = document.getElementById('langLabel');
  if (label) label.textContent = lang === 'ta' ? 'EN' : 'தமிழ்';

  // Update all elements with data-ta / data-en
  document.querySelectorAll('[data-ta], [data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text !== null) {
      // Preserve inner structure if it has child elements
      if (el.children.length === 0) {
        el.textContent = text;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-ta-placeholder], [data-en-placeholder]').forEach(el => {
    const key = `data-${lang}-placeholder`;
    const ph = el.getAttribute(key);
    if (ph) el.placeholder = ph;
  });

  // Update select options
  document.querySelectorAll('select option').forEach(opt => {
    const text = opt.getAttribute('data-' + lang);
    if (text) opt.textContent = text;
  });

  // Update html lang attribute
  document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';

  // Smooth flash transition
  document.body.style.transition = 'opacity .15s ease';
  document.body.style.opacity   = '0.85';
  setTimeout(() => { document.body.style.opacity = '1'; }, 160);
}

/* ═════════════════════════════════════════════════
   SCROLL REVEAL
═════════════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Staggered delay based on siblings
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.querySelectorAll('.reveal'))
          : [];
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═════════════════════════════════════════════════
   NAVBAR
═════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* ═════════════════════════════════════════════════
   HERO PARTICLES
═════════════════════════════════════════════════ */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['rgba(82,183,136,0.5)', 'rgba(244,162,38,0.4)', 'rgba(255,255,255,0.3)', 'rgba(208,240,192,0.4)'];
  const emojis = ['🌿', '🌾', '🍃', '✨', '🌱'];
  const count  = 18;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'particle';

    const useEmoji = Math.random() > 0.55;

    if (useEmoji) {
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${-5 + Math.random() * 20}%;
        font-size: ${10 + Math.random() * 16}px;
        animation-duration: ${8 + Math.random() * 14}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: 0;
      `;
    } else {
      const size = 4 + Math.random() * 10;
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: ${-5 + Math.random() * 20}%;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${10 + Math.random() * 14}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: 0;
      `;
    }
    container.appendChild(el);
  }
}

/* ═════════════════════════════════════════════════
   BACK TO TOP
═════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });
}

/* ═════════════════════════════════════════════════
   SMOOTH LINKS (offset for sticky nav)
═════════════════════════════════════════════════ */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ═════════════════════════════════════════════════
   CONTACT FORM
═════════════════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();

  const name    = document.getElementById('fname')?.value?.trim();
  const phone   = document.getElementById('fphone')?.value?.trim();
  const product = document.getElementById('fproduct')?.value || '';

  if (!name || !phone) return;

  // Build WhatsApp message and open
  const msg = `Hello, I want to order from TP Poultry and Feeds.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}${product ? '%0AProduct: ' + encodeURIComponent(product) : ''}`;
  window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');

  // Show success message
  const success = document.getElementById('formSuccess');
  if (success) {
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  }

  // Reset form
  e.target.reset();
}

/* ═════════════════════════════════════════════════
   SERVICE CARD HOVER SOUND (optional tactile feel)
═════════════════════════════════════════════════ */
document.querySelectorAll('.service-card, .product-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all .3s cubic-bezier(.34,1.56,.64,1)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'all .35s cubic-bezier(.4,0,.2,1)';
  });
});

/* ═════════════════════════════════════════════════
   ACTIVE NAV LINK HIGHLIGHT ON SCROLL
═════════════════════════════════════════════════ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(a => {
          a.style.fontWeight = a.getAttribute('href') === '#' + id ? '800' : '600';
          a.style.color = '';
        });
      }
    });
  }, { passive: true });
})();
