import { MilestoneCard } from "./MilestoneCard"

import { MILESTONES } from "../constants"

import { hasReached } from "../helpers"
import { cn } from "@/lib/utils"

const progressFill =
  "bg-[linear-gradient(180deg,var(--timeline-start),var(--brand),var(--brand-dark))]"

export const VerticalTimeline = ({ progress }: { progress: number }) => (
  <div className="absolute top-0 bottom-0 left-2.25 w-px bg-timeline-line">
    <div
      className={cn(
        "absolute -inset-x-0.5 top-0 origin-top rounded-full",
        progressFill
      )}
      style={{ height: `${progress * 100}%` }}
    />
    <span
      className="absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-timeline-ink ring-8 ring-brand/18"
      style={{ top: `${progress * 100}%` }}
      aria-hidden="true"
    />

    {MILESTONES.map((milestone) => (
      <div
        className="absolute left-0 w-[calc(100vw-76px)] -translate-y-1/2 pl-8"
        style={{ top: `${milestone.at * 100}%` }}
        key={milestone.title}
      >
        <i className="absolute top-1/2 left-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-timeline-dot" />
        <MilestoneCard
          milestone={milestone}
          orientation="vertical"
          reached={hasReached(progress, milestone)}
        />
      </div>
    ))}
  </div>
)
