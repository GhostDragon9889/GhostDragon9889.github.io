---
{
  "title": "VLA Execution: Action Chunks, Latency, and Feedback",
  "description": "Separate action representation, generation, consumption, and scheduling; measure observation age.",
  "layout": "post",
  "date": "2026-10-09 21:12:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/vla-execution/",
  "tutorial": {
    "id": "T13",
    "group": "vla",
    "references": [
      "openvla",
      "openpi-remote",
      "openpi-readme"
    ]
  }
}
---

## Separate model and execution layers

A vision-language-action policy maps images, instructions, and supported state inputs to actions. Discrete action tokens, continuous vectors, diffusion, and flow trajectories have different training and decoding procedures. OpenVLA documents decoding and normalization interfaces; OpenPI documents policy serving and clients. Action dimensions, token counts, and robot joint counts remain separate.

Here VLA means vision-language-action. Variable-length arrays in C/C++ are a different concept.

## Track three time scales

Predict `H` actions, execute `K≤H` per call, and use a low-level interval `dt`. If observation-to-result delay is `tau`, the observation age at action `j` is approximately `tau+j·dt`, plus queueing. Larger `K` reduces calls while extending open-loop execution; smaller `K` offers more feedback at higher communication and compute cost.

| Intervention | Required measurements |
|---|---|
| Fewer diffusion/flow steps | Latency and quality on identical hardware |
| Token/network pruning | Decision cost, failures, distribution change |
| Dynamic chunk consumption | H, K, stop rule, intervention delay |
| Asynchronous inference | Observation identity, arrival, switch time |
| Prefix constraints/inpainting | Immutable executed prefix and continuity |

## Official-source supplement: chunks do not define the control loop

OpenPI remote inference returns an `(action_horizon, action_dim)` chunk. The client determines when to request and execute it. Service latency excludes some sensing, networking, control, and simulation costs. A prediction horizon does not require consuming the whole chunk. Fields and normalization depend on the selected policy configuration.

Carry request, episode, and observation identities through asynchronous calls. Cancel or discard results after resets, task changes, or expiry. At a chunk switch, check position/velocity continuity and controller state. Generic scheduling pseudocode is not an implementation of a particular paper.

## Experimental route

Start with synchronous fixed `H/K` execution and change one timing factor at a time. Report end-to-end latency quantiles, observation age, queue size, success, and failures. Normalize action units before pruning decisions; raw Euclidean distance across translation, angles, and gripper commands implies arbitrary weights. RL adaptation must name the updated component: full model, head, adapter, latent variable, or separate policy.

Compare the existing [real-time execution readings](../../reading/?category=reading%3Areal-time) and continue with [OpenPI integration](../openpi-libero/). No new VLA performance or robot experiment is claimed.
