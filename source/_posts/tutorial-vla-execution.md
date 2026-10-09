---
{
  "title": "VLA 执行：动作分块、时延与闭环反馈",
  "description": "分离动作表示、生成、消费和调度，量化观测年龄与异步切换。",
  "layout": "post",
  "date": "2026-10-09 21:12:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/vla-execution/",
  "tutorial": {
    "id": "T13",
    "group": "vla",
    "references": [
      "openvla",
      "openpi-remote",
      "openpi-readme"
    ]
  },
  "permalink": "tutorials/vla-execution/"
}
---

## 模型层和系统层

Vision-Language-Action 策略从图像、指令及该模型支持的状态产生动作；离散 action token、连续向量、扩散或 flow 动作轨迹有不同训练与解码方式。OpenVLA 官方 README 提供动作解码与归一化接口；OpenPI 文档提供策略服务和客户端。输出维度、token 数与机器人关节数分别记录。

这里的 VLA 是视觉语言动作模型；C/C++ 的 Variable Length Array 属于编程语言概念，两者不可混用。

## 三个时间尺度

预测 `H` 个动作，每次实际执行 `K≤H` 个，底层周期 `dt`。观测到推理结果可用的延迟为 `tau`，第 `j` 个动作开始时观测年龄近似 `tau+j·dt`，另加队列等待。大 `K` 减少调用但延长开环，小 `K` 增加反馈却提高通信与算力需求。

| 改进方向 | 必须测量 |
|---|---|
| 减少扩散/flow 步数 | 同硬件下时延与动作质量 |
| token/网络剪枝 | 判据成本、失败与分布变化 |
| 动态动作消费 | H、K、停止条件与干预时延 |
| 异步推理 | 观测身份、结果到达、切换时刻 |
| 前缀约束/inpainting | 已执行动作不可修改与接续连续性 |

## 官方服务文档补充：动作块不是控制周期

OpenPI 远程推理返回 `(action_horizon, action_dim)` 的动作块，客户端决定何时调用与怎样执行。服务推理时间不包含全部感知、网络、控制和仿真；预测长度也不规定必须一次消费整块。动作字段和归一化语义由指定策略配置决定。

异步结果携带请求编号、episode 与观测时间。reset、任务切换及过期结果需要取消或丢弃；切换新动作块时核对位置/速度连续性与控制器状态。通用调度伪代码不等于具体论文算法实现。

## 实验路线

先验证固定 `H/K` 的同步执行，再只改变一个时序因素；统计端到端延迟分位数、观测年龄、队列长度、成功与失败。剪枝的动作差应先统一单位和尺度，不能把角度、平移、夹爪直接取未加权欧氏距离。RL 适配需写明更新完整模型、动作头、adapter、隐变量或独立策略中的哪一项。

已有 [实时执行论文](../../reading/?category=reading%3Areal-time) 可供横向比较；OpenPI 接入见 [接口教程](../openpi-libero/)。本文没有新的 VLA 性能或机器人实验结果。
