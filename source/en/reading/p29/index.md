---
{
  "title": "Towards Physically Executable 3D Gaussian for Embodied Navigation",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "Object-aware Gaussian appearance is paired with existing mesh-derived collision geometry for navigation.",
  "collection": "reading",
  "lang": "en",
  "permalink": "en/reading/p29/",
  "translation_path": "reading/p29/",
  "paper": {
    "id": "P29",
    "title": "Towards Physically Executable 3D Gaussian for Embodied Navigation",
    "topic_id": "navigation-worlds",
    "year": "2025",
    "version": "2510.21307v2",
    "url": "https://arxiv.org/abs/2510.21307",
    "supplement": false,
    "summary_sha256": "cfaa934f817608f36e81e9c429dbd90561e986e8b2673395dec5441e92969ed3"
  },
  "layout": "post"
}
---

## Identity and contribution

Bingchen Miao, Rong Wei, Zhiqi Ge, and colleagues propose **SAGE-3D**, Semantically and Physically Aligned Gaussian Environments for 3D Navigation. The notes use **arXiv:2510.21307v2**, December 15, 2025.

The critical source boundary is that scenes begin with **existing artist-created meshes**. Gaussian splats provide appearance, while retained meshes and convex decomposition provide collision geometry. The paper does not prove automatic accurate collision recovery from arbitrary phone video or generated splats.

## Appearance, semantics, and physics

The environment aligns Gaussian rendering, object identities/attributes, and physical geometry in common coordinates. Gaussian opacity is not stiffness; density is not material mass. Format conversion alone does not supply friction, inertia, or reliable collision surfaces.

InteriorGS contains **1,000 scenes, over 554K object instances, and 755 categories**. The text's 752 residential plus 248 public scenes differs from a figure/appendix's 244 nonresidential count. The notes preserve this disagreement.

About 3,000 posed views per scene fit 3DGS. Top-view object footprints provide semantic maps, with door states and wall occupancy. Convex hulls and height projection lose concavities/clearance information; the benchmark uses a specific 1.2 m occupancy-height assumption rather than all-embodiment traversability.

CoACD decomposes original object meshes into invisible collision bodies assembled in USDA. Selected movable/articulated objects need their visible Gaussian transforms synchronized with physics. Convex decomposition remains approximate; the architecture does not fully validate flexible or complex articulated contact.

## SAGE-Bench and continuous metrics

Templates and model-generated high-level instructions use scene semantics. A phrase such as fetching a drink may define a navigation destination without an evaluated grasp/manipulation task. A* produces **2M instruction–trajectory pairs**. VLN testing has **35 scenes and 1,148 samples**, and models train on a disjoint **500K subset**, rather than every model using all pairs.

The new metrics need explicit definitions:

- **CSR:** time inside a tolerance corridor around a reference path with task conditions. Waiting in that corridor may score well, while another valid route may score poorly.
- **ICP:** time-average normalized contact intensity. The scalar mapping must say whether it uses contact, penetration, or impulse; a binary version measures contact-time fraction.
- **PS:** one minus the mean clipped absolute heading increment divided by π. Despite “variance” wording, the printed formula is not statistical variance. It depends on sampling and angle wrapping, and does not directly measure acceleration/jerk.

Assets per scene and reference-path length define difficulty slices; asset counts are not automatically obstacle density.

## Results and consistency checks

Selected SAGE training comparisons improve **NaVid 0.10→0.36 SR** and **NaVILA 0.21→0.46** in the reported setting. On R2R Val-Unseen, NaVILA-base improves **0.29→0.38**: nine percentage points or roughly 31% relative. The same table's fully trained NaVILA is 0.50, so the claim is improvement of the selected base, not beating every trained reference.

Reported hybrid rendering is **6.2 ms/frame and 220 MB**, versus mesh comparison 16.7 ms and 850 MB. Time to 40% SR is 6.2 versus 4.8 hours. Scene origins/complexity differ, and iteration units disagree between text and table, limiting pure representation-causality claims.

With 60K examples, 800/400/200/100 scenes give **0.36/0.31/0.27/0.23 SR**. Holding 800 scenes, 60K/120K/240K examples give 0.36/0.40/0.42. Diversity and repeated trajectories are different expansion axes.

Several reported **SPL values exceed SR**, such as 0.48 versus 0.46. Under standard same-episode SPL this should not happen. A collision “rate” above one also resembles counts rather than a probability. These require code/author clarification before cross-paper aggregation.

## Limits and project integration

**Independent analysis:** a policy that does little can appear smooth or low-contact while failing its task. Evaluate completion alongside those proxies. Additional data, scene diversity, language distributions, and pretrained history confound the representation's isolated effect.

For video/Lyra-based scenes, independently build and calibrate floor/wall/door/furniture collision proxies, then align appearance boundaries with physical boundaries. Keep dynamic people as independent objects rather than embedded fixed Gaussian background. Validate passable holes, scale, axes, instance IDs, transforms, rigid-body settings, camera synchronization, splits, and raw contact logs.

The official resources separately provide Gaussian assets, USDZ, collision meshes, and VLN data. One download is not the whole executable environment. These are implementation recommendations from the original notes; no scene conversion or navigation experiment was rerun for this site.

## Source references

- [Source 1](https://arxiv.org/abs/2510.21307)
- [Source 2](https://arxiv.org/pdf/2510.21307v2)
- [Source 3](https://sage-3d.github.io/)
- [Source 4](https://github.com/Galery23/SAGE-3D_Official)
- [Source 5](https://huggingface.co/datasets/spatialverse/SAGE-3D_Collision_Mesh)

The source versions and checks above are retained from the uploaded PaperRead notes. This English edition edits their presentation; it does not report new experiments.
