import { type SampleType } from "../types"

import { cn } from "@/lib/utils"

const toneStyles = {
  negative: "text-coral",
  positive: "text-brand-dark",
  mixed: "text-ink",
} as const
const toneDots = {
  negative: "bg-coral",
  positive: "bg-brand-dark",
  mixed: "bg-ink",
} as const

export const SampleRow = ({ sample }: { sample: SampleType }) => {
  const isArabic = sample.script === "arabic"

  return (
    <article className="grid grid-cols-[1fr_auto] items-start gap-8 border border-line bg-white p-5.5 rounded-3xl max-sm:grid-cols-1 max-sm:gap-4 max-sm:p-4.5">
      <div className="min-w-0">
        <span className="font-mono text-2.5 tracking-[.11em] text-ui-muted uppercase">
          {sample.dialect}
        </span>
        <p
          className={cn(
            "mt-2.5 text-4.25 leading-[1.55] font-[480] text-ink max-sm:text-4",
            isArabic && "text-right max-sm:text-right"
          )}
          dir={isArabic ? "rtl" : undefined}
          lang={isArabic ? "ar" : undefined}
        >
          {sample.post}
        </p>
        <p className="mt-2 text-3.25 leading-normal text-copy italic">
          {sample.gloss}
        </p>
      </div>

      <div className="w-37.5 shrink-0 border-l border-line pl-5 max-sm:w-full max-sm:border-t max-sm:border-l-0 max-sm:pt-3.5 max-sm:pl-0">
        <p
          className={cn(
            "flex items-center gap-2 text-3.25 font-[520] tracking-[-.015em]",
            toneStyles[sample.tone]
          )}
        >
          <i
            className={cn(
              "size-1.75 shrink-0 rounded-full",
              toneDots[sample.tone]
            )}
            aria-hidden
          />
          {sample.verdict}
        </p>
        <p className="mt-1.5 text-2.75 leading-[1.45] text-label">
          {sample.tags}
        </p>
      </div>
    </article>
  )
}
