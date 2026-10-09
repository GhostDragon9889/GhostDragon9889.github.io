---
{
  "title": "Multi-Agent RL Benchmarks and Cooperative Evaluation",
  "description": "Cooperative, competitive, mixed-motive, partially observed, and cross-partner MARL evaluation.",
  "date": "2026-10-09 20:23:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "evaluation",
  "permalink": "en/knowledge/multi-agent-benchmarks/",
  "translation_path": "knowledge/multi-agent-benchmarks/",
  "notebook": {
    "slug": "multi-agent-benchmarks",
    "group": "evaluation",
    "sources": [
      "N006",
      "N007"
    ]
  },
  "layout": "post"
}
---

## Specify the interaction structure

This edition combines two MARL reports. State cooperation, competition, or mixed motives; team versus individual reward; local information; communication; parameter sharing; and test partners. PettingZoo and OpenSpiel are ecosystems/interfaces rather than single fixed evaluation tasks.

| Suite/platform | Structure | Required details |
|---|---|---|
| MPE/MPE2/PettingZoo | Lightweight particle and other tasks | AEC/Parallel API, scenario, wrappers |
| SMAC/SMACv2 | Partially observed team tactics | Maps, units, randomization, information |
| Multi-Agent MuJoCo | Cooperative continuous control | Joint partition, local inputs, agent count |
| Hanabi | Imperfect-information cooperation | Legal communication, hands, rules |
| Overcooked/RWARE | Coordination and planning | Layouts, horizon, partners, shaping |
| Melting Pot | Social interaction and unfamiliar partners | Substrates, background populations, tests |
| Google Research Football | Team control and competition | Scenario, controlled players, reward, opponents |
| OpenSpiel | Game-theoretic analysis | Game, information sets, best responses |
| MAgent2/MARLGrid | Large-scale or grid interaction | Population, observations, generation |
| Pommerman/RoboCup/Arena/Unity | Competitive/platform-specific tasks | Fork, rules, controls, external engines |

Fixed maps support regression tests, while generalization needs held-out scenarios or partners. Report cross-play separately from self-play.

## Metric boundaries

Returns, success/win rates, and curves are a starting point. Communication needs message budgets and no-message/shuffled-message ablations. Social results require definitions of welfare and fairness.

For a suitable game,

$$
\mathrm{NashConv}(\pi)=\sum_i\left[\max_{\pi_i'}u_i(\pi_i',\pi_{-i})-u_i(\pi)\right].
$$

This requires exact or approximate best responses and a stated approximation error. Exploitability normalization is implementation- and game-dependent. Cooperative win rate is not an equilibrium certificate. Elo/Glicko depend on the opponent population and can obscure nontransitivity.

## Budgets and units

A joint environment transition may contain many agent actions. Agent steps, joint transitions, and rollout length differ. Agents sharing one team return are not independent replications. Record central-critic inputs, sharing, parallelism, updates, and complete wall time.

## Interpretable comparisons

Fix maps, partner/opponent pools, and selection. A no-fresh-observation comparison can expose fixed-task open-loop shortcuts. Assess reward, unfamiliar-partner performance, and cost together.

Related reading: [IPPO/COMA](/en/knowledge/multiagent-gradients/), [statistics](/en/knowledge/statistics-tuning/), and [evaluation](/en/knowledge/evaluation-protocol/).


## Selected references from the source notes

- [Reference 1](https://arxiv.org/abs/1902.04043)
- [Reference 2](https://pettingzoo.farama.org/index.html)
- [Reference 3](https://github.com/oxwhirl/smac)
- [Reference 4](https://github.com/oxwhirl/smacv2)
- [Reference 5](https://magent2.farama.org/index.html)
- [Reference 6](https://github.com/schroederdewitt/multiagent_mujoco)
