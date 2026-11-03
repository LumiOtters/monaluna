import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";
import { PageHero } from "@/components/page-hero";
import { StatBar } from "@/components/stat-bar";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "ABOUT",
  description: "关于我与联系方式。",
};

const facts = [
  { k: "所在地", v: "中国" },
  { k: "身份", v: "大专在读 / 大一新生" },
  { k: "方向", v: "还没定，正在摸索" },
  { k: "在读", v: "Java / 编程基础" },
  { k: "状态", v: "学习中，欢迎交流" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero jp="プロフィール" lines={["PHANTOM", "PROFILE"]} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionTitle en="ABOUT ME" jp="自己紹介" />
            <div className="space-y-5 text-base leading-[1.9] text-p5-paper-dim">
              <p>
                你好，我是{" "}
                <strong className="text-p5-paper">{siteConfig.name}</strong>，
                一个刚上大一的大专新生。
              </p>
              <p>
                说实话，我接触这一行的时间很短。在这之前，我对电脑的全部理解
                就是「能上网、能打游戏」。真正开始学编程，也就是最近这一年的事。
              </p>
              <p>
                至于方向 —— 老实说，我还没想好。前端试过一点，但我发现
                自己更想先从基础的编程语言入手，Java 算是一个起点。
                先把手上的东西弄明白，再决定往哪走，也不迟。
              </p>
              <p>
                这个网站是我拿来练手的第一件东西。需要说明的是，
                它的代码完全由 AI 完成，没有一行是我自己敲的，
                <span className="relative inline-block">
                  <span className="relative z-10">因为我是纯小白</span>
                  <span
                    className="absolute left-0 top-1/2 z-20 h-[2px] w-full -translate-y-1/2 bg-p5-paper-dim"
                    aria-hidden="true"
                  />
                </span>
                。我的角色是「提出想法、看着它一点点变成这样」。
                可能做得不算专业，但它确实让我第一次完整地看到了一个项目的样子。
              </p>
              <p>
                如果你也是刚起步，或者看到这里有什么可以指点的地方，
                欢迎随时找我聊聊。
              </p>
            </div>

            {/* 基本信息表 */}
            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <dt className="font-display text-[11px] tracking-[0.25em] text-p5-red">
                    {f.k}
                  </dt>
                  <dd className="text-right text-sm text-p5-paper">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 侧栏：属性 + 联系方式 */}
          <div className="space-y-10">
            <div className="relative">
              <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-p5-red" />
              <div className="relative bg-p5-ink p-6">
                <p className="mb-6 font-display text-[11px] tracking-[0.3em] text-p5-paper-dim">
                  STATUS / 能力值
                </p>
                <div className="space-y-5">
                  {siteConfig.stats.map((s, i) => (
                    <StatBar
                      key={s.label}
                      label={s.label}
                      value={s.value}
                      note={s.note}
                      delay={i * 120}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-p5-red p-6">
              <p className="mb-4 font-display text-[11px] tracking-[0.3em] text-p5-black/70">
                CONTACT / 連絡先
              </p>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="block font-display text-sm tracking-wider text-p5-black underline-offset-4 hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.contact.github}
                    className="block font-display text-sm tracking-wider text-p5-black underline-offset-4 hover:underline"
                  >
                    GitHub →
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.contact.bilibili}
                    className="block font-display text-sm tracking-wider text-p5-black underline-offset-4 hover:underline"
                  >
                    Bilibili →
                  </a>
                </li>
                <li className="font-display text-sm tracking-wider text-p5-black">
                  QQ {siteConfig.contact.qq}
                </li>
              </ul>
              <p className="mt-6 border-t border-p5-black/20 pt-4 font-serif-jp text-[11px] leading-relaxed text-p5-black/60">
                邮件回复最快。交流、合作、或者只是想打个招呼，都欢迎。
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
