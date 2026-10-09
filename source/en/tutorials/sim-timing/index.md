---
{
  "title": "Simulation Timing, NavMesh Updates, and Profiling",
  "description": "Separate physics, control, sensing, and rendering clocks and isolate startup costs.",
  "layout": "post",
  "date": "2026-10-09 21:05:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/sim-timing/",
  "tutorial": {
    "id": "T06",
    "group": "simulation",
    "references": [
      "lab-articulation",
      "lab-articulation-code",
      "lab-scene",
      "usd-glossary"
    ]
  }
}
---

## Record four independent schedules

Physics advances by `dt_p`. Updating control every `k` steps gives a control interval of `k·dt_p`; sensors and rendering can have separate schedules. Frame rate is not physics frequency. The real-time factor is elapsed simulation time divided by elapsed wall time. Record completed steps rather than only the requested frequency.

## Official-code supplement: command and cache order

The pinned Isaac Lab articulation example sets targets, calls `write_data_to_sim()`, advances with `sim.step()`, and refreshes state with `robot.update(dt)`. Reset restores root pose, root velocity, and joint state and clears internal caches. This pseudocode describes ordering rather than a universal cross-version launcher.

```text
if reset_required:
    restore root pose, root velocity, joint state
    reset controller history and asset caches
set control targets
write commands to simulator
step physics
refresh asset state buffers
sample observations on their scheduled ticks
```

Give each physics instance a single state owner. Kinematic pose writes and dynamic control should not compete over the robot. Specify when commands take effect and observations are sampled.

## Separate navigation and contact representations

NavMesh describes traversable surfaces, colliders participate in contact, and visual meshes provide appearance. Fine wheel geometry rarely needs a separate high-level navigation obstacle for every visual part. Measure state notifications, dynamic-obstacle maintenance, and baking separately; a slowdown does not prove complete rebaking every frame.

Reparented visual geometry must preserve world transforms and fixed assembly relationships. Read current backend buffers rather than stale static properties. After simplifying representations, check reset, collision bindings, and navigation interaction.

## Use a profiling matrix

Separate downloads, shader processing, collision preparation, and steady execution. In the same scene, add input reading, control conversion, joint commands, sensors, pedestrians, and synchronization incrementally. Measure CPU/GPU, physics, and rendering cost and change one factor at a time.

A suddenly enormous bounding box calls for finding the first non-finite state, penetration, or constraint failure. A busy thread requires call-stack evidence. Callback signature errors, missing shaders, and synchronous resource calls belong to the [versioned debugging workflow](../reproducible-debugging/). They cannot all be attributed to the physics solver. Without running the target simulator, these remain diagnostic procedures.
