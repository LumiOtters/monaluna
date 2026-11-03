"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 路由变化时收起移动端菜单
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b-2 border-p5-red bg-p5-black/95 backdrop-blur-sm"
          : "border-b-2 border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo —— 斜切红块 */}
        <Link
          href="/"
          className="group relative flex min-h-10 items-center gap-3"
          aria-label="回到首页"
        >
          <span className="relative block bg-p5-red px-3 py-1 p5-skew">
            <span className="block p5-unskew font-display text-lg leading-none tracking-tight text-p5-black">
              {siteConfig.codename.split(" ")[0]}
            </span>
          </span>
          {/* 代号与名字相同时不再重复显示 */}
          {siteConfig.name !== siteConfig.codename && (
            <span className="hidden font-display text-sm tracking-[0.2em] text-p5-paper-dim sm:block">
              {siteConfig.name}
            </span>
          )}
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "group relative px-4 py-2 font-display text-sm tracking-wider transition-colors",
                  active ? "text-p5-black" : "text-p5-paper hover:text-p5-red",
                )}
              >
                {/* 激活态的背景斜块 */}
                <span
                  className={clsx(
                    "absolute inset-0 -z-10 origin-left bg-p5-red p5-skew transition-transform duration-300",
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
                <span className="relative flex items-baseline gap-2">
                  {item.label}
                  <span className="font-serif-jp text-[10px] opacity-60">
                    {item.jp}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* 移动端汉堡 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 bg-p5-red md:hidden"
          aria-expanded={open}
          aria-label="打开菜单"
        >
          <span
            className={clsx(
              "block h-0.5 w-5 bg-p5-black transition-transform",
              open && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-5 bg-p5-black transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-5 bg-p5-black transition-transform",
              open && "-translate-y-2 -rotate-45",
            )}
          />
        </button>
      </div>

      {/* 移动端全屏菜单 */}
      <div
        className={clsx(
          "fixed inset-0 z-40 flex flex-col justify-center bg-p5-black px-8 transition-[clip-path] duration-500 md:hidden",
          open
            ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "pointer-events-none [clip-path:polygon(0_0,0_0,0_100%,0_100%)]",
        )}
      >
        <div className="absolute inset-0 -z-10 p5-dots opacity-20" />
        <nav className="flex flex-col gap-2">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-4 border-b border-white/10 py-4"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-display text-xs text-p5-red">
                0{i + 1}
              </span>
              <span className="font-display text-3xl tracking-tight text-p5-paper transition-colors group-hover:text-p5-red">
                {item.label}
              </span>
              <span className="font-serif-jp text-xs text-p5-paper-dim">
                {item.jp}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
