---
{
  "title": "具身 RL、LLM/VLA 与研究问题设计",
  "description": "把样本效率、任务适配、奖励和时序问题转为可比较的研究实验。",
  "date": "2026-10-09 20:19:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "research",
  "permalink": "knowledge/embodied-research/",
  "translation_path": "en/knowledge/embodied-research/",
  "notebook": {
    "slug": "embodied-research",
    "group": "systems",
    "sources": [
      "N048",
      "N016"
    ]
  },
  "featured": true
}
---

## 把研究主张变成可测问题

上传笔记聚焦机器人操作、运动控制、Meta-RL、LLM/VLA 后训练和实验基准。可以沿“任务—数据—适应—执行—评价”组织，而不是把许多算法名放在一个研究框架中。先说明要改变的能力，再选择模型和 benchmark。

| 研究问题 | 可控比较 | 主要评价 |
|---|---|---|
| 少量数据是否足够适应 | 固定任务族与示范预算 | 测试成功率、额外交互、适应时间 |
| Reward shaping 是否有帮助 | 相同策略与原始任务 | 原任务成功、失败模式、训练效率 |
| RL 是否提升新场景恢复 | 固定预训练 checkpoint | ID/OOD、恢复、监督与 RL 数据总量 |
| 异步执行是否解决延迟 | 固定模型与硬件 | 观察年龄、实际执行 horizon、任务时间 |
| 世界模型是否提高规划 | 固定环境与规划预算 | 多步误差、真实成功、模型外推 |

表中的比较是研究建议，未声称已完成实验。

## LLM 后训练与具身控制的联系

Token 生成可建模为序列决策，RLHF、规则奖励 RL 和偏好优化提供不同训练信号。DPO 类方法依赖偏好数据和具体目标，不应统称为在线环境交互 RL。工具 agent 还需要环境状态、rollout、终止和反馈设计。

VLA 将视觉、语言条件与物理动作接口组合。实际控制涉及连续或离散动作、接触、观测延迟、reset 成本与底层控制器。不能把“普通 RL”概括为只有离散动作，也不能假设所有机器人都采用固定的策略/PD 频率。

## 数据与任务拆分

分别统计预训练、示范、offline replay、模拟交互、人类纠错和真实部署数据。Meta-RL 的适应不一定是调超参数；输入上下文、隐状态和梯度更新应各自列明。训练场景、测试场景、物体、任务指令和动力学的拆分，决定泛化结论的实际范围。

## 一条可执行的阅读顺序

先读[基础概率与价值](/knowledge/mdp-bellman/)、[策略梯度](/knowledge/policy-gradients/)和[评估协议](/knowledge/evaluation-protocol/)，再进入[RL²](/reading/p05/)、[MetaVLA](/reading/p10/)、[π_RL](/reading/p11/)和[RL Token](/reading/p12/)。执行层可接入[RTC](/reading/p16/)及[DynamicVLA](/reading/p19/)，最后用[原有跨论文路线](/knowledge/paperread-roadmap/)检查系统接口是否相容。
