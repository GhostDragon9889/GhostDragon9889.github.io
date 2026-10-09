---
{
  "title": "Survey of Vision-Language-Action Models for Embodied Manipulation",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Architecture, data, pretraining, post-training, and evaluation, with corrections to surveyed descriptions.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p03/",
  "translation_path": "reading/p03/",
  "paper": {
    "id": "P03",
    "title": "Survey of Vision-Language-Action Models for Embodied Manipulation",
    "topic_id": "foundations",
    "year": "2025",
    "version": "2508.15201v2",
    "url": "https://arxiv.org/abs/2508.15201v2",
    "supplement": false,
    "summary_sha256": "f9c5bac351d3e8e53917debe787f22aae35da6ee9bab101117e7b5f3e1ac9f1a"
  },
  "layout": "post"
}
---

## Identity and reading scope

The display title is an **English translation of a Chinese-language paper title**, not an asserted official English title. The source is **arXiv:2508.15201v2** (2025), by Haoran Li and colleagues. Its organizing framework follows five stages: architecture, data, pretraining, post-training, and evaluation.

The review is useful as a pipeline-level research map. Its model descriptions and benchmark tables summarize other papers; they do not constitute common training runs or a comparison on shared hardware. Corrections below concern the stored v2, without assuming that later journal versions retain the same issues.

## Architecture and action interfaces

A VLA connects visual observations and language to executable actions. Visual encoders, language models, fusion mechanisms, proprioceptive inputs, and action heads can be combined in end-to-end or hierarchical systems. The important comparison is which information reaches the action generator, and when.

**Action coordinates and action distributions are separate axes.** Joint targets, end-effector poses, and increments specify the controlled variables. Classification, regression, CVAEs, diffusion, and flow specify how those variables are generated. “Joint actions” and “diffusion actions” are not mutually exclusive categories.

End-effector commands still need coordinates, units, rotation conventions, and a downstream solver. Mapping a desired pose to joint configurations is generally inverse kinematics; inverse dynamics applies when forces or torques and motion dynamics are involved. The notes flag a terminology issue on page 9.

Discrete methods include bins, clustering, residual quantization, and temporal compression. Continuous methods can preserve precision and multimodality, but their speed depends on sampling steps, parallel decoding, normalization, and architecture. Deterministic regression may average incompatible modes; this does not make every discrete/continuous tradeoff universal.

In hierarchies, a high-level model handles longer horizons while a lower-level controller may read newer local observations. A VLM followed by an action expert is not automatically a low-level feedback loop with independent observation access. This distinction connects the review to FLASH, Running VLAs, and VLASH.

## Four data sources

Internet image–text data supply semantics without robot-action labels. Video supplies temporal change, but motion can arise from cameras, humans, or external objects and does not uniquely identify robot commands. Video can support future prediction, human-to-robot mapping, or latent-action learning followed by robot alignment.

Simulated trajectories provide states, actions, contacts, and rewards under controlled variation, subject to contact, deformable-object, sensor, and dynamics gaps. Real trajectories are closer to deployment but require costly collection, resets, and embodiment harmonization. DROID, OXE, RH20T, RoboMIND, and AgiBot World differ in scale, modalities, embodiment, and scene coverage.

**Independent analysis:** datasets can overlap, including within OXE, so table rows cannot simply be summed into a deduplicated total. Inheriting a VLM trained on a dataset also differs from directly using that dataset in VLA training.

## Pretraining and post-training

The review distinguishes robot-domain training, staged cross-domain training, joint cross-domain training, and reasoning-enhanced supervision. Their risks respectively include limited coverage, stage-transition forgetting, gradient competition, and incorrect or costly intermediate annotations.

A generic explanatory joint objective is:

$$
\mathcal L=\lambda_a\mathbb E_{D_a}[\mathcal L_a]
+\lambda_v\mathbb E_{D_v}[\mathcal L_v]
+\lambda_p\mathbb E_{D_p}[\mathcal L_p].
$$

