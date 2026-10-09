---
{
  "title": "Potential-Based Shaping 与 Q 值初始化等价",
  "description": "通过 Q 值平移解释奖励塑形与初始化的路径等价条件。",
  "date": "2026-10-09 20:32:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p38/",
  "translation_path": "en/reading/p38/",
  "notebook": {
    "slug": "p38",
    "group": "classics",
    "sources": [
      "N015"
    ]
  },
  "paper": {
    "id": "P38",
    "title": "Potential-Based Shaping and Q-Value Initialization are Equivalent",
    "year": "2003",
    "version": "JAIR 2003; later arXiv entry 1106.5267",
    "url": "https://arxiv.org/abs/1106.5267",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 结果：奖励变化也可表现为初始化变化

Wiewiora 的 JAIR 2003 文章分析 potential-based shaping 与 Q-value initialization 的等价关系。来源链接 arXiv:1106.5267 是后来的条目，不能把其 2011 编号当作原论文发表年份。

设 shaping reward 为 $F=\gamma\Phi(s')-\Phi(s)$。塑形 learner 的值为 $Q^F$，未塑形 learner 以 $Q^U_0(s,a)=Q^F_0(s,a)+\Phi(s)$ 初始化。

## 一步 Q-learning 推导

若更新前有 $Q^U=Q^F+\Phi(s)$，未塑形 learner 的 TD error 是

$$
\delta_U=r+\gamma\max_{a'}Q^U(s',a')-Q^U(s,a)
=r+\gamma\Phi(s')-\Phi(s)+\gamma\max_{a'}Q^F(s',a')-Q^F(s,a)
=\delta_F.
$$

当双方对相同 transition 使用相同更新时，值平移关系被保留。相同状态内所有动作的 Q 值增加相同常数，greedy 排序及相关 advantage-based 选择可以一致。

## 路径等价的前提

需要匹配初始化、学习率、经历的 transition、随机选择和 tie-breaking，并使用对该状态常数平移不敏感的行为规则。若换成复杂神经表示、Adam、value clipping 或依赖绝对 Q 数值的探索方式，原始路径结论不能自动沿用。

## 与策略不变性区分

PBRS 的最优策略不变性通过 return 的边界项解释；该论文进一步讨论特定学习过程的对应。有限任务中的 terminal potential 和一致的折扣仍需正确处理。即使理论等价，不同参数化的有限训练和计算成本也可能不同。

## 研究用途

可在小表格任务中同时跑 shaping 与对应初始化，用相同数据逐步检查 Q 值差是否始终等于 potential。这比只比较最后 return 更直接地检验等价条件；本次未运行该实验。

关联阅读：[Reward shaping 专题](/knowledge/reward-shaping/)、[Bellman 更新](/knowledge/mdp-bellman/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1106.5267)
