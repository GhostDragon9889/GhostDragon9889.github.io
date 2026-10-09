---
{
  "title": "Policy Gradient Methods for Reinforcement Learning with Function Approximation",
  "description": "Occupancy distributions, compatible features, and theoretical assumptions for approximation.",
  "date": "2026-10-09 20:31:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p37/",
  "translation_path": "reading/p37/",
  "notebook": {
    "slug": "p37",
    "group": "classics",
    "sources": [
      "N014"
    ]
  },
  "paper": {
    "id": "P37",
    "title": "Policy Gradient Methods for Reinforcement Learning with Function Approximation",
    "year": "1999",
    "version": "NeurIPS 1999 proceedings",
    "url": "https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## The theoretical question

Sutton, McAllester, Singh, and Mansour's NeurIPS 1999 paper connects stochastic policy gradients to function approximation. It avoids explicitly differentiating state visitation and identifies conditions under which a compatible value approximator preserves the gradient expectation.

## Objective and occupancy conventions

For fixed initial distribution and normalized discounted occupancy,

$$
\nabla_\theta J(\theta)=\frac1{1-\gamma}\mathbb E_{s\sim d^\pi,a\sim\pi_\theta}\left[\nabla_\theta\log\pi_\theta(a\mid s)Q^\pi(s,a)\right].
$$

Unnormalized occupancy absorbs the leading factor. Average-reward formulations need their own stationary-distribution and differential-value assumptions; they cannot be silently mixed with discounted identities.

## Compatible approximation

Use score features $\psi_\theta=\nabla_\theta\log\pi_\theta$ and $f_w=w^\top\psi_\theta$. Least-squares fitting under the theorem's matching weights and stationarity conditions yields the relevant residual orthogonality:

$$
\mathbb E\left[\psi_\theta(s,a)\bigl(Q^\pi(s,a)-f_w(s,a)\bigr)\right]=0.
$$

A state baseline can be handled separately. Compatibility is not simply shared actor/critic neural layers, and it does not make every approximate value estimator unbiased.

## Natural-gradient connection

Under corresponding weighting, $F=\mathbb E[\psi\psi^\top]$ relates to Fisher geometry, and fitted $w$ connects to $F^{-1}g$. Invertibility, regularization, distribution, and optimization accuracy must be stated. Natural and ordinary gradients differ geometrically, beyond a generic stability claim.

## Reading route

Begin with [trajectory likelihood](/en/knowledge/policy-gradients/), align weights through [occupancy](/en/knowledge/probability-measures/), then read [GAE](/en/reading/p36/) and [empirical scrutiny](/en/reading/p31/). The theorem gives a conditional exact relation; deep implementations need checks that its conditions hold.


## Selected references from the source notes

- [Reference 1](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