This is a reading-note abstraction, not the paper's new algorithm. Sampling rates, loss normalization, and gradient routing matter alongside the weights. Reasoning text can guide decomposition, but does not prove physical reasoning or correct execution. Caching, selective generation, and dropping reasoning reflect a runtime tradeoff.

Supervised fine-tuning uses target-robot demonstrations. Inconsistent actions may reflect noise or valid multimodality. Reinforcement fine-tuning may update a small policy, residual, adapter, critic, or action expert, and may distill improved behavior into a larger model. “Using RL” does not establish full-model, on-robot updates; ConRFT, iRe-VLA, RLDG, and RIPT-VLA have different data and update scopes.

Inference-time selection can sample candidates and choose:

$$
A^{(j)}\sim\pi_\theta(\cdot\mid o,\ell),\qquad
j^*=\arg\max_jQ_\phi(o,A^{(j)}).
$$

The policy can stay fixed while the evaluator requires substantial training. V-GPS, FOREWARN, and Hume illustrate this distinction. Candidate generation and scoring also increase latency.

## Evaluation and quantitative interpretation

The review separates embodiment, task, and environment generalization. Real robots test perception, control, and contact together; simulators support repeatable variation; learned world models reduce physical calls but introduce their own response errors and evaluation bias.

Reported LIBERO averages include OpenVLA **77%**, OpenVLA-OFT **95%**, and Hume **98%**. SimplerEnv results vary sharply: π₀ is reported at **73%** for Google Robot's Pick Coke Can and **0%** for WidowX's Put Carrot in Plate. These are transferred results under specific checkpoints and protocols, not newly retrained common-condition measurements.

The RoboArena table gives π₀.₅-DROID a relative rating of **1883**, standard deviation **26.1**, from **339** A/B evaluations; π₀-DROID has **894**, **28.5**, and **781**. Ratings are not success counts or percentages, and rating differences are not success-rate percentage points.

**Independent analysis:** realistic predicted video is insufficient evidence of correct action response. Intervention tests and agreement with real-world policy rankings are needed to determine whether a world-model evaluator actually reacts causally to actions.

## Corrections retained from the original notes

- SynGrasp-1B is described as 10B frames in one passage and 1B in the table; WebLI also has inconsistent scale descriptions. Consult dataset papers before using either number.
- A statement that RT-2 did not directly inherit VLM weights conflicts with RT-2's original description of co-fine-tuning pretrained vision-language models.
- HPT is incorrectly expanded as hierarchical prompt tuning in a table. The primary work is **Heterogeneous Pre-trained Transformers**, with heterogeneous stems, a shared trunk, and task heads.
- LIBERO, CALVIN, and RLBench are task suites or platforms with underlying engines; they are not interchangeable technology layers.
- Claims that supervised fine-tuning suits only low precision, that RL guarantees higher precision, or that world models necessarily reproduce better dynamics require task-specific evidence. ACT and Diffusion Policy already support some fine manipulation through supervision.

## Connections and proposed work

**Cross-paper analysis:** action modeling connects to ACT, Diffusion Policy, and π₀; adaptation to MetaVLA, π_RL, and RL Token; timing to RTC, FLASH, VLASH, and DynamicVLA; environment evaluation to Lyra 2.0 and SAGE-3D. These are project-level connections, rather than a claim that a 2025 survey cited every later paper.

Useful experiments separate high-level semantic and low-level visual update frequencies, recovery-data effects from parameter updates under equal interaction budgets, and video realism from causal response to unseen actions. Hold the backbone, sensors, data, and budgets fixed; report task success, recovery, observation-to-action delay, and action smoothness. The review supplies a map and a checklist, while precise implementation and scores require primary-source verification.

## Source references

- [Source 1](https://arxiv.org/abs/2508.15201v2)
- [Source 2](https://arxiv.org/pdf/2508.15201v2)
- [Source 3](https://robotics-transformer2.github.io/)
- [Source 4](https://proceedings.mlr.press/v229/zitkovich23a.html)
- [Source 5](https://proceedings.neurips.cc/paper_files/paper/2024/hash/e0f393e7980a24fd12fa6f15adfa25fb-Abstract-Conference.html)
- [Source 6](https://liruiw.github.io/hpt/)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
