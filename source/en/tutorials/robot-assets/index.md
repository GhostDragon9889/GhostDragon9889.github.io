---
{
  "title": "Robot Assets: CAD, USD, URDF, and Inertial Validation",
  "description": "Validate units, composition layers, joint frames, and physical properties in stages.",
  "layout": "post",
  "date": "2026-10-09 21:03:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/robot-assets/",
  "tutorial": {
    "id": "T04",
    "group": "simulation",
    "references": [
      "usd-glossary",
      "lab-articulation",
      "mujoco-model"
    ]
  }
}
---

## Build assets in four stages

Convert CAD assemblies into supported meshes, separate visual and collision geometry, and then add joints and physical properties. STEP support depends on converter and plugin versions; do not assume universal native import. Validate scale against a known dimension, then inspect normals, origins, hierarchy, and movable-part boundaries.

| Stage | Inspect | Minimal comparison |
|---|---|---|
| Geometry | Scale, orientation, resource references | A part with a known dimension |
| Topology | Links, joints, free/fixed base | A single-joint chain |
| Dynamics | Mass, center of mass, inertia, collision | Passive rest and drop tests |
| Control | Active/passive joints, limits, units | A small single-joint command |

## Official-source supplement: composition is more than copying

OpenUSD layers, references, payloads, variants, and instances describe different composition mechanisms. Preserve the source asset and edit through a separate override layer. Flattening composes the selected content; it does not retain every unselected variant or repair physics. Check external textures and other resources in the composed deliverable.

After URDF import, inspect resource resolution, joint axes, limits, zero positions, and drives. Passive rollers, coupled joints, and tool-frame markers are not automatically independent actuators. Isaac Lab's articulation tutorial separates asset configuration, root state, joint state, and commands, supporting staged acceptance.

## Validate inertia and joint frames

Dynamic bodies need positive mass and physically consistent inertia in the intended units. Principal moments must satisfy triangle inequalities; ordinary volumetric bodies require positive values. A documented geometric approximation, such as a solid sphere with `I = 2mr²/5`, is preferable to arbitrary stabilization values.

With column-vector notation, zero-position joint frames that should coincide satisfy:

$$
{}^WT_P\,{}^PT_J={}^WT_C\,{}^CT_J
$$

A nonzero joint position requires the allowed relative motion. Convert this convention to the actual matrix API. MuJoCo's modeling documentation explains inference of some inertial properties from geometry; successful inference is not physical system identification.

## Deliver an auditable asset

Record asset provenance, units, coordinates, joint-name mappings, dependencies, and modifications. Test one joint before adding gravity, contact, and control. Large initial displacement calls for inspection of penetration, duplicate constraints, and joint frames. Continue with [humanoid control and recovery](../humanoid-training/) or [contact and mecanum wheels](../contact-mecanum/).
