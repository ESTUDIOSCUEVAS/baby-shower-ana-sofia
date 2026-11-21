const cover = document.querySelector('.cover');
const opener = document.querySelector('.cover-open');
const invitation = document.querySelector('.invitation');
const heading = document.querySelector('h1');

const coverImage = cover.querySelector('img');
const showBackupButton = () => coverImage.parentElement.classList.add('failed');
coverImage.addEventListener('error', showBackupButton, { once: true });
if (coverImage.complete && !coverImage.naturalWidth) showBackupButton();

cover.hidden = false;
invitation.inert = true;
document.body.classList.add('sealed');

opener.addEventListener('click', () => {
  function showInvitation() {
    cover.hidden = true;
    invitation.inert = false;
    document.body.classList.remove('sealed');
    invitation.classList.add('revealed');
    heading.focus({ preventScroll: true });
    startPhotoSequence();
  }

  if (!coverImage.naturalWidth || reducedMotion.matches) {
    showInvitation();
    return;
  }

  cover.querySelector('.right').addEventListener('animationend', showInvitation, { once: true });
  cover.classList.add('opening');
}, { once: true });


const frame = document.querySelector('.print');
const photos = [...frame.querySelectorAll('img')];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let photoIndex = 0;
let photoTimer;
let frameVisible = false;

function scheduleNextPhoto() {
  clearTimeout(photoTimer);
  if (!frameVisible || document.hidden || photos.length < 2) return;

  photoTimer = setTimeout(() => {
    photos[photoIndex].setAttribute('aria-hidden', 'true');
    photoIndex = (photoIndex + 1) % photos.length;
    photos[photoIndex].setAttribute('aria-hidden', 'false');
    scheduleNextPhoto();
  }, 5000);
}

function startPhotoSequence() {
  if (photos.length < 2) return;
  photos[0].setAttribute('aria-hidden', 'false');
  photos[1].setAttribute('aria-hidden', 'true');
  photos[1].hidden = false;
  frame.classList.add('rotating');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      frameVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      scheduleNextPhoto();
    }, { threshold: 0.5 });
    observer.observe(frame);
  } else {
    frameVisible = true;
    scheduleNextPhoto();
  }

  document.addEventListener('visibilitychange', scheduleNextPhoto);
}
