---
{
  "title": "Paired Direct/Agent Evaluation and Progress Verification",
  "description": "Fix episode identity and budgets, separating task success, tool completion, and ablations.",
  "layout": "post",
  "date": "2026-10-09 21:14:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "evaluation",
  "translation_path": "tutorials/paired-evaluation/",
  "tutorial": {
    "id": "T15",
    "group": "vla",
    "references": [
      "libero",
      "openpi-client",
      "openpi-libero"
    ]
  }
}
---

## Identify the treatment

An outer agent can change subgoals, retries, call timing, and termination. Keep the VLA checkpoint, observation privileges, preprocessing, action space, and task list fixed when comparing direct and agent execution. If the agent receives extra interaction budget, report equal-budget results separately from results with additional cost.

## Construct a paired manifest

Shared identity includes suite, task, initial state, simulator seed, and manifest ordinal. Keep method-specific run IDs separate. A task-only key can overwrite multiple initial states and cannot establish reliable pairing.

```json
{
  "pair_id": "episode-0001",
  "suite": "example-suite",
  "task_index": 0,
  "initial_state_index": 0,
  "simulator_seed": 7,
  "budget": {"environment_steps": 300},
  "methods": ["direct", "agent"]
}
```

This is a synthetic public schema, not personal experiment data. Preserve failed and invalid episodes, specifying exclusions and denominators. Report success, environment steps, policy calls, agent turns, tokens, and wall time separately.

## Official-code supplement and success criteria

LIBERO and the OpenPI example expose task suites and initial states that can support stable episode identities. Check termination against the pinned environment. An outer `finish` tool result does not itself establish simulator success.

A progress verifier needs inspectable inputs and evidence. Use labeled examples to estimate false positives, false negatives, trigger timing, and added cost. Do not silently expose privileged evaluator state to the policy. Historical images need task and time identities to prevent reuse after reset.

## Move from diagnostics to causal evidence

Check service connectivity and one task, then execute the complete paired list. A small diagnostic success difference does not establish full-suite improvement. Ablate the verifier, history, retries, and budget separately. Distinguish design, implementation, execution, and statistical support. Report paired differences and uncertainty; across trained models, use the training seed as an appropriate unit rather than treating all episodes as independent models.

Personal diagnostic scores, timelines, and private tool configurations are omitted. Continue with [statistics and tuning](../../knowledge/statistics-tuning/) and the [reproduction protocol](../../knowledge/evaluation-protocol/).
