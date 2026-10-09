---
{
  "title": "Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "ALOHA hardware, CVAE action chunks, and temporal ensembling for fine bimanual imitation learning.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p07/",
  "translation_path": "reading/p07/",
  "paper": {
    "id": "P07",
    "title": "Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware",
    "topic_id": "action-policy",
    "year": "2023",
    "version": "2304.13705v1",
    "url": "https://arxiv.org/abs/2304.13705v1",
    "supplement": false,
    "summary_sha256": "6e9bdc4847a060ba3ec5866a938c0cc8f9a8bfaeb54a8cc7548b4266673be783"
  },
  "layout": "post"
}
---

## Identity and contribution

Tony Z. Zhao, Vikash Kumar, Sergey Levine, and Chelsea Finn introduce **ALOHA**, a low-cost bimanual teleoperation system, and **ACT**, Action Chunking with Transformers. The source is the 18-page **arXiv:2304.13705v1**, April 23, 2023, associated with RSS 2023.

ACT combines continuous action chunks, CVAE training, and temporal ensembling for fine manipulation from relatively few demonstrations. The hardware system and learning algorithm are separate contributions. Results are uneven: the hardest Thread Velcro task reaches only 20% final success.

## Hardware, observations, and action labels

ALOHA maps leader-arm joints to follower targets. Four 480×640 RGB cameras view the scene from the front, overhead, and both wrists. Teleoperation and recording run at 50 Hz. Each arm has six joints plus a gripper, giving **14-dimensional absolute joint targets**.

The **leader's requested position is the action label**, while the follower's measured position is part of the observation. Their discrepancy influences force through the lower-level controller. Substituting achieved follower positions changes the command semantics. Joint increments reduce performance in these experiments, without establishing that every robot should use absolute positions.

Fine bimanual contact amplifies early errors. Human demonstrations also vary in timing and valid motion modes. Joint chunk prediction can retain within-sequence correlations; a deterministic single-step regressor can average incompatible choices or stall at pauses.

## Chunking and temporal ensembling

Write a prediction as:

$$
\widehat A_t=(\widehat a_{t|t},\ldots,\widehat a_{t+k-1|t}).
$$

Querying every $k$ steps reduces the number of high-level decisions to approximately $T/k$, but long open-loop execution can lose responsiveness. Fixed chunks are not necessarily labeled semantic skills.

With frequent queries, temporal ensembling combines predictions aimed at the **same execution time**:

$$
\mathcal C_t=\{\widehat a_{t|j}:j\le t<j+k\},\qquad
 a_t=\frac{\sum_iw_i\mathcal C_t[i]}{\sum_iw_i}.
$$

This differs from smoothing commands for different physical times. In the paper, $w_i=\exp(-mi)$ and index zero is the **oldest** prediction. Positive $m$ favors older predictions; reducing $m$ gives later predictions relatively more weight. Candidate ordering must be checked before interpreting the formula.

**Independent analysis:** averaging improves continuity in the measured tasks, but need not preserve feasibility between multimodal actions or guarantee stability under moving targets.

## CVAE training and inference

The training encoder sees current joints and the demonstrated future chunk:

$$
q_\phi(z\mid q_t,A_t)=\mathcal N(\mu_\phi,\operatorname{diag}(\sigma_\phi^2)),
\quad z=\mu_\phi+\sigma_\phi\odot\epsilon.
$$

The decoder uses full observations and $z$. Reparameterization leaves sampling stochastic while allowing pathwise gradients. Future actions are available only during training. The encoder is removed at inference and **$z=0$** is used; this is not future leakage, and a nonlinear decoder at zero is not necessarily the mean of its full action distribution.

The body describes an L1 reconstruction objective:

$$
\mathcal L=\mathbb E_z\|f_\theta(o_t,z)-A_t\|_1
+\beta D_{\mathrm{KL}}(q_\phi\|\mathcal N(0,I)),
$$
$$
D_{\mathrm{KL}}=\tfrac12\sum_j(\mu_j^2+\sigma_j^2-1-\log\sigma_j^2).
$$

Algorithm 1 instead says MSE. The notes retain the discrepancy and follow the body for the explanatory objective. Reproduction needs the chosen code version. The KL weight regulates latent information; it is not directly a robot exploration-noise setting.

Four ResNet18 views yield 1,200 visual locations; joint and latent inputs bring the total to 1,202. Fixed temporal queries decode the chunk in parallel. A Transformer decoder is not necessarily autoregressive. The approximately 80M-parameter model is reported to train for five hours per task on an 11GB RTX 2080 Ti, with roughly 0.01-second inference.

## Experiments and ablations

Typical collection uses 50 demonstrations per task, or 100 for Thread Velcro. Effective demonstration duration is 10–20 minutes, while collection including resets and failures takes approximately 30–60 minutes.

| Real task | Final success |
|---|---:|
| Slide Ziploc | 88% |
| Slot Battery | 96% |
| Open Cup | 84% |
| Thread Velcro | 20% |
| Prep Tape | 64% |
| Put On Shoe | 92% |

Real results use one training seed and 25 evaluations. Simulation uses three seeds and 50 evaluations each. Cube Transfer reaches 86% with scripted data and 50% with human data; Bimanual Insertion reaches 32% and 20%. These are not uniform 80–90% results.

Without ensembling, increasing chunk length from one to 100 raises the four-setting simulation average from approximately 1% to 44%, then performance falls with near-episode open-loop chunks. Ensembling adds approximately 3.3 percentage points for ACT and four for BC-ConvMLP but hurts VINN. Removing the CVAE reduces human-data average success from 35.3% to 2%, while affecting scripted data much less.

The six-participant teleoperation study finds approximately 62% longer completion times at 5 Hz than at 50 Hz. It concerns **human teleoperation**, rather than a direct policy success-rate ablation.

## Project connections and limits

**Cross-paper analysis:** compare ACT and Diffusion Policy along distribution family, prediction horizon, execution horizon, and fresh-observation frequency independently. Dynamic experiments should examine the historical inertia of ensembling when a target moves, including tracking errors, collisions, and continuity under the same control frequency.

The evidence is mainly single-task learning with restricted position variation. It does not establish broad semantic generalization, zero-shot embodiment transfer, or social-rule compliance. Camera placement, demonstrated states, command semantics, chunk length, ensemble ordering, and reconstruction loss are essential reproduction interfaces. The source notes report no rerun experiments.

## Source references

- [Source 1](https://arxiv.org/abs/2304.13705v1)
- [Source 2](https://tonyzhaozh.github.io/aloha/)
- [Source 3](https://github.com/tonyzhaozh/act)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
