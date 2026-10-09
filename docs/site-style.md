# Journal layout

The layout takes visual direction from [Lil'Log](https://lilianweng.github.io/). Its public homepage and stylesheet were reviewed at repository commit `95ba34c87d54bc406e3ba7de253ee3b9590b2ead` because the hosted site was inaccessible from this environment. The site uses its own templates and styles; reference-site content and tracking code are not imported.

The main column is 720px wide, with a wider compact navigation bar. Article lists use title, short excerpt, date, topic, and estimated reading time. The homepage presents literature, tutorials, and research/engineering content. Personal information, education, and scholarly links appear only on the dedicated `/about/` and `/en/about/` pages, rendered from `source/_data/profile.yml` by `profile-about.ejs`. The previous education article URLs redirect to the corresponding About page and are excluded from article archives. Directories use full-width topic groups. Light and dark palettes use neutral colors; no external font or script is required.

Articles have a native expandable table of contents generated from their level-two and level-three headings. Paper source/version details are expandable; tutorial source and verification notes stay with the references. The back-to-top link targets the current document. Navigation, sources, and the contents remain usable without JavaScript. Switching languages from a contents heading returns to the translated article title because localized heading IDs differ; shared anchors and directory sections are preserved.

Reading-time estimates use approximately 400 Chinese characters or 220 Latin words per minute, excluding fenced code and display formulas where available. The estimate is rounded up and has a one-minute minimum; it is a reading aid, not a measured result.

Maintain `source/css/profile.css`, the bilingual dictionary, and the local theme partials together. Rebuild with Hexo and sync through `tools/sync-pages.cjs`; this repository keeps source and Pages output on the same branch.
