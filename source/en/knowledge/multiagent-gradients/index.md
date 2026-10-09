---
{
  "title": "IPPO, COMA, and Multi-Agent Gradient Variance",
  "description": "Independent learning, centralized critics, counterfactual credit, and a bounded variance example.",
  "date": "2026-10-09 20:15:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/multiagent-gradients/",
  "translation_path": "knowledge/multiagent-gradients/",
  "notebook": {
    "slug": "multiagent-gradients",
    "group": "evaluation",
    "sources": [
      "N027",
      "N028"
    ]
  },
  "layout": "post"
}
---

## IPPO, COMA, and centralized critics

IPPO uses independent PPO updates, possibly with shared actor parameters. Other learners still change the effective environment. A strictly local critic should be distinguished from global-information CTDE configurations such as MAPPO. COMA uses a counterfactual baseline:

$$
A_i(s,\mathbf a)=Q(s,\mathbf a)-\sum_{a_i'}\pi_i(a_i'\mid o_i)Q(s,(\mathbf a_{-i},a_i')).
$$

It holds other actions fixed while averaging this agent's alternatives. MADDPG uses joint-information critics with deterministic actors. Their action spaces, estimators, and training information differ. The source filename's CMOA spelling is corrected to COMA, which its body actually discusses.

## Re-deriving the sparse-reward example

The source switches between rewarding all-equal actions and rewarding all-one actions and loses a Bernoulli derivative factor. The following is an independent correction, not a verification of the original paper's proof.

For independent $a_i\sim\mathrm{Bernoulli}(\theta_i)$ and $R=\mathbf1\{a_1=\cdots=a_N=1\}$, $J=\prod_i\theta_i$. At $\theta_i=1/2$, write $p=2^{-N}$:

$$
\hat g_i=2R,\qquad \mathbb E\hat g_i=2p,\qquad
\operatorname{Var}(\hat g_i)=4p(1-p),\qquad
\frac{\mathbb E\hat g_i}{\sqrt{\operatorname{Var}(\hat g_i)}}=\sqrt{\frac p{1-p}}.
$$

Nonzero updates occur with probability $p$. Signal-to-noise deteriorates even though absolute variance also decreases.

Rewarding both all-zero and all-one actions instead gives $J=\prod_i\theta_i+\prod_i(1-\theta_i)$, whose true gradient is zero at the symmetric point. The probability of strictly positive alignment with that gradient is therefore zero. Success probability still decays as $2^{1-N}$, but that is a different statement from gradient-direction alignment.

## Limits and evaluation

Central information can remove some hidden randomness, while approximation, dimension, and coverage remain obstacles. This example does not establish universal superiority over IPPO. Match parameter sharing, critic information, reward, budgets, and partner splits.

Related reading: [MARL benchmarks](/en/knowledge/multi-agent-benchmarks/) and [policy gradients](/en/knowledge/policy-gradients/).
