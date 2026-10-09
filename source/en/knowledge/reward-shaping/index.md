---
{
  "title": "Potential-Based Reward Shaping",
  "description": "Telescoping returns, policy invariance, terminal potentials, and reward-scale caveats.",
  "date": "2026-10-09 20:11:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/reward-shaping/",
  "translation_path": "knowledge/reward-shaping/",
  "notebook": {
    "slug": "reward-shaping",
    "group": "foundations",
    "sources": [
      "N038"
    ]
  },
  "layout": "post"
}
---

## Why shaping can change a task

Distance, contact, and intermediate rewards may provide useful feedback, but can also change the preferred behavior. Repeatedly collecting an intermediate reward through a loop need not solve the original task. Higher shaped return is not automatically higher task success.

## Potential-based rewards

With a state potential and the task's discount,

$$
F(s,a,s')=\gamma\Phi(s')-\Phi(s),\qquad r'=r+F.
$$

The shaping return telescopes:

$$
\sum_{t=0}^{T-1}\gamma^tF_t=-\Phi(s_0)+\gamma^T\Phi(s_T).
$$

For bounded potentials in infinite discounted tasks, the final term vanishes. In episodic tasks, true terminal potentials are commonly set to zero. If the boundary term varies with the policy, invariance cannot be asserted without additional treatment. External truncation is different from task termination.

Under the relevant conditions, $Q'^\pi(s,a)=Q^\pi(s,a)-\Phi(s)$. The shift is identical across actions at a state, preserving their ordering.

## Connection to initialization

A shaped learner and an unshaped learner initialized with $Q_0+\Phi(s)$ can retain a Q-value shift under matching updates and advantage-based action selection. Path equivalence requires aligned data, randomness, tie-breaking, and algorithm assumptions; see [Wiewiora's note](/en/reading/p38/). Optimal-policy invariance is a different claim from identical learning trajectories.

## Implementation records

Record original rewards, shaping rewards, and task-success events separately. Evaluate the original task. Reward rescaling changes critic gradients and relative entropy weighting, so ideal action-order invariance does not establish identical finite-training behavior.

Related reading: [MDPs](/en/knowledge/mdp-bellman/), [SAC](/en/knowledge/sac-duality/), and [evaluation](/en/knowledge/evaluation-protocol/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1106.5267)
- [Reference 2](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)
- [Reference 3](https://arxiv.org/abs/2201.03544)
