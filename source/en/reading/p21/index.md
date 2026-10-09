---
{
  "title": "MotionBricks: Scalable Real-Time Motions with Modular Latent Generative Model and Smart Primitives",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Modular motion latents and smart primitives synthesize real-time kinematic references.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p21/",
  "translation_path": "reading/p21/",
  "paper": {
    "id": "P21",
    "title": "MotionBricks: Scalable Real-Time Motions with Modular Latent Generative Model and Smart Primitives",
    "topic_id": "human-motion",
    "year": "2026",
    "version": "2604.24833v1",
    "url": "https://arxiv.org/abs/2604.24833v1",
    "supplement": false,
    "summary_sha256": "f1b7f491662378fbb4f29f81162c098a33761b610ab6de98d369fc6cf747951a"
  },
  "layout": "post"
}
---

## Identity and contribution

Tingwu Wang, Olivier Dionne, and colleagues propose MotionBricks in **arXiv:2604.24833v1**, April 27, 2026, a 22-page paper associated with SIGGRAPH/ACM TOG 2026, DOI 10.1145/3811334.

Root paths, body pose, and control interfaces are modeled separately. Multihead discrete latents and sparse keyframes support styles, transitions, and object interactions. The direct output is a **kinematic motion reference**. Navigation intent and physics tracking remain separate; a real G1 demonstration uses an additional physical controller.

## Representation and modular generation

Training uses 12–64-frame segments at 30 FPS, sampled in four-frame increments. States include global/local root motion, joints, rotations, velocities, and contacts. The last four frames provide context; partial root/pose constraints use masks, with zero to ten sampled keyframes.

The tokenizer encodes joint positions and rotations, with fourfold temporal downsampling. It splits latent features into quantization heads. With $C_k$ codes per head, combination capacity is $\prod_kC_k$, while stored codes number $\sum_kC_k$. “Billion-token capacity” therefore does not mean storing a billion complete motion clips. Heads are learned rather than assigned to named limbs.

A conditional decoder restores continuous pose, velocity, contacts, and root quantities, with VQ-style reconstruction/commitment, velocity, and foot-sliding objectives. Root and pose are not statistically independent; separating their pathways permits coordinated path changes without binding every root location into a pose code.

The root module first predicts duration, then trajectory. The pose module predicts masked discrete codes conditioned on roots/keyframes, followed by continuous decoding. Often one forward pass is sufficient. This decomposition improves runtime control, without turning arbitrary infeasible keyframes into physically valid motion.

## Smart primitives and execution

Smart locomotion extrapolates velocity/heading for about one second, smooths with a critically damped spring, then applies style keyframes, root refinement, and decoder refinement. The final root can differ from the initial navigation command, so strict path following needs measured error.

Smart objects bind intention keyframes to object coordinates and interaction logic, including triggers, sockets, release positions, and anchors. UE5 traces, raycasts, and StateTree logic are part of the demonstrations. “Neural generation” does not remove all external interaction logic. Hard/soft drop-frame settings define execution/replanning behavior, not formal zero-error constraint guarantees.

A future buffer is consumed frame by frame and regenerated when commands change or it runs low. G1 replans around 10 Hz or on command changes; appendix guidance suggests every three to nine 30 FPS frames. Replanning at every render frame can damage motion detail and style.

## Data, computation, and results

| Dataset | Duration | Training clips | Test clips |
|---|---:|---:|---:|
| Internal 350K | 700 h | 315,162 | 35,018 |
| Internal 70K subset | 140 h | 62,132 | 35,018 |
| Processed HumanML3D | 28.6 h | 23,206 | 2,578 |
| LaFAN1-G1 | 4.6 h | 2,362 | 262 |

The internal set covers 36 broad categories, approximately 9,300 fine-grained skills, and 163 performers. Clip count is not distinct-skill count. Public BONES-SEED contains approximately 143,792 clips with separate unseen-content and held-out-combination tests.

Training uses 32 GPUs and two million updates. Reported H100 stage durations are approximately seven days tokenizer, three root, and seven pose. Deployment sizes are approximately 23.5M, 50M, and 150M parameters. Smaller-hardware feasibility does not imply the same training wall time.

On the 350K test, MotionBricks reports **FID 1.054, target-root error 0.023 m, 99.6% arrival, and 2 ms generation** on the stated RTX 5090 setup. Jetson Orin is approximately 5 ms. Subjective preference is 86.5%, rating 4.06/5, and foot-contact accuracy 92.6%. Arrival requires root error below five centimeters and heading error below fifteen degrees.

The reported **15,000 generated frames/s** is motion-generation throughput, not Isaac render FPS, physics frequency, or a guaranteed crowd size. HumanML3D arrival is 98.9%, while LaFAN1-G1 is 61.1%. It does not achieve near-perfect arrival on every dataset or dominate every metric.

Multihead-code and root-interpolation ablations support usable capacity and path adaptation. More data need not monotonically improve FID. Code-capacity comparisons use different conditions and do not define a universal optimum.

## Limits and Isaac integration

Rare motions, missing terrain/object dynamics, self-collision, hardware feasibility, and real-world pose availability limit deployment. A G1 locomotion demo does not establish arbitrary physical object interaction. The export identifies the public code as an initial preview, rather than a confirmed complete reproduction of internal 350K training and UE5 integration.

**Project proposal:** let NavMesh, ORCA, or learned behavior choose destinations and avoidance; convert local commands/styles into MotionBricks conditions; retarget roots/joints to USD Skel. Kinematic animation can serve visual occlusion tests. Pushing, falls, or force feedback require physical tracking and contact modeling.

Assign root-motion ownership once. If navigation and animation both write world poses, movement can duplicate or be overwritten. Measure path deviation, foot slip, command delay, multi-character inference, skeleton updates, rendering, collisions, and sensors together. These are integration recommendations, not an existing Isaac-compatible implementation verified by the notes.

## Source references

- [Source 1](https://nvlabs.github.io/motionbricks/)
- [Source 2](https://arxiv.org/abs/2604.24833v1)
- [Source 3](https://doi.org/10.1145/3811334)
- [Source 4](https://github.com/NVlabs/GR00T-WholeBodyControl/tree/main/motionbricks)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
