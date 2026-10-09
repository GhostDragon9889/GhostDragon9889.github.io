---
{
  "title": "Potential-Based Reward Shaping",
  "description": "用望远镜求和解释策略不变性，明确终止状态与奖励尺度的条件。",
  "date": "2026-10-09 20:11:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/reward-shaping/",
  "translation_path": "en/knowledge/reward-shaping/",
  "notebook": {
    "slug": "reward-shaping",
    "group": "foundations",
    "sources": [
      "N038"
    ]
  }
}
---

## 塑形奖励为何可能改变任务

增加距离奖励、接触奖励或中间奖励，可能让智能体获得更密集反馈，也可能改变最优行为。一个策略若通过循环反复领取中间奖励，就说明新奖励并非原任务的简单加速器。回报提高不能自动解释为原始任务完成率提高。

## Potential-based 形式

取状态 potential $\Phi(s)$，使用与任务相同的折扣：

$$
F(s,a,s')=\gamma\Phi(s')-\Phi(s),\qquad r'=r+F.
$$

从 $s_0$ 到 $s_T$ 的折扣塑形项望远镜相消：

$$
\sum_{t=0}^{T-1}\gamma^tF_t=-\Phi(s_0)+\gamma^T\Phi(s_T).
$$

无限折扣情形下有界 potential 使末项趋零；episodic 情形常令真正终止状态的 potential 为零。若末项因策略而不同，则不能直接宣称策略不变。外部 truncation 和真实终止也需要区分。

在相应条件下，$Q'^\pi(s,a)=Q^\pi(s,a)-\Phi(s)$，同一状态的动作排序保持不变。对所有可用动作施加同一个状态平移，是这个结论的核心。

## 与初始化的联系

塑形 learner 与初始化为原始 $Q_0+\Phi(s)$ 的未塑形 learner，在匹配更新和 advantage-based 动作选择等条件下可以保持 Q 值平移关系。具体路径等价需要相同数据、随机性、tie-breaking 和算法假设，详见[Wiewiora 论文笔记](/reading/p38/)。策略不变性与逐步学习路径等价是不同层次。

## 工程建议

分别记录原始 reward、shaping reward 与任务成功事件；用原始任务指标评价。改变奖励尺度还会改变神经 critic 的梯度和自动温度的相对尺度，即使理想最优动作排序不变，有限训练过程也可能不同。

关联阅读：[MDP 与 Bellman](/knowledge/mdp-bellman/)、[SAC](/knowledge/sac-duality/)、[实验协议](/knowledge/evaluation-protocol/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1106.5267)
- [参考 2](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)
- [参考 3](https://arxiv.org/abs/2201.03544)
