---
{
  "title": "GPU 软件栈与 PyTorch / JAX 正确计时",
  "description": "分离驱动、Toolkit、框架运行时，并在异步执行后同步计时。",
  "layout": "post",
  "date": "2026-10-09 21:16:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/gpu-profiling/",
  "tutorial": {
    "id": "T17",
    "group": "toolchain",
    "references": [
      "jax-async",
      "jax-install",
      "torch-amp"
    ]
  },
  "permalink": "tutorials/gpu-profiling/"
}
---

## 四层检查

驱动提供设备访问；CUDA Toolkit 包含 `nvcc` 等开发工具；框架发行包包含或依赖相应运行时；目标模型还需实际计算。`nvidia-smi`、`nvcc --version`、设备列表和模型成功分别证明不同层次。`nvidia-smi` 显示的 CUDA 上限不等于本地 Toolkit 的已安装版本。

官方 JAX 安装文档区分依赖随包提供和使用本地 CUDA 的安装路线，要求对应驱动及平台条件。按指定版本核对，不把当前文档组合改写为历史设备的推荐配置。未使用后端的初始化警告与目标 CUDA 计算失败应分别判断。

## 官方文档补充：异步返回不等于计算完成

JAX 的数组可能代表待完成的设备计算；只计 Python 返回时间会漏掉计算。`block_until_ready()` 等待结果可用，不必同时复制回主机。首次 JIT 编译和稳态执行需分开。

```python
import time
import jax
import jax.numpy as jnp

f = jax.jit(lambda x: x @ x)
x = jnp.ones((128, 128))
f(x).block_until_ready()  # warmup, outside the measured window
start = time.perf_counter()
result = f(x)
result.block_until_ready()
elapsed_seconds = time.perf_counter() - start
```

示例可运行于实际可用的 JAX 后端，设备类型需另行记录；不将其输出填成网页性能成绩。

## PyTorch GPU 测量

使用 CUDA Event 测设备执行段，或在墙钟窗口两端正确同步。端到端推理另计数据准备、传输、服务、动作消费和控制。AMP 根据硬件与数值范围选择 dtype；FP16 GradScaler 和 BF16 使用条件需分别检查，不能把一种配置应用到所有设备。

## 报告最少字段

记录模型/数据版本、batch、精度、设备类型、预热次数、测量次数、同步方法和延迟分位数。冷启动、稳态、显存峰值和吞吐分别报告。批吞吐不能直接等同于单机器人闭环时延，低 GPU 利用率也不能唯一定位到 Python。

日志公开前删除设备序列号、私人主机名、进程账户、路径与网络端点。补充排错步骤见 [Python 构建](../python-builds/) 和 [复现排错](../reproducible-debugging/)。本次未运行 CUDA/JAX 目标模型性能测量。
