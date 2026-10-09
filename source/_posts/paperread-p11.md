---
{
  "title": "π_RL：面向流式视觉—语言—动作模型的在线强化学习微调",
  "date": "2026-10-09 17:00:00",
  "updated": "2026-10-09 17:00:00",
  "description": "用 Flow-Noise 与 Flow-SDE 构造可优化的随机生成过程，对流式 VLA 动作专家进行在线 RL 微调。 仿真与计算成本较高，训练随机过程与推理有差距；原文时间方向及 score 符号需结合实现核对。",
  "collection": "reading",
  "lang": "zh-CN",
  "permalink": "reading/p11/",
  "translation_path": "en/reading/p11/",
  "paper": {
    "id": "P11",
    "title": "π_RL: Online RL Fine-tuning for Flow-based Vision-Language-Action Models",
    "topic_id": "action-policy",
    "year": 2025,
    "version": "2510.25889v3",
    "url": "https://arxiv.org/abs/2510.25889v3",
    "supplement": false,
    "summary_sha256": "cd21557c935a3d02fbbf7fc551fe40fc18e9d97c6f076a89ce61f99eaf2bd94e"
  }
}
---

## 1. 文献信息与研究定位

- **中文题目**：π_RL：面向流式视觉—语言—动作模型的在线强化学习微调。
- **作者（按项目PDF首页）**：Kang Chen、Zhihao Liu、Tonghe Zhang、Zhen Guo、Si Xu、Hao Lin、Hongzhi Zang、Xiang Li、Bingwen Wei、Jiakai Zhou、Quanlu Zhang、Zhaofei Yu、Guoliang Fan、Tiejun Huang、Yu Wang、Chao Yu。前3位共同第一作者。arXiv网页元数据未列出PDF中的Bingwen Wei与Jiakai Zhou，本文保留附件名单，提示这一书目差异。[1][2]
- **年份与版本**：初稿2025-10-29；项目附件arXiv:2510.25889v3，2026-01-29修订，首页另标Preprint January 30, 2026，共24页。
- **实现入口**：RLinf/RLinf及RLinf官方文档、模型集合。[3][4]

π_RL研究怎样对flow matching生成的VLA动作执行PPO类在线RL。它提出两条路径：Flow-Noise在去噪链加入可学习高斯噪声，使用整条生成链的联合概率；Flow-SDE构造带可计算高斯转移的随机生成过程，将去噪与环境交互组织成两层MDP，并以混合ODE/SDE降低训练成本。[1，§4]

主要实验先做SFT，再在模拟环境交互训练。RL阶段默认冻结VLM，更新约300M参数的动作专家及相关价值/噪声模块；不是所有实验都在线更新整个3.3B VLA，也不是类似RLT只训练极小actor。[1，附录B.2]

## 2. 问题及两种时间尺度

对观测$o_t$，VLA生成动作块$A_t=[a_{t,0},\ldots,a_{t,H-1}]$。$t$是环境决策时间，$\tau$是一次动作生成内部的连续flow时间，两者必须区分。论文§3采用：

$$
A_t^\tau=\tau A_t+(1-\tau)\epsilon,
\quad\epsilon\sim\mathcal N(0,I),\qquad
u=A_t-\epsilon,
$$

并以条件flow matching目标训练速度场：

$$
\mathcal L_{\mathrm{CFM}}=
\mathbb E\|v_\theta(A_t^\tau,o_t)-u\|_2^2.
$$

推理用若干Euler步将初始噪声变成动作。给定初始噪声后ODE路径是确定的，但**初始噪声本身仍可使最终动作随机**。RL难点不能简单说成“flow策略毫无随机性”，而是终端动作的边缘密度难以用少数积分步准确、廉价地计算，且需要合适的可控探索过程。[1，§3–4；最后一句为机制澄清]

PPO依赖新旧策略概率比；离散action token可由softmax计算，普通高斯动作头也有解析密度。flow动作是经多步确定性变换得到的变量，直接用最终动作与预测均值做MSE，不能就当作其真实log probability。π_RL把概率计算移到有显式分布的生成转移上。[1，§4]

## 3. Flow-Noise：整条生成轨迹的概率

将$\tau$离散为$K$步，步长$\delta=1/K$。每步令：

