---
{
  "title": "On-Policy Sampling, Off-Policy Learning, and Replay",
  "description": "Merge duplicate notes and distinguish behavior policies, target policies, and distribution shift.",
  "date": "2026-10-09 20:03:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/sampling-replay/",
  "translation_path": "knowledge/sampling-replay/",
  "notebook": {
    "slug": "sampling-replay",
    "group": "foundations",
    "sources": [
      "N031",
      "N032",
      "N037"
    ]
  },
  "layout": "post"
}
---

## Behavior and target policies

The behavior policy $b$ generates data; the target policy $\pi$ is being evaluated or optimized. On-policy updates use appropriately matched policy data. Off-policy learning allows a difference. Replay is a storage and sampling mechanism, rather than an algorithm category. The two byte-identical replay/on-policy source notes are combined here.

| Data mechanism | Common use | Required record |
|---|---|---|
| Current-policy rollout | REINFORCE, PPO | Collection policy and old log probabilities |
| Historical replay | DQN, TD3, SAC | Sources, capacity, sampling, updates per transition |
| Fixed offline dataset | Offline RL | Support, quality, and any added interaction |

An online off-policy algorithm can continually collect new transitions. Offline learning has a fixed-data coverage problem. Replay support alone does not establish reliable offline training.

## Three changes of distribution

The action importance ratio $\rho_t=\pi(a_t\mid s_t)/b(a_t\mid s_t)$ requires behavior-policy support. It corrects a conditional action distribution but does not automatically replace state occupancy $d^b$ with $d^\pi$. Trajectory, per-decision, and truncated corrections have different variance and bias.

Replay randomization reduces adjacent-sample dependence while mixing historical policies. Prioritized replay introduces another sampling distribution. Weights correcting prioritized sampling serve a different purpose from policy importance ratios. The priority-replay source file was empty, so it is not presented as a separate substantive article.

## Episode boundaries and bootstrap

External time-limit truncation in a continuing task normally bootstraps from the actual final observation. A genuine terminal transition has zero bootstrap. If the horizon is part of the finite-horizon task, remaining time and task semantics must be represented appropriately. Automatic resets can return a new episode's initial observation, which must not replace the preceding final observation in a target.

## Implementation records

Store behavior versions, old probabilities, termination type, final observations, replay sampling rules, and experience age. Report environment transitions and gradient updates separately; identical interaction budgets do not guarantee identical wall time.

Related reading: [occupancy measures](/en/knowledge/probability-measures/), [extrapolation](/en/knowledge/extrapolation/), and [evaluation protocols](/en/knowledge/evaluation-protocol/).


## Selected references from the source notes

- [Reference 1](https://www.incompleteideas.net/papers/PSS-00.pdf)
- [Reference 2](https://arxiv.org/abs/1205.4839)
- [Reference 3](https://incompleteideas.net/papers/SSM-nips08.pdf)
