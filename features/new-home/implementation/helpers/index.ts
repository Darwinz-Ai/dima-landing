import { type MilestoneType } from "../types"

import { ANNOUNCE_TOLERANCE, MILESTONES, REACH_TOLERANCE } from "../constants"

export const hasReached = (progress: number, milestone: MilestoneType) =>
  progress >= milestone.at - REACH_TOLERANCE

/** The milestone to announce to assistive tech at the current scroll position. */
export const currentMilestone = (progress: number) =>
  [...MILESTONES]
    .reverse()
    .find((milestone) => progress >= milestone.at - ANNOUNCE_TOLERANCE) ??
  MILESTONES[0]
