import { type MilestoneType, type TimelineOrientationType } from "../types"

import { cn } from "@/lib/utils"

/**
 * One step on the track. The two orientations carry the same content at
 * different scales, and reveal it the same way: the card holds its position
 * and only fades up — the horizontal one under a wrapper that owns its
 * opacity, the vertical one on its own.
 *
 * Every card on a track is the same height. Left to size themselves, a detail
 * that wraps onto a second line makes its card taller than the rest, which
 * reads as three misaligned boxes rather than one sequence — so each
 * orientation reserves the height of its longest step and centres whatever
 * copy it is given inside it.
 */
export const MilestoneCard = ({
  milestone,
  orientation,
  reached,
}: {
  milestone: MilestoneType
  orientation: TimelineOrientationType
  reached: boolean
}) => {
  const isHorizontal = orientation === "horizontal"

  return (
    <div
      className={cn(
        "flex flex-col justify-center border bg-white duration-300",
        isHorizontal
          ? "min-h-23 px-4.5 py-4 transition-[border-color,box-shadow]"
          : "min-h-20 px-4 py-3 transition-[opacity,border-color] motion-reduce:transition-none",
        reached ? "border-timeline-active" : "border-timeline-card",
        isHorizontal && reached && "shadow-soft",
        !isHorizontal && (reached ? "opacity-100" : "opacity-25")
      )}
    >
      <strong
        className={cn(
          "block leading-tight font-medium",
          isHorizontal ? "text-4 tracking-tight" : "text-3.75"
        )}
      >
        {milestone.title}
      </strong>
      <span
        className={cn(
          "block text-timeline-text",
          isHorizontal
            ? "mt-2 text-2.5 leading-normal"
            : "mt-1.5 text-2.5 leading-[1.45]"
        )}
      >
        {milestone.detail}
      </span>
    </div>
  )
}
