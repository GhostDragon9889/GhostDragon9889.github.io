---
{
  "title": "VLASH: Real-Time VLAs via Future-State-Aware Asynchronous Inference",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Future-proprioception conditioning supports asynchronous execution, without predicting future object states.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p18/",
  "translation_path": "reading/p18/",
  "paper": {
    "id": "P18",
    "title": "VLASH: Real-Time VLAs via Future-State-Aware Asynchronous Inference",
    "topic_id": "real-time",
    "year": "2025",
    "version": "2512.01031v1",
    "url": "https://arxiv.org/abs/2512.01031v1",
    "supplement": false,
    "summary_sha256": "0eee49b195fc4775af64fd9467279b84c7f6d64ff117a0f1ca5135c62ac86b89"
  },
  "layout": "post"
}
---

## Identity and contribution

Jiaming Tang, Yufei Sun, and colleagues propose VLASH in the stored **thirteen-page arXiv:2512.01031v1**, dated November 30, 2025. The source export separately notes that v2, July 26, 2026, changes the abstract's maximum reaction-delay improvement from **17.4× to 11.8×**. The tables below retain v1 rather than mixing revisions.

VLASH predicts the robot state at the expected execution start, then fine-tunes with **current images paired with offset future state/action targets**. It addresses proprioceptive timing, not explicit prediction of the future world.

## Future state and offset training

For additive increments, a simplified rollout is:

$$
\widehat s_{t+\Delta}=s_t+\sum_{j=0}^{\Delta-1}a^{\mathrm{old}}_{t+j},
\qquad A^{\mathrm{new}}\sim\pi(\cdot\mid o_t,\widehat s_{t+\Delta}).
$$

General controllers require a state-transition model rather than simple addition. Joint targets, velocity, torque, and SE(3) increments have different semantics; tracking errors, contact, and saturation make command-based predictions imperfect.

The image remains $o_t$. A robot-state forecast does not predict an independently moving object's position, collision, or newly arriving obstruction.

Training transforms:

$$
(o_t,s_t,A_t)\longrightarrow(o_t,s_{t+\delta},A_{t+\delta}),
\qquad\delta\in\{0,\ldots,\Delta_{\max}\}.
$$

Both state and target action must shift. Shifting only one would undermine the intended relationship. Zero offsets preserve synchronous behavior. Valid trajectory boundaries and deployed delay distributions matter. The method requires this fine-tuning; optional continuous state projection in real π₀.₅ experiments is also an architectural enhancement.

## Shared-prefix training and action quantization

Several offset branches share one visual-language prefix while attending only to their own state/action branch. Block isolation and reset position encodings prevent target leakage. Five offset pairs from one image are correlated, not five independently observed scenes.

On four H100s, measured step time falls **420.99→129.29 ms**, approximately 3.26×. But standard/VLASH success at 10K, 20K, and 30K updates is **94.1/87.1%, 97.1/94.4%, and 96.8/96.6%**. A per-step speedup is not an unconditional time-to-quality gain.

“Action quantization” here aggregates neighboring micro-actions into a macro-action, rather than quantizing network weights or discretizing token vocabularies:

$$
\widehat a_i=\sum_{j=0}^{q-1}a_{iq+j}.
$$

It changes waypoint density and timing. Rotations and grippers cannot generally be summed like translations; higher displacement per cycle can violate precision or physical limits. Its speed contribution must be separated from asynchronous scheduling.

## Simulation evidence

Kinetix uses twelve tasks, eight-step flow chunks, and 1,024 rollouts per point/task. At four-step delay, VLASH gives **81.7%** versus naive asynchronous **51.2%**, a **30.5-percentage-point** improvement. VLASH is trained for delays while RTC uses inference guidance, so the comparison is between different training/deployment packages.

LIBERO uses π₀.₅, 30K fine-tuning, five executed steps, and a stated 103 ms two-image model on a laptop RTX 4090.

| v1 setting | Mean success | Completion time | Listed acceleration |
|---|---:|---:|---:|
| Synchronous, with state | 96.8% | 8.4 s | 1.00× |
| Offset one | 97.2% | 7.2 s | 1.17× |
| Offset two | 97.1% | 6.4 s | 1.31× |
| Offset three | 94.6% | 5.7 s | 1.47× |
| Offset four | 93.1% | 5.8 s | 1.45× |

Larger offsets can hide more waiting while lowering accuracy. SmolVLA adds a second-model demonstration, rather than proving universal model independence.

## Real experiments and reaction metrics

Real Galaxea R1 Lite/SO-101 tasks use sixteen rollouts per method/task and **two-point progress scores**, not only complete-episode success. Unquantized VLASH averages 94% normalized score versus synchronous 83%, with mean time 18.8 versus 21 seconds. Quantization $q=2$ reaches 2.03× on one task; $q=3$ reaches 2.67× with a 4.7-point average-score loss.

The v1 17.4× figure compares a **500 ms synchronous execution window plus 30.4 ms inference** with inference alone on an RTX 5090. It is a scheduling-model ratio, not a complete stimulus-to-actuator measurement for every event phase. Camera delay and waiting for the next sample remain. The original export explicitly separates the later 11.8× abstract update.

Table-tennis and whack-a-mole demonstrations lack a complete quantified speed/trial/confidence protocol in v1. They should be treated as demonstrations.

## Limits and project experiments

**Independent analysis:** offset training uses true future state while deployment uses estimated state. Longer offsets strengthen reliance on proprioception but increase environmental staleness. Quantization can further change the effective offset distribution and contact precision.

A controlled study should separately ablate asynchronous execution, offset training, estimated future-state input, and action quantization. Bind the PDF/code revision, offset distribution, controller model, branch masks, state projection, and real timing. RTC guides continuity during inference; VLASH learns delay-aware conditioning; DynamicVLA uses multiframe dynamic training. Their reported task scores are not interchangeable.

## Source references

- [Source 1](https://arxiv.org/abs/2512.01031v1)
- [Source 2](https://arxiv.org/abs/2512.01031)
- [Source 3](https://github.com/mit-han-lab/vlash)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
