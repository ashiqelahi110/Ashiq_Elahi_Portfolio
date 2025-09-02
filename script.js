// ========= Typing Effect with Pause =========
const texts = ["ISLAMIC SCHOLAR", "EDUCATOR", "WRITER", "IT-SKILLED", "DEVELOPER"];
let count = 0, index = 0;

(function type() {
  if (count === texts.length) count = 0;
  let currentText = texts[count];
  let letter = currentText.slice(0, ++index);
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

// ========= Scroll Animation (both directions) =========
const animElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.2 });

animElements.forEach(el => observer.observe(el));

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
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========= Download CV Modal =========
const cvModal = document.getElementById('cvModal');
const downloadBtn = document.getElementById('downloadCV');
const closeBtn = document.querySelector('.close-modal');
const englishBtn = document.getElementById('downloadEnglish');
const arabicBtn = document.getElementById('downloadArabic');

downloadBtn.addEventListener('click', () => {
  cvModal.style.display = "block";
});

closeBtn.addEventListener('click', () => {
  cvModal.style.display = "none";
});

// Modal বাইরে ক্লিক করলে বন্ধ হবে
window.addEventListener('click', (e) => {
  if (e.target === cvModal) {
    cvModal.style.display = "none";
  }
});

// English CV download
englishBtn.addEventListener('click', () => {
  window.location.href = "assets/Ashiq Elahi_CV_IT & Digital Services Professional.pdf";
  cvModal.style.display = "none";
});

// Arabic CV download
arabicBtn.addEventListener('click', () => {
  window.location.href = "assets/Arabic_Ashiq Elahi_CV_IT & Digital Services Professional.pdf - Copy.pdf";
  cvModal.style.display = "none";
});

