// Use the renderer's matching, lockfile-installed KaTeX assets locally.
// Pages without equations do not need the stylesheet.
hexo.extend.filter.register('after_render:html', html => {
  return html.replace(
    '<link href="https://cdn.bootcss.com/KaTeX/0.11.1/katex.min.css" rel="stylesheet" />',
    /class=["'][^"']*\bkatex\b/.test(html) ? '<link href="/css/katex/katex.min.css" rel="stylesheet" />' : ''
  );
}, 20);
