import clsx from "clsx";
import { CollageText } from "@/components/collage-text";

type Props = {
  /** 英文主标题 */
  en: string;
  /** 日文副标题 */
  jp?: string;
  /** 说明文字 */
  note?: string;
  className?: string;
};

/**
 * P5R 预告状式章节标题：
 * 逐字剪报拼贴 + 左侧红色引导条 + 日文小字
 */
export function SectionTitle({ en, jp, note, className }: Props) {
  return (
    <div className={clsx("relative mb-12", className)}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        {/* 左侧红色小方块引导 */}
        <span className="hidden h-10 w-2 shrink-0 self-center bg-p5-red sm:block" />

        <h2 className="relative m-0 font-display leading-none">
          {/* 用标题文本做种子，同一标题每次排版稳定 */}
          <CollageText text={en} seed={en.length * 7} size="lg" />
        </h2>

        {jp && (
          <span className="font-serif-jp text-xs text-p5-red sm:text-sm">
            {jp}
          </span>
        )}

        {/* 延伸的细线 */}
        <div className="hidden flex-1 self-center border-t-2 border-p5-red/30 sm:block" />
      </div>

      {note && (
        <p className="mt-5 max-w-2xl border-l-2 border-p5-red/40 pl-3 text-sm leading-relaxed text-p5-paper-dim">
          {note}
        </p>
      )}
    </div>
  );
}
