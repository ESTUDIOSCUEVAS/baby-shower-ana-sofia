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
    heading.focus({ preventScroll: true });
  }

  if (!coverImage.naturalWidth || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showInvitation();
    return;
  }

  cover.querySelector('.right').addEventListener('animationend', showInvitation, { once: true });
  cover.classList.add('opening');
}, { once: true });

