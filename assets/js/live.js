(() => {
  'use strict';
  const player = document.querySelector('#live-player');
  const button = document.querySelector('[data-live-fullscreen]');
  const feedback = document.querySelector('[data-live-feedback]');
  if (!player || !button || !player.requestFullscreen || !document.fullscreenEnabled) return;

  button.hidden = false;
  button.addEventListener('click', async () => {
    if (feedback) feedback.hidden = true;
    try {
      await player.requestFullscreen();
    } catch (_) {
      if (feedback) feedback.hidden = false;
    }
  });
})();
