# PaperRead：论文总索引

**完成日期：2026-10-09。本次核对项目可见资料，共导出 30 篇独立论文总结。**

## 覆盖范围与去重

项目论文文件夹共有 29 份 PDF；经文件内容 SHA-256 核对，NavDP 与 RL Token 各有一份完全相同的重复附件，因此对应 27 篇独立论文。另补齐项目早期阅读记录中的 RL²、SimBa 与《A Survey on Reinforcement Learning of Vision-Language-Action Models for Robotic Manipulation》，形成此次 30 篇范围。

后面三篇使用论文作者或官方学术入口的公开全文补齐；其中 RL-VLA 综述采用作者官方仓库所提供的同题名 PDF，无法证明它与早期附件逐字节相同。项目中提及的工具、代码库、博客和背景引用用于解释与核查，没有单独算作额外论文。此清单覆盖本次已核对的项目材料，不将未提供、未能核实的其他文献纳入“全部”。

## 导出内容

- **30 个独立 Markdown 文件**：每篇以正式题目命名，文件名空格改为下划线，标点与少量数学符号作兼容处理；正文保留完整题名。
- **PaperRead_跨论文对照与研究路线.md**：整理方法层次、时序、RL 更新范围、环境与人体建模、评测口径及研究设计。
- **PaperRead_论文总结全集.md**：包含全部 30 篇正文，便于全文搜索与连续阅读；每篇参考文献编号在该篇内部独立使用。
- **PaperRead_论文清单.json**：机器可读题录、来源、版本标识、文件映射与校验值。
- **PaperRead_30_Papers_20261009.zip**：打包上述全部文件；不包含原始论文 PDF。

逐篇稿合计 **109,495 个汉字**，另含英文术语、公式、表格、数字和文献链接。各篇篇幅随论文类型与证据量变化，不使用固定模板填充没有报告的实验。

每篇均包括研究问题、核心机制、输入输出、关键公式或表示、训练与推理、实验条件及结果、消融、局限和项目联系。综述类论文重点梳理分类、证据来源与方法对照，不虚构统一重跑实验。原文事实、辅助推导与独立建议分别注明。

## 如何使用

按下面主题表找到论文，或到末尾的题目字母索引按题名查找。先读跨论文对照可建立整体关系，再打开各篇详细总结。数学公式采用常见 Markdown/KaTeX 记法，跨论文对照含一张 Mermaid 系统接口图；纯文本阅读不受影响。

**总览入口**：[跨论文对照与研究路线](PaperRead_跨论文对照与研究路线.md) · [论文总结全集](PaperRead_论文总结全集.md) · [机器可读清单](PaperRead_论文清单.json)

## 按主题阅读


### 综述与理论基础

| 编号 | 论文题目 | 年份 / 所用版本 | 核心贡献 |
|---|---|---|---|
| P01 | [Vision Language Action Models in Robotic Manipulation: A Systematic Review](Vision_Language_Action_Models_in_Robotic_Manipulation-A_Systematic_Review.md) | 2025（所存预印本）；2507.10672v1 | 汇总模型、数据集、仿真平台与泛化评价，并提出数据集描述分数。 |
| P02 | [A Survey on Vision-Language-Action Models: An Action Tokenization Perspective](A_Survey_on_Vision-Language-Action_Models-An_Action_Tokenization_Perspective.md) | 2025；2507.01925v1 | 用八类动作相关中间表示统一分析模型模块、数据来源与执行接口。 |
| P03 | [面向具身操作的视觉-语言-动作模型综述](面向具身操作的视觉-语言-动作模型综述.md) | 2025；2508.15201v2 | 从架构、数据、预训练、后训练与评估五个环节梳理具身操作 VLA。 |
| P04 | [A Survey on Reinforcement Learning of Vision-Language-Action Models for Robotic Manipulation](A_Survey_on_Reinforcement_Learning_of_Vision-Language-Action_Models_for_Robotic_Manipulation.md) | 2025；正式论文 / 官方全文 | 以动作、奖励、转移建模、在线/离线/推理时范式和真实部署构成 RL-VLA 系统分类与研究路线。 |
| P05 | [RL²: Fast Reinforcement Learning via Slow Reinforcement Learning](RL2-Fast_Reinforcement_Learning_via_Slow_Reinforcement_Learning.md) | 2016；1611.02779v2 | 用慢速外层强化学习训练GRU，使其在新任务中仅依靠跨回合隐藏状态更新学习探索与利用。 |
| P06 | [SimBa: Simplicity Bias for Scaling Up Parameters in Deep Reinforcement Learning](SimBa-Simplicity_Bias_for_Scaling_Up_Parameters_in_Deep_Reinforcement_Learning.md) | 2025；2410.09754v2 | 以运行统计归一化、残差前馈块和输出前 LayerNorm 改造网络骨干，使更大的 critic 在多个强化学习算法中提高样本与计算效率。 |

