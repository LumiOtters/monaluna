import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "NOT FOUND" };
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = posts[idx - 1];
  const next = posts[idx + 1];

  return (
    <article>
      {/* 文章头 */}
      <header className="relative overflow-hidden border-b-2 border-p5-red/40 bg-p5-black">
        <div className="pointer-events-none absolute inset-0 opacity-[0.13] p5-speedlines" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 font-display text-[11px] tracking-[0.25em] text-p5-paper-dim transition-colors hover:text-p5-red"
          >
            ← BACK TO LOG
          </Link>
          <div className="mb-4 flex flex-wrap items-center gap-3">
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
          <h1 className="font-display text-3xl leading-[1.05] tracking-tight text-p5-paper sm:text-5xl">
            {post.title}
          </h1>
        </div>
      </header>

      {/* 正文 */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="mb-10 border-l-4 border-p5-red pl-4 text-lg leading-relaxed text-p5-paper">
          {post.excerpt}
        </p>
        <div className="space-y-6 text-base leading-[1.9] text-p5-paper-dim">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-6">
          {post.tags.map((t) => (
            <span
              key={t}
              className="bg-p5-red/15 px-3 py-1 font-display text-[10px] tracking-wider text-p5-red"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* 上下篇 */}
        <nav className="mt-16 grid gap-4 border-t-2 border-white/10 pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group border border-white/10 p-5 transition-colors hover:border-p5-red"
            >
              <span className="font-display text-[10px] tracking-[0.25em] text-p5-paper-dim">
                ← PREV
              </span>
              <span className="mt-2 block font-display text-base text-p5-paper transition-colors group-hover:text-p5-red">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group border border-white/10 p-5 text-right transition-colors hover:border-p5-red sm:col-start-2"
            >
              <span className="font-display text-[10px] tracking-[0.25em] text-p5-paper-dim">
                NEXT →
              </span>
              <span className="mt-2 block font-display text-base text-p5-paper transition-colors group-hover:text-p5-red">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}
