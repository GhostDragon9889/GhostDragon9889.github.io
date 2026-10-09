---
{
  "title": "NavDP: Learning Sim-to-Real Navigation Diffusion Policy with Privileged Information Guidance",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Privileged simulation supervision and candidate scoring train an RGB-D generative navigation policy.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p24/",
  "translation_path": "reading/p24/",
  "paper": {
    "id": "P24",
    "title": "NavDP: Learning Sim-to-Real Navigation Diffusion Policy with Privileged Information Guidance",
    "topic_id": "navigation-worlds",
    "year": "2025",
    "version": "2505.08712v3",
    "url": "https://arxiv.org/abs/2505.08712",
    "supplement": false,
    "summary_sha256": "0d6de4fef2063b3a8da24c32e3c59e37f3e48b181740b4d6c04e21ae4c8f086f"
  },
  "layout": "post"
}
---

## Identity and contribution

Wenzhe Cai, Jiaqi Peng, and colleagues propose NavDP. The notes use **arXiv:2505.08712v3**, December 24, 2025; the repository identifies ICRA 2026. The method combines large simulated navigation demonstrations, conditional trajectory diffusion, and privileged geometry-based candidate scoring.

Complete maps/ESDFs provide **training labels**, while deployment uses local RGB-D and optional 2D goals. “Mapless” describes the deployed policy, not the demonstration engine.

## Data engine and embodiment assumptions

A cylinder/differential-drive robot has safety radius **0.25 m**, randomized height **0.25–1.25 m**, and height-linked camera pitch. Camera height also proxies body clearance; this can fail for mid-body cameras, extended arms, or carried objects.

Geometry is voxelized at five centimeters, sliced by navigation/obstacle heights, converted to ESDF, and planned at twenty-centimeter resolution with A*, clearance refinement, and cubic splines. Published threshold descriptions do not uniquely specify every ground/top/interval rule; actual code is needed to avoid incorrectly blocking under-table space.

Scenes come from 3D-FRONT, HSSD, HM3D, Replica, Gibson, and Matterport3D, rendered with BlenderProc and randomized views/light/textures. The table reports **3,154 scenes, 1,627.1 km, 452 hours, forty million images**, and over 200K trajectories. Reported production throughput is specific to its hardware/process.

## Conditional generation and scoring

Defaults use eight RGB-history frames, current depth, twenty-four waypoints, and ten diffusion steps. Goal-free behavior zeros the goal embedding. The interface is:

$$
\tau^{(j)}\sim p_\theta(\tau\mid o_t,g_t),
\qquad j^*=\arg\max_jV_\theta(o_t,\tau^{(j)}).
$$

The scorer is a **supervised geometric evaluator**, not necessarily a TD-learned long-term RL critic or calibrated collision probability.

Depth Anything RGB features and a trained depth ViT are compressed into a short sequence; valid depth is 0.1–5 m. History helps when an obstacle leaves view before the robot's rear clears it, but is not long-term mapping. Shared Transformer bodies support both noise prediction and trajectory scoring. Rotated candidate paths create collision negatives.

## Formula boundaries

The stored scoring label sums ESDF differences plus near-obstacle indicators. It does not specify all coefficient signs/values. Under a higher-is-better interpretation, the near-obstacle term needs a penalty direction, which must be verified rather than assumed. The difference sum telescopes to an endpoint difference and cannot alone summarize intermediate risk.

The printed supervised scoring loss is a **signed residual without an explicit square/absolute value**. Direct minimization would not be a proper regression objective. The notes flag this exact PDF wording instead of silently replacing it with MSE; reproduction should inspect the implementation. Standard DDPM equations in the notes are explanatory expansions of the paper's compact notation.

Joint training uses batch 2,048, learning rate $10^{-4}$, and **32 A100s for 24 hours**, approximately 768 device-hours. Reusing released weights does not require repeating that budget.

## Evidence and ablations

| Evaluation | Comparator | NavDP |
|---|---:|---:|
| Simulation PointGoal success | ViPlanner 60.9% | 67.2% |
| Simulation PointGoal SPL | 58.6 | 62.6 |
| Real PointGoal success | 53.3% | 76.7% |
| Simulation goal-free time to collision | NoMaD 36.6 s | 106.2 s |
| Simulation exploration area | 85.7 | 274.1 |
| Real goal-free time to collision | 29.3 s | 112.9 s |

Simulation includes 2,000 PointGoal and 1,000 NoGoal episodes. Real quantified comparisons use limited trials across Turtlebot4, Go2, and G1. Collision-free duration is higher-is-better, unlike time to goal. The table-derived exploration-area ratio is about 3.20, slightly different from the rounded narrative.

Removing depth reduces home/commercial success **60.3/74.1%→47.8/66.1%**; removing RGB gives 53.9/70.3%; single-frame RGB gives 56.9/72.0%. Random candidate selection reduces it to 53.1/65.6%. Training only low-height embodiments reduces a tall R1's under-table-scene performance from 90% to 20%. These support the interfaces and data coverage, not arbitrary embodiment transfer guarantees.

## Limits and project use

Static planned data dominate training. Pedestrian demos do not establish learned yielding norms, comfort, group behavior, or dynamic safety. Local history cannot solve full exploration memory; natural-language goals and efficient post-training remain directions.

**Project proposal:** keep perception, generation, scoring, and tracking visible as separate interfaces. Evaluate static contacts, dynamic contacts, proximity, plan timing, and sensor age. A mecanum platform still needs a compatible waypoint-to-velocity controller. Bind camera/depth units, history gaps, goals, robot clearance, actual scoring loss, and repository commit. Later HTTP/asynchronous/MPC infrastructure affects measured behavior and should be recorded separately. No experiments were rerun in the source export.

## Source references

- [Source 1](https://arxiv.org/abs/2505.08712)
- [Source 2](https://arxiv.org/pdf/2505.08712v3)
- [Source 3](https://github.com/InternRobotics/NavDP)
- [Source 4](https://wzcai99.github.io/navigation-diffusion-policy.github.io/)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
