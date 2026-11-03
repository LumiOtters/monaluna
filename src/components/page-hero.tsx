import { CollageText } from "@/components/collage-text";

type Props = {
  /** 日文小标签 */
  jp: string;
  /** 主标题，按行传入。数组每一项渲染成一行拼贴字 */
  lines: string[];
  /** 说明文字 */
  description?: string;
  /** 子元素（如统计数字） */
  children?: React.ReactNode;
};

/**
 * 页面级大标题区（作品 / 关于 / 博客 / 过去 共用）
 * 剪报拼贴字 + 速度线背景
 */
export function PageHero({ jp, lines, description, children }: Props) {
  return (
    <section className="relative overflow-hidden border-b-2 border-p5-red/40 bg-p5-black">
      <div className="pointer-events-none absolute inset-0 opacity-[0.13] p5-speedlines" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className="mb-5 font-serif-jp text-sm tracking-[0.3em] text-p5-red">
          {jp}
        </p>

        <h1 className="m-0 font-display leading-none tracking-tighter">
          {lines.map((line, i) => (
            <span key={line} className="block py-1">
              <CollageText text={line} seed={i * 31 + line.length * 5} size="hero" />
            </span>
          ))}
        </h1>

        {description && (
          <p className="mt-8 max-w-xl border-l-4 border-p5-red pl-4 leading-relaxed text-p5-paper-dim">
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
