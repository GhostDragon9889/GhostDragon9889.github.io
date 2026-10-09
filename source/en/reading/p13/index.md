---
{
  "title": "What Can RL Bring to VLA Generalization? An Empirical Study",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Visual, semantic, and execution OOD reveal where PPO improves VLA behavior and where it does not.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p13/",
  "translation_path": "reading/p13/",
  "paper": {
    "id": "P13",
    "title": "What Can RL Bring to VLA Generalization? An Empirical Study",
    "topic_id": "action-policy",
    "year": "2025",
    "version": "2505.19789v4",
    "url": "https://arxiv.org/abs/2505.19789v4",
    "supplement": false,
    "summary_sha256": "fa4c44309859523e20dddcf6e2a418bc1259395b7105929f09ffeb2f99db7294"
  },
  "layout": "post"
}
---

## Identity and central finding

Jijia Liu, Feng Gao, Bingwen Wei, and colleagues study what RL adds to VLA generalization. The work first appeared May 26, 2025 and was accepted at NeurIPS 2025. The notes use the **24-page arXiv:2505.19789v4**, revised January 14, 2026.

The study separates **visual, semantic, and execution OOD**. PPO's most consistent gains concern recovery from execution changes. Visual absolute success improves, while performance retained relative to each method's ID baseline is similar. Added action-chunk and door-opening experiments include counterexamples to universal improvement.

## Model, algorithms, and budgets

The main OpenVLA uses SigLIP/DINOv2 vision, Llama-2 7B, a single RGB frame plus language, and seven autoregressive action tokens: translation, rotation, and gripper. Scalars are quantized into 256 bins using the training 1st–99th percentile range.

Both main routes start from a **140-trajectory warmup** using Octo-Small and a planner. SFT then learns planner data; PPO collects interaction. RL is not appended to a complete SFT-16k model. Demonstration count, environment interaction, and computation are different cost axes.

The joint action probability is the product of token probabilities:

$$
\pi_\theta(a_t\mid o_t,l)=\prod_{j=1}^{7}
 p_\theta(u_{t,j}\mid o_t,l,u_{t,<j}).
$$

PPO uses clipped ratios and GAE. GRPO compares eight trajectories per initial-state group, without a value model; the tested DPO is trajectory-preference TPO built from rewards rather than human preferences. PPO performs better in the tested two-seed algorithm comparison. This does not prove universal failure of GRPO/DPO for robotics.

All methods use rank-32 LoRA. A three-layer value MLP reads the **first action-token position** from the shared Transformer. Separate actor/critic Transformers need 81.3 GB versus 44.4 GB for sharing and train more slowly. Warmup approximately halves steps to convergence; one PPO epoch per batch suffices here, and more epochs add time without gains. Main training takes roughly **42 hours on one A100**. These on-policy findings do not dictate off-policy replay ratios.

## Environment and OOD definitions

ManiSkill/WidowX training randomizes sixteen object types, sixteen table appearances, and restricted placement regions. Rewards give 0.1 for grasping/holding the correct object and 1.0 for placement; they are staged, not terminal-only.

Fifteen OOD tests comprise five visual, seven semantic, and three execution changes. Dynamic visual textures are overlays; they are not physical motion. The mid-episode object disturbance is a **teleport at decision step five**, not a continuously moving target.

SFT planner data use MPLib and TOPP. Removing near-stationary commands deletes about one-third of actions. Data increase up to 64K trajectories; performance saturates around 16K under this planner distribution, without establishing a universal demonstration limit.

## Principal success results

| Setting | SFT | PPO |
|---|---:|---:|
| ID | 78.1% | 93.8% |
| New table | 71.9% | 84.4% |
| Foreground texture, weak / strong | 71.9 / 55.7% | 83.3 / 63.0% |
| Full-image noise, weak / strong | 70.8 / 50.5% | 85.4 / 66.7% |
| New objects | 45.3% | 71.4% |
| New containers | 61.5% | 75.0% |
| New phrasing | 67.2% | 89.1% |
| Two seen objects | 61.5% | 75.0% |
| Two unseen objects | 29.7% | 57.8% |
| Distractor container | 67.2% | 81.2% |
| Two unseen containers | 45.8% | 59.9% |
| New object/container positions | 56.8% | 80.7% |
| New robot initial pose | 33.9% | 79.7% |
| Mid-episode relocation | 28.6% | 74.5% |

These are full placement successes, not merely correct grasps. The source table also gives stage metrics and three-seed variation.

The original notes independently average each dimension and divide by ID performance:

| Dimension | SFT / PPO absolute mean | SFT / PPO OOD-to-ID retention |
|---|---|---|
| Visual | 64.2 / 76.6% | 82.2 / 81.6% |
| Semantic | 54.0 / 72.8% | 69.2 / 77.6% |
| Execution | 39.8 / 78.3% | 50.9 / 83.5% |

Similar visual retention does not mean equal visual absolute success. Strong-texture initial grasp accuracy actually falls from 83.9% to 80.2% while final success rises, distinguishing recovery from perception.

A nearby plot's “42.6% better” statement has an unclear denominator and does not directly match the table's ID values. It should not be rewritten as a 42.6-percentage-point gain or a strictly matched-ID experiment.

## Added experiments and negative results

The revised appendix contains experiments beyond the older body limitations. In a separately retrained Panda sim-to-real setup, thirty real trials give grasp success **10% versus 43%** and complete placement **0% versus 27%**. It is small-scale transfer evidence, not on-robot RL or direct zero-shot transfer of the main WidowX policy across embodiments.

OpenVLA-OFT predicts four-step chunks and uses 400 unfiltered warmup trajectories plus changed clipping/discount settings. ID rises 77.6%→89.1%, relocation 6.8%→31.8%, and robot-pose OOD 28.1%→58.9%. **Two unseen containers decline 36.5%→29.7%.** Differences from the main model cannot be assigned solely to chunk length.

Door opening trains Panda on eight articulated objects. ID is **74.5% SFT versus 72.4% RL**; visual averages are **64.6% versus 59.1%**, semantic averages 37.3% versus 38.6%, and execution averages 30.0% versus 39.8%. New phrasing declines 70.3%→62.0%, although new articulated objects improve 4.2%→15.1%. Execution benefits are more stable than blanket semantic benefits.

## Interpretation and reproduction

Broader visited states and recovery trajectories support an interaction/recovery explanation, but do not isolate reward, exploration, and demonstration quality causally. Planner-heavy SFT lacks some natural correction behavior; model family, tasks, budgets, and real evaluation remain limited.

**Project proposal:** separately test appearance, language/goal changes, continuous pedestrian motion, localization errors, latency, and blocked paths. Report absolute success, ID retention, failure type, collision, distance, yielding, and reaction time. Teleport recovery is a useful simple perturbation, not proof of safe crowd navigation.

Bind the v4 paper, code commit, warmup/SFT/RL weights, normalization, action filtering, LoRA layers, temperature, first-token value head, probability computation, and termination handling. Treat OFT and real tests as separate protocols. The official RL4VLA repository/model collection provide starting points; the source export claims no code execution or model reruns.

## Source references

- [Source 1](https://arxiv.org/abs/2505.19789v4)
- [Source 2](https://rlvla.github.io/)
- [Source 3](https://arxiv.org/abs/2505.19789)
- [Source 4](https://github.com/gen-robot/RL4VLA)
- [Source 5](https://huggingface.co/collections/gen-robot/rlvla)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
