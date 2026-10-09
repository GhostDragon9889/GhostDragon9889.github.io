---
{
  "title": "A Survey on Reinforcement Learning of Vision-Language-Action Models for Robotic Manipulation",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Action likelihoods, rewards, transitions, learning paradigms, and the practical cost of RL-VLA deployment.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p04/",
  "translation_path": "reading/p04/",
  "paper": {
    "id": "P04",
    "title": "A Survey on Reinforcement Learning of Vision-Language-Action Models for Robotic Manipulation",
    "topic_id": "foundations",
    "year": "2025",
    "version": "TechRxiv v1",
    "url": "https://doi.org/10.36227/techrxiv.176531955.54563920/v1",
    "supplement": true,
    "summary_sha256": "a2528c24d46477448ee0e062d4b8b07b280ead7b06bfd093f93b571a75e11280"
  },
  "layout": "post"
}
---

## Identity, version, and source boundary

This is a 2025 TechRxiv preprint by Haoyuan Deng, Zhenyu Wu, Haichao Liu, and colleagues, DOI **10.36227/techrxiv.176531955.54563920/v1**. The formal record is dated December 9, 2025; repository news says November 2025. Those dates refer to different records.

The original PaperRead export used a **20-page official repository PDF as a supplement** because the earlier attachment was unavailable. It cannot prove byte identity with that earlier attachment. The main text ends on page 15. Later additions to the repository do not retroactively expand the fixed paper's scope.

The survey treats RL-VLA as a system: action representations determine optimization, rewards determine objectives, transition models determine interaction, and deployment protocols determine practical usefulness. It proposes a taxonomy, not a new unified controller or a uniformly rerun benchmark.

## Four layers and independent classification axes

| Layer | Decisions |
|---|---|
| System | Action distribution, reward source, physical or learned transition model |
| Learning | Online interaction, offline learning, inference-time selection/adaptation |
| Deployment | Sim-to-real transfer, human correction, recovery, resets, constraints |
| Evaluation | Success, efficiency, intervention, latency, risk, reproducibility |

Online/offline describes whether new experience is collected. On-policy/off-policy describes which policy produced usable training data. Online SAC can be off-policy. A method can have both offline initialization and online training, so repeated table entries do not count as separate papers.

Fresh rollouts in a learned world model do not imply fresh real-robot interaction. The review's broad “test-time RL” terminology also mixes fixed-parameter action selection with some lightweight adaptation; inspect each method's update rule.

## Objectives and time units

The review uses the MDP return:

$$
J(\pi_\theta)=\mathbb E_{\tau\sim\pi_\theta}
\left[\sum_{t=0}^{T}\gamma^t r(s_t,a_t)\right].
$$

**Independent analysis:** visual observations and proprioception need not be Markov under occlusion or unobserved contact; history or beliefs may still be required.

PPO's probability ratio compares new and old policies, with clipping and an advantage baseline. For chunked policies, a standard explanatory Bellman target is:

$$
y_t=\sum_{i=0}^{k-1}\gamma^ir_{t+i}
+\gamma^k(1-d_t)\mathbb E_{A'\sim\pi}
[Q_{\bar\phi}(s_{t+k},A')].
$$

This background expression is not a new survey algorithm. Executed chunk length, accumulated rewards, termination, discount units, and bootstrap time must agree. Naming PPO or TD3 alone is insufficient for reproduction. RL may update LoRA, an action expert, a critic, a residual, or a selector while leaving other parameters frozen.

## Actions, rewards, and transition models

Autoregressive token probabilities support policy ratios, but introduce quantization and credit-assignment problems. Per-token clipping differs from clipping a joint action probability. Diffusion and flow models sample continuous chunks, while cheap exact final-action marginal likelihoods are often unavailable. Chain probabilities, final-action marginals, and denoising-loss surrogates are different quantities. π_RL uses Flow-Noise and Flow-SDE; FPO and ARFM have other optimization constructions.

Two-system designs can optimize the high-/low-level interface. A plausible language proposal still needs an executable low-level action and a value estimate tied to real feasibility.

Rewards include exploration, preferences, model-generated scores, and potential shaping:

$$
r'(s,a,s')=r(s,a,s')+\gamma\Phi(s')-\Phi(s).
$$

**Independent analysis:** policy-invariance guarantees require compatible discounting and boundary handling. Arbitrary distance penalties or drifting VLM scores do not inherit the guarantee by being called shaping. Novelty is not task progress, and scalable automatic scores remain vulnerable to occlusion, domain shifts, and reward exploitation.

Physical engines require geometry, mass, friction, and contact calibration. Latent or pixel world models reduce physical calls but accumulate errors and may be exploited by a policy. Realistic images alone do not establish faithful action-conditioned dynamics.

## Offline, online, and inference-time learning

Offline RL can use mixed-quality and failed demonstrations instead of fitting only expert actions. Existing imitation datasets may lack rewards, terminal flags, or failure coverage. Conservative methods such as CQL address overestimated unsupported actions; they do not guarantee generalization outside data support. ReinboT, value conditioning, preference training, ConRFT, CO-RFT, and ARFM represent different choices.

Online performance depends jointly on optimization, demonstration warm starts, dense rewards, residual exploration, replay, rollout filtering, and infrastructure. Measure actual interaction, human effort, environment throughput, updates, and total wall time separately. The project generalization paper trains OpenVLA with LoRA and a shared value head; π_RL focuses on the action expert. Neither licenses a claim about arbitrary full-backbone RL.

Inference-time value guidance samples candidates and selects $a^*=\arg\max_iQ(s,a_i)$. Good ranking cannot choose an absent candidate. OOD overestimation can make more sampling harmful. Memory, search, simulated rollouts, and retry monitors add computation; in moving scenes this can make the observation stale before the selected action executes.

## Deployment and evidence

Domain randomization and digital twins address different transfer needs. Neither guarantees rare-contact accuracy. Human takeover, object restoration, and task resets have different costs. Reset-free learning may return to a functionally usable state rather than exactly restoring the original arrangement. Reward penalties and semantic rules are also different from execution-time limits on speed, torque, or distance.

The survey compares LIBERO, Meta-World, ManiSkill, CALVIN, SIMPLER, RoboTwin, and real platforms including SERL, LeRobot, FurnitureBench, and FMB. Their tasks, robots, cameras, termination rules, and physics differ. Its roughly fifteen-method LIBERO plot lacks a common retraining protocol and complete per-bar uncertainty; small differences cannot establish causal superiority.

Short episodes can mean fast success or early failure. Low intervention can mean autonomy or looser supervision. “Cycle time” also varies between full learning processes and individual tasks. **Proposed reporting:** separate successful execution, recovery, and total time including human resets.

## Project research use

The taxonomy helps compare environment/data source, base VLA, updated parameters, objective, chunk timing, human dependence, and OOD axes. An Isaac Sim pedestrian environment can provide controlled transitions; MotionBricks can provide motion expression; navigation decisions and collision constraints still need separate definitions.

**Independent proposal:** evaluate appearance, semantics, continuous motion, latency, and recovery separately, including minimum human–robot distance, collisions, reaction time, and replanning cost. The survey did not perform these pedestrian experiments. Reproducing a survey means tracing fixed-version claims and selecting algorithms for a common protocol, rather than claiming that all reviewed success rates have been rerun.

## Source references

- [Source 1](https://github.com/Denghaoyuan123/Awesome-RL-VLA/blob/main/A_Survey_on_Reinforcement_Learning_of_Vision-Language-Action_Models_for_Robotic_Manipulation.pdf)
- [Source 2](https://www.techrxiv.org/doi/full/10.36227/techrxiv.176531955.54563920/v1)
- [Source 3](https://doi.org/10.36227/techrxiv.176531955.54563920/v1)
- [Source 4](https://github.com/Denghaoyuan123/Awesome-RL-VLA)
- [Source 5](https://arxiv.org/abs/1707.06347)
- [Source 6](https://arxiv.org/abs/2006.04779)
- [Source 7](https://arxiv.org/abs/2505.19789)
- [Source 8](https://arxiv.org/abs/2510.25889)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
