---
{
  "title": "π_RL: Online RL Fine-tuning for Flow-based Vision-Language-Action Models",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Flow-Noise and Flow-SDE connect flow action generation to PPO-style online adaptation.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p11/",
  "translation_path": "reading/p11/",
  "paper": {
    "id": "P11",
    "title": "π_RL: Online RL Fine-tuning for Flow-based Vision-Language-Action Models",
    "topic_id": "action-policy",
    "year": "2025",
    "version": "2510.25889v3",
    "url": "https://arxiv.org/abs/2510.25889v3",
    "supplement": false,
    "summary_sha256": "cd21557c935a3d02fbbf7fc551fe40fc18e9d97c6f076a89ce61f99eaf2bd94e"
  },
  "layout": "post"
}
---

## Identity and contribution

The source is **arXiv:2510.25889v3**, revised January 29, 2026, a 24-page paper first submitted in October 2025. Kang Chen, Zhihao Liu, Tonghe Zhang, and colleagues propose PPO-style online fine-tuning for flow-based VLAs. The PDF and web metadata have an author-list discrepancy; the original notes preserve the attachment list.

**Flow-Noise** learns Gaussian noise along the generation chain and scores its joint path probability. **Flow-SDE** adds stochastic transitions, exposing denoising and physical interaction as a two-level MDP. Default RL freezes the VLM and updates approximately **300M action-expert parameters**, plus value/noise modules. This is neither full 3.3B-model real-robot RL nor RL Token's small-actor-only adaptation.

## Probability and time conventions

Environment decisions $t$ and internal flow time $\tau$ are different. The paper defines:

$$
A_t^\tau=\tau A_t+(1-\tau)\epsilon,\quad
u=A_t-\epsilon,\quad
\mathcal L_{\mathrm{CFM}}=\mathbb E\|v_\theta(A_t^\tau,o_t)-u\|^2.
$$

An ODE path is deterministic **given** initial noise; random initial noise can still make final actions random. The optimization obstacle is cheaply computing the final-action marginal density and designing controlled exploration, rather than a complete absence of randomness.

Flow-Noise uses explicit transitions:

$$
A^{\tau+\delta}\sim\mathcal N(A^\tau+\delta v_\theta,
\operatorname{diag}(\sigma_{\theta'}^2)),
$$
$$
\log p(\mathcal A\mid o)=\log p(A^0)
+\sum_k\log p(A^{\tau_{k+1}}\mid A^{\tau_k},o).
$$

This computes the discrete **joint chain density**, not the terminal marginal after integrating intermediate states. Clipping a path probability ratio is not necessarily equivalent to clipping a terminal-action ratio. Removing extra noise for ODE evaluation also changes the sampled policy and should be tested separately.

Flow-SDE's Euler transitions have the general form:

$$
A^{\tau+\delta}\sim\mathcal N(A^\tau+\delta b_\theta,
 g(\tau)^2\delta I).
$$

Its variance differs from Flow-Noise's parameterization. Continuous-time marginal-equivalence arguments depend on correct scores and consistent clocks; finite steps and learned approximations introduce error.

## Formula check and two-level MDP

**Independent derivation retained from the notes:** under the stated increasing noise-to-data time,

$$
\nabla_x\log q_\tau(x\mid o)
=-\frac{x-\tau v(x,\tau,o)}{1-\tau},
\qquad b=v+\tfrac12g^2\nabla\log q.
$$

The printed equations 7–9 do not directly follow this same convention. Reproduction should check actual time direction, velocity definition, and signed steps instead of concatenating formulas unmodified. This is a consistency issue, not a claim that the experimental code is invalid.

The expanded state is $(o_t,A_t^\tau)$. Inner transitions refine a chunk without physical rewards; final execution obtains reward and a new observation. A hybrid construction randomizes one denoising position while keeping other positions as ODE steps, reducing update cost. **Independent analysis:** those ODE transitions still depend on network parameters, so the wrapper does not itself prove equivalence to a fully stochastic chain.

PPO uses clipped probability ratios and GAE. Chunk rewards in the paper are summed at a macro-decision level with macro-step discounting. This differs from RL Token's per-physical-step discount and $\gamma^C$ bootstrap. Prediction length and executed length also differ: π₀ predicts 50 steps but commonly executes five, or ten for LIBERO Long.

Value heads share features. π₀ can expose proprioception through the action expert; π₀.₅ generally permits a VLM-side head, but the experimental π₀.₅ configuration omits state inputs. The exact configuration, rather than a generic architecture description, governs reproduction.

## Data and principal results

For π₀.₅, LIBERO few-shot SFT uses **40 trajectories, approximately one for each of forty tasks**—not one demonstration for all LIBERO. π₀ uses 58 demonstrations for shorter suites and 208 for Long. ManiSkill uses 16,384 planner demonstrations covering 4,352 object/container/table combinations; MetaWorld uses 2,500; CALVIN uses about 24 hours of ABC play data. Training uses eight H100 80GB GPUs.

| Model / method | LIBERO | ManiSkill | MetaWorld | CALVIN length-five success |
|---|---:|---:|---:|---:|
| π₀ SFT | 57.6% | 38.4% | 50.8% | 57.5% |
| π₀ Flow-SDE | 96.1% | 78.8% | 78.1% | 61.7% |
| π₀ Flow-Noise | 97.6% | 77.8% | 85.8% | 59.9% |
| π₀.₅ SFT | 77.1% | 40.1% | 43.8% | 61.3% |
| π₀.₅ Flow-SDE | 97.9% | 90.9% | 70.7% | 87.0% |
| π₀.₅ Flow-Noise | 98.3% | 89.7% | 66.1% | 84.5% |

Gains of 27.6–31.0 in the paper's aggregate are percentage points. Flow-SDE does not win every setting. π₀.₅ Long improves from 43.9% to 94.0% with Flow-Noise, but fewer demonstrations plus extra simulated interaction does not imply less total training data.

ManiSkill OOD averages rise from 26.4% to 49.3%/53.4%, still below approximately 90% ID performance. CALVIN's separate ABC-to-D OOD result is 79.1%, distinct from 87.0% after D-domain RL. MetaWorld ML45 does not show stable gains on entirely unseen task goals. Environment/recovery generalization is better supported than universal new-skill transfer.

## Ablations, deployment, and limits

Hybrid updates take about **428.6 seconds**, versus **814.2/821.4 seconds** for compared full constructions. This is training-update acceleration, not doubled robot speed. Executing chunks of five, ten, and twenty gives 94.5%, 95.5%, and 89.2% Spatial success. PPO exceeds the tested GRPO configuration; GR00T N1.5 improves from 52.5% to 89.9%, with dropout disabled for consistent probabilities.

A Real2Sim2Real example combines ManiSkill physics and 3DGS rendering. Twenty planner demonstrations and 100 RL iterations yield **40% real Franka success** where SFT fails. This is a small transfer demonstration, not direct efficient online RL on physical robots.

**Project proposal:** use π_RL to study simulator-based action-expert improvement, and compare separately with small-network RLT adaptation. Add continuous target motion, sensor/network delays, observation age, executed horizon, and ODE-versus-stochastic evaluation. Bind SFT weights, reward rules, flow conventions, old log probabilities, dropout, termination, partial resets, KL, clip fraction, and critic diagnostics. RLinf is an implementation entry point; the source export reports no training rerun or consumer-GPU performance validation.

## Source references

- [Source 1](https://arxiv.org/abs/2510.25889v3)
- [Source 2](https://github.com/RLinf/RLinf)
- [Source 3](https://huggingface.co/RLinf)
- [Source 4](https://rlinf.readthedocs.io/en/latest/rst_source/examples/embodied/pi0.html)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
