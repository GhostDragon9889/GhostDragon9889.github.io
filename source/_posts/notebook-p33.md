---
{
  "title": "Era of Experience：经验驱动学习观点",
  "description": "区分经验驱动学习范式与 world model 这一模型机制。",
  "date": "2026-10-09 20:27:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reading",
  "permalink": "reading/p33/",
  "translation_path": "en/reading/p33/",
  "notebook": {
    "slug": "p33",
    "group": "classics",
    "sources": [
      "N010"
    ]
  },
  "paper": {
    "id": "P33",
    "title": "Era of Experience: Notes on Experience-Driven Learning",
    "year": "未确定",
    "version": "Perspective note; exact primary source not identified",
    "url": null,
    "kind": "perspective",
    "topic_id": "foundations",
    "source_kind": "notebook",
    "supplement": false
  }
}
---

## 来源身份与观点边界

这是一份关于“经验时代”的观点整理，讨论 David Silver、Richard Sutton 所代表的经验驱动学习方向，并引用播客、后续观点及 world model 讨论。上传文件没有提供可唯一定位的原始文献 URL，因此此条按观点笔记发布，不补造作者表、DOI、版本或正式引文。

## 数据来源的变化

静态人类数据提供模仿与知识初始化；环境交互提供行为后果、任务反馈和可用于继续学习的轨迹。经验驱动范式强调 agent 通过行动、观察和反馈改善长期行为。两种数据来源可以共存，并不要求丢弃语言模型或示范。

$$
J(\pi)=\mathbb E_\pi\!\left[\sum_t\gamma^t r_t\right].
$$

回报形式本身不是新算法。关键在任务、交互、反馈、持续学习和数据生产方式的系统设计。

## 四个研究维度

长时间流要求记忆与适应；扎根动作要求可操作环境和有效观测；环境反馈要求可测结果与奖励；规划要求考虑行动的长期后果。稀疏、多目标或延迟 reward 仍然保留 credit assignment 和探索难题，不会因为“经验”一词自动解决。

## 与 world model 的关系

World model 是预测和规划的一类机制，经验驱动学习是更广的学习范式。Model-free、精确规则搜索和 learned-model planning 都可以使用交互数据；生成视觉内容也不自动等于可用于物理控制的模型。

## 可以怎样开展研究

比较静态示范训练、交互改进和模型规划时，应分别统计数据量、环境成本、验证反馈和长期评价。对工具 agent 与机器人任务，先确定 reward 是否代表真实任务成功，再检查长期失败和分布变化。

这些是从原笔记提炼的研究问题；没有据此宣称行业共识、超人能力或已完成的实验。关联阅读：[仿真与 world model](/knowledge/simulation-world-models/)、[研究问题设计](/knowledge/embodied-research/)。
