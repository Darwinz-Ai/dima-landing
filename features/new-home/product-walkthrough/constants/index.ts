import mediaMonitor from "@/public/product/media-monitor.png"
import analyticsCopilot from "@/public/product/analytics-copilot.png"
import influencerIntelligence from "@/public/product/influencer-intelligence.png"

import { type ProductScreenType, type ProductStepType } from "../types"

export const PRODUCT_SCREENS: ProductScreenType[] = [
  {
    src: mediaMonitor,
    alt: "dima media monitoring feed showing tracked brand conversations",
    eyebrow: "All platforms included",
    number: "01",
    title: "Listen",
    outcome: "Never miss the conversation.",
    description:
      "Tagged, untagged and misspelled mentions across social, news, print, TV and radio in one live view, including the ones that never name you.",
  },
  {
    src: analyticsCopilot,
    alt: "dima analytics dashboard and AI copilot explaining trends",
    eyebrow: "Answers, not just charts",
    number: "02",
    title: "Understand",
    outcome: "Know what’s actually driving it.",
    description:
      "dima ties a spike to the topic, dialect, accounts and audience behind it, then explains the pattern back to you in plain language.",
  },
  {
    src: influencerIntelligence,
    alt: "dima influencer intelligence and performance analysis workspace",
    eyebrow: "8× faster response",
    number: "03",
    title: "Act",
    outcome: "Move before the conversation moves on.",
    description:
      "Alert the right people, brief the client, weigh a creator by reach and brand risk, or answer the thread, all from the screen that found it.",
  },
]

export const PRODUCT_STEPS: ProductStepType[] = PRODUCT_SCREENS.map(
  (screen) => ({
    number: screen.number,
    eyebrow: screen.eyebrow,
    title: screen.title,
    outcome: screen.outcome,
    total: String(PRODUCT_SCREENS.length).padStart(2, "0"),
  })
)
