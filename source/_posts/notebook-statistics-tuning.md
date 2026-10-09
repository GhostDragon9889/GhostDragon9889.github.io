---
{
  "title": "RL 实验统计、置信区间与调参预算",
  "description": "分清随机种子与 episode，整理功效分析、bootstrap、IQM 和调参泄漏。",
  "date": "2026-10-09 20:21:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "evaluation",
  "permalink": "knowledge/statistics-tuning/",
  "translation_path": "en/knowledge/statistics-tuning/",
  "notebook": {
    "slug": "statistics-tuning",
    "group": "evaluation",
    "sources": [
      "N041",
      "N050"
    ]
  }
}
---

## 先确定统计单位

一个训练 seed 得到一个训练过程；对同一个训练模型评估多个 episode，主要减少该模型的评估噪声，不能替代更多独立训练。多个 transition、checkpoint 或同一轨迹片段也不是独立算法 runs。实验的随机单位决定误差条与 bootstrap 应在哪一层计算。

对独立 seed 级统计 $Y_1,\ldots,Y_n$，

$$
\bar Y=\frac1n\sum_iY_i,\qquad
s^2=\frac1{n-1}\sum_i(Y_i-\bar Y)^2,\qquad
\widehat{SE}(\bar Y)=\frac{s}{\sqrt n}.
$$

标准差描述结果分散，标准误描述均值估计精度；二者不能在图注中互换。置信区间需要说明方法、统计量及抽样单位。

## 功效、效应量与多重比较

显著性水平 $\alpha$ 控制第一类错误，功效 $1-\beta$ 取决于效应量、样本量、方差、检验和设计。不存在不依赖任务的“5 个 seeds 就足够”规则。预实验可以估计量级，再按有实际意义的差异确定预算；结果应同时报告效应大小和不确定性，而不是只给 p-value。

若同时比较许多环境、方法和 checkpoint，要解释多重比较和选择规则。未拒绝零假设并不证明两个方法等价；等价性或非劣效问题需要自己的界限和设计。

## 跨任务聚合

原始回报尺度差异很大，应固定参考分数再归一化。IQM 保留中间 50% 的分数并求平均，降低尾部极端值影响，但不是取消不确定性的办法。Stratified bootstrap 可在任务和 seed 的相应层次重采样；若声明对新任务泛化，应另外明确任务本身是否也是抽样对象。

Performance profile、达到阈值所需预算、probability of improvement 与逐任务结果提供互补信息。学习曲线 AUC 必须使用相同横轴区间和积分约定。

## 调参也是实验预算

Grid search 对预先列出的组合逐项评估。记录空间、配置数量、每配置 seed 数、选择数据与总计算预算；连续参数不应以不合理的线性刻度覆盖多个数量级。测试集不能反复用于选模型。原笔记中的经验测度理论已关联到[概率专题](/knowledge/probability-measures/)。

关联阅读：[可复现协议](/knowledge/evaluation-protocol/)、[Deep RL That Matters](/reading/p32/)。


## 原笔记中的选读链接

- [参考 1](https://online.stat.psu.edu/stat200/book/export/html/79)
- [参考 2](https://dept.stat.lsa.umich.edu/~kshedden/introds/topics/standard_errors/)
- [参考 3](https://web.stanford.edu/class/msande226/2025/lectures/lecture9_inference.pdf)
- [参考 4](https://pressbooks.lib.vt.edu/introstatistics/chapter/the-central-limit-theorem-for-sample-means-averages/)
- [参考 5](https://en.wikipedia.org/wiki/Standard_error)
- [参考 6](https://stats.oarc.ucla.edu/other/mult-pkg/seminars/intro-power/presentation-notes/)
