---
{
  "title": "For SALE: State-Action Representation Learning for Deep Reinforcement Learning",
  "description": "SALE objectives, TD7 engineering components, and the scope of empirical evidence.",
  "date": "2026-10-09 20:29:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p35/",
  "translation_path": "reading/p35/",
  "notebook": {
    "slug": "p35",
    "group": "classics",
    "sources": [
      "N012"
    ]
  },
  "featured": true,
  "paper": {
    "id": "P35",
    "title": "For SALE: State-Action Representation Learning for Deep Reinforcement Learning",
    "year": "2023",
    "version": "arXiv:2306.02451; version unspecified",
    "url": "https://arxiv.org/abs/2306.02451",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## SALE versus the complete TD7 system

The source links *For SALE* to arXiv:2306.02451 and NeurIPS 2023. SALE is a state–action representation mechanism; TD7 combines it with TD3, checkpoints, replay, and stability choices. Whole-system gains cannot all be attributed to the encoder.

## Representation objective

Write $z_s=f(s)$ and $z_{sa}=g(z_s,a)$. A conceptual objective predicts the next-state embedding:

$$
\mathcal L_{enc}=\mathbb E\left[\|g(f(s),a)-\operatorname{sg}(f(s'))\|^2\right].
$$

Actual normalization, stop-gradient, fixed/target representation versions, and schedules matter. Critics can retain original states and actions. Low-dimensional observations can still involve complex dynamics, but embedding prediction alone does not establish a homomorphism or optimal control.

| Component | Purpose | Required comparison |
|---|---|---|
| Decoupled representation | Keep value losses from arbitrarily reshaping the encoder | End-to-end and encoder-free controls |
| Fixed embeddings/normalization | Stabilize targets and scales | Schedules and gradient boundaries |
| Replay/loss design including LAP | Change sample use and weighting | Separate from representation ablations |
| Policy checkpoints | Select a training-time policy copy | Assessment versus independent evaluation |
| Value clipping | Limit selected extrapolated values | Thresholds and underestimation |
| Offline BC term | Restrict fixed-data policy drift | Separate offline and online protocols |

## Evidence and scope

The long source describes online MuJoCo, offline D4RL, component ablations, and runtime. Its score tables refer to reported paper configurations; no PDF was uploaded or independently checked here, so they are not presented as new verification.

The central evidence concerns low-dimensional continuous control. Visual inputs, multitask VLAs, dynamic robots, and real deployment require further experiments. Account for compute relative to base TD3.

Related reading: [checkpoint mechanisms](/en/knowledge/td7-checkpoints/), [abstraction](/en/knowledge/mdp-abstraction/), and [extrapolation](/en/knowledge/extrapolation/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/2306.02451)
- [Reference 2](https://github.com/sfujim/TD7)
- [Reference 3](https://arxiv.org/abs/1812.02900)
- [Reference 4](https://proceedings.neurips.cc/paper/2021/hash/a8166da05c5a094f7dc03724b41886e5-Abstract.html)
- [Reference 5](https://arxiv.org/abs/1802.09477)
- [Reference 6](https://github.com/sfujim/TD3)
