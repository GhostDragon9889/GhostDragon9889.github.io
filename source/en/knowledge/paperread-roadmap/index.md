---
{
  "title": "Cross-Paper Comparison and Research Roadmap",
  "date": "2026-10-09 18:00:00",
  "layout": "post",
  "lang": "en",
  "collection": "research",
  "translation_path": "knowledge/paperread-roadmap/",
  "description": "Connections and controlled experiments across action generation, policy adaptation, execution, human motion, and navigation worlds.",
  "featured": true
}
---

This roadmap reorganizes the uploaded PaperRead cross-paper analysis into an English edition. Paper-specific facts refer to the identified source versions. System combinations and proposed experiments below are **independent research analysis**, rather than results established by any single paper. The source export reports no experiment reruns.

## 1. A common research question

How can behavior learned from demonstrations or large datasets become useful robot action under **real time, contact, and environmental change**?

Five connected layers organize the collection: action-distribution modeling, adaptation/RL, execution timing, human motion, and navigation/world evaluation. [ACT](/en/reading/p07/), [Diffusion Policy](/en/reading/p08/), and [π₀](/en/reading/p09/) explain generation. [MetaVLA](/en/reading/p10/), [π_RL](/en/reading/p11/), [RL Token](/en/reading/p12/), and [the generalization study](/en/reading/p13/) explain adaptation. The realtime papers modify computation, scheduling, observations, or training data.

Better generation, faster inference, realistic interactions, and more task successes are distinct outcomes. An improvement can be lost at an interface.

## 2. Five time quantities

| Quantity | Meaning | Common mistake |
|---|---|---|
| Control period | Time between physical commands | Equating interpolation with fresh visual feedback |
| Prediction horizon $H$ | Number of proposed future actions | Assuming every predicted action executes |
| Executed horizon $K$ | Actions used before replacement | Confusing it with denoising iterations |
| Inference latency $T_{\mathrm{infer}}$ | Complete query duration | Confusing latency, throughput, and task time |
| Observation age | Age of information when an action applies | Measuring only GPU computation |

For serial chunk generation, $H/T_{\mathrm{infer}}$ is action throughput, not an equal number of independent new-image decisions. Pipeline overlap further separates throughput and latency. Measure camera, queue, network, computation, and actuator timestamps.

## 3. What the seven execution papers change

| Paper | Main intervention | Training requirement | Boundary |
|---|---|---|---|
| [ADP](/en/reading/p14/) | Action-aware visual pruning | No additional training | FLOPs ratios differ from latency; robot motion is an environmental proxy |
| [FLASH](/en/reading/p15/) | Fresh drafts, cached verification, fallback | Draft training | Consistency is heuristic; fast-path cost differs from trajectory average |
| [RTC](/en/reading/p16/) | Prefix-guided inpainting and concurrency | Mainly inference-time | Gradients add cost; committed actions remain a feedback blind interval |
| [Running VLAs](/en/reading/p17/) | Graph/kernel optimization | Implementation optimization | Complete forward timing is measured; full streaming is partly proposed |
| [VLASH](/en/reading/p18/) | Future-body-state conditioning | Offset fine-tuning | Future proprioception does not mean future object state |
| [DynamicVLA](/en/reading/p19/) | Multiframe compact policy and stale-prefix removal | Dynamic training/data | Valid suffixes must cover ongoing execution |
| [DOMINO/PUMA](/en/reading/p20/) | Flow history and future-object feature supervision | Policy training | Stored simulation excludes full real control-delay effects |

RTC increases model latency from 76 to 97 ms while improving task throughput. Running VLAs measures 27.3 ms two-view inference; its 480 Hz full force-feedback controller is not implemented evidence. DynamicVLA's clarified 0.226 s/chunk and 25 Hz action indexing prevent interpreting action throughput as 88 fresh-image queries/s.

## 4. Adaptation updates different things

| Paper | What changes | Feedback | Limit |
|---|---|---|---|
| [RL²](/en/reading/p05/) | Hidden state within a trial; outer-trained weights | Across-episode return | No test-time gradient adaptation or universal Bayesian-optimal claim |
| [SimBa](/en/reading/p06/) | Network structure/normalization | Existing RL objective | State/symbolic evidence does not establish visual-VLA scaling |
| MetaVLA | Demonstration-conditioned MAR | Target action supervision | Context reading differs from online RL or unseen-skill validation |
| π_RL | Primarily action expert and value/noise modules | Simulator rewards | Not full-backbone online real-robot updating |
| RL Token | Small actor/critic after freezing VLA | Rewards, references, human correction | Critical-stage improvement differs from full-task mastery |
| Generalization study | LoRA and shared value head | Task interaction | Recovery improvements do not imply all semantic OOD improves |

The [action-token survey](/en/reading/p02/)'s broad module-interface token and RL Token's compact continuous state vector are different concepts. Account separately for demonstrations, interaction, updated parameters, privileged state, rewards, takeover, resets, and wall time.

