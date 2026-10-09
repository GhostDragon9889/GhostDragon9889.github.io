#!/usr/bin/env node
'use strict';

// This repository keeps Hexo sources and GitHub Pages output on the same branch.
// Copy only published paths; never remove files or replace the source checkout.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public');
const checkOnly = process.argv.includes('--check');
const files = [];
const allowedFiles = new Set(['index.html', '404.html', 'favicon.svg', 'search.json', 'search.xml', '.nojekyll']);
const allowedDirectories = new Set(['css', 'js', 'images', 'dist', 'data', 'archives', 'reading', 'knowledge', 'categories', 'tags', 'en', 'downloads']);

function collect(directory) {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const source = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error('Refusing output symlink: ' + source);
    if (entry.isDirectory()) collect(source);
    else if (entry.isFile()) files.push(source);
    else throw new Error('Unexpected output entry: ' + source);
  }
}

if (!fs.existsSync(path.join(output, 'index.html'))) {
  throw new Error('Build the site first: npm run build');
}
if (fs.lstatSync(output).isSymbolicLink()) {
  throw new Error('Refusing a symlinked output directory.');
}
collect(output);

// Validate the complete copy plan before touching any published file.
const plan = files.map(source => {
  const relative = path.relative(output, source);
  const parts = relative.split(path.sep);
  const allowed = parts.length === 1
    ? allowedFiles.has(relative)
    : allowedDirectories.has(parts[0]) || /^\d{4}$/.test(parts[0]);
  if (!allowed) throw new Error('Unrecognized published path: ' + relative);
  const target = path.join(root, relative);
  let ancestor = target;
  while (ancestor !== root) {
    const entry = fs.lstatSync(ancestor, {throwIfNoEntry: false});
    if (entry && entry.isSymbolicLink()) {
      throw new Error('Refusing destination symlink: ' + ancestor);
    }
    ancestor = path.dirname(ancestor);
  }
  return {source, target, relative};
});

let updated = 0;
for (const {source, target, relative} of plan) {
  if (fs.existsSync(target) && fs.readFileSync(source).equals(fs.readFileSync(target))) continue;
  updated += 1;
  if (checkOnly) console.error('Out of date: ' + relative);
  else {
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.copyFileSync(source, target);
  }
}
if (checkOnly && updated) process.exitCode = 1;
else console.log(checkOnly ? `${plan.length} published files match the build.` : `Updated ${updated} of ${plan.length} published files. Source files preserved.`);
