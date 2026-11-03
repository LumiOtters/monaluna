/**
 * ============================================================
 * 站点配置 —— 改这里就能换掉全站文案
 * 所有内容都集中在这个文件 + projects.ts + past.ts + posts.ts
 * ============================================================
 */

export const siteConfig = {
  /** 你的名字 */
  name: "MonaLuna",
  /** 代号 / 站名，P5R 里叫 codename。会显示在导航左侧的红色 Logo 块 */
  codename: "MonaLuna",
  /** 一句话自我介绍 */
  bio: "大专大一新生，方向还没定，正在从 Java 这些基础语言开始啃。",

  /** 首页大标题（会被拆成多行显示） */
  heroTitle: ["TAKE", "YOUR", "HEART"],

  /** 导航 —— 顺序即菜单顺序 */
  nav: [
    { href: "/", label: "HOME", jp: "ホーム" },
    { href: "/past", label: "THE PAST", jp: "過去" },
    { href: "/work", label: "WORK", jp: "作品" },
    { href: "/blog", label: "BLOG", jp: "記事" },
    { href: "/about", label: "ABOUT", jp: "プロフィール" },
  ],

  /** 联系方式 */
  contact: {
    email: "luminaraottersea@163.com",
    github: "https://github.com/LumiOtters",
    bilibili: "https://space.bilibili.com/404612247",
    qq: "3751458887",
  },

  /**
   * 技能条（CONFIDENCE / CHARM 那种感觉）
   * 数值可以按自己情况继续调整
   */
  stats: [
    { label: "CONFIDENCE", value: 10, note: "编程基础 / 入门" },
    { label: "CHARM", value: 15, note: "把想法说清楚" },
    { label: "KNOWLEDGE", value: 25, note: "Java / 正在学" },
    { label: "PROFICIENCY", value: 45, note: "工具与环境配置" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
