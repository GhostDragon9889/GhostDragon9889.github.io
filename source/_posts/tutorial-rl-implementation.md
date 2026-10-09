---
{
  "title": "强化学习实现：目标、掩码与梯度路径",
  "description": "把 PPO/GAE、TD、集中训练及表征学习连接到可检查的接口。",
  "layout": "post",
  "date": "2026-10-09 21:02:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/rl-implementation/",
  "tutorial": {
    "id": "T03",
    "group": "learning",
    "references": [
      "torch-autograd",
      "lab-scene"
    ]
  },
  "permalink": "tutorials/rl-implementation/"
}
---

## 目标和采样分布必须一致

折扣目标、平均奖励目标及有限时域目标有不同的访问分布。策略梯度中的 baseline 应与当前动作无关；actor 使用估计优势时通常将其视为固定权重。critic 存在误差不必然导致 actor 梯度有偏，关键是误差与 score 的期望相关项。完整理论入口见 [策略梯度](../../knowledge/policy-gradients/)、[TD 与投影](../../knowledge/mdp-bellman/) 和 [GTD2/TDC 阅读](../../reading/p34/)。

PPO 的 ratio 使用采样时的旧 log-prob。连续多维动作的联合 log-prob 需按正确动作轴归约；旧 log-prob 和估计优势不能在更新中随新策略一起变化。裁剪代理目标不保证每个 ratio 被限制，也不提供任意更新的单调回报保证。

## GAE 使用两个边界掩码

真正终止通常不 bootstrap；继续任务因时限重置时，可使用结束前 final observation 的价值。优势递推不能跨到新回合。若时限是任务本身的终点，则按真正终止处理。

```python
def gae(reward, value, next_value, terminated, reset, gamma, lam):
    # All arrays: [time, environment]. next_value uses final observations.
    import numpy as np
    advantage = np.zeros_like(reward, dtype=float)
    carry = np.zeros(reward.shape[1], dtype=float)
    for t in range(len(reward) - 1, -1, -1):
        delta = reward[t] + gamma * (~terminated[t]) * next_value[t] - value[t]
        carry = delta + gamma * lam * (~reset[t]) * carry
        advantage[t] = carry
    return advantage
```

示例中的 `terminated`、`reset` 必须为布尔数组，`reset` 包含真正终止与触发环境重置的截断。最后一个 rollout 步仍通过 `next_value` bootstrap；不能拿自动 reset 后新回合的观测替代 final observation。

## 信息与更新对象

CTDE 允许训练 critic 使用额外信息，但部署 actor 的输入必须可获得。记录邻居 mask、死亡 mask、RNN reset 和任务切换的边界。TD3、TD7、SimBa、Dual Goal、Meta-RL 与流式学习应分别写明价值目标、表示损失、冻结副本、更新参数和样本来源；它们不能仅凭网络名称互换。详见 [学习笔记专题](../../notes/)。

## 官方资料补充与验收

Autograd 文档可用于核对 detach 和叶梯度行为；Isaac Lab 的 InteractiveScene 文档说明复制场景与共享资产的组织方式。实体数量、传感器 batch 与独立完整环境数量必须分别确认。本文的 GAE 为教学示例，其他算法不宣称本次运行验证。

先用两个环境、一个终止和一个截断检查回报与 final observation，再检查动作归约、有限梯度和 actor/critic 参数更新范围。把 TD 残差、Bellman 误差、真实价值误差与任务回报分开记录。已有 [GAE 阅读](../../reading/p36/) 和 [实验协议](../../knowledge/evaluation-protocol/) 提供后续路线。
