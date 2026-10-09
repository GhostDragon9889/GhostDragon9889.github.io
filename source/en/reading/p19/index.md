---
{
  "title": "DynamicVLA: A Vision-Language-Action Model for Dynamic Object Manipulation",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "A compact multiframe policy, dynamic data, and stale-prefix removal target moving-object manipulation.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p19/",
  "translation_path": "reading/p19/",
  "paper": {
    "id": "P19",
    "title": "DynamicVLA: A Vision-Language-Action Model for Dynamic Object Manipulation",
    "topic_id": "real-time",
    "year": "2026",
    "version": "2601.22153v1",
    "url": "https://arxiv.org/abs/2601.22153v1",
    "supplement": false,
    "summary_sha256": "12b088f857dee847fdc24657a7af13d611e339bc35bea3df30bdf9a48a406ab4"
  },
  "layout": "post"
}
---

## Identity and contribution

Haozhe Xie, Beichen Wen, and colleagues propose DynamicVLA. The notes use the **fourteen-page arXiv:2601.22153v1**, January 29, 2026, with separately labeled clarifications from v2, October 1. The later record corrects an author spelling and clarifies execution timing; v1 experiments remain the basis of the table.

The system combines a compact multiframe VLA, **Continuous Inference (CI)**, stale-prefix removal through **LAAS**, and the **Dynamic Object Manipulation (DOM)** dataset. DOM is distinct from DOMINO.

## Architecture and generation

The approximately **430M-parameter** model uses FastViT spatial compression, sixteen layers from SmolLM2-360M, and a sixteen-layer action expert. Default twenty-step outputs pad state/actions to 32 dimensions. Input uses frames $t-2$ and $t$ from scene/wrist views: four images total, compressed into a short visual representation.

Multiple frames provide motion cues without exposing simulator object truth to deployment. Object pose and velocities instead support demonstration collection and evaluation. FastViT includes both mixer and attention components; its efficiency does not mean all attention is removed.

The original notes flag a v1 flow-notation inconsistency. For

$$
A^\tau=\tau A+(1-\tau)\epsilon,
$$

an increasing noise-to-data clock implies velocity $A-\epsilon$ and covariance $(1-\tau)^2I$. The printed opposite sign/unsquared covariance needs a consistent interpretation with code and integration direction. This is a PDF formula check, not an allegation that the implementation uses the same mistake.

## Continuous inference and valid suffixes

CI immediately starts another inference after completion, rather than waiting for the current chunk to finish. It does not insert new images into a forward pass already running.

LAAS aligns each chunk to its observation start time, discards positions whose intended execution time has passed, and uses newer completed predictions for overlapping future times. It corrects action indexing; the surviving suffix can still depend on stale environmental information.

v1 calls LAAS “Latent-aware”; the v2 body uses **Latency-aware Action Streaming**, although some metadata retain older wording. The later clarification gives **0.226 s per chunk, 25 Hz action indexing, and twenty predicted steps**. The v1 “88 Hz” approximately equals $20/0.226$, which is action-generation throughput, not eighty-eight fresh visual decisions per second.

With latency of $m$ steps and horizon $n$, returning leaves $n-m$ valid steps. Continuous coverage approximately requires **$n\ge2m$** under constant latency. At roughly six-step latency, twenty-step predictions leave useful margin; an eight-step horizon would not cover the next call. Actual queues and delay variation still need checks.

## Dynamic data and training

DOM has approximately **200K simulated episodes, 2,824 scenes, 206 object types, and 2K real episodes**. Its nine dimensions cover reaction, adaptation, sequencing, appearance, spatial reasoning, motion perception, visual/motion generalization, and disturbance robustness.

The source has differing speed-range descriptions, 0–0.75 versus 0–1 m/s; actual sampling configuration should decide. Simulator demonstrations use object truth in a closed-loop state machine, predict about 0.23 seconds ahead, and can retry after drops. Real collection uses masks, multiple cameras, triangulation, and fitted motion. Mask centers alone do not establish full arbitrary rigid-body 6D pose, so orientation estimation assumptions need verification.

Training uses 150M COYO image–text pairs, simulated actions, then robot-specific real data. The stated budget is **32 A100s for approximately two weeks**, not implied by the modest approximately 1.8GB deployment memory.

## Results and ablations

The v1 simulation evaluation uses **1,800 trials per method** across nine dimensions.

| Method | Mean success |
|---|---:|
| Diffusion Policy | 0.38% |
| OpenVLA-OFT | 1.33% |
| π₀ | 8.11% |
| π₀.₅ | 11.06% |
| SmolVLA | 12.67% |
| GR00T-N1.5 | 13.05% |
| VLA-Adapter-Pro | 13.61% |
| VLASH | 12.33% |
| DynamicVLA | 47.06% |

The gain over the strongest listed mean is **33.45 percentage points**. Motion perception remains at 33.5% and disturbance robustness at 26.5%. Longer traveled paths can reflect more completed work; short failed trajectories are not automatically efficient. Termination times include failure/timeout cases.

Without CI/LAAS success is 30.27%; LAAS alone gives 36.11%; CI alone 39.72%; both give 47.06%. Changing language/vision architectures also changes latency, so larger-model declines do not establish a universal scaling law.

Single-frame success is 38.22%, adjacent-frame 43.39%, and the two-step-spaced pair 47.06%. Sixteen language layers give 47.06% at 0.226 seconds; twenty-four give a slightly higher 48.44% at 0.317 seconds. Sixteen is a cost compromise, not the best on every metric. CI/LAAS improve SmolVLA and π₀.₅ but do not match the full DynamicVLA system.

Real Franka/PiPER evaluation covers sixteen tasks with controlled launches. Disturbance robustness is not reported because of reproducibility difficulties; plotted results are not universal 100% values.

## Limits and project use

**Independent analysis:** suffix alignment cannot predict an unexpected collision before fresh inference completes. Rigid-body state-machine demonstrations constrain motion/contact diversity, and short histories do not provide complete long-term memory. Flexible objects, sustained occlusion, unmodeled forces, and exhausted queues need separate evaluation.

Unlike RTC, LAAS does not use gradient-guided prefix completion; unlike VLASH, it does not explicitly train future-proprioception conditioning; unlike FLASH, it has no draft verifier. Reproduction must fix assets, version, views, delta-action conventions, prediction/execution indices, continued simulator motion during inference, and source-observation timestamps for every executed action. The source notes report no simulator or robot reruns.

## Source references

- [Source 1](https://arxiv.org/abs/2601.22153v1)
- [Source 2](https://arxiv.org/abs/2601.22153)
- [Source 3](https://arxiv.org/html/2601.22153v2)
- [Source 4](https://github.com/hzxie/DynamicVLA)
- [Source 5](https://haozhexie.com/project/dynamic-vla)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
