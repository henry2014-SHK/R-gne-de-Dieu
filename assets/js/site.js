(() => {
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const countdown = document.querySelector('[data-next-service]');
  if (countdown) {
    const timezone = 'Africa/Lubumbashi';
    const offsetMs = 2 * 60 * 60 * 1000;
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const services = [
      { day: 2, hour: 17, minute: 0, name: 'Enseignement & prière' },
      { day: 4, hour: 17, minute: 0, name: 'Prière, délivrance, guérison & restauration' },
    ];
    const fields = {
      days: countdown.querySelector('#countdown-days'),
      hours: countdown.querySelector('#countdown-hours'),
      minutes: countdown.querySelector('#countdown-minutes'),
      seconds: countdown.querySelector('#countdown-seconds'),
      name: countdown.querySelector('#next-service-name'),
      date: countdown.querySelector('#next-service-date'),
    };
    const dateFormat = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: timezone,
    });
    const nextService = (now) => {
      const kolweziNow = new Date(now + offsetMs);
      const candidates = services.map((service) => {
        const daysAhead = (service.day - kolweziNow.getUTCDay() + 7) % 7;
        const localDateAsUtc = Date.UTC(
          kolweziNow.getUTCFullYear(), kolweziNow.getUTCMonth(), kolweziNow.getUTCDate() + daysAhead,
          service.hour, service.minute, 0,
        );
        let startsAt = localDateAsUtc - offsetMs;
        if (startsAt <= now) startsAt += weekMs;
        return { ...service, startsAt };
      });
      return candidates.reduce((soonest, item) => item.startsAt < soonest.startsAt ? item : soonest);
    };
    const updateCountdown = () => {
      const now = Date.now();
      const next = nextService(now);
      const totalSeconds = Math.max(0, Math.floor((next.startsAt - now) / 1000));
      const values = {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      };
      for (const [unit, value] of Object.entries(values)) {
        if (fields[unit]) fields[unit].textContent = String(value).padStart(2, '0');
      }
      if (fields.name) fields.name.textContent = next.name;
      if (fields.date) fields.date.textContent = `${dateFormat.format(new Date(next.startsAt))} · heure de Kolwezi`;
    };
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  const slideshow = document.querySelector('[data-slideshow]');
  if (slideshow) {
    const slides = Array.from(slideshow.querySelectorAll('.hero-slide'));
    const status = slideshow.querySelector('[data-slideshow-status]');
    const counter = slideshow.querySelector('[data-slide-current]');
    const previous = slideshow.querySelector('[data-slideshow-prev]');
    const next = slideshow.querySelector('[data-slideshow-next]');
    const toggle = slideshow.querySelector('[data-slideshow-toggle]');
    const toggleLabel = slideshow.querySelector('[data-toggle-label]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const interval = Math.max(9000, Number(slideshow.dataset.interval) || 14000);
    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    let userPaused = false;
    let timer = null;

    const stop = () => {
      if (timer !== null) window.clearInterval(timer);
      timer = null;
    };
    const showSlide = (index, announce = false) => {
      if (!slides.length) return;
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeIndex));
      if (counter) counter.textContent = String(activeIndex + 1);
      if (status) {
        status.setAttribute('aria-live', announce ? 'polite' : 'off');
        status.textContent = `Photo ${activeIndex + 1} sur ${slides.length}. ${slides[activeIndex].dataset.description || ''}`;
        if (announce) window.setTimeout(() => status.setAttribute('aria-live', 'off'), 1500);
      }
    };
    const syncControls = () => {
      const motionReduced = reducedMotion.matches;
      slideshow.classList.toggle('is-paused', userPaused || motionReduced || document.hidden);
      if (toggle) {
        toggle.disabled = motionReduced;
        toggle.setAttribute('aria-pressed', String(userPaused));
        toggle.setAttribute('aria-label', motionReduced
          ? 'Défilement automatique désactivé selon votre préférence de mouvement réduit'
          : userPaused ? 'Reprendre le diaporama' : 'Mettre en pause le diaporama');
        if (toggleLabel) toggleLabel.textContent = motionReduced ? 'Mouvement réduit' : userPaused ? 'Reprendre' : 'Pause';
      }
    };
    const start = () => {
      stop();
      syncControls();
      if (slides.length > 1 && !userPaused && !reducedMotion.matches && !document.hidden) {
        timer = window.setInterval(() => showSlide(activeIndex + 1), interval);
      }
    };

    showSlide(activeIndex);
    syncControls();
    previous?.addEventListener('click', () => { showSlide(activeIndex - 1, true); start(); });
    next?.addEventListener('click', () => { showSlide(activeIndex + 1, true); start(); });
    toggle?.addEventListener('click', () => { userPaused = !userPaused; start(); });
    reducedMotion.addEventListener?.('change', start);
    document.addEventListener('visibilitychange', start);
    start();
  }

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
