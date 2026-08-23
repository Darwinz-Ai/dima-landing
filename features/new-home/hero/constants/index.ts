import { type HeroReadoutType } from "../types"

export const HERO_READOUT: [HeroReadoutType, HeroReadoutType] = [
  {
    stat: {
      caption: "Trend detection",
      value: "Early",
      detail: "spot the shift before it becomes the story",
    },
    read: {
      caption: "Crisis management",
      body: "Catch unusual spikes, trace what caused them, and brief the right team while the story is still moving.",
      chips: ["Real-time alerts", "Root cause"],
    },
  },
  {
    stat: {
      caption: "Arabic first",
      value: "Native",
      detail: "dialect, sarcasm and emotion understood as written",
    },
    read: {
      caption: "Ask dima",
      body: "Ask your live data a question, then export the answer as a client-ready report.",
      chips: ["Export reports", "Ready to share"],
    },
  },
]
