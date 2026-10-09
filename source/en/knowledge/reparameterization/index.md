---
{
  "title": "Reparameterization and Pathwise Gradients",
  "description": "Gaussian reparameterization, tanh density corrections, and the limits of pathwise differentiation.",
  "date": "2026-10-09 20:09:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/reparameterization/",
  "translation_path": "knowledge/reparameterization/",
  "notebook": {
    "slug": "reparameterization",
    "group": "policy",
    "sources": [
      "N036"
    ]
  },
  "layout": "post"
}
---

## Differentiate a fixed-noise path

For $x\sim\mathcal N(\mu_\theta,\sigma_\theta^2)$, write $x=\mu_\theta+\sigma_\theta\epsilon$ with parameter-independent $\epsilon\sim\mathcal N(0,1)$. Under conditions permitting differentiation through expectation,

$$
\nabla_\theta\mathbb E[f(x)]
=\mathbb E_\epsilon[\nabla_x f(x)\nabla_\theta x].
$$

Randomness remains, but the sampled path becomes differentiable in the parameters. Reusing noise for nearby parameter values also supports a finite-difference check.

## Compared with score-function estimators

REINFORCE uses $f(x)\nabla_\theta\log p_\theta(x)$ and need not differentiate the objective with respect to the sample. Pathwise estimation requires a differentiable sampling transform and objective. It often reduces variance, but there is no universal variance ordering for all distributions and objectives. Ordinary continuous pathwise gradients do not directly apply to categories; relaxations and straight-through estimators introduce their own tradeoffs.

## Squashed Gaussian policies

For $u=\mu(s)+\sigma(s)\epsilon$ and $a=\tanh u$,

$$
\log\pi(a\mid s)=\log\mathcal N(u;\mu,\sigma^2)-\sum_i\log(1-\tanh^2u_i).
$$

Scaling into actuator bounds adds the corresponding Jacobian constant. Use stable log-Jacobian calculations near saturation.

## Gradient boundaries in SAC

During an actor update, critic parameters can remain fixed while action derivatives of $Q(s,a)$ flow into the actor. Detaching the complete Q value destroys that path. Temperature updates normally detach the entropy residual so they do not inadvertently optimize the policy.

Check a Gaussian expectation with a known analytic gradient, then the squashing density, before integrating the estimator into SAC.

Related reading: [SAC and duality](/en/knowledge/sac-duality/) and [policy gradients](/en/knowledge/policy-gradients/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1312.6114)
- [Reference 2](https://arxiv.org/pdf/1312.6114)
- [Reference 3](https://arxiv.org/abs/1805.08498)
