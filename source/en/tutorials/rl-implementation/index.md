---
{
  "title": "RL Implementation: Objectives, Masks, and Gradient Paths",
  "description": "Turn PPO/GAE, TD, centralized training, and representations into inspectable interfaces.",
  "layout": "post",
  "date": "2026-10-09 21:02:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/rl-implementation/",
  "tutorial": {
    "id": "T03",
    "group": "learning",
    "references": [
      "torch-autograd",
      "lab-scene"
    ]
  }
}
---

## Align the objective and sampling distribution

Discounted, average-reward, and finite-horizon objectives use different occupancy conventions. A policy-gradient baseline must be independent of the current action. Estimated advantages are normally treated as fixed actor weights. Critic error does not automatically imply biased actor gradients: its expected correlation with the policy score matters. Follow the existing notes on [policy gradients](../../knowledge/policy-gradients/), [TD and projection](../../knowledge/mdp-bellman/), and [GTD2/TDC](../../reading/p34/).

PPO ratios use log-probabilities recorded by the behavior policy. Reduce multidimensional log-probabilities along the correct action axis. Old log-probabilities and advantage estimates must remain fixed across policy updates. Clipping the surrogate does not enforce a bound on every ratio or guarantee monotonic return improvement.

## GAE needs two boundary masks

True termination normally prevents bootstrapping. A time-limit reset in a continuing task can bootstrap from the final observation, while the recursive advantage must stop before the next episode. A horizon that defines the task itself can instead be a true terminal boundary.

```python
def gae(reward, value, next_value, terminated, reset, gamma, lam):
    # All arrays: [time, environment]. next_value uses final observations.
    import numpy as np
    advantage = np.zeros_like(reward, dtype=float)
    carry = np.zeros(reward.shape[1], dtype=float)
    for t in range(len(reward) - 1, -1, -1):
        delta = reward[t] + gamma * (~terminated[t]) * next_value[t] - value[t]
        carry = delta + gamma * lam * (~reset[t]) * carry
        advantage[t] = carry
    return advantage
```

Both masks must be boolean arrays. `reset` includes termination and truncation that resets the environment. The final rollout step can still bootstrap through `next_value`; an automatically reset observation cannot replace the previous episode's final observation.

## Specify information and update boundaries

CTDE can give the training critic extra information, while deployed actor inputs must remain available. Record neighbor masks, death masks, recurrent resets, and task changes. TD3, TD7, SimBa, Dual Goal, Meta-RL, and streaming methods require separate value targets, representation losses, frozen copies, parameter-update scopes, and sampling sources. Network names do not make them interchangeable. The [study notebook](../../notes/) provides the detailed theory and literature.

## Official-source supplement and acceptance

Autograd documentation supports checks of detachment and leaf gradients. Isaac Lab's InteractiveScene tutorial explains replicated scenes and shared assets. Entity slots, sensor batches, and independent complete environments require separate counts. The GAE function is educational; other algorithms are not presented as newly tested implementations.

Use two environments with a terminal transition and a truncated transition to inspect returns and final observations. Then check action reductions, finite gradients, and actor/critic update scopes. Distinguish TD residuals, Bellman error, value error, and task return. Continue with [GAE](../../reading/p36/) and the [evaluation protocol](../../knowledge/evaluation-protocol/).
