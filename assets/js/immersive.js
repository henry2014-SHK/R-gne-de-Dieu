(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let userOff = false;
  try { userOff = localStorage.getItem('rdd-effects') === 'off'; } catch (_) { /* Stockage facultatif. */ }
  let enabled = !reduced.matches && !userOff;
  const toggles = Array.from(document.querySelectorAll('[data-motion-toggle]'));
  const runningAnimations = new Set();
  const hero = document.querySelector('.page-hero--home');
  const depthNodes = Array.from(document.querySelectorAll('[data-depth]'));
  let scrollFrame = 0;
  let heroVisible = true;
  let canvasFrame = 0;
  let lastCanvasTime = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  const canvas = document.querySelector('[data-atmosphere]');
  const context = canvas?.getContext('2d');
  const points = Array.from({ length: 36 }, (_, index) => ({
    x: ((index * 73 + 19) % 101) / 101,
    y: ((index * 47 + 7) % 97) / 97,
    speed: .003 + (index % 4) * .001,
    radius: index % 5 === 0 ? 1.6 : .8,
    alpha: .15 + (index % 4) * .1,
  }));

  const drawPoints = (time) => {
    if (!context || !canvasWidth) return;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (const point of points) {
      const t = enabled ? time / 1000 : 0;
      const y = ((point.y - t * point.speed) % 1 + 1) % 1;
      const x = point.x + Math.sin(t * .12 + point.y * 8) * .015;
      context.globalAlpha = point.alpha;
      context.fillStyle = '#f1ce81';
      context.beginPath();
      context.arc(x * canvasWidth, y * canvasHeight, point.radius, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
  };
  const canvasTick = (time) => {
    canvasFrame = 0;
    if (!enabled || !heroVisible || document.hidden || !context) return;
    if (time - lastCanvasTime >= 32) {
      lastCanvasTime = time;
      drawPoints(time);
    }
    canvasFrame = requestAnimationFrame(canvasTick);
  };
  const syncCanvas = () => {
    if (canvasFrame) cancelAnimationFrame(canvasFrame);
    canvasFrame = 0;
    if (enabled && heroVisible && !document.hidden && context) canvasFrame = requestAnimationFrame(canvasTick);
    else drawPoints(0);
  };
  const resizeCanvas = () => {
    if (!canvas || !context) return;
    const box = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvasWidth = box.width; canvasHeight = box.height;
    canvas.width = Math.round(canvasWidth * ratio);
    canvas.height = Math.round(canvasHeight * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawPoints(performance.now());
  };

  const updateScroll = () => {
    scrollFrame = 0;
    if (!enabled || document.hidden) return;
    if (hero && !('IntersectionObserver' in window)) {
      const box = hero.getBoundingClientRect();
      const visible = box.bottom > 0 && box.top < innerHeight;
      if (visible !== heroVisible) { heroVisible = visible; syncCanvas(); }
    }
    if (hero && heroVisible) {
      const box = hero.getBoundingClientRect();
      hero.style.setProperty('--scene-shift', `${Math.min(75, Math.max(0, -box.top * .12))}px`);
    }
    // Très peu de couches actives; aucune mesure par particule.
    for (const node of depthNodes) {
      const box = node.getBoundingClientRect();
      if (box.bottom <= 0 || box.top >= innerHeight) continue;
      const speed = Number(node.dataset.depth) || .025;
      const shift = Math.max(-22, Math.min(22, (innerHeight * .5 - box.top - box.height * .5) * speed));
      node.style.setProperty('--depth-y', `${shift}px`);
    }
  };
  const requestScroll = () => {
    if (enabled && !scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  };
  const resetDepth = () => {
    if (hero) hero.style.setProperty('--scene-shift', '0px');
    for (const node of depthNodes) {
      for (const [name, value] of [['--depth-x','0px'],['--depth-y','0px'],['--tilt-x','0deg'],['--tilt-y','0deg']]) node.style.setProperty(name, value);
    }
  };
  const syncMotion = () => {
    enabled = !reduced.matches && !userOff;
    root.classList.toggle('effects-off', !enabled);
    for (const toggle of toggles) {
      toggle.hidden = false;
      toggle.disabled = reduced.matches;
      toggle.setAttribute('aria-pressed', String(enabled));
      toggle.setAttribute('aria-label', reduced.matches ? 'Animations désactivées selon votre préférence système' : enabled ? 'Désactiver les animations' : 'Activer les animations');
      const label = toggle.querySelector('[data-motion-label]');
      if (label) label.textContent = reduced.matches ? 'Mouvement réduit' : enabled ? 'Animations actives' : 'Animations arrêtées';
    }
    if (!enabled) {
      for (const animation of runningAnimations) animation.cancel();
      runningAnimations.clear();
      resetDepth();
    }
    document.dispatchEvent(new CustomEvent('rdd:motion', { detail: { enabled } }));
    syncCanvas();
    requestScroll();
  };
  toggles.forEach(toggle => toggle.addEventListener('click', () => {
    userOff = !userOff;
    try { localStorage.setItem('rdd-effects', userOff ? 'off' : 'on'); } catch (_) { /* Préférence toujours effective dans cette page. */ }
    syncMotion();
  }));
  reduced.addEventListener('change', syncMotion);

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal.unobserve(entry.target);
        if (!enabled || !entry.target.animate) continue;
        const delay = Number(entry.target.dataset.revealDelay) || 0;
        const animation = entry.target.animate([
          { opacity: .3, transform: 'translateY(30px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 850, delay, easing: 'cubic-bezier(.2,.75,.25,1)' });
        runningAnimations.add(animation);
        animation.onfinish = () => runningAnimations.delete(animation);
        animation.oncancel = () => runningAnimations.delete(animation);
      }
    }, { threshold: .12 });
    document.querySelectorAll('[data-reveal], main .section-heading, main .split-copy, main .card, main .gallery-grid figure').forEach(node => reveal.observe(node));
    if (hero) new IntersectionObserver(entries => {
      heroVisible = entries[0].isIntersecting;
      syncCanvas(); requestScroll();
    }).observe(hero);
  }
  for (const node of depthNodes) {
    node.addEventListener('pointermove', event => {
      if (!enabled || !finePointer.matches || event.pointerType === 'touch') return;
      const box = node.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      node.style.setProperty('--tilt-x', `${-y * 5}deg`);
      node.style.setProperty('--tilt-y', `${x * 6}deg`);
      node.style.setProperty('--depth-x', `${x * 7}px`);
    });
    node.addEventListener('pointerleave', () => {
      node.style.setProperty('--tilt-x', '0deg');
      node.style.setProperty('--tilt-y', '0deg');
      node.style.setProperty('--depth-x', '0px');
    });
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', () => { resizeCanvas(); requestScroll(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { syncCanvas(); requestScroll(); });
  resizeCanvas(); syncMotion();
})();
