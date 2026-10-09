#!/usr/bin/env node
'use strict';

// Verify the published source mapping without needing the private input archive.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const notebook = JSON.parse(fs.readFileSync(path.join(root, 'source/_data/notebook.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'source/downloads/obsidian/manifest.json'), 'utf8'));
assert.deepEqual(manifest.sources, notebook.sources, 'Source data and downloadable manifest differ');
assert.equal(notebook.article_count, notebook.entries.length);
assert.equal(notebook.meaningful_count, notebook.sources.length);
assert.equal(notebook.unique_count, new Set(notebook.sources.map(source => source.sha256)).size);
assert.equal(notebook.guide_count + notebook.reading_count, notebook.article_count);
const ids = new Set(notebook.sources.map(source => source.id));
assert.equal(ids.size, notebook.sources.length, 'Duplicate source IDs');
const slugs = new Set(notebook.entries.map(entry => entry.slug));
assert.equal(slugs.size, notebook.entries.length, 'Duplicate article slugs');
for (const source of notebook.sources) {
  assert(source.path.split('/').every(part => !['idea', '就业市场'].includes(part.toLowerCase())), 'Excluded folder found');
  assert(/^downloads\/obsidian\/n\d{3}\.md$/.test(source.url), 'Unexpected source URL');
  assert(source.articles.length > 0, 'Unassigned source note');
  assert(source.articles.every(slug => slugs.has(slug)), 'Unknown source article');
  const bytes = fs.readFileSync(path.join(root, 'source', source.url));
  assert.equal(bytes.length, source.bytes, 'Source size mismatch: ' + source.id);
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'), source.sha256, 'Source checksum mismatch: ' + source.id);
  if (source.duplicate_of) {
    const original = notebook.sources.find(note => note.id === source.duplicate_of);
    assert(original && original.sha256 === source.sha256, 'Invalid duplicate mapping');
  }
}
for (const entry of notebook.entries) {
  assert(entry.sources.length > 0 && entry.sources.every(id => ids.has(id)), 'Missing article sources');
  const chinese = fs.readFileSync(path.join(root, 'source/_posts/notebook-' + entry.slug + '.md'), 'utf8');
  const english = fs.readFileSync(path.join(root, 'source/en', entry.path, 'index.md'), 'utf8');
  assert(chinese.includes('"translation_path": "en/' + entry.path + '"'), 'Chinese pairing: ' + entry.slug);
  assert(english.includes('"translation_path": "' + entry.path + '"'), 'English pairing: ' + entry.slug);
  for (const id of entry.sources) {
    assert(notebook.sources.find(source => source.id === id).articles.includes(entry.slug), 'Nonreciprocal source mapping');
  }
}
console.log(`${notebook.article_count} bilingual articles cover ${notebook.meaningful_count} source records (${notebook.unique_count} distinct texts); all source checksums match.`);
