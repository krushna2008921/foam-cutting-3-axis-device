/**
 * FOAM CUTTING 2-AXIS DEVICE - INTERACTIVE APPLICATION SCRIPT
 * Sanjivani University | Department of Mechanical Engineering | Makerspace
 * Authors: Krushna Jamdar, Samiksha Kale, Sanket Gujar, Sujay Jamdar
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initThemeSwitcher();
  initMobileMenu();
  initHeaderScroll();
  initActiveNavigation();
  initGalleryFilter();
  initLazyImages();
  initFirmwarePreview();
  initCodeCopy();
  initBackToTop();
});

function initThemeSwitcher() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const root = document.documentElement;
  const themeStatus = document.getElementById('themeStatus');
  const storageKey = 'foam-cutter-theme';
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let hasSavedPreference = root.dataset.themeSource === 'saved';

  function applyTheme(theme, savePreference) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    themeToggle.setAttribute('aria-label', themeToggle.title);
    themeToggle.querySelector('[data-theme-icon="light"]').toggleAttribute('hidden', theme !== 'light');
    themeToggle.querySelector('[data-theme-icon="dark"]').toggleAttribute('hidden', theme !== 'dark');

    if (themeColor) themeColor.content = theme === 'dark' ? '#070c1e' : '#f5f8fc';
    window.dispatchEvent(new CustomEvent('foampalettechange', { detail: { theme } }));

    if (!savePreference) return;
    hasSavedPreference = true;
    try {
      localStorage.setItem(storageKey, theme);
      root.dataset.themeSource = 'saved';
      if (themeStatus) themeStatus.textContent = `${theme === 'dark' ? 'Dark' : 'Light'} mode enabled.`;
    } catch (error) {
      root.dataset.themeSource = 'session';
      console.warn('Theme changed, but the browser could not save the preference.', error);
      if (themeStatus) themeStatus.textContent = 'Theme changed for this visit only; browser storage is unavailable.';
    }
  }

  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light', false);
  themeToggle.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  const handleSystemThemeChange = event => {
    if (!hasSavedPreference) applyTheme(event.matches ? 'dark' : 'light', false);
  };
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleSystemThemeChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleSystemThemeChange);
  }

  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    hasSavedPreference = event.newValue === 'dark' || event.newValue === 'light';
    root.dataset.themeSource = hasSavedPreference ? 'saved' : 'system';
    applyTheme(hasSavedPreference ? event.newValue : mediaQuery.matches ? 'dark' : 'light', false);
  });
}

function initLazyImages() {
  document.querySelectorAll('img:not([loading])').forEach(image => {
    image.loading = image.fetchPriority === 'high' ? 'eager' : 'lazy';
    image.decoding = 'async';
  });
}

/* ====================================================================
   1. BACKGROUND CYBER GRID CANVAS
   ==================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyberCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particleCount = Math.min(width < 768 ? 25 : 50, 60);
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.8
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
    ctx.lineWidth = 1;

    // Draw particle network
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 130)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ====================================================================
   2. MOBILE NAVIGATION DRAWER
   ==================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      menuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });
}

/* ====================================================================
   3. HEADER SCROLL DETECTION
   ==================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initActiveNavigation() {
  const links = Array.from(document.querySelectorAll('#mainHeader nav a[href^="#"], .mobile-nav-link'));
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter((section, index, list) => section && list.indexOf(section) === index);

  if (!links.length || !sections.length) return;

  function setCurrentSection(sectionId) {
    links.forEach(link => {
      const isCurrent = link.getAttribute('href') === `#${sectionId}`;
      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    const visibleSection = entries
      .filter(entry => entry.isIntersecting)
      .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];
    if (visibleSection) setCurrentSection(visibleSection.target.id);
  }, { rootMargin: '-24% 0px -66% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ====================================================================
   4. GALLERY FILTERING
   ==================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-cyan-500', 'text-black', 'font-bold');
        b.classList.add('bg-slate-900', 'text-slate-300');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active', 'bg-cyan-500', 'text-black', 'font-bold');
      btn.classList.remove('bg-slate-900', 'text-slate-300');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = (item.getAttribute('data-category') || '').split(/\s+/);
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    const caption = item.querySelector('h4')?.textContent.trim() || 'Open project image';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `${caption}, open image preview`);
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });
  });
}

function initFirmwarePreview() {
  const codeBlock = document.getElementById('firmwareCodeBlock');
  if (!codeBlock) return;
  fetch('assets/documents/arduino_foam_cutter_firmware.ino')
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then(source => {
      codeBlock.textContent = source;
    })
    .catch(error => {
      codeBlock.textContent = `Unable to load the firmware source (${error.message}). Use the download link above.`;
    });
}

/* ====================================================================
   5. LIGHTBOX MODAL FUNCTIONALITY
   ==================================================================== */
