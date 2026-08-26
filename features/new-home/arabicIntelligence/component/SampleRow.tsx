import { cn } from "@/lib/utils"
import { type SampleType } from "../types"

const getToneKey = (tone: string) => {
  // Normalize to handle common cases across locales, converts to lower-case and English keywords
  // Accepts both English and Arabic values, returns one of: 'negative', 'positive', 'mixed'
  const toneMap: Record<string, "negative" | "positive" | "mixed"> = {
    negative: "negative",
    "سلبي": "negative",
    positive: "positive",
    "إيجابي": "positive",
    mixed: "mixed",
    "مختلط": "mixed",
    "neutral": "mixed",
    "محايد": "mixed",
  }
  // Accept fallback: if tone is unknown, default to mixed
  return toneMap[tone?.toLowerCase?.() || ""] || "mixed"
}

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
  const toneKey = getToneKey(sample.tone)

  return (
    <article className="grid grid-cols-[1fr_auto] items-start gap-8 border border-line bg-white p-5.5 rounded-3xl max-sm:grid-cols-1 max-sm:gap-4 max-sm:p-4.5">
      <div className="min-w-0">
        {/* Increased from text-2.5 to text-3 */}
        <span className="font-mono text-3 tracking-[.11em] text-ui-muted uppercase">
          {sample.dialect}
        </span>
        <p
          className={cn(
            // Increased from text-4.25 to text-4.75 and max-sm:text-4 to max-sm:text-4.5
            "mt-2.5 text-4.75 leading-[1.55] font-[480] text-ink max-sm:text-4.5",
            isArabic && "text-right max-sm:text-right"
          )}
          dir={isArabic ? "rtl" : undefined}
          lang={isArabic ? "ar" : undefined}
        >
          {sample.post}
        </p>
        {/* Increased from text-3.25 to text-3.75 */}
        <p className="mt-2 text-3.75 leading-normal text-copy italic">
          {sample.gloss}
        </p>
      </div>

      <div className="w-37.5 shrink-0 border-s border-line ps-5 max-sm:w-full max-sm:border-t max-sm:border-s-0 max-sm:pt-3.5 max-sm:ps-0">
        <p
          className={cn(
            // Increased from text-3.25 to text-3.75
            "flex items-center gap-2 text-3.75 font-[520] tracking-[-.015em]",
            toneStyles[toneKey]
          )}
        >
          <i
            className={cn(
              "size-1.75 shrink-0 rounded-full",
              toneDots[toneKey]
            )}
            aria-hidden
          />
          {sample.verdict}
        </p>
        {/* Increased from text-2.75 to text-3.25 */}
        <p className="mt-1.5 text-3.25 leading-[1.45] text-label">
          {sample.tags}
        </p>
      </div>
    </article>
  )
}