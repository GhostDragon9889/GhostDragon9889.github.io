---
{
  "title": "导航基线与框架迁移：论文、代码和资源审计",
  "description": "为 NavDP、FLUX、NavIsaacLab 和 ProtoMotions 建立固定版本的接口审计表。",
  "layout": "post",
  "date": "2026-10-09 21:11:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "reproduction",
  "translation_path": "en/tutorials/navigation-baselines/",
  "tutorial": {
    "id": "T12",
    "group": "navigation",
    "references": [
      "proto",
      "git-submodule",
      "lab-install"
    ]
  },
  "permalink": "tutorials/navigation-baselines/"
}
---

## 四个证据层

论文方法、固定提交的实际执行链、资源可用性和目标环境运行分别记录。README 的能力列表不等于默认配置已复现论文；工具单元测试不等于传感器、GPU 仿真或训练通过。对同名项目先确认全称，例如导航 FLUX 与图像生成 FLUX 属于不同项目。

## 逐项审计表

| 对象 | 要追踪的证据 |
|---|---|
| NavDP 类轨迹策略 | 观测、预测轨迹、评分器、控制器与特权训练监督 |
| FLUX 类导航基线 | 模型版本、动态场景资产、episode 与行人配置 |
| NavIsaacLab 类集成 | 默认行人后端、动作执行、reset、传感器真实使用 |
| ProtoMotions | 身体资产、关节顺序、运动库、checkpoint 与配置类 |

局部 RGB-D 策略不因训练数据来自全局地图而自动拥有部署地图。根位姿积分驱动的底盘也不能用轮摩擦解释实际执行。实体槽位数、完整环境数和人群实例数需分别报告。

## 官方仓库补充：不要直接覆盖整个依赖目录

已读取的 ProtoMotions 固定提交体现了配置、重定向和多后端的组织。迁移时分别检查导入符号、序列化类路径、身体/关节名称、reset 与 rollout 生命周期、评估返回值，以及 Python/框架/仿真依赖。旧目录消失不意味着算法能力消失，新目录同名也不保证旧 checkpoint 兼容。

官方 Git 文档说明子模块检出依赖父仓库登记的路径与 gitlink。先读取 `.gitmodules`、父仓库 tree 和实际子模块状态。上游存在同名仓库，不代表当前仓库注册了相同名称。

## 迁移验收顺序

固定父仓库和依赖 commit，记录资产 hash 与本地补丁；确认一个最小配置可以加载；验证一个角色、一次 reset 和短 rollout；再加入传感器与策略，最后扩展并行规模和训练。比较观测、动作、接触与指标，而不只比较目录差异数量。

NavDP、FLUX 和 NavIsaacLab 的具体历史报告在上传材料中只提供摘要和目录，本次不公开私人审计文件名或提交关系，也不补写没有直接读取的代码结论。论文入口见 [导航与环境文献](../../reading/?category=reading%3Anavigation-worlds)，通用复现步骤见 [工程排错](../reproducible-debugging/)。
