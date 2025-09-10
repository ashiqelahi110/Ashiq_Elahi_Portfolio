// Runtime fixes for garbled characters, language handling, and icons
(function () {
  try {
    // Fix meta description and title if garbled
    var md = document.querySelector('meta[name="description"]');
    if (md && /\uFFFD/.test(md.getAttribute('content') || '')) {
      md.setAttribute('content', "Ashiq Elahi's Personal Portfolio — Writer, Educator, and Developer.");
    }
    if (/\uFFFD/.test(document.title)) {
      document.title = 'Ashiq Elahi — Portfolio';
    }
    // Fix back-to-top button icon
    var bt = document.getElementById('backToTop');
    if (bt) bt.textContent = '↑';
  } catch (_) {}

  // Fallback typing words (avoid corrupted Arabic)
  window.initTypingForLang = function (lang) {
    if (typeof stopTyping === 'function') stopTyping();
    window.TYPED_WORDS = [
      'ISLAMIC SCHOLAR',
      'EDUCATOR',
      'WRITER',
      'IT-SKILLED',
      'DEVELOPER',
    ];
    window.TYPED_INDEX = 0;
    window.TYPED_WORD_INDEX = 0;
    if (typeof startTyping === 'function') startTyping();
  };

  // Robust © YEAR footer for English
  window.updateFooterCopyYear = function () {
    var el = document.querySelector('[data-i18n="footer.copy"]');
    if (!el) return;
    var year = new Date().getFullYear();
    var lang = (document.documentElement.getAttribute('lang') || 'en');
    if (lang === 'en') {
      el.textContent = '© ' + year + ' Ashiq Elahi. All rights reserved. | Email:';
    } else if (el.textContent && el.textContent.indexOf('©') === -1) {
      el.textContent = '© ' + year + ' ' + el.textContent;
    }
  };

  // Skip fetching en.json; rely on clean static HTML
  if (typeof window.setLanguage === 'function') {
    var orig = window.setLanguage;
    window.setLanguage = async function (lang) {
      var html = document.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      try { localStorage.setItem('lang', lang); } catch (_) {}
      var emailInput = document.querySelector('input[type="email"]');
      if (emailInput) emailInput.setAttribute('dir', 'ltr');
      if (lang !== 'en') {
        try { await applyTranslationsFrom(lang); } catch (_) {}
      }
      if (typeof initTypingForLang === 'function') initTypingForLang(lang);
      if (typeof updateLangToggle === 'function') updateLangToggle(lang);
      try { updateFooterCopyYear(); } catch (_) {}
    };
  }

  // Normalize common garbled sequences in visible text
  try {
    var normalize = function () {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      var node;
      while ((node = walker.nextNode())) {
        if (!node.nodeValue) continue;
        var t = node.nodeValue;
        if (t.indexOf('\uFFFD') !== -1) {
          t = t.replace(/\uFFFD\"/g, ' — ');
          t = t.replace(/\uFFFD\+/g, '');
          t = t.replace(/\uFFFD/g, '');
        }
        node.nodeValue = t;
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', normalize);
    } else {
      normalize();
    }
  } catch (_) {}
})();

