---
{
  "title": "ROS 2 and Simulation: Clocks, TF, QoS, and Stale Actions",
  "description": "Use Jazzy documentation to check message compatibility, timestamps, and reset boundaries.",
  "layout": "post",
  "date": "2026-10-09 21:08:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/ros2-simulation/",
  "tutorial": {
    "id": "T09",
    "group": "navigation",
    "references": [
      "ros-qos",
      "ros-tf",
      "lab-articulation"
    ]
  }
}
---

## Align time and coordinates

Nodes requiring simulated time need consistent `use_sim_time` settings and a functioning `/clock` publisher. Use wall time for performance and simulation time for state timestamps. Pauses and reset-induced time jumps require clearing caches and obsolete control requests.

`map`, `odom`, `base_link`, and sensor frames serve different roles. Assign a clear publisher to each TF edge. Record extrinsics, depth units, and image orientation. Waypoints, chassis velocities, and wheel velocities are not interchangeable.

## Official-source supplement: QoS must match

Jazzy documentation uses a request/offered compatibility model. A best-effort publisher cannot satisfy a reliable subscriber; a reliable publisher can match a best-effort subscriber. The sensor-data profile favors timely newer observations rather than delivery of every old sample. Inspect history/depth, durability, deadline, and lifespan as well.

```bash
ros2 topic info /clock --verbose
ros2 topic info /cmd_vel --verbose
ros2 run tf2_ros tf2_echo odom base_link
```

These diagnostic commands require the corresponding ROS 2 installation. Topic and frame names are conventional examples and must match the actual system. The target bridge extension was not run for this guide.

## Give actions a validity interval

Attach episode identity and control-step identity to inference requests. Accept a result only if it belongs to the current episode and its observation age meets the protocol. Specify hold, stop, or replan behavior for timeout, pause, disconnection, and reset. Never consume an old action indefinitely.

`Twist` has no header, so an external contract must provide timing and a watchdog, or use a stamped message where supported. Record chassis coordinates, linear and angular units, limits, and whether lateral motion is allowed.

## Interface acceptance

Start with clock publication, then TF and odometry, one sensor, and finally low-speed commands. Test pauses, repeated resets, missing frames, and incompatible QoS to inspect fallback behavior. Record observation capture, transmission, inference, reception, and application times. Video playback FPS is not a substitute for a control frequency.
