---
{
  "title": "Vision Language Action Models in Robotic Manipulation: A Systematic Review",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "A model–data–simulation map, dataset description scores, and checks on heterogeneous evaluation claims.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p01/",
  "translation_path": "reading/p01/",
  "paper": {
    "id": "P01",
    "title": "Vision Language Action Models in Robotic Manipulation: A Systematic Review",
    "topic_id": "foundations",
    "year": "2025",
    "version": "2507.10672v1",
    "url": "https://arxiv.org/abs/2507.10672v1",
    "supplement": false,
    "summary_sha256": "9aad2302a711d5946c8917925ea843378720dd70bb75e7161cb36d11c8f62e8c"
  },
  "layout": "post"
}
---

## Identity and scope

The source notes use the 28-page **arXiv:2507.10672v1** preprint, dated July 14, 2025, by Muhayy Ud Din, Waseem Akram, Lyes Saad Saoud, Jan Rosell, and Irfan Hussain. The authors later cite a journal article titled *Multimodal fusion with vision-language-action models for robotic manipulation: A systematic review*, Information Fusion 129 (2026), 104062, DOI 10.1016/j.inffus.2025.104062. The title change does not create a second paper in this collection. Findings below concern the stored preprint.

The paper reports coverage of **102 models, 26 datasets, and 12 simulation platforms**. These are counts under its inclusion rules, rather than an unbiased census of the entire field. Its main contribution is a joint map of architectures, data, simulators, applications, and evaluation, together with two descriptive dataset scores.

## Literature selection and architectural interfaces

The search covers IEEE Xplore, Elsevier, Springer Nature, MDPI, Wiley, and arXiv. A conversational model supplies additional candidate names, followed by deduplication and manual checking. The scope extends beyond manipulation to navigation, GUIs, games, mobile systems, and low-power deployment. Consequently, individual entries may be policies, components, planners, or data platforms.

**Independent analysis:** the search description is useful, but is not equivalent to a preregistered systematic-review protocol with complete exclusion reasons and agreement between independent reviewers. Yearly growth plots also reflect changes in scope and preprint coverage.

A useful interface abstraction is:

$$
z_v=f_v(I),\quad z_l=f_l(\ell),\quad z_q=f_q(q),
\qquad A\sim p_\theta(\cdot\mid F(z_v,z_l,z_q)).
$$

This is an explanatory expression from the reading notes, not a claim that every surveyed model has three separate encoders. Observations may include images, video, depth, multiple views, or feedback. Outputs may be discrete tokens, continuous commands, action chunks, or intermediate representations.

| Component | Main choices | Question for comparison |
|---|---|---|
| Vision | CNNs, ViTs, contrastive or fused backbones | Is precise spatial information retained? |
| Language | Text encoders, pretrained LLMs/VLMs | Does language causally affect the action? |
| Fusion | Token concatenation, cross-attention, modular designs | When is each input available, and is it stale? |
| Actions | Autoregression, regression, CVAEs, diffusion, flow | How are precision, multimodality, continuity, and latency traded? |
| Deployment | End-to-end policies, components, hierarchies | Which component actually causes the improvement? |

A diffusion decoder in a schematic does not imply that all listed models use diffusion. A Transformer backbone does not imply autoregressive action generation.

## Data organization and alignment

The review organizes visual, linguistic, and control data into episodes. A usable robotics dataset additionally needs proprioception, timestamps, calibration, action definitions, and validity flags. JSON, TFRecord, and HDF5 are containers; readable files do not establish temporal or coordinate alignment.

**Independent analysis:** an image exposed at $t-\delta$ paired with a command issued at $t$ defines a delayed mapping. Calling both the same frame hides a control-relevant discrepancy. Measured joint positions and requested positions also have different causal roles. These details are especially important for dynamic policies.

The dataset map includes navigation, question answering, multitask robot data, tactile sensing, and multiple views. It describes available resources; it does not establish a universally superior dataset through common training experiments.

## Dataset description scores

The proposed task score is:

$$
\mathcal C_{\mathrm{task}}(\mathcal D)
=\alpha_1\log(1+T)+\alpha_2S+\alpha_3D+\alpha_4L.
$$

$T$ is average action length, $S$ counts high-level skills, $D\in[0,1]$ describes ordering dependence, and $L$ describes linguistic complexity. The illustrated weights are all one; scores are mapped to $[1,5]$.

The modality score is:

$$
\mathcal C_{\mathrm{mod}}=\beta_1M+\beta_2Q+\beta_3A+\beta_4R,
\qquad Q=\frac1M\sum_{i=1}^M Q_{m_i}.
$$

$M$ counts modalities, $Q$ averages estimated quality, $A\in[0,1]$ describes alignment, and $R\in\{0,1\}$ marks extra reasoning-related information. Quality estimates are approximately $[0.6,0.95]$; unit weights and a final mapping to $[2,5]$ are used. Bubble sizes indicate dataset scale.

**Independent analysis:** these are descriptive indices, not measured learning gains or sample complexity. Unit weights do not equalize factors with different ranges. A ten-second sequence stored at 10 Hz or 50 Hz has 100 or 500 steps without changing its semantic difficulty. Likewise, depth, point clouds, and image-derived segmentation may add correlated channels rather than new decision information. Raw attributes, normalization, sensitivity to weights, and task ablations are needed.

## Simulation, evaluation, and corrections

Visual realism, contact accuracy, throughput, and controllability serve different purposes. An Isaac Sim/Isaac Lab project should separately validate appearance, collisions, control, sensor timing, parallel rollouts, and task protocols. This decomposition is an engineering interpretation of the survey, rather than a complete architecture supplied by it.

The review labels ten representative models using success, zero-shot ability, and real-robot evidence. Success bands are High (at least 90%), Medium (70–90%), and Low (below 70%); these summarize heterogeneous published results. They do not establish a common contest. Task difficulty, training overlap, fine-tuning, assistance, and termination rules remain confounders; overlapping band boundaries need clarification.

The original notes identify two concrete issues. The review states that π₀ exceeds 200 Hz, whereas the stored π₀ paper reports robot control up to **50 Hz** and separately times inference at roughly **73 ms**. Those quantities must not be conflated. The abstract and simulator table count 12 platforms, while another passage says 15. CALVIN is also associated with CoppeliaSim in the table although its official implementation uses PyBullet.

## Research use

The survey is valuable as a search entry point and a framework for checking modality alignment, embodiment transfer, trajectory continuity, dataset coverage, contact modeling, and throughput. Exact dependencies, training scales, and runtime figures require primary sources.

**Cross-paper analysis:** this review emphasizes the model–data–platform map; the action-token survey emphasizes intermediate interfaces; the Chinese VLA survey follows the training/deployment pipeline; the RL-VLA survey examines reward and optimization. Together they guide reading, without replacing mechanism-level verification.

For dynamic experiments, separate appearance changes, target motion, occlusion, feedback, and latency. For social navigation, separately record pedestrian paths, body pose, interaction response, and social annotations. These are proposed evaluation dimensions, not experiments performed in this review.

## Source references

- [Source 1](https://arxiv.org/abs/2507.10672)
- [Source 2](https://github.com/Muhayyuddin/VLAs)
- [Source 3](https://arxiv.org/abs/2410.24164v1)
- [Source 4](https://github.com/mees/calvin)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
