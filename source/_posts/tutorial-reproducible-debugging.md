---
{
  "title": "可复现排错：Git、下载、系统 ABI 与证据状态",
  "description": "把安装、网络、扩展和运行错误按层定位，保留最小证据并清理日志隐私。",
  "layout": "post",
  "date": "2026-10-09 21:17:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/reproducible-debugging/",
  "tutorial": {
    "id": "T18",
    "group": "toolchain",
    "references": [
      "git-submodule",
      "hf-download",
      "uv-build",
      "usd-glossary"
    ]
  },
  "permalink": "tutorials/reproducible-debugging/"
}
---

## 用失败层次决定下一步

| 表现 | 首先检查 | 不足以证明 |
|---|---|---|
| 系统包缺库 | 发行版、仓库来源、ABI | 相似包名即可兼容 |
| AppImage 缺 FUSE | 挂载与图形运行分开 | 提取成功就是应用可用 |
| Python 构建失败 | 单包 backend stderr | 升级全部依赖即可修复 |
| HTTP 401 / 403 | 资源权限、身份、许可 | 一定是链接失效 |
| TLS / registry 失败 | 域名、证书、代理与阶段 | 一定是 GPU 或物理问题 |
| 扩展回调缺参数 | 注册接口和函数签名 | 仅修改任意一侧即可兼容 |
| USD shader/codegen 缺项 | 定义、资源和生成阶段 | 设置变量即生成成功 |

OBS 的发行版 ABI、MoviePy/Pillow 的 API 与视频编码 FPS 分别绑定版本。网卡驱动日志中的 `XID` 不能仅凭字母等同于 NVIDIA 的 `NVRM: Xid`，应先确认日志子系统。

## 官方 Git 补充：子模块需要父仓库登记

```bash
git rev-parse HEAD
git submodule status --recursive
git config --file .gitmodules --get-regexp path
```

没有 `.gitmodules` 时最后一条会失败，作为登记缺失的线索。只对确认登记的路径执行初始化；父仓库 commit 与依赖 commit 都保存。普通 vendor 目录、子模块和 LFS pointer 是不同机制，指针存在不意味着二进制资源已取得。

## 官方下载文档补充

Hugging Face 的下载指南提供 `revision` 固定版本和缓存机制。复现记录包含公开资源 ID、指定 revision、文件 hash 与许可；签名 URL、访问令牌、带凭据代理地址留在本地配置中。缓存返回路径不能直接作为网页材料复制，修改缓存文件也可能破坏版本对应关系。

## 一份可复用排错记录

使用：症状 → 最小步骤 → 版本 → 关键错误 → 定位证据 → 单项修改 → 同条件复查 → 尚未覆盖的条件。公开日志将账户路径替换为相对路径，主机替换为 `localhost` 或文档保留域名；去除邮箱、电话、认证 header、设备标识和个人时间线。不要上传未脱敏压缩包或聊天导出。

| 状态 | 可以声称什么 |
|---|---|
| 文档核对 | 固定来源描述该机制 |
| 静态检查 | 配置/代码结构符合所检查条件 |
| 最小运行 | 指定输入与环境通过 |
| 集成验收 | 资产、传感、控制等共同运行 |
| 方案待执行 | 尚无运行闭环 |

本文将历史个人排错案例概括成通用方法，没有重新运行私人设备，也不发布其环境快照。完整版本与复现记录可以继续使用 [实验协议](../../knowledge/evaluation-protocol/)；示例仅在相应工具已安装且版本匹配时适用。
