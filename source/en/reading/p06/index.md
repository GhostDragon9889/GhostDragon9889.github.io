---
{
  "title": "SimBa: Simplicity Bias for Scaling Up Parameters in Deep Reinforcement Learning",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Running normalization and residual networks improve RL scaling; evidence and proxy limitations are examined.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p06/",
  "translation_path": "reading/p06/",
  "paper": {
    "id": "P06",
    "title": "SimBa: Simplicity Bias for Scaling Up Parameters in Deep Reinforcement Learning",
    "topic_id": "foundations",
    "year": "2025",
    "version": "2410.09754v2",
    "url": "https://arxiv.org/abs/2410.09754",
    "supplement": true,
    "summary_sha256": "fb83abf2df306a1287e9b506a4729d750968f4aeabca23484b865c2e5bfc7900"
  },
  "layout": "post"
}
---

## Identity and contribution

SimBa is an **RL network backbone**, not a new reward function, optimizer, or planner. Hojoon Lee, Dongyoon Hwang, and colleagues combine running input normalization, residual feedforward blocks, and output LayerNorm to make parameter scaling more useful in deep RL. The notes use the 33-page official supplement **arXiv:2410.09754v2**, May 29, 2025; the work appeared as an ICLR 2025 Spotlight.

The strongest evidence is improved returns under stated interaction budgets and normalization/critic-scaling ablations. The proposed simplicity-bias explanation uses a diagnostic proxy and correlations rather than a universal causal theorem.

## Three architectural mechanisms

Running-statistics normalization updates per-coordinate moments:

$$
\delta_t=o_t-\mu_{t-1},\qquad
\mu_t=\mu_{t-1}+\delta_t/t,
$$
$$
\sigma_t^2=\frac{t-1}{t}\left(\sigma_{t-1}^2+\frac{\delta_t^2}{t}\right),
\qquad \bar o_t=\frac{o_t-\mu_t}{\sqrt{\sigma_t^2+\epsilon}}.
$$

Here $t$ counts samples, not simply control cycles in a parallel environment. **Store raw observations in replay**, then apply consistent current statistics at training time. Storing independently normalized observations from different collection times gives identical physical values inconsistent meanings. Save normalization state with checkpoints.

After input projection, each residual block expands width $d_h$ to $4d_h$ and returns to $d_h$:

$$
h^{\ell+1}=h^\ell+W_2^\ell
\operatorname{ReLU}(W_1^\ell\operatorname{LN}(h^\ell)+b_1^\ell)+b_2^\ell.
$$

The identity path preserves information while a nonlinear branch learns corrections. A final $z=\operatorname{LN}(h^L)$ feeds the actor or critic head. RSNorm and LayerNorm normalize different axes. Because of the final normalization, the whole network is not a globally linear function.

SAC, DDPG, PPO, TD-MPC2, and METRA retain their underlying learning objectives; the architecture does not introduce a universal SimBa-specific loss.

## What the simplicity proxy measures

The paper defines frequency-weighted complexity and an initialization-based simplicity score:

$$
c(f)=\frac{\sum_k\tilde f(k)k}{\sum_k\tilde f(k)},
\qquad s(f)\approx\mathbb E_{\theta\sim\Theta_0}[1/c(f_\theta)].
$$

The diagnostic samples 100 initializations and 90,000 points on a 300×300 grid in $[-100,100]^2$, with a scalar output. It does not directly measure generalization of a 223-dimensional Dog controller or an 8,268-dimensional Craftax policy.

Across twelve approximately 4.5M-parameter architectures, reported correlations are **0.79** for the RSNorm subset and **0.54** overall. Text/caption say Pearson while a figure says Spearman; the statistic needs script verification. Removing RSNorm can raise the proxy while reducing return. **Independent analysis:** this is useful architectural evidence with explicit counterexamples, rather than proof that maximizing one score universally improves control.

## Benchmark scope and results

