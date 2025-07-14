// ========= Typing Effect with Pause =========
const texts = ["ISLAMIC SCHOLAR", "EDUCATOR", "WRITER", "IT-SKILLED", "DEVELOPER"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.getElementById('typed-text').textContent = letter;
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500); // pause after full word
  } else {
    setTimeout(type, 100); // typing speed
  }
})();

// ========= Theme Toggle =========
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// ========= Burger Menu =========
const burger = document.getElementById('burger');
const nav = document.getElementById('navbar');
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// ========= Scroll Reveal Animation =========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
  observer.observe(el);
});

// ========= Scroll Progress Bar =========
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollProgress.style.width = progress + "%";
});

// ========= Back to Top Button =========
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========= Contact Form Alert =========
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  alert("✅ Thank you! Your message has been sent.");
  contactForm.reset();
});