### 动作生成与策略适配

| 编号 | 论文题目 | 年份 / 所用版本 | 核心贡献 |
|---|---|---|---|
| P07 | [Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](Learning_Fine-Grained_Bimanual_Manipulation_with_Low-Cost_Hardware.md) | 2023；2304.13705v1 | 把 ALOHA 遥操作数据、CVAE 动作分块和时间集成结合，学习精细双臂操作。 |
| P08 | [Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](Diffusion_Policy-Visuomotor_Policy_Learning_via_Action_Diffusion.md) | 2023 / 2024 扩展版；2303.04137v5 | 在视觉条件下联合去噪生成连续动作序列，并用滚动执行形成闭环。 |
| P09 | [π₀: A Vision-Language-Action Flow Model for General Robot Control](pi0-A_Vision-Language-Action_Flow_Model_for_General_Robot_Control.md) | 2024（所存 v1）；2410.24164v1 | 用预训练视觉语言主干与流匹配动作专家，学习跨机器人和多任务的连续动作块。 |
| P10 | [MetaVLA: Unified Meta Co-training For Efficient Embodied Adaption](MetaVLA-Unified_Meta_Co-training_For_Efficient_Embodied_Adaption.md) | 2025；2510.05580v3 | 用上下文库和 Meta-Action-Reasoner 支持统一 VLA 多任务协同训练并利用异构辅助示范。 |
| P11 | [π_RL: Online RL Fine-tuning for Flow-based Vision-Language-Action Models](pi_RL-Online_RL_Fine-tuning_for_Flow-based_Vision-Language-Action_Models.md) | 2025；2510.25889v3 | 用 Flow-Noise 与 Flow-SDE 构造可优化的随机生成过程，对流式 VLA 动作专家进行在线 RL 微调。 |
| P12 | [RL Token: Bootstrapping Online RL with Vision-Language-Action Models](RL_Token-Bootstrapping_Online_RL_with_Vision-Language-Action_Models.md) | 2026；2604.23073 | 冻结 VLA 与压缩表征，利用 RL token、参考动作和小型动作块 actor-critic 高效学习关键操作阶段。 |
| P13 | [What Can RL Bring to VLA Generalization? An Empirical Study](What_Can_RL_Bring_to_VLA_Generalization-An_Empirical_Study.md) | 2025；2505.19789v4 | 用视觉、语义和执行三维 OOD 测试说明 PPO 的主要泛化收益在执行恢复，并给出共享价值头训练配方。 |

### 实时执行与动态操作

