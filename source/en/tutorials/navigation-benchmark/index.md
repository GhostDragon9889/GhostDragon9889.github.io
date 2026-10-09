---
{
  "title": "Social Navigation Benchmarks: Contracts and Metrics",
  "description": "Define a twelve-module architecture and separate privileged observations, safety, and social metrics.",
  "layout": "post",
  "date": "2026-10-09 21:07:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "evaluation",
  "translation_path": "tutorials/navigation-benchmark/",
  "tutorial": {
    "id": "T08",
    "group": "navigation",
    "references": [
      "lab-scene",
      "ros-qos",
      "proto"
    ]
  }
}
---

## Define the social task operationally

Pedestrians alone do not establish social compliance. Static navigation emphasizes reachability; dynamic avoidance adds changing obstacles. Social navigation needs explicit rules for yielding, group space, passage order, or discomfort. A robot can avoid collision by freezing indefinitely or pass through a conversation group without physical contact while violating the intended rule.

## A twelve-module reference architecture

This is a design proposal, not twelve existing upstream components. Training and system-evaluation runners may differ while sharing scenario, action, and metric contracts. Each instance has one physics-state owner.

| Module | External contract |
|---|---|
| Assets and versions | Traceable geometry, units, provenance |
| Maps and semantic regions | Occupancy, NavMesh, social regions |
| Scenario generation | Start/goal, seeds, event manifest |
| Behavior and groups | Goals, desired velocity, response rules |
| Body motion | Root pose, posture, collision envelope |
| Robot control | Actions with units and validity intervals |
| Sensing and observations | Timestamps, calibration, legal information |
| Environment and training | Transitions, termination, reset |
| Algorithms and ROS 2 | Policy/service adapters |
| Independent evaluation | Offline-recomputable metrics |
| Scheduling and replay | Version manifests and complete events |
| Validation and release | Fixed tests, statistics, failure distributions |

## Specify denominators and event definitions

Record success, collision, timeout, arrival time, path length, freezing, closest human distance, and action smoothness. Group intrusion and passage-side violations require executable region and event definitions. Distance thresholds do not directly measure real human comfort.

Specify whether SPL's reference shortest path uses a static map or time-dependent constraints. Failed episodes remain in the denominator. Separate variation across training seeds from variation across evaluation episodes of one policy.

## Official-source supplement and acceptance

InteractiveScene supports scene replication and entity organization. ROS 2 QoS shows that transport compatibility is part of interface correctness. ProtoMotions provides physical motion, not social rules automatically. Fix head-on, crossing, doorway, overtaking, group, and occlusion scenarios with documented crowd density, reactivity, and robot dimensions.

Evaluator access to ground truth does not grant the policy the same access. Split scenes according to the intended generalization claim, retaining all episodes, failure reasons, and recomputable metrics. Replayed, rule-based, and learned reactive crowds are different conditions. Continue with [crowd interfaces](../crowd-motion/) and [paired evaluation](../paired-evaluation/).
