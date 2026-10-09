---
{
  "title": "Contractions, Fixed Points, and Stochastic Approximation",
  "description": "Separate deterministic Bellman contraction from convergence conditions for noisy recursions.",
  "date": "2026-10-09 20:02:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/convergence/",
  "translation_path": "knowledge/convergence/",
  "notebook": {
    "slug": "convergence",
    "group": "foundations",
    "sources": [
      "N023"
    ]
  },
  "layout": "post"
}
---

## Deterministic fixed points

On a complete metric space, a map satisfying $d(Tx,Ty)\leq c\,d(x,y)$ with $0\leq c<1$ has a unique fixed point. Banach's theorem gives convergence of $x_{k+1}=Tx_k$ and the bound $d(x_k,x^*)\leq c^k d(x_0,x^*)$. Completeness and a strict contraction coefficient are substantive assumptions.

Finite discounted-MDP expectation and optimality operators are $\gamma$-contractions in the sup norm. This argument does not directly cover average-reward or general undiscounted problems. A projection associated with approximation may also change the norm and contraction properties.

## Noisy root finding

A stochastic approximation has the form

$$
x_{k+1}=x_k+\alpha_k\bigl(h(x_k)+M_{k+1}\bigr),\qquad
\sum_k\alpha_k=\infty,\quad \sum_k\alpha_k^2<\infty.
$$

Noise needs suitable martingale-difference or Markov-noise conditions and moment bounds. Step sizes alone do not establish convergence: bounded iterates, stability of the mean field, asynchronous visitation, and coverage must also be addressed. Constant step sizes normally retain fluctuations rather than giving exact asymptotic convergence.

## Different mathematical roles

| Concept | Role | Limit |
|---|---|---|
| Contraction | Shrinks distances under iteration | Does not fully analyze noisy updates |
| Banach theorem | Existence, uniqueness, and deterministic iteration | Does not establish neural optimization success |
| Robbins–Monro | Finds roots through stochastic observations | Requires noise, stability, and step-size assumptions |
| Dvoretzky-type results | Control specific stochastic recursions | Do not imply arbitrary nonlinear off-policy convergence |

## Applying the argument to RL

Tabular Q-learning needs visitation and step-size conditions for each state–action pair. Linear TD needs a stated sampling policy and norm; off-policy bootstrapping with approximation can destabilize ordinary TD. Two-timescale methods additionally require a separation between fast and slow recursions.

A stable learning curve is not a proof. A useful demonstration starts with exact value iteration, then introduces sample noise, a constant step size, or missing coverage to identify where each guarantee stops applying.

Related reading: [Bellman errors](/en/knowledge/mdp-bellman/) and [GTD2/TDC](/en/reading/p34/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/pdf/2202.05959)
- [Reference 2](https://proceedings.neurips.cc/paper/1993/file/5807a685d1a9ab3b599035bc566ce2b9-Paper.pdf)
