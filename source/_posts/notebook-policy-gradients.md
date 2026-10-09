---
{
  "title": "策略梯度、REINFORCE 与替代目标",
  "description": "从轨迹似然推导梯度，并解释 baseline、PPO clipping 与 KL 诊断。",
  "date": "2026-10-09 20:04:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/policy-gradients/",
  "translation_path": "en/knowledge/policy-gradients/",
  "notebook": {
    "slug": "policy-gradients",
    "group": "policy",
    "sources": [
      "N033",
      "N035",
      "N049"
    ]
  }
}
---

## 轨迹似然推导

对于有限时长目标 $J(\theta)=\mathbb E_{\tau\sim p_\theta}[\sum_{u=0}^{T-1}\gamma^u r_u]$，环境转移不直接依赖策略参数时，轨迹 log 概率的导数只保留动作策略项。利用过去奖励与当前动作的条件独立性，可以写成

$$
\nabla J(\theta)=\mathbb E\!\left[\sum_{t=0}^{T-1}\gamma^t\nabla_\theta\log\pi_\theta(a_t\mid s_t)G_t\right],\qquad
G_t=\sum_{l=0}^{T-t-1}\gamma^l r_{t+l}.
$$

这里保留了外层 $\gamma^t$。另一种记号把它吸收到折扣占据分布中；不能在推导中静默删去这个因子，又宣称目标完全相同。

## Baseline 与方差

对固定状态，$\mathbb E_a[\nabla\log\pi(a\mid s)b(s)]=0$，因此不依赖动作的 baseline 不改变 score-function 梯度期望。$V^\pi$ 产生优势 $A^\pi=Q^\pi-V^\pi$，但它不一定是每种加权梯度方差意义下的最优 baseline。

REINFORCE 的噪声来自长程随机回报、策略 score、稀疏成功以及其他智能体。Reward-to-go 去掉过去奖励的无用噪声；critic、GAE 和标准化可进一步改变方差，但也引入估计误差或改变有限样本更新。减方差不能只看 value loss。

## 替代目标与 PPO

固定旧策略数据时，常优化 $L(\theta)=\mathbb E_{\pi_{old}}[\rho_t(\theta)\hat A_t]$，其中 $\rho_t=\pi_\theta/\pi_{old}$。PPO 使用

$$
L^{clip}=\mathbb E\!\left[\min\bigl(\rho_t\hat A_t,\operatorname{clip}(\rho_t,1-\epsilon,1+\epsilon)\hat A_t\bigr)\right].
$$

它限制有利方向的替代收益，却不是硬 KL 约束，也不保证每次真实回报单调上升。多轮优化以后，优势标签和旧状态分布可能逐渐失配。实践中需要观察 KL、clip fraction、entropy、梯度尺度及独立 evaluation return。

## 理论与实证的连接

把“梯度估计是否准确”“critic 是否预测真实价值”“替代目标是否对应真实回报”分别检验，才能知道改进来自哪里。继续阅读：[原始策略梯度定理](/reading/p37/)、[GAE](/reading/p36/)、[A Closer Look](/reading/p31/)、[多智能体梯度](/knowledge/multiagent-gradients/)。


## 原笔记中的选读链接

- [参考 1](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
- [参考 2](https://arxiv.org/abs/1506.02438)
- [参考 3](https://arxiv.org/abs/1502.05477)
- [参考 4](https://arxiv.org/abs/1707.06347)
- [参考 5](https://arxiv.org/pdf/1707.06347)
