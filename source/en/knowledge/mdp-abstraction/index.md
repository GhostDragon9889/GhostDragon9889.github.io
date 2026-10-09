---
{
  "title": "MDP Homomorphisms and State–Action Abstraction",
  "description": "Reward and transition preservation, policy lifting, bisimulation, and approximate representations.",
  "date": "2026-10-09 20:13:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/mdp-abstraction/",
  "translation_path": "knowledge/mdp-abstraction/",
  "notebook": {
    "slug": "mdp-abstraction",
    "group": "adaptation",
    "sources": [
      "N029"
    ]
  },
  "layout": "post"
}
---

## Structure that an abstraction preserves

Let $f:\mathcal S\to\bar{\mathcal S}$ map states and $g_s:\mathcal A_s\to\bar{\mathcal A}_{f(s)}$ map actions. A finite-MDP homomorphism preserves rewards and transition probabilities into each abstract state block:

$$
\bar r(f(s),g_s(a))=r(s,a),\qquad
\bar P(\bar s'\mid f(s),g_s(a))=\sum_{s':f(s')=\bar s'}P(s'\mid s,a).
$$

Continuous formulations require measurable maps and probability kernels, not a literal finite sum.

## Values and policy lifting

With the structural assumptions and appropriate action coverage, corresponding optimal values can be preserved. Lifting a policy requires allocating probability among original actions mapping to the same abstract action. A low-dimensional learned embedding does not automatically preserve rewards or transitions.

| Concept | Focus |
|---|---|
| State aggregation | Merging states while checking lost control information |
| Bisimulation | Equivalent reward and transition behavior |
| Homomorphism | Explicit state/action maps preserving dynamics |
| Automorphism | Invertible symmetry within one MDP |
| Approximate representation | Controlled errors requiring separate bounds |

Approximate abstraction errors can accumulate through discounting. Bounds depend on reward and transition distances, boundedness, and policy mapping; an embedding loss alone does not imply a control guarantee.

## Checking a learned representation

Compare rewards, successor distributions, and feasible actions near the same embedding. Check whether hidden velocity, contact, or goals still change the future. Symmetry experiments must transform actions as well as states. Data, model, and execution interfaces all matter.

Related reading: [SALE](/en/reading/p35/), [Markov states](/en/knowledge/markov-memory/), and [goal-conditioned RL](/en/knowledge/goal-conditioned/).


## Selected references from the source notes

- [Reference 1](https://proceedings.neurips.cc/paper_files/paper/2022/file/7f44f98e5e70dea605d0c5baca231c58-Paper-Conference.pdf])
- [Reference 2](https://proceedings.neurips.cc/paper_files/paper/2022/file/7f44f98e5e70dea605d0c5baca231c58-Paper-Conference.pdf)
