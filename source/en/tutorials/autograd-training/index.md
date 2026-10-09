---
{
  "title": "Autograd, Gradient Accumulation, and Training Recovery",
  "description": "Understand graph lifetime, inference modes, gradient accumulation, and checkpoint contracts.",
  "layout": "post",
  "date": "2026-10-09 21:01:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/autograd-training/",
  "tutorial": {
    "id": "T02",
    "group": "learning",
    "references": [
      "torch-autograd",
      "torch-amp"
    ]
  }
}
---

## Forward execution records dependencies

Reverse-mode autograd builds the graph during forward execution and saves values needed by backward rules. Backward computes vector–Jacobian products rather than storing a full Jacobian for every operation. Leaf parameters with `requires_grad=True` normally accumulate gradients in `.grad`. Repeated backward calls accumulate gradients; they do not perform optimizer updates.

`zero_grad(set_to_none=True)` starts an update window, `backward()` computes gradients, and `step()` updates parameters. Freezing parameters, detaching tensors, and disabling gradient recording affect different paths and must match the intended objective. Retain a graph only when another backward pass through it is required. Storing losses or recurrent states with attached graphs can cause sustained memory growth.

## Official-source supplement: eval does not disable autograd

`model.eval()` changes module behavior such as Dropout and BatchNorm while still allowing gradients. `no_grad()` suppresses ordinary backward graph recording. `inference_mode()` removes additional overhead, but tensors created there generally cannot be reused in computations that need to save them for backward. Choose a mode according to subsequent computation, not just its name.

## Weight accumulated gradients by sample count

This example assumes a sample-mean loss for each microbatch. Weighting by the actual window size handles unequal microbatches and a shorter final window.

```python
def update_window(model, optimizer, batches, loss_fn):
    total = sum(len(target) for _, target in batches)
    if total == 0:
        raise ValueError("empty accumulation window")
    optimizer.zero_grad(set_to_none=True)
    for inputs, target in batches:
        loss = loss_fn(model(inputs), target)
        (loss * len(target) / total).backward()
    optimizer.step()
```

Masked token losses require weighting by valid token counts. Nonlinear regularizers need their own treatment. The official AMP examples require consistent scaling within an effective batch: accumulate first, then unscale, clip, step, and update the scaler. BatchNorm statistics and Dropout randomness can prevent equivalence to a single large forward batch.

## Restore the training process

Save the model, optimizer, learning-rate scheduler, AMP scaler, global step, and normalization statistics. Exact continuation can also require random-generator states, sampler position, and environment state. Recovery at an epoch boundary differs from recovery at an arbitrary instant. Loading weights alone initializes a model; it does not restore the complete process. Compare a short continuation under identical conditions, checking losses, updates, and data order. Cross-device bitwise identity is not claimed.
