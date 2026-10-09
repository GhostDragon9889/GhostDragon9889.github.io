---
{
  "title": "视频到仿真场景：几何、尺度、碰撞与导航",
  "description": "补充 COLMAP 与 OpenUSD 流程，区分视觉重建和可物理仿真的交付物。",
  "layout": "post",
  "date": "2026-10-09 21:10:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/video-scene/",
  "tutorial": {
    "id": "T11",
    "group": "navigation",
    "references": [
      "colmap",
      "usd-glossary"
    ]
  },
  "permalink": "tutorials/video-scene/"
}
---

## 输出分成四份

视觉表示、度量几何、物理/语义资产和任务配置分别验收。3DGS 可以表现外观，碰撞代理用于物理交互，USD 描述对象与引用，episode 清单定义起终点和事件。PLY 或 USD 能打开不代表尺度正确、可接触或可通行。

## 官方教程补充：先重建，再转换

COLMAP 官方教程将 SfM 的特征匹配、几何验证和稀疏重建，与 MVS 的稠密重建分开，并强调拍摄重叠。用不同视角、稳定曝光和足够纹理覆盖关键通行区域，避免只绕同一位置旋转；对运动模糊、反光和动态人物另行检查。

```text
calibrated / sufficiently overlapping frames
    -> feature matching and geometric verification
    -> camera poses and sparse geometry
    -> dense geometry or visual reconstruction
    -> scale and coordinate alignment
    -> cleaned collision proxies and USD composition
    -> navigation map, semantic regions, episode manifest
```

这是目标流水线，各阶段工具能力与格式支持需要按版本验证。单目几何通常需要尺度基准；对生成式补全区域明确标注，不能当成未拍摄房间的测量事实。

## 多段视频合并

需要重叠区域、共同控制点或可信定位。尺度不一致时使用 `xB = s·R·xA + t` 的相似变换，不能只估计旋转平移。合并后检查重复墙、错层地面、门口变窄和尺度漂移。没有足够约束时应保留独立子地图与不确定性。

## 物理与导航验收

分离可见网格和简化碰撞体，校验变换一致性。静态地面、墙和家具与动态物体使用不同后端规则；NavMesh 不替代物理碰撞。测量门宽、走廊净宽、地板水平和障碍边界，用真实机器人尺寸检查通行。

视频中的移动人物一般从静态背景重建中剥离，再用 [可控人群](../crowd-motion/) 加入。公开示例素材还应取得适当授权，移除人脸、车牌、定位元数据与私人场所线索。ViPE、Depth Anything、Lyra、SAGE-3D 等保留为可选路线，不声称本次已打通其全部格式接口或物理导入。
