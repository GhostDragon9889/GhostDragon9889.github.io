---
{
  "title": "Deep Reinforcement Learning that Matters: Supplementary Evidence",
  "description": "How seeds, architectures, reward scales, and implementations change algorithm comparisons.",
  "date": "2026-10-09 20:26:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p32/",
  "translation_path": "reading/p32/",
  "notebook": {
    "slug": "p32",
    "group": "classics",
    "sources": [
      "N009"
    ]
  },
  "paper": {
    "id": "P32",
    "title": "Deep Reinforcement Learning that Matters: Supplementary Evidence",
    "year": "2017 / AAAI 2018",
    "version": "Supplemental material; arXiv version unspecified",
    "url": "https://arxiv.org/abs/1709.06560",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## Scope: supplementary evidence

The uploaded note concentrates on the supplemental material of *Deep Reinforcement Learning that Matters*: literature configurations, full settings, architecture/activation/reward-scale studies, code comparisons, and statistics. One reported configuration is not a universal optimum.

The source links arXiv:1709.06560, a 2017 preprint associated with AAAI 2018. Reported results depend on historical environment versions and should not be compared directly with current environments sharing a name.

## Algorithm names do not define baselines

DDPG, TRPO, PPO, and ACKTR implementations can differ in architecture, activation, reward scale, batch size, and evaluation. The notes list historical network examples such as $(64,64)$, $(100,50,25)$, and $(400,300)$; these illustrate experimental variables rather than recommended common defaults.

Critic choices influence actor estimates and updates. Disclose implementation differences and use comparable search/optimization budgets.

## Reward and batch effects

The notes describe strong DDPG reward-scale sensitivity and historical TRPO settings where larger batches did not help. Targets, gradient scales, update frequency, and stale policy data can all matter. These observations are configuration-specific, not universal batch-size laws.

## Seeds, implementations, and selection

Between-run or between-codebase variation can rival a claimed improvement. Reporting only top seeds or the best tested checkpoint changes the estimand. Evaluation also needs complete episodes under a specified frozen policy rather than an unclear mixture of changing policies.

## A reporting protocol

Preserve independent runs and distinguish training, assessment, and test. Publish environments, wrappers, networks, rewards, optimizers, batches, search budgets, and interval methods. Interpret significance alongside practical effect size and select sample counts from variance and detectable differences.

Related reading: [statistics](/en/knowledge/statistics-tuning/), [protocols](/en/knowledge/evaluation-protocol/), and [benchmarks](/en/knowledge/single-agent-benchmarks/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1709.06560)
- [Reference 2](https://github.com/Breakend/DeepReinforcementLearningThatMatters)
