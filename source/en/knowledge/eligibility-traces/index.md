---
{
  "title": "Eligibility Traces and TD(λ)",
  "description": "Forward lambda returns, backward traces, online equivalence conditions, and episode boundaries.",
  "date": "2026-10-09 20:05:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/eligibility-traces/",
  "translation_path": "knowledge/eligibility-traces/",
  "notebook": {
    "slug": "eligibility-traces",
    "group": "policy",
    "sources": [
      "N024"
    ]
  },
  "layout": "post"
}
---

## From n-step returns to lambda returns

With a fixed value estimate, an n-step return combines rewards over n steps with a bootstrap at the nth state. The infinite-trajectory lambda return is

$$
G_t^\lambda=(1-\lambda)\sum_{n=1}^{\infty}\lambda^{n-1}G_t^{(n)},\qquad
G_t^\lambda-V(s_t)=\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}.
$$

A finite episode needs its final remaining Monte Carlo term. An unnormalized truncation of the infinite mixture is not equivalent. Zero lambda gives one-step TD; larger lambda spreads credit farther into the past.

## Backward traces

An accumulating tabular trace is $e_t(s)=\gamma\lambda e_{t-1}(s)+\mathbf1\{s=s_t\}$, followed by $V(s)\leftarrow V(s)+\alpha\delta_t e_t(s)$. Linear approximation replaces the indicator with features $\phi_t$. One TD error updates previously active states or features.

Replacing traces treat repeated visits differently. True-online TD(λ) uses Dutch traces and corrections to match a particular online forward view. Classical equivalence with a fixed-weight, offline lambda return must not be generalized to exact stepwise equivalence under arbitrary online parameter changes.

## Connection to GAE

GAE uses the same discounted residual sum for advantage estimation; TD(λ) typically updates values. Similar algebra does not make the optimization objectives identical. Smaller lambda increases bootstrap dependence, while larger lambda retains more future noise. Bias also depends on value accuracy, truncation, and the chosen discounted objective.

## Implementation boundaries

Reset traces at episode starts and use zero value after genuine termination. Handle external truncation with the actual final observation and appropriate bootstrap. Off-policy traces require the corresponding algorithm's importance or truncation corrections.

A short-chain MDP can compare forward mixtures and backward updates under fixed weights, before testing the effect of online updates.

Related reading: [GAE](/en/reading/p36/) and [sampling](/en/knowledge/sampling-replay/).


## Selected references from the source notes

- [Reference 1](https://icml.cc/Conferences/2005/proceedings/papers/112_TDLambdaNetworks_TannerSutton.pdf)
- [Reference 2](http://www.incompleteideas.net/book/7/node5.html#eqgoal)
- [Reference 3](https://arxiv.org/html/2312.12972v1)
