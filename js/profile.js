(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const themeColor = document.querySelector('meta[name="theme-color"]');

  function updateTheme() {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
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
    menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
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
  window.matchMedia('(min-width: 768px)').addEventListener('change', event => {
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
      status.textContent = '共 ' + count + ' 篇记录';
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
