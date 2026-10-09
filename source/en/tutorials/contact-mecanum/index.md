---
{
  "title": "Minimal Experiments for Contact and Mecanum Wheels",
  "description": "Inspect collision proxies, roller axes, support envelopes, and wheel-speed conventions.",
  "layout": "post",
  "date": "2026-10-09 21:04:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/contact-mecanum/",
  "tutorial": {
    "id": "T05",
    "group": "simulation",
    "references": [
      "mujoco-model",
      "mujoco-computation",
      "lab-actuators"
    ]
  }
}
---

## Choose contact geometry first

Visual detail need not all participate in contact. Spheres, boxes, and capsules suit regular parts; convex hulls can fill recesses; decomposition adds subshapes; multi-sphere fitting needs a continuous support envelope. Support for dynamic triangle meshes, SDFs, and kinematic bodies depends on backend and version. Rules from one engine cannot be assumed in another.

| Local experiment | Hold fixed | Observe |
|---|---|---|
| A resting roller | Mass, gravity, timestep | Settling and penetration |
| Slow wheel rotation | Friction, load, drive | Vertical oscillation, wheel speed |
| Chassis lateral motion | Wheel order, geometry, command | Direction, yaw, slip |
| Selected self-contact enabled/disabled | The same pose | Contact pairs and constraint cost |

## Derive wheel signs from geometry

For chassis velocity `(vx, vy, wz)` and wheel center `(xi, yi)`, the center velocity is `(vx − wz·yi, vy + wz·xi)`. Project it onto the constraint direction defined by that wheel's roller arrangement and divide by the effective radius. Wheel order, joint-axis signs, and roller mounting change the mapping. Test each wheel with a small command before checking forward, lateral, and rotational motion.

Rollers generally need passive rotation about their own axes. Fixing them rigidly or driving the wrong joint changes the contact constraint. A multi-sphere envelope with a periodically changing support radius can induce vertical oscillations despite a smooth visual mesh.

## Official-source supplement: actuator choice matters

Isaac Lab distinguishes implicit physics-engine drives from explicit actuator models that compute applied efforts. Identical position targets and PD numbers need not produce identical closed-loop dynamics. MuJoCo documentation explains contact, constraint solving, and integration; record the backend, integrator, timestep, and constraint configuration separately.

Treat friction, damping, and solver iterations as controlled variables after diagnosing the problem. Exclude incorrect axes, initial penetration, and duplicate constraints first, compare collision geometry next, and tune solver settings last. Smaller timesteps increase cost; higher friction does not automatically remove vibration.

## Acceptance criteria

Report contact error, vertical motion, velocity tracking, slip, and execution cost. Separate startup geometry processing from steady-state performance. A simplified navigation obstacle can coexist with detailed physical contact, but all representations need consistent transforms. These are experiment designs, not universal recommendations for sphere counts, friction, or iteration counts.
