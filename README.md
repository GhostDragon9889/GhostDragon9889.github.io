# LFM 的个人主页

使用 Hexo 8 和 Ayeria 主题构建，主页、文章和归档使用统一的响应式布局，支持浅色 / 深色模式。

## 本地开发

需要 Node.js 20 或更新版本；本次云环境使用 Node.js 24。

```bash
cd /workspace/GhostDragon9889.github.io
npm ci --cache /workspace/.npm-cache --no-audit --no-fund --registry=https://registry.npmjs.org --replace-registry-host=always --fetch-retries=1
npm run build
npm run server -- --ip 0.0.0.0 --port 4000
```

安装命令使用官方 npm 仓库下载锁定版本，保留 `package-lock.json` 中的完整性校验，不需要改写锁文件。在其他机器上可省略 `cd` 和 `--cache` 中的云环境专用路径。

## 修改内容

- 个人简介、GitHub 地址和首页学习经历：`source/_data/profile.yml`。
- 文章：`source/_posts/`。保留文章的 `date` 字段，避免生成后原有链接改变。
- 页面布局：`themes/ayeria/layout/` 中的 `profile*` 模板及 `index.ejs`、`post.ejs`、`archive.ejs`。
- 样式和交互：`source/css/profile.css`、`source/js/profile.js`。

学习经历同时保留在文章中；更新时请保持与首页一致。

## 更新 GitHub Pages 静态文件

本仓库同时保存源码和站点根目录的发布文件。构建后，将静态输出同步到根目录：

```bash
npm run build
node tools/sync-pages.cjs
node tools/sync-pages.cjs --check
git diff --check
git status --short
```

同步工具只复制已识别的发布路径，保留源码，不删除文件；增加新的顶层发布路径时需明确更新工具的允许列表。`public/` 是构建目录，不需要提交。

检查变更后，使用正常的 Git 提交与推送流程更新站点。现有 `npm run deploy` 配置会用纯静态输出覆盖 `main`，因此不要用它发布这个同时存放源码的分支。

云任务已经隔离，直接使用现有检出目录；无需创建 Git worktree。
