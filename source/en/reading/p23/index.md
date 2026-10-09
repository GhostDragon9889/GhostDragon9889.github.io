---
{
  "title": "GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Known 3D assets and video priors produce physics-trackable humanoid loco-manipulation demonstrations.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p23/",
  "translation_path": "reading/p23/",
  "paper": {
    "id": "P23",
    "title": "GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors",
    "topic_id": "human-motion",
    "year": "2026",
    "version": "2606.05160v1",
    "url": "https://arxiv.org/abs/2606.05160v1",
    "supplement": false,
    "summary_sha256": "624136e70b3da2d4c0bb6630dd4b41a54e152b52b8c78bc32b80ba90291ae64b"
  },
  "layout": "post"
}
---

## Identity and contribution

Tianyi Xie, Haotian Zhang, Jinhyung Park, Zi Wang, and colleagues introduce GRAIL in the **24-page arXiv:2606.05160v1** (2026). The export also records CoRL 2026 Oral information from the project page.

GRAIL starts from **known simulation-ready 3D assets**, generates a human-interaction video, reconstructs 4D human/object motion using known geometry, and trains physics trackers to produce robot demonstrations. It is not an unrestricted method for reconstructing an unknown world from arbitrary phone video.

## Controlled scene generation and reconstruction

Known scale, cameras, meshes, and a body shape fitted toward G1 proportions reduce ambiguities before generation. Infinigen, rigid-body placement, and Blender establish an initial scene; a VLM proposes interactions, and the stored pipeline uses Kling 2.5 Turbo Pro for five-/ten-second, 24 FPS video. Static-camera requirements and object assets remain dependencies.

GENMO estimates body motion; WiLoR adds hand estimates, interpolation/filtering, and wrist IK. FoundationPose is adapted to RGB-only tracking, initialized from known object pose and geometry. SAM2-mask disagreement filters inconsistent sequences.

Joint optimization refines body/object poses using 2D keypoints, object projection, calibrated depth, contact, and temporal regularization. MoGe-2 depth is scaled using known background depth. VLM contact labels gate constraints; view-axis contact errors do not constitute friction, force-balance, or complete nonpenetration guarantees. Filtered videos also create selection effects whose full retention rate is not reported.

## Physics trackers and visual policies

GMR retargets motion to G1. Object manipulation trains a latent adapter on frozen SONIC, producing a 64-dimensional latent residual plus two hand-open/close commands. Terrain/sitting uses a height-map-conditioned controller fine-tune; these branches do not have identical trainable components.

Object tracking uses privileged poses, contact information, shape codes, and reference motion. The scene branch uses an 11×11 local height map. Rewards combine body/object tracking and gated grasp/contact terms.

PPO runs in Isaac Lab with **64 L40 GPUs and 1,024 environments per GPU**, up to 30K iterations. Jointly training 2,000–4,000 related motions takes approximately thirty hours. The reported **0.5–0.9 minutes per motion** is amortized wall time, not a single-card training recipe.

Head-camera RGB policies distilled from synthetic data output SONIC latent tokens. Real G1 sends vision/proprioception to an RTX 5090 host at roughly 10 Hz. A privileged tracker during data generation does not imply privileged object truth during real visual deployment.

## Three different success definitions

| Evaluation | GRAIL result | Definition |
|---|---:|---|
| Human–object physical tracking | 88.9% | Frame fraction below normalized body/object tracking-error thresholds |
| G1 object manipulation tracking | 81.4% | Episodes with mean object-position error below 20 cm |
| Real pickup, seen objects | 84% | Task successes over limited object trials |
| Real pickup, unseen objects | 80% | Separate unseen-object task successes |
| Real stairs | 90% | Reported task success |

These must not be averaged into one “success rate.” The human/object comparison uses twenty shared objects and a body-shape-matched physical tracker; geometric contact distance is 0.008, penetration 0.90%, and VLM interaction score 3.58/5. VLM/user preference is a different kind of evidence from physical tracking.

The 124-motion, 43-object G1 comparison gives HDMI 48.5%, ResMimic 49.2%, and GRAIL 81.4%, with system differences including hand control and task-family training. Removing SONIC gives 45.0%, removing the adapter 39.7%, and removing relative object observations 57.9%. Better body imitation alone does not guarantee successful object interaction.

Real pickup uses five seen categories with ten tests each and five unseen categories. Seen cube success is 100% while apple is 60%; unseen spray can is 100% while lint roller is 50%. These small, bounded tests support data utility, not open-world reliability.

## Cost, limits, and project use

The paper reports over 20,000 generated G1 sequences. A five-second/121-frame generation–reconstruction pipeline takes roughly **fourteen minutes** in the stated profiling, including an external video service and about eight minutes of optimization. It is offline data production, not a real-time pedestrian engine.

**Independent analysis:** use GRAIL for controlled asset-conditioned interaction clips and physics validation. For large navigation crowds, its full pipeline may be excessive; an offline behavior library plus independent intent/avoidance policies is more directly testable. If a scene has already been reconstructed, it can become a generation condition, which is different from recovering that scene from unknown footage.

Bind camera/scale calibration, body proportions, filtering, contact labels, retargeting, tracker branches, and task definitions. Evaluate reconstruction, physical following, object outcomes, and visual policies separately. Later repository video backends/checkpoints are implementation evolution, not automatically original-paper results. The source notes do not verify compatibility with a particular Isaac installation or report executed code.

## Source references

- [Source 1](https://research.nvidia.com/labs/dair/grail/)
- [Source 2](https://research.nvidia.com/labs/dair/grail/static/pdf/GRAIL.pdf)
- [Source 3](https://arxiv.org/abs/2606.05160v1)
- [Source 4](https://github.com/NVlabs/GRAIL/)
- [Source 5](https://huggingface.co/datasets/nvidia/PhysicalAI-Robotics-Locomanipulation-GRAIL)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
