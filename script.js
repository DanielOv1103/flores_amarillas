/**
 * ============================================================================
 * CONFIGURACIÓN PERSONALIZABLE (EDITA ESTOS VALORES FÁCILMENTE)
 * ============================================================================
 */
const CONFIG = {
  // Datos del destinatario y textos principales
  recipientName: "Mi Amor",          // Nombre o apodo de la persona especial
  mainTitle: "FLORES AMARILLAS",        // Título enorme central
  preTitle: "Hoy florece para ti",      // Frase previa elegante
  dedication: "Para recordarte lo increíble que eres y cómo iluminas mi vida cada día, tal como un girasol busca la luz del sol. 🌻✨",

  // Configuración de la Carta Romántica y Marco de Foto
  letter: {
    heading: "Mi amor por ti florece cada día",
    // Nombre del archivo de foto subido en la misma carpeta (o URL web)
    photoUrl: "foto.jpg",
    photoCaption: "Tú y Yo ❤️",
    // Párrafos románticos de la carta
    paragraphs: [
      "Dicen que las flores amarillas representan la alegría, la luz incondicional y las promesas de un amor que jamás se marchita. Cada vez que te veo sonreír, entiendo exactamente por qué existen.",
      "Eres esa calidez que ilumina hasta los días más nublados, la persona con la que quiero compartir cada atardecer y te amo, te ame y te amaré por siempre.",
      "Gracias por llenar mi mundo de colores y hacer brillar con el color café de tus bellos ojos que tanto me encantan, y por ser la persona más increíble que jamás haya conocido. Este jardín florece hoy y siempre por ti."
    ],
    signature: "Con todo mi amor,",
    sender: "Tu pequeño 💛"
  },

  // Configuración de Audio (Usa el archivo audio.mp3 de la misma carpeta)
  audio: {
    autoPlay: true,                      // Reproducir música automáticamente al cargar la página
    customAudioUrl: "audio.mp3",         // Archivo de audio en la misma carpeta
    loop: true                           // Repetir la melodía en bucle continuo
  },

  // Parámetros visuales del girasol gigante
  sunflower: {
    outerPetals: 28,                    // Cantidad de pétalos en capa exterior
    midPetals: 24,                      // Cantidad de pétalos en capa intermedia
    innerPetals: 20                     // Cantidad de pétalos en capa interna
  },

  // Partículas y efectos de fondo
  particles: {
    floatingPetalsCount: 28,            // Número de pétalos flotantes en pantalla
    starsCount: 75,                     // Cantidad de estrellas titilantes
    goldenDustCount: 40                 // Luciérnagas / polen dorado brillante
  },

  // Tiempos de la animación botánica (en milisegundos)
  timing: {
    seedDropDuration: 2500,             // Duración de la caída de la semilla
    growthDelay: 2400,                  // Momento en que brota el tallo
    bloomingDelay: 4200,                // Momento en que abren las flores
    textRevealDelay: 5600               // Momento en que aparecen los textos
  }
};

/**
 * ============================================================================
 * ELEMENTOS DEL DOM
 * ============================================================================
 */
const elements = {
  preTitle: document.getElementById('preTitle'),
  mainTitle: document.getElementById('mainTitle'),
  recipientName: document.getElementById('recipientName'),
  dedicationText: document.getElementById('dedicationText'),
  textContainer: document.getElementById('textContainer'),
  seedContainer: document.getElementById('seedContainer'),
  gardenGrowth: document.getElementById('gardenGrowth'),
  soilGlow: document.querySelector('.soil-glow'),
  sunAura: document.querySelector('.sun-aura'),
  sunflowerOuter: document.getElementById('sunflowerOuterPetals'),
  sunflowerMid: document.getElementById('sunflowerMidPetals'),
  sunflowerInner: document.getElementById('sunflowerInnerPetals'),
  sunflowerHead: document.querySelector('.sunflower-head'),
  sunflowerCenter: document.querySelector('.sunflower-center'),
  replantBtn: document.getElementById('replantBtn'),
  musicBtn: document.getElementById('musicBtn'),
  musicIcon: document.getElementById('musicIcon'),
  canvas: document.getElementById('particles-canvas'),
  bgAudio: document.getElementById('bgAudio'),

  // Elementos de la Carta Romántica y Foto
  openLetterBtn: document.getElementById('openLetterBtn'),
  letterModal: document.getElementById('letterModal'),
  closeLetterBtn: document.getElementById('closeLetterBtn'),
  letterHeading: document.getElementById('letterHeading'),
  letterPhoto: document.getElementById('letterPhoto'),
  photoCaption: document.getElementById('photoCaption'),
  letterParagraphs: document.getElementById('letterParagraphs'),
  letterSignature: document.getElementById('letterSignature'),
  letterSender: document.getElementById('letterSender')
};

