---
{
  "title": "重参数化与路径导数",
  "description": "推导高斯重参数化、tanh 密度修正和适用边界。",
  "date": "2026-10-09 20:09:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "theory",
  "permalink": "knowledge/reparameterization/",
  "translation_path": "en/knowledge/reparameterization/",
  "notebook": {
    "slug": "reparameterization",
    "group": "policy",
    "sources": [
      "N036"
    ]
  }
}
---

## 固定噪声后求路径导数

若 $x\sim\mathcal N(\mu_\theta,\sigma_\theta^2)$，可以写成 $x=\mu_\theta+\sigma_\theta\epsilon$，其中 $\epsilon\sim\mathcal N(0,1)$ 的分布不依赖参数。于是，在满足交换微分与期望的正则条件时，

$$
\nabla_\theta\mathbb E[f(x)]
=\mathbb E_\epsilon[\nabla_x f(x)\nabla_\theta x].
$$

随机性仍然存在，但采样路径对参数变成可微的确定性函数。固定同一噪声比较相邻参数，也能提供更清晰的有限差分检查。

## 与 score-function 方法比较

REINFORCE 使用 $f(x)\nabla_\theta\log p_\theta(x)$，通常不要求 $f$ 对样本可微；路径导数需要可微的采样变换和目标。重参数化经常减小方差，但不是对所有分布、目标或 estimator 的普遍方差排序定理。离散类别变量不能直接用普通连续路径导数；松弛、直通估计或专用估计器有各自偏差。

## SAC 的 squashed Gaussian

令 $u=\mu(s)+\sigma(s)\epsilon$，$a=\tanh u$。变换后的 log 密度为

$$
\log\pi(a\mid s)=\log\mathcal N(u;\mu,\sigma^2)-\sum_i\log(1-\tanh^2u_i).
$$

若还缩放到执行器区间，需要对应的 Jacobian 常数。数值实现应使用稳定形式处理接近饱和的动作，避免直接对近零的 $1-a^2$ 取对数。

## Actor 更新的梯度边界

优化 actor 时，critic 参数通常不更新，但 $Q(s,a)$ 对动作的梯度要保留并传给 actor。温度更新中，熵残差通常 detach，避免意外更新策略。不能把“冻结 critic 参数”实现成把整个 Q 值 detach，后者会丢失路径导数。

建议验证 Gaussian 期望的解析梯度，再检验 tanh 变换的 log probability 和梯度，最后接入 SAC。关联阅读：[SAC 与对偶](/knowledge/sac-duality/)、[策略梯度](/knowledge/policy-gradients/)。


## 原笔记中的选读链接

- [参考 1](https://arxiv.org/abs/1312.6114)
- [参考 2](https://arxiv.org/pdf/1312.6114)
- [参考 3](https://arxiv.org/abs/1805.08498)
