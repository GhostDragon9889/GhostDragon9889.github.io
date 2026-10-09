---
{
  "title": "Offline RL and Value Extrapolation Error",
  "description": "Value estimates outside data support, maximization backups, and error propagation.",
  "date": "2026-10-09 20:08:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/extrapolation/",
  "translation_path": "knowledge/extrapolation/",
  "notebook": {
    "slug": "extrapolation",
    "group": "policy",
    "sources": [
      "N042"
    ]
  },
  "layout": "post"
}
---

## Queries outside data support

An offline critic is fitted to a fixed dataset, while policy optimization or maximization may query poorly represented $(s,a)$ pairs. A function approximator still outputs a number, but supervision may not support it. Extrapolation error concerns these out-of-distribution estimates, rather than every approximation error inside the dataset.

$$
y=r+\gamma\max_{a'}Q_\theta(s',a')
$$

An overestimated unsupported action can win the maximization, and bootstrapping propagates its estimate into observed states. Policy improvement can then shift visitation farther from training data. Coverage, estimation, and selection interact.

## Why contraction is insufficient

An ideal Bellman contraction does not establish contraction of arbitrary neural fitting on finite data. Projection, weighting, optimization, and restricted action support alter the iteration. Taking the minimum of two critics can reduce some overestimation without solving coverage.

## Three approaches

| Approach | Purpose | Tradeoff |
|---|---|---|
| Behavior constraints/BC regularization | Keep actions near the data | May restrict improvement beyond demonstrations |
| Conservative values | Reduce unsupported-action incentives | Conservative strength and underestimation |
| In-dataset value learning | Reduce OOD action queries during fitting | Policy extraction still has distribution and approximation issues |

Uncertainty, model rollouts, and representation learning can help, but require calibration and model-error checks. Embedding distance alone is not a coverage guarantee.

## Evaluation records

Fix dataset version, behavior quality, termination semantics, score normalization, and tuning budget. Report additional interaction explicitly: continual collection is different from fixed offline learning. Compare policy return, in-data critic error, and OOD action values to diagnose failure.

Related reading: [sampling](/en/knowledge/sampling-replay/), [Bellman errors](/en/knowledge/mdp-bellman/), [TD7/SALE](/en/reading/p35/), and [benchmarks](/en/knowledge/single-agent-benchmarks/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1812.02900)
