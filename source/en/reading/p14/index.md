---
{
  "title": "Action-aware Dynamic Pruning for Efficient Vision-Language-Action Manipulation",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Action-aware visual-token pruning reduces computation, with limits of action magnitude as a dynamics proxy.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p14/",
  "translation_path": "reading/p14/",
  "paper": {
    "id": "P14",
    "title": "Action-aware Dynamic Pruning for Efficient Vision-Language-Action Manipulation",
    "topic_id": "real-time",
    "year": "2026",
    "version": "2509.22093",
    "url": "https://openreview.net/pdf?id=ea6j8k8Rnw",
    "supplement": false,
    "summary_sha256": "709463c0a78166232ebedc9cc78aa20557be243a7f27c614e9b6380c5e6756fb"
  },
  "layout": "post"
}
---

## Identity and contribution

Xiaohuan Pei, Yuxing Chen, and colleagues propose **Action-aware Dynamic Pruning (ADP)**. The notes use the uploaded twenty-page ICLR 2026 final manuscript, associated with **arXiv:2509.22093**, first released in 2025. Author order differs from some earlier online records.

ADP requires no retraining: recent robot-motion magnitude determines when to prune, and text–vision relevance determines which visual tokens to retain. “Dynamic” primarily describes changing pruning decisions, not a demonstrated solution to moving-object manipulation.

## Relevance scoring and motion gating

The main base is OpenVLA-OFT with eight-step chunks. Text and visual hidden states use pretrained Q/K projections. Scaled dot products are averaged over heads and text positions; the top $\lfloor\rho L_v\rfloor$ visual tokens remain. The printed formula does not explicitly apply softmax, so reproduction must verify the implementation rather than silently changing the score.

Scene/wrist quotas are **4:6** in the main simulation configuration. Layer-zero scoring shortens the sequence before the full LLM pass; deeper scoring adds cost. Fixed camera quotas can become unsuitable under occlusion.

The paper composes relative poses and sums windowed translation lengths:

$$
\delta_i=\sum_t\|p_{t+1}-p_t\|_2,
\qquad s_{i+1}=\mathbf1[\delta_i\ge\bar\delta_i].
$$

**Independent derivation:** under rigid right multiplication, $p_{t+1}-p_t=R_tv_t$, so each norm equals $\|v_t\|$. Pure rotation and gripper movement do not independently enter this scalar. Calling it Windowed FK does not make it ordinary joint-to-end-effector forward kinematics.

The running-mean rule has an adaptive threshold, rather than no mathematical decision boundary. An alternative recent-extrema rule switches between full and pruned vision. Main experiments additionally start with two full windows and force full vision after three consecutive pruned windows. Their intermediate-state rule differs from the simplified expression; an appendix configuration says **net displacement** while the body uses **path length**. A return trip has low net displacement but nonzero traveled length, so this discrepancy matters.

## Computation and results

A simplified per-layer cost is:

$$
F(S)\approx2S^2D+8SD^2+6SDM.
$$

Average cost mixes full and pruned windows, including scoring overhead. Approximately **44%** of LIBERO windows are pruned. A 50% retention setting therefore removes roughly 22% of visual tokens averaged over all windows, rather than 50% globally.

| Setting | Mean success | Long success | T FLOPs | Listed speedup |
|---|---:|---:|---:|---:|
| OpenVLA-OFT | 97.1% | 94.8% | 7.91 | 1.00× |
| ADP, 30% retained | 94.4% | 84.2% | 5.85 | 1.35× |
| ADP, 40% retained | 94.8% | 87.2% | 6.14 | 1.29× |
| ADP, 50% retained | 96.3% | 91.2% | 6.43 | 1.23× |
| ADP, 70% retained | 96.3% | 91.2% | 7.03 | 1.13× |

These speedups are primarily **original/expected FLOPs ratios**, not end-to-end robot timings. At 50% retention, average success loses 0.8 percentage points and Long loses 3.6; at 30%, Long loses 10.6. Some multistage tasks lose about thirty points, which a single strong Spatial result would hide.

Real Kinova Jaco2 experiments use a fixed camera, 30 FPS imagery, 10 Hz Cartesian velocity control, approximately 100–150 demonstrations per task, and thirty evaluations on each of four tasks. Mean success changes **85.8%→88.3%**, while measured inference latency changes **76.9→51.8 ms**, approximately 1.49×. Small-sample success differences do not establish a universal accuracy gain.

Reversed relevance ranking gives only **34.6%** versus **96.3%** at 50% retention, supporting the score's utility. Removing dynamic gating gives 93.45%; a periodic variant gives 89.9%, but their computation budgets differ.

## Extensions and limits

**Independent analysis:** robot movement is a proxy for visual need. Large motion can be free-space travel or pursuit; small motion can be waiting or contact alignment. A stationary robot can face a suddenly moving object.

Comparing successive chunks requires alignment by absolute execution time. Otherwise matching array positions refer to different future instants. Translation, rotation, and gripper changes need separate units or physically meaningful scaling. Acceleration estimates also depend on action semantics: position commands require second differences, velocity commands first differences. Noise and unstable predictions can mimic urgent motion.

A useful proposed test combines robot-motion and environment-change signals under a fixed computation budget, measuring recovery, observation age, retained tokens, and actual execution. Predicted and achieved motion should also be distinguished under contact or saturation. These are project extensions, not ADP's validated results.

Reproduction needs the precise displacement definition, scoring normalization, camera quotas, layer, retention, cold start, forced-refresh period, base checkpoint, and action units. ADP saves per-forward visual computation; asynchronous execution saves waiting. Their effects should be measured independently before combining them.

## Source references

- [Source 1](https://openreview.net/pdf?id=ea6j8k8Rnw)
- [Source 2](https://arxiv.org/abs/2509.22093)
- [Source 3](https://github.com/chen7086/VLA-ADP)
- [Source 4](https://chen7086.github.io/VLA-ADP/)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
