function scrollToNext() {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
}

const overlay = document.getElementById('revealOverlay');
const handle = document.getElementById('dragHandle');
const track = document.getElementById('dragTrack');
let dragging = false;
let startX = 0;
let handleLeft = 0;

handle.addEventListener('pointerdown', event => {
  dragging = true;
  startX = event.clientX;
  handleLeft = Number((handle.style.transform || 'translateX(0px)').replace(/[^0-9.-]/g, '')) || 0;
  handle.setPointerCapture(event.pointerId);
});

window.addEventListener('pointermove', event => {
  if (!dragging) return;
  const trackRect = track.getBoundingClientRect();
  const maxX = trackRect.width - handle.offsetWidth - 4;
  const delta = event.clientX - startX;
  const nextLeft = Math.min(Math.max(handleLeft + delta, 0), maxX);
  handle.style.transform = `translateX(${nextLeft}px)`;
  handleLeft = nextLeft;
  if (nextLeft >= maxX * 0.99) {
    openReveal();
  }
});

window.addEventListener('pointerup', () => {
  if (!dragging) return;
  dragging = false;
  const transform = handle.style.transform || 'translateX(0px)';
  const current = Number(transform.replace(/[^0-9.-]/g, '')) || 0;
  const trackRect = track.getBoundingClientRect();
  const maxX = trackRect.width - handle.offsetWidth - 4;
  if (current < maxX * 0.99) {
    handle.style.transform = 'translateX(0px)';
    handleLeft = 0;
  } else {
    openReveal();
  }
});

function openReveal() {
  overlay.classList.add('open');
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);
}

window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.classList.add('fade-in');
    }
  });
});
