---
{
  "title": "GTD2 与 TDC：线性函数逼近下的梯度 TD",
  "description": "以 MSPBE 和辅助变量连接 off-policy 稳定性与线性复杂度。",
  "date": "2026-10-09 20:28:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p34/",
  "translation_path": "en/reading/p34/",
  "notebook": {
    "slug": "p34",
    "group": "classics",
    "sources": [
      "N011"
    ]
  },
  "paper": {
    "id": "P34",
    "title": "Fast Gradient-Descent Methods for Temporal-Difference Learning with Linear Function Approximation",
    "year": "2009",
    "version": "ICML 2009; source PDF not included",
    "url": "https://icml.cc/Conferences/2009/papers/546.pdf",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 问题：off-policy 的线性策略评估

Sutton 等人的 ICML 2009 工作研究固定策略、线性价值函数 $V_\theta(s)=\phi(s)^\top\theta$。普通 TD 结合 off-policy 采样和函数逼近可能不稳定；残差梯度又涉及不合适的目标几何、计算或采样困难。GTD2/TDC 用 MSPBE 和辅助变量构造线性复杂度更新。

## 投影目标与矩阵形式

记 $\phi'=\phi(s')$，$\delta=r+\gamma\theta^\top\phi'-\theta^\top\phi$，在匹配的加权/重要性采样定义下，

$$
A=\mathbb E[\phi(\phi-\gamma\phi')^\top],\quad b=\mathbb E[r\phi],\quad C=\mathbb E[\phi\phi^\top],\qquad
\mathrm{MSPBE}=(b-A\theta)^\top C^{-1}(b-A\theta).
$$

这里为便于阅读省略显式 off-policy 比率，不能直接把该简式当成未经校正的任意 replay 实现。$C$ 可逆性、采样覆盖和矩定义属于理论条件。

## 辅助递推与两类主更新

辅助变量跟踪 $w\approx C^{-1}\mathbb E[\delta\phi]$：

$$
w\leftarrow w+\beta(\delta-\phi^\top w)\phi.
$$

常见简式的 GTD2 主方向是 $(\phi-\gamma\phi')(\phi^\top w)$；TDC 为 $\delta\phi-\gamma\phi'(\phi^\top w)$。在 $w$ 已准确跟踪的期望层面，它们联系到同一个 MSPBE 梯度方向；有限步递推不相同。

辅助变量避免直接在每步显式求矩阵逆，也避免将两个相关单样本当作两个期望的无偏乘积。两时间尺度与稳定性假设对证明很重要。

## 能够与不能够推出的结论

原笔记强调线性复杂度、off-policy 稳定性及与 TD 速度的实证联系。但保证主要属于固定策略的线性评估，不是深度网络、变化目标策略或完整控制算法的普遍全局收敛。比较速度也应绑定具体环境与实现。

## 阅读路线

先读[Bellman 误差专题](/knowledge/mdp-bellman/)及所附投影图，明确 MSBE 与 MSPBE，再读[随机逼近](/knowledge/convergence/)。可在 Baird 类型线性例子中比较普通 TD、残差梯度与 GTD2/TDC，逐项检验分布和步长；本次没有运行该实验。


## 原笔记中的选读链接

- [参考 1](https://icml.cc/Conferences/2009/papers/546.pdf)
