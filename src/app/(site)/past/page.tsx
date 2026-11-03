import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";
import { PageHero } from "@/components/page-hero";
import { PastTimeline } from "@/components/past-timeline";
import { pastEntries } from "@/data/past";

export const metadata: Metadata = {
  title: "THE PAST",
  description: "我的过去 —— 一条关于成长的时间线。",
};

export default function PastPage() {
  return (
    <>
      {/* 页头 */}
      <PageHero
        jp="過去の記録"
        lines={["THE", "PAST"]}
        description="每一条路的起点都平庸，只有在回头看的时候才会显现出必然。这里记录了我从一个只会改背景色的人，走到现在的全部节点。"
      />

      {/* 时间线 */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionTitle
          en="TIMELINE"
          jp="年表"
          note="红色节点代表我自己认定的转折点。"
        />
        <PastTimeline entries={pastEntries} />
      </section>

      {/* 结语 */}
      <section className="border-t-2 border-white/10 bg-p5-ink">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <blockquote className="relative border-l-4 border-p5-red pl-6">
            <p className="font-display text-2xl leading-snug tracking-tight text-p5-paper sm:text-3xl">
              &ldquo;过去不会消失，
              <br className="hidden sm:block" />
              它只是变成了你现在的样子。&rdquo;
            </p>
            <footer className="mt-4 font-serif-jp text-xs tracking-widest text-p5-paper-dim">
              — 写给未来的自己
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
