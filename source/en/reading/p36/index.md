---
{
  "title": "High-Dimensional Continuous Control Using Generalized Advantage Estimation",
  "description": "TD-residual advantages, reward-to-go, lambda returns, and critic error.",
  "date": "2026-10-09 20:30:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p36/",
  "translation_path": "reading/p36/",
  "notebook": {
    "slug": "p36",
    "group": "classics",
    "sources": [
      "N013"
    ]
  },
  "featured": true,
  "paper": {
    "id": "P36",
    "title": "High-Dimensional Continuous Control Using Generalized Advantage Estimation",
    "year": "2015 / ICLR 2016",
    "version": "arXiv:1506.02438; version unspecified",
    "url": "https://arxiv.org/abs/1506.02438",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## Identity and contribution

Schulman and colleagues' GAE work links to arXiv:1506.02438, first posted in 2015 and associated with ICLR 2016. It studies advantage-estimation bias and variance alongside trust-region policy/value updates. GAE is an estimator, not a complete PPO or TRPO algorithm.

## TD-residual advantages

For a value estimate, $\delta_t^V=r_t+\gamma V(s_{t+1})-V(s_t)$ and

$$
\hat A_t^{GAE(\gamma,\lambda)}=\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}^V.
$$

Finite rollouts support a backward recurrence with correct terminal bootstrapping. Lambda zero uses one residual; lambda one gives return minus baseline under matching boundaries. Gamma defines discounted evaluation while lambda mixes residuals; they are not interchangeable smoothing parameters.

## Bias depends on the target

With an exact value function, the residual has the appropriate conditional advantage expectation. Approximate values introduce errors. Lower lambda increases bootstrap reliance; higher lambda retains future noise. Rollout truncation, horizons, rewards, and actor occupancy weighting all affect unbiasedness.

The paper's gamma-just formulation concerns a discounted gradient. If the desired objective is undiscounted, choosing gamma below one also changes the target. That effect must be distinguished from lambda/critic bias.

## Critics should support actor estimates

Low label MSE need not produce accurate policy gradients. State weighting and score directions determine which errors matter. Compatible-function theory has specific structural conditions rather than applying to every neural critic.

## Reproduction checks

Fix policy and rollout; check masks, old values, the recurrence, and detaches. Vary gamma/lambda and critic fitting while measuring direction, variance, and independent return. No original experiments were rerun.

Related reading: [traces](/en/knowledge/eligibility-traces/), [the gradient theorem](/en/reading/p37/), and [A Closer Look](/en/reading/p31/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1506.02438)
- [Reference 2](https://arxiv.org/pdf/1502.05477)
- [Reference 3](https://arxiv.org/abs/1509.02971)
- [Reference 4](https://arxiv.org/abs/1512.04455)
- [Reference 5](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
- [Reference 6](https://papers.neurips.cc/paper/2073-a-natural-policy-gradient.pdf)
