import { type CaseStudyBriefType } from "../types"

const captions = {
  crisis: "Response time",
  coverage: "Coverage, last 14 days",
  insights: "Where the volume comes from",
} as const

export const StudyCard = ({ story }: { story: CaseStudyBriefType }) => (
  // Kept unchanged: The parent grid now perfectly handles the outer corner rounding.
  <div className="flex min-h-20 flex-col justify-between gap-6 overflow-hidden bg-night-panel p-6 text-white">
    <div>
      <span className="font-mono text-2.5 tracking-[.11em] text-white/40 uppercase">
        {captions[story.visual as keyof typeof captions]}
      </span>
    </div>

    <div>
      <strong className="block text-[clamp(2.4rem,3.2vw,3.4rem)] leading-[.85] font-[520] tracking-[-.07em]">
        {story.stat}
      </strong>
      <small className="mt-2.5 block text-2.875 font-[450] text-white/55">
        {story.metric}
      </small>
    </div>
  </div>
)