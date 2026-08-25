import { MilestoneCard } from "./MilestoneCard"

import { MILESTONES } from "../constants"

import { hasReached } from "../helpers"
import { cn } from "@/lib/utils"

const progressFill =
  "bg-[linear-gradient(90deg,var(--timeline-start),var(--brand),var(--brand-dark))]"

export const HorizontalTimeline = ({ progress }: { progress: number }) => (
  <div className="absolute inset-x-[8%] top-28 h-px bg-timeline-line">
    <div
      className={cn(
        "absolute -inset-y-1 left-0 origin-left rounded-full motion-reduce:transition-none",
        progressFill
      )}
      style={{ width: `${progress * 100}%` }}
    />
    <span
      className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-timeline-ink ring-10 ring-brand/18"
      style={{ left: `${progress * 100}%` }}
      aria-hidden="true"
    />

    {/* One mark per milestone — the track carries no decorative ruler. */}
    {MILESTONES.map((milestone) => (
      <span
        className="absolute top-1/2 h-20 w-px -translate-x-1/2 -translate-y-1/2 bg-timeline-tick"
        style={{ left: `${milestone.at * 100}%` }}
        key={milestone.title}
        aria-hidden="true"
      >
        <i className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-timeline-dot" />
      </span>
    ))}

    {MILESTONES.map((milestone) => {
      const reached = hasReached(progress, milestone)

      return (
        <div
          className={cn(
            "absolute bottom-8.5 w-72 -translate-x-1/2 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
            reached ? "opacity-100" : "opacity-20"
          )}
          style={{ left: `${milestone.at * 100}%` }}
          key={milestone.title}
        >
          <MilestoneCard
            milestone={milestone}
            orientation="horizontal"
            reached={reached}
          />
        </div>
      )
    })}
  </div>
)
