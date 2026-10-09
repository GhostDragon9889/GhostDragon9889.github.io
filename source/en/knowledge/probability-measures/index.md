---
{
  "title": "Probability Measures, Empirical Measures, and RL Occupancy",
  "description": "Probability kernels, trajectory laws, stationary distributions, and discounted occupancy measures.",
  "date": "2026-10-09 20:01:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/probability-measures/",
  "translation_path": "knowledge/probability-measures/",
  "notebook": {
    "slug": "probability-measures",
    "group": "foundations",
    "sources": [
      "N047",
      "N045"
    ]
  },
  "layout": "post"
}
---

## One probability framework

A measurable space $(\Omega,\mathcal F)$ specifies the events to which probabilities can be assigned. A probability measure is nonnegative, countably additive, and has total mass one. Random variables induce distributions on states, actions, and returns. Densities depend on a reference measure; a distribution need not have a density in a chosen representation.

An MDP transition $P(ds'\mid s,a)$ is a probability kernel: a probability measure in its successor argument and a measurable function of the conditioning state and action. Point probabilities and densities are different objects in continuous spaces.

## Time, stationary, and occupancy distributions

A fixed policy induces $P^\pi$, so $\mu_{t+1}=\mu_tP^\pi$. A stationary distribution solves $d=dP^\pi$. Existence, uniqueness, and convergence from arbitrary starts require additional assumptions; irreducibility, aperiodicity, and recurrent-class structure have different roles.

Normalized discounted occupancy is

$$
d^\pi_{\mu_0}(s)=(1-\gamma)\sum_{t=0}^{\infty}\gamma^t\Pr_\pi(s_t=s\mid\mu_0),\qquad
\rho^\pi(s,a)=d^\pi_{\mu_0}(s)\pi(a\mid s).
$$

It generally differs from the stationary law. Omitting $(1-\gamma)$ gives an unnormalized measure of mass $1/(1-\gamma)$. Gradient and performance identities must use the corresponding normalization consistently.

## Empirical measures and correlated experience

Given observations $x_1,\ldots,x_n$, the empirical measure is $\hat\mu_n=\frac1n\sum_i\delta_{x_i}$ and its expectation is the sample average. IID laws provide familiar limits, but trajectory observations are correlated. An IID standard-error formula or a count of transitions is not automatically an appropriate effective sample size.

| Distribution | Determined by | Typical use |
|---|---|---|
| Trajectory law | Initial state, policy, transition kernel | Likelihood-ratio gradients |
| Discounted occupancy | Initial state, policy, discount | Discounted performance identities |
| Stationary law | Fixed-policy Markov chain | Average-reward analysis |
| Replay/data law | Collection history and sampling rule | Off-policy fitting and coverage |

Replay randomization improves optimization but does not turn historical transitions into independent draws from the current policy. Annotating each expectation with its sampling distribution exposes silent changes of measure.

Related reading: [sampling and replay](/en/knowledge/sampling-replay/), [experimental statistics](/en/knowledge/statistics-tuning/), and [the policy-gradient theorem](/en/reading/p37/).


## Selected references from the source notes

- [Reference 1](https://sites.stat.washington.edu/jaw/RESEARCH/TALKS/BocconiSS/emp-prc-bk-big2.pdf)
- [Reference 2](https://ocw.mit.edu/courses/18-175-theory-of-probability-spring-2014/pages/lecture-slides/)
- [Reference 3](https://ethz.ch/content/dam/ethz/special-interest/mavt/dynamic-systems-n-control/idsc-dam/Lectures/Stochastic-Systems/Probability.pdf)
- [Reference 4](https://en.wikipedia.org/wiki/Empirical_measure)
- [Reference 5](https://en.wikipedia.org/wiki/Empirical_distribution_function)
- [Reference 6](https://www.columbia.edu/~ww2040/6711F12/lect0904.pdf)
