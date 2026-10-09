---
{
  "title": "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Conditional action diffusion, receding-horizon control, and the distinction between sampling and robot time.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p08/",
  "translation_path": "reading/p08/",
  "paper": {
    "id": "P08",
    "title": "Diffusion Policy: Visuomotor Policy Learning via Action Diffusion",
    "topic_id": "action-policy",
    "year": "2023",
    "version": "2303.04137v5",
    "url": "https://arxiv.org/abs/2303.04137v5",
    "supplement": false,
    "summary_sha256": "c152ef2d38493de411b95ccb542088b5c0c4245434fff26743c8b4ef414b628a"
  },
  "layout": "post"
}
---

## Identity and problem

The notes use the **19-page arXiv:2303.04137v5**, March 14, 2024, corresponding to the IJRR extension of the RSS 2023 work. The extended author list is Cheng Chi, Zhenjia Xu, Siyuan Feng, Eric Cousineau, Yilun Du, Benjamin Burchfiel, Russ Tedrake, and Shuran Song. Added bimanual experiments must not be mixed with an older project-page task count.

Diffusion Policy learns an observation-conditioned distribution over continuous action sequences through iterative denoising. It combines sequence generation, visual conditioning, temporal networks, and receding-horizon control. It remains behavior cloning, rather than reward optimization.

## Three horizons and two clocks

$T_o$ is observation history, $T_p$ predicted action length, and $T_a$ executed length before replanning. Usually $T_a<T_p$. Long prediction supports consistency; shorter execution admits feedback sooner.

Physical time $t$ and denoising step $k$ are distinct. Denoising refines one proposed chunk computationally; the robot does not execute intermediate noisy tensors.

A standard DDPM expansion of the paper's mechanism is:

$$
A^k=\sqrt{\bar\alpha_k}A^0+\sqrt{1-\bar\alpha_k}\epsilon,
\quad \bar\alpha_k=\prod_{j=1}^k(1-\beta_j),
$$
$$
\mathcal L_\epsilon=\mathbb E\|\epsilon-\epsilon_\theta(O,A^k,k)\|_2^2.
$$

The corresponding reverse step is:

$$
A^{k-1}=\frac1{\sqrt{\alpha_k}}
\left(A^k-\frac{\beta_k}{\sqrt{1-\bar\alpha_k}}
\epsilon_\theta(O,A^k,k)\right)+\sigma_kz.
$$

These are explanatory standard forms with schedule-dependent coefficients. Noise variance varies with $k$. The noise predictor relates to the score by a scale factor:

$$
\nabla_{A^k}\log p_k(A^k\mid O)
\approx-\epsilon_\theta(O,A^k,k)/\sqrt{1-\bar\alpha_k}.
$$

It is not universally correct to drop that factor. Avoiding IBC-style normalization estimates explains part of the training advantage, without guaranteeing convergence for every architecture or dataset.

Real-robot inference uses DDIM with **100 training noise positions and ten inference iterations**, taking approximately **0.1 seconds on an RTX 3080**. Noise positions are not optimization-update counts.

## Conditioning and architecture

The policy generates actions conditioned on observations; it does not jointly generate future images. Visual features are computed once for a denoising sequence. The temporal CNN uses FiLM conditioning and can oversmooth sharp changes. The Transformer reads observation features through cross-attention and uses a causal action-time mask while still denoising a whole chunk in parallel.

The base visual encoder is ResNet18 with spatial softmax instead of global average pooling, and GroupNorm instead of BatchNorm. Different views have separate encoders; frames from a view share processing. End-to-end visual adaptation matters. The paper removes the borrowed model's goal-state inpainting; later fixed-prefix execution methods are separate developments.

## Why chunks help, and when they hurt

Independent left/right choices at each step can switch modes repeatedly. Joint sequence sampling can maintain one coherent route. Chunks also represent what happens before and after a pause. Their benefit comes from temporal joint modeling, not just single-step multimodality.

Long execution intervals postpone feedback. Around eight executed steps works well in several studied settings, and some delay ablations tolerate roughly four steps without losing peak performance. These are task-specific observations, not universal dynamic-control thresholds.

## Evidence and metric definitions

Simulation includes Robomimic Lift, Can, Square, Transport, ToolHang, Push-T, Multimodal Block Pushing, and Franka Kitchen. Single-arm real tasks include pushing, cup flipping, sauce pouring, and sauce spreading; the extension adds whisking, mat unfolding, and clothing folding.

Tables commonly report both the best checkpoint and the average of the last ten checkpoints. A Robomimic footnote says an evaluation issue resulted in **22 initializations**, rather than the generic 50, consistently across methods. Effective sample counts should follow that note.

| Setting | Reported result | Interpretation |
|---|---|---|
| Simulation aggregate | 46.9% average improvement | Not 46.9 percentage points on every task |
| Block Pushing $p_2$ | Transformer 0.94, BeT 0.71, CNN 0.11 | Backbone choice strongly matters |
| Kitchen $p_4$ | CNN 0.99, Transformer 0.96, BeT 0.44 | Frequency of at least four completed subtasks |
| Real Push-T | 95% success, IoU 0.80 | Human mean IoU 0.84; thresholds matter |
| Cup flipping | 90% over twenty trials | Specific precision task |
| Bimanual whisking | 55%, 210 demonstrations | Twenty evaluations |
| Mat unfolding | 75%, 162 demonstrations | Twenty evaluations |
| Clothing folding | 75%, 284 demonstrations | Twenty evaluations; middle-level collision avoidance |

Push-T coverage, Kitchen subtask frequencies, and sauce-region measures are different metrics. Comparing only the strongest variant does not show every CNN and Transformer configuration beats every baseline.

On Square-PH, a from-scratch ViT reaches 22%, a frozen pretrained ViT 70%, and low-rate fine-tuning 98%. This supports adaptation in that setting, not a universal verdict against frozen visual encoders. Position-versus-velocity findings are empirical, not a control theorem.

## System responsibilities and research use

The bimanual system observes actual and desired end-effector poses and gripper openings, with scene and wrist views. Haptic teleoperation improves expert data collection; this does not establish equivalent tactile inputs for the learned policy. Clothing-folding collision avoidance is handled by a middle-level controller.

**Independent analysis:** scores model the demonstration action distribution, rather than value, explicit contact risk, or environment dynamics. Missing recovery demonstrations are not automatically repaired. Iterative generation adds latency.

For dynamic VLA comparisons, measure sampling time, prediction/execution horizons, observation age, and target speed separately. NavDP inherits a generative trajectory idea but adds privileged geometry and scoring absent from this policy. Reproduction requires action normalization, history alignment, scheduler, EMA checkpoints, control semantics, and evaluation aggregation—not just matching network layers.

## Source references

- [Source 1](https://arxiv.org/abs/2303.04137v5)
- [Source 2](https://diffusion-policy.cs.columbia.edu/)
- [Source 3](https://github.com/real-stanford/diffusion_policy)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