const ctx = elements.canvas.getContext('2d');

/**
 * ============================================================================
 * INICIALIZACIÓN DE TEXTOS Y CARTA ROMÁNTICA
 * ============================================================================
 */
function applyConfigTexts() {
  if (elements.preTitle) elements.preTitle.textContent = CONFIG.preTitle;
  if (elements.mainTitle) elements.mainTitle.textContent = CONFIG.mainTitle;
  if (elements.recipientName) elements.recipientName.textContent = CONFIG.recipientName;
  if (elements.dedicationText) elements.dedicationText.textContent = CONFIG.dedication;

  // Llenar carta romántica
  populateLetterContent();
}

function populateLetterContent() {
  if (elements.letterHeading) elements.letterHeading.textContent = CONFIG.letter.heading;
  if (elements.photoCaption) elements.photoCaption.textContent = CONFIG.letter.photoCaption;
  if (elements.letterSignature) elements.letterSignature.textContent = CONFIG.letter.signature;
  if (elements.letterSender) elements.letterSender.textContent = CONFIG.letter.sender;

  // Resolver foto automáticamente (busca foto.jpg, foto.png, etc. o muestra imagen romántica de muestra)
  resolveAndLoadPhoto();

  if (elements.letterParagraphs && Array.isArray(CONFIG.letter.paragraphs)) {
    elements.letterParagraphs.innerHTML = '';
    CONFIG.letter.paragraphs.forEach(text => {
      const p = document.createElement('p');
      p.className = 'letter-paragraph';
      p.textContent = text;
      elements.letterParagraphs.appendChild(p);
    });
  }
}

// Carga inteligente de la foto: prueba la ruta configurada o extensiones comunes en la carpeta
function resolveAndLoadPhoto() {
  const photoEl = elements.letterPhoto;
  if (!photoEl) return;

  const candidateList = [
    CONFIG.letter.photoUrl,
    "foto.jpg",
    "foto.png",
    "foto.jpeg",
    "photo.jpg",
    "photo.png",
    "imagen.jpg"
  ].filter(Boolean);

  let currentIdx = 0;

  function tryNext() {
    if (currentIdx >= candidateList.length) {
      // Imagen de muestra romántica en caso de que aún no haya subido el archivo
      photoEl.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop";
      photoEl.alt = CONFIG.letter.photoCaption || "Foto especial";
      return;
    }

    const testUrl = candidateList[currentIdx++];
    const img = new Image();
    img.onload = () => {
      photoEl.src = testUrl;
      photoEl.alt = CONFIG.letter.photoCaption || "Foto especial";
      console.log("Foto cargada con éxito desde:", testUrl);
    };
    img.onerror = () => {
      tryNext();
    };
    img.src = testUrl;
  }

  tryNext();
}