| 编号 | 论文题目 | 年份 / 所用版本 | 核心贡献 |
|---|---|---|---|
| P14 | [Action-aware Dynamic Pruning for Efficient Vision-Language-Action Manipulation](Action-aware_Dynamic_Pruning_for_Efficient_Vision-Language-Action_Manipulation.md) | 2026；2509.22093 | 按近期机器人动作幅度决定是否剪枝，并利用文本—视觉相关性保留输入token。 |
| P15 | [Realtime-VLA FLASH: Speculative Inference Framework for Diffusion-based VLAs](Realtime-VLA_FLASH-Speculative_Inference_Framework_for_Diffusion-based_VLAs.md) | 2026；2605.13778v1 | 轻量草稿利用新图像生成动作，由复用旧视觉KV的动作专家并行验证连续前缀。 |
| P16 | [Real-Time Execution of Action Chunking Flow Policies](Real-Time_Execution_of_Action_Chunking_Flow_Policies.md) | 2025；2506.07339v2 | 用旧动作前缀和软掩码引导流式动作补全，在并行推理与执行时保持动作块连续。 |
| P17 | [Running VLAs at Real-time Speed](Running_VLAs_at_Real-time_Speed.md) | 2025；2510.26742v1 | 以CUDA Graph、代数折叠和Triton融合缩短π0前向，并提出视觉/动作专家重叠的流式设计。 |
| P18 | [VLASH: Real-Time VLAs via Future-State-Aware Asynchronous Inference](VLASH-Real-Time_VLAs_via_Future-State-Aware_Asynchronous_Inference.md) | 2025；2512.01031v1 | 用当前图像配对未来机器人状态和动作进行微调，使动作生成适应异步执行起点。 |
| P19 | [DynamicVLA: A Vision-Language-Action Model for Dynamic Object Manipulation](DynamicVLA-A_Vision-Language-Action_Model_for_Dynamic_Object_Manipulation.md) | 2026；2601.22153v1 | 结合430M多帧VLA、持续推理、过期动作丢弃及DOM动态操控数据，提高动态目标操作成功率。 |
| P20 | [Towards Generalizable Robotic Manipulation in Dynamic Environments](Towards_Generalizable_Robotic_Manipulation_in_Dynamic_Environments.md) | 2026；2603.15620v3 | 构建117,000轨迹的DOMINO，并以历史光流和未来对象特征辅助监督训练PUMA。 |

### 人体运动与交互合成

| 编号 | 论文题目 | 年份 / 所用版本 | 核心贡献 |
|---|---|---|---|
| P21 | [MotionBricks: Scalable Real-Time Motions with Modular Latent Generative Model and Smart Primitives](MotionBricks-Scalable_Real-Time_Motions_with_Modular_Latent_Generative_Model_and_Smart_Primitives.md) | 2026；2604.24833v1 | 以根轨迹、姿态离散潜变量和智能控制基元实现低延迟多风格动作生成。 |
| P22 | [Uni-Inter: Unifying 3D Human Motion Synthesis Across Diverse Interaction Contexts](Uni-Inter-Unifying_3D_Human_Motion_Synthesis_Across_Diverse_Interaction_Contexts.md) | 2025；2511.13032v2 | 用统一三维语义体素条件与关节热图扩散建模人—人、人—物、人—场景交互。 |
| P23 | [GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors](GRAIL-Generating_Humanoid_Loco-Manipulation_from_3D_Assets_and_Video_Priors.md) | 2026；2606.05160v1 | 从已知三维资产、视频先验和四维重建生成可经物理策略跟踪的机器人移动操作示范。 |

### 导航、社交评测与三维环境

| 编号 | 论文题目 | 年份 / 所用版本 | 核心贡献 |
|---|---|---|---|
| P24 | [NavDP: Learning Sim-to-Real Navigation Diffusion Policy with Privileged Information Guidance](NavDP-Learning_Sim-to-Real_Navigation_Diffusion_Policy_with_Privileged_Information_Guidance.md) | 2025；2505.08712v3 | 通过规模化仿真路径、RGB-D 扩散候选和特权几何监督的轨迹评估器，实现跨环境与跨机器人局部导航。 |
| P25 | [FLUX: Accelerating Cross-Embodiment Generative Navigation Policies via Rectified Flow and Static-to-Dynamic Learning](FLUX-Accelerating_Cross-Embodiment_Generative_Navigation_Policies_via_Rectified_Flow_and_Static-to-Dynamic_Learning.md) | 2026；2603.12806v1 | 以 NavDP 初始化的 Rectified Flow 和动态环境强化学习改进跨具身生成式局部导航，并提供 DynBench 六类动态场景任务。 |
| P26 | [NavIsaacLab: Generating Realistic Crowd via Parallel Robot Learning for Benchmarking Human-aware Navigation](NavIsaacLab-Generating_Realistic_Crowd_via_Parallel_Robot_Learning_for_Benchmarking_Human-aware_Navigation.md) | 2026；2606.26265v1 | 结合场景处理、人群根轨迹生成、AMP 全身控制和视觉 PPO，使物理驱动行人能用于并行导航数据与仿真到现实评测。 |
| P27 | [Arena-Bench 2.0: A Comprehensive Benchmark of Social Navigation Approaches in Collaborative Environments](Arena-Bench_2.0-A_Comprehensive_Benchmark_of_Social_Navigation_Approaches_in_Collaborative_Environments.md) | 2025；正式论文 / 官方全文 | 以 nav2py 连接 Python 学习策略和 ROS 2 Nav2，结合语义场景、交互行为和多维指标开展可配置社交导航比较。 |
| P28 | [Social robot navigation: a review and benchmarking of learning-based methods](Social_robot_navigation-a_review_and_benchmarking_of_learning-based_methods.md) | 2025；正式论文 / 官方全文 | 用五类架构梳理社交导航、训练与感知系统，并在六类场景中比较九种经典及学习式规划器实现。 |
| P29 | [Towards Physically Executable 3D Gaussian for Embodied Navigation](Towards_Physically_Executable_3D_Gaussian_for_Embodied_Navigation.md) | 2025；2510.21307v2 | 将按对象分解的语义 3DGS 与原网格的凸分解碰撞体组合，提供 InteriorGS-1k 和 SAGE-Bench 的连续导航数据与评估。 |
| P30 | [Lyra 2.0: Explorable Generative 3D Worlds](Lyra_2.0-Explorable_Generative_3D_Worlds.md) | 2026；2604.13036v1 | 通过逐帧几何检索、规范坐标对应和自增强历史条件延长视频世界探索，再将生成视图重建为 Gaussian 与网格。 |

