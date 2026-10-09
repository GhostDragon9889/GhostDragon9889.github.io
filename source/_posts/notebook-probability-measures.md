---
{
  "title": "概率测度、经验测度与 RL 占据分布",
  "description": "统一概率核、轨迹分布、平稳分布及折扣占据测度的记号。",
  "date": "2026-10-09 20:01:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/probability-measures/",
  "translation_path": "en/knowledge/probability-measures/",
  "notebook": {
    "slug": "probability-measures",
    "group": "foundations",
    "sources": [
      "N047",
      "N045"
    ]
  }
}
---

## 一个统一的概率框架

可测空间 $(\Omega,\mathcal F)$ 规定哪些事件可以赋予概率；概率测度 $\mu$ 满足非负性、可数可加性和 $\mu(\Omega)=1$。随机变量把样本空间映射到状态、动作或回报空间。密度依赖所选参考测度，概率分布本身不依赖某一种坐标表示。

MDP 的转移是概率核 $P(ds'\mid s,a)$。对每个 $(s,a)$，它给出后继状态的概率测度；对每个可测集合，它又是 $(s,a)$ 的可测函数。连续空间中的条件概率不能简单理解为“某一个点的概率”。

## 时间分布、平稳分布和占据分布

固定策略形成 $P^\pi$，时间分布满足 $\mu_{t+1}=\mu_tP^\pi$。平稳分布满足 $d=dP^\pi$，但其存在、唯一性和从任意初始状态收敛需要额外条件。不可约、非周期与 recurrent class 的性质不能随意互换。

折扣占据测度定义为

$$
d^\pi_{\mu_0}(s)=(1-\gamma)\sum_{t=0}^{\infty}\gamma^t\Pr_\pi(s_t=s\mid\mu_0),\qquad
\rho^\pi(s,a)=d^\pi_{\mu_0}(s)\pi(a\mid s).
$$

它是归一化的状态访问分布，与无限时刻的平稳分布一般不同。若不乘 $(1-\gamma)$，就得到总质量 $1/(1-\gamma)$ 的非归一化版本；策略梯度公式中的系数必须随记号一起调整。

## 经验测度与相关样本

样本 $x_1,\ldots,x_n$ 对应 $\hat\mu_n=\frac1n\sum_i\delta_{x_i}$，因此经验期望是样本平均。IID 下大数定律提供常见保证；RL 轨迹具有时间相关性，不能直接把 IID 的方差公式或有效样本量套到逐 transition 数据上。Replay 打乱顺序有助于训练，却不让历史数据自动变成当前策略的独立样本。

| 分布 | 由什么决定 | 常见用途 |
|---|---|---|
| 轨迹分布 | 初始分布、策略、转移核 | 似然比策略梯度 |
| 折扣占据分布 | 初始分布、策略、折扣 | 折扣回报与策略比较 |
| 平稳分布 | 固定策略诱导的 Markov 链 | 平均奖励与长期分析 |
| Replay / 数据集分布 | 数据收集历史和抽样规则 | Off-policy 拟合与覆盖分析 |

把所有期望都写出采样分布，是检查推导是否发生分布替换的有效方法。继续阅读：[数据采样与回放](/knowledge/sampling-replay/)、[实验统计](/knowledge/statistics-tuning/)、[策略梯度定理](/reading/p37/)。


## 原笔记中的选读链接

- [参考 1](https://sites.stat.washington.edu/jaw/RESEARCH/TALKS/BocconiSS/emp-prc-bk-big2.pdf)
- [参考 2](https://ocw.mit.edu/courses/18-175-theory-of-probability-spring-2014/pages/lecture-slides/)
- [参考 3](https://ethz.ch/content/dam/ethz/special-interest/mavt/dynamic-systems-n-control/idsc-dam/Lectures/Stochastic-Systems/Probability.pdf)
- [参考 4](https://en.wikipedia.org/wiki/Empirical_measure)
- [参考 5](https://en.wikipedia.org/wiki/Empirical_distribution_function)
- [参考 6](https://www.columbia.edu/~ww2040/6711F12/lect0904.pdf)