// Genera los pétalos del girasol gigante con distribución radial matemática perfecta
function buildSunflowerPetals() {
  function generateLayer(container, count, angleOffset = 0) {
    if (!container) return;
    container.innerHTML = '';
    const step = 360 / count;
    for (let i = 0; i < count; i++) {
      const angle = (i * step) + angleOffset;
      const petal = document.createElement('div');
      petal.className = 'sf-petal';
      petal.style.transform = `rotate(${angle}deg)`;
      container.appendChild(petal);
    }
  }

  generateLayer(elements.sunflowerOuter, CONFIG.sunflower.outerPetals, 0);
  generateLayer(elements.sunflowerMid, CONFIG.sunflower.midPetals, (360 / CONFIG.sunflower.midPetals) / 2);
  generateLayer(elements.sunflowerInner, CONFIG.sunflower.innerPetals, 0);
}

/**
 * ============================================================================
 * CONTROLADOR DE LA SECUENCIA BOTÁNICA (SECUENCIA DE ANIMACIÓN)
 * ============================================================================
 */
let animationTimeouts = [];

function clearAllAnimationTimeouts() {
  animationTimeouts.forEach(t => clearTimeout(t));
  animationTimeouts = [];
}

function startPlantingSequence() {
  clearAllAnimationTimeouts();

  // Resetear estados visuales
  if (elements.textContainer) elements.textContainer.classList.remove('show-text');
  if (elements.gardenGrowth) elements.gardenGrowth.classList.remove('growing', 'blooming', 'flourish');
  if (elements.soilGlow) elements.soilGlow.classList.remove('active');
  if (elements.sunAura) elements.sunAura.classList.remove('show-aura');
  document.querySelectorAll('.wf-item, .wildflower').forEach(wf => wf.classList.remove('bloom'));

  if (elements.seedContainer) {
    elements.seedContainer.classList.remove('planting');
    void elements.seedContainer.offsetWidth; // Forzar reflow para reiniciar animación CSS
    // 1. Iniciar caída de la semilla
    elements.seedContainer.classList.add('planting');
  }

  // 2. La semilla toca tierra: resplandor en el suelo e inicio del brote
  animationTimeouts.push(setTimeout(() => {
    if (elements.soilGlow) elements.soilGlow.classList.add('active');
    spawnBurst(window.innerWidth / 2, window.innerHeight * 0.78, 30, true);
    
    // Sonido sutil al enraizar
    if (audioManager.isPlaying) {
      audioManager.playNote(261.63, 0.4); // C4
    }
  }, CONFIG.timing.seedDropDuration - 400));

  // 3. El tallo crece hacia el cielo
  animationTimeouts.push(setTimeout(() => {
    if (elements.gardenGrowth) elements.gardenGrowth.classList.add('growing');
  }, CONFIG.timing.growthDelay));

  // 4. Eclosión y florecimiento del girasol gigante, tulipanes y rosas
  animationTimeouts.push(setTimeout(() => {
    if (elements.gardenGrowth) elements.gardenGrowth.classList.add('blooming');
    if (elements.sunAura) elements.sunAura.classList.add('show-aura');
    document.querySelectorAll('.wf-item, .wildflower').forEach((wf, idx) => {
      setTimeout(() => wf.classList.add('bloom'), idx * 60);
    });
    spawnPetalShower(35);

    if (audioManager.isPlaying) {
      audioManager.playBloomArpeggio();
    }
  }, CONFIG.timing.bloomingDelay));

  // 5. Revelación de textos elegantes casi al centro
  animationTimeouts.push(setTimeout(() => {
    if (elements.textContainer) elements.textContainer.classList.add('show-text');
    if (elements.gardenGrowth) elements.gardenGrowth.classList.add('flourish');
    spawnBurst(window.innerWidth / 2, window.innerHeight * 0.35, 40);
  }, CONFIG.timing.textRevealDelay));
}

/**
 * ============================================================================
 * SISTEMA DE PARTÍCULAS EN CANVAS (ESTRELLAS, POLEN Y PÉTALOS FLOTANTES)
 * ============================================================================
 */
let width, height;
let particles = [];
let floatingPetals = [];
let stars = [];

function resizeCanvas() {
  width = elements.canvas.width = window.innerWidth;
  height = elements.canvas.height = window.innerHeight;
  initStars();
}

window.addEventListener('resize', resizeCanvas);

