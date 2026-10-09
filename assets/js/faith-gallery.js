(() => {
  'use strict';
  const groups = Array.from(document.querySelectorAll('[data-faith-slideshow]'));
  if (!groups.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controllers = groups.map((element, groupIndex) => {
    const slides = Array.from(element.querySelectorAll('.faith-slide'));
    let index = 0;
    let visible = !('IntersectionObserver' in window);
    let timer = null;
    const stop = () => { window.clearInterval(timer); timer = null; };
    const advance = () => {
      const nextIndex = (index + 1) % slides.length;
      const next = slides[nextIndex];
      // Ne jamais remplacer une photo visible par un fichier non chargé.
      if (!next.complete || !next.naturalWidth) return;
      slides[index].classList.remove('is-active');
      slides[index].setAttribute('aria-hidden', 'true');
      next.classList.add('is-active');
      next.removeAttribute('aria-hidden');
      index = nextIndex;
    };
    const sync = () => {
      stop();
      if (visible && !document.hidden && !reduced.matches && slides.length > 1) {
        timer = window.setInterval(advance, 8000 + groupIndex * 1400);
      }
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        sync();
      }, { threshold: .05 }).observe(element);
    }
    sync();
    return { sync, stop };
  });
  const syncAll = () => controllers.forEach(controller => controller.sync());
  reduced.addEventListener('change', syncAll);
  document.addEventListener('visibilitychange', syncAll);
  window.addEventListener('pagehide', () => controllers.forEach(controller => controller.stop()));
  window.addEventListener('pageshow', syncAll);
})();
