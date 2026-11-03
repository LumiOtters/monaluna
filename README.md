# P5R 风格个人站

用 **Next.js 15 + Tailwind CSS v4** 从零搭建的 Persona 5 Royal 风格个人网站。

100%由DSH生成，我是小白正在学习中...之后会做出我的个人项目，敬请期待

## 快速开始

```bash
pnpm install
pnpm dev
```

浏览器打开 http://localhost:3000 。

生产构建：

```bash
pnpm build
pnpm start
```

## 目录结构

```
src/
├── app/
│   ├── layout.tsx              # 根布局：只放 <html>/<body> 与全局样式
│   ├── not-found.tsx           # 全局 404
│   ├── globals.css             # ★ P5R 设计系统（配色/工具类/动画）
│   └── (site)/                 # ★ 路由组：带页头页脚的所有页面
│       ├── layout.tsx          #   页头 + 页脚
│       ├── page.tsx            #   首页 / 个人介绍
│       ├── past/page.tsx       #   我的过去（时间线）
│       ├── work/page.tsx       #   项目作品集
│       ├── blog/page.tsx       #   博客列表
│       ├── blog/[slug]/page.tsx#   博客详情
│       └── about/page.tsx      #   关于我 / 联系方式
├── components/
│   ├── site-header.tsx         # 斜切导航 + 移动端全屏菜单
│   ├── site-footer.tsx         # 跑马灯页脚
│   ├── hero.tsx                # 首页大标题动效
│   ├── section-title.tsx       # P5R 斜块章节标题
│   ├── project-card.tsx        # 作品卡片（错位红影）
│   ├── past-timeline.tsx       # 时间线组件
│   └── stat-bar.tsx            # 能力值进度条
└── data/                       # ★ 内容都在这里，改这几个文件即可
    ├── site.ts                 # 站点名、导航、联系方式、能力值
    ├── projects.ts             # 项目列表
    ├── past.ts                 # 「我的过去」时间线条目
    └── posts.ts                # 博客文章
```

## 换成你自己的内容

只需要改 `src/data/` 下的四个文件，**不需要动任何组件**：

| 文件 | 改什么 |
|---|---|
| `site.ts` | 名字、codename、一句话简介、导航、邮箱/社交链接、能力值 |
| `projects.ts` | 增删项目、标题、标签、链接、卡片配色（red/yellow/paper/black） |
| `past.ts` | 你的经历时间线，`turningPoint: true` 会高亮成转折点 |
| `posts.ts` | 博客文章；加上新条目会自动生成 `/blog/<slug>` 页面 |

## P5R 设计系统的核心

全部定义在 `src/app/globals.css`，用 Tailwind v4 的 `@theme` 和 `@utility` 语法：

**配色**

- `p5-red` `#e60012` — 主色，标志性的红
- `p5-black` `#0a0a0a` — 背景
- `p5-paper` `#f2efe6` — 米白，替代纯白显得更有印刷感
- `p5-yellow` `#ffd400` — 强调色

**工具类**

| 类名 | 作用 |
|---|---|
| `p5-skew` / `p5-unskew` | 斜切容器 / 把容器内的文字掰正（P5R 最标志性的元素） |
| `p5-dots` | 报纸网点纹理 |
| `p5-speedlines` | 漫画式放射速度线 |
| `p5-hazard` | 黄黑警戒条纹 |
| `p5-torn-bottom` | 撕纸边缘 |
| `animate-p5-marquee` | 横向跑马灯 |

**动效**：`animate-p5-rise`（斜切上浮）、`animate-p5-spin-slow`（缓慢旋转）、`animate-p5-shake`（抖动）。
所有动画都尊重系统的 `prefers-reduced-motion` 设置。

## 值得注意的实现细节

1. **路由组 `(site)`**：页头页脚放在 `(site)/layout.tsx` 而不是根 layout。
   好处是全局 404 页不会被强制套上依赖 `usePathname()` 的导航组件，职责也更清晰。

2. **React 版本锁定在 19.0.0**：Next 15.1.x 与更新的 React 19.x 搭配时，
   `styled-jsx` 会解析出两份 React 实例，导致构建期静态导出报
   `Cannot read properties of null (reading 'useContext')`。
   升级 Next 前请同步检查这一点。

3. **`pnpm-workspace.yaml`** 里显式把 `sharp` 的构建脚本设为 `false`：
   它只用于图片优化，本项目的图片都走 CSS，跳过它的原生编译可避免安装报错。
   如果你以后要 `next/image` 优化本地图片，把它改回 `true` 并重新 `pnpm install`。

4. **横向溢出**：`html`/`body` 都设了 `overflow-x: hidden` 作为双保险，
   因为斜切元素和放射背景会让布局宽度略微超出视口。

## 部署

最简单的方式是推到 GitHub 后连接 **Vercel**，零配置即可上线。

其他静态托管也可以。本项目**已经配置好纯静态导出**（`next.config.ts` 里的
`output: "export"`），执行 `pnpm build` 后产物在 `out/` 目录，约 1.5 MB，
可以直接丢到 GitHub Pages / Netlify / Cloudflare Pages / 任意 CDN。

### 免费部署方案对比

| 平台 | 费用 | 优点 | 缺点 |
|---|---|---|---|
| **Cloudflare Pages** | 免费 | 国内访问相对稳定、无限带宽、可绑自定义域名 | 需要注册 Cloudflare |
| **Vercel** | 免费 | 和 Next.js 配合最好、推代码自动部署 | 国内访问偶尔较慢 |
| **GitHub Pages** | 免费 | 完全免费、和仓库绑定 | 仓库需公开；国内访问一般 |
| **Netlify** | 免费 | 拖拽 `out/` 文件夹即可部署，最简单 | 国内访问一般 |

**最省事的方式（Netlify 拖拽）**：运行 `pnpm build`，把 `out` 文件夹直接拖到
Netlify 的部署页面，几十秒就能得到一个 `xxx.netlify.app` 的公网地址。

**推荐方式（Cloudflare Pages）**：把项目推到 GitHub，在 Cloudflare Pages 里
连接仓库，构建命令填 `pnpm build`，输出目录填 `out`，之后每次 push 自动部署。

### 如果部署到子路径（如 GitHub Pages 的 /仓库名/）

需要在 `next.config.ts` 里加上 basePath，否则样式会 404：

```ts
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "/你的仓库名",
};
```

> 注意：`output: "export"` 模式下不能使用服务端功能（API Route、动态渲染、
> 服务端图片优化等）。当前所有页面都是纯静态的，已验证可以正常导出。

## 后续可以加的东西

- 把 `data/posts.ts` 换成 MDX 文件 + `@next/mdx`，写文章更舒服
- 用 `framer-motion` 做更细腻的页面切换动画（P5R 那种「撕纸转场」）
- 加一个真实的 OG 图片（`opengraph-image.tsx`），分享链接时更好看
- 博客详情页接入 `rehype-pretty-code` 做代码高亮

## 版权说明

视觉风格致敬 ATLUS《Persona 5 Royal》，仅供个人学习与展示使用。
本项目不包含任何游戏素材（图片、字体、音频），所有纹理均由 CSS 生成。
请勿用于商业用途。
