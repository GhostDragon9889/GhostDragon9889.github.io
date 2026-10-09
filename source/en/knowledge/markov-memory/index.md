---
{
  "title": "Markov States, Partial Observations, and Recurrent Memory",
  "description": "Separate physical state, observation, history, and belief without assuming RNN sufficiency.",
  "date": "2026-10-09 20:16:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/markov-memory/",
  "translation_path": "knowledge/markov-memory/",
  "notebook": {
    "slug": "markov-memory",
    "group": "foundations",
    "sources": [
      "N052"
    ]
  },
  "layout": "post"
}
---

## State is different from observation

The Markov property says that a sufficient current state and action screen off earlier history from the future. Physical dynamics can be Markov while a single image omits velocity. Partial observation creates a POMDP; using an RNN does not itself change the environment's dynamics.

## History, belief, and hidden state

A policy can condition on $H_t=(o_0,a_0,\ldots,o_t)$. Under appropriate model assumptions, the belief $b_t(s)=P(s_t=s\mid H_t)$ is a recursively updateable sufficient statistic. An RNN compresses history through $h_t=f(h_{t-1},o_t,a_{t-1},r_{t-1})$. It is a learned approximation, not automatically an exact belief or Markov state.

The expanded system $(s_t,h_t)$ may have a recursive state description, while the agent-visible $h_t$ can still omit predictive information. Memory capacity and restored observability are separate claims.

## Reset semantics

Episode, task, and trial resets may differ. Ordinary independent episodes often reset memory; RL²-style adaptation retains information across episodes of one task and clears it when the task changes. Parallel environments require separate memories.

## Evaluation

Compare memoryless, stacked-observation, and recurrent policies with matched budgets and inputs. Test occlusion, hidden velocity, delays, and task switches; report reset rules and recovery speed. Hidden-state adaptation is distinct from test-time gradient fine-tuning.

Related reading: [Meta-RL](/en/knowledge/meta-rl/), [RL²](/en/reading/p05/), and [occupancy measures](/en/knowledge/probability-measures/).
