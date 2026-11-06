/**
 * MASTER SCRIPT ENTRYPOINT — DEWA FEBRIAN PORTFOLIO
 * Compatible with both local file:/// protocol and http:// web servers.
 */

// ==========================================================================
// 1. MODAL & TOAST COMPONENT LOGIC
// ==========================================================================
const projectData = {
  coffee: {
    title: 'Coffee Shop App',
    category: 'Flutter Mobile App',
    tags: ['Flutter 3.x', 'Firebase Auth & Firestore', 'Provider', 'Stripe API'],
    description: 'A contemporary coffee ordering and loyalty mobile application crafted with smooth micro-interactions, custom cart animations, real-time barista order status, and local push notifications.',
    highlights: [
      'Reactive state management via Provider & ValueNotifiers',
      'Dark neon UI design with customizable coffee roast selectors',
      'Integrated Firebase Firestore for live checkout sync'
    ],
    demoUrl: '#contact-section'
  },
  ecommerce: {
    title: 'E-Commerce App',
    category: 'Shopping & Retail UI',
    tags: ['Flutter', 'REST API', 'GetX Architecture', 'Figma to Code'],
    description: 'A fluid, performance-optimized streetwear e-commerce application featuring interactive 3D product view simulations, category filtering, persistent local wishlist, and one-tap checkout.',
    highlights: [
      'Modular routing and reactive state with GetX controllers',
      'Zero-lag image caching and skeleton loading states',
      'Tested across iOS and Android with 60FPS fluid scroll'
    ],
    demoUrl: '#contact-section'
  },
  finance: {
    title: 'Finance Dashboard',
    category: 'FinTech Analytics',
    tags: ['Flutter Web', 'FL Chart Engine', 'RESTful API', 'Secure Storage'],
    description: 'An enterprise-grade financial analytics dashboard tracking multi-currency crypto wallets, expense categorization, interactive Candlestick and Line charts, and real-time exchange rates.',
    highlights: [
      'Interactive chart zoom, tooltips, and timeframe filters',
      'Encrypted biometric login & encrypted token storage',
      'Light/Dark theme engine with custom color ramps'
    ],
    demoUrl: '#contact-section'
  },
  portfolio: {
    title: 'Futuristic Portfolio Website',
    category: 'Personal Brand & Web UI',
    tags: ['HTML5/CSS3', 'Modern Glassmorphism', 'Canvas 2D', 'Vanilla JS'],
    description: 'A bespoke high-end developer portfolio site featuring cosmic particle fields, glassmorphic HUD panels, SVG synthesized developer artwork, and seamless micro-interactions.',
    highlights: [
      'Zero heavy framework dependencies for ultra-fast LCP & INP',
      '100% responsive 8px grid design system with CSS custom properties',
      'Custom radar scanning animations & particle constellations'
    ],
    demoUrl: '#contact-section'
  }
};

