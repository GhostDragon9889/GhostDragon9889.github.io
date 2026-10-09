---
{
  "title": "IPPO、COMA 与多智能体梯度方差",
  "description": "修正 COMA 拼写，比较独立学习、集中式 critic 与反事实信用分配。",
  "date": "2026-10-09 20:15:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/multiagent-gradients/",
  "translation_path": "en/knowledge/multiagent-gradients/",
  "notebook": {
    "slug": "multiagent-gradients",
    "group": "evaluation",
    "sources": [
      "N027",
      "N028"
    ]
  }
}
---

## IPPO、COMA 与集中式 critic

IPPO 对各智能体使用独立 PPO 更新，可能共享 actor 参数，但“独立”不意味着环境中的其他学习者固定。严格的局部 critic 版本应与采用全局信息的 MAPPO 等 CTDE 配置区分。COMA 的反事实 baseline 固定其他智能体动作，对当前智能体的可能动作求期望：

$$
A_i(s,\mathbf a)=Q(s,\mathbf a)-\sum_{a_i'}\pi_i(a_i'\mid o_i)Q(s,(\mathbf a_{-i},a_i')).
$$

它针对团队奖励中的信用分配。MADDPG 使用联合信息 critic 配合确定性 actor；三者的动作空间、估计器及训练信息并不相同。原文件名中的 `CMOA` 按正文实际讨论的 COMA 修正。

## 修正一个奖励条件混用的例子

原笔记在“所有动作相同”与“所有动作为 1”之间切换，并丢失 Bernoulli 概率参数导数的常数。以下是独立重推，不能把两个事件当成只差常数的梯度问题。

令 $a_i\sim\mathrm{Bernoulli}(\theta_i)$ 且独立。若 $R=\mathbf1\{a_1=\cdots=a_N=1\}$，则 $J=\prod_i\theta_i$。在所有 $\theta_i=1/2$ 时，令 $p=2^{-N}$，

$$
\hat g_i=2R,\qquad \mathbb E\hat g_i=2p,\qquad
\operatorname{Var}(\hat g_i)=4p(1-p),\qquad
\frac{\mathbb E\hat g_i}{\sqrt{\operatorname{Var}(\hat g_i)}}=\sqrt{\frac p{1-p}}.
$$

非零更新概率为 $p$，信噪比随人数下降，尽管绝对方差也下降。

如果奖励同时接受“全 0”和“全 1”，则 $J=\prod_i\theta_i+\prod_i(1-\theta_i)$，对称点的真实梯度为零。此时 $\langle\hat g,\nabla J\rangle>0$ 的概率为零，不能沿用前一个事件的“正确梯度方向概率”结论。成功样本概率 $2^{1-N}$ 的指数衰减仍成立，但它是另一条陈述。

## 评价与局限

集中式信息可减少某些未观测随机性，但 critic 的逼近误差、维度和覆盖仍可能成为瓶颈。该 toy example 不证明任何集中式算法在所有任务上都优于 IPPO。比较应控制参数共享、critic 信息、奖励、预算和伙伴拆分。

继续阅读：[MARL 基准](/knowledge/multi-agent-benchmarks/)、[策略梯度](/knowledge/policy-gradients/)。
