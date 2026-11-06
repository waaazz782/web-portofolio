/**
 * MODAL & TOAST COMPONENT LOGIC
 */
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

export function initModalToast() {
  window.openProjectModal = function (projectId) {
    const data = projectData[projectId];
    if (!data) return;

    const content = document.getElementById('modalDynamicContent');
    const backdrop = document.getElementById('projectModalBackdrop');

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

  window.showToast = function (message) {
    const toast = document.getElementById('toastBox');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };
}