## 5. Human motion needs behavior and physics interfaces

[MotionBricks](/en/reading/p21/) provides modular kinematic motion and runtime keyframes. [Uni-Inter](/en/reading/p22/) conditions joint synthesis on known interaction volumes. [GRAIL](/en/reading/p23/) starts with known assets, reconstructs generated interactions, and trains physical trackers.

GRAIL's 88.9% frame tracking, 81.4% episode tracking, and 84%/80% real pickup figures have different denominators and thresholds. They must not form one averaged success score.

For crowds, separately represent destination/avoidance, root path, joints, physical contacts, and sensor occlusion. Animated playback can serve some visual tests; pushes, falls, or force feedback need physical control. [NavIsaacLab](/en/reading/p26/) embodies this hierarchy while retaining tracking failures and pipeline costs.

## 6. Visual worlds versus physical geometry

[Lyra 2.0](/en/reading/p30/) supports exploration and revisits through generative memory, but invents unseen space and principally assumes static worlds. [SAGE-3D](/en/reading/p29/) aligns Gaussian appearance and collisions using **preexisting meshes**.

A scene entering Isaac needs appearance, metric scale/coordinates, collision geometry, object identity, and physical parameters. A file-format conversion does not solve all five. The conceptual interfaces are:

| Layer | Produces | Receives feedback from |
|---|---|---|
| Scene | Appearance, geometry, semantics | Object transforms and contacts |
| Crowd behavior | Intent and root paths | Neighbors and robot observations |
| Body control | Joints and physical motion | Root targets, geometry, contact |
| Sensors | Timestamped local observations | Scene, bodies, robot state |
| Robot policy/execution | Plans and commands | Sensors and actual action consumption |

This is a proposed system decomposition, not a complete system demonstrated by one paper.

## 7. Normalize social-navigation definitions

[NavDP](/en/reading/p24/) uses privileged geometry for training rather than deployment maps. [FLUX](/en/reading/p25/) adds dynamic learning; [Arena-Bench](/en/reading/p27/) supplies integration/measurement; [the social-navigation review](/en/reading/p28/) maps architectures and modified benchmark implementations.

| Metric | Required definition | Example ambiguity |
|---|---|---|
| Success | Arrival, timeout, contact allowance, denominator | Arena appendix allows fewer than two collisions |
| SPL | Same episodes, success flag, shortest/actual path | Some FLUX/SAGE entries exceed SR |
| Collision | Physical contact or proximity; events or steps | FLUX uses distance-based incursions |
| Social distance | Threshold, duration, crowd normalization | FLUX SC is lower-is-better |
| Smoothness | Period, differences, coordinates | Frozen failed policies can appear smooth |
| Parallel speed | Aggregate or individual steps, simulated/wall time | Crowd aggregate throughput is not per-person Hz |

Geometry-based comfort proxies do not replace real-participant evidence.

## 8. Four reading routes

1. **Action generation:** ACT → Diffusion Policy → π₀; use the action-token survey to compare interfaces.
2. **Dynamic VLA:** RTC → Running VLAs → FLASH → VLASH → DynamicVLA → DOMINO/PUMA; add ADP to study computation allocation.
3. **Policy improvement:** RL²/SimBa → [RL-VLA survey](/en/reading/p04/) → generalization study → π_RL/RL Token/MetaVLA.
4. **Isaac social navigation:** NavDP → FLUX → NavIsaacLab → Arena-Bench/social review; add human-motion and SAGE/Lyra papers at their respective layers.

The [systematic VLA review](/en/reading/p01/) and [Chinese-language pipeline survey](/en/reading/p03/) provide complementary initial maps.

## 9. Minimal informative experiments

| Question | Controlled comparison | Records |
|---|---|---|
| Does pruning miss dynamic events? | Same policy/budget; target changes while robot rests or moves | Event time, retained tokens, age, recovery |
| Where do asynchronous gains come from? | Synchronous, naive async, RTC, future-state training | Success, executed horizon, waiting, retries, discontinuities |
| Does RL transfer to new skills? | Separate visual, position, phrasing, and entirely new skill holdouts | Demonstrations, interactions, ID/OOD and failures |
| Do generated scenes change rankings? | Fixed collisions/change appearance, then the inverse | Clearance errors, contacts, real-scene agreement |
| Does body realism help navigation? | Fixed root paths/change joints, then fixed style/change avoidance | Navigation, foot slip, heading, proximity, cost |
| Does precision-stage learning help full tasks? | Critical stage and home-start task; vary entry state | Takeover, resets, throughput, failure location |

Start with comparisons that isolate one cause, then combine modules. Simultaneously replacing data, model, execution, and world can improve success while obscuring the responsible mechanism.

Source versions stay explicit: π₀ v1 is a 2024 paper; MetaVLA title spelling, Uni-Inter revision year, and VLASH/DynamicVLA updates are not silently merged. Survey rankings require primary-paper checks. All experiments above are proposed, rather than rerun results.
