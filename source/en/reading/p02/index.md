---
{
  "title": "A Survey on Vision-Language-Action Models: An Action Tokenization Perspective",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Eight action-related interfaces connect modules, data sources, and execution, with overlapping categories.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p02/",
  "translation_path": "reading/p02/",
  "paper": {
    "id": "P02",
    "title": "A Survey on Vision-Language-Action Models: An Action Tokenization Perspective",
    "topic_id": "foundations",
    "year": "2025",
    "version": "2507.01925v1",
    "url": "https://arxiv.org/abs/2507.01925v1",
    "supplement": false,
    "summary_sha256": "544667a8bc7ad4bf4aad3431a317064d6010cf38ee1bbe2cbef8301bfac5ae19"
  },
  "layout": "post"
}
---

## Identity and contribution

The notes concern **arXiv:2507.01925v1**, submitted July 2, 2025: a 70-page survey, with the main text ending on page 45. A July 3 typesetting date also appears, but the arXiv record defines the submission date. It covers manipulation, navigation, driving, and some virtual environments.

Its contribution is a common language for **action-related representations passed between modules**. It neither introduces one uniformly trained controller nor benchmarks eight representations under a shared protocol.

## What “action token” means here

A module is a maximal differentiable subnetwork or a nondifferentiable functional unit. An action token is action-related information it produces; meaningful internal intermediate outputs may also qualify. A planner can therefore be a module, and a goal image, contact-point set, or continuous action chunk can be a token.

The term is broader than a tokenizer's vocabulary index. It need not be discrete, scalar, or autoregressively generated. The categories overlap: a system can produce a video, a trajectory, and raw commands; reasoning can condition any of them.

An explanatory module chain is:

$$
z_1\sim p_1(\cdot\mid o,\ell),\quad
z_k\sim p_k(\cdot\mid o,\ell,z_{<k}),\quad
A\sim p_a(\cdot\mid o,\ell,z_{1:K}).
$$

This is a reading aid, not a theorem proposed by the paper. Deterministic units, fresh observations, loops, and backtracking are also possible. Hi Robot, VoxPoser, and GO-1 illustrate combinations of language, code, spatial maps, and latent actions.

## Eight representation families

| Family | Interface | Strength | Limitation |
|---|---|---|---|
| Language | Subtasks or movement phrases | Compositional plans and human editing | Ambiguity and insufficient physical detail |
| Code | Calls, conditions, loops, programs | Explicit logic and reusable tools | API capabilities and runtime assumptions |
| Affordance | Points, boxes, masks, spatial scores | Links semantics to interaction locations | Occlusion, dynamics, and missing contact details |
| Trajectory | Points, drawn paths, optical flow | Video supervision and reusable motion patterns | Missing depth, orientation, forces, or execution logic |
| Goal state | Future images, point clouds, or video | Action-free video and hindsight goals | Generation errors, overspecification, latency |
| Latent representation | Learned action or goal vectors | Compression and heterogeneous data interfaces | Entanglement, granularity, limited coverage |
| Raw action | Joint/end-effector commands or chunks | Direct execution supervision | Expensive data and embodiment dependence |
| Reasoning | Decomposition, spatial relations, decisions | Inspectable intermediate supervision | Unfaithful text, rigid templates, extra latency |

These are synthesized design tradeoffs, rather than an experimental ranking.

## Language and code interfaces

Language plans describe subtasks; movement language describes local commands. SayCan checks skill feasibility, Inner Monologue uses feedback, Hi Robot combines high-level language with a general low-level policy, and RT-H studies finer movement descriptions. A new verbal subtask does not establish a new executable skill. Fixed skill libraries primarily generalize by recombination; open language policies still depend on their training coverage.

Code as Policies, ProgPrompt, Instruct2Act, and RoboScript add conditions, loops, and parameter computations. Success requires valid syntax, sensible call logic, and real-world satisfaction of the API's assumptions. A grasp function cannot certify reachability or friction. **Independent analysis:** controller-library performance must not be attributed entirely to a language model's low-level control ability.

## Affordances and trajectories

Keypoints can encode location and direction, $k=(x,d)$ with $x,d\in\mathbb R^3$. Boxes provide coarse instance localization; masks $M\in\{0,1\}^{H\times W}$ describe regions; affordance fields $F\in\mathbb R^{H\times W}$ score suitability. None alone guarantees a valid grasp pose, force, or collision-free contact. VoxPoser supplies spatial constraints to a planner; ReKep solves keypoint relations. Native 3D affordances, state-dependent affordances, and robustness to occlusion remain research directions.

