---
{
  "title": "Arena-Bench 2.0: A Comprehensive Benchmark of Social Navigation Approaches in Collaborative Environments",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Nav2 integration and collaborative scenarios expose the need for shared success and event definitions.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p27/",
  "translation_path": "reading/p27/",
  "paper": {
    "id": "P27",
    "title": "Arena-Bench 2.0: A Comprehensive Benchmark of Social Navigation Approaches in Collaborative Environments",
    "topic_id": "navigation-worlds",
    "year": "2025",
    "version": "2025",
    "url": "https://doi.org/10.1109/IROS60139.2025.11246895",
    "supplement": false,
    "summary_sha256": "7e2df710a7bded19396939374b55b7a1191646e6648944b728f768d3447c396f"
  },
  "layout": "post"
}
---

## Identity and contribution

Volodymyr Shcherbyna, Linh Kästner, and colleagues publish Arena-Bench 2.0 at **IROS 2025**, pages 9202–9209, DOI **10.1109/IROS60139.2025.11246895**. It is distinct from Arena-Rosnav 2.0, Arena 4.0, and Arena 5.0.

The contribution is shared **experimental infrastructure**: Python-method integration into Nav2, semantic scenario generation, and traceable metrics. It is not one new policy intended to replace every planner.

## nav2py and scenario generation

ament-based packaging creates method-specific Python environments from project dependencies. Python callbacks keep the algorithm; C++ adapters handle ROS 2 topics, parameters, lifecycle, and planner/controller plugins. Isolation helps dependency conflicts but does not automatically solve CUDA versions, GPU contention, missing weights, or message delay.

The interface can expose raw sensors rather than forcing every method to use a 2D costmap. Fair comparisons must still record input information and sensor budgets. An explanatory timeline is:

$$
t_{\mathrm{obs}}\rightarrow t_{\mathrm{receive}}
\rightarrow t_{\mathrm{infer}}\rightarrow t_{\mathrm{command}}
\rightarrow t_{\mathrm{apply}}.
$$

This is a project reporting recommendation, not a new algorithm from the paper.

World generation controls rooms/corridors; task-mode generation places furniture by semantics and clearance; pedestrian generation links activities/waypoints to context. Gazebo, Unity, and Isaac Sim are supported platform backends. Context labels do not prove learned human realism, and the paper does not introduce NavIsaacLab-style AMP full-body control.

## Logs, metrics, and important definitions

ROS 2 bags preserve obstacles, semantics, pedestrian motion/pose, and scene structure. Cached post-processing and notebooks organize performance, naturalness, social, and discomfort proxies.

Success, contact, time, distance, speed, acceleration, jerk, and waiting evaluate completion/cost. ADE/FDE and warping require suitable reference trajectories. Personal-space time, visibility, heading, and approach direction are contextual proxies, not validated universal comfort scores.

The appendix labels success **“Runs with < 2 collisions.”** A run with one collision may therefore qualify, and that sentence does not fully state the goal-reaching condition. It cannot be equated with strict collision-free arrival without inspecting code. Event counting/debouncing matters.

Curvature is labeled in meters although ordinary planar curvature uses inverse meters; implementation may instead represent radius or a normalized quantity. Finite-difference jerk depends strongly on timestep and noise. Uniform timestamps are essential.

## Experiments and classification corrections

Three environment types—hospital emergency, aggressive multi-robot warehouse, and office doorway congestion—have four difficulty levels and fifty episodes per combination. Full coverage implies **600 episodes per planner**, calculated from the design. Selected qualitative comparisons use ten matched runs.

Reported trends show traditional methods with stable episode-level distance/speed but sometimes more local acceleration variation; learned methods can improve some human-related metrics. Dense doors/crowds reveal loops and freezing. No complete precise numerical matrix is supplied for every planner/context, so the notes do not fabricate success percentages from low-resolution plots.

The appendix misclassifies **SICNav**, which is MPC with bilevel optimization/ORCA behavior, as RL. It labels **DRL-VO** classic despite its deep-RL policy. These editorial errors affect simplistic classic-versus-learning grouping. Record actual algorithm components and sensors instead.

## Limits and project use

Different methods may have different training, tuning, inputs, recovery, and computation. Supporting multiple simulators does not prove invariant rankings. Human comfort remains largely geometric, and comprehensive real transfer is future work.

**Project proposal:** separate immutable scene/seed instances, sensor/action adapters, and timestamped evaluators. Preserve actual contact, surface separation, personal-space duration, goal success, failure/timeout, waiting, and motion quality before aggregating. Waiting at a crowded door can be appropriate; waiting in empty space may be failure.

NavDP/FLUX waypoint outputs need a tracker; velocity PPO uses a different interface. Match speed, controller, frequency, timeout, and recovery before interpreting method differences. The paper's integration tools provide a framework for such comparisons, without proving that all adapters or runtime dependencies are already compatible with a particular Isaac/ROS setup.

## Source references

- [Source 1](https://doi.org/10.1109/IROS60139.2025.11246895)
- [Source 2](https://ieeexplore.ieee.org/document/11246895/)
- [Source 3](https://github.com/Arena-Rosnav)
- [Source 4](https://github.com/Arena-Rosnav/nav2py_drlvo)
- [Source 5](https://arxiv.org/abs/2310.10982)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
