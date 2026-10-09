---
{
  "title": "Hexo and GitHub Pages: Building and Publishing While Preserving Sources",
  "date": "2026-10-09 16:00:00",
  "layout": "post",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "2026/10/09/hexo-github-pages-workflow/",
  "description": "Dependency installation, static generation, browser verification, and source-preserving Git publication.",
  "featured": true
}
---

This record describes the build and publication workflow used for this homepage. The repository stores both Hexo source files and published static files at the root, so updates need to preserve both.

## 1. Install locked dependencies with integrity checks

Use `npm ci` with `package-lock.json` instead of choosing fresh versions during publication. If the lockfile's registry mirror is inaccessible, npm can replace the registry host using the official registry:

```bash
npm ci --registry=https://registry.npmjs.org --replace-registry-host=always --no-audit --no-fund
```

This preserves pinned versions and integrity hashes, without disabling TLS verification. The replacement option fits this repository's mirrored npm packages; projects with private registries or custom downloads need their sources checked first.

## 2. Keep source, build, and publication paths distinct

- `source/` contains profile data, articles, and page assets.
- `themes/ayeria/layout/` contains templates.
- `public/` contains generated output and is ignored by Git.
- Root HTML/CSS and route directories contain GitHub Pages publication files.

After generation, a restricted helper copies recognized publication paths:

```bash
npm run build
node tools/sync-pages.cjs
node tools/sync-pages.cjs --check
git diff --check
```

The helper validates the full copy plan, rejects symlinks, and does not delete source files. New top-level publication paths need explicit allowlist entries.

The original `hexo deploy` configuration targets `main` and would replace that branch with generated-only files. This repository instead publishes normal Git commits that retain its source tree.

## 3. Keep article URLs stable and pair translations

Store dates explicitly in Markdown front matter. File-modification timestamps can change after checkout and alter date-based article routes.

```yaml
title: Education
date: 2026-05-29 18:26:07
```

Chinese records are posts; English counterparts are pages with `lang: en`, the same collection, and an explicit `translation_path` back to their Chinese article. This prevents translated copies from duplicating Chinese built-in archives. Paper notes use stable `reading/p01/` and `en/reading/p01/` routes. Topic IDs are shared so a language switch can preserve a selected category.

Changes need regenerated homepage, article, archive, and indexing output. Editing one source file alone does not update already published HTML.

## 4. Verify actual pages and interactions

A successful build is followed by browser checks for desktop/mobile layout, navigation, themes, category filters, language switching, internal links, and content with JavaScript disabled.

The site uses local CSS, native JavaScript, and local math styles/fonts. The full directory remains readable without JavaScript; filters are progressive enhancements. Wide tables and displayed equations scroll within the article instead of widening the whole page.

## 5. Check publication and remote state

Before committing, verify output matches the current build and inspect the working tree:

```bash
node tools/sync-pages.cjs --check
git diff --check
git status --short
```

Use ordinary Git commits and a fast-forward push. Confirm the resulting remote commit. A successful Git push and a completed GitHub Pages deployment are separate states.
