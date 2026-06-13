/* ═══════════════════════════════════════════════
   BARSAN ELECTRICAL — Main JavaScript
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     STICKY HEADER ON SCROLL
  ────────────────────────────────────────── */
  const header = document.getElementById('header');
  const topbarH = 40;

  const handleScroll = () => {
    if (window.scrollY > topbarH) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ──────────────────────────────────────────
     HAMBURGER MENU
  ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger icon
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ──────────────────────────────────────────
     ACTIVE NAV LINK ON SCROLL
  ────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  };

  /* ──────────────────────────────────────────
     SMOOTH SCROLL FOR ANCHOR LINKS
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────
     INTERSECTION OBSERVER — REVEAL ANIMATIONS
  ────────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  /* ──────────────────────────────────────────
     COUNTER ANIMATION (hero stats)
  ────────────────────────────────────────── */
  const animateValue = (el, start, end, duration) => {
    const startTime = performance.now();
    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + (end - start) * eased) + '+';
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target.querySelector('.hero-stat-num');
        if (numEl && numEl.textContent.includes('100')) {
          animateValue(numEl, 0, 100, 1500);
        }
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ──────────────────────────────────────────
     FORM SUBMISSION HANDLER
  ────────────────────────────────────────── */
  window.handleFormSubmit = (e) => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = document.getElementById('quoteForm');
    const success = document.getElementById('formSuccess');

    // Animate button
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate async submission
    setTimeout(() => {
      form.style.display = 'none';
      success.style.display = 'flex';
      success.style.animation = 'fadeIn 0.5s ease';
    }, 1200);
  };

  /* ──────────────────────────────────────────
     SERVICE CARD HOVER RIPPLE EFFECT
  ────────────────────────────────────────── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--hover-bg', 'rgba(30, 79, 194, 0.04)');
    });
  });

  /* ──────────────────────────────────────────
     TOPBAR HIDE ON SCROLL DOWN, SHOW ON UP
  ────────────────────────────────────────── */
  let lastScrollY = window.scrollY;
  const topbar = document.querySelector('.topbar');
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 200 && currentScrollY > lastScrollY) {
      topbar.style.transform = 'translateY(-100%)';
      topbar.style.transition = 'transform 0.3s ease';
    } else {
      topbar.style.transform = 'translateY(0)';
    }
    lastScrollY = currentScrollY;
  }, { passive: true });

  /* ──────────────────────────────────────────
     MOBILE: Close nav on outside click
  ────────────────────────────────────────── */
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  /* ──────────────────────────────────────────
     FORM INPUT ANIMATION
  ────────────────────────────────────────── */
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.form-group').querySelector('label').style.color = 'var(--blue)';
    });
    input.addEventListener('blur', () => {
      input.closest('.form-group').querySelector('label').style.color = '';
    });
  });

  /* ──────────────────────────────────────────
     INITIAL TRIGGER
  ────────────────────────────────────────── */
  handleScroll();

});

/* ──────────────────────────────────────────
   CSS KEYFRAME (injected for form success)
────────────────────────────────────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.96); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------
     REVIEWS CAROUSEL (Infinite Scroll)
  ------------------------------------------ */
  const reviewsGrid = document.querySelector('.reviews-grid');
  if (reviewsGrid) {
    // Change to carousel container
    reviewsGrid.classList.remove('reviews-grid');
    reviewsGrid.classList.add('reviews-carousel');

    // Wrap children in a track
    const track = document.createElement('div');
    track.classList.add('reviews-track');
    
    // Move all existing cards into the track
    while (reviewsGrid.firstChild) {
      track.appendChild(reviewsGrid.firstChild);
    }
    
    // Duplicate cards for infinite loop
    const cards = Array.from(track.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    
    reviewsGrid.appendChild(track);
  }
});