let lightboxGalleryIndex = -1;
let lightboxPreviousFocus = null;

function getVisibleGalleryImages() {
  return Array.from(document.querySelectorAll('#galleryGrid .gallery-item, #teamWork .team-work-card, #solidworksAssembly .solidworks-assembly-card'))
    .filter(item => item.style.display !== 'none')
    .map(item => ({
      src: item.querySelector('img')?.src,
      caption: item.querySelector('h4, h3, figcaption')?.textContent.trim() || 'Project image',
      alt: item.querySelector('img')?.alt || 'Project image'
    }))
    .filter(item => item.src);
}

function updateLightboxImage(item) {
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!img || !cap || !item) return;
  img.src = item.src;
  img.alt = item.alt;
  cap.textContent = item.caption;
}

function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (!modal || !img || !cap) return;

  lightboxPreviousFocus = document.activeElement;
  img.src = src;
  cap.textContent = caption || 'FOAM CUTTING 2-AXIS DEVICE';
  const gallery = getVisibleGalleryImages();
  const openedSource = new URL(src, document.baseURI).href;
  lightboxGalleryIndex = gallery.findIndex(item => new URL(item.src, document.baseURI).href === openedSource);
  const hasGalleryNavigation = lightboxGalleryIndex >= 0 && gallery.length > 1;
  document.querySelectorAll('.lightbox-nav').forEach(button => {
    button.hidden = !hasGalleryNavigation;
  });
  modal.classList.remove('hidden');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose')?.focus();
}

function navigateLightbox(direction) {
  const gallery = getVisibleGalleryImages();
  if (lightboxGalleryIndex < 0 || gallery.length < 2) return;
  lightboxGalleryIndex = (lightboxGalleryIndex + direction + gallery.length) % gallery.length;
  updateLightboxImage(gallery[lightboxGalleryIndex]);
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  lightboxGalleryIndex = -1;
  if (lightboxPreviousFocus && typeof lightboxPreviousFocus.focus === 'function') {
    lightboxPreviousFocus.focus();
  }
}

document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightboxModal');
  if (!modal || !modal.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

const lightboxModal = document.getElementById('lightboxModal');
if (lightboxModal) {
  document.getElementById('lightboxPrev')?.addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightboxNext')?.addEventListener('click', () => navigateLightbox(1));
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

/* ====================================================================
   6. CODE COPY FUNCTIONALITY
   ==================================================================== */
function initCodeCopy() {
  const copyBtn = document.getElementById('copyCodeBtn');
  const codeBlock = document.getElementById('firmwareCodeBlock');
  const copyText = document.getElementById('copyText');

  if (!copyBtn || !codeBlock) return;

  copyBtn.addEventListener('click', () => {
    const textToCopy = codeBlock.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyText.textContent = 'COPIED!';
      copyBtn.classList.add('text-emerald-400');
      setTimeout(() => {
        copyText.textContent = 'COPY CODE';
        copyBtn.classList.remove('text-emerald-400');
      }, 2000);
    });
  });
}

/* ====================================================================
   7. BACK TO TOP BUTTON
   ==================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
