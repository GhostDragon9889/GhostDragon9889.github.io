---
{
  "title": "Realtime-VLA FLASH: Speculative Inference Framework for Diffusion-based VLAs",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Speculative drafts, parallel verification, and cache refresh trade fresh feedback against verification cost.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p15/",
  "translation_path": "reading/p15/",
  "paper": {
    "id": "P15",
    "title": "Realtime-VLA FLASH: Speculative Inference Framework for Diffusion-based VLAs",
    "topic_id": "real-time",
    "year": "2026",
    "version": "2605.13778v1",
    "url": "https://arxiv.org/abs/2605.13778v1",
    "supplement": false,
    "summary_sha256": "a325f73cd61aa3fd51ce0e5d94465bde72826b6891d990bd5b595efe0649a8b9"
  },
  "layout": "post"
}
---

## Identity and contribution

Jiahui Niu, Kefan Gu, Yucheng Zhao, and colleagues propose FLASH in **arXiv:2605.13778v1**, May 13, 2026, a fifteen-page manuscript. A lightweight draft predicts a chunk from current images; the original action expert verifies it using cached visual-language context at several flow times in parallel.

Only the longest accepted prefix executes, with full-path fallback when needed. This needs draft training and uses a **heuristic consistency test**, not exact speculative sampling that preserves the original output distribution.

## Fresh drafts and cached verification

Torch-π₀ on the stated RTX 4090D takes **11.3 ms visual encoding, 26.7 ms VLM prefill, and 20.0 ms action denoising**, totaling 58.0 ms. FLASH reduces full-prefill frequency and replaces serial denoising on some rounds with parallel checks.

The prediction horizon is fifty actions, usually with at most twelve executed before replanning. The full path refreshes current visual context and performs ordinary generation. The fast path still encodes **new images** for the draft; the verifier uses the latest full-path KV cache plus current proprioception. Fresh body state does not make cached environmental semantics fresh.

A roughly **110M-parameter Gemma-block draft** reads image features, language, state, and fifty action queries, then predicts the chunk in parallel. It learns frozen teacher-generated chunks, with prefix weighting. Per-suite LIBERO training uses AdamW, learning rate $2\times10^{-3}$, batch 64, 100 epochs, and Huber loss. The paper reports roughly four 4090D GPUs for six hours per draft. Keeping the base policy fixed does not make this training-free.

## Verification and fallback

For a draft endpoint $\hat A^d$, shared noise $\epsilon$, and selected times $\tau_k$, construct:

$$
\widetilde A^{\tau_k}=\tau_k\hat A^d+(1-\tau_k)\epsilon,
$$
$$
\hat A^{(k)}=\widetilde A^{\tau_k}
+(1-\tau_k)v_\theta(\widetilde A^{\tau_k},\tau_k\mid c_t,s_t).
$$

Continuous-channel distances compare reconstructed endpoints with the draft. The accepted length is the shortest branch's **contiguous prefix**, not a count of scattered passing steps. Zero accepted steps trigger full inference. Shared noise reduces comparison noise without turning agreement into correctness.

The appendix's error expression combines threshold, expert approximation, cache mismatch, and draft-path mismatch. It is explanatory rather than a proved task-safety bound. Two models can agree because both use stale context or share training errors.

Gripper-mode changes trigger stage fallback; periodic refresh limits accumulated drift. The final Long configuration uses two verification times, threshold 0.15, stage fallback, and full refresh after every two fast rounds. Those rules do not cover every contact-sensitive push, insertion, or obstacle event.

## Experimental timing and success

| Method | Mean success | Mean replanning latency | Cost per executed action |
|---|---:|---:|---:|
| Torch-π₀ | 94.1% | 58.0 ms | 5.0 ms |
| Triton-π₀ | 94.2% | 39.7 ms | 3.5 ms |
| FLASH-π₀ | 93.4% | 34.9 ms | 3.0 ms |
| FLASH + Triton | 93.8% | 19.1 ms | 1.9 ms |

Four suites use fifty trials per task. The **7.8 ms fast path** includes 4.7 ms encoding, 0.9 ms draft, and 2.2 ms verification; full paths still cost 39.7 ms. It is not the sustained whole-system latency. The 3.04× combined acceleration includes Triton and FLASH.

Fast rounds account for approximately 66.8% of replanning, accepting about 69.7% of the twelve-step window on average. Object and Long differ considerably. Long ablation success rises from **58.4% at 13.3 ms** to **84.6% at 24.1 ms** with both safeguards; the corresponding Torch baseline is 85.2%. More stringent checks reduce accepted work and can eliminate acceleration.

## Real dynamics and research limits

UR5 conveyor experiments use two RealSense cameras, 200 demonstrations per object, LoRA base tuning, and separately trained drafts. Demonstrations run at 6 m/min; tests run at 10, 13, and 15 m/min, with **ten trials per object/speed/method**. All use synchronous loops to isolate inference acceleration.

FLASH+Triton succeeds on toy dog/comb at **80%/90%, 50%/30%, and 20%/10%** across the three speeds. The last pair means two and one successes, not reliable arbitrary high-speed manipulation.

**Independent analysis:** verification can reject correct fresh-image corrections or accept stale actions when its cache is old. Short accepted prefixes increase replanning frequency; amortized costs need rejection and fallback accounting. Combining RTC would require variable-completion queue handling, which the paper leaves for future work.

Reproduction should bind draft/base checkpoints, teacher targets, distance normalization, verification times, thresholds, gripper encoding, refresh rules, backend, cache age, and actual executed prefixes. Measure false acceptance and false rejection alongside success and latency. FLASH changes how often complete inference runs; Running VLAs accelerates that complete inference, ADP prunes its input, and RTC/VLASH alter execution timing.

## Source references

- [Source 1](https://arxiv.org/abs/2605.13778v1)
- [Source 2](https://dexmal.github.io/realtime-vla-flash/)
- [Source 3](https://github.com/dexmal/realtime-vla-flash)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
