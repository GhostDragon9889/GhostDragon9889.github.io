---
{
  "title": "PyTorch: Axes, Broadcasting, and Storage Layout",
  "description": "Define shape contracts and distinguish axis changes, reshaping, views, and copies.",
  "layout": "post",
  "date": "2026-10-09 21:00:00",
  "updated": "2026-10-09",
  "lang": "en",
  "collection": "engineering",
  "translation_path": "tutorials/tensor-layout/",
  "tutorial": {
    "id": "T01",
    "group": "learning",
    "references": [
      "torch-tensor"
    ]
  }
}
---

## Start with a shape contract

Common layouts are `[B,C,H,W]` for images, `[B,T,D]` for sequences, and `[E,T,A]` for parallel trajectories. Define every axis before choosing an operation. Integer indexing removes an axis; a slice can retain it. An unrestricted `squeeze()` can remove the batch axis when its size is one, so use an explicit dimension at interfaces. `cat` joins an existing axis; `stack` creates one.

Broadcasting aligns trailing axes. Subtracting labels shaped `[B]` from predictions shaped `[B,1]` produces `[B,B]`. This silently compares every prediction with every label.

```python
import torch

prediction = torch.arange(4.0).reshape(4, 1)
target = torch.arange(4.0)
assert (prediction - target).shape == (4, 4)
target = target.reshape_as(prediction)
assert (prediction - target).shape == (4, 1)
```

## Axis changes and reshaping have different meanings

`permute` and `transpose` change axis correspondence. `reshape` reorganizes the shape while respecting element order. Reshaping a `[2,3]` tensor to `[3,2]` differs from transposing it. A classifier commonly uses `flatten(1)` to preserve the batch axis; attention requires an explicit mapping between time, heads, and channels.

```python
x = torch.arange(6).reshape(2, 3)
assert not torch.equal(x.reshape(3, 2), x.transpose(0, 1))
y = x.transpose(0, 1)
assert not y.is_contiguous()
assert y.contiguous().is_contiguous()
```

## Official-source supplement: do not assume reshape copies

The pinned Tensor Views documentation distinguishes basic indexing, which returns views, from advanced indexing, which returns copies. Assignment through either indexing form is in-place. `reshape` and `flatten` may return a view or a new tensor; application code should not depend on which occurs. `contiguous()` returns the input if it already satisfies the requested memory format and otherwise copies. Some views of non-contiguous tensors remain possible when the requested shape is compatible with the strides.

`expand` represents broadcasting through shared storage; `repeat` copies data. Create an explicit independent copy when independent mutation is required, particularly for expanded tensors with zero strides.

## Acceptance checks

Check shape, dtype, and device at model boundaries. Include batches and sequences of size one and empty masks. Check prediction/target alignment before loss computation and the meaning of the final reduction. Shape correctness does not establish sample or label alignment. Continue with [autograd and training](../autograd-training/).
