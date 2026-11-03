/**
 * 项目作品集数据
 * ------------------------------------------------
 * 目前全部是「待开发」的占位项目。
 * 以后真的做出东西了，把对应条目的 status 改成 "done"，
 * 再填上真实标题、简介、标签和链接就行。
 */

export type ProjectStatus = "planned" | "building" | "done";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  summary: string;
  /** 项目状态：planned=待开发，building=进行中，done=已完成 */
  status: ProjectStatus;
  /** 链接，可留空 */
  href?: string;
  /** 卡片主色，不填默认红 */
  accent?: "red" | "yellow" | "paper" | "black";
};

export const projects: Project[] = [
  {
    slug: "java-basics",
    title: "Java 基础练习",
    subtitle: "入门练习",
    year: "待定",
    tags: ["Java", "基础语法"],
    summary:
      "把变量、循环、数组、方法和类这些最基础的东西，通过一个个小练习真正写熟。目标是能独立写出几百行的程序。",
    status: "planned",
    accent: "red",
  },
  {
    slug: "small-tools",
    title: "几个小工具",
    subtitle: "动手实践",
    year: "待定",
    tags: ["Java", "控制台", "文件读写"],
    summary:
      "做一些能真正用起来的小东西：记账本、待办清单、简易计算器之类。重点是搞懂数据怎么存、怎么取、怎么用。",
    status: "planned",
    accent: "yellow",
  },
  {
    slug: "this-website",
    title: "这个个人站",
    subtitle: "P5R 风格站点",
    year: "2026",
    tags: ["Next.js", "Tailwind", "React"],
    summary:
      "你现在看到的这个网站，100% 由 AI 生成 —— 从第一行代码到最后一个像素。我负责提需求，它负责实现。",
    status: "building",
    accent: "paper",
  },
  {
    slug: "future-project",
    title: "留给以后",
    subtitle: "未知",
    year: "待定",
    tags: ["?", "?"],
    summary:
      "位置先留着。等我把基础打扎实、方向定下来，这里会填上真正拿得出手的东西。",
    status: "planned",
    accent: "black",
  },
];
