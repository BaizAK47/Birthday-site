const overlay = document.getElementById('revealOverlay');
const sliderTrack = document.getElementById('sliderTrack');
const sliderThumb = document.getElementById('sliderThumb');
const percentageDisplay = document.getElementById('dragPercentage');
const messageDisplay = document.getElementById('dragMessage');
const loveAnimation = document.getElementById('loveAnimation');

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

function updateFeedback(percentage) {
  percentageDisplay.textContent = percentage + '%';
  if (percentage < 100) {
    messageDisplay.textContent = 'Not enough 😢';
  } else {
    messageDisplay.textContent = 'Perfect! 🎉';
    createLovePopAnimation();
  }
}

function createLovePopAnimation() {
  const loveSymbols = ['❤️', '💕', '💖', '💗'];
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const love = document.createElement('div');
      love.className = 'love-pop';
      love.textContent = loveSymbols[Math.floor(Math.random() * loveSymbols.length)];
      love.style.left = Math.random() * 100 + '%';
      loveAnimation.appendChild(love);
      setTimeout(() => love.remove(), 1000);
    }, i * 50);
  }
}

sliderTrack.addEventListener('mousedown', startSlide);
sliderTrack.addEventListener('touchstart', startSlide);

function startSlide(event) {
  dragging = true;
  updateSliderPosition(event);
}

document.addEventListener('mousemove', moveSlide);
document.addEventListener('touchmove', moveSlide);

function moveSlide(event) {
  if (!dragging) return;
  updateSliderPosition(event);
}

function updateSliderPosition(event) {
  const rect = sliderTrack.getBoundingClientRect();
  let x;
  
  if (event.touches) {
    x = event.touches[0].clientX - rect.left;
  } else {
    x = event.clientX - rect.left;
  }
  
  const maxX = rect.width - sliderThumb.offsetWidth;
  x = Math.min(Math.max(x, 0), maxX);
  
  sliderThumb.style.left = x + 'px';
  const percentage = Math.round((x / maxX) * 100);
  updateFeedback(percentage);
  
  if (percentage >= 100) {
    openReveal();
  }
}

document.addEventListener('mouseup', stopSlide);
document.addEventListener('touchend', stopSlide);

function stopSlide() {
  if (!dragging) return;
  dragging = false;
  const currentLeft = parseInt(sliderThumb.style.left) || 0;
  const rect = sliderTrack.getBoundingClientRect();
  const maxX = rect.width - sliderThumb.offsetWidth;
  const percentage = Math.round((currentLeft / maxX) * 100);
  
  if (percentage < 100) {
    sliderThumb.style.left = '0px';
    updateFeedback(0);
  }
}

function openReveal() {
  dragging = false;
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
