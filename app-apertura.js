const cover = document.querySelector('.cover');
const opener = document.querySelector('.cover-open');
const invitation = document.querySelector('.invitation');
const heading = document.querySelector('h1');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const coverImage = cover.querySelector('img');
const showBackupButton = () => coverImage.parentElement.classList.add('failed');
coverImage.addEventListener('error', showBackupButton, { once: true });
if (coverImage.complete && !coverImage.naturalWidth) showBackupButton();

cover.hidden = false;
invitation.inert = true;
document.body.classList.add('sealed');

opener.addEventListener('click', () => {
  playMusic();

  let fallback;
  function showInvitation() {
    if (cover.hidden) return;
    clearTimeout(fallback);
    cover.hidden = true;
    invitation.inert = false;
    document.body.classList.remove('sealed');
    invitation.classList.add('revealed');
    heading.focus({ preventScroll: true });
    musicControl.hidden = false;
  }

  if (!coverImage.naturalWidth || reducedMotion.matches) {
    showInvitation();
    return;
  }

  const leaf = cover.querySelector('.right');
  leaf.addEventListener('animationend', showInvitation, { once: true });
  leaf.addEventListener('animationcancel', showInvitation, { once: true });
  fallback = setTimeout(showInvitation, 1100);
  cover.classList.add('opening');
}, { once: true });


const music = document.querySelector('#musica');
const musicControl = document.querySelector('.music-control');
music.volume = 0.45;

function playMusic() {
  music.play().catch(() => {
    musicControl.textContent = 'Reproducir música';
  });
}

music.addEventListener('play', () => {
  musicControl.textContent = 'Pausar música';
});
music.addEventListener('pause', () => {
  musicControl.textContent = 'Reproducir música';
});
musicControl.addEventListener('click', () => {
  if (music.paused) playMusic();
  else music.pause();
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const gift = document.querySelector('.gift-tag');
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    gift.classList.add('gift-revealed');
    observer.disconnect();
  }, { threshold: 0.35 });
  observer.observe(gift);
}
