---
{
  "title": "Goal-Conditioned RL, UVFA, and HER",
  "description": "Goal-conditioned values, hindsight relabeling, and hierarchical-control interfaces.",
  "date": "2026-10-09 20:14:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "theory",
  "permalink": "en/knowledge/goal-conditioned/",
  "translation_path": "knowledge/goal-conditioned/",
  "notebook": {
    "slug": "goal-conditioned",
    "group": "adaptation",
    "sources": [
      "N025"
    ]
  },
  "layout": "post"
}
---

## An explicit goal variable

Goal-conditioned RL uses $\pi(a\mid s,g)$, $V(s,g)$, and $Q(s,a,g)$ with goal-dependent reward $r(s,a,s',g)$. Goals may be coordinates, images, or language, but task completion must be defined operationally. A UVFA shares value approximation across goals; input conditioning alone does not establish generalization.

## Hindsight relabeling

HER reinterprets transitions using achieved goals and recomputes their rewards and termination information. Failure under the original goal can supply success examples for another goal. The physical transition must remain valid after relabeling; goal-dependent dynamics can invalidate naive reuse.

Future-goal selection in stochastic environments can introduce hindsight bias. Relabeling rules, correction, and algorithm assumptions deserve separate attention. Compatibility with replay does not make every reward or goal encoding interchangeable.

| Operation | When | What changes |
|---|---|---|
| Goal/subgoal selection | During collection | Behavior and visitation |
| Hindsight relabeling | After collection | Training interpretation of recorded data |
| Hierarchical control | Across decision timescales | High-/low-level interfaces |

Goal conditioning and temporal abstraction can be combined but are different concepts. Contrastive formulations connect future reachability to representations under particular sampling and modeling assumptions.

## Evaluation

Fix training/test goal splits and report success, time to goal, collisions or limit violations, and distance. Separate interpolation, OOD goals, and new skills: reaching a new coordinate is not evidence of an entirely new task capability.

Related reading: [options](/en/knowledge/options/), [Meta-RL](/en/knowledge/meta-rl/), and [abstraction](/en/knowledge/mdp-abstraction/).


## Selected references from the source notes

- [Reference 1](https://proceedings.neurips.cc/paper/7090-hindsight-experience-replay.pdf)
- [Reference 2](https://arxiv.org/abs/2206.07568)
