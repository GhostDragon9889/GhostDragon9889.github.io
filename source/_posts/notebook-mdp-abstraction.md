---
{
  "title": "MDP Homomorphism 与状态动作抽象",
  "description": "区分奖励/转移保持、策略提升、互模拟与近似表示。",
  "date": "2026-10-09 20:13:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/mdp-abstraction/",
  "translation_path": "en/knowledge/mdp-abstraction/",
  "notebook": {
    "slug": "mdp-abstraction",
    "group": "adaptation",
    "sources": [
      "N029"
    ]
  }
}
---

## 抽象必须保持哪些结构

设状态映射 $f:\mathcal S\to\bar{\mathcal S}$，动作映射 $g_s:\mathcal A_s\to\bar{\mathcal A}_{f(s)}$。精确 MDP homomorphism 要求映射后的 reward 一致，且每个抽象状态块的转移概率与原状态动作一致：

$$
\bar r(f(s),g_s(a))=r(s,a),\qquad
\bar P(\bar s'\mid f(s),g_s(a))=\sum_{s':f(s')=\bar s'}P(s'\mid s,a).
$$

这里给出有限离散情形；连续空间需要用概率核和可测映射表述，而非直接把求和复制过去。

## 价值等价与策略提升

如果这些结构条件成立，并且抽象动作具备适当覆盖，抽象问题可以保留对应动作的最优价值。提升抽象策略时，原空间可能有多个动作映射到同一抽象动作，需要指定如何在其原像中分配概率。只学到一个低维 embedding，并不自动满足 reward 和 transition 保持条件。

## 与相近概念的区别

| 概念 | 强调什么 |
|---|---|
| 状态聚合 | 合并多个状态，需要检查是否丢失控制信息 |
| Bisimulation | 状态之间的奖励与转移行为等价关系 |
| Homomorphism | 显式状态、动作映射及动力学保持 |
| Automorphism | 同一 MDP 的可逆结构对称性 |
| 近似表征 | 允许奖励/转移误差，需要另给误差分析 |

近似抽象的价值误差会随奖励差异、转移差异和折扣累计放大。具体界依赖所选距离、奖励有界性和策略映射，不能只给一个 embedding loss 就推出控制保证。

## 在表示学习中如何检查

比较同一 embedding 附近的 reward、下一状态分布和可执行动作；检查不可见的速度、接触或任务目标是否仍影响未来。针对对称机器人状态，可以验证动作变换是否也同步满足对称性。理论结构应在数据、模型和执行接口上共同成立。

关联阅读：[SALE](/reading/p35/)、[马尔可夫状态](/knowledge/markov-memory/)、[目标条件 RL](/knowledge/goal-conditioned/)。


## 原笔记中的选读链接

- [参考 1](https://proceedings.neurips.cc/paper_files/paper/2022/file/7f44f98e5e70dea605d0c5baca231c58-Paper-Conference.pdf])
- [参考 2](https://proceedings.neurips.cc/paper_files/paper/2022/file/7f44f98e5e70dea605d0c5baca231c58-Paper-Conference.pdf)
