"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** 0 - 100 */
  value: number;
  label: string;
  note?: string;
  /** 延迟毫秒，用于错峰动画 */
  delay?: number;
};

/**
 * 人格类型数值条 —— 对应 P5R 的 CONFIDENCE / CHARM 等属性
 * 进入视口时才播放填充动画
 */
export function StatBar({ value, label, note, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 不支持 IntersectionObserver 时直接显示
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="group">
      <div className="mb-1 flex items-end justify-between gap-3">
        <span className="font-display text-xs tracking-[0.18em] text-p5-paper">
          {label}
        </span>
        <span className="font-display text-lg leading-none text-p5-red">
          {value}
        </span>
      </div>
      <div className="relative h-3 bg-white/10">
        {/* 填充条 */}
        <div
          className="absolute inset-y-0 left-0 bg-p5-red transition-[width] duration-[1200ms] ease-out"
          style={{
            width: shown ? `${value}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        >
          {/* 末端的小尖角 */}
          <span className="absolute -right-1 top-0 h-3 w-2 bg-p5-red [clip-path:polygon(0_0,100%_50%,0_100%)]" />
        </div>
        {/* 分段刻度 */}
        <div className="pointer-events-none absolute inset-0 flex justify-between">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="w-px bg-p5-black/60" />
          ))}
        </div>
      </div>
      {note && (
        <p className="mt-1 text-xs text-p5-paper-dim/70">{note}</p>
      )}
    </div>
  );
}
