---
{
  "title": "Navigation Baselines and Migration: Auditing Papers, Code, and Assets",
  "description": "Audit versioned interfaces for NavDP, FLUX, NavIsaacLab, and ProtoMotions.",
  "layout": "post",
  "date": "2026-10-09 21:11:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "reproduction",
  "translation_path": "tutorials/navigation-baselines/",
  "tutorial": {
    "id": "T12",
    "group": "navigation",
    "references": [
      "proto",
      "git-submodule",
      "lab-install"
    ]
  }
}
---

## Keep four evidence layers

Separate the paper method, execution at a pinned commit, asset availability, and target-environment results. A README capability list does not establish reproduction by the default configuration. Utility tests do not establish sensor, GPU, or training integration. Disambiguate project names, including navigation FLUX versus image-generation FLUX.

## Trace each interface

| Object | Evidence to inspect |
|---|---|
| NavDP-style trajectory policies | Inputs, predicted paths, scorer, controller, privileged supervision |
| FLUX-style navigation baselines | Model version, dynamic assets, episodes, pedestrian configuration |
| NavIsaacLab-style integration | Default crowd backend, action application, reset, actual sensor use |
| ProtoMotions | Body, joint order, motion library, checkpoint, configuration classes |

A local RGB-D policy does not receive a deployment map merely because training supervision used one. A chassis driven through direct pose integration cannot have its executed motion explained by wheel friction. Report entity slots, complete environments, and crowd instances separately.

## Official-repository supplement: migrate interfaces explicitly

The reviewed ProtoMotions commit documents configuration, retargeting, and multiple backends. Migration needs separate checks of imported symbols, serialized class paths, body/joint naming, reset and rollout lifecycles, evaluation return values, and dependency baselines. Removed directories do not prove removed algorithm capabilities; matching names do not establish checkpoint compatibility.

Git documentation explains that submodules use paths and gitlinks registered by the parent. Inspect `.gitmodules`, the parent tree, and submodule status first. An upstream project with a matching name does not register a local submodule automatically.

## Acceptance sequence

Pin parent and dependency commits, record asset hashes and patches, load a minimal configuration, and validate one character, one reset, and a short rollout. Add sensors and policies before parallel scaling and training. Compare observation, action, contact, and metric semantics rather than directory-difference counts.

The upload supplies summaries and catalogs of some historical audits, not their complete referenced artifacts. Private audit filenames and repository relationships are omitted, and unreviewed code conclusions are not reconstructed. See [navigation readings](../../reading/?category=reading%3Anavigation-worlds) and the [debugging workflow](../reproducible-debugging/).
