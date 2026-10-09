#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'source/_data/tutorials.json')));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'source/data/tutorial-sources.json')));
const references = new Map(data.references.map(item => [item.id, item]));
const ids = new Set();
const slugs = new Set();
const usedReferences = new Set();
const privatePatterns = [
  /\/home\/[^\s]+|[A-Z]:\\Users\\/i,
  /sediment:\/\/|chatgpt\.com\/(?:g\/|c\/)|file_[0-9a-f]{16,}/i,
  /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i,
  /\b(?:\d{1,3}\.){3}\d{1,3}\b/,
  /-----BEGIN (?:OPENSSH |RSA |EC )?PRIVATE KEY-----/,
  /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|hf_[A-Za-z0-9]{20,})\b/,
  /https?:\/\/[^\s/]+:[^\s/]+@/i,
  /(?:password|api[_-]?key|access[_-]?token)\s*[:=]\s*["'][^"'<>\s]{8,}["']/i
];
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8'); }
function privacy(text, label) {
  for (const pattern of privatePatterns) {
    assert(!pattern.test(text), 'Potential private data in ' + label + ' (pattern ' + pattern.source + ')');
  }
}
function frontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  assert(match, 'Missing JSON frontmatter');
  return JSON.parse(match[1]);
}
assert.equal(data.entries.length, data.article_count);
assert.equal(references.size, data.reference_count);
assert.deepEqual(manifest.references, data.references);
for (const ref of references.values()) {
  assert.match(ref.commit, /^[0-9a-f]{40}$/);
  assert.match(ref.sha256, /^[0-9a-f]{64}$/);
  assert.equal(ref.url, `https://github.com/${ref.repo}/blob/${ref.commit}/${ref.path}`);
  assert.equal(ref.accessed, data.updated);
}
for (const entry of data.entries) {
  assert(!ids.has(entry.id) && !slugs.has(entry.slug), 'Duplicate tutorial');
  ids.add(entry.id); slugs.add(entry.slug);
  assert(data.groups.some(group => group.id === entry.group));
  assert.equal(entry.path, `tutorials/${entry.slug}/`);
  for (const id of entry.references) { assert(references.has(id)); usedReferences.add(id); }
  for (const en of [false, true]) {
    const source = en ? `source/en/${entry.path}index.md` : `source/_posts/tutorial-${entry.slug}.md`;
    const text = read(source); const meta = frontmatter(text);
    assert.equal(meta.lang, en ? 'en' : 'zh-CN');
    assert.equal(meta.collection, entry.collection);
    assert.equal(meta.translation_path, en ? entry.path : 'en/' + entry.path);
    assert.equal(meta.tutorial.id, entry.id);
    assert.deepEqual(meta.tutorial.references, entry.references);
    assert(!text.includes('downloads/'), 'No original private downloads');
    privacy(text, source);
    if (en) assert(!/[\u4e00-\u9fff]/.test(text), 'Untranslated English tutorial');
    const output = `public/${en ? 'en/' : ''}${entry.path}index.html`;
    if (fs.existsSync(path.join(root, output))) {
      const html = read(output);
      // SVG path coordinates can resemble dotted addresses; inspect textual
      // markup and links while excluding purely geometric SVG path data.
      privacy(html.replace(/<svg\b[\s\S]*?<\/svg>/g, ''), output);
      for (const id of entry.references) assert(html.includes(`data-reference-id="${id}"`));
      assert(html.includes(`data-language-switch href="/${en ? '' : 'en/'}${entry.path}"`));
    }
  }
}
assert.equal(usedReferences.size, data.reference_count);
privacy(JSON.stringify(data), 'public tutorial metadata');
privacy(JSON.stringify(manifest), 'public source manifest');
console.log(`Audited ${data.article_count} bilingual tutorials, ${data.groups.length} groups, and ${data.reference_count} pinned official sources.`);