window.openProjectModal = function (projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const content = document.getElementById('modalDynamicContent');
  const backdrop = document.getElementById('projectModalBackdrop');
  if (!content || !backdrop) return;

  content.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
      <span style="font-size:0.75rem; color:#A855F7; text-transform:uppercase; font-weight:700; letter-spacing:1px;">${data.category}</span>
    </div>
    <h3 style="font-family:var(--font-display, sans-serif); font-size:1.6rem; color:#fff; margin-bottom:12px;">${data.title}</h3>
    
    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px;">
      ${data.tags.map(t => `<span style="font-size:0.75rem; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.3); color:#C084FC; padding:4px 10px; border-radius:9999px;">${t}</span>`).join('')}
    </div>

    <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6; margin-bottom:18px;">${data.description}</p>
    
    <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:14px; border-radius:12px; margin-bottom:20px;">
      <h5 style="font-size:0.84rem; color:#fff; font-weight:700; margin-bottom:8px;">Key Features:</h5>
      <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:6px;">
        ${data.highlights.map(h => `<li style="font-size:0.82rem; color:var(--text-secondary); display:flex; align-items:center; gap:8px;"><span style="color:#A855F7;">▸</span> ${h}</li>`).join('')}
      </ul>
    </div>

    <div style="display:flex; gap:12px;">
      <a href="${data.demoUrl}" onclick="closeProjectModal()" class="btn-glow-primary" style="text-decoration:none;">
        <span>Request Demo / Source Code</span>
      </a>
    </div>
  `;

  backdrop.classList.add('open');
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

window.closeProjectModal = function (event) {
  const backdrop = document.getElementById('projectModalBackdrop');
  if (backdrop) backdrop.classList.remove('open');
};

window.showToast = function (message, type) {
  const toast = document.getElementById('toastBox');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = toast ? toast.querySelector('.toast-icon') : null;
  if (!toast || !toastMsg) return;

  // Set tipe (success/error) untuk styling
  toast.classList.remove('toast-error', 'toast-success');
  if (type === 'error') {
    toast.classList.add('toast-error');
    if (toastIcon) {
      toastIcon.setAttribute('data-lucide', 'alert-circle');
    }
  } else {
    toast.classList.add('toast-success');
    if (toastIcon) {
      toastIcon.setAttribute('data-lucide', 'check-circle-2');
    }
  }

  // Re-render icon
  if (window.lucide) window.lucide.createIcons();

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
};




const EMAILJS_PUBLIC_KEY = 'cxgkuXgc6ii07egti';
const EMAILJS_SERVICE_ID = 'service_ub49xn3';
const EMAILJS_TEMPLATE_ID = 'template_gco4mml';

function initEmailJS() {
  if (typeof emailjs === 'undefined' || window.__emailjsInitialized) return;

  emailjs.init(EMAILJS_PUBLIC_KEY);
  window.__emailjsInitialized = true;
}

window.handleFormSubmit = function (e) {
  e.preventDefault();

  // ---------- Ambil elemen ----------
  const form       = document.getElementById('contact-form');
  const nameInput  = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const msgInput   = document.getElementById('userMsg');
  const btn        = form ? form.querySelector('button[type="submit"]') : null;
  const btnSpan    = btn ? btn.querySelector('span') : null;

  if (!form || !nameInput || !emailInput || !msgInput) {
    console.error('Contact form elements not found.');
    return;
  }

  // ---------- Ambil nilai ----------
  const name    = nameInput.value.trim();
  const email   = emailInput.value.trim();
  const message = msgInput.value.trim();

  // ---------- Validasi ----------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    window.showToast('⚠️ Please fill in your name.', 'error');
    nameInput.focus();
    return;
  }
  if (!email) {
    window.showToast('⚠️ Please fill in your email address.', 'error');
    emailInput.focus();
    return;
  }
  if (!emailRegex.test(email)) {
    window.showToast('⚠️ Please enter a valid email address.', 'error');
    emailInput.focus();
    return;
  }
  if (!message) {
    window.showToast('⚠️ Please write your message.', 'error');
    msgInput.focus();
    return;
  }

  // ---------- Loading state ----------
  if (btn) btn.disabled = true;
  if (btnSpan) btnSpan.textContent = 'Mengirim...';

  // ---------- Kirim via EmailJS ----------
  if (typeof emailjs === 'undefined') {
    window.showToast('❌ EmailJS failed to load. Check your internet connection.', 'error');
    if (btn) btn.disabled = false;
    if (btnSpan) btnSpan.textContent = 'Send Message';
    return;
  }

  emailjs
    .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
    .then(function (response) {
      console.log('EmailJS success:', response.status, response.text);
      window.showToast('Message Sent Successfully!', 'success');
      form.reset();
    })
    .catch(function (error) {
      console.error('EmailJS error object:', error);
      console.error('EmailJS error status:', error?.status);
      console.error('EmailJS error text:', error?.text);
      window.showToast('❌ Failed to send message. Please try again.', 'error');
    })
    .finally(function () {
      if (btn) btn.disabled = false;
      if (btnSpan) btnSpan.textContent = 'Send Message';
    });
};

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) {
    console.warn('Contact form not found.');
    return;
  }

  if (form.dataset.emailjsInitialized === 'true') return;

  form.dataset.emailjsInitialized = 'true';
  form.addEventListener('submit', window.handleFormSubmit);
}

// ==========================================================================
// 2. CANVAS BACKGROUND & GLOW EFFECTS
// ==========================================================================
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width > 768 ? 65 : 30, 80);
  const colors = ['#A855F7', '#C084FC', '#38BDF8', '#6366F1', '#ffffff'];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 1.8 + 0.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.alphaSpeed = (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1);
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      this.alpha += this.alphaSpeed;
      if (this.alpha <= 0.1 || this.alpha >= 0.8) {
        this.alphaSpeed *= -1;
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 110) * 0.12;
          ctx.strokeStyle = '#A855F7';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();

  // Cursor glow follower
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }
}

// ==========================================================================
// 2.5. HERO TYPING ANIMATION
// ==========================================================================
function initHeroTyping() {
  const typingElement = document.getElementById('heroTypingText');
  if (!typingElement) return;

  const targetText = typingElement.getAttribute('data-text') || 'Amrnsyh';
  let isDeleting = false;
  let charIndex = 0;
  const baseTypingSpeed = 140; // Smooth human-like typing speed
  const deleteSpeed = 75;

  typingElement.textContent = '';

  function step() {
    if (!isDeleting) {
      charIndex++;
      typingElement.textContent = targetText.slice(0, charIndex);

      if (charIndex === targetText.length) {
        isDeleting = true;
        setTimeout(step, 3000); // Pause on completed word
        return;
      }

      const variance = (Math.random() - 0.5) * 40;
      const speed = Math.max(80, baseTypingSpeed + variance);
      setTimeout(step, speed);
    } else {
      charIndex--;
      typingElement.textContent = targetText.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        setTimeout(step, 700); // Pause before retyping
        return;
      }

      setTimeout(step, deleteSpeed);
    }
  }

  setTimeout(step, 450);
}

// ==========================================================================
// 3. STATS COUNTERS
// ==========================================================================
function initStatsCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statValues.forEach((el) => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            const isPercent = el.textContent.includes('%');
            const hasPlus = el.textContent.includes('+');
            let current = 0;
            const duration = 1500;
            const stepTime = Math.abs(Math.floor(duration / target));

            const timer = setInterval(() => {
              current += 1;
              el.textContent = `${current}${hasPlus ? '+' : ''}${isPercent ? '%' : ''}`;
              if (current >= target) {
                el.textContent = `${target}${hasPlus ? '+' : ''}${isPercent ? '%' : ''}`;
                clearInterval(timer);
              }
            }, Math.max(stepTime, 20));
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsDeck = document.querySelector('.hero-stats-deck');
  if (statsDeck) observer.observe(statsDeck);
}

// ==========================================================================
// 4. PROJECT FILTERING
// ==========================================================================
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================================================
// 5. GLOBAL NAVIGATION & BUTTONS
// ==========================================================================
function initGlobalNavigation() {
  const sections = document.querySelectorAll('section[id], .skills-card[id]');
  const sidebarLinks = document.querySelectorAll('.nav-icon-link');
  const topLinks = document.querySelectorAll('.top-menu .menu-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLinks(id);
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));

  function updateActiveLinks(activeId) {
    sidebarLinks.forEach((link) => {
      const targetSec = link.getAttribute('data-section');
      if (targetSec === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    topLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Theme pulse button
  const pulseBtn = document.getElementById('themePulseBtn');
  if (pulseBtn) {
    pulseBtn.addEventListener('click', () => {
      document.body.classList.toggle('neon-boost');
      window.showToast('Neon Cosmic Pulse Mode Activated!');
    });
  }

  // Sound toggle button & Cosmic Ambient Focus Mode
  const soundBtn = document.getElementById('soundToggleBtn');
  const focusBadge = document.getElementById('focusModeBadge');
  const focusText = focusBadge ? focusBadge.querySelector('.focus-text') : null;
  
  if (soundBtn) {
    // 1. Persiapan Audio (JavaScript)
    const ambientAudio = new Audio('assets/audio/anjay.mp3');
    ambientAudio.loop = true;
    ambientAudio.volume = 0.3;
    let isFocusModeActive = false;

    soundBtn.addEventListener('click', () => {
      if (!isFocusModeActive) {
        // Coba play (menghindari error autoplay policy)
        const playPromise = ambientAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isFocusModeActive = true;
            
            // 3. Update Indikator Status (ACTIVE)
            if (focusBadge) focusBadge.classList.add('active');
            if (focusText) focusText.textContent = 'Cosmic Ambient Focus Mode: Active';
            
          }).catch(err => {
            // 4. Penanganan Autoplay / File Missing
            console.error('Gagal memutar audio Cosmic Ambient Focus Mode (Audio file missing or autoplay blocked):', err);
          });
        }
      } else {
        ambientAudio.pause();
        isFocusModeActive = false;
        
        // 3. Update Indikator Status (INACTIVE)
        if (focusBadge) focusBadge.classList.remove('active');
        if (focusText) focusText.textContent = 'Cosmic Ambient Focus Mode: Inactive';
      }
    });
  }

}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
function initAIChat() {
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const chatMessages = document.getElementById('ai-chat-messages');
  if (!chatForm || !chatInput || !chatMessages) return;

  function appendMessage(message, role) {
    const row = document.createElement('div');
    row.className = `chat-message ${role}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', role === 'user' ? 'user' : 'cpu');
    avatar.appendChild(icon);

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = message;

    row.append(avatar, bubble);
    chatMessages.appendChild(row);
  }

  function processUserMessage(message) {
    const normalizedMessage = message.toLowerCase();
    let response = 'Terima kasih atas pertanyaannya! Saya AI Assistant Dewa. Silakan cek section Contact untuk berdiskusi lebih lanjut.';

    if (normalizedMessage.includes('uniexam')) {
      response = 'UniExam adalah platform ujian universal berbasis AI dengan fitur pengunci layar cerdas untuk mencegah kecurangan.';
    } else if (normalizedMessage.includes('skill') || normalizedMessage.includes('keahlian')) {
      response = 'Skill utama Dewa meliputi Flutter, Dart, Firebase, REST API, dan UI/UX Design di Figma.';
    } else if (normalizedMessage.includes('kontak') || normalizedMessage.includes('email')) {
      response = 'Kamu bisa menghubungi Dewa melalui form Contact di atas atau via email ke dewaevos141@gmail.com.';
    } else if (normalizedMessage.includes('proyek') || normalizedMessage.includes('flutter')) {
      response = 'Dewa telah membangun berbagai proyek Flutter seperti UniExam (Exam Lockdown), Finance Dashboard, dan E-Commerce App.';
    }

    appendMessage(message, 'user');
    appendMessage(response, 'ai');
    if (window.lucide) window.lucide.createIcons();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message !== '') {
      processUserMessage(message);
      chatInput.value = '';
    }
  });

  document.querySelectorAll('.quick-chip-btn').forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const query = this.getAttribute('data-query') || this.innerText.trim();
      processUserMessage(query);
    });
  });
}

function initApp() {
  initEmailJS();
  initAIChat();
  initContactForm();
  initCanvasBackground();
  initHeroTyping();
  initStatsCounter();
  initProjectFiltering();
  initGlobalNavigation();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
