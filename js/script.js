/**
 * script.js — Portfolio Website JavaScript
 * ==========================================
 * Handles:
 *  1. Mobile navigation toggle
 *  2. Active nav link highlighting
 *  3. Scroll-triggered fade-in animations (IntersectionObserver)
 *  4. Scroll progress bar
 *  5. Navbar shadow on scroll
 *  6. Hero staggered entrance animation
 *  7. External link safety attributes
 *  8. Footer year auto-update
 */

/* ----------------------------------------------------------
   1. DOM READY WRAPPER
   All code runs after the DOM is fully loaded.
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
     2. CACHE SHARED DOM REFERENCES
     Query once and reuse — avoids repeated DOM traversal.
  -------------------------------------------------------- */
  const navToggle  = document.querySelector('.nav-toggle');
  const navLinks   = document.querySelector('.nav-links');
  const navbar     = document.querySelector('.navbar');
  const progressBar = document.getElementById('progress-bar');
  const heroContent = document.querySelector('.hero-content');

  /* --------------------------------------------------------
     3. MOBILE NAVIGATION TOGGLE
     Toggles .open on the button and nav-links list to
     show/hide the menu on mobile.
  -------------------------------------------------------- */
  if (navToggle && navLinks) {

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when any link is clicked (improves mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------
     4. ACTIVE NAV LINK HIGHLIGHTING
     Compares the current page filename to each link's href
     and applies .active to the matching link.
     Strips any query strings or hash fragments for accuracy.
  -------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0] || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop().split('?')[0];
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* --------------------------------------------------------
     5. SCROLL-TRIGGERED FADE-IN ANIMATIONS
     Uses IntersectionObserver for efficient visibility checks.
     Applies .visible to trigger the CSS transition, then
     unobserves to free memory (one-shot animation).
  -------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target); // one-time trigger
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  /* --------------------------------------------------------
     6. SCROLL HANDLERS (progress bar + navbar shadow)
     requestAnimationFrame throttling ensures scroll events
     only trigger one DOM update per animation frame —
     prevents layout thrashing on high-frequency scroll.
  -------------------------------------------------------- */
  let scrollRafId = null;

  const handleScroll = () => {
    // Progress bar
    if (progressBar) {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Navbar depth shadow
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 30px rgba(0, 0, 0, 0.4)'
        : 'none';
    }
  };

  const onScroll = () => {
    if (scrollRafId) return; // skip if a frame is already queued
    scrollRafId = requestAnimationFrame(() => {
      handleScroll();
      scrollRafId = null;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  handleScroll(); // initialise on load in case page is already scrolled

  /* --------------------------------------------------------
     7. HERO ENTRANCE ANIMATION (index.html only)
     Staggers reveal of .fade-in children inside .hero-content.
     A short timeout ensures CSS transitions are ready before
     the .visible class is applied.
  -------------------------------------------------------- */
  if (heroContent) {
    heroContent.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, 100 + i * 120);
    });
  }

  /* --------------------------------------------------------
     8. EXTERNAL LINK SAFETY
     Adds target="_blank" and rel safety attributes to any
     off-site link found on the page, preventing tabnapping.
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  /* --------------------------------------------------------
     9. FOOTER YEAR AUTO-UPDATE
     Populates .footer-year with the current year, so the
     copyright notice never needs a manual annual edit.
  -------------------------------------------------------- */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

}); // end DOMContentLoaded