// Estrellas titilantes en el cielo nocturno
function initStars() {
  stars = [];
  for (let i = 0; i < CONFIG.particles.starsCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.008
    });
  }
}

// Luciérnagas / polen dorado brillante
function createGoldDust() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.5 + 1.2,
    speedX: (Math.random() - 0.5) * 0.8,
    speedY: -Math.random() * 0.9 - 0.2,
    alpha: Math.random() * 0.8 + 0.2,
    hue: Math.random() * 20 + 42 // Tonos dorados cálidos
  };
}

// Pétalos amarillos flotantes
function createFloatingPetal(customX, customY) {
  return {
    x: customX !== undefined ? customX : Math.random() * width,
    y: customY !== undefined ? customY : -30 - Math.random() * 50,
    size: Math.random() * 12 + 10,
    speedY: Math.random() * 1.6 + 0.8,
    speedX: Math.random() * 1.2 - 0.6,
    swing: Math.random() * 2,
    swingSpeed: Math.random() * 0.03 + 0.015,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 3,
    color: Math.random() > 0.4 ? '#ffd700' : '#ffb703',
    alpha: Math.random() * 0.4 + 0.6
  };
}

// Inicializar colecciones de partículas
function initParticles() {
  particles = [];
  floatingPetals = [];
  
  for (let i = 0; i < CONFIG.particles.goldenDustCount; i++) {
    particles.push(createGoldDust());
  }

  for (let i = 0; i < CONFIG.particles.floatingPetalsCount; i++) {
    const p = createFloatingPetal();
    p.y = Math.random() * height; // Distribuir inicialmente por toda la pantalla
    floatingPetals.push(p);
  }
}

// Animación de ráfaga interactiva al hacer clic o en hitos
function spawnBurst(originX, originY, count = 25, goldenOnly = false) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    particles.push({
      x: originX,
      y: originY,
      size: Math.random() * 3 + 2,
      speedX: Math.cos(angle) * speed,
      speedY: Math.sin(angle) * speed,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.015,
      hue: goldenOnly ? 45 : (Math.random() * 25 + 38),
      isBurst: true
    });
  }
}

function spawnPetalShower(amount = 25) {
  for (let i = 0; i < amount; i++) {
    floatingPetals.push(createFloatingPetal());
  }
}

// Explosión radial de pétalos en 360° y lluvia generada al presionar el Girasol Gigante
function triggerSunflowerPetalExplosion() {
  const target = elements.sunflowerCenter || elements.sunflowerHead || document.querySelector('.sunflower-head');
  const rect = target ? target.getBoundingClientRect() : { left: width / 2, top: height * 0.6, width: 0, height: 0 };
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  // 1. Efecto elástico de rebote en la cabeza del girasol
  const sfHead = elements.sunflowerHead || document.querySelector('.sunflower-head');
  if (sfHead) {
    sfHead.classList.remove('sunflower-pop');
    void sfHead.offsetWidth; // Forzar reflow
    sfHead.classList.add('sunflower-pop');
  }

  // 2. 50 pétalos dorados explotando radialmente en todas las direcciones (360 grados)
  for (let i = 0; i < 50; i++) {
    const angle = (Math.PI * 2 * i) / 50 + (Math.random() - 0.5) * 0.3;
    const speed = Math.random() * 10 + 5.5;
    floatingPetals.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2.8,
      size: Math.random() * 15 + 10,
      gravity: 0.09,
      drag: 0.965,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      swing: Math.random() * Math.PI * 2,
      swingSpeed: Math.random() * 0.03 + 0.015,
      speedX: 0,
      speedY: 0,
      color: Math.random() > 0.35 ? '#ffd700' : (Math.random() > 0.5 ? '#ffb703' : '#ff9500'),
      alpha: 1,
      isExploding: true
    });
  }

  // 3. Estallido radial de chispas y polen dorado
  spawnBurst(originX, originY, 45, true);

  // 4. Lluvia continua de pétalos cayendo desde arriba
  spawnPetalShower(35);

  // 5. Arpegio mágico de campanas de cristal
  const chordNotes = [392.00, 493.88, 587.33, 783.99, 987.77]; // Sol, Si, Re, Sol5, Si5
  chordNotes.forEach((n, idx) => {
    setTimeout(() => audioManager.playNote(n, 1.3), idx * 65);
  });
}