Point tracks $P\in\mathbb R^{T\times K\times2}$, drawn paths, and optical flow $V\in\mathbb R^{H\times W\times2}$ can connect action-free video to control. ATM, RT-Trajectory, HAMSTER, and Im2Flow2Act exemplify different interfaces. Image motion does not uniquely determine robot action: depth, orientation, timing, contact, and camera motion remain ambiguous. A geometric path also differs from a time-parameterized trajectory.

## Goal states and latent actions

SuSIE generates subgoals, UniPi connects video planning to inverse dynamics, AVDC extracts flow from generated video, and FLIP evaluates future candidates. Action-free supervision may apply to the goal generator while the downstream controller still needs robot data or physical knowledge. Hindsight goal relabeling does not recover unrecorded joint commands.

Goal errors and goal overspecification are distinct. An impossible contact is an incorrect goal; demanding irrelevant background details overconstrains an otherwise valid task. The review cites approximately ten seconds for AVDC's eight-frame video, 3 Hz for Gen2Act, and 7–10 Hz for VPP. These heterogeneous timings are not a hardware-controlled test of goal-state representations.

Latent-action methods typically build a latent space, train a VLM to predict its codes, and adapt a robot-specific decoder. An illustrative visual-change objective is:

$$
z=Q(E(o_t,o_{t+\Delta})),\qquad
\mathcal L_{\mathrm{rec}}=d(D(o_t,z),o_{t+\Delta}).
$$

LAPA, GO-1, and UniVLA differ in quantization and task alignment. Reconstructable visual change can also encode lighting or camera motion. QueST instead compresses actual action chunks; latent-goal work such as GROOT/GROOT-2 should be distinguished from NVIDIA GR00T N1. Coverage, granularity, and task alignment matter more than reconstruction alone.

**Terminology check:** this survey's action token, RL Token's continuous state interface, and ACT's CVAE latent variable are different concepts. None automatically implies a reusable discrete semantic skill vocabulary.

## Raw actions, reasoning, and timing

Raw commands can be joint positions, end-effector increments, gripper states, or base velocities. RT-2, OpenVLA, π₀, RDT, and GR00T N1 demonstrate different pretrained backbones and heads; FAST compresses temporal redundancy; RTC handles asynchronous chunk transitions. End-to-end learning still depends on coordinates, normalization, limits, controllers, and filtering.

For a chunk of $H$ commands, $H/T_{\mathrm{infer}}$ measures action throughput, whereas $1/T_{\mathrm{infer}}$ describes serial inference frequency. Neither necessarily measures fresh visual-feedback frequency. This distinction prevents an incorrect ranking of dynamic responsiveness from the survey's frequency table.

ECoT, RAD, and DriveVLM add reasoning supervision. Plausible text does not certify faithful action execution. Some table entries, including Cosmos-Reason1 and AlphaDrive, lack demonstrated action grounding; question-answering scores are not robot-control scores. Longer reasoning can also increase observation staleness.

## Evidence and research directions

The data hierarchy links internet/video semantics, controlled simulated interaction, and real-robot calibration. Model tables aggregate different datasets, robots, budgets, and hardware. They do not isolate representation quality. Goal-conditioned imitation exists, and demonstration performance is not a universal mathematical upper bound.

**Cross-paper analysis:** ACT, Diffusion Policy, and π₀ concern action distributions; MetaVLA, π_RL, RL Token, and the generalization study concern adaptation; RTC, FLASH, VLASH, DynamicVLA, and DOMINO concern execution. Navigation, human-motion, and world-representation papers extend the interface view beyond manipulation.

**Proposed experiment:** hold sensors and the action decoder fixed while comparing trajectories, latent actions, and goal images. Measure information retained, background robustness, recovery under slower high-level updates, adaptation cost, success, observation-to-action latency, and continuity. The survey motivates these questions; it does not answer them through shared experiments.

## Source references

- [Source 1](https://arxiv.org/abs/2507.01925v1)
- [Source 2](https://arxiv.org/html/2507.01925v1)
- [Source 3](https://arxiv.org/pdf/2507.01925v1)
- [Source 4](https://arxiv.org/abs/2304.13705v1)
- [Source 5](https://arxiv.org/abs/2303.04137v5)
- [Source 6](https://arxiv.org/abs/2410.24164v1)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
