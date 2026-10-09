(() => {
  'use strict';
  const number = document.querySelector('[data-deposit-number]');
  const button = document.getElementById('copy-deposit');
  const status = document.getElementById('copy-deposit-status');
  if (!number || !button || !status) return;
  const digits = number.dataset.depositNumber;
  if (!/^0\d{9}$/.test(digits)) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(digits);
      status.textContent = 'Numéro copié : ' + digits + '. Collez-le dans votre service Airtel Money.';
    } catch {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(number);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = 'Copiez le numéro sélectionné : ' + digits + '.';
    } finally {
      button.disabled = false;
    }
  });
})();
