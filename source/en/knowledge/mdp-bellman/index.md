---
{
  "title": "MDPs, Value Functions, and Bellman Errors",
  "description": "Bellman equations, MSBE, MSPBE, sampled TD errors, and double sampling.",
  "date": "2026-10-09 20:00:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/mdp-bellman/",
  "translation_path": "knowledge/mdp-bellman/",
  "notebook": {
    "slug": "mdp-bellman",
    "group": "foundations",
    "sources": [
      "N018",
      "N020"
    ]
  },
  "layout": "post"
}
---

## From an MDP to its value function

Use a discounted MDP $(\mathcal S,\mathcal A,P,r,\gamma,\mu_0)$, with transition kernel $P(ds'\mid s,a)$, expected reward $r(s,a)$, and $0\leq\gamma<1$. For a fixed policy,

$$
V^\pi(s)=\mathbb E_\pi\!\left[\sum_{t=0}^{\infty}\gamma^t r_t\mid s_0=s\right],\qquad
Q^\pi(s,a)=\mathbb E[r_0+\gamma V^\pi(s_1)\mid s_0=s,a_0=a].
$$

Conditioning on the first transition gives the Bellman expectation equation $V^\pi=T^\pi V^\pi$. The optimality operator maximizes over actions instead of averaging under a fixed policy. These population operators must be distinguished from individual sampled updates.

## Three different errors

| Object | Definition | Interpretation |
|---|---|---|
| Sample TD error | $\delta=r+\gamma V_\theta(s')-V_\theta(s)$ | Contains reward and transition noise |
| Bellman residual | $T^\pi V_\theta-V_\theta$ | A conditional expectation over successors |
| Projected residual | $\Pi_D T^\pi V_\theta-V_\theta$ | Uses a projection into the representable space |

The expected squared sample error is generally different from MSBE because it includes conditional variance. MSBE is $\|T^\pi V_\theta-V_\theta\|_D^2$; linear-function MSPBE is $\|\Pi_D T^\pi V_\theta-V_\theta\|_D^2$. The weighting $D$ is part of the definition. A small regression loss does not by itself establish accurate values or useful policy gradients.

![Geometry of Bellman and projected Bellman residuals](/images/notebook/bellman-projection.png)

*Diagram supplied with the notes: $T$ is the Bellman operator, $\Pi$ the projection. RMSBE and RMSPBE measure different distances.*

## Semi-gradients and double sampling

Ordinary TD treats its bootstrap target as constant when differentiating the current prediction. A true MSBE gradient involves a product of conditional expectations. Reusing one random successor for both factors generally creates bias; two conditionally independent successors are normally required, with exceptions such as deterministic transitions.

Linear TD instead targets a projected fixed point. GTD2/TDC use an auxiliary recursion to obtain MSPBE-related updates. Their guarantees depend on fixed-policy evaluation, linear features, coverage, moment assumptions, and step sizes; they do not establish convergence for arbitrary neural control algorithms.

## A useful diagnostic experiment

In a small MDP, compute exact values, MSBE, MSPBE, and sampled TD loss separately. Specify the policy and state weighting before interpreting their curves. The short Basic Concept source is fully contained in the Bellman Error source, so this edition combines them while retaining both source records.

Related reading: [GTD2/TDC](/en/reading/p34/), [extrapolation error](/en/knowledge/extrapolation/), and [convergence conditions](/en/knowledge/convergence/).


## Selected references from the source notes

- [Reference 1](https://icml.cc/Conferences/2009/papers/546.pdf)
- [Reference 2](https://arxiv.org/abs/1912.00304)
- [Reference 3](https://arxiv.org/abs/2106.08774)
