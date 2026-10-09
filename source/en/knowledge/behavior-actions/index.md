---
{
  "title": "Behavior Cloning, Action Bins, and Multimodal Actions",
  "description": "Supervised objectives, closed-loop distribution shift, and regression, classification, and residual actions.",
  "date": "2026-10-09 20:06:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/behavior-actions/",
  "translation_path": "knowledge/behavior-actions/",
  "notebook": {
    "slug": "behavior-actions",
    "group": "policy",
    "sources": [
      "N019",
      "N017"
    ]
  },
  "layout": "post"
}
---

## The statistical objective of cloning

Behavior cloning fits $\pi_\theta(a\mid o)$ from demonstration pairs $(o,a)\sim D$, often through negative log likelihood. Deterministic regression learns a location statistic such as the conditional mean. Averaging multiple valid modes can produce an action supported by none of them: left and right paths around an obstacle can average into a collision.

The issue is conditional multimodality. Representation, loss, and inference rules must agree.

## Choosing an action representation

| Representation | Capability | Limitation |
|---|---|---|
| Continuous regression | One predicted action | Squared loss may average modes |
| Gaussian/mixture | Explicit probabilistic components | Restricted family and mixture complexity |
| Action bins | Probabilities over modes or intervals | Quantization and combinatorial size |
| Discrete mode plus residual | Coarse mode with local precision | Mode assignment and residual fitting |
| Diffusion/flow | Complex joint continuous distributions | Sampling cost and timing |

A bin can be a uniform numeric interval or a cluster center; clustered modes need not be ordered intervals. BeT-style classification-plus-residual modeling separates mode selection from local action refinement.

## Closed-loop distribution shift

Cloning trains on expert visitation. Deployment errors can move the system into poorly covered states. Classical compounding-error bounds require a specified error event, horizon, and worst-case assumptions; $O(T^2\epsilon)$ is not a numerical prediction for every robot. Interactive corrections, DAgger, perturbation recovery, and broader state coverage can mitigate the shift.

## Chunks and evaluation

Prediction horizon $H$ and executed horizon $K$ differ. Chunk consistency, refreshed observations, and inference latency jointly determine behavior. Evaluate success, recovery, continuity, and complete latency in addition to offline prediction loss.

Related reading: [the diffusion supplement](/en/knowledge/diffusion-deep-dive/), [ACT](/en/reading/p07/), and [action interfaces](/en/reading/p02/).


## Selected references from the source notes

- [Reference 1](https://proceedings.neurips.cc/paper_files/paper/1988/file/812b4ba287f5ee0bc9d43bbf5bbe87fb-Paper.pdf)
- [Reference 2](https://arxiv.org/abs/2206.11251)
