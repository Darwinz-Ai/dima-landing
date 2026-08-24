/** `at` is the milestone's position along the track, 0 (start) to 1 (end). */
export type MilestoneType = {
  title: string
  detail: string
  at: number
}

/** Which track a milestone is rendered against — wide screens get the horizontal one. */
export type TimelineOrientationType = "horizontal" | "vertical"
