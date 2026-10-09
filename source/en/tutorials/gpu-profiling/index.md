---
{
  "title": "GPU Software Stacks and Correct PyTorch/JAX Timing",
  "description": "Separate drivers, toolkits, and framework runtimes; synchronize asynchronous benchmarks.",
  "layout": "post",
  "date": "2026-10-09 21:16:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/gpu-profiling/",
  "tutorial": {
    "id": "T17",
    "group": "toolchain",
    "references": [
      "jax-async",
      "jax-install",
      "torch-amp"
    ]
  }
}
---

## Inspect four layers

Drivers provide device access. The CUDA Toolkit supplies tools such as `nvcc`. Framework distributions include or depend on runtime components. A target model still needs an actual computation. `nvidia-smi`, `nvcc --version`, a device list, and a successful model run establish different layers. The CUDA limit shown by `nvidia-smi` is not the installed toolkit version.

JAX installation documentation distinguishes packaged CUDA dependencies from a local CUDA installation and sets driver/platform requirements. Follow a specific version rather than retroactively recommending the current combination for historical hardware. A warning from an unused backend differs from failure on the required backend.

## Official-source supplement: asynchronous return is not completion

A JAX array can represent pending device work. Timing Python dispatch alone misses computation. `block_until_ready()` waits without necessarily transferring the result to the host. Separate initial compilation from steady execution.

```python
import time
import jax
import jax.numpy as jnp

f = jax.jit(lambda x: x @ x)
x = jnp.ones((128, 128))
f(x).block_until_ready()  # warmup, outside the measured window
start = time.perf_counter()
result = f(x)
result.block_until_ready()
elapsed_seconds = time.perf_counter() - start
```

This uses the available JAX backend, which must be recorded separately. Its output is not a published performance score.

## Measure PyTorch GPU work

Use CUDA events for a device segment or correctly synchronize the boundaries of a wall-clock interval. End-to-end inference additionally includes preparation, transfer, serving, action consumption, and control. Choose AMP dtype for the hardware and numerical range. FP16 scaling and BF16 support need separate checks rather than a universal configuration.

## Minimum reporting fields

Record model/data revisions, batch size, precision, device type, warmup count, measurement count, synchronization, and latency quantiles. Separate cold start, steady execution, peak memory, and throughput. Batch throughput is not single-robot feedback latency, and low utilization does not uniquely identify Python overhead.

Remove serial numbers, private hostnames, process accounts, paths, and network endpoints before publishing logs. Continue with [Python builds](../python-builds/) and [reproducible debugging](../reproducible-debugging/). Target CUDA/JAX model performance was not measured for this edition.
