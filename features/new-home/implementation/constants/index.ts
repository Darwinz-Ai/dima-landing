export const MILESTONE_AT = [0, 0.5, 1] as const

/** Cards light up slightly before the indicator reaches them, so the motion feels anticipatory. */
export const REACH_TOLERANCE = 0.015

/** Assistive tech is told about a milestone marginally earlier than the cards light up. */
export const ANNOUNCE_TOLERANCE = 0.02

/** Height of the sticky header the timeline's progress is measured against. */
export const NAV_HEIGHT = 76
