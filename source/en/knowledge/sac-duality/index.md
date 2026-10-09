---
{
  "title": "Maximum-Entropy RL, SAC, and Dual Temperature Updates",
  "description": "Merge five notes and correct temperature-gradient signs and the off-policy/offline distinction.",
  "date": "2026-10-09 20:10:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/sac-duality/",
  "translation_path": "knowledge/sac-duality/",
  "notebook": {
    "slug": "sac-duality",
    "group": "policy",
    "sources": [
      "N046",
      "N039",
      "N051",
      "N043",
      "N044"
    ]
  },
  "layout": "post"
}
---

## Entropy and the soft target

Maximum-entropy RL adds temperature-weighted policy entropy to return. A common twin-critic SAC target is

$$
y=r+\gamma(1-d)\left[\min_j Q_{\bar\theta_j}(s',a')-\alpha\log\pi_\phi(a'\mid s')\right],
\qquad a'\sim\pi_\phi.
$$

The critic fits this target. The actor minimizes $\mathbb E[\alpha\log\pi_\phi(a\mid s)-\min_jQ_{\theta_j}(s,a)]$. Taking a minimum mitigates some overestimation; it does not prove unbiased values. SAC variants with an explicit value network should be distinguished from later implementations without it.

## Temperature as a dual variable

The constraint $\mathbb E[-\log\pi]\geq\mathcal H_{target}$ introduces nonnegative $\alpha$. With a fixed policy,

$$
J(\alpha)=\mathbb E[-\alpha(\log\pi(a\mid s)+\mathcal H_{target})],\qquad
\partial_\alpha J=\mathcal H(\pi)-\mathcal H_{target}.
$$

Entropy above target gives a positive gradient, so descent reduces temperature; low entropy increases it. A source note reversed this sign interpretation. Continuous differential entropy may be negative, making discrete-entropy intuition inappropriate for negative target entropy.

Setting $\alpha=\exp\eta$ enforces positivity. The exact derivative of $J(\exp\eta)$ includes an alpha factor. A common log-temperature surrogate omits it, preserving fixed points but changing update scaling. Document the actual loss, detach boundaries, and target.

## General dual optimization

Inner primal optimization and multiplier updates follow a stated Lagrangian convention. “Dual ascent” and “dual descent” cannot be compared without that convention. Strong duality and convex guarantees do not automatically apply to joint neural-policy training.

## Corrections retained in this edition

Standard SAC is an online off-policy algorithm; fixed offline data require additional coverage treatment. Untraceable source claims of 40% speedup or 2.3-fold success are not promoted into this edition. A sampleable implicit policy also needs the required density calculations to use the standard entropy objective.

Related reading: [reparameterization](/en/knowledge/reparameterization/), [sampling](/en/knowledge/sampling-replay/), and [extrapolation](/en/knowledge/extrapolation/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1801.01290)
- [Reference 2](http://arxiv.org/abs/1812.05905)
- [Reference 3](https://github.com/haarnoja/sac)
- [Reference 4](https://arxiv.org/abs/1802.09477)
