// The Markdown renderer injects this stylesheet even on pages without math.
// Keep it for rendered equations, but avoid an unnecessary CDN request elsewhere.
hexo.extend.filter.register('after_render:html', html => {
  if (/class=["'][^"']*\bkatex\b/.test(html)) return html;
  return html.replace(
    '<link href="https://cdn.bootcss.com/KaTeX/0.11.1/katex.min.css" rel="stylesheet" />',
    ''
  );
}, 20);
