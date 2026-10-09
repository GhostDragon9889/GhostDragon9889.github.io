---
{
  "title": "TD7 Policy Checkpoints: Separating Training and Evaluation",
  "description": "Candidate and deployed policies, assessment, and independent evaluation.",
  "date": "2026-10-09 20:20:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "permalink": "en/knowledge/td7-checkpoints/",
  "translation_path": "knowledge/td7-checkpoints/",
  "notebook": {
    "slug": "td7-checkpoints",
    "group": "systems",
    "sources": [
      "N021"
    ]
  },
  "layout": "post"
}
---

## A checkpoint is part of training

TD7's policy checkpoint is more than a training-recovery file: it is a policy copy selected through training-time assessment. The current learner, data-collection policy, and reported policy may differ.

The source discusses selecting candidates through minimum assessment return. Let $C_c$ be the saved score and $m_k$ the candidate's minimum after k episodes. Additional episodes cannot increase that minimum:

$$
\min(R_1,\ldots,R_k,R_{k+1})\leq m_k.
$$

A candidate already below the threshold can be rejected early. Acceptance still requires the intended assessment length and implementation-specific tie rule; a few favorable trials are insufficient.

## Interpreting the minimum

Minimum return favors consistency in the observed sample, but depends on episode count, randomness, and extremes. It is not automatically a CVaR estimator or a guarantee of future worst-case performance. Assessment scheduling is therefore part of the algorithm.

| Record | Role |
|---|---|
| Current actor/critic/encoder | Optimization and recovery |
| Saved policy plus required representation | Consistent action generation |
| Assessment experience | Candidate selection |
| Independent evaluation | Performance and uncertainty reporting |

Save dependent embeddings, normalization, and configuration with the actor. Selection episodes consume budget and must not be reused as independent final-test evidence.

## Reproduction records

Record acceptance criteria, maximum assessment length, early rejection, exploration noise, and when the candidate is frozen. Compare current and checkpoint policy curves so selection effects are not attributed entirely to representation learning.

Related reading: [TD7/SALE](/en/reading/p35/), [statistics and tuning](/en/knowledge/statistics-tuning/), and [evaluation](/en/knowledge/evaluation-protocol/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/2306.02451)
