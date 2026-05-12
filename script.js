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

// Feedback messages + progress fill
function updateFeedback(percentage) {

  percentageDisplay.textContent = percentage + '%';

  // progress fill effect
  track.style.background = `linear-gradient(
    to right,
    #ff6ec7 ${percentage}%,
    rgba(255,255,255,0.08) ${percentage}%
  )`;

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

// Start dragging
handle.addEventListener('pointerdown', event => {

  dragging = true;

  startX = event.clientX;

  handleLeft = Number(
    (handle.style.transform || 'translateX(0px)')
      .replace(/[^0-9.-]/g, '')
  ) || 0;

  handle.setPointerCapture(event.pointerId);
});

// Drag movement
window.addEventListener('pointermove', event => {

  if (!dragging) return;

  const trackRect = track.getBoundingClientRect();

  // makes completion slightly harder
  const maxX = trackRect.width - handle.offsetWidth - 12;

  const delta = event.clientX - startX;

  const nextLeft = Math.min(
    Math.max(handleLeft + delta, 0),
    maxX
  );

  handle.style.transform = `translateX(${nextLeft}px)`;

  const percentage = Math.round((nextLeft / maxX) * 100);

  updateFeedback(percentage);

  // Open ONLY at full completion
  if (percentage >= 100) {

    handle.style.transform = `translateX(${maxX}px)`;

    dragging = false;

    // Small delay so "Perfect ❤️" is visible
    setTimeout(() => {
      openReveal();
    }, 700);
  }
});

// Release handling
window.addEventListener('pointerup', () => {

  if (!dragging) return;

  dragging = false;

  const transform =
    handle.style.transform || 'translateX(0px)';

  const current =
    Number(transform.replace(/[^0-9.-]/g, '')) || 0;

  const trackRect = track.getBoundingClientRect();

  const maxX =
    trackRect.width - handle.offsetWidth - 12;

  // If not fully completed → reset smoothly
  if (current < maxX) {

    handle.style.transition = 'transform 0.3s ease';

    handle.style.transform = 'translateX(0px)';

    setTimeout(() => {
      handle.style.transition = '';
    }, 300);

    handleLeft = 0;

    updateFeedback(0);
  }
});

// Open reveal animation
function openReveal() {

  overlay.classList.add('open');

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500);
}

// Fade-in sections on scroll
window.addEventListener('scroll', function() {

  const sections = document.querySelectorAll('.section');

  sections.forEach(section => {

    const rect = section.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      section.classList.add('fade-in');
    }
  });
});