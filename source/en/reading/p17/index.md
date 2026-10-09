---
{
  "title": "Running VLAs at Real-time Speed",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "CUDA Graphs and operator changes accelerate π₀; the measured implementation is separated from streaming proposals.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p17/",
  "translation_path": "reading/p17/",
  "paper": {
    "id": "P17",
    "title": "Running VLAs at Real-time Speed",
    "topic_id": "real-time",
    "year": "2025",
    "version": "2510.26742v1",
    "url": "https://arxiv.org/abs/2510.26742v1",
    "supplement": false,
    "summary_sha256": "cb05acd6b59dc01094b0c5afe1e54f23d8af5d3accc31eaedcf8464b955ed291"
  },
  "layout": "post"
}
---

## Identity and measured scope

Yunchao Ma, Yizhuang Zhou, Yunhuan Yang, Tiancai Wang, and Haoqiang Fan study system-level π₀ acceleration in **arXiv:2510.26742v1**, October 30, 2025, eleven pages. CUDA Graphs, equivalent graph transformations, GEMM tuning, and fusion yield **27.3 ms two-view inference on an RTX 4090**.

Complete inference and ten pen-catching trials are measured results. A full 480 Hz force-feedback controller and progressive-chunk algorithm remain a proposed framework whose complete implementation is explicitly omitted.

## Computation and optimization

The main timing uses ten flow steps, a 63-step chunk, empty language prompts, and 32-dimensional padded state/actions. Two 224×224 views yield 512 vision tokens; 63 actions plus state yield 64 action-expert positions. Diagram repeat counts denote layers or denoising steps, not robot time.

CUDA Graphs replay stable GPU operations/buffers, reducing Python and launch overhead. Stable shapes and addresses matter. Two-view naive Torch drops from 106.5 ms to 45.8 ms with graphs before further optimization; an already optimized framework may offer a different gain.

Fixed RMSNorm scales can fold into following weights, but **input-dependent normalization cannot be deleted**. Consecutive linear action/time projections can combine; fixed denoising-time contributions can be precomputed. Q/K/V projections can merge. If the last VLM layer is used only for KV, unused downstream output computations can be removed.

Triton tuning adapts GEMM tiles to shapes and hardware; some PyTorch attention remains. FFN gates, activation, bias, residuals, and output writes can fuse. Mathematically equivalent operations can still change BF16 rounding, requiring same-input/same-noise output comparisons.

The measured two-view breakdown is roughly **4.059 ms vision, 12.503 ms language, and 11.001 ms action expert**. A faster synchronization microbenchmark actually hurts full-model fusion because of resource costs, illustrating why kernel-level gains need end-to-end checks.

## Results and performance models

| Implementation | One view | Two views | Three views |
|---|---:|---:|---:|
| Naive Torch | 105.0 ms | 106.5 ms | 113.9 ms |
| OpenPI/JAX | 43.8 ms | 53.7 ms | 67.6 ms |
| Optimized | 20.0 ms | 27.3 ms | 36.8 ms |

The two-view gain is approximately 1.97× over JAX and 3.90× over naive Torch. Three views exceed the 33.3 ms interval of a 30 FPS camera. View count, prompt, shape, precision, and hardware are essential qualifiers.

The roofline estimate uses:

$$
t_{\mathrm{roofline}}=\max
\left(\frac{2KM}{B_{\mathrm{memory}}},
\frac{NKM}{P_{\mathrm{MAC}}}\right).
$$

It assumes BF16 weight traffic and favorable activation/output caching. MAC/s differs from a FLOPS convention counting two operations per multiply-add. Estimated 13.7/20.6/27.6 ms bounds depend on caching, concurrency, and synchronization assumptions; they are performance models, not unconditional bounds across all algorithms.

## Streaming proposal versus established execution

Concurrent VLM and action-expert streams can reuse old caches. Two-view measurements are 27.3 ms for sequential VLM plus ten expert calls, 26.3 ms for concurrent ten calls, and 32.7 ms for concurrent sixteen calls. Thirty visual cycles with sixteen calls suggests about **480 expert evaluations per second**.

An expert call is commonly one denoising update. **480 calls/s, 480 trajectory samples/s, and 480 Hz closed-loop control are different.** Interpolation cannot increase sensor information rate.

The proposed progressive buffer would commit near-term actions sooner while revising uncommitted future actions from high-rate feedback. The paper does not supply complete per-position noise schedules, training objectives, commitment rules, or fusion logic. Figure 5 sketches vision, force/tactile, and slower text loops; favorable 2 ms force-feedback timing is not a demonstrated complete physical controller.

## Pen-catching evidence

Vertically aligned grippers release and catch a pen after roughly 30 cm of fall. The camera cannot see the upper gripper, reducing direct release cues. A 30 FPS 720p USB camera adds approximately two frames of delay; gripper closure takes about 60 ms.

Six hundred demonstrations produce one-dimensional gripper-state trajectories. Current and previous frames provide velocity cues; language is empty. Timestamped camera, inference, and output buffers support execution. After warmup, **ten consecutive tests all succeed**.

That demonstrates feasibility on this apparatus, not high-confidence reliability for arbitrary dynamic manipulation. The authors acknowledge the learning task is simple and smaller models or conventional methods could also work. It does not prove general 6DoF tracking, collision recovery, or a controlled human-performance comparison.

## Reproduction and project implications

**Independent analysis:** profile model computation, Python scheduling, sensors, preprocessing, networking, and actuators separately. If camera delay exceeds 100 ms, a 20 ms model improvement cannot yield a 20 ms visual reaction.

Bind fixed shapes, prompts, denoising steps, BF16, clock rates, warmup, synchronized timing, and noise-matched numerical outputs. CUDA Graphs may need recapture after changing views or horizons. Later repository support for π₀.₅ and other models is not automatically part of this 2025 result.

This work shortens complete forward passes; FLASH reduces how often they are needed; RTC aligns concurrent execution; DynamicVLA adds dynamic training and architecture. They address distinct layers and need separate ablations. The source export did not execute local performance tests.

## Source references

- [Source 1](https://arxiv.org/abs/2510.26742v1)
- [Source 2](https://github.com/dexmal/realtime-vla)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
