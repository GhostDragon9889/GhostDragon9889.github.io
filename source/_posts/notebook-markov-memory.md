---
{
  "title": "马尔可夫性、部分观测与 RNN 记忆",
  "description": "区分物理状态、观测、历史和 belief，避免将 RNN 隐状态当作充分统计量。",
  "date": "2026-10-09 20:16:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/markov-memory/",
  "translation_path": "en/knowledge/markov-memory/",
  "notebook": {
    "slug": "markov-memory",
    "group": "foundations",
    "sources": [
      "N052"
    ]
  }
}
---

## 状态与观测要分开

马尔可夫性指未来在给定当前充分状态和动作后，不再依赖更早历史。物理系统可能是 Markov 的，但 agent 只看到不完整观测 $o_t$，例如单张图像未包含速度。这会形成 POMDP，而不是因为使用 RNN 才改变了环境动力学。

## 历史、belief 与隐状态

完整历史 $H_t=(o_0,a_0,\ldots,o_t)$ 可以用于决策。理想 belief $b_t(s)=P(s_t=s\mid H_t)$ 在已知模型等条件下提供充分统计量，并能递归更新。RNN 通过 $h_t=f(h_{t-1},o_t,a_{t-1},r_{t-1})$ 压缩历史；它是可学习近似，不自动等于 belief 或充分 Markov 状态。

扩展系统 $(s_t,h_t)$ 可以在相应定义下递归演化，但 agent 可见的 $h_t$ 是否足够预测未来，仍是需要验证的表示性质。“有记忆”与“恢复全部可观测性”不是同一保证。

## Reset 语义

Episode reset、task reset 和 trial reset 可能不同。普通独立任务通常重置策略记忆；RL² 一类方法需要在同一 task 的多个 episode 之间保留适应信息，并在任务切换时清空。并行环境应分别管理 memory，避免样本之间串入其他任务的信息。

## 评价方法

比较无记忆、堆叠观测和 recurrent policy，控制参数量、训练预算与输入信息。用遮挡、速度不可见、延迟和任务切换设计测试；报告恢复速度和 reset 规则。测试 episode 中的记忆适应不应混同于梯度微调。

关联阅读：[Meta-RL](/knowledge/meta-rl/)、[RL²](/reading/p05/)、[概率与占据分布](/knowledge/probability-measures/)。
