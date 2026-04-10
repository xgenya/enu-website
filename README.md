# ENU Website

ENU Minecraft 服务器官网，基于 Next.js + Nextra 构建，包含 MC 风格首页、快速开始页面和文档站。

## 技术栈

- **Next.js 16** — React 全栈框架
- **Nextra 4** — 基于 Next.js 的文档框架
- **TypeScript** — 类型安全
- **CSS Modules** — 组件级样式

## 功能

- MC 风格首页，实时获取服务器在线人数
- 快速开始页面（正版 / 离线版流程）
- 服务器规则展示
- 文档站（默认暗色模式）

---

## 本地开发

**环境要求：** Node.js 18+

```bash
# 克隆项目
git clone https://github.com/xgenya/enu-website.git
cd enu-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

---

## 生产部署

### 方式一：Docker（推荐）

每次推送到 `master` 分支，GitHub Actions 会自动构建镜像并推送到 `ghcr.io`。

**服务器首次部署：**

```bash
# 1. 下载 docker-compose.yml
curl -O https://raw.githubusercontent.com/xgenya/enu-website/master/docker-compose.yml

# 2. 启动
docker compose up -d
```

**更新（拉取最新镜像）：**

```bash
docker compose pull && docker compose up -d
```

> 如果仓库为私有，需先登录：
> ```bash
> echo "YOUR_PAT" | docker login ghcr.io -u xgenya --password-stdin
> ```

---

### 方式二：Node.js 直接部署

```bash
git clone https://github.com/xgenya/enu-website.git
cd enu-website
npm install
npm run build

# 用 PM2 守护进程
npm install -g pm2
pm2 start npm --name "enu-website" -- start
pm2 save && pm2 startup
```

---

### Nginx / 1Panel 反向代理

新建站点 → 类型选「反向代理」→ 代理地址填 `http://127.0.0.1:3000` → 绑定域名 → 申请 SSL。

---

## 项目结构

```
.
├── content/              # 页面内容（MDX）
│   ├── index.mdx         # 首页
│   ├── getting-started.mdx  # 快速开始
│   └── docs/             # 文档
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # 根布局
│   │   └── api/          # API 路由
│   └── components/       # React 组件
│       ├── MCHomePage.tsx
│       └── GettingStartedPage.tsx
├── public/               # 静态资源
├── Dockerfile
├── docker-compose.yml
└── next.config.mjs
```
