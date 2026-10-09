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
    themeColor.setAttribute('content', getComputedStyle(document.body).getPropertyValue('--page-bg').trim());
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
  // Keep filters and shared anchors. Localized contents headings can have
  // different IDs in the other edition, so return to its article title.
  function updateLanguageLink() {
    const target = new URL(languageLink.href);
    target.search = location.search;
    const contentsHeading = location.hash && [...document.querySelectorAll('.post-toc a')]
      .some(link => link.hash === location.hash);
    target.hash = contentsHeading ? '#post-title' : location.hash;
    languageLink.href = target.href;
  }
  languageLink.addEventListener('click', updateLanguageLink);
  updateLanguageLink();

  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a')];
    const sections = [...document.querySelectorAll('#about, #scholar, #reading, #tutorials, #knowledge')];
    const observer = new IntersectionObserver(() => {
      const crossed = sections.filter(section => section.getBoundingClientRect().top <= innerHeight * .3);
      const section = crossed[crossed.length - 1] || sections[0];
      if (!section) return;
      links.forEach(link => {
        const active = link.hash === '#' + section.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin: '0px 0px -70% 0px'});
    sections.forEach(section => observer.observe(section));
  }
})();
