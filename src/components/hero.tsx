"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { siteConfig } from "@/data/site";
import { CollageText } from "@/components/collage-text";

/**
 * 首页 Hero —— P5R 启动画面感
 * 大标题逐行飞入 + 背景速度线 + 网点
 */
export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const lines = siteConfig.heroTitle;

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-p5-black">
      {/* 背景：速度线 + 网点 */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18] p5-speedlines" />
      <div className="pointer-events-none absolute inset-0 opacity-30 p5-dots" />

      {/* 斜向红色条纹带 —— 增强冲击力 */}
      <div
        className="pointer-events-none absolute -left-10 top-[16%] h-24 w-[130%] -rotate-6 bg-p5-red/10 [background-image:repeating-linear-gradient(90deg,transparent_0_40px,rgba(230,0,18,0.4)_40px_60px)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-10 bottom-[20%] h-16 w-[130%] rotate-3 bg-p5-red/10 [background-image:repeating-linear-gradient(90deg,transparent_0_28px,rgba(230,0,18,0.28)_28px_44px)]"
        aria-hidden="true"
      />

      {/* 巨大的旋转红圈 */}
      <div className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 md:block">
        <div className="relative h-[36rem] w-[36rem] animate-p5-spin-slow rounded-full border-[3px] border-p5-red/40">
          <div className="absolute inset-8 rounded-full border-2 border-dashed border-p5-red/25" />
          <div className="absolute inset-20 rounded-full border border-p5-red/20" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        {/* 顶部分类标签 */}
        <div
          className={clsx(
            "mb-8 inline-flex items-center gap-3 bg-p5-red px-4 py-1 p5-skew transition-all duration-700",
            mounted ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
          )}
        >
          <span className="p5-unskew font-display text-[11px] tracking-[0.3em] text-p5-black">
            PERSONAL SITE / 2026
          </span>
        </div>

        {/* 主标题：剪报拼贴字，逐行飞入 */}
        <h1 className="m-0 font-display leading-[0.85] tracking-tighter">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden py-1">
              <span
                className={clsx(
                  "block transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0",
                )}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <CollageText text={line} seed={i * 13 + 3} size="hero" />
              </span>
            </span>
          ))}
        </h1>

        {/* 副标题 + CTA */}
        <div
          className={clsx(
            "mt-10 flex flex-col gap-8 transition-all delay-500 duration-700 sm:flex-row sm:items-end sm:justify-between",
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <p className="max-w-md border-l-4 border-p5-red pl-4 pr-4 text-sm leading-relaxed text-p5-paper-dim sm:text-base">
            {siteConfig.bio}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/work"
              className="group relative overflow-hidden bg-p5-red px-6 py-3 p5-skew sm:px-8"
            >
              <span className="relative z-10 block p5-unskew font-display text-xs tracking-[0.2em] text-p5-black sm:text-sm">
                VIEW WORK →
              </span>
              <span className="absolute inset-0 z-0 origin-bottom scale-y-0 bg-p5-paper transition-transform duration-300 group-hover:scale-y-100" />
            </Link>
            <Link
              href="/about"
              className="border-2 border-p5-paper px-6 py-3 p5-skew transition-colors hover:bg-p5-paper sm:px-8"
            >
              <span className="block p5-unskew font-display text-xs tracking-[0.2em] text-p5-paper transition-colors hover:text-p5-black sm:text-sm">
                ABOUT ME
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[10px] tracking-[0.4em] text-p5-paper-dim">
            SCROLL
          </span>
          <span className="block h-10 w-px bg-gradient-to-b from-p5-red to-transparent" />
        </div>
      </div>
    </section>
  );
}
