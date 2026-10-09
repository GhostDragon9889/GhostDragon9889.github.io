---
{
  "title": "On-policy、Off-policy 与经验回放",
  "description": "合并完全重复笔记，梳理行为策略、目标策略及数据分布偏移。",
  "date": "2026-10-09 20:03:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/sampling-replay/",
  "translation_path": "en/knowledge/sampling-replay/",
  "notebook": {
    "slug": "sampling-replay",
    "group": "foundations",
    "sources": [
      "N031",
      "N032",
      "N037"
    ]
  }
}
---

## 数据策略与目标策略

行为策略 $b$ 决定数据怎样产生，目标策略 $\pi$ 决定要评估或优化谁。On-policy 在相关更新中使用与当前目标策略相匹配的数据；off-policy 允许二者不同。Replay buffer 是存储与抽样机制，不是算法类别。本专题把 `Replay Buffer` 与其完全相同的 `on-policy以及off-policy` 合并。

| 数据机制 | 常见用途 | 需要说明 |
|---|---|---|
| 当前策略 rollout | REINFORCE、PPO 等 | 收集时的策略与 old log probability |
| 历史 replay | DQN、TD3、SAC 等 | 来源、容量、抽样概率、更新/数据比例 |
| 固定离线数据集 | Offline RL | 支持域、数据质量与是否增加环境交互 |

Off-policy 在线算法仍然可以不断采集新数据。固定数据集上的 offline RL 则面对更强的覆盖限制；允许 replay 不代表一个算法可直接、可靠地离线训练。

## 三种不同的分布变化

重要性采样动作比率为 $\rho_t=\pi(a_t\mid s_t)/b(a_t\mid s_t)$，需要行为策略对目标动作有支持。这只能直接修正给定状态下的动作分布，不自动把状态访问分布 $d^b$ 换成 $d^\pi$。轨迹比率、每决策比率及截断修正具有不同方差与偏差。

Replay 随机抽样减少相邻样本相关性，却可能混合许多历史策略。优先级抽样又引入另一个训练分布；相应 importance weights 的目标是修正该抽样偏置，不能与策略重要性比率混为一谈。原包中的“优先级经验重放”文件为空，因此此处只给出接口区分，不把它当成独立来源文章。

## Bootstrap 的 episode 边界

对于继续任务中的外部时间限制，一般应使用真实 final observation 进行 bootstrap；真正任务终止应置 bootstrap 为零。若有限时长本身是任务定义的一部分，需要把剩余时间包含在状态中并按该任务解释终止。Vector environment 的自动 reset 返回值可能是新 episode 的起点，不能误当上一个 episode 的末状态。

## 实现记录

保存行为策略版本、old log probability、终止类型、final observation、采样规则及 replay 年龄。比较算法时，同时报告环境 transition 数和梯度更新数；两者相同的 wall-clock 成本并不固定。继续阅读：[占据分布](/knowledge/probability-measures/)、[价值外推](/knowledge/extrapolation/)、[评估协议](/knowledge/evaluation-protocol/)。


## 原笔记中的选读链接

- [参考 1](https://www.incompleteideas.net/papers/PSS-00.pdf)
- [参考 2](https://arxiv.org/abs/1205.4839)
- [参考 3](https://incompleteideas.net/papers/SSM-nips08.pdf)
