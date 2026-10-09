(() => {
  'use strict';
  const screen = document.querySelector('#live-player');
  const frame = document.querySelector('#rdd-live-video');
  const waiting = document.querySelector('[data-live-waiting]');
  const access = document.querySelector('[data-live-access]');
  const fullscreen = document.querySelector('[data-live-fullscreen]');
  const feedback = document.querySelector('[data-live-feedback]');
  if (!screen || !frame || !waiting) return;

  let player = null;
  let initialized = false;
  let lastCheck = 0;
  let visible = false;
  let retryTimer = null;
  const source = frame.dataset.liveSrc;

  const setWaiting = (active) => {
    screen.classList.toggle('is-waiting', active);
    waiting.hidden = !active;
    frame.setAttribute('aria-hidden', String(active));
    frame.tabIndex = active ? -1 : 0;
  };
  const onStateChange = (event) => {
    // La fin et les erreurs ramènent l’identité d’attente.
    // onReady seul ne prouve pas qu’un direct est disponible.
    if (event.data === 0) setWaiting(true);
    if ([1, 2, 3, 5].includes(event.data)) setWaiting(false);
  };
  const createPlayer = () => {
    if (player || !window.YT?.Player) return;
    player = new window.YT.Player(frame, {
      events: {
        onStateChange,
        onError: () => setWaiting(true),
      },
    });
  };
  const refresh = () => {
    if (!initialized || document.hidden || !visible || !screen.classList.contains('is-waiting')) return;
    if (Date.now() - lastCheck < 60000) return;
    lastCheck = Date.now();
    // Recharger uniquement en attente, jamais pendant la lecture ou sa pause.
    frame.src = frame.src;
  };
  const initialize = () => {
    if (initialized) return;
    initialized = true;
    lastCheck = Date.now();
    const url = new URL(source);
    url.searchParams.set('enablejsapi', '1');
    url.searchParams.set('origin', location.origin);
    url.searchParams.set('playsinline', '1');
    frame.src = url.href;
    access.hidden = false;
    if (window.YT?.Player) createPlayer();
    else {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        createPlayer();
      };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.append(script);
    }
    retryTimer = window.setInterval(refresh, 60000);
  };

  access?.addEventListener('click', () => {
    initialize();
    setWaiting(false);
    // Geste explicite du fidèle : pas de démarrage sonore automatique.
    if (player?.playVideo) player.playVideo();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) { initialize(); refresh(); }
    }, { rootMargin: '100px' }).observe(screen);
  } else {
    visible = true;
    initialize();
  }
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('pagehide', () => {
    if (retryTimer !== null) window.clearInterval(retryTimer);
    retryTimer = null;
  });
  window.addEventListener('pageshow', () => {
    if (initialized && retryTimer === null) retryTimer = window.setInterval(refresh, 60000);
  });

  if (fullscreen && screen.requestFullscreen && document.fullscreenEnabled) {
    fullscreen.hidden = false;
    fullscreen.addEventListener('click', async () => {
      if (feedback) feedback.hidden = true;
      try { await screen.requestFullscreen(); }
      catch (_) { if (feedback) feedback.hidden = false; }
    });
  }
})();
