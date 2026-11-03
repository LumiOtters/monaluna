import Link from "next/link";
import clsx from "clsx";
import type { Project } from "@/data/projects";

const accentStyles: Record<
  NonNullable<Project["accent"]>,
  { bg: string; text: string; sub: string }
> = {
  red: { bg: "bg-p5-red", text: "text-p5-black", sub: "text-p5-black/70" },
  yellow: {
    bg: "bg-p5-yellow",
    text: "text-p5-black",
    sub: "text-p5-black/70",
  },
  paper: {
    bg: "bg-p5-paper",
    text: "text-p5-black",
    sub: "text-p5-black/60",
  },
  black: {
    bg: "bg-p5-ink border-2 border-p5-red",
    text: "text-p5-paper",
    sub: "text-p5-paper-dim",
  },
};

/** 状态徽章文案与配色 */
const statusStyles: Record<
  Project["status"],
  { label: string; cls: string }
> = {
  planned: {
    label: "待开发",
    cls: "bg-black/20 text-black/70",
  },
  building: {
    label: "进行中",
    cls: "bg-p5-black text-p5-red",
  },
  done: {
    label: "已完成",
    cls: "bg-p5-black text-p5-yellow",
  },
};

/**
 * 作品卡片 —— 报纸剪贴风格
 * hover 时整体抬起 + 红色阴影偏移
 */
export function ProjectCard({ project }: { project: Project }) {
  const accent = accentStyles[project.accent ?? "red"];
  const status = statusStyles[project.status];
  const isBlack = project.accent === "black";

  return (
    <article className="group relative">
      {/* 背后错位的红色块（hover 展开） */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 bg-p5-red transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4" />

      <div
        className={clsx(
          "relative flex h-full flex-col p-6 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1",
          accent.bg,
        )}
      >
        {/* 顶部元信息 */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <span
            className={clsx(
              "font-display text-[11px] tracking-[0.25em]",
              accent.sub,
            )}
          >
            {project.year}
          </span>
          <span
            className={clsx(
              "font-serif-jp text-[11px] tracking-widest",
              accent.sub,
            )}
          >
            {project.subtitle}
          </span>
        </div>

        {/* 状态徽章 */}
        <div className="mb-4">
          <span
            className={clsx(
              "inline-block px-2 py-0.5 font-display text-[10px] tracking-[0.2em]",
              isBlack
                ? project.status === "building"
                  ? "border border-p5-red text-p5-red"
                  : "border border-p5-paper/30 text-p5-paper-dim"
                : status.cls,
            )}
          >
            {status.label}
          </span>
        </div>

        {/* 标题 */}
        <h3
          className={clsx(
            "font-display text-2xl leading-none tracking-tight sm:text-3xl",
            accent.text,
          )}
        >
          {project.title}
        </h3>

        {/* 摘要 */}
        <p
          className={clsx(
            "mt-4 flex-1 text-sm leading-relaxed",
            accent.sub,
          )}
        >
          {project.summary}
        </p>

        {/* 标签 */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={clsx(
                "border px-2 py-0.5 font-display text-[10px] tracking-wider",
                isBlack
                  ? "border-p5-paper/30 text-p5-paper"
                  : "border-black/25 text-black/70",
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 底部链接：只有真的填了链接才显示 */}
        {project.href ? (
          <Link
            href={project.href}
            className={clsx(
              "mt-6 inline-flex items-center gap-2 font-display text-xs tracking-[0.2em]",
              accent.text,
            )}
          >
            <span className="border-b-2 border-current pb-0.5">
              VIEW PROJECT
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        ) : (
          <span
            className={clsx(
              "mt-6 inline-block font-display text-xs tracking-[0.2em]",
              isBlack ? "text-p5-paper-dim/50" : "text-black/40",
            )}
          >
            — 尚未开始 —
          </span>
        )}
      </div>
    </article>
  );
}
