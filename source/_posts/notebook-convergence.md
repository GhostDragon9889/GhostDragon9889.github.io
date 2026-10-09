---
{
  "title": "收缩映射、不动点与随机逼近",
  "description": "区分确定性 Bellman 收缩与带噪递推的收敛条件。",
  "date": "2026-10-09 20:02:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/convergence/",
  "translation_path": "en/knowledge/convergence/",
  "notebook": {
    "slug": "convergence",
    "group": "foundations",
    "sources": [
      "N023"
    ]
  }
}
---

## 确定性不动点

在完备度量空间中，若 $T$ 满足 $d(Tx,Ty)\leq c\,d(x,y)$ 且 $0\leq c<1$，Banach 不动点定理保证唯一不动点 $x^*$，迭代 $x_{k+1}=Tx_k$ 收敛，并有 $d(x_k,x^*)\leq c^k d(x_0,x^*)$。完备性和严格小于一的收缩系数都是实质条件。

有限折扣 MDP 的 Bellman 期望算子和最优算子在 sup norm 下都是 $\gamma$-收缩。$\gamma=1$ 的平均奖励或一般未折扣问题不能直接使用这个结论；函数逼近中的投影也可能改变所用范数和收缩性质。

## 从精确回溯到带噪递推

随机逼近的典型形式为

$$
x_{k+1}=x_k+\alpha_k\bigl(h(x_k)+M_{k+1}\bigr),\qquad
\sum_k\alpha_k=\infty,\quad \sum_k\alpha_k^2<\infty.
$$

这里 $M_{k+1}$ 通常需要满足鞅差或适当的 Markov 噪声条件、有限矩以及相应稳定性假设。步长条件只是收敛证明的一部分，还需处理迭代有界性、均值场的稳定根、异步访问和覆盖。固定步长通常产生持续波动，而不是原定理意义下的精确收敛。

## 四个概念的职责

| 概念 | 解决的问题 | 不能单独推出什么 |
|---|---|---|
| 收缩映射 | 迭代如何缩小距离 | 带噪更新的完整收敛 |
| Banach 定理 | 不动点的存在、唯一与确定性迭代 | 深度网络优化成功 |
| Robbins–Monro | 用随机观测寻找均值方程的根 | 任意噪声与任意步长都有效 |
| Dvoretzky 型随机逼近结果 | 在具体稳定性与扰动条件下控制递推 | 无条件的非线性 off-policy 收敛 |

## 在 RL 中如何使用

证明表格 Q-learning 时，要检查每个状态动作对的访问和各自步长，而不是只验证一个全局学习率。在线性 TD 中，要明确采样策略和加权范数；off-policy、bootstrap 与函数逼近组合可能破坏普通 TD 的稳定性。两时间尺度方法还要求快、慢递推有合适的步长比例。

实验曲线趋稳不是理论收敛的证明。可以先用一个有限 MDP 验证精确 value iteration 的几何收敛，再加入采样噪声、固定步长或不覆盖的数据，观察保证在哪一步失效。关联阅读：[Bellman 误差](/knowledge/mdp-bellman/)、[GTD2/TDC](/reading/p34/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/pdf/2202.05959)
- [参考 2](https://proceedings.neurips.cc/paper/1993/file/5807a685d1a9ab3b599035bc566ce2b9-Paper.pdf)
