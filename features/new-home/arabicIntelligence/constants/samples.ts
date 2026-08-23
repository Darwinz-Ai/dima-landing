import { type SampleType } from "../types"

export const SAMPLES: SampleType[] = [
  {
    post: "طبعاً الخدمة ممتازة 👏 تلات ساعات وأنا مستني",
    script: "arabic",
    gloss:
      "“Of course the service is excellent 👏 three hours and I'm still waiting.”",
    dialect: "Egyptian · sarcasm",
    verdict: "Negative",
    tone: "negative",
    tags: "Frustration · Wait time",
  },
  {
    post: "el delivery dayman met2akhar bas el akl gamed",
    script: "latin",
    gloss: "“Delivery is always late, but the food is great.”",
    dialect: "Franco-Arabic",
    verdict: "Positive",
    tone: "positive",
    tags: "Frustration · Wait time",
  },
  {
    post: "الصراحة التطبيق الجديد وايد أفضل من الأول",
    script: "arabic",
    gloss: "“Honestly, the new app is much better than the old one.”",
    dialect: "Gulf",
    verdict: "Positive",
    tone: "positive",
    tags: "Relief · App release",
  },
]

export const DIFFERENTIATORS = [
  "Dialect, not Modern Standard Arabic",
  "Slang, sarcasm and Franco-Arabic scored, not dropped",
  "Trained in the region, not translated into it",
]
