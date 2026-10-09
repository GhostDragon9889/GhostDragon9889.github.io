---
{
  "title": "Embodied RL, LLMs/VLAs, and Research Design",
  "description": "Turn sample efficiency, adaptation, rewards, and timing into controlled research questions.",
  "date": "2026-10-09 20:19:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "research",
  "permalink": "en/knowledge/embodied-research/",
  "translation_path": "knowledge/embodied-research/",
  "notebook": {
    "slug": "embodied-research",
    "group": "systems",
    "sources": [
      "N048",
      "N016"
    ]
  },
  "featured": true,
  "layout": "post"
}
---

## Make the research claim measurable

The sources cover manipulation, locomotion, Meta-RL, LLM/VLA post-training, and benchmarks. Organize them through tasks, data, adaptation, execution, and evaluation. State the capability being changed before selecting algorithms.

| Question | Controlled comparison | Main measurements |
|---|---|---|
| Few-shot adaptation | Fixed task family and demonstrations | Test success, extra interaction, adaptation time |
| Reward shaping | Same policy and original task | Original success, failures, learning efficiency |
| RL recovery/generalization | Fixed pretrained checkpoint | ID/OOD, recovery, total supervised and RL data |
| Asynchronous execution | Same model and hardware | Observation age, executed horizon, task time |
| Model-based planning | Fixed environment and planning budget | Multi-step error, actual success, extrapolation |

These are proposed comparisons, not completed experiments.

## Language post-training and physical control

Token generation can be treated as sequential decision-making. RLHF, rule-reward RL, and preference optimization supply different signals. DPO-style objectives should not all be labeled online environment-interaction RL. Tool agents additionally need states, rollouts, termination, and feedback.

VLAs connect visual/language conditioning to physical actions. Control can involve continuous or discrete commands, contacts, observation delays, reset costs, and low-level controllers. Ordinary RL is not inherently discrete, and robot policy/PD frequencies are not universal constants.

## Data and task splits

Count pretraining, demonstrations, offline replay, simulated interaction, human corrections, and real deployment separately. Meta-RL is not merely hyperparameter tuning: context, hidden state, and parameter adaptation need separate records. Splits over scenes, objects, instructions, tasks, and dynamics determine the scope of generalization.

## A reading route

Start with [values](/en/knowledge/mdp-bellman/), [policy gradients](/en/knowledge/policy-gradients/), and [evaluation](/en/knowledge/evaluation-protocol/). Continue through [RL²](/en/reading/p05/), [MetaVLA](/en/reading/p10/), [π_RL](/en/reading/p11/), and [RL Token](/en/reading/p12/), then [RTC](/en/reading/p16/) and [DynamicVLA](/en/reading/p19/). Use [the cross-paper roadmap](/en/knowledge/paperread-roadmap/) to check interface compatibility.
