---
{
  "title": "Direct / Agent 配对评测与进展核验",
  "description": "固定 episode 身份与预算，区分任务成功、工具完成和机制消融。",
  "layout": "post",
  "date": "2026-10-09 21:14:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "evaluation",
  "translation_path": "en/tutorials/paired-evaluation/",
  "tutorial": {
    "id": "T15",
    "group": "vla",
    "references": [
      "libero",
      "openpi-client",
      "openpi-libero"
    ]
  },
  "permalink": "tutorials/paired-evaluation/"
}
---

## 比较的对象是调度器还是策略

外层 Agent 可以改变子目标、重试、调用时机和终止。比较 Direct 与 Agent 时固定 VLA checkpoint、观测权限、预处理、动作空间和任务清单。若 Agent 获得更多交互预算，应单独报告同预算性能和追加成本下的性能。

## 建立配对 manifest

跨方法共享键由 suite、task、initial-state、simulator seed 和 manifest 序号构成，方法特有 run ID 另存。只用 task 作键可能覆盖同任务不同初态，不能形成可靠配对。

```json
{
  "pair_id": "episode-0001",
  "suite": "example-suite",
  "task_index": 0,
  "initial_state_index": 0,
  "simulator_seed": 7,
  "budget": {"environment_steps": 300},
  "methods": ["direct", "agent"]
}
```

这是公开的合成 schema 示例，不是个人实验数据。保留全部失败与无效 episode，说明排除规则和真正的总分母。成功率、环境步数、VLA 调用、Agent turn、token 与墙钟时间分别统计。

## 官方代码补充与成功判定

LIBERO 上游和 OpenPI 示例提供 task suite 与 initial states 的访问结构，可用它们构建稳定任务身份。具体终止判据仍需核对固定环境版本；外层工具返回 `finish` 不自动代表仿真任务成功。

进展核验器应有可检查输入与证据来源。用人工或环境标注样例分别估计误报、漏报、触发时机和额外成本；禁止评估真值未经授权进入策略。缓存历史图像时保存对应任务和时间，避免 reset 后引用旧场景。

## 从诊断到机制结论

先做服务连通和单任务诊断，再执行完整配对清单。一次小样本成功差异不足以证明全套基准改进。分别消融核验器、历史上下文、重试和预算；区分“有设计”“已实现”“已运行”和“统计支持”。给出配对差异与不确定性，训练多个种子时按训练 seed 做相应统计，而非把全部 episode 当成独立模型。

本页没有公开个人诊断成绩、时间线或私人工具配置，提供的是可复用协议。实验方法延伸见 [统计与调参](../../knowledge/statistics-tuning/) 和 [复现协议](../../knowledge/evaluation-protocol/)。
