---
{
  "title": "Options, SMDPs, and Intra-Option Learning",
  "description": "Temporal abstraction, duration-dependent discounting, and experience shared across options.",
  "date": "2026-10-09 20:12:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/options/",
  "translation_path": "knowledge/options/",
  "notebook": {
    "slug": "options",
    "group": "adaptation",
    "sources": [
      "N026"
    ]
  },
  "layout": "post"
}
---

## Defining an option

An option is $o=(I_o,\pi_o,\beta_o)$: an initiation set, internal policy, and probabilistic termination rule. A primitive action is a one-step terminating special case. A high-level policy chooses options while internal policies generate physical actions.

## SMDP timing

An option lasting $\tau$ steps uses a duration-dependent target:

$$
Q(s,o)\leftarrow Q(s,o)+\alpha\left[\sum_{k=0}^{\tau-1}\gamma^k r_{t+k}+\gamma^\tau\max_{o'}Q(s_{t+\tau},o')-Q(s,o)\right].
$$

Different durations cannot all use a single-step discount. Genuine task termination removes the bootstrap. Markov options depend on current state; more general semi-Markov options can use execution history.

## Learning within an option

Intra-option learning uses intermediate transitions rather than waiting for completion and may update other options compatible with the observed action. A typical continuation value is

$$
U(s',o)=(1-\beta_o(s'))Q(s',o)+\beta_o(s')\max_{o'}Q(s',o').
$$

The target is $r+\gamma U(s',o)$. Reuse requires policy compatibility or appropriate correction; a transition is not automatically unbiased for every option. Option discovery, termination learning, and fixed-option value estimation are different problems.

## Robot interfaces

Specify high-level interruption rules, skill success/failure, accumulated rewards, occupied action time, and memory resets. A faster skill does not necessarily imply more frequent high-level decisions.

Related reading: [goal-conditioned learning](/en/knowledge/goal-conditioned/), [abstraction](/en/knowledge/mdp-abstraction/), and [research design](/en/knowledge/embodied-research/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1609.05140)
