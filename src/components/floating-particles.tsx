"use client";

import { useEffect, useRef } from "react";

/**
 * 首页背景的漂浮粒子
 * 用 canvas 绘制，比大量 DOM 元素性能好得多。
 *
 * 特点：
 * - 红色小方块向上飘，边缘淡入淡出
 * - 数量随视口大小自适应，手机上自动减少
 * - 窗口失焦时暂停（省电）
 * - 尊重 prefers-reduced-motion，用户要求减弱动效时完全不启动
 */
export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 用户设置了减弱动效，直接不渲染粒子
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;

    type Particle = {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
    };

    let particles: Particle[] = [];
    let w = 0;
    let h = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 粒子数量随面积自适应：桌面约 40 个，手机自动减少
      const count = Math.round(Math.min(Math.max((w * h) / 32000, 12), 55));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 2 + Math.random() * 5,
        speedY: 0.15 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: 0.15 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.01,
      }));
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        // 飘出顶部后从底部重新进入
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        // 小方块，模仿 P5R 的碎片感
        ctx.fillStyle = "#e60012";
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const onResize = () => {
      setup();
    };
    // 页面切到后台时暂停，省电
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        draw();
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
