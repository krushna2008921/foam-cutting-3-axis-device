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
  initThreeSimulator();
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
  return Array.from(document.querySelectorAll('#galleryGrid .gallery-item'))
    .filter(item => item.style.display !== 'none')
    .map(item => ({
      src: item.querySelector('img')?.src,
      caption: item.querySelector('h4')?.textContent.trim() || 'Project image',
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

/* ====================================================================
   8. PHOTO-REFERENCED THREE.JS PROTOTYPE SIMULATOR
   ==================================================================== */
const simComponentDetails = {
  base: {
    name: 'MDF Baseboard', status: 'Visible in prototype photo', function: 'Supports the photographed mechanism and electronics.',
    material: 'MDF / wood-fibre board, identified by appearance.',
    description: 'The model uses a plain rectangular board close to the photo proportions; exact dimensions and board thickness were not supplied.'
  },
  rackX: {
    name: 'Horizontal Printed Rack', status: 'Visible in prototype photo', function: 'Represents the horizontal toothed member in the photographed assembly.',
    material: 'White printed plastic; filament is unverified.',
    description: 'Shown as part of the simulated moving XY assembly. Actual engagement, travel and mounting details require measurement.'
  },
  rackY: {
    name: 'Perpendicular Printed Rack', status: 'Visible in prototype photo', function: 'Represents the rack arranged perpendicular to the horizontal member.',
    material: 'White printed plastic; filament is unverified.',
    description: 'The model depicts the orthogonal arrangement seen in the photo; axis mapping and complete travel are not confirmed.'
  },
  pinion: {
    name: 'Pinion Gear', status: 'Illustrative geometry', function: 'Illustrates how a pinion could engage the visible rack teeth.',
    material: 'Illustrative printed-plastic appearance.',
    description: 'The actual pinion profile and its engagement are obscured in the available photo, so this geometry is not a verified part model.'
  },
  motor: {
    name: '28BYJ-48 Stepper Motor', status: 'Visible motor label', function: 'Provides rotational drive in the photographed rack assembly.',
    material: 'Blue motor housing, printed label and output shaft.',
    description: 'Two small motors are visible; one label reads 28BYJ-48 5VDC. Their wiring and motion performance are not established.'
  },
  mount: {
    name: 'Printed Motor / Rail Mount', status: 'Visible in prototype photo', function: 'Supports the motor and adjoining printed rack components.',
    material: 'White printed plastic; exact material is unknown.',
    description: 'The simplified model represents the visible white supports without claiming exact dimensions or fastener details.'
  },
  bow: {
    name: 'Cutting-Wire Support', status: 'Visible in prototype photo', function: 'Holds the two visible ends of the thin wire.',
    material: 'White printed plastic; exact material is unknown.',
    description: 'The bow follows the visible support silhouette at a simplified scale. The wire tension and support stiffness have not been tested.'
  },
  wire: {
    name: 'Cutting Wire', status: 'Wire visible; heating unverified', function: 'Represents the thin wire spanning the support ends.',
    material: 'Wire material is not identified.',
    description: 'It is drawn unpowered and does not glow. Heating, electrical connections and cutting behavior are not confirmed.'
  },
  controller: {
    name: 'Controller Board', status: 'Board visible; model unverified', function: 'Represents the blue controller board shown beside the shield.',
    material: 'Printed circuit board and electronic components.',
    description: 'The photographed board is not clearly identified as an Arduino Nano. This model does not assert a board model or pin assignment.'
  },
  shield: {
    name: 'CNC Shield', status: 'Board label visible', function: 'Represents the red board marked “CNC SHIELD”.',
    material: 'Printed circuit board and installed modules.',
    description: 'Its wiring, compatibility and pin mapping are not verified from the photo.'
  },
  drivers: {
    name: 'Plug-in Driver Modules', status: 'Modules visible; model unverified', function: 'Represents the modules fitted to the CNC shield.',
    material: 'Circuit modules with small heatsinks.',
    description: 'The exact driver type cannot be confirmed; they are not labelled as A4988 in this model.'
  },
  power: {
    name: 'Battery / Power Arrangement', status: 'Battery pack visible; ratings unknown', function: 'Represents the wrapped battery pack and adjacent board.',
    material: 'Visible cells, wrap and circuit board; chemistry is unknown.',
    description: 'Voltage, capacity, protection and wiring are not specified or inferred.'
  },
};

let simScene;
let simCamera;
let simRenderer;
let simXStage;
let simYCarriage;
let simAnimationFrame = 0;
let simMotionToken = 0;
let simDemoTimeout = 0;

function showSimComponent(componentId) {
  const details = simComponentDetails[componentId];
  if (!details) return;

  document.getElementById('componentName').textContent = details.name;
  document.getElementById('componentStatus').textContent = details.status;
  document.getElementById('componentFunction').textContent = details.function;
  document.getElementById('componentMaterial').textContent = details.material;
  document.getElementById('componentDescription').textContent = details.description;
  document.querySelectorAll('[data-component-id]').forEach(button => {
    const selected = button.dataset.componentId === componentId;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function initThreeSimulator() {
  const container = document.getElementById('threeContainer');
  if (!container) return;
  if (typeof THREE === 'undefined') {
    console.error('Three.js did not load; the prototype model cannot be rendered.');
    container.textContent = '3D preview unavailable. Reload the page to try again.';
    return;
  }

  simScene = new THREE.Scene();
  simCamera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 1000);
  try {
    simRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  } catch (error) {
    console.error('WebGL could not initialize the prototype preview.', error);
    container.textContent = '3D preview unavailable in this browser.';
    return;
  }
  simRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  simRenderer.shadowMap.enabled = true;
  simRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
  simRenderer.outputEncoding = THREE.sRGBEncoding;
  simRenderer.domElement.setAttribute('aria-hidden', 'true');
  simRenderer.domElement.setAttribute('aria-label', 'Interactive photo-referenced model. Use the component buttons below to inspect parts.');
  simRenderer.domElement.style.touchAction = 'none';
  container.replaceChildren(simRenderer.domElement);

  const mat = {
    mdf: new THREE.MeshStandardMaterial({ color: 0x9c7955, roughness: 0.94 }),
    white: new THREE.MeshStandardMaterial({ color: 0xe2e6e2, roughness: 0.76 }),
    whiteShadow: new THREE.MeshStandardMaterial({ color: 0xbfc8c5, roughness: 0.82 }),
    blueMotor: new THREE.MeshStandardMaterial({ color: 0x287da3, roughness: 0.72 }),
    motorFace: new THREE.MeshStandardMaterial({ color: 0xcdd4d1, roughness: 0.74 }),
    pinion: new THREE.MeshStandardMaterial({ color: 0xb9c2bf, roughness: 0.78 }),
    shield: new THREE.MeshStandardMaterial({ color: 0xa82b37, roughness: 0.82 }),
    controller: new THREE.MeshStandardMaterial({ color: 0x174d83, roughness: 0.8 }),
    powerBoard: new THREE.MeshStandardMaterial({ color: 0x187d68, roughness: 0.82 }),
    driver: new THREE.MeshStandardMaterial({ color: 0x26323b, roughness: 0.72 }),
    heatsink: new THREE.MeshStandardMaterial({ color: 0x9ea9b0, metalness: 0.48, roughness: 0.46 }),
    battery: new THREE.MeshStandardMaterial({ color: 0xb8a236, metalness: 0.18, roughness: 0.7 }),
    tape: new THREE.MeshStandardMaterial({ color: 0x9e3436, roughness: 0.82 }),
    wire: new THREE.MeshStandardMaterial({ color: 0x343b3e, roughness: 0.7 }),
    redWire: new THREE.MeshStandardMaterial({ color: 0xb4453e, roughness: 0.75 }),
    blueWire: new THREE.MeshStandardMaterial({ color: 0x3b78a0, roughness: 0.75 }),
    yellowWire: new THREE.MeshStandardMaterial({ color: 0xc3a947, roughness: 0.75 }),
    floorLight: new THREE.MeshStandardMaterial({ color: 0xc8d1dc, roughness: 1 })
  };
  const interactiveParts = [];

  function addPart(parent, geometry, material, position, componentId, name) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position[0], position[1], position[2]);
    mesh.name = name || simComponentDetails[componentId]?.name || componentId;
    mesh.userData.componentId = componentId;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    if (componentId) interactiveParts.push(mesh);
    return mesh;
  }

  function addTube(parent, points, radius, material, componentId, name) {
    const curve = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(point[0], point[1], point[2])));
    return addPart(parent, new THREE.TubeGeometry(curve, Math.max(16, points.length * 8), radius, 6, false), material, [0, 0, 0], componentId, name);
  }

  function createRack(parent, length, depth, position, rotationY, componentId) {
    const rack = new THREE.Group();
    rack.position.set(position[0], position[1], position[2]);
    rack.rotation.y = rotationY || 0;
    parent.add(rack);
    addPart(rack, new THREE.BoxGeometry(length, 5, depth), mat.white, [0, 0, 0], componentId);
    const pitch = 5.2;
    const teeth = Math.floor(length / pitch);
    for (let index = 0; index < teeth; index++) {
      const x = (index - (teeth - 1) / 2) * pitch;
      addPart(rack, new THREE.ConeGeometry(1.65, 2.4, 4), mat.white, [x, 3.35, 0], componentId);
    }
    return rack;
  }

  function createPinion(parent, position) {
    const gear = new THREE.Group();
    gear.position.set(position[0], position[1], position[2]);
    parent.add(gear);
    addPart(gear, new THREE.CylinderGeometry(4.4, 4.4, 2.6, 14), mat.pinion, [0, 0, 0], 'pinion');
    for (let tooth = 0; tooth < 12; tooth++) {
      const angle = tooth * Math.PI / 6;
      const gearTooth = addPart(gear, new THREE.BoxGeometry(1.9, 2.1, 2.4), mat.pinion,
        [Math.cos(angle) * 4.2, 0, Math.sin(angle) * 4.2], 'pinion');
      gearTooth.rotation.y = -angle;
    }
    return gear;
  }

  function createMotor(parent, position) {
    const [x, y, z] = position;
    addPart(parent, new THREE.BoxGeometry(24, 2.2, 21), mat.whiteShadow, [x, y + 1, z], 'mount');
    addPart(parent, new THREE.BoxGeometry(3, 8, 19), mat.white, [x - 10, y + 5.5, z], 'mount');
    addPart(parent, new THREE.BoxGeometry(3, 8, 19), mat.white, [x + 10, y + 5.5, z], 'mount');
    addPart(parent, new THREE.CylinderGeometry(9.2, 9.2, 13, 24), mat.blueMotor, [x, y + 13, z], 'motor');
    addPart(parent, new THREE.CylinderGeometry(8.7, 8.7, 1.3, 24), mat.motorFace, [x, y + 20.1, z], 'motor');
    addPart(parent, new THREE.CylinderGeometry(2.4, 2.4, 1.5, 16), mat.whiteShadow, [x, y + 21.3, z], 'motor');
    addPart(parent, new THREE.CylinderGeometry(1.1, 1.1, 4.5, 12), mat.heatsink, [x, y + 3.5, z], 'motor');
    createPinion(parent, [x, y + 5.2, z]);
  }

  const ambient = new THREE.HemisphereLight(0xffffff, 0x6a7280, 0.82);
  simScene.add(ambient);
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.05);
  keyLight.position.set(-150, 260, 180);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.left = -190;
  keyLight.shadow.camera.right = 190;
  keyLight.shadow.camera.top = 160;
  keyLight.shadow.camera.bottom = -160;
  keyLight.shadow.bias = -0.0004;
  simScene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0x92b9e8, 0.24);
  fillLight.position.set(180, 110, -160);
  simScene.add(fillLight);

  const floor = addPart(simScene, new THREE.PlaneGeometry(460, 340), mat.floorLight, [0, -4.7, 0], null, 'Presentation surface');
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  const base = addPart(simScene, new THREE.BoxGeometry(300, 8, 205), mat.mdf, [0, 0, 0], 'base', 'MDF baseboard');
  base.receiveShadow = true;
  for (let grain = 0; grain < 13; grain++) {
    const z = -94 + grain * 15.5;
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-145, 4.03, z),
      new THREE.Vector3(-78, 4.03, z + 1.1),
      new THREE.Vector3(8, 4.03, z - 0.7),
      new THREE.Vector3(72, 4.03, z + 0.6),
      new THREE.Vector3(145, 4.03, z)
    ]);
    simScene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x7d654b, transparent: true, opacity: 0.12 })));
  }

  createRack(simScene, 132, 11, [25, 8, -54], 0, 'rackX');
  simXStage = new THREE.Group();
  simXStage.position.x = 25;
  simScene.add(simXStage);
  createRack(simXStage, 104, 11, [40, 8, -1], Math.PI / 2, 'rackY');

  addPart(simXStage, new THREE.BoxGeometry(23, 6, 18), mat.whiteShadow, [0, 11, -54], 'mount');
  createMotor(simScene, [-25, 7, -54]);
  addPart(simXStage, new THREE.BoxGeometry(20, 6, 18), mat.whiteShadow, [40, 11, -48], 'mount');
  createMotor(simXStage, [40, 7, -48]);

  simYCarriage = new THREE.Group();
  simYCarriage.position.set(0, 0, 0);
  simXStage.add(simYCarriage);
  addPart(simYCarriage, new THREE.BoxGeometry(17, 7, 18), mat.white, [40, 13, 0], 'mount');
  addPart(simYCarriage, new THREE.BoxGeometry(23, 4, 21), mat.whiteShadow, [40, 9, 0], 'mount');

  const bowCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(26, 12, 25), new THREE.Vector3(26, 46, 25), new THREE.Vector3(28, 65, 25),
    new THREE.Vector3(34, 73, 25), new THREE.Vector3(46, 73, 25), new THREE.Vector3(52, 65, 25),
    new THREE.Vector3(54, 46, 25), new THREE.Vector3(54, 12, 25)
  ]);
  addPart(simYCarriage, new THREE.TubeGeometry(bowCurve, 36, 3.3, 8, false), mat.white, [0, 0, 0], 'bow');
  addPart(simYCarriage, new THREE.CylinderGeometry(1.1, 1.1, 28, 8), mat.wire, [40, 12, 25], 'wire').rotation.z = Math.PI / 2;
  addPart(simYCarriage, new THREE.BoxGeometry(5, 5, 6), mat.whiteShadow, [26, 12, 25], 'bow');
  addPart(simYCarriage, new THREE.BoxGeometry(5, 5, 6), mat.whiteShadow, [54, 12, 25], 'bow');

  addPart(simScene, new THREE.BoxGeometry(48, 3, 35), mat.shield, [-108, 8, -53], 'shield');
  addPart(simScene, new THREE.BoxGeometry(42, 3, 29), mat.controller, [-108, 8, -8], 'controller');
  addPart(simScene, new THREE.BoxGeometry(7, 4, 4), mat.heatsink, [-92, 12, -54], 'drivers');
  addPart(simScene, new THREE.BoxGeometry(7, 4, 4), mat.heatsink, [-108, 12, -54], 'drivers');
  addPart(simScene, new THREE.BoxGeometry(7, 4, 4), mat.heatsink, [-124, 12, -54], 'drivers');
  addPart(simScene, new THREE.BoxGeometry(10, 5, 5), mat.driver, [-92, 12, -46], 'drivers');
  addPart(simScene, new THREE.BoxGeometry(10, 5, 5), mat.driver, [-108, 12, -46], 'drivers');
  addPart(simScene, new THREE.BoxGeometry(10, 5, 5), mat.driver, [-124, 12, -46], 'drivers');
  addPart(simScene, new THREE.BoxGeometry(8, 4, 5), mat.heatsink, [-88, 8, -8], 'controller');

  const batteryGroup = new THREE.Group();
  simScene.add(batteryGroup);
  for (let cell = 0; cell < 3; cell++) {
    const battery = addPart(batteryGroup, new THREE.CylinderGeometry(5, 5, 43, 16), mat.battery,
      [-113, 10, 43 + cell * 9.5], 'power', 'Visible battery cell');
    battery.rotation.z = Math.PI / 2;
  }
  addPart(batteryGroup, new THREE.BoxGeometry(45, 8, 25), mat.tape, [-113, 17, 50], 'power', 'Battery wrap');
  addPart(simScene, new THREE.BoxGeometry(34, 3, 24), mat.powerBoard, [-108, 8, 22], 'power');

  addTube(simScene, [[-85, 7, -49], [-68, 7, -59], [-45, 7, -61], [-27, 8, -54]], 0.75, mat.redWire, 'controller');
  addTube(simScene, [[-86, 7, -44], [-66, 7, -55], [-44, 7, -60], [-27, 8, -54]], 0.65, mat.blueWire, 'controller');
  addTube(simScene, [[-86, 7, -39], [-62, 7, -50], [-42, 7, -57], [-27, 8, -54]], 0.55, mat.yellowWire, 'controller');
  addTube(simScene, [[-112, 8, 10], [-126, 8, 18], [-124, 8, 28], [-113, 8, 35]], 0.85, mat.redWire, 'power');

  const cameraTarget = new THREE.Vector3(0, 20, 0);
  let cameraTheta = 0.78;
  let cameraPhi = 0.54;
  let cameraRadius = 365;
  const minCameraRadius = 230;
  const maxCameraRadius = 610;
  const cameraPresets = {
    front: { theta: 0, phi: 0.28, radius: 390 },
    side: { theta: Math.PI / 2, phi: 0.3, radius: 390 },
    top: { theta: 0.02, phi: 1.48, radius: 405 },
    isometric: { theta: 0.78, phi: 0.54, radius: 365 }
  };

  function updateCamera() {
    simCamera.position.set(
      cameraTarget.x + cameraRadius * Math.sin(cameraTheta) * Math.cos(cameraPhi),
      cameraTarget.y + cameraRadius * Math.sin(cameraPhi),
      cameraTarget.z + cameraRadius * Math.cos(cameraTheta) * Math.cos(cameraPhi)
    );
    simCamera.lookAt(cameraTarget);
  }

  function setCameraView(name) {
    const preset = cameraPresets[name];
    if (!preset) return;
    cameraTheta = preset.theta;
    cameraPhi = preset.phi;
    cameraRadius = preset.radius;
    cameraTarget.set(0, 20, 0);
    updateCamera();
    document.querySelectorAll('[data-camera-view]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.cameraView === name));
    });
  }
  setCameraView('isometric');

  const canvas = simRenderer.domElement;
  const activePointers = new Map();
  const raycaster = new THREE.Raycaster();
  const pointerPosition = new THREE.Vector2();
  let dragMode = 'orbit';
  let pointerStart = null;
  let pointerMoved = false;
  let pinchDistance = 0;
  let pinchCenter = null;

  function panCamera(deltaX, deltaY) {
    const scale = cameraRadius / Math.max(canvas.clientHeight, 1) * 1.25;
    cameraTarget.x -= deltaX * scale;
    cameraTarget.z += deltaY * scale;
    updateCamera();
  }

  function pointerDown(event) {
    canvas.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    pointerStart = { x: event.clientX, y: event.clientY };
    pointerMoved = false;
    if (activePointers.size > 1) {
      dragMode = 'multi';
      const points = Array.from(activePointers.values());
      pinchDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      pinchCenter = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
    } else {
      dragMode = event.button === 2 || event.shiftKey ? 'pan' : 'orbit';
    }
  }

  function pointerMove(event) {
    if (!activePointers.has(event.pointerId)) return;
    const previous = activePointers.get(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const deltaX = event.clientX - previous.x;
    const deltaY = event.clientY - previous.y;
    if (Math.abs(event.clientX - pointerStart.x) + Math.abs(event.clientY - pointerStart.y) > 5) pointerMoved = true;

    if (activePointers.size > 1) {
      const points = Array.from(activePointers.values());
      const center = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      if (pinchDistance) cameraRadius = THREE.MathUtils.clamp(cameraRadius + (pinchDistance - distance) * 0.55, minCameraRadius, maxCameraRadius);
      if (pinchCenter) panCamera(center.x - pinchCenter.x, center.y - pinchCenter.y);
      pinchDistance = distance;
      pinchCenter = center;
      updateCamera();
    } else if (dragMode === 'pan') {
      panCamera(deltaX, deltaY);
    } else {
      cameraTheta -= deltaX * 0.008;
      cameraPhi = THREE.MathUtils.clamp(cameraPhi + deltaY * 0.008, 0.08, 1.5);
      updateCamera();
    }
  }

  function inspectAt(event) {
    const rect = canvas.getBoundingClientRect();
    pointerPosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerPosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerPosition, simCamera);
    const intersection = raycaster.intersectObjects(interactiveParts, false)[0];
    if (intersection) showSimComponent(intersection.object.userData.componentId);
  }

  function pointerUp(event) {
    const wasSinglePointer = activePointers.size === 1 && dragMode !== 'multi';
    if (event.type === 'pointerup' && wasSinglePointer && !pointerMoved && event.button !== 2) inspectAt(event);
    activePointers.delete(event.pointerId);
    if (!activePointers.size) {
      pointerStart = null;
      pinchDistance = 0;
      pinchCenter = null;
    }
  }

  canvas.addEventListener('pointerdown', pointerDown);
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerup', pointerUp);
  canvas.addEventListener('pointercancel', pointerUp);
  canvas.addEventListener('contextmenu', event => event.preventDefault());
  canvas.addEventListener('wheel', event => {
    event.preventDefault();
    cameraRadius = THREE.MathUtils.clamp(cameraRadius + event.deltaY * 0.32, minCameraRadius, maxCameraRadius);
    updateCamera();
  }, { passive: false });

  document.querySelectorAll('[data-camera-view]').forEach(button => {
    button.addEventListener('click', () => setCameraView(button.dataset.cameraView));
  });
  document.getElementById('resetCameraBtn').addEventListener('click', () => setCameraView('isometric'));
  document.querySelectorAll('[data-camera-pan]').forEach(button => {
    button.addEventListener('click', () => {
      const direction = button.dataset.cameraPan;
      const amount = 24;
      if (direction === 'left') panCamera(-amount, 0);
      if (direction === 'right') panCamera(amount, 0);
      if (direction === 'up') panCamera(0, -amount);
      if (direction === 'down') panCamera(0, amount);
    });
  });
  document.querySelectorAll('[data-component-id]').forEach(button => {
    button.addEventListener('click', () => showSimComponent(button.dataset.componentId));
    button.setAttribute('aria-pressed', 'false');
  });

  const xSlider = document.getElementById('xSlider');
  const ySlider = document.getElementById('ySlider');
  const speedSlider = document.getElementById('speedSlider');
  const xValue = document.getElementById('xValText');
  const yValue = document.getElementById('yValText');
  const speedValue = document.getElementById('speedValue');
  const positionReadout = document.getElementById('simPositionReadout');
  const motionStatus = document.getElementById('simMotionStatus');

  function labelAxis(value, negative, positive) {
    const offset = Math.round(Number(value) - 50);
    if (Math.abs(offset) < 2) return 'CENTER';
    return `${offset < 0 ? negative : positive} ${Math.abs(offset) * 2}%`;
  }

  function updateAssemblyFromControls() {
    const x = Number(xSlider.value);
    const y = Number(ySlider.value);
    simXStage.position.x = 25 + ((x - 50) / 50) * 18;
    simYCarriage.position.z = ((y - 50) / 50) * 20;
    xValue.textContent = labelAxis(x, 'LEFT', 'RIGHT');
    yValue.textContent = labelAxis(y, 'BACK', 'FORWARD');
    positionReadout.textContent = `X: ${labelAxis(x, 'LEFT', 'RIGHT')} · Y: ${labelAxis(y, 'BACK', 'FORWARD')}`;
  }

  function setMotionStatus(message) {
    motionStatus.textContent = message;
  }

  function cancelCurrentMotion(updateStatus) {
    simMotionToken++;
    if (simAnimationFrame) cancelAnimationFrame(simAnimationFrame);
    simAnimationFrame = 0;
    if (simDemoTimeout) clearTimeout(simDemoTimeout);
    simDemoTimeout = 0;
    if (updateStatus) setMotionStatus('STOPPED · MODEL ONLY');
  }

  function animateTo(targetX, targetY, duration, onComplete) {
    if (simAnimationFrame) cancelAnimationFrame(simAnimationFrame);
    const token = ++simMotionToken;
    const startX = Number(xSlider.value);
    const startY = Number(ySlider.value);
    const startTime = performance.now();
    setMotionStatus('MOVING · SIMULATION ONLY');

    function frame(currentTime) {
      if (token !== simMotionToken) return;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 0.5 - Math.cos(progress * Math.PI) / 2;
      xSlider.value = String(startX + (targetX - startX) * eased);
      ySlider.value = String(startY + (targetY - startY) * eased);
      updateAssemblyFromControls();
      if (progress < 1) {
        simAnimationFrame = requestAnimationFrame(frame);
      } else {
        simAnimationFrame = 0;
        if (onComplete) onComplete();
        else setMotionStatus('XY DEMO READY · NOT HARDWARE CONTROL');
      }
    }
    simAnimationFrame = requestAnimationFrame(frame);
  }

  function setManualPosition() {
    cancelCurrentMotion(false);
    updateAssemblyFromControls();
    setMotionStatus('MANUAL POSITION · SIMULATION ONLY');
  }

  xSlider.addEventListener('input', setManualPosition);
  ySlider.addEventListener('input', setManualPosition);
  speedSlider.addEventListener('input', () => {
    speedValue.textContent = `${speedSlider.value} / 10`;
  });

  document.querySelectorAll('[data-move-axis]').forEach(button => {
    button.addEventListener('click', () => {
      cancelCurrentMotion(false);
      const step = Number(speedSlider.value) * 2;
      const targetX = Number(xSlider.value) + (button.dataset.moveAxis === 'x' ? Number(button.dataset.moveDirection) * step : 0);
      const targetY = Number(ySlider.value) + (button.dataset.moveAxis === 'y' ? Number(button.dataset.moveDirection) * step : 0);
      animateTo(THREE.MathUtils.clamp(targetX, 0, 100), THREE.MathUtils.clamp(targetY, 0, 100), 1000 / Number(speedSlider.value));
    });
  });

  document.getElementById('homeXYBtn').addEventListener('click', () => {
    cancelCurrentMotion(false);
    animateTo(50, 50, 520);
  });
  document.getElementById('stopMotionBtn').addEventListener('click', () => cancelCurrentMotion(true));
  document.getElementById('runXYDemoBtn').addEventListener('click', () => {
    cancelCurrentMotion(false);
    const path = [[22, 32], [78, 32], [78, 68], [22, 68], [50, 50]];
    let index = 0;
    setMotionStatus('XY PATH DEMO · SIMULATION ONLY');
    const nextPoint = () => {
      if (index >= path.length) {
        setMotionStatus('XY DEMO READY · NOT HARDWARE CONTROL');
        return;
      }
      const [x, y] = path[index++];
      animateTo(x, y, 850 / Number(speedSlider.value), () => {
        simDemoTimeout = window.setTimeout(nextPoint, 100);
      });
    };
    nextPoint();
  });
  updateAssemblyFromControls();

  function updateSimulationTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const clearColor = dark ? 0x070c1e : 0xe9f0f7;
    simScene.background = new THREE.Color(clearColor);
    simRenderer.setClearColor(clearColor, 1);
    mat.floorLight.color.setHex(dark ? 0x111b2b : 0xc8d1dc);
    keyLight.intensity = dark ? 1.15 : 0.95;
    ambient.intensity = dark ? 0.78 : 0.95;
  }
  updateSimulationTheme();
  window.addEventListener('foampalettechange', updateSimulationTheme);

  function resizeRenderer() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    simCamera.aspect = width / height;
    simCamera.updateProjectionMatrix();
    simRenderer.setSize(width, height);
  }
  window.addEventListener('resize', resizeRenderer);
  if ('ResizeObserver' in window) new ResizeObserver(resizeRenderer).observe(container);

  function render() {
    simRenderer.render(simScene, simCamera);
    requestAnimationFrame(render);
  }
  render();
}
