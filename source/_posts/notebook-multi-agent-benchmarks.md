---
{
  "title": "多智能体 RL Benchmark 与协作评价",
  "description": "按合作、竞争、混合动机、局部观测及跨伙伴泛化整理 MARL 基准。",
  "date": "2026-10-09 20:23:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "evaluation",
  "permalink": "knowledge/multi-agent-benchmarks/",
  "translation_path": "en/knowledge/multi-agent-benchmarks/",
  "notebook": {
    "slug": "multi-agent-benchmarks",
    "group": "evaluation",
    "sources": [
      "N006",
      "N007"
    ]
  }
}
---

## 先描述交互结构

两份 MARL 调研在此合并。必须先说明合作、竞争或混合动机，团队 reward 还是个体 reward，局部观测、通信、参数共享以及测试伙伴。PettingZoo 和 OpenSpiel 是接口/游戏生态，不能把名称本身当作一个固定的评价任务。

| 基准或平台 | 主要结构 | 必须说明 |
|---|---|---|
| MPE/MPE2、PettingZoo | 轻量粒子任务与多种环境 | AEC/Parallel API、具体 scenario、wrapper |
| SMAC / SMACv2 | 局部观测的团队战术 | 地图、单位、随机化、时间与可见信息 |
| Multi-Agent MuJoCo | 连续协作控制 | 关节分组、局部信息和 agent 数 |
| Hanabi | 不完美信息协作 | 合法通信、手牌、游戏规则 |
| Overcooked / RWARE | 任务协同与长期规划 | Layout、horizon、伙伴和 shaping |
| Melting Pot | 社会互动与未知伙伴 | Substrate、背景群体、测试情景 |
| Google Research Football | 团队控制与竞争 | Scenario、控制人数、奖励和对手 |
| OpenSpiel | 博弈与策略分析 | 具体游戏、信息集和最佳响应计算 |
| MAgent2 / MARLGrid | 大规模或网格交互 | Agent 数、观测和场景生成 |
| Pommerman / RoboCup / Arena / Unity | 竞技或平台特定任务 | Fork、规则、控制接口和外部引擎 |

固定地图可用于算法回归，但泛化主张需要未见地图、随机化情景或伙伴拆分。Cross-play 与 self-play 应分别报告；能与自己的副本配合不等于能与未知伙伴配合。

## 指标的适用边界

Team return、success/win rate 和 learning curve 是基础。通信方法需报告消息预算与无通信/打乱消息的消融；社会互动可补充 welfare、分布和公平性定义。

对一般博弈，可写

$$
\mathrm{NashConv}(\pi)=\sum_i\left[\max_{\pi_i'}u_i(\pi_i',\pi_{-i})-u_i(\pi)\right].
$$

需要可用的精确或近似最佳响应，并注明近似误差。Exploitability 的具体归一化依赖博弈及实现，不能把合作任务 win rate 当作均衡证明。Elo/Glicko 依赖对手池，非传递关系可能让单一排名丢失信息。

## 预算与统计单位

一个环境 step 可同时包含多 agent 动作；agent steps、joint environment transitions 和 rollout 长度必须分开。所有 team agents 的共享回报不是独立训练重复。报告参数共享、central critic 输入、并行环境数、更新数和全任务 wall-clock。

## 可解释的比较

固定训练与测试地图、伙伴/对手池和选择协议。比较闭环策略与去掉观察反馈的对照，可检查固定任务是否允许时间表式投机。将回报、OOD 伙伴表现和计算成本一起看，结论才对应所声称的协调能力。

关联阅读：[IPPO/COMA](/knowledge/multiagent-gradients/)、[统计](/knowledge/statistics-tuning/)、[实验协议](/knowledge/evaluation-protocol/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1902.04043)
- [参考 2](https://pettingzoo.farama.org/index.html)
- [参考 3](https://github.com/oxwhirl/smac)
- [参考 4](https://github.com/oxwhirl/smacv2)
- [参考 5](https://magent2.farama.org/index.html)
- [参考 6](https://github.com/schroederdewitt/multiagent_mujoco)
