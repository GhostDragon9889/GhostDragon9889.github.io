---
featured: true
translation_path: en/2026/10/09/hexo-github-pages-workflow/
title: Hexo 与 GitHub Pages：保留源码的构建和发布流程
date: 2026-10-09 16:00:00
description: 从依赖安装、静态生成到 Git 发布，整理个人主页维护中可复用的工程经验。
collection: engineering
categories:
  - 工程实践
tags:
  - Hexo
  - GitHub Pages
  - 静态站点
---

这篇记录整理了本主页维护过程中实际采用的构建、验证与发布方法。仓库同时保存 Hexo 源码和根目录的静态站点文件，发布流程需要保留这两部分。

## 1. 使用锁定依赖，保留完整性校验

使用 `npm ci` 按 `package-lock.json` 安装依赖，不在部署时重新选择版本。锁文件中记录的镜像域名如果不可访问，可以通过 npm 支持的下载源替换选项使用官方仓库：

```bash
npm ci --registry=https://registry.npmjs.org --replace-registry-host=always --no-audit --no-fund
```

此方式不修改锁文件中的版本与完整性校验值，也不关闭 TLS 校验。`--replace-registry-host=always` 适用于本仓库的 npm 镜像依赖；其他项目若含私有仓库或自定义下载地址，需要先核对来源。

## 2. 区分源文件、构建输出与发布文件

- `source/` 保存个人信息、文章与页面资源。
- `themes/ayeria/layout/` 保存页面模板。
- `public/` 是 Hexo 生成的、被 Git 忽略的构建输出。
- 仓库根目录的 HTML、CSS 等是 GitHub Pages 的发布文件。

构建后，通过受限制的同步工具复制已识别的发布路径：

```bash
npm run build
node tools/sync-pages.cjs
node tools/sync-pages.cjs --check
git diff --check
```

同步工具不删除文件，也不会把 `public/` 整体替换到源码目录。新增顶层发布路径时，需要明确更新允许列表。

本仓库原有 `hexo deploy` 配置指向 `main`，会以纯静态输出替换该分支的内容；因此采用正常的 Git 提交与推送流程发布，保留源码。

## 3. 保持文章链接稳定

在 Markdown 的 front matter 中显式保存文章日期。依赖文件修改时间生成日期会使重新检出或迁移后的文章路径改变。

```yaml
title: 学习经历
date: 2026-05-29 18:26:07
```

修改个人信息时，需要同时检查首页、文章页与搜索索引，避免只更新源文件而继续发布旧静态内容。

## 4. 验证实际页面和交互

构建成功后，还需要通过浏览器验证生成的站点。此次主页维护检查了桌面与手机布局、导航、主题切换、原有文章链接以及停用 JavaScript 后的内容可读性。

页面使用本地 CSS 和原生 JavaScript，减少外部字体与特效 CDN 加载失败对阅读体验的影响。阅读和分类页面同样保留无需 JavaScript 即可查看的内容；筛选功能作为渐进增强。

## 5. 发布前核对

确认发布文件与本次构建一致，再检查暂存区并提交：

```bash
node tools/sync-pages.cjs --check
git diff --check
git status --short
```

推送后核对远端分支的提交标识。Git 推送成功与 GitHub Pages 构建完成是不同状态，应分别验证。