// Bucle de renderizado continuo (60fps)
function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  // 1. Dibujar estrellas
  for (let star of stars) {
    star.alpha += star.twinkleSpeed;
    if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed = -star.twinkleSpeed;

    ctx.fillStyle = `rgba(255, 255, 240, ${star.alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Dibujar polen dorado y chispas
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.isBurst) {
      p.alpha -= p.decay;
      p.speedX *= 0.95;
      p.speedY *= 0.95;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }
    } else {
      if (p.y < -10) p.y = height + 10;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
    }

    ctx.save();
    ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 3. Dibujar pétalos flotantes (con soporte para explosión radial 360° y caída libre)
  for (let i = floatingPetals.length - 1; i >= 0; i--) {
    let petal = floatingPetals[i];

    if (petal.isExploding) {
      petal.vx *= petal.drag;
      petal.vy = petal.vy * petal.drag + petal.gravity;
      petal.x += petal.vx;
      petal.y += petal.vy;
      petal.rotation += petal.rotationSpeed;

      // Al desacelerar la explosión, se convierte suavemente en caída flotante
      if (Math.abs(petal.vx) < 1.0 && petal.vy > 0.6) {
        petal.isExploding = false;
        petal.speedX = petal.vx;
        petal.speedY = Math.random() * 1.6 + 0.8;
      }
    } else {
      petal.swing += petal.swingSpeed;
      petal.x += petal.speedX + Math.sin(petal.swing) * 1.5;
      petal.y += petal.speedY;
      petal.rotation += petal.rotationSpeed;
    }

    if (petal.y > height + 40 || petal.x < -60 || petal.x > width + 60) {
      if (floatingPetals.length > CONFIG.particles.floatingPetalsCount) {
        floatingPetals.splice(i, 1);
        continue;
      } else {
        petal.y = -30;
        petal.x = Math.random() * width;
        petal.isExploding = false;
        petal.speedY = Math.random() * 1.6 + 0.8;
        petal.speedX = Math.random() * 1.2 - 0.6;
      }
    }

    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate((petal.rotation * Math.PI) / 180);
    ctx.scale(Math.cos(petal.swing * 0.8), 1);

    ctx.fillStyle = petal.color;
    ctx.shadowColor = 'rgba(255, 183, 3, 0.55)';
    ctx.shadowBlur = 8;
    ctx.globalAlpha = petal.alpha;

    ctx.beginPath();
    ctx.ellipse(0, 0, petal.size * 0.55, petal.size, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  requestAnimationFrame(animateParticles);
}

/**
 * ============================================================================
 * SINTETIZADOR DE MÚSICA MÁGICA CON WEB AUDIO API
 * (Melodía hermosa sin necesidad de archivos externos)
 * ============================================================================
 */
class MagicAudioPlayer {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.currentNoteIndex = 0;

    // Melodía romántica y mágica (escala pentatónica mayor cálida)
    this.melody = [
      { note: 392.00, dur: 0.6 }, // G4
      { note: 440.00, dur: 0.6 }, // A4
      { note: 493.88, dur: 0.8 }, // B4
      { note: 587.33, dur: 1.2 }, // D5
      { note: 523.25, dur: 0.6 }, // C5
      { note: 493.88, dur: 0.6 }, // B4
      { note: 440.00, dur: 1.0 }, // A4
      { note: 392.00, dur: 1.4 }, // G4
      { note: 659.25, dur: 0.8 }, // E5
      { note: 587.33, dur: 0.8 }, // D5
      { note: 493.88, dur: 0.8 }, // B4
      { note: 440.00, dur: 1.4 }  // A4
    ];
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playNote(frequency, duration = 0.8) {
    this.init();
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      // Envolvente acústica suave tipo glockenspiel / caja de música
      gain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, this.audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  }

  playBloomArpeggio() {
    const notes = [329.63, 392.00, 493.88, 587.33, 659.25, 783.99]; // E4, G4, B4, D5, E5, G5
    notes.forEach((note, idx) => {
      setTimeout(() => this.playNote(note, 1.2), idx * 140);
    });
  }

  startMelodyLoop() {
    this.init();
    this.isPlaying = true;

    const loop = () => {
      if (!this.isPlaying) return;
      const current = this.melody[this.currentNoteIndex];
      this.playNote(current.note, current.dur);

      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
      this.timerId = setTimeout(loop, current.dur * 900);
    };

    loop();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.timerId);
  }
}

/**
 * ============================================================================
 * GESTOR DE AUDIO UNIFICADO (SOPORTA AUTOPLAY, ARCHIVOS Y SINTETIZADOR)
 * ============================================================================
 */
class AudioManager {
  constructor() {
    this.synth = new MagicAudioPlayer();
    this.customAudio = elements.bgAudio;
    this.isPlaying = false;
    this.unlockAttached = false;
  }

  async play() {
    // Caso A: Si se especificó una pista de audio (por defecto audio.mp3 de la misma carpeta)
    if (CONFIG.audio.customAudioUrl && CONFIG.audio.customAudioUrl.trim() !== '') {
      try {
        if (!this.customAudio.src || !this.customAudio.src.endsWith(CONFIG.audio.customAudioUrl)) {
          this.customAudio.src = CONFIG.audio.customAudioUrl;
        }
        this.customAudio.loop = CONFIG.audio.loop !== false;
        this.customAudio.volume = 0.85;

        const playPromise = this.customAudio.play();
        if (playPromise !== undefined) {
          await playPromise;
          this.isPlaying = true;
          this.updateUI(true);
          console.log("Música reproduciéndose:", CONFIG.audio.customAudioUrl);
        }
      } catch (err) {
        console.info("Autoplay restringido por política del navegador. Se activará automáticamente con el primer toque:", err.message);
        this.isPlaying = false;
        this.updateUI(false);
        this.setupOneTimeInteractionUnlock();
      }
    } else {
      // Caso B: Melodía mágica generada proceduralmente
      try {
        this.synth.init();
        if (this.synth.audioCtx && this.synth.audioCtx.state === 'running') {
          this.synth.startMelodyLoop();
          this.isPlaying = true;
          this.updateUI(true);
        } else {
          this.setupOneTimeInteractionUnlock();
        }
      } catch (err) {
        this.setupOneTimeInteractionUnlock();
      }
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.customAudio && !this.customAudio.paused) {
      this.customAudio.pause();
    }
    this.synth.stop();
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (elements.musicIcon) {
      elements.musicIcon.textContent = playing ? '⏸️' : '🎵';
    }
    if (elements.musicBtn) {
      if (playing) {
        elements.musicBtn.classList.add('btn-primary');
        elements.musicBtn.classList.remove('btn-secondary');
      } else {
        elements.musicBtn.classList.add('btn-secondary');
        elements.musicBtn.classList.remove('btn-primary');
      }
    }
  }

  // Desbloqueo inmediato en cuanto el usuario toca cualquier parte de la pantalla
  setupOneTimeInteractionUnlock() {
    if (this.unlockAttached) return;
    this.unlockAttached = true;

    const unlockHandler = () => {
      ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'click', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, unlockHandler, true);
        document.removeEventListener(evt, unlockHandler, true);
      });

      if (CONFIG.audio.autoPlay && !this.isPlaying) {
        this.play();
      }
    };

    ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'click', 'keydown'].forEach(evt => {
      window.addEventListener(evt, unlockHandler, { once: true, capture: true });
      document.addEventListener(evt, unlockHandler, { once: true, capture: true });
    });
  }

  playBloomArpeggio() {
    this.synth.playBloomArpeggio();
  }

  playNote(freq, dur) {
    this.synth.playNote(freq, dur);
  }
}

const audioManager = new AudioManager();

/**
 * ============================================================================
 * CONTROL DEL MODAL DE LA CARTA ROMÁNTICA 💌
 * ============================================================================
 */
function openLetterModal() {
  if (!elements.letterModal) return;
  elements.letterModal.classList.add('open');
  elements.letterModal.setAttribute('aria-hidden', 'false');

  // Chispitas doradas alrededor del botón al abrir
  if (elements.openLetterBtn) {
    const rect = elements.openLetterBtn.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22, true);
  }

  // Si la música aún no ha sonado por bloqueo de navegador, desbloquearla
  if (CONFIG.audio.autoPlay && !audioManager.isPlaying) {
    audioManager.play();
  } else {
    audioManager.playNote(587.33, 0.6); // D5 campana dulce
  }
}

function closeLetterModal() {
  if (!elements.letterModal) return;
  elements.letterModal.classList.remove('open');
  elements.letterModal.setAttribute('aria-hidden', 'true');
}

/**
 * ============================================================================
 * EVENTOS Y LISTENERS DE USUARIO
 * ============================================================================
 */
function setupEventListeners() {
  // Botón: Volver a plantar
  if (elements.replantBtn) {
    elements.replantBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startPlantingSequence();
    });
  }

  // Botón: Música mágica
  if (elements.musicBtn) {
    elements.musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      audioManager.toggle();
    });
  }

  // Clic o Toque directo sobre el Girasol Gigante -> ¡Explosión de pétalos en 360° y lluvia!
  const sfElement = elements.sunflowerHead || document.querySelector('.sunflower-head');
  if (sfElement) {
    sfElement.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      triggerSunflowerPetalExplosion();
    });
  }

  // Botón Flotante: Abrir carta romántica 💌
  if (elements.openLetterBtn) {
    elements.openLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLetterModal();
    });
  }

  // Botón de cerrar la carta (✕)
  if (elements.closeLetterBtn) {
    elements.closeLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLetterModal();
    });
  }

  // Clic en el fondo oscuro del modal para cerrarlo
  if (elements.letterModal) {
    elements.letterModal.addEventListener('click', (e) => {
      if (e.target === elements.letterModal) {
        closeLetterModal();
      }
    });
  }

  // Evitar que hacer clic dentro de la carta cierre el modal o cree chispas no deseadas
  const letterCard = document.querySelector('.letter-modal-card');
  if (letterCard) {
    letterCard.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
  }

  // Tecla ESC para cerrar el modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.letterModal && elements.letterModal.classList.contains('open')) {
      closeLetterModal();
    }
  });

  // Clic en la pantalla para crear chispas y estrellas interactivas
  window.addEventListener('pointerdown', (e) => {
    // Evitar interferir con clics en botones, el modal o el girasol
    if (e.target.closest('button') || e.target.closest('.sunflower-head') || e.target.closest('.letter-modal-card')) {
      return;
    }

    spawnBurst(e.clientX, e.clientY, 16);
    if (audioManager.isPlaying) {
      const pentatonic = [392.00, 440.00, 493.88, 587.33, 659.25];
      const randomNote = pentatonic[Math.floor(Math.random() * pentatonic.length)];
      audioManager.playNote(randomNote, 0.5);
    }
  });
}

/**
 * ============================================================================
 * ARRANQUE DE LA APLICACIÓN
 * ============================================================================
 */
window.addEventListener('DOMContentLoaded', () => {
  applyConfigTexts();
  buildSunflowerPetals();
  resizeCanvas();
  initParticles();
  animateParticles();
  setupEventListeners();

  // Intentar reproducir música automáticamente según CONFIG
  if (CONFIG.audio.autoPlay) {
    audioManager.play();
  }

  // Iniciar la experiencia botánica tras una pequeña pausa inicial de ambientación
  setTimeout(() => {
    startPlantingSequence();
  }, 400);
});
