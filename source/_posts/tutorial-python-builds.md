---
{
  "title": "Python 工程：pyproject、uv 锁定与构建隔离",
  "description": "区分运行依赖与构建依赖，从 wheel 和最内层异常排查安装失败。",
  "layout": "post",
  "date": "2026-10-09 21:15:00",
  "updated": "2026-10-09",
  "lang": "zh-CN",
  "collection": "engineering",
  "translation_path": "en/tutorials/python-builds/",
  "tutorial": {
    "id": "T16",
    "group": "toolchain",
    "references": [
      "uv-config",
      "uv-build",
      "uv-lock",
      "lab-install"
    ]
  },
  "permalink": "tutorials/python-builds/"
}
---

## 项目声明的职责

`[build-system]` 指定构建后端及构建依赖；`[project]` 声明分发名称、Python 范围和运行依赖；`[project.optional-dependencies]` 定义 extra；`[project.scripts]` 将安装后的 CLI 映射到函数。分发名可以带连字符，导入包名通常使用下划线。

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "example-tool"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = []

[project.scripts]
example-tool = "example_tool.cli:main"
```

示例还需实际的包结构和 `main` 函数，不能仅凭 TOML 存在认定入口可运行。依赖范围声明不是完整复现锁文件。

## 官方文档补充：locked 与 frozen 不同

uv 的 `--locked` 要求锁文件与声明一致，遇到需要更新时失败；`--frozen` 使用已有锁文件，不检查其是否最新。`uv sync` 默认进行 exact syncing，可能移除环境中锁文件未要求的额外包，适合专用项目环境。不要在重要共享环境里直接同步未知锁文件。

```bash
uv lock --check
uv sync --locked
uv run --locked example-tool
```

以上在已准备好项目的独立虚拟环境中执行，具体 uv 行为以本页引用提交的文档为准。

## 构建失败的最小定位

无兼容 wheel 时安装器尝试构建源码。记录 Python、平台、索引和失败包版本，读取最内层 backend stderr。`setuptools.build_meta:__legacy__` 是后端名称，本身不证明唯一根因。隔离构建环境使用自己的构建依赖，交互环境里已安装 setuptools 不代表构建过程用了它。

先检查支持的 wheel，再在新环境复现单包构建；按证据约束构建依赖或补系统工具，必要时仅对该包关闭隔离。关闭隔离意味着自行准备构建依赖，不是通用默认修复。

## 多项目隔离与验收

Isaac Lab、OpenPI 和 LIBERO 的 Python、NumPy、框架与图形依赖可能不同，应遵循各自固定提交的安装约束，服务接口连接独立环境。验收导入路径、CLI、最小计算和锁文件一致性。历史失败包缺少成功日志时保持“待验证”，不把候选命令当作已验证修复。
