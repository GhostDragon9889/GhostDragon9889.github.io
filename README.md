# LFM 的个人主页

使用 Hexo 8 和 Ayeria 主题构建，采用简洁的学术布局，包含 Google Scholar 入口、文献阅读、学术与工程分类、学习经历与文章归档，支持浅色 / 深色模式。

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

- 个人简介、GitHub / Google Scholar 地址、核实后的论文列表和首页学习经历：`source/_data/profile.yml`。
- 内容分类：`source/_data/collections.yml`。
- 文章：`source/_posts/`。保留文章的 `date` 字段，避免生成后原有链接改变。
- 页面布局：`themes/ayeria/layout/` 中的 `profile*` 模板及 `index.ejs`、`post.ejs`、`archive.ejs`。
- 样式和交互：`source/css/profile.css`、`source/js/profile.js`。

学习经历同时保留在文章中；更新时请保持与首页一致。

## 文献阅读与分类

文章 front matter 的 `collection` 决定栏目：`reading`（文献阅读）、`research`（学术研究）、`engineering`（工程实践）、`reproduction`（实验复现）。`profile` 用于个人经历，不计入学术与工程目录。

文献笔记可使用 `scaffolds/paper.md` 创建：

```bash
npx hexo new paper "论文阅读标题"
```

填写论文题名、作者、年份、发表渠道、原文链接与 `paper.topic`，再写研究问题、核心方法、实验、局限与阅读思考。笔记自动出现在 `/reading/` 和首页；阅读目录按 `paper.topic` 筛选。不要把阅读过的论文直接列为自己的发表论文。

工程或学术记录设置相应的 `collection`，并补充 `description`、`categories` 和 `tags`。它们会进入 `/knowledge/`，支持分类筛选；禁用 JavaScript 时仍可阅读全部条目。

`publications` 只保存已核实的个人发表论文，字段为 `title`、`authors`、`year`、`venue` 和 `url`。目前仅添加了用户提供的 Scholar 入口，尚未抓取该档案的论文或引用数据；ChatGPT 项目的历史内容需要先导出或复制到当前会话再整理，仓库不会自动访问 ChatGPT 账户。

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
