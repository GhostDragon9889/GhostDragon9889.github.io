(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function updateTheme() {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? toggle.dataset.lightLabel : toggle.dataset.darkLabel);
    themeColor.setAttribute('content', dark ? '#131b26' : '#ffffff');
  }

  toggle.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('profile-theme', root.dataset.theme); } catch (_) {}
    updateTheme();
  });
  updateTheme();

  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? menuButton.dataset.closeLabel : menuButton.dataset.openLabel);
  }

  menuButton.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
  });
  root.classList.add('js');

  document.querySelectorAll('[data-content-filter]').forEach(container => {
    const buttons = [...container.querySelectorAll('[data-filter]')];
    const items = [...container.querySelectorAll('.content-item')];
    const empty = container.querySelector('.filter-empty');
    const status = container.querySelector('.filter-status');
    function filter(group, updateUrl) {
      if (!buttons.some(button => button.dataset.filter === group)) group = 'all';
      let count = 0;
      items.forEach(item => {
        item.hidden = group !== 'all' && item.dataset.group !== group;
        if (!item.hidden) count += 1;
      });
      buttons.forEach(button => {
        const active = button.dataset.filter === group;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      empty.hidden = count !== 0;
      status.textContent = container.dataset.countLabel.replace('{count}', String(count));
      if (updateUrl) {
        const url = new URL(location.href);
        if (group === 'all') url.searchParams.delete('category');
        else url.searchParams.set('category', group);
        history.replaceState(null, '', url);
      }
    }
    buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter, true)));
    filter(new URLSearchParams(location.search).get('category') || 'all', false);
  });

  const languageLink = document.querySelector('[data-language-switch]');
  // Keep a filter and a same-article anchor when switching languages.
  function updateLanguageLink() {
    const target = new URL(languageLink.href);
    target.search = location.search;
    target.hash = location.hash;
    languageLink.href = target.href;
  }
  languageLink.addEventListener('click', updateLanguageLink);
  updateLanguageLink();

  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin: '-10% 0px -55% 0px'});
    document.querySelectorAll('#about, #scholar, #reading, #knowledge').forEach(section => observer.observe(section));
  }
})();
