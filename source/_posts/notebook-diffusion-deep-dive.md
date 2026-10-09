---
{
  "title": "Diffusion Policy：分布建模与控制时序",
  "description": "作为已有 P08 的深化笔记，梳理去噪时间、动作块与执行闭环。",
  "date": "2026-10-09 20:07:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/diffusion-deep-dive/",
  "translation_path": "en/knowledge/diffusion-deep-dive/",
  "notebook": {
    "slug": "diffusion-deep-dive",
    "group": "policy",
    "sources": [
      "N022"
    ]
  }
}
---

## 与已有 P08 的关系

本专题合并新上传的 Diffusion Policy 概念推导，作为[已有论文笔记 P08](/reading/p08/)的深化入口，不把同一论文重复计入文献数量。重点是动作分布、去噪训练与机器人控制时序。

## 条件去噪学习

令 $A_0$ 是示范动作块，$o$ 是视觉和本体状态条件。典型 DDPM 参数化为

$$
A_k=\sqrt{\bar\alpha_k}A_0+\sqrt{1-\bar\alpha_k}\epsilon,\qquad
\mathcal L=\mathbb E\|\epsilon-\epsilon_\theta(A_k,k,o)\|^2.
$$

训练学习条件去噪器；推断从噪声出发逐步生成动作。不同 noise schedule、预测参数化及 sampler 会改变生成过程，不能把一种简化递推当作所有 Diffusion Policy 实现。噪声索引 $k$ 是内部生成时间，不是机器人实际运动时间。

## 多模态性与时间一致性

扩散模型可表达复杂条件分布，但多模态覆盖仍依赖示范数据、条件表征和训练质量。联合生成动作块可以学习时间相关性；“生成序列看起来平滑”不保证闭环稳定或满足动力学、接触和关节约束。

常见系统使用 receding-horizon：观察历史输入后预测未来 $H$ 步，仅执行前 $K$ 步再重新规划。增大 $K$ 减少推断调用，却延长没有新视觉反馈的区间。增加去噪步数则影响内部生成质量和计算成本，是另一种权衡。

## 实验变量与接口

需要分别记录观察长度、动作预测长度、执行长度、去噪步数、相机时间戳、推断延迟与动作单位。训练用绝对动作还是增量动作、归一化方式、执行器限幅和底层控制频率也会影响复现。

对动态目标，比较同步刷新与异步刷新时，应保持模型和执行预算一致，并报告 stale observation age。原始长笔记的完整推导作为来源文件保留；整理正文不增加未经核验的成功率或硬件性能数字。

关联阅读：[行为克隆与 bins](/knowledge/behavior-actions/)、[π₀](/reading/p09/)、[RTC](/reading/p16/)、[DynamicVLA](/reading/p19/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/html/2303.04137v5)
- [参考 2](https://arxiv.org/abs/1709.07871)
- [参考 3](https://arxiv.org/abs/2006.10739)
- [参考 4](https://arxiv.org/abs/2004.08249)
- [参考 5](https://arxiv.org/abs/1509.06113)
- [参考 6](https://arxiv.org/abs/1803.08494)
