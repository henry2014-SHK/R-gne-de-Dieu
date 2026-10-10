(() => {
  'use strict';
  const frame = document.querySelector('#rdd-replay-video');
  const title = document.querySelector('#replay-current-title');
  const status = document.querySelector('[data-replay-status]');
  const external = document.querySelector('[data-replay-external]');
  const viewer = document.querySelector('#replay-viewer');
  const playlist = document.querySelector('[data-replay-playlist]');
  const choices = Array.from(document.querySelectorAll('[data-replay-id]'));
  if (!frame || !title || !external || !viewer) return;

  const choose = (source, label, link) => {
    frame.src = source;
    frame.title = `Rediffusion — ${label}`;
    title.textContent = label;
    external.href = link;
    if (status) status.textContent = 'Message sélectionné. Lancez la lecture avec la commande du lecteur YouTube.';
    viewer.scrollIntoView({ block: 'start', behavior: 'auto' });
    title.focus({ preventScroll: true });
  };
  const ordinaryClick = event => !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0;
  for (const choice of choices) {
    choice.addEventListener('click', event => {
      if (!ordinaryClick(event)) return;
      const id = choice.dataset.replayId;
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
      event.preventDefault();
      for (const item of choices) item.removeAttribute('aria-current');
      choice.setAttribute('aria-current', 'true');
      const url = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
      url.searchParams.set('playsinline', '1');
      url.searchParams.set('rel', '0');
      choose(url.href, choice.dataset.replayTitle, choice.href);
    });
  }
  playlist?.addEventListener('click', event => {
    if (!ordinaryClick(event)) return;
    event.preventDefault();
    for (const item of choices) item.removeAttribute('aria-current');
    choose('https://www.youtube-nocookie.com/embed/videoseries?list=UUo1XCDNhFb-DUzr1VYmo8yw', 'Toutes les vidéos de la chaîne', playlist.href);
  });
})();
