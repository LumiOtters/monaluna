import clsx from "clsx";
import type { PastEntry } from "@/data/past";

/**
 * 「我的过去」时间线条目
 * 用 P5R 的「日历 / 回忆」视觉：左侧年份斜块，右侧撕纸卡片
 */
export function PastTimeline({ entries }: { entries: PastEntry[] }) {
  return (
    <ol className="relative space-y-10">
      {/* 竖向红线 */}
      <div
        className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-p5-red/40 sm:left-[11px]"
        aria-hidden="true"
      />

      {entries.map((entry, i) => (
        <li key={entry.title} className="relative pl-10 sm:pl-16">
          {/* 时间轴节点 */}
          <span
            className={clsx(
              "absolute left-0 top-2 flex h-4 w-4 items-center justify-center sm:h-6 sm:w-6",
              entry.turningPoint ? "bg-p5-red" : "bg-p5-paper",
            )}
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 bg-p5-black" />
          </span>

          {/* 年份标签 */}
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className={clsx(
                "px-3 py-1 font-display text-xs tracking-[0.2em] p5-skew",
                entry.turningPoint
                  ? "bg-p5-red text-p5-black"
                  : "bg-p5-paper text-p5-black",
              )}
            >
              <span className="block p5-unskew">{entry.period}</span>
            </span>
            <span className="font-serif-jp text-xs text-p5-paper-dim">
              {entry.place}
            </span>
            {entry.turningPoint && (
              <span className="border border-p5-yellow px-2 py-0.5 font-display text-[10px] tracking-[0.2em] text-p5-yellow">
                TURNING POINT
              </span>
            )}
          </div>

          {/* 内容卡片 */}
          <div className="group relative border-l-2 border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-p5-red hover:bg-white/[0.06] sm:p-6">
            <h3
              className="font-display text-xl leading-tight tracking-tight text-p5-paper sm:text-2xl"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {entry.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-p5-paper-dim">
              {entry.body}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.keywords.map((k) => (
                <span
                  key={k}
                  className="bg-p5-red/15 px-2 py-0.5 font-display text-[10px] tracking-wider text-p5-red"
                >
                  #{k}
                </span>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
