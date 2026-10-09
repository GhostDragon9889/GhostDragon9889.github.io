---
{
  "title": "A Reproducible RL Evaluation and Reporting Protocol",
  "description": "Align environment versions, training budgets, checkpoint selection, held-out testing, and aggregation.",
  "date": "2026-10-09 20:24:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "evaluation",
  "permalink": "en/knowledge/evaluation-protocol/",
  "translation_path": "knowledge/evaluation-protocol/",
  "notebook": {
    "slug": "evaluation-protocol",
    "group": "evaluation",
    "sources": [
      "N001",
      "N002",
      "N003",
      "N004",
      "N005",
      "N006",
      "N007",
      "N041",
      "N009"
    ]
  },
  "featured": true,
  "layout": "post"
}
---

## State the claim and test split

This protocol combines seven benchmark reports, statistics notes, and supplementary reproducibility reading. Define the research question and primary measurement before fixing tasks and validation data. Planned experiments remain proposals.

| Record | Minimum content |
|---|---|
| Environment identity | Packages, versions, IDs, maps/models, wrappers |
| Task semantics | Rewards, success, costs, horizon, termination/truncation |
| Inputs/actions | Modalities, privileged inputs, units, normalization, repeats |
| Data budget | Joint transitions, agent steps, demonstrations, offline data, resets |
| Optimization | Updates, batches, architectures, optimizer, total search configurations |
| Policy selection | Final/best-validation/checkpoint rule and data |
| Evaluation | Frozen policy, episodes, seeds, noise, test split |
| Systems | CPU/GPU, parallelism, precision, complete wall time |
| Outputs | Raw seed results, curves, intervals, configuration and code versions |

Collection, optimization, validation, and testing consume different budgets. Test-based checkpoint selection introduces bias into the reported test score.

## Define metrics before plotting

On the shared interval $[0,B]$, use $\mathrm{AUC}(B)=B^{-1}\int_0^B J(x)\,dx$ if that is the chosen convention. Threshold budgets need a threshold, smoothing, persistence rule, and treatment of unreached targets.

Success rates require fixed denominators, timeouts, and contact rules. Separate training return from test return. Establish score references before cross-task normalization, and retain per-task results with robust aggregates.

## Reproducible execution

Debug rewards, masks, resets, action bounds, and seeds in a small task. Establish baselines before the main study. Match data and search budgets, isolate component ablations, and retain all runs including failures.

Automatic resets require actual final observations. External truncation in continuing tasks normally retains bootstrap, while finite-horizon tasks follow their own state/termination semantics.

## Scope of conclusions

Small seed counts do not justify universal superiority. Hardware, reward, maps, and implementations influence rankings. State which fixed conditions improved which metric and identify untested conditions.

Related reading: [statistics](/en/knowledge/statistics-tuning/), [single-agent suites](/en/knowledge/single-agent-benchmarks/), [MARL](/en/knowledge/multi-agent-benchmarks/), and [reproducibility evidence](/en/reading/p32/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1709.06560)
- [Reference 2](https://ale.farama.org/getting-started/)
- [Reference 3](https://ale.farama.org/index.html)
- [Reference 4](https://github.com/google-deepmind/dm_control)
- [Reference 5](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)
- [Reference 6](https://gymnasium.farama.org/environments/mujoco/)
