(() => {
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  if (!button || !nav) return;
  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    nav.classList.toggle('is-open', open);
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { setOpen(false); button.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 980) setOpen(false); });
})();