$$
A^{\tau+\delta}\sim
\mathcal N\big(\mu_\tau,\Sigma_\tau\big),
\quad\mu_\tau=A^\tau+v_\theta(A^\tau,o)\delta,
\quad\Sigma_\tau=\operatorname{diag}(\sigma_{\theta'}^2).
$$

这是论文式(4)。噪声网络读取当前去噪状态和观测，学习各维标准差，与速度网络共同更新。此处方差是网络参数化结果，不应额外自行乘$\delta$并混成Flow-SDE的方差定义。[1，§4.1.1]

对完整生成路径$\mathcal A=(A^0,A^{\tau_1},\ldots,A^1)$，论文式(5)为：

$$
\log p_\theta(\mathcal A\mid o)=
\log p(A^0)+\sum_{k=0}^{K-1}
\log p_\theta(A^{\tau_{k+1}}\mid A^{\tau_k},o).
$$

每项为高斯log density，因此对**该离散随机生成链**可精确计算。最终物理奖励附着在这条潜在动作生成路径上，从而进行策略梯度更新。[1，§4.1.2]

**边界说明**：这里可计算的是联合路径密度，终端动作密度仍需对所有中间状态积分。将路径作为扩展动作可以推导相应未裁剪策略梯度，但对整条路径的概率比做PPO clipping，不必与对终端边缘动作比做clipping完全相同。因而“exact likelihood”不能扩写为“精确算出了原始确定性flow的最终动作边缘概率”。

训练结束可去除额外噪声网络，按ODE执行动作；应分别评价训练时随机链与部署时ODE策略，因为二者的离散采样行为可能不同。给定初始噪声后路径确定，也不自动说明所有重复部署调用输出完全一样。[1，§4.1、5.4]

## 4. Flow-SDE：随机去噪与环境组成两层MDP

### 4.1 可计算高斯转移

Flow-SDE利用probability-flow ODE与SDE的联系，在速度场上增加与score及噪声强度有关的漂移修正，再加Wiener噪声。Euler离散后具有通用形式：

$$
A^{\tau+\delta}\sim\mathcal N
\big(A^\tau+b_\theta(A^\tau,\tau,o)\delta,
g(\tau)^2\delta I\big).
$$

这里$b_\theta$是修正后的漂移，$g$控制噪声。核心作用是为每个随机去噪步骤提供显式概率，而非简单在最后的机器人动作上加白噪声。理论上边缘密度保持涉及连续时间、正确score和一致时间方向；有限步近似及不精确速度网络都会引入偏差，论文实验也观察到从ODE改为SDE后初始策略性能下降。[1，式(7)–(9)、§5.4、附录I]

### 4.2 原文时间符号的一致性检查

**以下是独立推导，不是论文新增公式。**按§3的$A^\tau=\tau A+(1-\tau)\epsilon$、$\tau:0\to1$约定，若$v=\mathbb E[A-\epsilon\mid A^\tau=x,o]$，则

$$
\mathbb E[\epsilon\mid x,o]=x-\tau v,
\qquad
\nabla_x\log q_\tau(x\mid o)
=-\frac{x-\tau v(x,\tau,o)}{1-\tau}.
$$

对于递增时间的普通Itô SDE，要与$\partial_\tau q=-\nabla\cdot(vq)$保持同一密度演化，其漂移应写成$b=v+\tfrac12g^2\nabla\log q$，因为Fokker–Planck中的扩散项会与新增score漂移相消。

项目PDF第5页式(7)–(9)打印的score关系和漂移符号没有直接遵循上述同一递增时间约定；这已通过原PDF图像核对，非文本抽取错误。不能将这些式子与§3的路径不加变换地拼接成代码。复现应核对作者实现实际使用的时间方向、速度定义和步长符号；这里不据此宣称实验无效，只明确公式需要统一约定。[1，§3.2、4.2.1]

### 4.3 扩展状态、动作与奖励

两层MDP状态为$\bar s_t^\tau=(o_t,A_t^\tau)$。内层动作是下一去噪状态$A_t^{\tau+\delta}$，观测$o_t$保持不变；去噪完成后，最终动作块与物理环境交互，得到下一观测并重新采初始噪声。内部去噪步不产生物理奖励，只有完成生成并执行时得到环境奖励。[1，式(10)–(12)]

这将“在一个机器人决策中做多少去噪计算”纳入可训练随机过程，但若每个环境步展开$K$个去噪步，优化链和计算都会增长。混合ODE/SDE每次随机选一个去噪位置做随机转移，其余步骤保持ODE。这样可以只对选中的随机步骤计算相应策略更新；环境包装器执行后续去噪和物理动作。[1，§4.2.3]

需要注意，包装器中的ODE由策略网络决定，网络更新时这些转移也会变化。论文将混合设置视为有效近似框架，但若要证明与完整链完全等价，还需显式处理这些参数依赖；不能仅凭“MDP包装”三个字自动得到等价保证。这是独立的理论复现检查。

## 5. PPO、critic和动作块处理

PPO使用$\rho=\pi_{\mathrm{new}}/\pi_{\mathrm{old}}$及GAE：

$$
\widehat A_t=\sum_{k\ge0}(\gamma\lambda)^k\delta_{t+k},
\quad \delta_t=R_t+\gamma V(s_{t+1})-V(s_t),
$$

$$
L^{\mathrm{clip}}=
\mathbb E\min\big(\rho_t\widehat A_t,
\operatorname{clip}(\rho_t,1-\varepsilon,1+\varepsilon)\widehat A_t\big).
$$

Flow-Noise用联合生成链的比，Flow-SDE用随机去噪转移的比。clipping只是代理目标的稳定化手段，并不严格保证新旧策略KL一定落在固定半径内。[1，式(13)–(15)]

论文按chunk-level宏步聚合奖励，正文写$R_t=\sum_jr_{t,j}$，折扣$\gamma$定义在宏步层面。这不同于RLT直接按物理步折扣再用$\gamma^C$bootstrap的表达；比较两论文时必须先统一时间单位。实际配置还区分预测长度$H$和执行后重规划长度$H'$，如π0在LIBERO预测50步，但常只执行5步，Long执行10步。[1，§4.3、附录表11]

critic尽量共享VLA特征。π0的本体状态进入动作专家，故可从动作专家接价值头，并对不同去噪状态的估值做平均近似$V(o)$；π0.5的标准结构可把状态放在VLM，因此能在VLM输出后接critic。实际附录又说明使用的π0.5配置省去state输入，所以复现必须区分“模型一般架构”与“本文使用配置”。[1，式(16)、§4.3.2、附录B.2]

在π0的critic消融中，VLM后接头即使未直接得到本体状态也略好，作者仍为状态完整性选择动作专家接头；四层MLP比单层更可靠。这说明critic位置的选择牵涉可观测信息与优化难度，不能只看actor中哪层离动作最近。[1，图6]

## 6. 数据、实验协议与主要结果

### 6.1 数据和训练预算

LIBERO中π0.5先用40条轨迹作few-shot SFT，对应40个任务各约一条示范；论文“one-shot”不是整个LIBERO总共只用一条。π0对Spatial/Object/Goal使用58条、Long用208条。ManiSkill使用16,384条规划器示范，覆盖16对象×17容器×16桌面即4352组合。MetaWorld使用2500条MT50示范；CALVIN使用约24小时ABC play数据。实验在8张H100 80GB上训练。[1，附录B–C]

LIBERO和MetaWorld成功给二元奖励；ManiSkill放置正确给1.0，并以抓握附着0.1奖励降低投掷等不期望行为；CALVIN每完成一个子任务给1。RL优化内容因此受具体奖励定义约束，不应把所有提升都解释为更好的视觉语义理解。[1，附录C]

### 6.2 四个主基准

| 基础模型/方法 | LIBERO | ManiSkill | MetaWorld | CALVIN长度5成功率 |
|---|---:|---:|---:|---:|
| π0 SFT | 57.6% | 38.4% | 50.8% | 57.5% |
| π0 Flow-SDE | 96.1% | 78.8% | 78.1% | 61.7% |
| π0 Flow-Noise | 97.6% | 77.8% | 85.8% | 59.9% |
| π0.5 SFT | 77.1% | 40.1% | 43.8% | 61.3% |
| π0.5 Flow-SDE | 97.9% | 90.9% | 70.7% | 87.0% |
| π0.5 Flow-Noise | 98.3% | 89.7% | 66.1% | 84.5% |

表1的平均改进27.6、29.2、31.0、29.1均是百分点。跨基准平均只能概括四个协议下的表现，不具有统一任务难度权重。Flow-SDE并非所有环境更好，Flow-Noise在π0 MetaWorld上明显占优。[1，表1]

π0.5在LIBERO-Long从43.9%提升到Flow-Noise的94.0%；四套件平均98.3%超过表中全数据SFT基线96.9%，说明额外交互能补偿较少示范。但这不是“总数据更少”的直接证明，因为RL消耗大量模拟交互。CALVIN的平均完成子任务从3.838升到Flow-SDE4.717，区别于百分比成功率。[1，附录表3、5]

### 6.3 OOD结果的重要边界

ManiSkill里π0.5 OOD平均从26.4%提升至Flow-SDE49.3%、Flow-Noise53.4%，涵盖视觉、语义干扰和执行变化；绝对性能仍远低于ID的约90%。CALVIN以ABC训练、D测试的独立OOD设置中，成功率从61.3%提升至79.1%，不能与主表D域RL训练后的87.0%混为同一协议。[1，附录D]

MetaWorld ML45在45任务上训练、5个未见任务测试，ID提升却没有带来稳定的未见任务收益。论文自己的总结是：对相似任务的环境变化、执行扰动有改善，真正新任务目标的泛化仍有限。这比“RL全面增强泛化”更准确。[1，§5.2.2、附录D.3–4]

### 6.4 消融及真实部署

混合两层MDP更新约428.6秒，完整两层814.2秒，单层821.4秒，约有2倍训练更新加速；这不是机器人动作执行速度翻倍。较低噪声保护初始rollout，却可能限制探索并产生较大梯度；更多去噪步改善采样近似，却增加优化难度。Spatial中执行chunk为5、10、20时，RL评价94.5%、95.5%、89.2%，并非越长越好。[1，图7、表2]

Flow-SDE下PPO通常强于这里的GRPO设置，例如π0.5 LIBERO平均97.9%对91.5%。GR00T N1.5附加实验从52.5%提升至89.9%，并强调关闭动作专家dropout以保持概率比计算的一致性；这提供第三种模型适用性证据。[1，附录表9–10]

Real2Sim2Real案例用ManiSkill负责刚体动力学、3DGS负责逼真渲染，Franka Panda与RealSense D435作为真实平台；20条规划示范加100次RL迭代后，SFT不能完成的任务达到40%真实成功率。这是小范围实机迁移案例，论文仍把直接真实在线RL的样本效率列为未解决问题。[1，附录E.2、§6]

## 7. 局限及本项目中的使用判断

核心创新是使flow生成链与可计算策略概率、PPO优化以及大规模模拟交互对接。理论边缘分布联系、有限步采样、混合训练及部署ODE之间仍有差别；作者附录明确承认噪声注入造成性能下降、采样加速和语义泛化仍需改进。[1，附录I]

**与本项目关系（独立分析）**：对于已有OpenPI+LIBERO管线，π_RL比RLT更适合作为“在模拟器中直接改进动作专家”的方案；RLT则更强调真实少量交互下的小网络适配。对于动态VLA，已有Execution OOD包含物体位置变化，可作为基础评测，但并未系统覆盖高速目标、视觉/通信延迟或持续运动。应额外报告干扰速度、发生时刻、观测年龄和$H'$，不能仅用原论文成功率推断动态闭环性能。

**复现优先项**：固定SFT checkpoint和数据量；确认只训action expert还是同时LoRA VLM；记录预测长度、执行长度和去噪步数；核对flow时间方向及SDE端点；分别记录随机rollout与ODE eval；保存采样时旧log probability；检查dropout、奖励终止和partial reset；监测KL、clip fraction、critic explained variance。官方文档用`joint_logprob=True`对应Flow-Noise、`False`对应Flow-SDE，可作为代码定位线索，但不能替代阅读实际实现。[4]

此次阅读包括原始PDF及官方网页，没有运行RLinf训练，也未验证单张消费级GPU的训练成本或实时表现。

## 8. 来源与阅读定位

[1] 项目PDF：*Chen et al. - 2026 - $π_texttt{RL}$ Online RL Fine-tuning for Flow-based Vision-Language-Action Models.pdf*。flow与MDP：PDF第3–6页；主结果/消融：第7–10页；训练与完整结果：第13–18页；更多训练分析及GR00T：第19–22页；超参数：第23–24页。公式约定特别参见第3页与第5页原图。

[2] [arXiv:2510.25889v3](https://arxiv.org/abs/2510.25889v3)。

[3] [RLinf官方仓库](https://github.com/RLinf/RLinf)；[RLinf官方模型集合](https://huggingface.co/RLinf)。

[4] [官方π0/π0.5强化学习文档](https://rlinf.readthedocs.io/en/latest/rst_source/examples/embodied/pi0.html)。外部核对日期：2026-10-09。
