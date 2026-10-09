---
{
  "title": "Eligibility Traces 与 TD(λ)",
  "description": "整理前向 λ-return、后向资格迹、在线等价条件和终止边界。",
  "date": "2026-10-09 20:05:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/eligibility-traces/",
  "translation_path": "en/knowledge/eligibility-traces/",
  "notebook": {
    "slug": "eligibility-traces",
    "group": "policy",
    "sources": [
      "N024"
    ]
  }
}
---

## 从 n-step 到 λ-return

给定固定价值估计，$n$ 步回报是前 $n$ 步奖励加上第 $n$ 步 bootstrap。无限轨迹的 $\lambda$-return 是几何混合：

$$
G_t^\lambda=(1-\lambda)\sum_{n=1}^{\infty}\lambda^{n-1}G_t^{(n)},\qquad
G_t^\lambda-V(s_t)=\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}.
$$

有限 episode 的末项必须包含剩余 Monte Carlo 回报；不能直接用一个截断但未归一化的无限混合代替。$\lambda=0$ 对应一步 TD，$\lambda\to1$ 对应更长程的信用传播。

## 后向资格迹

表格型 accumulating trace 写为 $e_t(s)=\gamma\lambda e_{t-1}(s)+\mathbf1\{s=s_t\}$，更新 $V(s)\leftarrow V(s)+\alpha\delta_t e_t(s)$。在线性价值函数下，指标向量替换为特征 $\phi_t$。一次 TD error 因而会影响过去活跃的状态或特征。

Replacing traces 对重复访问有不同处理；true-online TD(λ) 使用 Dutch trace 和校正项以匹配特定在线前向视角。普通 accumulating traces 与固定权重、离线前向 λ-return 的等价，不意味着对任意在线变化参数都逐步精确等价。

## 与 GAE 的联系

GAE 使用相同的折扣 TD 残差求和来估计优势；TD(λ) 常用它来更新价值。表达式相似，优化对象不同。较小 λ 缩短传播距离、加强 bootstrap 依赖；较大 λ 引入更多未来噪声。是否无偏还取决于价值准确性、轨迹截断以及使用的折扣目标。

## 实现边界

新 episode 通常应重置资格迹；真正终止后的价值设零。外部时间截断则要保留正确末状态和相应 bootstrap。Off-policy traces 需要匹配算法的比率或截断校正；不能把未经修正的 on-policy 迹直接当作一般离策略收敛方案。

建议在短链 MDP 上同时实现离线前向混合与后向更新，固定权重后比较，再观察在线更新导致的差异。继续阅读：[GAE](/reading/p36/)、[数据采样](/knowledge/sampling-replay/)。


## 原笔记中的选读链接

- [参考 1](https://icml.cc/Conferences/2005/proceedings/papers/112_TDLambdaNetworks_TannerSutton.pdf)
- [参考 2](http://www.incompleteideas.net/book/7/node5.html#eqgoal)
- [参考 3](https://arxiv.org/html/2312.12972v1)
