import Link from "next/link";
import { Hero } from "@/components/hero";
import { SectionTitle } from "@/components/section-title";
import { ProjectCard } from "@/components/project-card";
import { StatBar } from "@/components/stat-bar";
import { CollageText } from "@/components/collage-text";
import { projects } from "@/data/projects";
import { posts } from "@/data/posts";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  const latestPosts = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  const featured = projects.slice(0, 3);

  return (
    <>
      <Hero />

      {/* ---------- 自我介绍 / 属性 ---------- */}
      <section className="relative border-y-2 border-white/10 bg-p5-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionTitle en="WHO AM I" jp="自己紹介" />
            <p className="text-lg leading-relaxed text-p5-paper">
              {siteConfig.bio}
            </p>
            <p className="mt-6 leading-relaxed text-p5-paper-dim">
              我接触编程的时间不长，方向也还没想好，现在主要先把基础打牢。
              这个站点是我拿来练手的第一件东西 —— 一边学，一边改。
              也许几年后再回来看会觉得它很幼稚，但那也说明我确实往前走了。
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/past"
                className="group flex items-center gap-2 border-2 border-p5-red px-5 py-2 transition-colors hover:bg-p5-red"
              >
                <span className="font-display text-xs tracking-[0.2em] text-p5-red transition-colors group-hover:text-p5-black">
                  我的过去
                </span>
                <span className="text-p5-red transition-colors group-hover:text-p5-black">
                  →
                </span>
              </Link>
              <Link
                href="/blog"
                className="flex items-center gap-2 px-5 py-2 font-display text-xs tracking-[0.2em] text-p5-paper-dim transition-colors hover:text-p5-paper"
              >
                阅读文章 →
              </Link>
            </div>
          </div>

          {/* 属性面板 */}
          <div className="relative self-center">
            <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-p5-red" />
            <div className="relative bg-p5-black p-6 sm:p-8">
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
        </div>
      </section>

      {/* ---------- 精选作品 ---------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionTitle
          en="SELECTED WORK"
          jp="作品"
          note="我还是一年级新生，作品集才刚起步。这里先列出接下来的计划 —— 做出来一件，就填上一件。"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-block border-2 border-p5-paper px-10 py-3 p5-skew transition-colors hover:border-p5-red hover:bg-p5-red"
          >
            <span className="block p5-unskew font-display text-sm tracking-[0.25em] text-p5-paper transition-colors hover:text-p5-black">
              ALL PROJECTS
            </span>
          </Link>
        </div>
      </section>

      {/* ---------- 最新文章 ---------- */}
      <section className="relative border-t-2 border-white/10 bg-p5-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <SectionTitle en="LATEST LOG" jp="記事" />
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-2 py-6 transition-colors hover:bg-white/[0.03] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
                >
                  <span className="font-display text-xs tracking-[0.2em] text-p5-red">
                    {post.date}
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    <span className="block font-display text-lg leading-snug text-p5-paper transition-colors group-hover:text-p5-red sm:text-xl">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-sm text-p5-paper-dim">
                      {post.excerpt}
                    </span>
                  </span>
                  <span className="font-serif-jp text-xs text-p5-paper-dim">
                    {post.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 结尾 CTA ---------- */}
      <section className="relative overflow-hidden bg-p5-red">
        <div className="pointer-events-none absolute inset-0 opacity-25 p5-dots" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
          <p className="font-serif-jp text-sm tracking-widest text-p5-black/70">
            心を盗め。
          </p>
          <h2 className="m-0 font-display leading-none tracking-tighter">
            <span className="block py-1">
              <CollageText text="LET'S WORK" seed={91} size="hero" />
            </span>
            <span className="block py-1">
              <CollageText text="TOGETHER" seed={47} size="hero" />
            </span>
          </h2>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-4 border-4 border-p5-black px-10 py-4 font-display text-sm tracking-[0.25em] text-p5-black transition-colors hover:bg-p5-black hover:text-p5-red"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      </section>
    </>
  );
}
