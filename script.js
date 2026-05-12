function scrollToNext() {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
}

const overlay = document.getElementById('revealOverlay');
const handle = document.getElementById('dragHandle');
const track = document.getElementById('dragTrack');
const percentageDisplay = document.getElementById('dragPercentage');
const messageDisplay = document.getElementById('dragMessage');
let dragging = false;
let startX = 0;
let handleLeft = 0;

function updateFeedback(percentage) {
  percentageDisplay.textContent = percentage + '%';

  if (percentage <= 10) {
    messageDisplay.textContent = 'very low 😭';
  } 
  else if (percentage <= 25) {
    messageDisplay.textContent = 'not enough 👀';
  } 
  else if (percentage <= 40) {
    messageDisplay.textContent = 'hmm getting there';
  } 
  else if (percentage <= 60) {
    messageDisplay.textContent = 'okayyy decent 🎂';
  } 
  else if (percentage <= 80) {
    messageDisplay.textContent = 'almost there idiot';
  } 
  else if (percentage <= 99) {
    messageDisplay.textContent = 'ONE LAST PUSH 🎉';
  } 
  else {
    messageDisplay.textContent = 'Perfect! ❤️';
  }
}

handle.addEventListener('pointerdown', event => {
  dragging = true;
  startX = event.clientX;
  handleLeft = Number((handle.style.transform || 'translateX(0px)').replace(/[^0-9.-]/g, '')) || 0;
  handle.setPointerCapture(event.pointerId);
});

window.addEventListener('pointermove', event => {
  if (!dragging) return;

  const trackRect = track.getBoundingClientRect();

  // harder to complete fully
  const maxX = trackRect.width - handle.offsetWidth - 12;

  const delta = event.clientX - startX;

  const nextLeft = Math.min(
    Math.max(handleLeft + delta, 0),
    maxX
  );

  handle.style.transform = `translateX(${nextLeft}px)`;

  const percentage = Math.round((nextLeft / maxX) * 100);

  updateFeedback(percentage);

  // ONLY open at true 100%
  if (percentage >= 100) {

    // lock handle at end
    handle.style.transform = `translateX(${maxX}px)`;

    dragging = false;

    // show PERFECT for a moment
    setTimeout(() => {
      openReveal();
    }, 700);
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
    updateFeedback(0);
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
