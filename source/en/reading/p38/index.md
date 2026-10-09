---
{
  "title": "Potential-Based Shaping and Q-Value Initialization are Equivalent",
  "description": "A Q-value shift explains conditional path equivalence between shaping and initialization.",
  "date": "2026-10-09 20:32:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p38/",
  "translation_path": "reading/p38/",
  "notebook": {
    "slug": "p38",
    "group": "classics",
    "sources": [
      "N015"
    ]
  },
  "paper": {
    "id": "P38",
    "title": "Potential-Based Shaping and Q-Value Initialization are Equivalent",
    "year": "2003",
    "version": "JAIR 2003; later arXiv entry 1106.5267",
    "url": "https://arxiv.org/abs/1106.5267",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## Shaping as an initialization change

Wiewiora's JAIR 2003 article relates potential shaping to Q initialization. The source's arXiv:1106.5267 is a later entry; its 2011 identifier is not the original publication year.

Let $F=\gamma\Phi(s')-\Phi(s)$, with shaped values $Q^F$. Initialize the unshaped learner by $Q^U_0=Q^F_0+\Phi(s)$.

## A Q-learning step

If $Q^U=Q^F+\Phi(s)$ before an update,

$$
\delta_U=r+\gamma\max_{a'}Q^U(s',a')-Q^U(s,a)
=r+\gamma\Phi(s')-\Phi(s)+\gamma\max_{a'}Q^F(s',a')-Q^F(s,a)
=\delta_F.
$$

Matching transition updates preserve the shift. Because it is constant across actions at one state, greedy ordering and appropriate advantage-based action selection can remain identical.

## Assumptions for path equivalence

Match initialization, step sizes, experience, randomness, and tie-breaking, and use action selection insensitive to statewise constant shifts. Neural approximators, Adam, clipping, or absolute-value-based exploration do not automatically inherit the tabular correspondence.

## Different from policy invariance

PBRS invariance follows from return boundary terms; this result concerns corresponding learning paths under additional assumptions. Terminal potentials and discounts still matter. Different parameterizations can produce different finite-training behavior and costs.

## A direct check

Run shaped and initialized tabular learners on identical transitions and check their statewise Q difference at every step, rather than comparing only final returns. This is a proposed check, not a rerun.

Related reading: [reward shaping](/en/knowledge/reward-shaping/) and [Bellman updates](/en/knowledge/mdp-bellman/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1106.5267)
