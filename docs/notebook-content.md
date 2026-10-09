# Obsidian notebook import

The uploaded archive contains 55 Markdown files and one PNG. Folder components named `就业市场` or `Idea` are excluded before extracting or reading content; the provided archive contains neither folder. The README, heading-only GAE file, and empty priority-replay file are not substantive articles. The remaining 52 source records contain 51 distinct byte sequences.

The site adds 34 paired Chinese/English edited articles: 25 topic guides and 9 literature records. The source-to-article mapping is in `source/_data/notebook.json` and its downloadable manifest. Seven overlapping benchmark reports become selection/evaluation guides; replay duplicates share an article; Basic Concept is contained in Bellman Error. The new Diffusion Policy material supplements existing P08 rather than adding a duplicate paper record.

Full original Markdown downloads preserve each source byte-for-byte. They retain historical wording, malformed formulas, and unresolved claims. Edited bodies use consistent notation and distinguish mathematical derivations, source-reported evidence, and proposed experiments. The English edition is an edited presentation, not a verbatim translation of the full source archive. No original paper PDFs were supplied or reverified and no training experiments were rerun.

Corrections include the SAC temperature-gradient sign, off-policy versus fixed offline learning, COMA spelling, recurrent-memory assumptions in Meta-RL, and the all-one versus all-equal reward distinction in the multi-agent gradient example. Unsupported SAC speed/success numbers are omitted. The perspective record P33 has no invented primary URL or formal bibliographic identity.

`/notes/` and `/en/notes/` provide six learning routes. Theory and evaluation collections are included in homepage previews, knowledge filters, and English archives. Literature coverage is counted from actual published entries; the original 30-paper PaperRead export retains its own source identity.

Run `node tools/audit-notebook.cjs` after changes. Use the build and source-preserving publication commands in `docs/bilingual-content.md`. When adding notes, update both editions and keep source/article mappings reciprocal.
