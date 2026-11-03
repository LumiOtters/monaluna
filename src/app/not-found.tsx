import Link from "next/link";
// 全局 404 不在 (site) 路由组内，需要自己引入站点外壳
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-p5-black">
          <div className="pointer-events-none absolute inset-0 opacity-[0.13] p5-speedlines" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-4 font-serif-jp text-sm tracking-[0.3em] text-p5-red">
              ページが見つかりません
            </p>
            <h1 className="font-display text-[22vw] leading-[0.8] tracking-tighter text-p5-paper sm:text-[14rem]">
              404
            </h1>
            <p className="mt-6 max-w-md border-l-4 border-p5-red pl-4 text-p5-paper-dim">
              你走进了认知世界里一个不存在的房间。
            </p>
            <Link
              href="/"
              className="mt-10 inline-block bg-p5-red px-8 py-3 p5-skew"
            >
              <span className="block p5-unskew font-display text-sm tracking-[0.2em] text-p5-black">
                RETURN HOME
              </span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
