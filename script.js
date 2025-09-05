// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

/* ===== Typing Effect (multilingual) — REPLACE your old typing code with this ===== */
let TYPED_TIMER = null;
let TYPED_INDEX = 0;
let TYPED_WORD_INDEX = 0;
let TYPED_WORDS = ["ISLAMIC SCHOLAR", "EDUCATOR", "WRITER", "IT-SKILLED", "DEVELOPER"];

function startTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const current = TYPED_WORDS[TYPED_WORD_INDEX] || '';
  const partial = current.slice(0, ++TYPED_INDEX);
  el.textContent = partial;

  if (partial.length === current.length) {
    TYPED_WORD_INDEX = (TYPED_WORD_INDEX + 1) % TYPED_WORDS.length;
    TYPED_INDEX = 0;
    TYPED_TIMER = setTimeout(startTyping, 1500);
  } else {
    TYPED_TIMER = setTimeout(startTyping, 100);
  }
}

function stopTyping(){
  if (TYPED_TIMER) { clearTimeout(TYPED_TIMER); TYPED_TIMER = null; }
}

function initTypingForLang(lang){
  stopTyping();
  if (lang === 'ar') {
    TYPED_WORDS = ["عالِم شرعي", "مُعلِّم", "كاتب", "متخصص تقني", "مُطوِّر"];
  } else {
    TYPED_WORDS = ["ISLAMIC SCHOLAR", "EDUCATOR", "WRITER", "IT-SKILLED", "DEVELOPER"];
  }
  TYPED_INDEX = 0;
  TYPED_WORD_INDEX = 0;
  startTyping();
}

// // ========= Typing Effect with Pause =========
// const texts = ["ISLAMIC SCHOLAR", "EDUCATOR", "WRITER", "IT-SKILLED", "DEVELOPER"];
// let count = 0, index = 0;

// (function type() {
//   if (count === texts.length) count = 0;
//   let currentText = texts[count];
//   let letter = currentText.slice(0, ++index);
//   document.getElementById('typed-text').textContent = letter;

//   if (letter.length === currentText.length) {
//     count++;
//     index = 0;
//     setTimeout(type, 1500); // pause after full word
//   } else {
//     setTimeout(type, 100); // typing speed
//   }
// })();

// ========= Theme Toggle =========
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// ========= Burger Menu =========
const burger = document.getElementById('burger');
const nav = document.getElementById('navbar');
burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
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
  window.location.href = "assets/Ashiq_Elahi_CV_IT_and_Digital_Services_Professional.pdf";
  cvModal.style.display = "none";
});

// Arabic CV download
arabicBtn.addEventListener('click', () => {
  window.location.href = "assets/Arabic_Ashiq_Elahi_CV_IT_and_Digital_Services_Professional.pdf";
  cvModal.style.display = "none";
});


/* ===== Language Toggle Logic (put at the very end of script.js) ===== */
(function(){
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  // a) বর্তমান ভাষা পড়া
  const getLang = () => localStorage.getItem('lang') || 'en';

  // b) HTML এর lang/dir + localStorage সেট
  function coreSetLanguage(lang){
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
  }

  // c) যদি আপনার পরে setLanguage() ডিফাইন করেন, সেটাই ইউজ করবে; নাহলে coreSetLanguage()
  function applyLanguage(lang){
    if (typeof window.setLanguage === 'function'){
      window.setLanguage(lang);     // ভবিষ্যতের i18n ট্রান্সলেশন আপডেট এখানে হবে
    } else {
      coreSetLanguage(lang);        // এখন অন্তত lang/dir + localStorage কাজ করবে
    }
    reflectState(lang);
  }

  // d) টগলের ভিজ্যুয়াল স্টেট
  function reflectState(lang){
    btn.classList.toggle('is-en', lang === 'en');
    btn.classList.toggle('is-ar', lang === 'ar');
    btn.setAttribute('aria-pressed', String(lang === 'ar')); // AR হলে pressed=true
    btn.title = (lang === 'en') ? 'Switch to العربية' : 'التبديل إلى English';
  }

  // e) শুরুতে স্টেট সেট
  applyLanguage(getLang());

  // f) ক্লিক → টগল
  btn.addEventListener('click', () => {
    const next = (getLang() === 'en') ? 'ar' : 'en';
    applyLanguage(next);
  });

  // g) কীবোর্ড সাপোর্ট
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    if (e.key === 'ArrowLeft')  applyLanguage('en');
    if (e.key === 'ArrowRight') applyLanguage('ar');
  });
})();

