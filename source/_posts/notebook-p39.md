---
{
  "title": "Sutton & Barto：强化学习教材阅读路线",
  "description": "从表格方法、函数逼近到探索与近似策略梯度的章节路线。",
  "date": "2026-10-09 20:33:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p39/",
  "translation_path": "en/reading/p39/",
  "notebook": {
    "slug": "p39",
    "group": "classics",
    "sources": [
      "N034"
    ]
  },
  "paper": {
    "id": "P39",
    "title": "Reinforcement Learning: An Introduction — A Reading Route",
    "year": "2018",
    "version": "Second edition; chapter-guide note",
    "url": "http://incompleteideas.net/book/the-book-2nd.html",
    "kind": "book",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 教材定位

Sutton 与 Barto 的 *Reinforcement Learning: An Introduction* 第二版（2018）建立从表格方法到函数逼近和策略梯度的统一语言。此条是上传章节笔记的整理阅读路线，不是新的论文结果或整本教材翻译。

## 三段学习结构

| 路线 | 章节重点 | 要掌握的问题 |
|---|---|---|
| 表格方法 | Bandits、MDP、DP、Monte Carlo、TD、n-step、planning | 期望与采样、评估与控制、探索与利用 |
| 函数逼近 | On/off-policy prediction、control、eligibility traces、policy gradients | 分布、投影、bootstrap、梯度与稳定性 |
| 深入主题 | 心理学/神经科学联系、应用、挑战与前沿 | 算法假设与实际系统的距离 |

## 建议的先修顺序

先建立[概率与经验测度](/knowledge/probability-measures/)和[MDP/价值](/knowledge/mdp-bellman/)的记号，再比较 DP 的精确回溯、Monte Carlo 的采样回报和 TD 的 bootstrap。随后读 n-step 和[资格迹](/knowledge/eligibility-traces/)，理解传播距离与偏差—方差。

进入函数逼近时，要把特征空间、训练分布和目标算子一起写出。[GTD2/TDC](/reading/p34/)可帮助理解 off-policy 稳定性为什么不是“打乱 replay”就能保证。接着连接[策略梯度](/knowledge/policy-gradients/)、[兼容逼近](/reading/p37/)和[GAE](/reading/p36/)。

## 学习中的小实验

Bandit 任务观察探索规则，网格 MDP 比较 value/policy iteration，随机游走比较 MC/TD/n-step，短链任务比较前向与后向 traces。使用同一数据和真实可计算值，有助于区分算法更新目标与曲线表象。

对连续控制和深度算法，再引入[基准选型](/knowledge/single-agent-benchmarks/)和[实验统计](/knowledge/statistics-tuning/)。教材中的理论分析不直接保证任意深度实现，benchmark 分数也不能替代对目标和假设的理解。

## 记录方式

每章记录定义、关键假设、推导、反例及一个可复核的小任务；把待证明问题与已经读到的定理分开。原包只有 `GAE` 标题的占位文件不单独发布，实际 GAE 内容已归入[P36](/reading/p36/)。


## 原笔记中的选读链接

- [参考 1](https://mitpress.mit.edu/9780262039246/reinforcement-learning/)
