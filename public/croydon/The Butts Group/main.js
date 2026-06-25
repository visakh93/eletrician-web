/* ═══════════════════════════════════════════════════════
   THE BUTTS GROUP — Luxury Interactions
   Premium, smooth, cinematic JS behaviour
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     HEADER — Scroll & Transparency Transition
  ────────────────────────────────────────── */
  const header  = document.getElementById('header');
  const SCROLL_THRESHOLD = 60;

  const onScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial run

  /* ──────────────────────────────────────────
     HAMBURGER / MOBILE NAV
  ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    animateHamburger(isOpen);
  });

  // Close nav on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => closeNav());
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (nav.classList.contains('mobile-open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      closeNav();
    }
  });

  function closeNav() {
    nav.classList.remove('mobile-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    animateHamburger(false);
  }

  function animateHamburger(isOpen) {
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  }

  /* ──────────────────────────────────────────
     ACTIVE NAV LINK ON SCROLL
  ────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id], .contact[id], .footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  /* ──────────────────────────────────────────
     SMOOTH SCROLL
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ──────────────────────────────────────────
     REVEAL ANIMATIONS (Intersection Observer)
  ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ──────────────────────────────────────────
     TESTIMONIAL CAROUSEL
  ────────────────────────────────────────── */
  const slides    = document.querySelectorAll('.testimonial-slide');
  const dotsWrap  = document.getElementById('testimonialDots');
  const prevBtn   = document.getElementById('prevTestimonial');
  const nextBtn   = document.getElementById('nextTestimonial');
  let current     = 0;
  let autoTimer   = null;

  if (slides.length > 0 && dotsWrap) {
    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      slides[current].classList.remove('active');
      dotsWrap.querySelectorAll('.testimonial-dot')[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dotsWrap.querySelectorAll('.testimonial-dot')[current].classList.add('active');
    }

    prevBtn?.addEventListener('click', () => { clearInterval(autoTimer); goTo(current - 1); startAuto(); });
    nextBtn?.addEventListener('click', () => { clearInterval(autoTimer); goTo(current + 1); startAuto(); });

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 6000);
    }
    startAuto();
  }

  /* ──────────────────────────────────────────
     FAQ ACCORDION
  ────────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ──────────────────────────────────────────
     CONTACT FORM
  ────────────────────────────────────────── */
  window.handleFormSubmit = (e) => {
    e.preventDefault();
    const btn      = document.getElementById('submitBtn');
    const form     = document.getElementById('contactForm');
    const success  = document.getElementById('formSuccess');

    // Loading state
    btn.disabled          = true;
    btn.style.opacity     = '0.65';
    btn.innerHTML         = 'Sending&hellip;';

    // Simulate async
    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('visible');
    }, 1400);
  };

  /* ──────────────────────────────────────────
     FORM FIELD FOCUS LABELS
  ────────────────────────────────────────── */
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
      const label = input.closest('.form-group')?.querySelector('label');
      if (label) label.style.color = 'var(--gold)';
    });
    input.addEventListener('blur', () => {
      const label = input.closest('.form-group')?.querySelector('label');
      if (label) label.style.color = '';
    });
  });

  /* ──────────────────────────────────────────
     HERO PARALLAX (subtle, tasteful)
  ────────────────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const rate = scrolled * 0.25;
          heroBg.style.transform = `scale(1) translateY(${rate}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────
     HEADER: Hide topbar area on deep scroll
  ────────────────────────────────────────── */
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    // intentionally empty — header stays fixed
    lastScrollY = window.scrollY;
  }, { passive: true });

});

/* ──────────────────────────────────────────
   CSS ANIMATION: Form success fadeIn
────────────────────────────────────────── */
const _injectStyle = document.createElement('style');
_injectStyle.textContent = `
  @keyframes successFadeIn {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to   { opacity: 1; transform: scale(1)   translateY(0); }
  }
  .form-success.visible {
    animation: successFadeIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  .testimonial-slide {
    animation: none;
  }
  .testimonial-slide.active {
    animation: testimonialIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
  }
  @keyframes testimonialIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(_injectStyle);