## 正式题目字母索引

中文题目列在英文题目之后；方法简称只用于帮助识别，不替代正式题目。

- [A Survey on Reinforcement Learning of Vision-Language-Action Models for Robotic Manipulation](A_Survey_on_Reinforcement_Learning_of_Vision-Language-Action_Models_for_Robotic_Manipulation.md) — P04
- [A Survey on Vision-Language-Action Models: An Action Tokenization Perspective](A_Survey_on_Vision-Language-Action_Models-An_Action_Tokenization_Perspective.md) — P02
- [Action-aware Dynamic Pruning for Efficient Vision-Language-Action Manipulation](Action-aware_Dynamic_Pruning_for_Efficient_Vision-Language-Action_Manipulation.md) — P14
- [Arena-Bench 2.0: A Comprehensive Benchmark of Social Navigation Approaches in Collaborative Environments](Arena-Bench_2.0-A_Comprehensive_Benchmark_of_Social_Navigation_Approaches_in_Collaborative_Environments.md) — P27
- [Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](Diffusion_Policy-Visuomotor_Policy_Learning_via_Action_Diffusion.md) — P08
- [DynamicVLA: A Vision-Language-Action Model for Dynamic Object Manipulation](DynamicVLA-A_Vision-Language-Action_Model_for_Dynamic_Object_Manipulation.md) — P19
- [FLUX: Accelerating Cross-Embodiment Generative Navigation Policies via Rectified Flow and Static-to-Dynamic Learning](FLUX-Accelerating_Cross-Embodiment_Generative_Navigation_Policies_via_Rectified_Flow_and_Static-to-Dynamic_Learning.md) — P25
- [GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors](GRAIL-Generating_Humanoid_Loco-Manipulation_from_3D_Assets_and_Video_Priors.md) — P23
- [Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware](Learning_Fine-Grained_Bimanual_Manipulation_with_Low-Cost_Hardware.md) — P07
- [Lyra 2.0: Explorable Generative 3D Worlds](Lyra_2.0-Explorable_Generative_3D_Worlds.md) — P30
- [MetaVLA: Unified Meta Co-training For Efficient Embodied Adaption](MetaVLA-Unified_Meta_Co-training_For_Efficient_Embodied_Adaption.md) — P10
- [MotionBricks: Scalable Real-Time Motions with Modular Latent Generative Model and Smart Primitives](MotionBricks-Scalable_Real-Time_Motions_with_Modular_Latent_Generative_Model_and_Smart_Primitives.md) — P21
- [NavDP: Learning Sim-to-Real Navigation Diffusion Policy with Privileged Information Guidance](NavDP-Learning_Sim-to-Real_Navigation_Diffusion_Policy_with_Privileged_Information_Guidance.md) — P24
- [NavIsaacLab: Generating Realistic Crowd via Parallel Robot Learning for Benchmarking Human-aware Navigation](NavIsaacLab-Generating_Realistic_Crowd_via_Parallel_Robot_Learning_for_Benchmarking_Human-aware_Navigation.md) — P26
- [Real-Time Execution of Action Chunking Flow Policies](Real-Time_Execution_of_Action_Chunking_Flow_Policies.md) — P16
- [Realtime-VLA FLASH: Speculative Inference Framework for Diffusion-based VLAs](Realtime-VLA_FLASH-Speculative_Inference_Framework_for_Diffusion-based_VLAs.md) — P15
- [RL Token: Bootstrapping Online RL with Vision-Language-Action Models](RL_Token-Bootstrapping_Online_RL_with_Vision-Language-Action_Models.md) — P12
- [RL²: Fast Reinforcement Learning via Slow Reinforcement Learning](RL2-Fast_Reinforcement_Learning_via_Slow_Reinforcement_Learning.md) — P05
- [Running VLAs at Real-time Speed](Running_VLAs_at_Real-time_Speed.md) — P17
- [SimBa: Simplicity Bias for Scaling Up Parameters in Deep Reinforcement Learning](SimBa-Simplicity_Bias_for_Scaling_Up_Parameters_in_Deep_Reinforcement_Learning.md) — P06
- [Social robot navigation: a review and benchmarking of learning-based methods](Social_robot_navigation-a_review_and_benchmarking_of_learning-based_methods.md) — P28
- [Towards Generalizable Robotic Manipulation in Dynamic Environments](Towards_Generalizable_Robotic_Manipulation_in_Dynamic_Environments.md) — P20
- [Towards Physically Executable 3D Gaussian for Embodied Navigation](Towards_Physically_Executable_3D_Gaussian_for_Embodied_Navigation.md) — P29
- [Uni-Inter: Unifying 3D Human Motion Synthesis Across Diverse Interaction Contexts](Uni-Inter-Unifying_3D_Human_Motion_Synthesis_Across_Diverse_Interaction_Contexts.md) — P22
- [Vision Language Action Models in Robotic Manipulation: A Systematic Review](Vision_Language_Action_Models_in_Robotic_Manipulation-A_Systematic_Review.md) — P01
- [VLASH: Real-Time VLAs via Future-State-Aware Asynchronous Inference](VLASH-Real-Time_VLAs_via_Future-State-Aware_Asynchronous_Inference.md) — P18
- [What Can RL Bring to VLA Generalization? An Empirical Study](What_Can_RL_Bring_to_VLA_Generalization-An_Empirical_Study.md) — P13
- [π_RL: Online RL Fine-tuning for Flow-based Vision-Language-Action Models](pi_RL-Online_RL_Fine-tuning_for_Flow-based_Vision-Language-Action_Models.md) — P11
- [π₀: A Vision-Language-Action Flow Model for General Robot Control](pi0-A_Vision-Language-Action_Flow_Model_for_General_Robot_Control.md) — P09
- [面向具身操作的视觉-语言-动作模型综述](面向具身操作的视觉-语言-动作模型综述.md) — P03

