---
{
  "title": "TD7 Policy Checkpoints：训练与评估分离",
  "description": "区分候选策略、已部署策略、assessment 与独立 evaluation。",
  "date": "2026-10-09 20:20:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "permalink": "knowledge/td7-checkpoints/",
  "translation_path": "en/knowledge/td7-checkpoints/",
  "notebook": {
    "slug": "td7-checkpoints",
    "group": "systems",
    "sources": [
      "N021"
    ]
  }
}
---

## Policy checkpoint 是训练机制

在 TD7 中，checkpoint 不只是用于恢复训练的参数文件，还包含通过训练内 assessment 选择的策略副本。当前训练策略、采集数据的策略和最终报告的策略可能不同，需要在实验记录中分别标明。

来源笔记讨论以若干 assessment episode 的最小回报衡量候选策略。设 $C_c$ 是已保存策略的评分，候选策略前 $k$ 次回报的最小值为 $m_k$。继续增加 episode 时，最小值不会增大：

$$
\min(R_1,\ldots,R_k,R_{k+1})\leq m_k.
$$

如果候选已低于接受门槛，就可提前停止该 assessment；如果要接受候选，还需要满足完整评估长度及实际实现中的 tie 规则。不能把“前几次看起来好”直接当成正式更新条件。

## 最小回报的解释

Minimum 偏好在当前样本中较一致的行为，但它依赖 episode 数量、随机性和极端值。它不是 CVaR 的自动一致估计，也不是未来最坏情况保证。随着样本数改变，min 的分布也会改变，因此 assessment 日程是算法的一部分。

## 训练、选择与测试分开

| 记录 | 用途 |
|---|---|
| 当前 actor / critic / encoder | 持续优化与训练恢复 |
| 策略及所需 embedding 的 checkpoint | 对应的行动生成 |
| Assessment 数据 | 决定是否更新已选策略 |
| 独立 evaluation 数据 | 报告泛化、回报与不确定性 |

保存 actor 时要同步保存它依赖的表示、归一化与配置。只替换 actor 权重而使用不匹配的 encoder，会改变策略含义。Checkpoint selection 用到的 episode 属于选择预算，不应在最终统计中被当作独立测试样本。

## 可复现实现建议

记录接受条件、最大 assessment episode 数、early termination、探索噪声和候选冻结时刻。报告 current policy 与 checkpoint policy 的评估曲线，避免把选择收益错误归因于表示学习。关联阅读：[TD7/SALE](/reading/p35/)、[统计与调参](/knowledge/statistics-tuning/)、[评估协议](/knowledge/evaluation-protocol/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/2306.02451)
