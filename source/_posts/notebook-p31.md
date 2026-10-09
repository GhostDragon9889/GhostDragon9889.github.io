---
{
  "title": "深度策略梯度的理论与实证差距",
  "description": "梯度估计、价值预测与替代目标景观的实证审查。",
  "date": "2026-10-09 20:25:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p31/",
  "translation_path": "en/reading/p31/",
  "notebook": {
    "slug": "p31",
    "group": "classics",
    "sources": [
      "N008"
    ]
  },
  "paper": {
    "id": "P31",
    "title": "A Closer Look at Deep Policy Gradients",
    "year": "2018 / ICLR 2020",
    "version": "arXiv:1811.02553; version unspecified",
    "url": "https://arxiv.org/abs/1811.02553",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 文献问题与阅读定位

Ilyas、Engstrom 等人的 *A Closer Look at Deep Policy Gradients* 以三个维度审查深度策略梯度：梯度估计、价值预测和优化景观。原笔记将主文、附录、策略梯度背景和若干解释混在一起，本整理把论文问题与补充分析分开。

题录链接为 arXiv:1811.02553；预印本始于 2018 年，会议版本为 ICLR 2020。上传资料未给出具体 arXiv 版本，也未附 PDF，所以版本细节仍需在正式引用时回查。

## 梯度估计：样本多不等于方向可靠

有限 rollout 的梯度 $\hat g$ 可以与大样本参考梯度 $g_{ref}$ 比较方向：

$$
\cos(\hat g,g_{ref})=\frac{\hat g^\top g_{ref}}{\|\hat g\|\|g_{ref}\|}.
$$

大样本估计也是参考近似，并非可直接观测的解析“真梯度”。原笔记记录，实际策略梯度方向与理论理想之间存在明显差距，任务、训练阶段与样本预算都影响这一测量。应报告重复抽样和方向不确定性，而不是只画一次余弦值。

## 价值预测：标签拟合与真实价值

Critic 的训练标签可包含 bootstrap、GAE 或有限轨迹回报。低 label loss 不自动等于接近 $V^\pi$，更不等于构造了低误差 actor gradient。网络可以拟合有偏或噪声标签；策略变化后，过去训练分布也可能失效。

可用冻结策略的大量独立 rollout 估计状态价值，再比较 critic 的训练 MSE、参考价值误差和实际优势梯度效果。三项指标分别对应拟合、预测和控制用途。

## 替代目标与真实景观

PPO/TRPO 通过旧策略数据上的 surrogate 更新。该局部目标在小范围内与真实回报联系紧密，但优化阶段、距离和实现细节会影响其适用性。上传笔记记录训练后期出现 surrogate 与真实 reward landscape 失配的实证现象；这不是“策略梯度定理错误”，也不是所有任务必定失配的定理。

## 对复现的启发

固定旧策略、数据、优势估计和候选更新方向，分别测量 surrogate、真实回报与 KL。再改变样本预算和 critic 训练，检查哪个环节改变了方向可靠性。这些是从笔记提炼的研究设计，未开展新实验。

继续阅读：[策略梯度专题](/knowledge/policy-gradients/)、[GAE](/reading/p36/)、[Deep RL That Matters](/reading/p32/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1811.02553)
- [参考 2](https://arxiv.org/abs/1709.06560)
- [参考 3](https://arxiv.org/abs/1506.02438)
- [参考 4](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
- [参考 5](https://arxiv.org/pdf/1502.05477)
- [参考 6](https://arxiv.org/abs/1707.06347)
