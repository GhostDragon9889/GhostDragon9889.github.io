---
{
  "title": "策略梯度定理与兼容函数逼近",
  "description": "明确占据分布、兼容特征和函数逼近的理论条件。",
  "date": "2026-10-09 20:31:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p37/",
  "translation_path": "en/reading/p37/",
  "notebook": {
    "slug": "p37",
    "group": "classics",
    "sources": [
      "N014"
    ]
  },
  "paper": {
    "id": "P37",
    "title": "Policy Gradient Methods for Reinforcement Learning with Function Approximation",
    "year": "1999",
    "version": "NeurIPS 1999 proceedings",
    "url": "https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 理论问题

Sutton、McAllester、Singh 与 Mansour 的 NeurIPS 1999 论文连接随机策略梯度和函数逼近。核心是避免显式计算状态访问分布对策略参数的导数，并给出满足兼容条件的价值近似器何时保持策略梯度正确。

## 占据分布和目标记号

对固定初始分布、归一化折扣占据 $d^\pi$，标准形式为

$$
\nabla_\theta J(\theta)=\frac1{1-\gamma}\mathbb E_{s\sim d^\pi,a\sim\pi_\theta}\left[\nabla_\theta\log\pi_\theta(a\mid s)Q^\pi(s,a)\right].
$$

使用未归一化占据测度时，外面的系数被吸收。平均奖励形式则使用其自身的平稳分布与 differential value 条件，不能把折扣与平均奖励公式直接拼接。

## Compatible approximation

令 score features 为 $\psi_\theta(s,a)=\nabla_\theta\log\pi_\theta(a\mid s)$，线性近似 $f_w=w^\top\psi_\theta$。若按定理要求的同一权重分布进行最小二乘，并达到相应驻点，可由残差正交条件保持梯度中的期望项。

$$
\mathbb E\left[\psi_\theta(s,a)\bigl(Q^\pi(s,a)-f_w(s,a)\bigr)\right]=0.
$$

State baseline 可另行处理，不影响动作 score 的零期望。Compatible features 不是“critic 和 actor 同用一层神经网络”这一工程条件，也不是任意近似价值都无偏。

## 与自然梯度的连接

在对应权重下，$F=\mathbb E[\psi\psi^\top]$ 与 Fisher 几何联系，最小二乘得到的 $w$ 可与 $F^{-1}g$ 联系。逆矩阵的存在、正则化、目标分布和近似优化都需明确。自然梯度与普通梯度的方向区别不能仅凭“更稳定”描述。

## 学习路线

先通过[轨迹似然推导](/knowledge/policy-gradients/)理解 score，再用[占据分布](/knowledge/probability-measures/)统一权重，最后进入[GAE](/reading/p36/)和[实证审查](/reading/p31/)。定理提供条件化的精确关系，实际深度训练还需要验证 critic、采样和更新是否满足条件。


## 原笔记中的选读链接

- [参考 1](https://papers.neurips.cc/paper/1713-policy-gradient-methods-for-reinforcement-learning-with-function-approximation.pdf)
