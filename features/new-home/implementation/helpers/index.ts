import { type MilestoneType } from "../types"

import { ANNOUNCE_TOLERANCE, REACH_TOLERANCE } from "../constants"

export const hasReached = (progress: number, milestone: MilestoneType) =>
  progress >= milestone.at - REACH_TOLERANCE

/** The milestone to announce to assistive tech at the current scroll position. */
export const currentMilestone = (
  progress: number,
  milestones: MilestoneType[]
) =>
  [...milestones]
    .reverse()
    .find((milestone) => progress >= milestone.at - ANNOUNCE_TOLERANCE) ??
  milestones[0]
