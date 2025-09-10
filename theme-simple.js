// Force simple theme toggle button with emoji icon, overriding any prior builders
(function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  // Replace node to detach any MutationObserver/event handlers bound earlier
  const simple = btn.cloneNode(false);
  simple.removeAttribute('class');
  simple.id = 'theme-toggle';
  simple.type = 'button';
  simple.title = 'Toggle Theme';
  simple.setAttribute('aria-label', 'Toggle Theme');

  const apply = () => {
    simple.textContent = document.body.classList.contains('dark') ? '☀' : '🌙';
  };
  apply();

  simple.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    apply();
  });

  btn.replaceWith(simple);
})();

// Ensure correct icons regardless of legacy text
(function () {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const setIcon = () => {
    btn.textContent = document.body.classList.contains('dark') ? '☀' : '🌙';
  };
  setIcon();
  btn.addEventListener('click', setIcon);
})();
