import { type CaseStudyBriefType } from "../types"
import { useTranslations } from "next-intl"

export const StudyCard = ({ story }: { story: CaseStudyBriefType }) => {
  const t = useTranslations("Home_New.case-studies")

  return (
    <div className="flex min-h-20 flex-col justify-between gap-6 overflow-hidden bg-night-panel p-6 text-white">
      <div>
        <span className="font-mono text-3.5 tracking-[.11em] text-white/40 uppercase">
          {t(`captions.${story.visual}`)}
        </span>
      </div>

      <div>
        <strong className="block text-[clamp(2.6rem,3.4vw,3.7rem)] leading-[.85] font-[520] tracking-[-.07em]">
          {story.stat}
        </strong>
        <small className="mt-2.5 block text-4.5 font-[450] text-white/55">
          {story.metric}
        </small>
      </div>
    </div>
  )
}
