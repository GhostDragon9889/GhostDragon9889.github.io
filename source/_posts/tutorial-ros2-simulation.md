---
{
  "title": "ROS 2 与仿真：时钟、TF、QoS 和过期动作",
  "description": "以 Jazzy 官方文档补充消息兼容、时间戳与 reset 后的控制安全边界。",
  "layout": "post",
  "date": "2026-10-09 21:08:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/ros2-simulation/",
  "tutorial": {
    "id": "T09",
    "group": "navigation",
    "references": [
      "ros-qos",
      "ros-tf",
      "lab-articulation"
    ]
  },
  "permalink": "tutorials/ros2-simulation/"
}
---

## 统一时间与坐标

需要仿真时钟的节点使用一致的 `use_sim_time` 配置，并确认 `/clock` 实际发布。墙钟记录用于性能，仿真钟用于状态时间；暂停和 reset 后的时间回退需要清理缓存及旧控制请求。

`map`、`odom`、`base_link` 和传感器 frame 有不同职责。每条 TF 边只有明确的发布者，避免重复变换。外参、深度单位和图像方向都写入接口契约；路径点、底盘速度与轮速不能直接互换。

## 官方文档补充：QoS 是匹配条件

ROS 2 Jazzy 的 QoS 文档采用 request/offered 兼容模型。best-effort publisher 与要求 reliable 的 subscriber 不兼容；reliable publisher 可以匹配 best-effort subscriber。sensor-data profile 优先及时获得较新的读数，不保证所有旧读数补齐。history/depth、durability、deadline 和 lifespan 也需检查。

```bash
ros2 topic info /clock --verbose
ros2 topic info /cmd_vel --verbose
ros2 run tf2_ros tf2_echo odom base_link
```

这些命令用于已安装对应 ROS 2 的环境。示例 topic 名是通用约定，具体系统需按真实名称替换；教程未运行目标桥接扩展。

## 动作设置有效期

带时间戳的策略请求同时包含 episode 身份与控制步。收到动作时确认它对应当前 episode，且观测年龄不超过协议允许范围。超时、暂停、断连和 reset 使用明确的保持、停止或重新规划规则；不能无限消费旧动作。

`Twist` 本身没有 header，要由外层契约规定时间戳与 watchdog，或在支持时使用带时间戳的消息。底盘坐标系、米/秒与弧度/秒、限幅和侧移能力分别记录。

## 接口验收

先只发布时钟，再检查 TF 和里程计，随后加入一类传感器，最后接入低速命令。用暂停、重复 reset、缺帧和 QoS 不匹配验证回退行为。多进程性能统计同时记录观测采样、发送、推理、接收和生效时间；video FPS 不能代替任何一个控制频率。
