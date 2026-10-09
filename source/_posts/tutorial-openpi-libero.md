---
{
  "title": "OpenPI × LIBERO：服务、观测和动作契约",
  "description": "根据固定上游代码补充字段、图像方向、动作队列与单请求验证。",
  "layout": "post",
  "date": "2026-10-09 21:13:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/openpi-libero/",
  "tutorial": {
    "id": "T14",
    "group": "vla",
    "references": [
      "openpi-remote",
      "openpi-libero",
      "openpi-client",
      "libero"
    ]
  },
  "permalink": "tutorials/openpi-libero/"
}
---

## 服务端和仿真端分环境

OpenPI 官方推荐远程推理将策略依赖与机器人/仿真依赖分开；LIBERO 示例包含 Docker 与独立环境流程。使用本页引用的固定提交核对入口和依赖，而不是混装所有项目的最新版本。

官方服务入口示例：

```bash
uv run scripts/serve_policy.py --env LIBERO
```

需先按同提交文档安装环境并获得相应模型资源。这里不复制私人主机地址、凭据或开放显示服务器的配置；命令未在本次目标 GPU 环境运行。

## 官方代码补充：LIBERO 预处理不能只看 shape

已读取的 `examples/libero/main.py` 使用 `agentview_image` 与腕部图像，通过 `[::-1, ::-1]` 调整图像方向，转为连续数组，再 resize/pad 和转 uint8。这个行为属于该示例，其他仿真来源不能机械套用。状态由末端位置、quaternion 转换后的 axis-angle 和夹爪关节构成。

| 策略字段 | 本示例语义 | 验收 |
|---|---|---|
| observation/image | 主视角图像 | 朝向、RGB、尺寸、uint8 |
| observation/wrist_image | 腕部图像 | 相机身份与时间对齐 |
| observation/state | 指定构造的本体状态 | 顺序、单位、旋转表示 |
| prompt | 当前任务语言 | 任务身份与更新边界 |
| actions | 动作块 | horizon、维度、归一化及夹爪 |

## 动作队列与请求

```python
from openpi_client import websocket_client_policy

client = websocket_client_policy.WebsocketClientPolicy(
    host="localhost", port=8000
)
# observation must follow the selected policy's preprocessing contract.
actions = client.infer(observation)["actions"]
if actions.ndim != 2:
    raise ValueError("expected [horizon, action_dim]")
```

`observation` 由上表和所选配置构造，此片段不是独立可运行完整实验。检查返回的实际 horizon 和 dim；不要固定为某次历史诊断的形状。当前 LIBERO 示例将动作放入队列，按 `replan_steps` 消费前缀，再推理；reset 清空队列和历史。

## 分层验证

先验证模型加载，再验证单请求字段和有限输出，然后用固定 initial state 检查动作单位与停止语义，最后运行完整套件。记录预热、推理、传输、动作执行和 episode 墙钟时间。一次连通、单任务成功或服务端测速不能变成全套 LIBERO 分数。比较外层 Agent 与直接策略时转到 [配对评测](../paired-evaluation/)。
