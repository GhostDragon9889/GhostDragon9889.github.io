---
{
  "title": "A Closer Look at Deep Policy Gradients",
  "description": "Gradient estimates, value prediction, and surrogate reward landscapes.",
  "date": "2026-10-09 20:25:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p31/",
  "translation_path": "reading/p31/",
  "notebook": {
    "slug": "p31",
    "group": "classics",
    "sources": [
      "N008"
    ]
  },
  "paper": {
    "id": "P31",
    "title": "A Closer Look at Deep Policy Gradients",
    "year": "2018 / ICLR 2020",
    "version": "arXiv:1811.02553; version unspecified",
    "url": "https://arxiv.org/abs/1811.02553",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## Identity and question

Ilyas, Engstrom, and colleagues examine deep policy gradients through gradient estimation, value prediction, and optimization landscapes. This edition separates the paper's questions from the source note's broader theoretical explanations.

The source points to arXiv:1811.02553, first posted in 2018 and associated with ICLR 2020. No precise arXiv revision or PDF accompanies the upload, so formal citation details need a version check.

## Gradient estimates

Compare a finite-rollout estimate against a large-sample reference:

$$
\cos(\hat g,g_{ref})=\frac{\hat g^\top g_{ref}}{\|\hat g\|\|g_{ref}\|}.
$$

The reference is itself an approximation, not an analytically observed exact gradient. The notes describe substantial differences between practical estimates and the ideal theoretical picture, depending on task, training stage, and sample budget. Repeated estimates and uncertainty are needed to interpret a direction measurement.

## Predicting values versus fitting labels

Critic labels can contain bootstrapping, GAE, and finite-rollout returns. Low label loss does not automatically mean accurate $V^\pi$ or an accurate actor gradient. Networks may fit biased labels, while policy updates change visitation.

A frozen policy and large independent rollout set can provide value references. Compare training loss, reference-value error, and advantage-gradient utility separately.

## Surrogate and actual landscapes

PPO/TRPO optimize old-policy surrogates. Their local relationship to return depends on distance, training stage, and implementation. The source reports empirical mismatch, especially later in training. This challenges idealized practical interpretations without invalidating the policy-gradient theorem or establishing universal failure.

## Proposed reproduction

Fix the old policy, data, advantages, and update direction; measure surrogate values, actual return, and KL. Then vary data budget and critic fitting to locate which component changes directional reliability. This is a reading-derived proposal, not a rerun.

Related reading: [policy gradients](/en/knowledge/policy-gradients/), [GAE](/en/reading/p36/), and [reproducibility](/en/reading/p32/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1811.02553)
- [Reference 2](https://arxiv.org/abs/1709.06560)
- [Reference 3](https://arxiv.org/abs/1506.02438)
- [Reference 4](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
- [Reference 5](https://arxiv.org/pdf/1502.05477)
- [Reference 6](https://arxiv.org/abs/1707.06347)
