---
{
  "title": "FLUX: Accelerating Cross-Embodiment Generative Navigation Policies via Rectified Flow and Static-to-Dynamic Learning",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Rectified flow and dynamic reinforcement learning extend navigation, with careful social-metric definitions.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p25/",
  "translation_path": "reading/p25/",
  "paper": {
    "id": "P25",
    "title": "FLUX: Accelerating Cross-Embodiment Generative Navigation Policies via Rectified Flow and Static-to-Dynamic Learning",
    "topic_id": "navigation-worlds",
    "year": "2026",
    "version": "2603.12806v1",
    "url": "https://arxiv.org/abs/2603.12806",
    "supplement": false,
    "summary_sha256": "f05e78804802b27d78b6cee0af52eacf630a59f8f26395e4a8f1cfd645e18bd1"
  },
  "layout": "post"
}
---

## Identity and contribution

Zeying Gong, Yangyi Zhong, Yiyi Ding, and colleagues introduce FLUX in **arXiv:2603.12806v1**, March 13, 2026; the project records IROS 2026. This navigation policy is unrelated to the image-generator model with the same name.

FLUX initializes from NavDP, replaces diffusion generation with **Rectified Flow**, then applies dynamic-environment RL. **DynBench** is its separate Isaac-based environment covering fixed/image goals, goal-free exploration, moving-person goals, crowd traversal, and dynamic exploration.

## Generation and post-training

Eight RGB frames/current depth condition a sixteen-layer decoder and trajectory scorer. Sixteen generated candidates are selected by that scorer. A GRPO-style update without a separate value baseline does not mean the system has no candidate evaluator.

For Gaussian trajectory noise $\tau_0$ and expert path $\tau_1$:

$$
\tau_s=(1-s)\tau_0+s\tau_1,\quad
\mathcal L_{RF}=\mathbb E\|v_\theta(s,\tau_s,e)-(\tau_1-\tau_0)\|^2.
$$

Euler integration generates the whole waypoint sequence. “Straight” means the training interpolation in trajectory space, not a straight physical route or an unconditional guarantee of straight learned integral curves.

The RF stage uses a 3,000-trajectory Gibson subset, thirty epochs, and a stated single RTX 4090. This inherits NavDP pretraining, so it is not a from-scratch total-cost comparison based only on the small subset.

Goal rewards combine +20 success, asymmetric progress weights, stagnation/timeouts, and social-distance penalties below **0.45/1.2 m**. Exploration adds displacement and grid novelty. A novelty-reward narrative differs from its printed coefficients and needs code checking.

The paper standardizes discounted returns **across timesteps within an episode**, clips them to $[-3,3]$, and uses a clipped probability-ratio objective. This differs from classic same-state groups of independent full trajectories. The PDF does not fully specify flow-policy likelihood computation or how candidate selection maps to the update probability; the objective alone is insufficient for reproduction.

## Crowd protocol and metrics

Training uses twenty clutter scenes and 20K episodes; evaluation uses six structured scenes and 600 episodes. SocialNav has ten to fifteen pedestrians, robot speed cap 0.5 m/s, and pedestrian speed 1.1 m/s. NavMesh/A* paths plus GoTo, Idle, and LookAround states define rule-based behavior, rather than learned social intent.

A robot moving less than 0.1 m over two seconds is stuck; timeout is 120 seconds; goal success is within one meter. Yielding pauses can be penalized by this protocol, and a one-meter moving-goal threshold differs from precise localization.

| Metric | NavDP | FLUX |
|---|---:|---:|
| Static PointNav SR / SPL | 77.8 / 74.8 | 80.9 / 78.6 |
| Dynamic PointNav success | 38.7% | 42.4% |
| Dynamic exploration time / area | 43.6 s / 93.7 m² | 55.1 s / 128.7 m² |
| SocialNav success | 59.3% | 64.0% |
| SocialNav Coll. / SC | 21 / 5.5% | 16 / 4.4% |

These NavDP values use this paper's protocol, not NavDP's original evaluation. **SC is a lower-is-better fraction of time within 1.2 m**, despite its “Social Compliance” label. **Coll. is a below-0.45 m proximity event proxy**, not measured physical-contact percentage.

The ImageNav table reports SR 44.0 and SPL 44.4. Standard same-episode SPL should not exceed SR, requiring an explanation. Claims of best performance on every metric also conflict with smaller collision/proximity values from some baselines.

## Ablations, speed, and limitations

PointNav success progresses from deterministic regression **53.6%**, DDPM **77.8%**, conditional flow **78.9%**, RF **80.4%**, to RF+RL **80.9%**. SocialNav similarly gives 49.3%, 59.3%, 60.6%, 62.8%, and 64.0%. Small static gains lack extensive uncertainty estimates; dynamic learning need not always improve static tasks.

Reported latency is **305.2 ms NavDP/ten steps, 408.6 ms FlowNav/ten, 244.9 ms FLUX/ten, and 216.5 ms FLUX/six**. Approximately 29%/47% reductions use changed total sampling steps as well as models; they are not pure per-network-call gains.

Go2-W, Go2, and G1 demonstrations use a RealSense D455 and remote RTX 4060. They establish bounded deployment examples rather than equally sized real-robot comparison statistics.

**Independent analysis:** pair FLUX with a fixed-sensor/controller/timing benchmark, separately logging actual contacts, proximity duration, yielding, pedestrian response, and root/body behavior. DynBench's state machine is not NavIsaacLab's AMP full-body control. Bind method/environment commits, candidate counts, Euler steps, moving-goal update frequency, likelihoods, and metric code. Social intent and human comfort require additional evidence; the source notes did not execute the implementation.

## Source references

- [Source 1](https://arxiv.org/abs/2603.12806)
- [Source 2](https://arxiv.org/pdf/2603.12806v1)
- [Source 3](https://zeying-gong.github.io/projects/flux/)
- [Source 4](https://github.com/Zeying-Gong/FLUX)
- [Source 5](https://github.com/Zeying-Gong/IsaacLab)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
