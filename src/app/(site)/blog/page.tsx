import type { Metadata } from "next";
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import { PageHero } from "@/components/page-hero";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "BLOG",
  description: "技术笔记与思考。",
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        jp="記録"
        lines={["THE", "LOG"]}
        description="关于代码、设计，以及一些还没想清楚的问题。"
      />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <SectionTitle en="ALL POSTS" jp="記事一覧" />
        <div className="space-y-6">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative block"
            >
              <div className="absolute inset-0 translate-x-1 translate-y-1 bg-p5-red/70 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
              <article className="relative border border-white/10 bg-p5-ink p-6 transition-colors group-hover:border-p5-red/50 sm:p-8">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="bg-p5-red px-2 py-0.5 font-display text-[10px] tracking-[0.2em] text-p5-black">
                    {post.category}
                  </span>
                  <time
                    dateTime={post.date}
                    className="font-display text-[11px] tracking-[0.2em] text-p5-paper-dim"
                  >
                    {post.date}
                  </time>
                </div>
                <h2 className="font-display text-xl leading-snug tracking-tight text-p5-paper transition-colors group-hover:text-p5-red sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-p5-paper-dim">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="font-display text-[10px] tracking-wider text-p5-red"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
