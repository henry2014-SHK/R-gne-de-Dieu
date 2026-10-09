(() => {
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  const countdown = document.querySelector('[data-next-service]');
  if (countdown) {
    const timezone = 'Africa/Lubumbashi';
    const offsetMs = 2 * 60 * 60 * 1000;
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const services = [
      { day: 0, hour: 9, minute: 0, name: 'Culte dominical' },
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const interval = Math.max(9000, Number(slideshow.dataset.interval) || 14000);
    let index = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    let timer = null;
    const showSlide = () => {
      if (!slides.length) return;
      index = (index + 1) % slides.length;
      slides.forEach((slide, n) => slide.classList.toggle('is-active', n === index));
    };
    const start = () => {
      if (timer !== null) window.clearInterval(timer);
      timer = null;
      slideshow.classList.toggle('is-paused', reducedMotion.matches || document.hidden);
      if (slides.length > 1 && !reducedMotion.matches && !document.hidden) {
        timer = window.setInterval(showSlide, interval);
      }
    };
    reducedMotion.addEventListener('change', start);
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
