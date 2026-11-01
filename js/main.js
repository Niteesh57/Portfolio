/**
 * main.js — Modern Minimalist Portfolio
 * Lightweight, fast, vanilla JS.
 */

/* ============================================================
   1. PRELOADER
   ============================================================ */
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
    }, 250);
  }
});

/* ============================================================
   DOMContentLoaded wrapper
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     2. STICKY HEADER
     ---------------------------------------------------------- */
  const header = document.querySelector('.header');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ----------------------------------------------------------
     3. MOBILE MENU TOGGLE
     ---------------------------------------------------------- */
  const hamburger = document.querySelector('.hamburger');
  const navMenu   = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ----------------------------------------------------------
     4. ACTIVE NAV LINK ON SCROLL
     ---------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ----------------------------------------------------------
     5. TYPEWRITER EFFECT
     ---------------------------------------------------------- */
  const typewriterEl = document.querySelector('.typewriter-text');

  if (typewriterEl) {
    const roles = [
      'AI Engineer',
      'Agentic Systems Builder',
      'Cloud-Native Developer',
      'Backend Engineer',
    ];

    let roleIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 30 : 65;

      if (!isDeleting && charIndex === currentRole.length) {
        delay      = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        delay      = 350;
      }

      setTimeout(type, delay);
    }

    type();
  }

  /* ----------------------------------------------------------
     6. SCROLL REVEAL
     ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     7. STATS COUNTER ANIMATION
     ---------------------------------------------------------- */
  const counterEls = document.querySelectorAll('.counter');

  if (counterEls.length) {
    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateCounter(el) {
      const target   = parseFloat(el.getAttribute('data-target')) || 0;
      const duration = 1200;
      const start    = performance.now();

      function update(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value    = target * easeOut(progress);

        el.textContent = Number.isInteger(target)
          ? Math.floor(value)
          : value.toFixed(1);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
      }

      requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ----------------------------------------------------------
     8. PROJECT FILTER
     ---------------------------------------------------------- */
  const filterBtns      = document.querySelectorAll('.filter-btn');
  const allProjectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && allProjectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || btn.getAttribute('data-category') || 'all';

        allProjectCards.forEach(card => {
          const cardCategories = (card.getAttribute('data-category') || '').split(/\s+/);
          const isMatch = filter === 'all' || cardCategories.includes(filter);

          if (!isMatch) {
            card.classList.remove('card-visible');
            card.classList.add('card-hidden');
            setTimeout(() => {
              if (card.classList.contains('card-hidden')) {
                card.style.display = 'none';
              }
            }, 200);
          } else {
            card.style.display = 'block';
            void card.offsetWidth;
            card.classList.remove('card-hidden');
            card.classList.add('card-visible');
          }
        });
      });
    });

    allProjectCards.forEach(card => {
      card.style.display = 'block';
      card.classList.add('card-visible');
    });
  }

  /* ----------------------------------------------------------
     9. SKILL TABS
     ---------------------------------------------------------- */
  const skillTabs     = document.querySelectorAll('.skill-tab');
  const skillContents = document.querySelectorAll('.skill-content');

  if (skillTabs.length && skillContents.length) {
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        skillTabs.forEach(t     => t.classList.remove('active'));
        skillContents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const matchingContent = document.getElementById(target) || document.querySelector(`.skill-content[data-tab="${target}"]`);
        if (matchingContent) matchingContent.classList.add('active');
      });
    });
  }

  /* ----------------------------------------------------------
     10. BACK TO TOP
     ---------------------------------------------------------- */
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
     11. SMOOTH SCROLL FOR ANCHOR LINKS
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset    = 70;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------
     12. FOOTER YEAR
     ---------------------------------------------------------- */
  const footerYear = document.querySelector('#footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

});
