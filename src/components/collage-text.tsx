"use client";

import { useMemo } from "react";
import clsx from "clsx";

/**
 * ============================================================
 * CollageText —— P5R 预告状式「剪报拼贴字」
 * ============================================================
 * 把一行文字按字符拆开，每个字独立成一个方块：
 *   - 随机轻微倾斜（-7° ~ +7°）
 *   - 黑底白字 / 红底白字 / 黑底红字 三种配色随机分配
 *   - 方块之间留出小缝隙，模仿剪下来又贴上去的错位感
 *
 * 倾斜角度由字符索引做种子确定性生成，
 * 这样服务端渲染和客户端水合的结果一致，不会出现闪烁。
 */

type Props = {
  /** 要拼贴的文字 */
  text: string;
  /** 种子，同一页面多次使用时给不同值可让排版不同 */
  seed?: number;
  /** 字号档位 */
  size?: "sm" | "md" | "lg" | "hero";
  /** 是否额外加描边/阴影，适合大标题 */
  className?: string;
};

const sizeClass: Record<NonNullable<Props["size"]>, string> = {
  sm: "text-lg sm:text-xl px-1.5 py-0.5",
  md: "text-2xl sm:text-3xl px-2 py-1",
  lg: "text-4xl sm:text-5xl px-2.5 py-1.5",
  hero: "text-5xl sm:text-7xl lg:text-8xl px-3 py-2",
};

/** 简单的确定性伪随机：同一 (seed, index) 永远得到同一结果 */
function pseudoRandom(seed: number, index: number, salt: number): number {
  const x = Math.sin(seed * 9301 + index * 49297 + salt * 233280) * 10000;
  return x - Math.floor(x);
}

/** 三种剪报块配色 */
const variants = [
  "bg-p5-black text-p5-paper", // 黑底白字
  "bg-p5-red text-p5-paper", // 红底白字
  "bg-p5-black text-p5-red", // 黑底红字
] as const;

export function CollageText({
  text,
  seed = 1,
  size = "md",
  className,
}: Props) {
  // 用 useMemo 缓存，避免重渲染时角度跳变
  const chars = useMemo(() => {
    return Array.from(text).map((char, i) => {
      const rotate = (pseudoRandom(seed, i, 1) - 0.5) * 14; // -7° ~ +7°
      const variantIndex = Math.floor(pseudoRandom(seed, i, 2) * 3);
      const offsetY = (pseudoRandom(seed, i, 3) - 0.5) * 6; // -3px ~ +3px
      return {
        char,
        rotate,
        variant: variants[variantIndex],
        offsetY,
        // 空格不做方块，只占位
        isSpace: char === " ",
      };
    });
  }, [text, seed]);

  return (
    <span
      className={clsx(
        "inline-flex flex-wrap items-center gap-1.5",
        size === "hero" && "gap-2",
        className,
      )}
      // 读屏器读原文，而不是逐字
      aria-label={text}
      role="text"
    >
      {chars.map((c, i) =>
        c.isSpace ? (
          <span key={`sp-${i}`} className="inline-block w-2" aria-hidden="true" />
        ) : (
          <span
            key={`${c.char}-${i}`}
            aria-hidden="true"
            className={clsx(
              "inline-block font-display leading-none tracking-tight",
              "shadow-[2px_2px_0_rgba(0,0,0,0.5)]",
              sizeClass[size],
              c.variant,
            )}
            style={{
              transform: `rotate(${c.rotate.toFixed(2)}deg) translateY(${c.offsetY.toFixed(1)}px)`,
            }}
          >
            {c.char}
          </span>
        ),
      )}
    </span>
  );
}
