---
{
  "title": "PyTorch：轴语义、广播与存储布局",
  "description": "用形状契约区分换轴、重塑、视图与复制，避免损失广播错误。",
  "layout": "post",
  "date": "2026-10-09 21:00:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/tensor-layout/",
  "tutorial": {
    "id": "T01",
    "group": "learning",
    "references": [
      "torch-tensor"
    ]
  },
  "permalink": "tutorials/tensor-layout/"
}
---

## 先写形状契约

图像常写为 `[B,C,H,W]`，序列为 `[B,T,D]`，并行轨迹为 `[E,T,A]`。先说明每个轴，再选择算子。`x[:,0]` 消去一个轴，`x[:,0:1]` 保留它；`squeeze()` 可能在 batch 为 1 时删除批量轴，接口代码宜使用 `squeeze(dim)`。`cat` 拼接已有轴，`stack` 增加一个轴。

广播从末轴对齐。预测 `[B,1]` 减去标签 `[B]` 会得到 `[B,B]`，程序能运行但比较了所有预测与所有标签。

```python
import torch

prediction = torch.arange(4.0).reshape(4, 1)
target = torch.arange(4.0)
assert (prediction - target).shape == (4, 4)
target = target.reshape_as(prediction)
assert (prediction - target).shape == (4, 1)
```

## 换轴和重塑回答不同问题

`permute`、`transpose` 改变轴的对应关系；`reshape` 改变元素组织形状。`[2,3]` 的张量重塑为 `[3,2]`，与转置成 `[3,2]` 的元素排列不同。分类器通常用 `flatten(1)` 保留 batch；多头注意力则应先明确时间、head 和通道的对应关系。

```python
x = torch.arange(6).reshape(2, 3)
assert not torch.equal(x.reshape(3, 2), x.transpose(0, 1))
y = x.transpose(0, 1)
assert not y.is_contiguous()
assert y.contiguous().is_contiguous()
```

## 官方文档补充：不能依赖 reshape 是否复制

固定版本的 Tensor Views 文档说明：基本索引通常返回视图，高级索引返回复制；两种索引的赋值都是原地操作。`reshape`、`flatten` 可返回视图或新张量，用户代码不应依赖其中一种。`contiguous()` 在已满足目标内存格式时返回自身，否则复制。非连续不意味着所有 `view` 都失败，能否使用取决于形状与 stride 的兼容性。

`expand` 使用共享存储的广播视图，`repeat` 复制数据。需要独立可修改数据时明确创建副本，避免对零 stride 的扩展结果原地写入。

## 实践验收

给每个模型入口检查 shape、dtype、device；对 batch 为 1、序列长度为 1 和空 mask 单独检查。损失函数前核对预测与标签形状，归约后核对标量含义。维度检查只验证接口，仍需检查标签与样本是否对齐。继续阅读 [自动求导与训练循环](../autograd-training/)。
