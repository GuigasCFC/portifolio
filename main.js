document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTyping();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initProjectPreviews();
  initBackToTop();
  initParticleCanvas();
  initFormFeedback();
});
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
function initMobileMenu() {
  const btn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn = document.getElementById('mobileClose');

  if (!btn) return;

  const toggle = () => {
    const open = btn.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  const close = () => {
    btn.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', toggle);
  closeBtn.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Transformando ideias em experiências digitais.',
    'Desenvolvedor Web em constante evolução.',
    'Estudante de ADS apaixonado por tecnologia.',
    'Construindo soluções responsivas e modernas.',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let textEl;
  textEl = document.createElement('span');
  const cursorEl = document.createElement('span');
  cursorEl.className = 'cursor-blink';
  el.innerHTML = '';
  el.appendChild(textEl);
  el.appendChild(cursorEl);

  const SPEED_TYPE = 48;
  const SPEED_DELETE = 22;
  const PAUSE_END = 1800;
  const PAUSE_START = 320;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      charIdx++;
      textEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      charIdx--;
      textEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }
  setTimeout(tick, 800);
}
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach(el => io.observe(el));
}
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
}
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const fill = e.target;
      fill.style.width = fill.dataset.width || '80%';
      setTimeout(() => fill.classList.add('animated'), 100);
      io.unobserve(fill);
    });
  }, { threshold: 0.3 });

  bars.forEach(b => {
    b.style.width = b.dataset.width || '80%';
    io.observe(b);
  });
}
function initProjectPreviews() {
  drawPreview('prev-comments', drawComments);
  drawPreview('prev-pizza', drawPizza);
  drawPreview('prev-landing', drawLanding);
}
function drawPreview(id, fn) {
  const container = document.getElementById(id);
  if (!container) return;
  const canvas = document.createElement('canvas');
  canvas.width = 560;
  canvas.height = 190;
  canvas.style.cssText = 'width:100%;height:100%;display:block;';
  container.appendChild(canvas);
  fn(canvas.getContext('2d'), canvas.width, canvas.height);
}
function drawComments(cx, w, h) {
  cx.fillStyle = '#0a0f1e';
  cx.fillRect(0, 0, w, h);
  cx.fillStyle = 'rgba(124,92,252,0.2)';
  cx.fillRect(0, 0, w, 38);
  cx.fillStyle = 'rgba(124,92,252,0.85)';
  cx.font = 'bold 13px JetBrains Mono, monospace';
  cx.fillText('💬  Sistema de Comentários v1.0', 14, 24);
  const comments = ['Ótimo sistema!', 'Funcionando perfeitamente.', 'Parabéns pelo projeto!'];
  comments.forEach((txt, i) => {
    const y = 52 + i * 42;
    cx.fillStyle = 'rgba(59,158,255,0.06)';
    roundRect(cx, 12, y, w - 24, 34, 6);
    cx.fill();
    cx.fillStyle = 'rgba(59,158,255,0.4)';
    cx.beginPath(); cx.arc(30, y + 17, 10, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = 'rgba(255,255,255,0.5)';
    cx.font = '10px sans-serif';
    cx.fillText('U' + (i + 1), 26, y + 21);
    cx.fillStyle = 'rgba(200,215,255,0.65)';
    cx.font = '11px sans-serif';
    cx.fillText(txt, 48, y + 21);
  });
  cx.fillStyle = 'rgba(255,255,255,0.04)';
  roundRect(cx, 12, h - 34, w - 80, 24, 6); cx.fill();
  cx.fillStyle = 'rgba(124,92,252,0.7)';
  roundRect(cx, w - 62, h - 34, 50, 24, 6); cx.fill();
  cx.fillStyle = '#fff';
  cx.font = 'bold 10px sans-serif';
  cx.fillText('Enviar', w - 50, h - 18);
}

function drawPizza(cx, w, h) {
  const g = cx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#1a0a00'); g.addColorStop(1, '#2a1000');
  cx.fillStyle = g; cx.fillRect(0, 0, w, h);
  cx.fillStyle = 'rgba(255,120,30,0.08)';
  cx.beginPath(); cx.arc(w * 0.55, h * 0.5, 80, 0, Math.PI * 2); cx.fill();
  cx.font = '80px serif'; cx.globalAlpha = 0.25;
  cx.fillText('🍕', w * 0.55, h * 0.7);
  cx.globalAlpha = 1;
  cx.fillStyle = 'rgba(255,180,60,0.9)';
  cx.font = 'bold 20px serif';
  cx.fillText('🍕  Bella Napoli', 18, 46);
  cx.fillStyle = 'rgba(255,255,255,0.5)';
  cx.font = '12px sans-serif';
  cx.fillText('Cardápio · Contato · Delivery', 18, 70);
  cx.fillStyle = 'rgba(255,120,30,0.8)'; roundRect(cx, 18, h - 46, 120, 30, 8); cx.fill();
  cx.fillStyle = 'rgba(255,255,255,0.08)'; roundRect(cx, 148, h - 46, 100, 30, 8); cx.fill();
  cx.fillStyle = '#fff'; cx.font = 'bold 11px sans-serif';
  cx.fillText('Ver Cardápio', 42, h - 26);
  cx.fillStyle = 'rgba(255,200,100,0.8)'; cx.fillText('Sobre Nós', 164, h - 26);
  for (let i = 0; i < 4; i++) {
    cx.fillStyle = i === 0 ? 'rgba(255,120,30,0.9)' : 'rgba(255,255,255,0.2)';
    cx.beginPath(); cx.arc(w - 40 + i * 12, h - 14, 4, 0, Math.PI * 2); cx.fill();
  }
}

function drawLanding(cx, w, h) {
  cx.fillStyle = '#060c18'; cx.fillRect(0, 0, w, h);
  cx.strokeStyle = 'rgba(59,158,255,0.08)'; cx.lineWidth = 1;
  for (let x = 0; x < w; x += 44) { cx.beginPath(); cx.moveTo(x, 0); cx.lineTo(x, h); cx.stroke(); }
  for (let y = 0; y < h; y += 30) { cx.beginPath(); cx.moveTo(0, y); cx.lineTo(w, y); cx.stroke(); }
  cx.fillStyle = 'rgba(59,158,255,0.9)';
  cx.font = 'bold 22px Bricolage Grotesque, sans-serif';
  cx.fillText('< Landing Page />', 18, 48);
  cx.fillStyle = 'rgba(59,158,255,0.12)'; cx.fillRect(18, 62, 360, 10);
  cx.fillStyle = 'rgba(59,158,255,0.08)'; cx.fillRect(18, 80, 260, 8); cx.fillRect(18, 95, 300, 8);
  cx.fillStyle = 'rgba(59,158,255,0.85)'; roundRect(cx, 18, 116, 110, 34, 8); cx.fill();
  cx.fillStyle = 'rgba(59,158,255,0.08)'; cx.strokeStyle = 'rgba(59,158,255,0.3)'; cx.lineWidth = 1;
  roundRect(cx, 136, 116, 90, 34, 8); cx.fill(); cx.stroke();
  cx.fillStyle = '#070b14'; cx.font = 'bold 12px sans-serif'; cx.fillText('Ver Mais', 44, 138);
  cx.fillStyle = 'rgba(59,158,255,0.85)'; cx.fillText('Contato', 152, 138);
}

function drawPortfolio(cx, w, h) {
  cx.fillStyle = '#070b14'; cx.fillRect(0, 0, w, h);
  cx.fillStyle = 'rgba(59,158,255,0.06)'; cx.fillRect(0, 0, 60, h);
  ['◈', '◎', '◉', '◌'].forEach((s, i) => {
    cx.fillStyle = i === 0 ? 'rgba(59,158,255,0.9)' : 'rgba(255,255,255,0.2)';
    cx.font = '14px monospace';
    cx.fillText(s, 20, 44 + i * 32);
  });
  cx.fillStyle = 'rgba(255,255,255,0.08)'; cx.fillRect(76, 14, 120, 60); // photo placeholder
  cx.fillStyle = 'rgba(59,158,255,0.5)'; cx.font = 'bold 11px monospace'; cx.fillText('[GLR]', 112, 50);
  cx.fillStyle = 'rgba(59,158,255,0.85)'; cx.font = 'bold 16px sans-serif'; cx.fillText('Guilherme Lima Ramos', 76, 92);
  cx.fillStyle = 'rgba(200,215,255,0.45)'; cx.font = '11px monospace'; cx.fillText('Front-End Developer', 76, 108);
  cx.fillStyle = 'rgba(255,255,255,0.04)'; roundRect(cx, 76, 122, 100, 50, 6); cx.fill();
  cx.fillStyle = 'rgba(255,255,255,0.04)'; roundRect(cx, 184, 122, 100, 50, 6); cx.fill();
  cx.fillStyle = 'rgba(255,255,255,0.04)'; roundRect(cx, 292, 122, 100, 50, 6); cx.fill();
  ['Projeto 1', 'Projeto 2', 'Projeto 3'].forEach((t, i) => {
    cx.fillStyle = 'rgba(59,158,255,0.6)'; cx.font = '9px monospace';
    cx.fillText(t, 88 + i * 108, 150);
  });
}
function roundRect(cx, x, y, w, h, r) {
  cx.beginPath();
  cx.moveTo(x + r, y);
  cx.lineTo(x + w - r, y);
  cx.quadraticCurveTo(x + w, y, x + w, y + r);
  cx.lineTo(x + w, y + h - r);
  cx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  cx.lineTo(x + r, y + h);
  cx.quadraticCurveTo(x, y + h, x, y + h - r);
  cx.lineTo(x, y + r);
  cx.quadraticCurveTo(x, y, x + r, y);
  cx.closePath();
}
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  for (let i = 0; i < 55; i++) {
    pts.push({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.4 + 0.3,
      color: Math.random() > 0.55 ? '#3b9eff' : '#7c5cfc',
      alpha: Math.random() * 0.45 + 0.1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const g1 = ctx.createRadialGradient(W * 0.25, H * 0.2, 0, W * 0.25, H * 0.2, W * 0.55);
    g1.addColorStop(0, 'rgba(59,158,255,0.025)'); g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

    const g2 = ctx.createRadialGradient(W * 0.8, H * 0.75, 0, W * 0.8, H * 0.75, W * 0.45);
    g2.addColorStop(0, 'rgba(124,92,252,0.03)'); g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const p2 = pts[j];
        const dx = p.x - p2.x, dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.globalAlpha = (1 - dist / 110) * 0.1;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}
function initFormFeedback() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const original = btn.textContent;
    btn.textContent = '✓ Mensagem enviada!';
    btn.style.background = 'linear-gradient(135deg, #22d3ee, #06b6d4)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}