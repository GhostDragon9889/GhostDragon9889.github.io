---
{
  "title": "离线 RL 与价值外推误差",
  "description": "解释数据支持域之外的价值估计、max backup 与误差传播。",
  "date": "2026-10-09 20:08:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/extrapolation/",
  "translation_path": "en/knowledge/extrapolation/",
  "notebook": {
    "slug": "extrapolation",
    "group": "policy",
    "sources": [
      "N042"
    ]
  }
}
---

## 数据支持域之外发生了什么

离线 RL 用固定数据集 $D$ 拟合 critic，策略优化或 max backup 却可能查询数据中很少出现的 $(s,a)$。函数逼近器仍会输出一个数，但该数缺少监督支持。外推误差指这一分布外查询产生的不可靠估计，区别于支持域内的一般拟合误差。

$$
y=r+\gamma\max_{a'}Q_\theta(s',a')
$$

如果某个未覆盖动作被高估，max 会优先选择它；bootstrap 再把这个高估传播回数据内状态。持续改进策略还可能把实际状态分布推离训练分布。错误来自覆盖、估计和选择机制的组合，不是所有数值偏差都能归为外推。

## 与 Bellman 收缩的关系

理想的 Bellman 算子收缩不意味着“有限数据上的任意神经网络训练”也收缩。投影、数据权重、优化误差与动作分布限制都会改变实际迭代。双 critic 的 min 可以减少某些高估，却不能保证完全覆盖或解决所有离线 OOD 查询。

## 三类应对

| 路径 | 核心作用 | 要检查的代价 |
|---|---|---|
| 行为约束 / BC 正则 | 限制策略偏离数据动作 | 可能限制超过示范的改进 |
| 保守价值估计 | 降低缺少支持动作的吸引力 | 保守强度与欠估计 |
| 数据内价值学习 | 尽量减少训练阶段的 OOD 动作查询 | 策略提取仍有分布与近似问题 |

不确定性估计、模型 rollout 和表示学习也可参与设计，但需要检验校准和模型误差，不能仅凭 embedding 距离宣称可靠覆盖。

## 评价协议

锁定数据集版本、行为质量、终止语义、归一化分数定义和调参预算。记录训练是否增加环境交互；一旦用新数据持续更新，就与固定 offline 协议不同。比较 offline return、数据内 critic error 和 OOD action value 三者，有助于定位失败。

关联阅读：[采样与 replay](/knowledge/sampling-replay/)、[Bellman 误差](/knowledge/mdp-bellman/)、[TD7/SALE](/reading/p35/)、[单智能体基准](/knowledge/single-agent-benchmarks/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1812.02900)
