---
{
  "title": "Humanoid Robots: Control Dimensions, Symmetry, and Curriculum Recovery",
  "description": "Separate model coordinates from policy actions and validate contacts, resets, and recovery.",
  "layout": "post",
  "date": "2026-10-09 21:06:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/humanoid-training/",
  "tutorial": {
    "id": "T07",
    "group": "simulation",
    "references": [
      "mujoco-computation",
      "lab-actuators",
      "proto"
    ]
  }
}
---

## Maintain three name mappings

Separate simulator joint coordinates, actively controllable hardware joints, and the policy's action subset. A free base represented with a quaternion gives different position and velocity dimensions. Actuator counts need not equal joint counts. Hand variants, passive couplings, and action subsets require matching assets and mappings. This public guide does not inherit dimensions from a private model snapshot.

Record joint names, axes, zero positions, limits, control modes, action scales, effort bounds, and active/passive status. Bind the checkpoint to this table and the observation order. Matching tensor sizes alone does not ensure matching semantics.

## Symmetry is a modeling assumption

For sagittal reflection `S = diag(1,−1,1)`, center of mass transforms as `c' = Sc` and inertia as `I' = S I Sᵀ` in the same coordinates. Joint directions and action signs also need mappings. Equal masses alone do not establish symmetry. A mirrored model can support symmetry experiments while real hardware retains transmission, wiring, and manufacturing differences.

Static configuration checks, randomized mirror checks, short passive simulation, and stable locomotion establish different evidence. Placeholder visual meshes, finite values, or a stable free fall do not establish physical fidelity or gait quality.

## Curriculum and termination boundaries

Progress from standing to slow walking, turning, and terrain disturbances. Gate stages using fixed evaluations and explicit criteria, preserving failures. Reset root velocity, action history, filters, recurrent state, and counters. Fall detection needs terrain-relative height and orientation, together with a documented set of allowed body contacts.

| State | Restore for continuation | Document changes |
|---|---|---|
| Policy and value networks | Usually | Observation/action semantics |
| Optimizer and scheduler | For full continuation | Stage learning rate |
| Normalization statistics | According to protocol | Distribution changes |
| Policy distribution scale | Preserve or intentionally reset | std / log_std parameterization |
| Curriculum and environment | Depends on recovery granularity | Stage, random streams, reset |

## Official-source supplement and acceptance

MuJoCo distinguishes generalized position and velocity. Isaac Lab explains migration differences between implicit and explicit actuators. The pinned ProtoMotions overview requires compatible bodies, motion data, and policies. Validate a single joint and static contact before short standing, action-sign checks, and one stage transition. Resetting policy standard deviation is an experimental intervention and should be reported separately rather than assumed to be a generic repair.
