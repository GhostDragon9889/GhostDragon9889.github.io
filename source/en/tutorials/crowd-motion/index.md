---
{
  "title": "Interfaces for Crowd Behavior, Body Motion, and Physical Control",
  "description": "Separate intent, paths, body references, and execution, with explicit motion/policy dependencies.",
  "layout": "post",
  "date": "2026-10-09 21:09:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/crowd-motion/",
  "tutorial": {
    "id": "T10",
    "group": "navigation",
    "references": [
      "proto",
      "lab-actuators",
      "mujoco-computation"
    ]
  }
}
---

## Define four interfaces

Behavior selects goals, waiting, and interaction. Planning supplies routes, speed, and avoidance. Motion generation supplies body references. Execution plays animation or tracks references through physics. An LLM can generate validated events, but text does not guarantee continuous collision-free motion or stable contact.

| Layer | Minimal output | Failure events |
|---|---|---|
| Behavior | Goal, event type, validity | Unreachable/conflicting goal |
| Planning | Timed root path, velocity | No route, congestion, stale path |
| Motion | Root/joint references, skeleton ID | Retargeting failure, deviation |
| Execution | Actual pose, velocity, contacts | Tracking failure, fall, penetration |

## Validate animation and physical tracking separately

Direct root and skeleton writes provide controlled replay but do not prove physical support. A controller converts references into targets or efforts, and dynamics determine the resulting state. Contact, pushing, and balance studies need a model appropriate to those interactions.

Inspect foot sliding, root speed versus gait cycle, turning lag, body-envelope collisions, and reset. Root-point planning can miss arms and lateral steps. If generated motion deviates from the route, coordinate replanning or correction rather than forcing conflicting root and joint trajectories.

## Official-repository supplement: dependencies remain separate

The pinned ProtoMotions README separates body models, retargeted motion, training, and inference. SMPL models, original AMASS data, converted MotionLib, physical MJCF/USD assets, and policy checkpoints are distinct resources. Check licenses and access individually; downloading a checkpoint does not supply all dependencies.

Trajectory-conditioned methods such as MotionBricks and interaction methods such as Uni-Inter remain extension readings. Their pinned runtime interfaces were not reviewed here; proposed adapter fields are not claimed as released APIs. See the existing [human-motion reading section](../../reading/?category=reading%3Ahuman-motion).

## Collect reusable demonstrations

Record scene, episode, expert type, action units, observation times, and termination reasons. Keep independent random streams during parallel collection. Never join a reset environment's first frame to the preceding episode. Distinguish privileged map-based experts from local visual learners. Split data by scene or task when required, avoiding leakage from random splits of adjacent frames.
