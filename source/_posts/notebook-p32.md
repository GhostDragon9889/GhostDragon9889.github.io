---
{
  "title": "Deep RL That Matters：补充材料与复现方法",
  "description": "随机种子、网络结构、奖励尺度和代码实现如何改变算法比较。",
  "date": "2026-10-09 20:26:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p32/",
  "translation_path": "en/reading/p32/",
  "notebook": {
    "slug": "p32",
    "group": "classics",
    "sources": [
      "N009"
    ]
  },
  "paper": {
    "id": "P32",
    "title": "Deep Reinforcement Learning that Matters: Supplementary Evidence",
    "year": "2017 / AAAI 2018",
    "version": "Supplemental material; arXiv version unspecified",
    "url": "https://arxiv.org/abs/1709.06560",
    "kind": "paper",
    "topic_id": "rl-classics",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 本笔记主要覆盖补充材料

*Deep Reinforcement Learning that Matters* 讨论深度 RL 的复现和公平比较。上传笔记重点是 Supplemental Material：历史文献配置、作者完整设置、网络/激活/奖励尺度消融、代码库对比及统计分析。不能把补充材料中的一组配置当成通用最佳超参数。

文献 arXiv 链接为 1709.06560，会议为 AAAI 2018；预印本始于 2017 年。正文中的具体结果需要绑定其历史环境版本，不能直接与今天同名环境比较。

## 算法名称不足以定义 baseline

DDPG、TRPO、PPO、ACKTR 的实现可能使用不同网络、activation、奖励尺度、batch size 和评估规则。来源举出的历史配置包含 $(64,64)$、$(100,50,25)$ 与 $(400,300)$ 网络；这些是该材料讨论的实验变量，不是推荐统一配置。

更公平的比较需要分别固定或调节结构与优化预算，公开差异。Critic 配置也会通过优势或 Q 梯度影响 actor，不能当作无关的实现细节。

## Reward scale 与 batch

原笔记记录 DDPG 在多个奖励尺度下的显著变化，以及某些历史 TRPO 设置中大 batch 未必更好的观察。原因可能涉及 target 数值、梯度尺度、更新频率及策略分布滞后。经验现象应限定到具体设置，不推导成“大 batch 必然差”的结论。

## Seed、代码库与选择偏差

同一算法跨种子、环境和代码库的分散度，可能与所声称的方法改进同量级。只选 top runs 或 best checkpoint，会改变报告对象。作者还关注不同代码库 evaluation 是否对应一套冻结策略和完整 episode；这直接影响分数可比性。

## 如何转化为实验协议

保存全部独立 runs，区分 training、assessment 和 test；公开环境、wrapper、网络、reward、optimizer、batch、调参预算和区间方法。统计显著性与实际效应大小一起看，样本数量由可检测差异和方差决定。

关联阅读：[统计与调参](/knowledge/statistics-tuning/)、[可复现协议](/knowledge/evaluation-protocol/)、[单智能体基准](/knowledge/single-agent-benchmarks/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1709.06560)
- [参考 2](https://github.com/Breakend/DeepReinforcementLearningThatMatters)