## 需要保留的版本说明

- π₀ 的项目附件是 2024 年首版，不能按文件名中的 2026 年认定初次发表时间。
- Diffusion Policy 使用 2024 年扩展版；与较早 RSS 版本的任务数量、作者顺序和结果范围分开。
- Uni-Inter 为 2025 年论文的 2026 年修订；MetaVLA 保留附件题名 Adaption，并注明官网 Adaptation 拼写。
- RL Token 的官方博文时间与 arXiv 提交时间不同，均在逐篇稿注明。
- VLASH 的 v1/v2 反应加速数字不同；DynamicVLA 的新版正文澄清频率、动作时序和名称，旧版主实验不与新版混表。
- NavIsaacLab 论文与持续更新的 2.0 实现、MotionBricks 的公开预览与论文完整训练系统，分别说明公开范围。
- Din 综述后续期刊题名变化视为同一工作的版本演进，没有重复计数。

## 证据与复现范围

方法与实验以已取得的完整 PDF 为主要依据，官方论文页面、项目页、代码与模型页面用于核对书目和实现入口。未运行训练、仿真或真实机器人实验；未完整开放的代码、仅有图示的数值及未报告的统计量均明确限定。个别原文公式、表格或指标存在不一致，逐篇稿保留核查说明，不擅自修成“作者已经证实”的结论。

所有独立总结均附原文页码/章节定位和官方链接。压缩包中的相对链接在解压后保持可用。
