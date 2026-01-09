// Scroll-Triggered Animations with Intersection Observer
(function() {
  'use strict';

  function showCopiedToast(button, message = 'Email Copied!') {
    const wrapper = button && button.closest ? button.closest('.email-wrapper') : null;
    const msg = wrapper ? wrapper.querySelector('.copied-message') : null;
    if (!msg) return;

    const defaultText = msg.dataset.defaultText || msg.textContent;
    msg.dataset.defaultText = defaultText;

    msg.textContent = message;
    msg.classList.add('show');

    const existingTimer = msg.dataset.toastTimerId ? Number(msg.dataset.toastTimerId) : null;
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timerId = window.setTimeout(() => {
      msg.classList.remove('show');
      if (msg.dataset.defaultText) {
        msg.textContent = msg.dataset.defaultText;
      }
      delete msg.dataset.toastTimerId;
    }, 1200);

    msg.dataset.toastTimerId = String(timerId);
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return fallbackCopyText(text);
  }

  window.copyEmail = function(button, email) {
    copyText(email)
      .then((ok) => {
        if (ok) showCopiedToast(button, 'Email Copied!');
      })
      .catch(() => {
        // Ignore failures (permissions/insecure context). No toast.
      });
  };

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) return;

  // Intersection Observer for scroll-triggered animations
  const ENTER_RATIO = 0.15;
  const EXIT_RATIO = 0.08;

  const observerOptions = {
    threshold: [0, EXIT_RATIO, ENTER_RATIO],
    rootMargin: '0px 0px -100px 0px'
  };

  const exitTimers = new WeakMap();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.dataset.intersectionRatio = String(entry.intersectionRatio ?? 0);

      if (entry.intersectionRatio >= ENTER_RATIO) {
        const existingTimer = exitTimers.get(entry.target);
        if (existingTimer) {
          clearTimeout(existingTimer);
          exitTimers.delete(entry.target);
        }
        entry.target.classList.add('is-visible');
      } else if (entry.intersectionRatio <= EXIT_RATIO) {
        // Debounce exit to avoid flicker/jitter when hovering around the threshold.
        if (exitTimers.has(entry.target)) return;

        const timer = setTimeout(() => {
          exitTimers.delete(entry.target);

          const latestRatio = Number.parseFloat(entry.target.dataset.intersectionRatio || '0');
          if (Number.isFinite(latestRatio) && latestRatio <= EXIT_RATIO) {
            entry.target.classList.remove('is-visible');
          }
        }, 120);

        exitTimers.set(entry.target, timer);
      }
    });
  }, observerOptions);

  // Elements to observe
  const animatedElements = document.querySelectorAll(`
    .hero-card,
    .focus-card,
    .project-card,
    .project-card-large,
    .value-card,
    .experience-card,
    .education-card,
    .honored-item,
    .section-header,
    .about-hero-card
  `);

  animatedElements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });

  // Parallax effect disabled - keeping all images static
  let ticking = false;
  let lastScrollY = window.scrollY;

  function updateParallax() {
    // All parallax disabled to prevent image movement
    ticking = false;
  }

  function requestParallaxTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Parallax listener disabled
  // window.addEventListener('scroll', requestParallaxTick, { passive: true });

  // Smooth reveal for cards in grid
  const cards = document.querySelectorAll('.project-card, .project-card-large, .value-card, .experience-card');
  cards.forEach((card, index) => {
    card.style.setProperty('--animation-order', index);
  });

  // Scroll progress indicator
  function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #4e5cf0, #ff8fb5);
        z-index: 9999;
        transition: width 0.1s ease-out;
        border-radius: 0 3px 3px 0;
      `;
      document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = `${scrolled}%`;
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Add stagger delay to honored items
  const honoredItems = document.querySelectorAll('.honored-item');
  honoredItems.forEach((item, index) => {
    item.style.setProperty('--stagger-delay', `${index * 0.1}s`);
  });

  // Fade in navigation on scroll
  let lastScroll = 0;
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  // Add scroll snap for sections (optional)
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.scrollMarginTop = '100px';
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderStatNumber(element, value, suffix, suffixSup) {
    const normalizedValue = Number.isFinite(value) ? String(value) : String(value ?? '');
    const normalizedSuffix = (suffix ?? '').trim();

    if (!normalizedSuffix) {
      element.textContent = normalizedValue;
      return;
    }

    if (suffixSup) {
      element.innerHTML = `${escapeHtml(normalizedValue)}<sup style="font-size: 0.6em; vertical-align: super;">${escapeHtml(normalizedSuffix)}</sup>`;
      return;
    }

    element.textContent = `${normalizedValue}${normalizedSuffix}`;
  }

  // Animate numbers (for stats)
  function animateNumber(element, target, duration = 1000, suffix = '', suffixSup = false) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        renderStatNumber(element, target, suffix, suffixSup);
        clearInterval(timer);
      } else {
        renderStatNumber(element, Math.floor(current), suffix, suffixSup);
      }
    }, 16);
  }

  // Observe stat numbers
  const statNumbers = document.querySelectorAll('.stat-number, .about-stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const originalText = entry.target.textContent.trim();
        const number = parseFloat(originalText);
        if (!isNaN(number) && number < 100) {
          const suffix = originalText.replace(String(number), '').trim();
          const suffixSup = entry.target.querySelector('sup') !== null;

          entry.target.dataset.animated = 'true';
          renderStatNumber(entry.target, 0, suffix, suffixSup);
          setTimeout(() => {
            animateNumber(entry.target, number, 1000, suffix, suffixSup);
          }, 200);
        }
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => statsObserver.observe(stat));

  // Create scroll down indicator
  function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
      <div class="scroll-indicator-circle">
        <div class="scroll-arrow"></div>
      </div>
    `;
    document.body.appendChild(indicator);
    
    // Click to scroll down or up depending on position
    indicator.addEventListener('click', () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isAtBottom = currentScroll + windowHeight >= documentHeight - 100;
      
      if (isAtBottom) {
        // At bottom - scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // Scroll down to next section
        const sections = document.querySelectorAll('section, .hero-card, .focus-card, .featured, .about-hero-card, .value-cards, .section-header, .projects-hero, .honored-hero');
        
        // Find next section below current scroll position
        let nextSection = null;
        const minScrollDistance = 300; // Minimum pixels to scroll
        
        for (const section of sections) {
          const sectionTop = section.offsetTop;
          // Ensure we scroll at least minScrollDistance pixels
          if (sectionTop > currentScroll + minScrollDistance) {
            nextSection = section;
            break;
          }
        }
        
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // If no next section, scroll by viewport height
          window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
          });
        }
      }
    });
    
    return indicator;
  }

  const scrollIndicator = createScrollIndicator();

  // Show/hide and flip scroll indicator based on scroll position
  function updateScrollIndicator() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if at bottom (within 100px)
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 100;
    
    if (isAtBottom) {
      scrollIndicator.classList.add('at-bottom');
    } else {
      scrollIndicator.classList.remove('at-bottom');
    }
    
    // Only hide when exactly at the very top (less than 50px scrolled)
    if (scrollTop < 50 && !isAtBottom) {
      // Keep visible even at top
      scrollIndicator.classList.remove('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  }

  window.addEventListener('scroll', updateScrollIndicator, { passive: true });
  updateScrollIndicator();

  // Add hover tilt effect to cards
  const tiltCards = document.querySelectorAll('.project-card, .project-card-large, .value-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  console.log('✨ Scroll animations initialized');
})();
