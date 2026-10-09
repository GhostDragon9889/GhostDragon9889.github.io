---
{
  "title": "GAE：优势估计的偏差与方差",
  "description": "由 TD 残差构造优势，连接 reward-to-go、λ-return 和 critic 误差。",
  "date": "2026-10-09 20:30:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p36/",
  "translation_path": "en/reading/p36/",
  "notebook": {
    "slug": "p36",
    "group": "classics",
    "sources": [
      "N013"
    ]
  },
  "featured": true,
  "paper": {
    "id": "P36",
    "title": "High-Dimensional Continuous Control Using Generalized Advantage Estimation",
    "year": "2015 / ICLR 2016",
    "version": "arXiv:1506.02438; version unspecified",
    "url": "https://arxiv.org/abs/1506.02438",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 文献身份与核心问题

Schulman 等人的 GAE 工作以 arXiv:1506.02438 链接，预印本为 2015 年，会议版本为 ICLR 2016。它研究优势估计的偏差—方差折中，并与信赖域策略/value 更新结合开展连续控制实验。GAE 是估计器，不是完整的 PPO 或 TRPO 算法。

## 从 TD residual 构造优势

对价值估计 $V$，定义 $\delta_t^V=r_t+\gamma V(s_{t+1})-V(s_t)$。GAE 为

$$
\hat A_t^{GAE(\gamma,\lambda)}=\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}^V.
$$

有限 rollout 可反向递推，并处理正确的末状态 bootstrap。$\lambda=0$ 只用一步 residual；$\lambda=1$ 在匹配边界下得到回报减去 baseline。$\gamma$ 定义折扣评价，$\lambda$ 决定残差混合，二者不能看成完全等价的“平滑系数”。

## 什么情况下有偏

若 $V=V^\pi$，一步 TD residual 的条件期望与相应优势一致；一般 critic 误差会进入 estimator。较小 λ 依赖更多 bootstrap，较大 λ 保留更多远期噪声。Finite rollout、time-limit、reward convention 和 actor 的占据权重都会影响“无偏”的具体目标。

论文的 γ-just 概念与折扣 policy-gradient 的正确性相联系；如果原任务是未折扣回报，选择 $\gamma<1$ 本身也改变了所估计目标。不能一面忽略目标变化，一面只讨论 λ 引入的偏差。

## Critic 应服务于 actor

对训练标签的 MSE 小，不保证 actor gradient 更准确。误差在哪些状态和方向上出现、score function 怎样加权，都会影响控制。Compatible features 的理论是一个特定结构条件，不应套到所有神经 critic。

## 复现建议

固定训练模型和 rollout，检查终止 mask、old values、优势递推和是否 detach。再控制 γ/λ、critic 容量与训练预算，比较梯度方向、方差和独立任务回报。本次仅整理笔记，没有重跑原实验。

关联阅读：[资格迹](/knowledge/eligibility-traces/)、[策略梯度定理](/reading/p37/)、[A Closer Look](/reading/p31/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1506.02438)
- [参考 2](https://arxiv.org/pdf/1502.05477)
- [参考 3](https://arxiv.org/abs/1509.02971)
- [参考 4](https://arxiv.org/abs/1512.04455)
- [参考 5](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
- [参考 6](https://papers.neurips.cc/paper/2073-a-natural-policy-gradient.pdf)
