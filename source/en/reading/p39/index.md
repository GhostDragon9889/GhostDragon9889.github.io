---
{
  "title": "Reinforcement Learning: An Introduction — A Reading Route",
  "description": "A chapter route from tabular methods through approximation, exploration, and policy gradients.",
  "date": "2026-10-09 20:33:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p39/",
  "translation_path": "reading/p39/",
  "notebook": {
    "slug": "p39",
    "group": "classics",
    "sources": [
      "N034"
    ]
  },
  "paper": {
    "id": "P39",
    "title": "Reinforcement Learning: An Introduction — A Reading Route",
    "year": "2018",
    "version": "Second edition; chapter-guide note",
    "url": "http://incompleteideas.net/book/the-book-2nd.html",
    "kind": "book",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## Scope of this reading route

Sutton and Barto's *Reinforcement Learning: An Introduction*, second edition (2018), builds a common language from tabular learning to approximation and policy gradients. This is an edited chapter route from the upload, not a new result or a full textbook translation.

| Stage | Topics | Questions |
|---|---|---|
| Tabular methods | Bandits, MDPs, DP, Monte Carlo, TD, n-step, planning | Expectations/samples, evaluation/control, exploration |
| Approximation | On/off-policy prediction/control, traces, policy gradients | Distribution, projection, bootstrap, gradients, stability |
| Deeper connections | Psychology/neuroscience, applications, frontiers | Distance between assumptions and systems |

## Prerequisite sequence

Start with [probability](/en/knowledge/probability-measures/) and [values](/en/knowledge/mdp-bellman/), then compare exact DP, sampled Monte Carlo, and bootstrapped TD. Continue through n-step learning and [traces](/en/knowledge/eligibility-traces/).

For approximation, specify features, fitting distribution, and operators together. [GTD2/TDC](/en/reading/p34/) explains why randomizing replay does not alone ensure stability. Connect [policy gradients](/en/knowledge/policy-gradients/), [compatible approximation](/en/reading/p37/), and [GAE](/en/reading/p36/).

## Small, checkable tasks

Use bandits for exploration, grid MDPs for iteration, random walks for MC/TD/n-step, and short chains for forward/backward traces. Shared data and computable values separate update objectives from superficial curves.

Before deep continuous control, add [benchmark selection](/en/knowledge/single-agent-benchmarks/) and [statistics](/en/knowledge/statistics-tuning/). Neither textbook theory nor a benchmark score alone establishes arbitrary neural implementation correctness.

## Keeping notes

Record definitions, assumptions, derivations, counterexamples, and one checkable example per chapter. Separate open questions from proved statements. The heading-only GAE placeholder is not published; substantive GAE material appears in [P36](/en/reading/p36/).


## Selected references from the source notes

- [Reference 1](https://mitpress.mit.edu/9780262039246/reinforcement-learning/)
