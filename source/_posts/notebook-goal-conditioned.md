---
{
  "title": "Goal-Conditioned RL、UVFA 与 HER",
  "description": "对齐目标条件价值、事后目标重标记和层次控制接口。",
  "date": "2026-10-09 20:14:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/goal-conditioned/",
  "translation_path": "en/knowledge/goal-conditioned/",
  "notebook": {
    "slug": "goal-conditioned",
    "group": "adaptation",
    "sources": [
      "N025"
    ]
  }
}
---

## 显式目标变量

GCRL 把目标 $g$ 作为策略和值函数的输入：$\pi(a\mid s,g)$、$V(s,g)$、$Q(s,a,g)$。奖励 $r(s,a,s',g)$ 描述相对于该目标的进展。目标可以是坐标、图像或语言，但目标表示能否判断完成，需要在任务中明确规定。

UVFA 通过一个函数逼近器共享多个目标的价值表示。泛化效果取决于目标分布、表示和数据覆盖，不能从“加一个 goal 输入”直接得到。

## HER 重标记

HER 使用轨迹实际达到的目标重新解释部分 transition，并重新计算该目标对应的奖励和终止信息。原目标失败的数据因此可能提供新目标的成功监督。必须确保同一物理 transition 在目标改变后仍然有效；若动力学本身依赖目标，简单重标记未必成立。

随机环境中的未来目标选择可能带来 hindsight bias，重标记规则、重要性修正和算法假设需要单独检查。HER 与 off-policy replay 可以结合，但不是所有任意 reward 或目标编码都无需修改。

## 子目标与重标记不是同一个操作

| 操作 | 发生时间 | 改变什么 |
|---|---|---|
| 目标 / 子目标选择 | 收集数据时 | 实际行为和访问分布 |
| Hindsight relabeling | 收集之后 | 对既有 transition 的训练解释 |
| Hierarchical control | 多个决策时间尺度 | 高层与低层的控制接口 |

时间抽象与目标条件化可以配合，但并不等价。对比式 RL 可把未来状态可达性联系到表征学习；相关价值解释依赖具体采样分布和理论假设。

## 评价建议

固定训练目标与测试目标拆分，报告成功率、达到目标的步数、越界/碰撞和目标距离。区分插值目标、OOD 目标和全新技能；新坐标可达并不等于能完成新任务。关联阅读：[Options](/knowledge/options/)、[Meta-RL](/knowledge/meta-rl/)、[MDP 抽象](/knowledge/mdp-abstraction/)。


## 原笔记中的选读链接

- [参考 1](https://proceedings.neurips.cc/paper/7090-hindsight-experience-replay.pdf)
- [参考 2](https://arxiv.org/abs/2206.07568)
