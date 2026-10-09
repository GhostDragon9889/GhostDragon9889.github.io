---
{
  "title": "可复现的 RL 实验与报告协议",
  "description": "统一环境版本、训练预算、checkpoint 选择、独立测试和统计汇总。",
  "date": "2026-10-09 20:24:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "evaluation",
  "permalink": "knowledge/evaluation-protocol/",
  "translation_path": "en/knowledge/evaluation-protocol/",
  "notebook": {
    "slug": "evaluation-protocol",
    "group": "evaluation",
    "sources": [
      "N001",
      "N002",
      "N003",
      "N004",
      "N005",
      "N006",
      "N007",
      "N041",
      "N009"
    ]
  },
  "featured": true
}
---

## 定义研究主张与测试集

本协议综合七份 benchmark 调研、统计笔记和 Deep RL That Matters 的补充材料，供设计实验时使用。首先确定研究问题与主指标，再固定环境族、任务拆分和用于调参的验证数据。尚未开展的实验应标记为计划，不能写成复现结果。

## 实验记录表

| 记录项 | 最低需要包含 |
|---|---|
| 环境身份 | Package、版本、ID、地图/模型、wrappers |
| 任务语义 | Reward、success、cost、horizon、终止和截断 |
| 观察动作 | 模态、privileged inputs、单位、归一化、action repeat |
| 数据预算 | 环境 transition、agent steps、示范、offline 数据、reset |
| 优化预算 | 梯度更新、batch、网络、优化器、搜索配置总量 |
| 策略选择 | Final / best-validation / checkpoint 规则及数据 |
| Evaluation | 冻结策略、episode 数、seed、noise、test split |
| 系统配置 | CPU/GPU、并行环境、精度、端到端 wall-clock |
| 输出 | 原始 seed 级数据、曲线、置信区间、配置与代码版本 |

采样、训练、验证和测试预算要分别统计。用测试任务选择最佳 checkpoint 会使后续“测试分数”带有选择偏差。

## 指标定义先于画图

固定同一区间 $[0,B]$ 的预算归一化面积可写为 $\mathrm{AUC}(B)=B^{-1}\int_0^B J(x)\,dx$。达到阈值的预算需要规定阈值、平滑和持续条件；未达到时应说明删失，而不是随意设成最后一步。

Success rate 要固定分母、超时和碰撞规则。平均回报、训练回报和测试回报不要混用。跨任务汇总先明确归一化参考，再给出逐任务结果与稳健聚合统计。

## 可复现执行顺序

先在小任务检查 reward、终止 mask、reset、动作范围和 seed；确认 baseline 后再开展核心比较。所有方法采用可比较的数据/搜索预算，关键组件做单独消融。完整保留全部 runs 与失败，分析完成后再按预先规则汇总。

Vector environment 的 final observation 与自动 reset 尤其需要核对。继续任务的外部截断通常保留 bootstrap；有限 horizon 任务则按其状态和终止定义处理。

## 结论的范围

小 seed 数与重叠区间不能支撑普遍优越性。硬件、奖励、地图和实现共同影响排名。报告的是“在哪些已固定的条件下改进了哪个指标”，并明确未测试的场景。

关联阅读：[统计与调参](/knowledge/statistics-tuning/)、[单智能体基准](/knowledge/single-agent-benchmarks/)、[MARL 基准](/knowledge/multi-agent-benchmarks/)、[复现论文](/reading/p32/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1709.06560)
- [参考 2](https://ale.farama.org/getting-started/)
- [参考 3](https://ale.farama.org/index.html)
- [参考 4](https://github.com/google-deepmind/dm_control)
- [参考 5](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)
- [参考 6](https://gymnasium.farama.org/environments/mujoco/)
