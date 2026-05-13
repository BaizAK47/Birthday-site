const overlay = document.getElementById('revealOverlay');
const sliderTrack = document.getElementById('sliderTrack');
const sliderThumb = document.getElementById('sliderThumb');
const percentageDisplay = document.getElementById('dragPercentage');
const messageDisplay = document.getElementById('dragMessage');
const loveAnimation = document.getElementById('loveAnimation');
const mainContent = document.getElementById('mainContent');

const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

music.volume = 0.15;

musicToggle.addEventListener('click', () => {

  if (music.paused) {

    music.play();
    musicToggle.classList.add('playing');

  } else {

    music.pause();
    musicToggle.classList.remove('playing');
  }
});

let dragging = false;

// FEEDBACK MESSAGES
function updateFeedback(percentage) {

  percentageDisplay.textContent = percentage + '%';

  if (percentage <= 10) {

    messageDisplay.textContent = 'very low 😭';

  } else if (percentage <= 25) {

    messageDisplay.textContent = 'not enough 👀';

  } else if (percentage <= 40) {

    messageDisplay.textContent = 'hmm getting there';

  } else if (percentage <= 60) {

    messageDisplay.textContent = 'okayyy decent 🎂';

  } else if (percentage <= 80) {

    messageDisplay.textContent = 'almost there idiot';

  } else if (percentage <= 99) {

    messageDisplay.textContent = 'ONE LAST PUSH 🎉';

  } else {

    messageDisplay.textContent = 'Perfect! ❤️';

    createLovePopAnimation();
  }
}

// LOVE POP EFFECT
function createLovePopAnimation() {

  const loveSymbols = ['❤️', '💕', '💖', '💗'];

  for (let i = 0; i < 8; i++) {

    setTimeout(() => {

      const love = document.createElement('div');

      love.className = 'love-pop';

      love.textContent =
        loveSymbols[Math.floor(Math.random() * loveSymbols.length)];

      love.style.left = Math.random() * 100 + '%';

      loveAnimation.appendChild(love);

      setTimeout(() => love.remove(), 1000);

    }, i * 50);
  }
}

// FLOATING HEARTS
function createFloatingHearts() {

  const container =
    document.getElementById('floatingHeartsContainer');

  const hearts = ['❤️', '✨', '💕', '💖'];

  setInterval(() => {

    const heart = document.createElement('div');

    heart.className = 'floating-heart';

    heart.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + 'vw';

    heart.style.bottom = '-40px';

    heart.style.animationDuration =
      6 + Math.random() * 6 + 's';

    heart.style.fontSize =
      1 + Math.random() * 1.5 + 'rem';

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 12000);

  }, 900);
}

// CONFETTI EFFECT
function createConfetti() {

  const colors = [
    '#ff6ec7',
    '#ffd166',
    '#7bdff2',
    '#baffc9',
    '#ffffff'
  ];

  for (let i = 0; i < 80; i++) {

    const confetti = document.createElement('div');

    confetti.className = 'confetti';

    confetti.style.left = Math.random() * 100 + 'vw';

    confetti.style.top = '-10px';

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.width =
      6 + Math.random() * 8 + 'px';

    confetti.style.height =
      6 + Math.random() * 8 + 'px';

    confetti.style.animationDuration =
      2 + Math.random() * 2 + 's';

    confetti.style.transform =
      `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

// START DRAG
sliderTrack.addEventListener('mousedown', startSlide);
sliderTrack.addEventListener('touchstart', startSlide);

function startSlide(event) {

  dragging = true;

  updateSliderPosition(event);
}

// MOVE DRAG
document.addEventListener('mousemove', moveSlide);
document.addEventListener('touchmove', moveSlide);

function moveSlide(event) {

  if (!dragging) return;

  updateSliderPosition(event);
}

// UPDATE SLIDER POSITION
function updateSliderPosition(event) {

  const rect = sliderTrack.getBoundingClientRect();

  let x;

  if (event.touches) {

    x = event.touches[0].clientX - rect.left;

  } else {

    x = event.clientX - rect.left;
  }

  // harder completion
  const maxX = rect.width - sliderThumb.offsetWidth - 12;

  x = Math.min(Math.max(x, 0), maxX);

  sliderThumb.style.left = x + 'px';

  const percentage =
    Math.round((x / maxX) * 100);

  updateFeedback(percentage);

  // OPEN ONLY AT TRUE 100%
  if (percentage >= 100) {

    sliderThumb.style.left = maxX + 'px';

    dragging = false;

    setTimeout(() => {

      openReveal();

    }, 700);
  }
}

// STOP DRAG
document.addEventListener('mouseup', stopSlide);
document.addEventListener('touchend', stopSlide);

function stopSlide() {

  if (!dragging) return;

  dragging = false;

  const currentLeft =
    parseInt(sliderThumb.style.left) || 0;

  const rect = sliderTrack.getBoundingClientRect();

  const maxX =
    rect.width - sliderThumb.offsetWidth - 12;

  const percentage =
    Math.round((currentLeft / maxX) * 100);

  // RESET IF NOT COMPLETE
  if (percentage < 100) {

    sliderThumb.style.transition =
      'left 0.3s ease';

    sliderThumb.style.left = '0px';

    setTimeout(() => {

      sliderThumb.style.transition =
        'left 0.05s linear';

    }, 300);

    updateFeedback(0);
  }
}

// OPEN REVEAL
function openReveal() {

  dragging = false;

  overlay.classList.add('open');

  document.body.classList.add('reveal-complete');

  mainContent.classList.add('visible');

  createConfetti();

  createFloatingHearts();

  setTimeout(() => {

    overlay.style.display = 'none';

  }, 600);
}

// FADE-IN SECTIONS ON SCROLL
window.addEventListener('scroll', () => {

  const sections =
    document.querySelectorAll('.section');

  sections.forEach(section => {

    const rect =
      section.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {

      section.classList.add('fade-in');
    }
  });
});