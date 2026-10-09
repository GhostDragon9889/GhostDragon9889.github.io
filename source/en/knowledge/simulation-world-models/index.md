---
{
  "title": "Simulators, World Models, and Planning",
  "description": "Experimental environments, learned dynamics, and internal rollout serve different roles.",
  "date": "2026-10-09 20:18:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "research",
  "permalink": "en/knowledge/simulation-world-models/",
  "translation_path": "knowledge/simulation-world-models/",
  "notebook": {
    "slug": "simulation-world-models",
    "group": "systems",
    "sources": [
      "N040"
    ]
  },
  "layout": "post"
}
---

## Distinguish roles and interfaces

A simulator executes an interactive environment, returning successor state, observations, and rewards. A world model represents or predicts dynamics for planning or imagination. Environment-side versus agent-side deployment and hand-written versus learned construction are common patterns, not absolute definitions.

$$
(s',o',r)\sim P(\cdot\mid s,a),\qquad
(\hat s',\hat o',\hat r)\sim\hat P_\theta(\cdot\mid s,a).
$$

A learned model can execute simulated rollouts, and an exact rule model can support agent search. Describe actual interfaces rather than classifying by physical location.

## Experience, planning, and error

Interaction generates experience, fitting compresses it, and internal rollout compares actions. Multi-step error can accumulate, especially when a planner chooses unsupported actions. One-step prediction accuracy alone does not establish reliable long-horizon control.

| Layer | Check |
|---|---|
| Environment | Dynamics, contacts, resets, sensors |
| Learned model | Coverage, uncertainty, multi-step error |
| Planner | Candidate actions, budgets, constraints, model exploitation |
| Execution | Fresh feedback, latency, command units |

## Generated 3D environments

Visual appearance, metric scale, collision geometry, object state, and controllable dynamics are distinct outputs. Explorable video does not automatically supply every robot interface. Format conversion alone cannot add missing physical information.

## A controlled comparison

Hold the controller fixed while changing appearance and geometry separately. Measure contacts, clearance, success, and policy-ranking changes. Compare model predictions against actual trajectories to distinguish visual consistency from control reliability.

Related reading: [experience-driven learning](/en/reading/p33/), [Lyra](/en/reading/p30/), [SAGE-3D](/en/reading/p29/), and [the roadmap](/en/knowledge/paperread-roadmap/).
