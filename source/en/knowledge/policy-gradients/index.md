---
{
  "title": "Policy Gradients, REINFORCE, and Surrogate Objectives",
  "description": "Derive the trajectory gradient and connect baselines, PPO clipping, and KL diagnostics.",
  "date": "2026-10-09 20:04:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/policy-gradients/",
  "translation_path": "knowledge/policy-gradients/",
  "notebook": {
    "slug": "policy-gradients",
    "group": "policy",
    "sources": [
      "N033",
      "N035",
      "N049"
    ]
  },
  "layout": "post"
}
---

## Deriving the trajectory gradient

For $J(\theta)=\mathbb E_{\tau\sim p_\theta}[\sum_{u=0}^{T-1}\gamma^u r_u]$, assume environment transitions have no direct dependence on policy parameters. Differentiating trajectory log probability leaves policy score terms. Past rewards can be removed by conditional independence, giving

$$
\nabla J(\theta)=\mathbb E\!\left[\sum_{t=0}^{T-1}\gamma^t\nabla_\theta\log\pi_\theta(a_t\mid s_t)G_t\right],\qquad
G_t=\sum_{l=0}^{T-t-1}\gamma^l r_{t+l}.
$$

The outer $\gamma^t$ is explicit. Other conventions absorb it into discounted occupancy; silently removing it while retaining the same objective changes the derivation.

## Baselines and variance

For a fixed state, $\mathbb E_a[\nabla\log\pi(a\mid s)b(s)]=0$ when the baseline is action-independent. A value baseline yields $A^\pi=Q^\pi-V^\pi$, although it is not necessarily optimal for every score-weighted variance criterion.

REINFORCE noise comes from long stochastic returns, policy scores, sparse success, and other agents. Reward-to-go removes irrelevant past rewards. Critics, GAE, and normalization further affect updates, with approximation error and finite-sample effects. Low value loss alone does not establish a good actor gradient.

## Surrogates and PPO

On fixed old-policy data, a common surrogate is $L(\theta)=\mathbb E_{\pi_{old}}[\rho_t\hat A_t]$, with $\rho_t=\pi_\theta/\pi_{old}$. PPO uses

$$
L^{clip}=\mathbb E\!\left[\min\bigl(\rho_t\hat A_t,\operatorname{clip}(\rho_t,1-\epsilon,1+\epsilon)\hat A_t\bigr)\right].
$$

Clipping limits beneficial surrogate incentives in selected directions. It is not a hard KL constraint or a guarantee of monotonic true-return improvement. Repeated optimization can make advantages and the old state distribution increasingly stale. Monitor KL, clip fraction, entropy, gradient scale, and independent evaluation return.

## Connecting theory to measurements

Evaluate gradient accuracy, true-value prediction, and surrogate/return alignment separately. A method can improve one while worsening another.

Related reading: [the original theorem](/en/reading/p37/), [GAE](/en/reading/p36/), [A Closer Look](/en/reading/p31/), and [multi-agent gradients](/en/knowledge/multiagent-gradients/).


## Selected references from the source notes

- [Reference 1](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
- [Reference 2](https://arxiv.org/abs/1506.02438)
- [Reference 3](https://arxiv.org/abs/1502.05477)
- [Reference 4](https://arxiv.org/abs/1707.06347)
- [Reference 5](https://arxiv.org/pdf/1707.06347)
