---
{
  "title": "最大熵 RL、SAC 与对偶温度调节",
  "description": "合并五份笔记，修正温度梯度符号及 off-policy 与 offline 的混淆。",
  "date": "2026-10-09 20:10:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/sac-duality/",
  "translation_path": "en/knowledge/sac-duality/",
  "notebook": {
    "slug": "sac-duality",
    "group": "policy",
    "sources": [
      "N046",
      "N039",
      "N051",
      "N043",
      "N044"
    ]
  }
}
---

## 最大熵目标与 soft backup

最大熵 RL 在回报中加入温度加权的策略熵。SAC 的常见双 critic 实现使用

$$
y=r+\gamma(1-d)\left[\min_j Q_{\bar\theta_j}(s',a')-\alpha\log\pi_\phi(a'\mid s')\right],
\qquad a'\sim\pi_\phi.
$$

Critic 拟合 target，actor 最小化 $\mathbb E[\alpha\log\pi_\phi(a\mid s)-\min_jQ_{\theta_j}(s,a)]$。双 Q 的 min 用于缓解高估，不是任意 critic 都无偏或必定更准确的证明。不同 SAC 版本是否显式使用 value network，需要分开说明。

## 温度的对偶解释

约束 $\mathbb E[-\log\pi]\geq\mathcal H_{target}$ 对应非负乘子 $\alpha$。固定策略时，可以最小化

$$
J(\alpha)=\mathbb E[-\alpha(\log\pi(a\mid s)+\mathcal H_{target})],\qquad
\partial_\alpha J=\mathcal H(\pi)-\mathcal H_{target}.
$$

熵高于目标时，梯度为正，梯度下降减小温度；熵不足时温度增大。原笔记的一处符号解释把正负写反，这里明确修正。连续分布的 differential entropy 可以为负，因此常见负 target entropy 不能按离散熵直觉解释。

实现中常设 $\alpha=\exp\eta$ 保证正值。精确的 $J(\exp\eta)$ 梯度含 $\alpha$ 因子；广泛使用的 log-temperature surrogate 去掉该因子，有相同固定点但不同更新尺度。记录实际 loss、detach 位置和目标熵，而不是只写“自动温度”。

## 一般对偶方法的边界

约束优化可先构造拉格朗日函数，内部优化原始变量，再更新乘子。极大化和极小化的方向依赖问题的符号约定。“dual gradient descent”与“dual ascent”不能脱离原问题直接比较。强对偶、Slater 条件和凸性结论也不能无条件推广到神经策略的联合训练。

## 来源整理中的修正

SAC 是 off-policy 在线算法；固定离线数据下还要处理 OOD 动作和外推误差。原笔记中的“40% 加速”“2.3 倍成功率”等数字未提供可定位的一手证据，未收入本整理正文。隐式策略若无法计算所需密度，也不能仅凭可采样就直接套用标准 SAC 熵项。

关联阅读：[重参数化](/knowledge/reparameterization/)、[采样与 replay](/knowledge/sampling-replay/)、[外推误差](/knowledge/extrapolation/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1801.01290)
- [参考 2](http://arxiv.org/abs/1812.05905)
- [参考 3](https://github.com/haarnoja/sac)
- [参考 4](https://arxiv.org/abs/1802.09477)
