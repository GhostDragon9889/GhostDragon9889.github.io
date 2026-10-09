---
{
  "title": "Era of Experience: Notes on Experience-Driven Learning",
  "description": "Separate experience-driven learning as a paradigm from world models as a mechanism.",
  "date": "2026-10-09 20:27:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reading",
  "permalink": "en/reading/p33/",
  "translation_path": "reading/p33/",
  "notebook": {
    "slug": "p33",
    "group": "classics",
    "sources": [
      "N010"
    ]
  },
  "paper": {
    "id": "P33",
    "title": "Era of Experience: Notes on Experience-Driven Learning",
    "year": "Unspecified",
    "version": "Perspective note; exact primary source not identified",
    "url": null,
    "kind": "perspective",
    "topic_id": "foundations",
    "source_kind": "notebook",
    "supplement": false
  },
  "layout": "post"
}
---

## Source identity and scope

This is a perspective note on an “era of experience,” discussing experience-driven learning associated with David Silver and Richard Sutton, podcasts, later commentary, and world models. The upload contains no uniquely identifiable primary URL. It is published as a perspective, without an invented author list, DOI, revision, or formal citation.

## Where learning data come from

Static human data support imitation and initialization. Interaction supplies consequences, task feedback, and trajectories for further learning. Experience-driven systems improve behavior through action and feedback over time. These data sources can coexist; language models and demonstrations remain useful.

$$
J(\pi)=\mathbb E_\pi\!\left[\sum_t\gamma^t r_t\right].
$$

The return expression is not a new algorithm. The system questions concern tasks, interaction, feedback, continual learning, and data production.

## Four dimensions

Long streams require memory and adaptation. Grounded actions require operable environments and observations. Feedback needs measurable outcomes. Planning considers long-term consequences. Sparse, delayed, and multiobjective rewards still leave exploration and credit-assignment problems.

## World models are one mechanism

Experience-driven learning is a broader paradigm. Model-free learning, exact-rule search, and learned-model planning can all use interaction data. Generated visual worlds do not automatically provide physical-control models.

## Research questions

Compare static demonstrations, interaction-based improvement, and model planning while separately counting data, environment cost, verification, and long-term outcomes. In tool and robot tasks, check reward alignment with actual success and changing distributions.

These are reading-derived questions, not a claim of consensus, superhuman performance, or completed experiments.

Related reading: [simulators and world models](/en/knowledge/simulation-world-models/) and [research design](/en/knowledge/embodied-research/).
