---
{
  "title": "Single-Agent RL Benchmarks and Metrics",
  "description": "Consolidate five reports across control, visual generalization, offline datasets, and embodied tasks.",
  "date": "2026-10-09 20:22:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "evaluation",
  "permalink": "en/knowledge/single-agent-benchmarks/",
  "translation_path": "knowledge/single-agent-benchmarks/",
  "notebook": {
    "slug": "single-agent-benchmarks",
    "group": "evaluation",
    "sources": [
      "N001",
      "N002",
      "N003",
      "N004",
      "N005"
    ]
  },
  "layout": "post"
}
---

## Select a benchmark from the claim

This edition consolidates five overlapping reports. A benchmark includes tasks, observations, actions, rewards, versions, budgets, and testing. Higher return in a fixed environment alone does not establish visual generalization, robot reliability, or lower compute.

| Family | Useful for | Protocol to fix |
|---|---|---|
| Classic Control/Box2D | Debugging and light control | Environment ID, horizon, reward |
| MuJoCo/DM Control | Continuous control and efficiency | Model version, state/pixel inputs, action repeat |
| ALE/Atari | Visual decisions and exploration | Sticky actions, action set, frame skip, evaluation mode |
| Procgen/MiniGrid/BabyAI | Generated-task generalization | Training/test levels and task conditions |
| Meta-World/robosuite/RLBench | Contact manipulation and multitask learning | Task set, success, controller, demonstrations |
| D4RL/Minari datasets | Fixed-data offline learning | Dataset versions, converted semantics, score references |
| Safety-Gymnasium | Costs and constraints | Cost definition, budget, violations |
| Habitat/CARLA | Navigation/driving transfer | Scenes, sensors, challenge version |

Framework names do not identify complete experiments. Migrated datasets need checks of termination fields and normalization references against their original protocol.

## Additional suites and systems

DeepMind Lab, Retro, Crafter, and MineRL cover visual exploration, long-horizon behavior, or historical game protocols. Specify versions and dependencies. Isaac Lab, ManiSkill, MuJoCo Playground, Genesis, HumanoidBench, and MyoSuite offer different embodied interfaces and model assumptions. GPU simulation support alone does not establish lower cost for every task.

Unity ML-Agents, PySC2/SC2LE, and Google Research Football can involve teams or competition; disclose the agent's controlled units. Hardware requirements should be measured for the chosen configuration rather than inferred from context-free throughput numbers.

| Claim | Measurements |
|---|---|
| Sample efficiency | Fixed-transition performance, shared-interval AUC, threshold budget |
| Generalization | Held-out tasks/scenes/levels and train–test gap |
| Manipulation | Original success, contacts, recovery, actual task time |
| Stability | All seeds, failure frequency, intervals, curves |
| System efficiency | Transitions, updates, wall time, hardware, complete overhead |
| Constraints | Reward, cost, violations, operational definitions |

The common expression $100(R-R_{random})/(R_{reference}-R_{random})$ requires benchmark-specific reference scores; it is not a universal normalization standard.

## A practical sequence

Debug a small task, choose a suite matching the central claim, then examine external-task scope. Preserve packages, versions, maps/models, wrappers, resets, termination, seeds, and budgets.

Related reading: [MARL benchmarks](/en/knowledge/multi-agent-benchmarks/), [statistics](/en/knowledge/statistics-tuning/), and [protocols](/en/knowledge/evaluation-protocol/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1709.06560)
- [Reference 2](https://ale.farama.org/getting-started/)
- [Reference 3](https://ale.farama.org/index.html)
- [Reference 4](https://github.com/google-deepmind/dm_control)
- [Reference 5](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)
- [Reference 6](https://gymnasium.farama.org/environments/mujoco/)
