document.addEventListener('DOMContentLoaded', () => {
  window.t_forms__calculateInputsWidth = () => {};
  window.t_form__conditionals_addFieldsListeners = (_record, callback) => callback();
  const overlay = document.getElementById('weiOverlay');
  const audioButton = document.getElementById('weiAudioBtn');
  const audio = document.getElementById('weiAudio');
  const video = document.getElementById('weiVideo');
  const videoWrap = document.getElementById('weiVideoWrap');
  function keyboardButton(element, label) {
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-label', label);
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        element.click();
      }
    });
  }
  keyboardButton(overlay, 'Open your invitation');
  keyboardButton(audioButton, 'Pause music');
  audio.addEventListener('play', () => audioButton.setAttribute('aria-label', 'Pause music'));
  audio.addEventListener('pause', () => audioButton.setAttribute('aria-label', 'Play music'));
  const finishIntro = () => {
    videoWrap.classList.remove('wei-video-in');
    videoWrap.classList.add('wei-video-out');
    setTimeout(() => { videoWrap.style.display = 'none'; }, 1400);
    audioButton.style.visibility = 'visible';
    audioButton.style.opacity = '1';
  };
  video.addEventListener('ended', finishIntro);
  video.addEventListener('error', finishIntro);
  const form = document.getElementById('form2487446233');
  form.querySelectorAll('[data-tilda-req="1"]').forEach(input => { input.required = true; });
  const guests = form.elements.namedItem('Number of Guests Attending');
  guests.pattern = '[0-9]+';
  guests.inputMode = 'numeric';
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const box = form.querySelector('.js-successbox');
    try {
      const response = Object.fromEntries(new FormData(form));
      const entries = JSON.parse(localStorage.getItem('sacred-garden-rsvp') || '[]');
      entries.push({ ...response, savedAt: new Date().toISOString() });
      localStorage.setItem('sacred-garden-rsvp', JSON.stringify(entries));
      box.textContent = 'Your response is saved on this device. It has not been sent to the hosts.';
      box.style.display = 'block';
      form.querySelector('.t-form__inputsbox').style.display = 'none';
    } catch {
      box.textContent = 'Unable to save your response on this device. Please try again.';
      box.style.display = 'block';
    }
  });
});
