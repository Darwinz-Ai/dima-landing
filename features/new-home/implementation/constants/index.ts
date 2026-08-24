import { type MilestoneType } from "../types"

export const MILESTONES: MilestoneType[] = [
  {
    title: "Get started",
    detail: "We map your market, sources and reporting goals.",
    at: 0,
  },
  {
    title: "Data ingested in 24 hours",
    detail: "Your channels and priority conversations begin flowing.",
    at: 0.5,
  },
  {
    title: "Live in 48-72 hours",
    detail: "Dashboards, alerts and reports are ready for your team.",
    at: 1,
  },
]

/** Cards light up slightly before the indicator reaches them, so the motion feels anticipatory. */
export const REACH_TOLERANCE = 0.015

/** Assistive tech is told about a milestone marginally earlier than the cards light up. */
export const ANNOUNCE_TOLERANCE = 0.02

/** Height of the sticky header the timeline's progress is measured against. */
export const NAV_HEIGHT = 76
