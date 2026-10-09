---
{
  "title": "仿真器、World Model 与规划",
  "description": "说明实验环境、学习动力学模型及内部 rollout 的不同职责。",
  "date": "2026-10-09 20:18:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "research",
  "permalink": "knowledge/simulation-world-models/",
  "translation_path": "en/knowledge/simulation-world-models/",
  "notebook": {
    "slug": "simulation-world-models",
    "group": "systems",
    "sources": [
      "N040"
    ]
  }
}
---

## 按职责区分两个对象

仿真器执行一个可交互环境：输入动作，输出下一状态、观测和奖励。World model 表示或预测动力学、奖励和观测，可用于规划或 imagination。常见情况下前者在实验环境侧，后者由 agent 学习，但“外部/内部”和“手工/学习”不是绝对定义边界。

$$
(s',o',r)\sim P(\cdot\mid s,a),\qquad
(\hat s',\hat o',\hat r)\sim\hat P_\theta(\cdot\mid s,a).
$$

学习模型可以充当仿真 rollout 的执行部件；精确规则模型也可以供 agent 搜索使用。因此应描述实际接口，而不是依据模块部署位置给它分类。

## 数据、规划与误差

环境交互产生经验，模型拟合压缩经验，内部 rollout 比较候选行动。多步模型误差会累积，策略还可能选择训练数据未覆盖的动作。低 one-step prediction loss 不保证 long-horizon planning 或真实任务成功。

| 系统层 | 需要检查 |
|---|---|
| 环境 | 动力学、接触、reset 和传感器语义 |
| Learned dynamics | 覆盖、预测不确定性、多步误差 |
| Planner | 候选行动、预算、约束和模型利用偏差 |
| Execution | 实时反馈、延迟、实际动作单位 |

## 与三维生成世界的关系

可探索视觉世界还需要区分可渲染外观、尺度、碰撞几何、对象状态及可控制动力学。生成视频可作为环境组成部分，却不自动提供机器人所需的物理接口。把模型导出到另一个文件格式不会补齐这些信息。

## 实验建议

固定控制器，在相同场景上分别改变视觉外观和物理几何；记录 collision、距离、任务成功和策略排名是否变化。再比较真实环境轨迹与模型预测，区分视觉一致性和控制可靠性。

关联阅读：[Era of Experience](/reading/p33/)、[Lyra](/reading/p30/)、[SAGE-3D](/reading/p29/)、[跨论文路线](/knowledge/paperread-roadmap/)。
