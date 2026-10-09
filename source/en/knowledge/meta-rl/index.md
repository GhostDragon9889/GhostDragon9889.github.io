---
{
  "title": "Meta-RL: Task Distributions and Rapid Adaptation",
  "description": "Optimization, contextual inference, and recurrent adaptation across tasks.",
  "date": "2026-10-09 20:17:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "research",
  "permalink": "en/knowledge/meta-rl/",
  "translation_path": "knowledge/meta-rl/",
  "notebook": {
    "slug": "meta-rl",
    "group": "adaptation",
    "sources": [
      "N030"
    ]
  },
  "layout": "post"
}
---

## Meta-training and adaptation

Meta-RL trains across $M\sim p(M)$ to support rapid learning from limited feedback in a new task. State the task family, train/test split, visible context, and adaptation budget. Interpolation, changed dynamics, and entirely new task families are different generalization claims.

| Mechanism | What changes at test time | Required record |
|---|---|---|
| Optimization-based adaptation | Model parameters | Gradient steps, data, initialization |
| Context/task inference | Task representation or conditioning | Available context and inference |
| Recurrent adaptation | Hidden state | Cross-episode retention and resets |

The short source cites Lilian Weng and highlights memory in recurrent Meta-RL. This edition narrows that claim: an RNN is not a requirement for every meta-RL method. Parameter updates and contextual inference can also carry task information.

## Exploration and control

An action can earn reward and reveal task dynamics or reward structure. Meta-training may learn both identification and control. Task IDs or privileged inputs that reveal the answer must be disclosed; otherwise fast adaptation can be overstated.

## Connections and a proposed comparison

Read [RL²](/en/reading/p05/) for hidden-state adaptation, [MetaVLA](/en/reading/p10/) for demonstration conditioning, and [π_RL](/en/reading/p11/) for parameter updating. Compare zero-shot behavior, context inference, and gradient adaptation within a fixed task family while accounting for cumulative interaction. This is a proposed experiment, not a completed reproduction.


## Selected references from the source notes

- [Reference 1](https://lilianweng.github.io/posts/2018-11-30-meta-learning/)
- [Reference 2](https://lilianweng.github.io/posts/2018-02-19-rl-overview/))
- [Reference 3](https://lilianweng.github.io/posts/2019-06-23-meta-rl/)
