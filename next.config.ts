import type { NextConfig } from "next";

/**
 * 部署到 GitHub Pages 时，站点位于 https://用户名.github.io/仓库名/
 * 这种「子路径」下，所有静态资源的引用都必须带上 /仓库名 前缀，
 * 否则 CSS 和 JS 会 404，页面白屏。
 *
 * 这里用环境变量控制：
 *   - 本地开发（pnpm dev）：不设该变量，一切照旧
 *   - GitHub Actions 部署时：自动设为 /仓库名
 */
const repoName = process.env.GITHUB_REPO_NAME;
const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 导出纯静态站点（GitHub Pages / Netlify / Cloudflare 等都能直接托管）
  output: "export",
  // 静态托管没有服务端做图片优化，必须关闭
  images: { unoptimized: true },
  // 生成 /work/index.html 这样的目录结构，兼容性最好
  trailingSlash: true,
  // 子路径部署时自动加前缀
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
