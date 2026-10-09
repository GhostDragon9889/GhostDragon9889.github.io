---
{
  "title": "Uni-Inter: Unifying 3D Human Motion Synthesis Across Diverse Interaction Contexts",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Voxel-conditioned joint-heatmap diffusion unifies interaction synthesis across human, object, and scene contexts.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p22/",
  "translation_path": "reading/p22/",
  "paper": {
    "id": "P22",
    "title": "Uni-Inter: Unifying 3D Human Motion Synthesis Across Diverse Interaction Contexts",
    "topic_id": "human-motion",
    "year": "2025",
    "version": "2511.13032v2",
    "url": "https://arxiv.org/abs/2511.13032v2",
    "supplement": false,
    "summary_sha256": "19b0393ab8628ec8cd119eb36810534d5b3f16be5faaff1e38dba977f3c5327a"
  },
  "layout": "post"
}
---

## Identity and contribution

Sheng Liu, Yuanzhi Liang, and colleagues propose Uni-Inter, published at SIGGRAPH Asia 2025, DOI **10.1145/3757377.3763954**. The notes use the eleven-page **arXiv:2511.13032v2**, revised September 7, 2026. This is a 2025 work with a 2026 revision.

The method expresses people, objects, and scenes in one **Unified Interactive Volume (UIV)** and generates spatially aligned joint probability maps. It synthesizes a person's response to supplied interaction context, rather than jointly deciding every participant's goals and object dynamics from text alone.

## Unified context and probability outputs

UIV voxelizes SMPL bodies, transformed objects, and scene geometry using three semantic channels. Temporal occupancy changes within a fixed spatial boundary. Same-category entities can share channels, but individual identity is not automatically preserved.

The default grid is **48×48×48**, covering 2.4 m vertically and 4.8 m along the other axes. The physical spacing is therefore approximately five versus ten centimeters; equal voxel-index resolution does not imply isotropic metric spacing. Multiscale features condition the generator.

Instead of directly regressing rotations, each joint receives a Gaussian heatmap target:

$$
P_t^k(u)\propto\exp\left(-\|u-j_t^k\|^2/(2\sigma^2)\right),
\qquad\widehat j_t^k=\mathbb E_{\widehat P_t^k}[u].
$$

Soft expectation allows subvoxel positions. **Independent analysis:** discrete truncated grids need explicit normalization; a continuous Gaussian constant does not guarantee discrete sums of one. Multimodal means can also fall between valid modes. The reported $\sigma=3$ needs coordinate-unit verification rather than interpretation as three meters.

Diffusion predicts clean heatmaps, with CLIP text features and UIV context. A thousand **training noise levels** do not identify actual DDIM inference steps or deployment latency. Training uses forty-frame sequences, batch 32, up to 500K updates, and initial learning rate $3\times10^{-5}$.

## Losses and data

Reconstruction combines position, velocity, skeleton-vector, and initial-orientation terms. Skeleton vectors constrain both length and direction, not only bone length. The first three weights are 0.1 and orientation weight is one. Removing initial-heading normalization makes orientation supervision relevant to spatial interactions.

Task sampling is **1:1:1**, rather than equal original dataset sizes. Human–object data use FullBodyManipulation, approximately ten hours and fifteen objects; human–human uses 8,118 NTU120-AS sequences across 26 actions, Camera 1 and cross-subject splits; scene interaction uses text-labeled TRUMANS with a 7:2:1 split. SMPLify fits generated joints for visualization with default body shape, so shape diversity is a separate capability.

## Evidence and tradeoffs

| Metric | Baseline | Uni-Inter |
|---|---:|---:|
| Human–object FID | CHOIS 0.69 | 0.51 |
| Contact F1 | 0.67 | 0.86 |
| Joint error | 15.30 cm | 12.15 cm |
| Root error | 24.43 cm | 11.20 cm |
| Scene FID | TRUMANS 13.290 | 2.650 |
| Scene target distance | 25.434 cm | 20.136 cm |
| Human–human FID | ReGenNet 3.045 | 2.216 |

Not every metric wins: foot sliding is 0.39 versus CHOIS 0.35, and human–human multimodality is slightly below ReGenNet. Diversity should approach the real distribution, not simply increase without limit.

Joint training improves several FID values, yet single-task human–object joint error is slightly better, 12.03 versus 12.15 cm. Removing velocity/skeleton losses lowers contact F1 to 0.67/0.68. Representation and loss ablations support this framework's choices; they do not prove every direct coordinate/rotation model is inferior.

Mixed-entity examples are mainly qualitative. They do not replace a large composite-interaction test with uncertainty estimates.

## Limits and project use

The paper leaves **partial observation, causality, and real-time generation** to future work. Complete time-window context, volumetric outputs, diffusion, and body fitting create costs; no complete low-latency crowd controller is demonstrated.

**Project proposal:** generate offline conversation, handover, sitting, and object-interaction clips for Isaac scenes, then retarget them. Online crowds would still need intentions, local navigation, causal future-context prediction, and chunk transitions. Joint heatmaps are not PhysX torque commands.

Keep replay, known-plan conditioning, predicted-context conditioning, and actual closed-loop response distinct. Supplying a pedestrian generator the robot's true future trajectory would change the benchmark's causal information. Reproduction needs coordinates, scales, skeletons, voxel bounds, heatmap normalization, noise widths, sampling ratios, and separate voxel/diffusion/fitting timing. The source export did not confirm complete runnable assets or execute the official code.

## Source references

- [Source 1](https://arxiv.org/abs/2511.13032v2)
- [Source 2](https://doi.org/10.1145/3757377.3763954)
- [Source 3](https://github.com/Darkdawner/Uni-Inter)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
