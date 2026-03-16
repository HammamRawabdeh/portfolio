/**
 * script.js — Portfolio Website JavaScript
 * ==========================================
 * Handles:
 *  1. Mobile navigation toggle
 *  2. Active nav link highlighting
 *  3. Scroll-triggered fade-in animations (IntersectionObserver)
 *  4. Scroll progress bar
 *  5. Navbar background on scroll
 */

/* ----------------------------------------------------------
   1. DOM READY WRAPPER
   All code runs after the DOM is fully loaded.
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
     2. MOBILE NAVIGATION TOGGLE
     Toggles the .open class on both the button and
     the nav-links list to show/hide on mobile.
  -------------------------------------------------------- */
  const navToggle  = document.querySelector('.nav-toggle');
  const navLinks   = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');

      // Update aria-expanded for accessibility
      const isOpen = navToggle.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when any link is clicked (mobile UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* --------------------------------------------------------
     3. ACTIVE NAV LINK HIGHLIGHTING
     Compares the current page's filename to each link's href
     and adds the .active class to the matching link.
  -------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });

  /* --------------------------------------------------------
     4. SCROLL-TRIGGERED FADE-IN ANIMATIONS
     Uses IntersectionObserver to add the .visible class
     to .fade-in elements when they enter the viewport.
     This triggers the CSS transition defined in styles.css.
  -------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible (one-time animation)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,    // Trigger when 12% of element is visible
        rootMargin: '0px 0px -40px 0px'  // Slight bottom offset for natural feel
      }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  /* --------------------------------------------------------
     5. SCROLL PROGRESS BAR
     Reads window.scrollY / document scroll height to
     calculate how far down the page the user has scrolled,
     then updates the width of #progress-bar.
  -------------------------------------------------------- */
  const progressBar = document.getElementById('progress-bar');

  if (progressBar) {
    const updateProgress = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${scrollPercent}%`;
    };

    // Use passive listener for performance
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call in case page is already scrolled
  }

  /* --------------------------------------------------------
     6. NAVBAR SCROLL EFFECT
     Adds a subtle shadow to the navbar once user scrolls
     past the top, enhancing depth on scroll.
  -------------------------------------------------------- */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  }

  /* --------------------------------------------------------
     7. HERO ANIMATIONS (index.html only)
     Staggers the entrance of hero child elements on load.
     Uses CSS transitions — JS just triggers them with delay.
  -------------------------------------------------------- */
  const heroContent = document.querySelector('.hero-content');

  if (heroContent) {
    const heroChildren = heroContent.querySelectorAll('.fade-in');
    heroChildren.forEach((el, i) => {
      // Small timeout to ensure CSS transitions are ready
      setTimeout(() => {
        el.classList.add('visible');
      }, 100 + i * 120);
    });
  }

  /* --------------------------------------------------------
     8. SMOOTH EXTERNAL LINK HANDLING
     Adds target="_blank" and rel safety attributes to any
     external link found on the page.
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  /* --------------------------------------------------------
     9. YEAR AUTO-UPDATE IN FOOTER
     Finds any element with class .footer-year and fills it
     with the current year, avoiding manual updates.
  -------------------------------------------------------- */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

}); // end DOMContentLoaded
