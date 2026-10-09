---
{
  "title": "From Video to Simulation: Geometry, Scale, Contact, and Navigation",
  "description": "Connect COLMAP and OpenUSD while distinguishing visual reconstruction from physical assets.",
  "layout": "post",
  "date": "2026-10-09 21:10:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/video-scene/",
  "tutorial": {
    "id": "T11",
    "group": "navigation",
    "references": [
      "colmap",
      "usd-glossary"
    ]
  }
}
---

## Deliver four distinct outputs

Validate appearance, metric geometry, physical/semantic assets, and task configuration separately. 3DGS can represent appearance, collision proxies support physical interaction, USD describes objects and references, and manifests define navigation episodes. Opening a PLY or USD file does not establish scale, contact, or traversability.

## Official-tutorial supplement: reconstruct before converting

COLMAP separates feature matching, geometric verification, and sparse SfM from dense MVS reconstruction and emphasizes overlapping views. Capture stable exposure, diverse viewpoints, and sufficient texture around important passages. Inspect motion blur, reflective surfaces, and moving people separately.

```text
calibrated / sufficiently overlapping frames
    -> feature matching and geometric verification
    -> camera poses and sparse geometry
    -> dense geometry or visual reconstruction
    -> scale and coordinate alignment
    -> cleaned collision proxies and USD composition
    -> navigation map, semantic regions, episode manifest
```

This is an intended pipeline; validate each tool's capabilities and formats at a specified version. Monocular geometry typically needs a scale reference. Mark generative completion explicitly instead of treating unobserved rooms as measured facts.

## Merge recordings with geometric constraints

Use overlapping regions, common control points, or reliable localization. If scales differ, estimate the similarity transform `xB = s·R·xA + t`, not only rotation and translation. Inspect duplicate walls, shifted floors, narrowed doorways, and drift. Without sufficient constraints, retain separate submaps and their uncertainty.

## Validate physical and navigation assets

Separate visible meshes from simplified colliders and verify aligned transforms. Static floors, walls, and furniture differ from dynamic bodies in backend support. NavMesh does not replace contact geometry. Measure doorway and corridor clearance, floor level, and obstacle boundaries using the intended robot dimensions.

Remove moving people from static background reconstruction where appropriate, then add [controllable crowds](../crowd-motion/). Public visual examples also need appropriate authorization and removal of faces, plates, location metadata, and private-place clues. ViPE, depth estimation, Lyra, and SAGE-3D remain optional routes; this guide does not claim their complete interchange or physics-import pipeline was tested.
