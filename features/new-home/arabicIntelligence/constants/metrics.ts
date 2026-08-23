import { type MetricType } from "../types"

export const METRICS: MetricType[] = [
  {
    value: "100",
    suffix: "%",
    title: "Full coverage",
    description:
      "Tagged, untagged and even misspelled mentions across social, communities and media.",
  },
  {
    value: "97",
    suffix: "%",
    title: "Arabic accuracy",
    description:
      "Dialects, slang and Franco-Arabic, analyzed with regional context built in.",
    featured: true,
  },
  {
    value: "50M",
    suffix: "+",
    title: "Mentions captured",
    description:
      "Enterprise-scale monitoring without limits on users, keywords or reports.",
  },
]
