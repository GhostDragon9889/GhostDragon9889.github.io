---
{
  "title": "仿真时序、NavMesh 更新与性能剖析",
  "description": "区分物理、控制、传感器和渲染周期，定位启动与稳态开销。",
  "layout": "post",
  "date": "2026-10-09 21:05:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/sim-timing/",
  "tutorial": {
    "id": "T06",
    "group": "simulation",
    "references": [
      "lab-articulation",
      "lab-articulation-code",
      "lab-scene",
      "usd-glossary"
    ]
  },
  "permalink": "tutorials/sim-timing/"
}
---

## 四个周期分别记录

物理步长 `dt_p`，控制每 `k` 步更新，控制间隔为 `k·dt_p`；传感器和渲染可以采用其他周期。帧率不是物理频率，实时因子为观测窗口中的仿真时间增量除以墙钟时间增量。改变频率时记录实际完成的物理步数，不能只填写目标设置。

## 官方代码补充：命令和状态缓存的顺序

固定提交的 Isaac Lab articulation 示例给出：设置目标 → `write_data_to_sim()` → `sim.step()` → `robot.update(dt)`。reset 同时恢复根部位姿、根速度和关节状态，并清理内部缓存。下列是组织顺序的伪代码，不是跨版本通用启动脚本。

```text
if reset_required:
    restore root pose, root velocity, joint state
    reset controller history and asset caches
set control targets
write commands to simulator
step physics
refresh asset state buffers
sample observations on their scheduled ticks
```

每个物理实例只有一个状态所有者；不要让运动学位姿写入和动力学控制同时争用机器人。日志明确命令生效前后与观测采样时刻。

## NavMesh 与物理碰撞分工

NavMesh 描述可行走区域，碰撞体参与接触，视觉网格负责外观。大量细分轮部视觉件通常不需要逐件进入高层导航障碍表示。应测量状态通知、动态障碍维护与烘焙三个环节，不能从卡顿现象推定每帧完整重新烘焙。

将视觉挂到新父节点时，需保持世界变换和固定装配关系。检查仿真后端状态缓存是否最新，避免静态 USD 值与运行时物理位姿不一致。表示简化后复查 reset、碰撞绑定与导航交互。

## 性能实验矩阵

先区分下载、shader 处理、碰撞数据准备和稳定运行；分别计时。固定同一场景，逐层加入输入读取、控制转换、关节命令、传感器、行人与状态同步，记录 CPU/GPU、物理与渲染耗时。一次只改变一个因素。

包围盒突然变大时寻找第一个非有限状态、穿透或约束异常；单线程高占用则进一步定位调用栈。回调参数错误、缺失 shader 和同步资源调用分别进入 [版本与排错流程](../reproducible-debugging/)，不能统一归因于物理求解器。未运行目标仿真时，只能给出定位路线。
