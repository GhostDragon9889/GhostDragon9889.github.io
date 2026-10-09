# Bilingual content

Chinese records live in `source/_posts/`. English counterparts live under `source/en/` as pages, with `layout: post`, `lang: en`, matching `collection`, explicit dates, and `translation_path` pointing to the corresponding Chinese route. Keep Chinese front matter pointing back to the English route. English homepage/directory/archive pages have their respective layouts.

Use stable paper routes `reading/p01/` and `en/reading/p01/`. The paper metadata's `topic_id` refers to `source/_data/paperread.yml`; translated UI strings are in `source/_data/ui.json`. Add both languages when adding UI keys. Site helpers intentionally exclude English pages from the Chinese post archive.

PaperRead source downloads preserve the uploaded exports byte-for-byte. Per-paper `summary_sha256` values describe the original reconstructed Chinese summaries before route rewriting. English notes are edited English presentations of those notes, not new paper verification or experimental reproduction. Keep versions, reported metrics, independent analysis, and proposed experiments explicit.

Build with `npm run build`, publish files with `node tools/sync-pages.cjs`, and verify with `node tools/sync-pages.cjs --check`. Use normal Git commits/pushes to preserve sources; do not run `npm run deploy` on this mixed source/publication branch.
