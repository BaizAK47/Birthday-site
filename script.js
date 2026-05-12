function scrollToNext() {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
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