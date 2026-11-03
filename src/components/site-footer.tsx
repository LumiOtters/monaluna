import Link from "next/link";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t-4 border-p5-red bg-p5-black">
      {/* 底部跑马灯 */}
      <div className="flex overflow-hidden border-b-2 border-p5-red/40 bg-p5-red py-2">
        <div className="flex shrink-0 animate-p5-marquee gap-8 whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-sm tracking-[0.2em] text-p5-black"
            >
              TAKE YOUR HEART ★ {siteConfig.codename} ★
            </span>
          ))}
        </div>
        <div
          className="flex shrink-0 animate-p5-marquee gap-8 whitespace-nowrap"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-sm tracking-[0.2em] text-p5-black"
            >
              TAKE YOUR HEART ★ {siteConfig.codename} ★
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl leading-none tracking-tight text-p5-paper sm:text-6xl">
            SEE YOU
            <br />
            <span className="text-p5-red">NEXT TIME.</span>
          </p>
          <p className="mt-4 max-w-md text-sm text-p5-paper-dim">
            また会おう。 — 这个站点的每一行代码都值得被认真对待。
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-xs tracking-[0.2em] text-p5-paper-dim transition-colors hover:text-p5-red"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-display text-xs tracking-[0.2em] text-p5-paper transition-colors hover:text-p5-red"
            >
              EMAIL
            </a>
            <a
              href={siteConfig.contact.github}
              className="font-display text-xs tracking-[0.2em] text-p5-paper transition-colors hover:text-p5-red"
            >
              GITHUB
            </a>
            <a
              href={siteConfig.contact.bilibili}
              className="font-display text-xs tracking-[0.2em] text-p5-paper transition-colors hover:text-p5-red"
            >
              BILIBILI
            </a>
            <span className="font-display text-xs tracking-[0.2em] text-p5-paper-dim">
              QQ {siteConfig.contact.qq}
            </span>
          </div>
          <p className="text-xs text-p5-paper-dim/60">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
          </p>
          <Disclosure />
        </div>
      </div>
    </footer>
  );
}

/**
 * 诚实声明
 * 全站页脚共用，所以每个页面都能看到。
 */
function Disclosure() {
  return (
    <p className="mt-4 max-w-sm text-xs leading-relaxed text-p5-paper-dim/70 md:text-right">
      此网页{" "}
      <strong className="font-display tracking-wider text-p5-red">
        100.00%
      </strong>{" "}
      由{" "}
      <strong className="font-display tracking-wider text-p5-paper">
        DeepSeek Harness
      </strong>{" "}
      帮助构建，
      <span className="relative inline-block">
        <span className="relative z-10">我可不会写这么牛逼的项目</span>
        <span
          className="absolute left-0 top-1/2 z-20 h-[2px] w-full -translate-y-1/2 bg-p5-red"
          aria-hidden="true"
        />
      </span>
      。
    </p>
  );
}
