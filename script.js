// Apply saved theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

// ===== Typing Effect (multilingual) =====
(() => {
  let typedTimer = null;
  let typedIndex = 0;
  let typedWordIndex = 0;
  let typedWords = ["ISLAMIC SCHOLAR", "EDUCATOR", "WRITER", "IT-SKILLED", "DEVELOPER"];

  function startTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;
    const current = typedWords[typedWordIndex] || '';
    const partial = current.slice(0, ++typedIndex);
    el.textContent = partial;

    if (partial.length === current.length) {
      typedWordIndex = (typedWordIndex + 1) % typedWords.length;
      typedIndex = 0;
      typedTimer = setTimeout(startTyping, 1500);
    } else {
      typedTimer = setTimeout(startTyping, 100);
    }
  }

  function stopTyping() {
    if (typedTimer) {
      clearTimeout(typedTimer);
      typedTimer = null;
    }
  }

  function initTypingForLang(lang) {
    stopTyping();
    typedWords =
      lang === 'ar'
        ? ["باحث شرعي", "معلّم", "كاتب", "مختص تقني", "مطور"]
        : ["ISLAMIC SCHOLAR", "EDUCATOR", "WRITER", "IT-SKILLED", "DEVELOPER"];
    typedIndex = 0;
    typedWordIndex = 0;
    startTyping();
  }

  window.initTypingForLang = initTypingForLang;
})();

// ========= Theme Toggle =========
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
  const setIcon = () => (toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙');
  setIcon();
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    setIcon();
  });
}

// ========= Burger Menu (accessible drawer) =========
const burger = document.getElementById('burger');
const nav = document.getElementById('navbar');
const navOverlay = document.getElementById('navOverlay');
let prevFocus = null;

function firstFocusable(container) {
  return container.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
}

function openNav() {
  if (!nav) return;
  prevFocus = document.activeElement;
  nav.classList.add('active');
  nav.setAttribute('aria-hidden', 'false');
  if (burger) burger.setAttribute('aria-expanded', 'true');
  if (navOverlay) navOverlay.hidden = false;
  document.body.classList.add('nav-open');
  const first = firstFocusable(nav);
  if (first) first.focus(); else nav.focus();
}

function closeNav() {
  if (!nav) return;
  nav.classList.remove('active');
  nav.setAttribute('aria-hidden', 'true');
  if (burger) burger.setAttribute('aria-expanded', 'false');
  if (navOverlay) navOverlay.hidden = true;
  document.body.classList.remove('nav-open');
  if (prevFocus && typeof prevFocus.focus === 'function') prevFocus.focus();
}

if (burger && nav) {
  // Ensure aria-hidden reflects viewport size for accessibility
  const syncAriaHidden = () => {
    if (window.innerWidth >= 768) {
      nav.setAttribute('aria-hidden', 'false');
    } else if (!nav.classList.contains('active')) {
      nav.setAttribute('aria-hidden', 'true');
    }
  };
  syncAriaHidden();

  burger.addEventListener('click', (e) => {
    e.preventDefault();
    if (nav.classList.contains('active')) closeNav(); else openNav();
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }

  // Close on Escape and trap focus inside drawer
  document.addEventListener('keydown', (e) => {
    if (nav.classList.contains('active')) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeNav();
      } else if (e.key === 'Tab') {
        const focusables = nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });

  // Close drawer if resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && nav.classList.contains('active')) {
      closeNav();
    }
    syncAriaHidden();
  });
}

// ========= Scroll Animation =========
const animElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  { threshold: 0.2 }
);
animElements.forEach((el) => observer.observe(el));

// ========= Scroll Progress Bar =========
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (!scrollProgress) return;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
});

// Ensure theme icon text is correct (overrides any legacy text)
(() => {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;
  const applyIcon = () => { themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'; };
  applyIcon();
  themeBtn.addEventListener('click', applyIcon);
})();

// ========= Back to Top Button =========
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========= Download CV Modal =========
(() => {
  const cvModal = document.getElementById('cvModal');
  const downloadBtn = document.getElementById('downloadCV');
  const closeBtn = document.querySelector('.close-modal');
  const englishBtn = document.getElementById('downloadEnglish');
  const arabicBtn = document.getElementById('downloadArabic');

  let prevFocus = null;

  if (!(cvModal && downloadBtn && closeBtn && englishBtn && arabicBtn)) {
    return;
  }

  const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const getFocusable = () => cvModal.querySelectorAll(focusableSelectors);

  function openModal() {
    prevFocus = document.activeElement;
    cvModal.style.display = 'block';
    cvModal.setAttribute('aria-hidden', 'false');
    const focusables = getFocusable();
    if (focusables.length > 0) {
      focusables[0].focus();
    }
  }

  function closeModal() {
    cvModal.style.display = 'none';
    cvModal.setAttribute('aria-hidden', 'true');
    if (prevFocus && typeof prevFocus.focus === 'function') {
      prevFocus.focus();
    }
  }

  downloadBtn.addEventListener('click', () => {
    openModal();
  });

  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  window.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (cvModal.style.display === 'block') {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      } else if (e.key === 'Tab') {
        const focusables = getFocusable();
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });

  englishBtn.addEventListener('click', () => {
    window.location.href = 'assets/Ashiq_Elahi_CV_IT_and_Digital_Services_Professional.pdf';
    closeModal();
  });

  arabicBtn.addEventListener('click', () => {
    window.location.href = 'assets/Arabic_Ashiq_Elahi_CV_IT_and_Digital_Services_Professional.pdf';
    closeModal();
  });
})();

