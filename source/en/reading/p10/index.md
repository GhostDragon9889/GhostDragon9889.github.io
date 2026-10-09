---
{
  "title": "MetaVLA: Unified Meta Co-training For Efficient Embodied Adaption",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Demonstration context and deterministic meta co-training improve unified multitask VLA adaptation.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p10/",
  "translation_path": "reading/p10/",
  "paper": {
    "id": "P10",
    "title": "MetaVLA: Unified Meta Co-training For Efficient Embodied Adaption",
    "topic_id": "action-policy",
    "year": "2025",
    "version": "2510.05580v3",
    "url": "https://arxiv.org/abs/2510.05580v3",
    "supplement": false,
    "summary_sha256": "3b1e95b96d84f50a0c6918d5696b3431d80b131a5199dbb1616e7d1898b82da9"
  },
  "layout": "post"
}
---

## Identity and contribution

MetaVLA, by Chen Li, Zhantao Yang, Han Zhang, and colleagues, first appeared October 7, 2025. The notes use **arXiv:2510.05580v3**, January 28, 2026, a 25-page manuscript; the project page identifies ICLR 2026. The stored title spells **Adaption**, while the website uses **Adaptation**.

The method improves multitask VLA post-training by reading demonstrations from a context bank through a **Meta-Action-Reasoner (MAR)**. Its main comparison is with OpenVLA and naive multitask SFT, not a claim of the highest absolute VLA performance: the table's π₀.₅ average is 96.9%, above OpenVLA-based MetaVLA's 79.3%.

## Target supervision versus context

Naively mixing heterogeneous tasks can hurt optimization. MetaVLA separates target data, which define the desired action loss, from context data, which supply related experience. Auxiliary GR00T actions enter context rather than being equally mixed into target supervision.

Given target features $x_T$ and context observation–action pairs $(x_{C_i},y_{C_i})$, self-attention encodes contextual pairs and cross-attention retrieves target-relevant information:

$$
r_T=\operatorname{Attention}(Q(x_T),K(x_C),V(r_C)).
$$

This is an explanatory interface expression. It is not text-only retrieval or uniform feature averaging. MAR representations are concatenated with OpenVLA/Llama2 hidden states before predicting action-token logits. Training uses LoRA and a small MAR with latent dimension 2,048, rather than retraining a VLA from scratch.

## Probabilistic formulation and the deterministic default

The paper presents an Attentive Neural Process formulation:

$$
p(y_T\mid x_T,x_C,y_C)=
\int p(y_T\mid x_T,r_T,z)q(z\mid\bar s_C)\,dz.
$$

A variational objective combines target likelihood with a KL term aligning a target-informed posterior and a context-only prior. Target action labels are available during training, not deployment; putting them into inference context would leak labels.

However, the **main experiments disable the stochastic path**. Deterministic MAR gives 77.8% average and 55.3% Long success, versus 77.3% and 53.0% with the stochastic module. The principal results therefore must not be explained as gains from random latent variables or KL regularization.

This is amortized context conditioning, not a MAML-style gradient inner loop. The experiments do not establish universal adaptation to entirely unseen skills from a few online demonstrations.

## Data and computation

Four LIBERO suites each contain ten tasks and 500 demonstrations, split into disjoint context and target sets. Auxiliary context includes five single-arm GR00T tasks plus bimanual Threading, introducing different views and 14-dimensional actions. The context is refreshed every **200 training steps**, sampling **32 examples per context task**, not 32 for the whole bank.

Training uses **75,000 steps, eight A100 80GB GPUs, total batch 128, LoRA rank 32, zero dropout, learning rate $5\times10^{-4}$**, and FlashAttention-2. Evaluation uses one 24GB RTX 4090. The paper reports approximately 24 hours compared with about 100 hours in its eight-GPU setting. That is not safely interpretable as only 24 aggregate single-GPU hours.

## Results and ablations

| OpenVLA-based method | Total steps | Goal | Spatial | Object | Long | Mean |
|---|---:|---:|---:|---:|---:|---:|
| Four separate models | 240K | 76.2% | 84.7% | 87.0% | 51.8% | 74.9% |
| Unified SFT | 75K | 77.8% | 84.8% | 87.4% | 54.7% | 76.2% |
| MAR, no auxiliary tasks | 75K | 78.9% | 88.5% | 88.5% | 55.3% | 77.8% |
| MAR, six auxiliary tasks | 75K | 78.7% | 89.9% | 88.9% | 59.8% | 79.3% |

The improvement over four separate models is **4.4 percentage points**, and eight points on Long. Reducing total steps from 240K to 75K is 68.75%; 240K is the sum across four models, not each model's budget.

Naive SFT with the same heterogeneous auxiliary tasks gives only 8.6% at 75K and 14.5% at 187.5K. This supports the importance of how data are used, but changes both structure and supervision organization. It does not isolate one attention layer or prove gradient conflict is the only cause.

With the Qwen2.5-VL-based 3B NORA-Long backbone, separate models average 85.4%, unified SFT 87.3%, MAR 90.3%, and auxiliary-context MAR 91.8%. This provides two-backbone evidence, not validation of every possible VLA interface.

Context sizes 4, 8, 16, and 32 give means 73.2%, 74.8%, 76.7%, and 77.8%. Using only Bridge/Fractal context yields 74.4%, supporting context relevance. Gains need not continue with unlimited context. Separately training each suite with MAR sacrifices unified-checkpoint efficiency.

Token timing changes from **181.8 tokens/s and 5.5 ms/token** to **172.4 tokens/s and 5.8 ms/token**. The additional 0.3 ms/token is not an entire robot-action inference latency; image encoding, multiple tokens, and transfer remain.

## Limits and project use

Evidence is concentrated in LIBERO simulation, without real-robot validation. Context selection, refreshing, action encoding, memory scaling, and cache cost need further evaluation. Disjoint examples do not automatically mean disjoint skills.

**Independent analysis:** MAR offers a way to use heterogeneous demonstrations without directly mixing incompatible action targets. Combining it with RL would require stable context across rollout and updates, or consistent treatment of changing features in PPO ratios and replay. That integration is a proposal, not part of the reported algorithm.

Reproduction should record suite splits, per-task context sampling, disabled stochastic defaults, the 200-step refresh rule, matched checkpoints, cumulative updates, device hours, token timing, and full action latency. The export records the official code link as “Coming soon” and claims no executed implementation.

## Source references

- [Source 1](https://stellar-neuron.github.io/metavla/)
- [Source 2](https://arxiv.org/abs/2510.05580v3)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
