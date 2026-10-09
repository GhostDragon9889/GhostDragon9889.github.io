---
{
  "title": "Diffusion Policy: Distribution Modeling and Control Timing",
  "description": "A supplement to P08 on denoising time, action chunks, and the execution loop.",
  "date": "2026-10-09 20:07:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/diffusion-deep-dive/",
  "translation_path": "knowledge/diffusion-deep-dive/",
  "notebook": {
    "slug": "diffusion-deep-dive",
    "group": "policy",
    "sources": [
      "N022"
    ]
  },
  "layout": "post"
}
---

## Relationship to P08

This supplement organizes the newly uploaded Diffusion Policy derivations and links to [the existing P08 paper note](/en/reading/p08/). It does not count the same paper twice. The focus is action distributions, denoising, and physical-control timing.

## Conditional denoising

Let $A_0$ be a demonstrated action chunk and $o$ the visual/proprioceptive condition. A typical DDPM parameterization is

$$
A_k=\sqrt{\bar\alpha_k}A_0+\sqrt{1-\bar\alpha_k}\epsilon,\qquad
\mathcal L=\mathbb E\|\epsilon-\epsilon_\theta(A_k,k,o)\|^2.
$$

Training learns a conditional denoiser; inference generates actions from noise. Schedules, prediction parameterizations, and samplers differ. One simplified recurrence is not every implementation. The noise index $k$ belongs to internal generation time, not physical robot time.

## Modes and temporal consistency

Expressive distributions still depend on demonstration coverage, conditioning, and optimization. Joint chunk generation models temporal correlation, but smooth predicted sequences do not guarantee closed-loop stability, contact feasibility, or joint constraints.

Receding-horizon systems predict $H$ future actions and execute $K$ before observing again. Larger $K$ reduces query frequency while extending the interval without fresh visual feedback. More denoising steps change generation quality and compute cost, a separate tradeoff.

## Variables needed for reproduction

Record observation length, prediction horizon, executed horizon, denoising iterations, camera timestamps, inference latency, and action units. Absolute versus incremental commands, normalization, actuator limits, and low-level control rate also matter.

Dynamic-target comparisons should retain the same policy and execution budget while measuring observation age and synchronous/asynchronous scheduling. Complete original derivations remain available as source downloads; this edition adds no unverified success-rate or hardware-speed numbers.

Related reading: [behavior cloning and bins](/en/knowledge/behavior-actions/), [π₀](/en/reading/p09/), [RTC](/en/reading/p16/), and [DynamicVLA](/en/reading/p19/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/html/2303.04137v5)
- [Reference 2](https://arxiv.org/abs/1709.07871)
- [Reference 3](https://arxiv.org/abs/2006.10739)
- [Reference 4](https://arxiv.org/abs/2004.08249)
- [Reference 5](https://arxiv.org/abs/1509.06113)
- [Reference 6](https://arxiv.org/abs/1803.08494)
