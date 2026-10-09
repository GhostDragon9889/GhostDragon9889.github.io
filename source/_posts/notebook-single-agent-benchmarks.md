---
{
  "title": "单智能体 RL Benchmark 选型与指标",
  "description": "合并五份调研，按控制、视觉泛化、离线数据及具身任务选择基准。",
  "date": "2026-10-09 20:22:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "evaluation",
  "permalink": "knowledge/single-agent-benchmarks/",
  "translation_path": "en/knowledge/single-agent-benchmarks/",
  "notebook": {
    "slug": "single-agent-benchmarks",
    "group": "evaluation",
    "sources": [
      "N001",
      "N002",
      "N003",
      "N004",
      "N005"
    ]
  }
}
---

## 由研究主张反推基准

五份重叠的单智能体调研在此合并。Benchmark 应包含任务分布、观测、动作、奖励、版本、预算与测试协议。更高的固定环境回报，不能单独说明视觉泛化、真实机器人可靠性或更低计算成本。

| 环境族 | 适合检验 | 需要锁定的协议 |
|---|---|---|
| Classic Control / Box2D | 实现调试、轻量控制 | 环境 ID、时间限制、奖励 |
| MuJoCo / DM Control | 连续控制、优化与样本效率 | 模型版本、状态/像素、动作 repeat |
| ALE / Atari | 视觉决策、探索 | Sticky actions、action set、frame skip、评估模式 |
| Procgen / MiniGrid / BabyAI | 程序生成任务与泛化 | 训练 level、测试 level、任务条件 |
| Meta-World / robosuite / RLBench | 操作、接触、多任务 | 任务集、success、controller、演示协议 |
| D4RL / Minari 数据集 | 固定数据下的 offline 学习 | 数据版本、转换语义、score normalization |
| Safety-Gymnasium | 约束与成本 | Cost 定义、预算、违反率 |
| Habitat / CARLA | 导航、驾驶和场景迁移 | 场景划分、传感器、challenge 版本 |

框架名称相同不表示具体任务相同。D4RL 的某个迁移数据版本与原 benchmark 的终止字段、score reference 是否一致，需要逐项核对。

## 扩展套件与工程选择

DeepMind Lab、Retro、Crafter、MineRL 涉及视觉、探索、长期任务或历史游戏协议；应说明维护版本、任务规则和外部依赖。Isaac Lab、ManiSkill、MuJoCo Playground、Genesis、HumanoidBench 和 MyoSuite 对具身研究各有接口和模型假设，不能把支持 GPU 仿真直接等同于所有任务成本更低。

Unity ML-Agents、PySC2/SC2LE 和 Google Research Football 还可支持多智能体或竞技研究，单智能体 agent 的具体控制范围要列明。硬件需求应通过选定配置测量，不引用无配置上下文的通用吞吐数字。

## 主张与指标对齐

| 主张 | 推荐同时报告 |
|---|---|
| 样本效率 | 固定 transition 预算性能、同区间 AUC、达到阈值预算 |
| 泛化 | Held-out 任务/场景/level、训练测试差距 |
| 操作能力 | 原始任务成功率、碰撞、恢复、实际任务时间 |
| 稳定性 | 全部 seeds、失败率、区间与训练曲线 |
| 系统效率 | 环境步、梯度更新、wall-clock、硬件与端到端开销 |
| 安全约束 | Reward、cost、违反频率和实际约束定义 |

归一化回报通常写为 $100(R-R_{random})/(R_{reference}-R_{random})$，但参考分数和分母约定是 benchmark 特定的，不应跨套件直接复制。

## 选型与复现

先用便于调试的任务检验实现，再选择与核心主张一致的主 suite，最后用外部任务检查适用范围。保留环境 package、版本、地图/模型、wrapper、reset/termination、随机种子和训练/测试预算。

关联阅读：[多智能体基准](/knowledge/multi-agent-benchmarks/)、[统计](/knowledge/statistics-tuning/)、[评估协议](/knowledge/evaluation-protocol/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1709.06560)
- [参考 2](https://ale.farama.org/getting-started/)
- [参考 3](https://ale.farama.org/index.html)
- [参考 4](https://github.com/google-deepmind/dm_control)
- [参考 5](https://github.com/google-deepmind/mujoco/blob/main/LICENSE)
- [参考 6](https://gymnasium.farama.org/environments/mujoco/)
