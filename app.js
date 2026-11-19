const cover = document.querySelector('.cover');
const opener = document.querySelector('.cover-open');
const invitation = document.querySelector('.invitation');
const heading = document.querySelector('h1');

cover.hidden = false;
invitation.inert = true;
document.body.classList.add('sealed');

opener.addEventListener('click', () => {
  function showInvitation() {
    cover.hidden = true;
    invitation.inert = false;
    document.body.classList.remove('sealed');
    heading.focus({ preventScroll: true });
  }

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showInvitation();
    return;
  }

  cover.querySelector('.right').addEventListener('animationend', showInvitation, { once: true });
  cover.classList.add('opening');
}, { once: true });

const photos = [...document.querySelectorAll('.photos figure')];
const photoNext = document.querySelector('.photo-next');
let currentPhoto = 0;
photos[1].hidden = true;
photoNext.hidden = false;

photoNext.addEventListener('click', () => {
  photos[currentPhoto].hidden = true;
  currentPhoto = (currentPhoto + 1) % photos.length;
  photos[currentPhoto].hidden = false;
  photoNext.textContent = currentPhoto === 0 ? 'Ver segunda ecografía' : 'Ver primera ecografía';
});