/* ===== Step 6: i18n Loader (place at the VERY END of script.js) ===== */

// (1) সহায়ক: data-i18n থাকা সব নোড আপডেট করা
// Translator note: সাধারণত প্লেইন স্ট্রিং `textContent` দিয়ে বসানো হয়।
// প্রয়োজনে শুধুমাত্র <strong>, <em>, <br> ট্যাগ ব্যবহার করতে পারেন;
// অন্য সব ট্যাগ/অ্যাট্রিবিউট নিরাপত্তার জন্য সরিয়ে ফেলা হবে।
async function applyTranslationsFrom(lang){
  const url = `i18n/${lang}.json`;
  let dict = {};
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    dict = await res.json();
  } catch (e) {
    console.warn('[i18n] Failed to load', url, e);
    // en.json না থাকলে EN-এ DOM-এর টেক্সট যেমন আছে, তেমনই থাকবে
  }

  // 1A) টেক্সট নোড আপডেট
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr'); // placeholder/aria-label ইত্যাদি
    const val = dict[key];
    if (!val) return; // key না পেলে স্কিপ

    if (attr) {
      // এক বা একাধিক অ্যাট্রিবিউট (কমা-সেপারেটেড)
      attr.split(',').map(s => s.trim()).forEach(a => el.setAttribute(a, val));
    } else {
      // সাধারণ টেক্সট বা HTML
      if (/<[a-z][\s\S]*>/i.test(val)) {
        // সীমিত HTML অনুমোদিত।
        const allowedTags = new Set(['STRONG', 'EM', 'BR']);
        const tmp = document.createElement('div');
        tmp.innerHTML = val;

        tmp.querySelectorAll('*').forEach(node => {
          if (!allowedTags.has(node.tagName)) {
            node.replaceWith(document.createTextNode(node.textContent));
          } else {
            // সকল অ্যাট্রিবিউট মুছে ফেলি যেন অনাকাঙ্ক্ষিত স্ক্রিপ্ট না থাকে
            [...node.attributes].forEach(attr => node.removeAttribute(attr.name));
          }
        });

        el.textContent = '';
        el.append(...tmp.childNodes);
      } else {
        el.textContent = val;
      }
    }
  });
}

// (2) HTML lang/dir + লোকালস্টোরেজ + ট্রান্সলেশন + টাইপিং-ওয়ার্ডস
window.setLanguage = async function setLanguage(lang){
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('lang', lang);

  // ইমেইল ইনপুট LTR রাখা ভালো
  const emailInput = document.querySelector('input[type="email"]');
  if (emailInput) emailInput.setAttribute('dir', 'ltr');

  // 2A) i18n টেক্সট বসানো
  await applyTranslationsFrom(lang);

  // 2B) টাইপিং-টেক্সট ভাষাভেদে সেট করা
  initTypingForLang(lang);

  // 2C) হেডারের টগল ভিজ্যুয়াল স্টেট রিফ্লেক্ট
  const btn = document.getElementById('lang-toggle');
  if (btn){
    btn.classList.toggle('is-en', lang === 'en');
    btn.classList.toggle('is-ar', lang === 'ar');
    btn.setAttribute('aria-pressed', String(lang === 'ar'));
    btn.title = (lang === 'en') ? 'Switch to العربية' : 'التبديل إلى English';
  }
};

// Apply saved language on load
window.setLanguage(localStorage.getItem('lang') || 'en');