// ===== Language Toggle Logic =====
function updateLangToggle(lang) {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.classList.toggle('is-en', lang === 'en');
  btn.classList.toggle('is-ar', lang === 'ar');
  btn.setAttribute('aria-pressed', String(lang === 'ar'));
  btn.title = lang === 'en' ? 'Switch to Arabic' : 'Switch to English';
}

(function () {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  const getLang = () => localStorage.getItem('lang') || 'en';

  function coreSetLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
  }

  function applyLanguage(lang) {
    if (typeof window.setLanguage === 'function') {
      window.setLanguage(lang);
    } else {
      coreSetLanguage(lang);
      updateLangToggle(lang);
    }
  }

  applyLanguage(getLang());

  btn.addEventListener('click', () => {
    const next = getLang() === 'en' ? 'ar' : 'en';
    applyLanguage(next);
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
    if (e.key === 'ArrowLeft') applyLanguage('en');
    if (e.key === 'ArrowRight') applyLanguage('ar');
  });
})();

// ===== i18n Loader =====
async function applyTranslationsFrom(lang) {
  const url = `i18n/${lang}.json`;
  let dict = {};
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    dict = await res.json();
  } catch (e) {
    console.warn('[i18n] Failed to load', url, e);
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const attr = el.getAttribute('data-i18n-attr');
    const val = dict[key];
    if (!val) return;

    if (attr) {
      attr
        .split(',')
        .map((s) => s.trim())
        .forEach((a) => el.setAttribute(a, val));
    } else {
      if (/<[a-z][\s\S]*>/i.test(val)) {
        const allowedTags = new Set(['STRONG', 'EM', 'BR']);
        const tmp = document.createElement('div');
        tmp.innerHTML = val;
        tmp.querySelectorAll('*').forEach((node) => {
          if (!allowedTags.has(node.tagName)) {
            node.replaceWith(document.createTextNode(node.textContent));
          } else {
            [...node.attributes].forEach((attr) => node.removeAttribute(attr.name));
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

window.setLanguage = async function setLanguage(lang) {
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  localStorage.setItem('lang', lang);

  const emailInput = document.querySelector('input[type="email"]');
  if (emailInput) emailInput.setAttribute('dir', 'ltr');

  await applyTranslationsFrom(lang);
  initTypingForLang(lang);
  updateLangToggle(lang);
  // Ensure footer year and symbol are correct after translations
  try { updateFooterCopyYear(); } catch (e) {}
};

// Apply saved language on load
window.setLanguage(localStorage.getItem('lang') || 'en');

// ===== Footer: keep current year and © intact =====
function updateFooterCopyYear() {
  const el = document.querySelector('[data-i18n="footer.copy"]');
  if (!el) return;
  const year = new Date().getFullYear();
  let txt = el.textContent || '';
  // Normalize © symbol if it got garbled
  if (!/[©]/.test(txt)) {
    // Replace common garble like 'Ac' with ©, else ensure it is prefixed
    txt = txt.replace(/^Ac\b/i, '©');
    if (!/[©]/.test(txt)) txt = `© ${txt}`;
  }
  // Replace any 4-digit year with current year; otherwise prefix
  if (/(?:19|20)\d{2}/.test(txt)) {
    txt = txt.replace(/(?:19|20)\d{2}/, String(year));
  } else {
    txt = txt.replace('©', `© ${year}`);
  }
  el.textContent = txt;
}
// Run once on load as well
try { updateFooterCopyYear(); } catch (e) {}

// Final theme icon fix to ensure proper emoji on all browsers
(() => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  // Build pill UI with icons and keep it intact
  const build = () => {
    btn.classList.add('theme-toggle');
    if (!btn.querySelector('.toggle-track')) {
      btn.innerHTML = `
        <span class="toggle-track">
          <span class="toggle-label light">LIGHT MODE</span>
          <span class="toggle-label dark">DARK MODE</span>
          <span class="toggle-thumb" aria-hidden="true">
            <span class="icon sun">☀</span>
            <span class="icon moon">🌙</span>
          </span>
        </span>`;
    }
    const isDark = document.body.classList.contains('dark');
    btn.setAttribute('aria-pressed', String(isDark));
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  };
  build();

  // Ensure our UI wins over any legacy text updates
  btn.addEventListener('click', () => setTimeout(build, 0));
  const mo = new MutationObserver(() => build());
  mo.observe(btn, { childList: true, characterData: true, subtree: true });
})();