The continuous-control evaluation includes **51 tasks**: DMC 27, MyoSuite 10, HumanoidBench 14. Budgets are 500K steps for DMC Easy/Medium, 1M for Hard and MyoSuite, and 2M for HumanoidBench. Action repeat is two. HumanoidBench uses locomotion tasks with dexterous hands removed, not the full manipulation suite.

| Group | SAC + SimBa | SAC | BRO | TD-MPC2 |
|---|---:|---:|---:|---:|
| DMC Easy/Medium | 823.12 | 679.42 | 833.78 | 836.34 |
| DMC Hard | 706.13 | 135.68 | 693.40 | 491.33 |
| MyoSuite | 74.30% | 60.70% | 71.40% | 65.00% |
| HumanoidBench | 736.30 | 402.31 | 623.05 | 787.64 |

DMC reports returns, MyoSuite success percentages, and HumanoidBench task-normalized scores that can exceed 1,000. They cannot be summed or treated as one success metric. Dog Run improves from 36.86 to 544.86; Key Turn Hard remains at 7% versus BRO's 42%; Pose Hard remains at 0% for all compared methods. Seed counts differ between methods.

Backbone replacement adds approximately 570 return for SAC, 480 for DDPG, and 170 for a parameter-matched TD-MPC2 encoder on DMC-Hard. Craftax-Symbolic-v1 uses 8,268-dimensional symbolic observations, 43 actions, 1,024 parallel environments, and one billion steps. Approximate readings of its plots give score 28 versus 25 and iron-sword success 47% versus 18%; these are **manual plot estimates**, not exact tabulated values or percentages of the maximum score. METRA's ten-million-step Humanoid experiment measures spatial grid coverage, not visual skill learning or social suitability.

## Scaling, computation, and ablations

Default SAC uses a width-128, one-block actor and a width-512, two-block critic. Increasing critic width from 64 to 1,024 gives returns approximately 303, 391, 594, 706, and 722. Expanding the actor from 128 to 1,024 with a fixed critic decreases return from 706 to 648. Critic depth also has a nonmonotonic optimum. **Independent analysis:** a larger training-only critic can preserve a lighter deployed actor, but this is not an optimal-size theorem for multimodal VLA action experts.

RSNorm is stronger than the tested observation wrappers, fixed early statistics, and direct observation LayerNorm/BatchNorm. Main experiments use replay ratio two; additional tests use 2, 4, 8, or 16 under a fixed interaction budget. More updates cost computation without adding environment data. Resets every 500,000 gradient updates can provide further gains.

Timing uses the same RTX 3070 host. TD-MPC2 reaches a higher final HumanoidBench score but requires approximately 2.5 times SimBa's reported computation time. This does not mean each SimBa forward pass is faster than a small MLP or predict an Isaac Sim pipeline's speed. Dormant-neuron, rank, and feature-norm diagnostics likewise do not alone establish the entire causal mechanism.

## Reproduction and limits

SAC settings include learning rates $10^{-4}$, batch 256, AdamW $(0.9,0.999)$, weight decay 0.01, target momentum 0.005, initial temperature 0.01, and task-dependent discounts. Clipped double Q is enabled only for HumanoidBench in the stated configuration. PPO and TD-MPC2 use different backbone sizes.

**Proposed comparison:** fix algorithms, normalization, interaction, and update budgets; compare MLP, MLP+RSNorm, and SimBa, including parameter-matched cases. Report seeds, wall time, and deployed latency; freeze the testing-statistics policy. Bind the paper, code commit, and environment variant.

The paper principally studies state or symbolic single-task simulation. It does not establish RGB-D VLA performance, real-robot deployment, language understanding, or social-navigation safety. SimBa is a plausible state-fusion/value-head baseline for Isaac-based work, while perception, crowd generation, collision geometry, yielding, and personal-space evaluation remain separate research responsibilities.

## Source references

- [Source 1](https://arxiv.org/abs/2410.09754)
- [Source 2](https://sonyresearch.github.io/simba/)
- [Source 3](https://github.com/SonyResearch/simba)
- [Source 4](https://openreview.net/forum?id=jXLiDKsuDo)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
