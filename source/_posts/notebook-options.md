---
{
  "title": "Options、SMDP 与 Intra-option Learning",
  "description": "统一时间抽象、持续时间折扣和跨 option 的样本复用。",
  "date": "2026-10-09 20:12:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/options/",
  "translation_path": "en/knowledge/options/",
  "notebook": {
    "slug": "options",
    "group": "adaptation",
    "sources": [
      "N026"
    ]
  }
}
---

## Option 是怎样定义的

一个 option 写作 $o=(I_o,\pi_o,\beta_o)$：启动集合决定在哪里可选，内部策略决定如何执行，终止函数给出何时结束的概率。Primitive action 可以看作执行一步就终止的特殊 option。高层策略选择 option，低层策略选择实际动作。

## 时间抽象与 SMDP 回溯

Option 持续 $\tau$ 步时，回溯应使用持续时间折扣：

$$
Q(s,o)\leftarrow Q(s,o)+\alpha\left[\sum_{k=0}^{\tau-1}\gamma^k r_{t+k}+\gamma^\tau\max_{o'}Q(s_{t+\tau},o')-Q(s,o)\right].
$$

每个 option 的执行长度可能不同，不能统一把末状态折扣写成 $\gamma$。若原任务真正终止，后续价值置零。Markov option 根据当前状态决定内部动作和终止；更一般的 semi-Markov option 可以依赖执行中的历史。

## Intra-option learning

传统 SMDP 更新等待 option 完成。Intra-option 方法利用中间 transition，并可更新与已执行动作兼容的其他 option。典型一步目标使用

$$
U(s',o)=(1-\beta_o(s'))Q(s',o)+\beta_o(s')\max_{o'}Q(s',o').
$$

然后把 $r+\gamma U(s',o)$ 用作 target。样本复用要求内部策略与行为动作有正确匹配或校正；不是一条 transition 对所有 option 都无偏有效。终止策略学习、option discovery 和固定 option 的值学习也应分开讨论。

## 机器人中的接口

高层目标选择、运动技能和低层控制频率形成不同时间尺度。需要明确高层什么时候可抢占、option 的成功/失败终止、累计奖励、动作占用时间与隐藏状态的 reset。某个技能运行更快，不意味着高层决策频率同样提高。

关联阅读：[GCRL](/knowledge/goal-conditioned/)、[状态动作抽象](/knowledge/mdp-abstraction/)、[具身研究设计](/knowledge/embodied-research/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1609.05140)
