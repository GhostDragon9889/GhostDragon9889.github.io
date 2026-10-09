---
{
  "title": "Meta-RL：任务分布与快速适应",
  "description": "梳理基于优化、上下文推断与循环记忆的适应路径。",
  "date": "2026-10-09 20:17:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "research",
  "permalink": "knowledge/meta-rl/",
  "translation_path": "en/knowledge/meta-rl/",
  "notebook": {
    "slug": "meta-rl",
    "group": "adaptation",
    "sources": [
      "N030"
    ]
  }
}
---

## 元训练与测试适应

Meta-RL 在任务分布 $M\sim p(M)$ 上训练，使策略在新任务中利用少量反馈快速适应。评估必须说明任务族、训练/测试拆分、可见上下文和适应预算。任务内插值、动力学变化与全新任务 OOD 是不同难度。

## 三种常见路径

| 路径 | 测试时改变什么 | 需要记录 |
|---|---|---|
| 优化式适应 | 网络参数或部分参数 | 梯度步数、样本、初始化 |
| Context / task inference | 任务表示或条件输入 | 可用数据、推断规则 |
| Recurrent adaptation | 隐状态 | 任务内跨 episode 记忆与 reset |

原短笔记引用 Lilian Weng 的介绍，并把记忆作为循环 Meta-RL 的关键组件。这里限定其适用范围：RNN 不是所有 Meta-RL 方法的必要结构，梯度适应或上下文推断也能承担任务信息更新。

## 探索与利用的双重目标

一个动作既可以提高当前回报，也可以揭示任务动力学或奖励。元训练需要同时学习“怎样识别任务”和“识别后怎样控制”。如果任务标识或 privileged state 已经透露答案，应在输入协议中明确，否则可能高估快速适应能力。

## 与现有阅读的连接

从[RL²](/reading/p05/)理解隐状态适应，再对比[MetaVLA](/reading/p10/)的示范条件化与[π_RL](/reading/p11/)的参数更新。三者都能利用任务信息，但学习机制、数据与测试成本不同。新实验可固定任务族，逐项比较零样本、上下文、梯度更新和累计交互预算；这是研究建议，不是已完成的复现结果。


## 原笔记中的选读链接

- [参考 1](https://lilianweng.github.io/posts/2018-11-30-meta-learning/)
- [参考 2](https://lilianweng.github.io/posts/2018-02-19-rl-overview/))
- [参考 3](https://lilianweng.github.io/posts/2019-06-23-meta-rl/)
