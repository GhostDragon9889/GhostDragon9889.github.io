---
{
  "title": "Towards Generalizable Robotic Manipulation in Dynamic Environments",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "DOMINO data and PUMA motion representations study dynamic manipulation under a bounded simulator protocol.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p20/",
  "translation_path": "reading/p20/",
  "paper": {
    "id": "P20",
    "title": "Towards Generalizable Robotic Manipulation in Dynamic Environments",
    "topic_id": "real-time",
    "year": "2026",
    "version": "2603.15620v3",
    "url": "https://arxiv.org/abs/2603.15620v3",
    "supplement": false,
    "summary_sha256": "1e63c8906da101786006e94f48a816189caa6519e335f4a513a71673df14d3e0"
  },
  "layout": "post"
}
---

## Identity and contribution

Heng Fang, Shangru Li, Shuhan Wang, and colleagues introduce **DOMINO**, a dataset/benchmark, and **PUMA**, a dynamic-manipulation policy. The notes use **arXiv:2603.15620v3**, June 30, 2026, a 43-page manuscript; the project records ECCV 2026. DOMINO is distinct from DynamicVLA's DOM.

The work studies motion-sensitive representations and dynamic data. It does not introduce RTC-style joining, FLASH verification, or LAAS prefix removal. The appendix leaves **real control-delay integration in the simulator benchmark for future work**, limiting direct comparisons with latency-aware systems.

## Dataset and dynamic assumptions

DOMINO contains **117,000 expert trajectories, 35 tasks, and five robot configurations**. Main experiments use **Aloha-AgileX, clean scenes, Level 1, DOMINO@0.1**, rather than jointly validating all embodiments and randomized conditions.

Level 1 uses planar constant-velocity motion; Level 2 uses polynomial curves; Level 3 joins two or three independently sampled segments with abrupt transitions. The body and appendix differ in sampling details. In particular, some Level 2 acceptance checks constrain average speed rather than every instantaneous speed.

SAPIEN/RoboTwin generation first finds a static feasible robot path, then places the moving object so it reaches the desired contact location at the correct time:

$$
p_{\mathrm{start}}=p_{\mathrm{end}}-vT_{\mathrm{sec}}.
$$

Before grasp contact, the target follows a prescribed kinematic path. On contact it becomes a physics-controlled body and **stops its autonomous motion**. This retains post-contact physics but excludes continued external driving and some coupled dynamics.

## PUMA inputs and auxiliary supervision

The backbone is Qwen3-VL-4B. The actual configuration uses language, current multiview images, and historical flow, **without extra proprioception**. A parallel MLP predicts fifteen-step chunks of **fourteen-dimensional absolute joint actions**.

Four historical frames spaced four frames apart are compared with the current frame. Farneback flow on 64×64 grayscale images is color-coded, percentile-normalized, and thresholded before visual encoding. Flow includes image-plane motion from objects, cameras, and occlusion; it is not separated metric 3D velocity. Training caches flow; deployment computes it from a history buffer.

World queries predict future object features. Frozen GroundingDINO and SAM2 locate/mask the task object; frozen DINOv2-B/14 provides pooled future-region targets. Default supervision covers four future frames spaced four frames apart. Object parsing and segmentation errors affect the targets.

The combined objective is:

$$
\mathcal L=\frac1K\sum_i\|\hat a_{t+i}-a^*_{t+i}\|_1
+0.05\frac1N\sum_i\left(1-
\frac{z_{t+i}^\top f_{t+i}}{\|z_{t+i}\|\|f_{t+i}\|}\right).
$$

This is imitation plus auxiliary feature prediction, not an implemented RL cost-minimization algorithm. Future target frames are training supervision, not inference inputs. Feature similarity does not directly enforce metric object trajectories or calibrated future uncertainty.

Training uses eight A100s, full-parameter fine-tuning, mixed precision, checkpointing, and ZeRO-2. Real adaptation uses LoRA from simulation weights.

## Evidence and metrics

Simulation evaluates 100 episodes per task. **SR** requires complete task success. **Manipulation Score (MS)** combines final end-effector/object geometry with penalties; it is neither success probability nor a full contact-quality measure. The displayed route formula omits explicit negative clipping and zero-denominator protection; implementation needs checking. Taking the better arm's progress can underweight the other arm's failure.

| Main setting | SR | MS |
|---|---:|---:|
| OpenVLA | 1.54% | 6.10 |
| RDT-1B | 5.34% | 17.71 |
| π₀ | 8.17% | 23.96 |
| π₀.₅ | 9.63% | 26.17 |
| OpenVLA-OFT, Prismatic | 9.06% | 24.06 |
| OpenVLA-OFT, reimplemented Qwen3-VL | 10.86% | 30.49 |
| PUMA | 17.20% | 34.97 |

The **6.34-point** gain over the same-backbone OFT is not a 6.34% relative increase. About 82.8% of episodes still fail. Static-to-dynamic drops are large; simply adding dynamic data gains less than three points for several baselines. Giving OFT privileged future trajectories improves 9.06%→10.33% SR and 24.06→32.00 MS: spatial guidance alone does not solve contact.

Flow without future supervision gives 11.71%; two future targets 14.80%; four 17.20%; six 13.62%. Raw RGB history plus two targets gives only 8.15% in this configuration. Longer prediction is not always better. Interception is 24.2% while sustained tracking is 8.9%.

Adapted Level 2/3 results are 10.5%/4.6%, **after target-level LoRA**, not zero-shot transfer. Mixed-data and doubled-data results use different prediction counts or task subsets and should not be merged with the main table.

## Real tasks, latency, and project use

Five real Piper tasks use fifty demonstrations and twenty evaluations each. PUMA successes are 50%, 45%, 35%, 25%, and 55%, averaging **42%**, versus π₀.₅ 24%. Controlled string-driven straight motion approximates Level 1; arbitrary curves, collisions, and unseen scenes are not established.

On an RTX 4090, mean inference is **103.7 ms**, including 98.3 ms backbone, 3.45 ms flow, and 2.0 ms preprocessing, about 9.6 queries/s. Multiplying by fifteen chunk steps does not give a fresh-vision feedback rate.

**Independent analysis:** PUMA improves motion representation; scheduling/latency methods solve a different interface. Dynamic data, successful contact, and timely real-world response remain separate targets. Bind tasks, embodiment, clean/randomized setup, levels, speed interpretation, sampling gaps, action normalization, segmentation caches, stop-on-contact rules, and MS code. Add real elapsed simulator motion and observation-age reporting when studying execution latency. The official repository's simulator/policy environments and episode manifests aid reproducibility; the source notes did not run them.

## Source references

- [Source 1](https://arxiv.org/abs/2603.15620v3)
- [Source 2](https://arxiv.org/abs/2603.15620)
- [Source 3](https://h-embodvis.github.io/DOMINO/)
- [Source 4](https://github.com/H-EmbodVis/DOMINO)
- [Source 5](https://github.com/H-EmbodVis/DOMINO/blob/main/policy/PUMA/README.md)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
