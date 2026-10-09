---
{
  "title": "For SALE / TD7：状态动作表征学习",
  "description": "区分 SALE 表征目标、TD7 工程组件及实证结论的适用范围。",
  "date": "2026-10-09 20:29:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p35/",
  "translation_path": "en/reading/p35/",
  "notebook": {
    "slug": "p35",
    "group": "classics",
    "sources": [
      "N012"
    ]
  },
  "featured": true,
  "paper": {
    "id": "P35",
    "title": "For SALE: State-Action Representation Learning for Deep Reinforcement Learning",
    "year": "2023",
    "version": "arXiv:2306.02451; version unspecified",
    "url": "https://arxiv.org/abs/2306.02451",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## SALE 与 TD7 的区别

*For SALE: State-Action Representation Learning for Deep Reinforcement Learning* 是 NeurIPS 2023 工作，来源链接为 arXiv:2306.02451。SALE 是状态动作表示机制；TD7 是在 TD3 基础上组合该表示、checkpoint、replay 与若干稳定机制的整体算法。不能把所有收益都直接归于 encoder。

## 表征目标

用 $z_s=f(s)$ 表示状态，用 $z_{sa}=g(z_s,a)$ 表示状态动作，并让它预测下一状态 embedding：

$$
\mathcal L_{enc}=\mathbb E\left[\|g(f(s),a)-\operatorname{sg}(f(s'))\|^2\right].
$$

该式表达概念目标；实际实现还涉及归一化、stop-gradient、fixed/target embedding 的版本与更新时序。原始状态和动作仍可进入 critic，并非一定丢弃低维状态只用 latent。

低维观测不意味着动力学简单。状态动作组合和接触/非线性关系也可能需要表示。另一方面，预测 embedding 不自动保证 homomorphism、可辨识真实动力学或任务最优控制。

## TD7 的其他组件

| 组件 | 作用 | 评价重点 |
|---|---|---|
| 解耦表示学习 | 避免 critic loss 随意牵引 encoder | 与端到端、无 encoder 的控制比较 |
| Fixed embeddings / normalization | 稳定价值目标与表示尺度 | 更新日程、梯度边界 |
| LAP 等 replay/loss 设计 | 改变样本利用和误差权重 | 与表示机制分开消融 |
| Policy checkpoints | 选择训练中的策略副本 | Assessment 与独立测试 |
| Value clipping | 抑制某些外推价值 | 阈值来源与欠估计 |
| Offline BC 项 | 限制固定数据中的策略偏移 | 与在线协议分开 |

## 实验与适用范围

上传长笔记记录 online MuJoCo、offline D4RL、组件消融和 runtime 讨论。它强调 No SALE 的退化以及 replay/checkpoint 的独立作用。表格分数属于笔记所述原论文配置；本次未附原 PDF，也未独立复核这些数值，因此整理正文不把它们作为新验证结果。

主要证据集中于低维连续控制。视觉输入、多任务 VLA、动态机器人及真实部署需要新的实验，不能由已有状态任务直接推出。训练 compute 也应与基础 TD3 分开比较。

## 继续阅读

[TD7 checkpoint](/knowledge/td7-checkpoints/)补充训练/评估机制；[MDP 抽象](/knowledge/mdp-abstraction/)说明表示何时有结构保证；[外推误差](/knowledge/extrapolation/)解释 offline 与 value clipping 的动机。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/2306.02451)
- [参考 2](https://github.com/sfujim/TD7)
- [参考 3](https://arxiv.org/abs/1812.02900)
- [参考 4](https://proceedings.neurips.cc/paper/2021/hash/a8166da05c5a094f7dc03724b41886e5-Abstract.html)
- [参考 5](https://arxiv.org/abs/1802.09477)
- [参考 6](https://github.com/sfujim/TD3)
