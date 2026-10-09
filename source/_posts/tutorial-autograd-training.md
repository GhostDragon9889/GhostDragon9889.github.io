---
{
  "title": "Autograd、梯度累积与训练状态恢复",
  "description": "解释图生命周期、eval 与推理模式，并给出梯度累积和检查点契约。",
  "layout": "post",
  "date": "2026-10-09 21:01:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/autograd-training/",
  "tutorial": {
    "id": "T02",
    "group": "learning",
    "references": [
      "torch-autograd",
      "torch-amp"
    ]
  },
  "permalink": "tutorials/autograd-training/"
}
---

## 前向记录关系，反向计算梯度

常规反向自动求导在前向执行时建立计算关系，保存反向规则所需的量；反向计算向量–Jacobian 乘积，并非为每个算子预先保存完整 Jacobian。叶张量且 `requires_grad=True` 的参数通常在 `.grad` 累积梯度。多次 `backward()` 会累加，不会替代优化器更新。

`optimizer.zero_grad(set_to_none=True)` 定义新更新窗口的开始；`loss.backward()` 计算梯度；`optimizer.step()` 更新参数。冻结参数、`detach()` 与 `no_grad()` 改变不同位置的梯度路径，需与目标函数对应。需要多次反向穿过同一图时才考虑保留图；长期保留带图的 loss 或 hidden state 可能造成内存增长。

## 官方文档补充：eval 不关闭自动求导

`model.eval()` 改变 Dropout、BatchNorm 等模块行为，仍可求导。`no_grad()` 不记录常规反向图，适合验证和参数更新区域。`inference_mode()` 进一步省去相关开销，但其中创建的推理张量一般不能直接用于后续需要保存该张量的求导计算。选择模式时同时考虑后续用途，不能只按名称替换。

## 梯度累积按样本数加权

以下示例假设每个 microbatch 的 loss 为样本均值；按整个窗口的实际样本数加权，最后不足一个窗口的 batch 也能正确处理。

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

带 mask 的 token loss 应按有效 token 数加权；非线性正则项不应机械套用这个规则。AMP 示例还说明：在一个有效 batch 内保持梯度缩放一致，累积完成后再 unscale、裁剪、step 和更新 scaler。BatchNorm 统计和 Dropout 随机性可能使累积结果不同于一次大 batch 前向。

## 恢复完整训练状态

检查点应包含模型、优化器、学习率调度器、AMP scaler、全局步数及归一化统计。严格续训还需要随机数状态、采样器位置及环境状态；epoch 边界恢复和任意时刻恢复是不同任务。只加载模型权重属于初始化或推理，不等同于完整续训。用同条件的短窗口对比恢复前后 loss、参数更新和数据顺序；本文不声称跨设备逐位一致。
