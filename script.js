/**
 * FOAM CUTTING 3-AXIS DEVICE - INTERACTIVE APPLICATION SCRIPT
 * Sanjivani University | Department of Mechanical Engineering | Makerspace
 * Authors: Krushna Jamdar, Samiksha Kale, Sanket Gujar
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initMobileMenu();
  initHeaderScroll();
  initGalleryFilter();
  initCodeCopy();
  initBackToTop();
  initThreeSimulator();
});

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
    } else {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
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
      });
      btn.classList.add('active', 'bg-cyan-500', 'text-black', 'font-bold');
      btn.classList.remove('bg-slate-900', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });
}

/* ====================================================================
   5. LIGHTBOX MODAL FUNCTIONALITY
   ==================================================================== */
function openLightbox(src, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (!modal || !img || !cap) return;

  img.src = src;
  cap.textContent = caption || 'Foam Cutting 3-Axis Device';
  modal.classList.remove('hidden');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Global modal background click and keyboard escape listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

const lightboxModal = document.getElementById('lightboxModal');
if (lightboxModal) {
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
   8. THREE.JS 3D CNC MACHINE SIMULATOR
   ==================================================================== */
let simScene, simCamera, simRenderer;
let gantryXGroup, gantryZGroup, workbedYGroup;
let hotWireMesh, hotWireLight;
let isWireHeated = true;
let isAnimatingPattern = false;

function initThreeSimulator() {
  const container = document.getElementById('threeContainer');
  if (!container || typeof THREE === 'undefined') return;

  // Scene setup
  simScene = new THREE.Scene();
  simScene.background = new THREE.Color(0x060914);
  simScene.fog = new THREE.FogExp2(0x060914, 0.0035);

  const aspect = container.clientWidth / container.clientHeight;
  simCamera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
  simCamera.position.set(160, 140, 200);
  simCamera.lookAt(0, 20, 0);

  simRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  simRenderer.setSize(container.clientWidth, container.clientHeight);
  simRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  simRenderer.shadowMap.enabled = true;
  container.innerHTML = '';
  container.appendChild(simRenderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  simScene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x00f0ff, 1.2);
  dirLight.position.set(100, 200, 100);
  dirLight.castShadow = true;
  simScene.add(dirLight);

  const blueBackLight = new THREE.DirectionalLight(0x3b82f6, 0.8);
  blueBackLight.position.set(-100, 100, -100);
  simScene.add(blueBackLight);

  // Grid Floor
  const gridHelper = new THREE.GridHelper(260, 26, 0x00f0ff, 0x1e293b);
  gridHelper.position.y = -1;
  simScene.add(gridHelper);

  // Materials
  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.3
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.7,
    roughness: 0.4
  });
  const cyanAccentMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.4,
    roughness: 0.2
  });
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.85,
    metalness: 0.05
  });

  // Base Structural Frame
  const frameGeometry = new THREE.BoxGeometry(200, 10, 160);
  const baseFrame = new THREE.Mesh(frameGeometry, darkMetalMat);
  baseFrame.position.y = 5;
  simScene.add(baseFrame);

  // Dual Z-Axis Vertical Towers (Left & Right)
  const towerGeom = new THREE.BoxGeometry(12, 130, 12);
  const leftTower = new THREE.Mesh(towerGeom, aluminumMat);
  leftTower.position.set(-95, 75, 0);
  simScene.add(leftTower);

  const rightTower = new THREE.Mesh(towerGeom, aluminumMat);
  rightTower.position.set(95, 75, 0);
  simScene.add(rightTower);

  // Stepper Motors atop Z towers
  const motorGeom = new THREE.CylinderGeometry(8, 8, 16, 16);
  const zMotorL = new THREE.Mesh(motorGeom, cyanAccentMat);
  zMotorL.position.set(-95, 145, 0);
  simScene.add(zMotorL);

  const zMotorR = new THREE.Mesh(motorGeom, cyanAccentMat);
  zMotorR.position.set(95, 145, 0);
  simScene.add(zMotorR);

  // Y-Axis Workbed Group (Moves Forward & Backward)
  workbedYGroup = new THREE.Group();
  const bedPlateGeom = new THREE.BoxGeometry(160, 6, 120);
  const bedPlate = new THREE.Mesh(bedPlateGeom, aluminumMat);
  bedPlate.position.y = 13;
  workbedYGroup.add(bedPlate);

  // Foam Workpiece on Workbed
  const foamBlockGeom = new THREE.BoxGeometry(100, 45, 80);
  const foamWorkpiece = new THREE.Mesh(foamBlockGeom, foamMat);
  foamWorkpiece.position.set(0, 38, 0);
  workbedYGroup.add(foamWorkpiece);
  simScene.add(workbedYGroup);

  // Z-Axis Gantry Group (Moves Up & Down)
  gantryZGroup = new THREE.Group();
  gantryZGroup.position.y = 60;

  // Crossbeam Gantry spanning X
  const crossbeamGeom = new THREE.BoxGeometry(200, 10, 14);
  const crossbeam = new THREE.Mesh(crossbeamGeom, aluminumMat);
  gantryZGroup.add(crossbeam);

  // X-Axis Carriage Toolhead Group (Moves Left & Right)
  gantryXGroup = new THREE.Group();
  const carriageGeom = new THREE.BoxGeometry(28, 22, 28);
  const carriage = new THREE.Mesh(carriageGeom, cyanAccentMat);
  gantryXGroup.add(carriage);

  // Heated Wire Bow Suspension Arms
  const bowArmLGeom = new THREE.BoxGeometry(4, 35, 4);
  const bowArmL = new THREE.Mesh(bowArmLGeom, darkMetalMat);
  bowArmL.position.set(-35, -15, 0);
  gantryXGroup.add(bowArmL);

  const bowArmRGeom = new THREE.BoxGeometry(4, 35, 4);
  const bowArmR = new THREE.Mesh(bowArmRGeom, darkMetalMat);
  bowArmR.position.set(35, -15, 0);
  gantryXGroup.add(bowArmR);

  // Heated Ni-Chrome Cutting Wire (Tensioned horizontally)
  const wireGeom = new THREE.CylinderGeometry(0.8, 0.8, 70, 8);
  const wireMat = new THREE.MeshStandardMaterial({
    color: 0xff7700,
    emissive: 0xff3300,
    emissiveIntensity: 1.5,
    roughness: 0.1
  });
  hotWireMesh = new THREE.Mesh(wireGeom, wireMat);
  hotWireMesh.rotation.z = Math.PI / 2;
  hotWireMesh.position.set(0, -32, 0);
  gantryXGroup.add(hotWireMesh);

  // Wire Radiant Light
  hotWireLight = new THREE.PointLight(0xff5500, 1.8, 60);
  hotWireLight.position.set(0, -32, 0);
  gantryXGroup.add(hotWireLight);

  gantryZGroup.add(gantryXGroup);
  simScene.add(gantryZGroup);

  // Simple Orbit Controls using mouse drag
  let isDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;
  let camTheta = 0.8;
  let camPhi = 0.6;
  let camRadius = 260;

  function updateCamera() {
    simCamera.position.x = camRadius * Math.sin(camTheta) * Math.cos(camPhi);
    simCamera.position.y = camRadius * Math.sin(camPhi) + 20;
    simCamera.position.z = camRadius * Math.cos(camTheta) * Math.cos(camPhi);
    simCamera.lookAt(0, 40, 0);
  }
  updateCamera();

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - prevMouseX;
    const deltaY = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    camTheta -= deltaX * 0.008;
    camPhi += deltaY * 0.008;
    camPhi = Math.max(0.1, Math.min(Math.PI / 2.2, camPhi));
    updateCamera();
  });

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    camRadius += e.deltaY * 0.15;
    camRadius = Math.max(120, Math.min(450, camRadius));
    updateCamera();
  }, { passive: false });

  // Touch Support for mobile orbit
  let touchStartDist = 0;
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }
  });

  container.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      camTheta -= deltaX * 0.008;
      camPhi += deltaY * 0.008;
      camPhi = Math.max(0.1, Math.min(Math.PI / 2.2, camPhi));
      updateCamera();
    }
  });

  window.addEventListener('touchend', () => { isDragging = false; });

  // Sliders binding
  const xSlider = document.getElementById('xSlider');
  const ySlider = document.getElementById('ySlider');
  const zSlider = document.getElementById('zSlider');
  const xValText = document.getElementById('xValText');
  const yValText = document.getElementById('yValText');
  const zValText = document.getElementById('zValText');
  const coordReadout = document.getElementById('simCoordReadout');

  function updateMachinePositions() {
    if (!xSlider || !ySlider || !zSlider) return;
    const xVal = parseFloat(xSlider.value);
    const yVal = parseFloat(ySlider.value);
    const zVal = parseFloat(zSlider.value);

    // Map 0-100 values to physical 3D unit offsets
    gantryXGroup.position.x = ((xVal - 50) / 50) * 55;
    workbedYGroup.position.z = ((yVal - 50) / 50) * 35;
    gantryZGroup.position.y = 40 + (zVal / 100) * 80;

    if (xValText) xValText.textContent = `${xVal.toFixed(0)} mm`;
    if (yValText) yValText.textContent = `${yVal.toFixed(0)} mm`;
    if (zValText) zValText.textContent = `${zVal.toFixed(0)} mm`;
    if (coordReadout) {
      coordReadout.textContent = `X: ${xVal.toFixed(1)}mm | Y: ${yVal.toFixed(1)}mm | Z: ${zVal.toFixed(1)}mm`;
    }
  }

  if (xSlider) xSlider.addEventListener('input', updateMachinePositions);
  if (ySlider) ySlider.addEventListener('input', updateMachinePositions);
  if (zSlider) zSlider.addEventListener('input', updateMachinePositions);
  updateMachinePositions();

  // Reset / Home Button
  const resetBtn = document.getElementById('resetSimBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      isAnimatingPattern = false;
      animateSliders(50, 50, 50, 800);
    });
  }

  // Toggle Heat Button
  const toggleHeatBtn = document.getElementById('toggleHeatBtn');
  const heatIndicatorDot = document.getElementById('heatIndicatorDot');
  const heatBtnText = document.getElementById('heatBtnText');
  const simWireStatus = document.getElementById('simWireStatus');

  if (toggleHeatBtn) {
    toggleHeatBtn.addEventListener('click', () => {
      isWireHeated = !isWireHeated;
      if (isWireHeated) {
        hotWireMesh.material.color.setHex(0xff7700);
        hotWireMesh.material.emissive.setHex(0xff3300);
        hotWireMesh.material.emissiveIntensity = 1.5;
        hotWireLight.intensity = 1.8;
        heatIndicatorDot.className = 'w-2 h-2 rounded-full bg-amber-400 animate-pulse';
        heatBtnText.textContent = 'HEAT: ON (215°C)';
        if (simWireStatus) {
          simWireStatus.textContent = 'HEATED (ACTIVE)';
          simWireStatus.className = 'text-amber-400 font-bold';
        }
      } else {
        hotWireMesh.material.color.setHex(0x94a3b8);
        hotWireMesh.material.emissive.setHex(0x000000);
        hotWireMesh.material.emissiveIntensity = 0;
        hotWireLight.intensity = 0;
        heatIndicatorDot.className = 'w-2 h-2 rounded-full bg-slate-500';
        heatBtnText.textContent = 'HEAT: OFF (STANDBY)';
        if (simWireStatus) {
          simWireStatus.textContent = 'COLD (STANDBY)';
          simWireStatus.className = 'text-slate-400 font-bold';
        }
      }
    });
  }

  // Window resize handler for 3D container
  window.addEventListener('resize', () => {
    if (!container || !simRenderer || !simCamera) return;
    simCamera.aspect = container.clientWidth / container.clientHeight;
    simCamera.updateProjectionMatrix();
    simRenderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Render Loop
  function animate() {
    requestAnimationFrame(animate);
    simRenderer.render(simScene, simCamera);
  }
  animate();
}

/* Helper to smoothly interpolate slider coordinates */
function animateSliders(targetX, targetY, targetZ, duration) {
  const xSlider = document.getElementById('xSlider');
  const ySlider = document.getElementById('ySlider');
  const zSlider = document.getElementById('zSlider');
  if (!xSlider || !ySlider || !zSlider) return;

  const startX = parseFloat(xSlider.value);
  const startY = parseFloat(ySlider.value);
  const startZ = parseFloat(zSlider.value);
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

    xSlider.value = startX + (targetX - startX) * ease;
    ySlider.value = startY + (targetY - startY) * ease;
    zSlider.value = startZ + (targetZ - startZ) * ease;
    xSlider.dispatchEvent(new Event('input'));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

/* Automated Cutting Demo Patterns */
window.runSimPattern = function(patternType) {
  isAnimatingPattern = true;
  let waypoints = [];

  if (patternType === 'airfoil') {
    // NACA airfoil contour coordinates
    waypoints = [
      { x: 20, y: 15, z: 25 },
      { x: 35, y: 30, z: 65 },
      { x: 50, y: 55, z: 75 },
      { x: 65, y: 75, z: 55 },
      { x: 80, y: 90, z: 35 },
      { x: 60, y: 70, z: 30 },
      { x: 40, y: 45, z: 28 },
      { x: 20, y: 20, z: 25 }
    ];
  } else if (patternType === 'cube') {
    // Stepped block contour
    waypoints = [
      { x: 20, y: 20, z: 20 },
      { x: 80, y: 20, z: 20 },
      { x: 80, y: 20, z: 70 },
      { x: 50, y: 50, z: 70 },
      { x: 50, y: 80, z: 50 },
      { x: 20, y: 80, z: 50 },
      { x: 20, y: 20, z: 20 }
    ];
  } else if (patternType === 'cylinder') {
    // Elliptical core contour
    waypoints = [
      { x: 30, y: 50, z: 30 },
      { x: 50, y: 75, z: 45 },
      { x: 70, y: 50, z: 65 },
      { x: 50, y: 25, z: 45 },
      { x: 30, y: 50, z: 30 }
    ];
  } else {
    // Sine Wave
    waypoints = [
      { x: 20, y: 20, z: 30 },
      { x: 35, y: 35, z: 75 },
      { x: 50, y: 50, z: 35 },
      { x: 65, y: 65, z: 80 },
      { x: 80, y: 80, z: 40 }
    ];
  }

  let index = 0;
  function executeNextWaypoint() {
    if (!isAnimatingPattern || index >= waypoints.length) {
      isAnimatingPattern = false;
      return;
    }
    const wp = waypoints[index];
    index++;
    animateSliders(wp.x, wp.y, wp.z, 900);
    setTimeout(executeNextWaypoint, 950);
  }
  executeNextWaypoint();
};
