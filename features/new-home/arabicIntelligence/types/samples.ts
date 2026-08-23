export type SampleType = {
  post: string
  /** Arabic script needs RTL and `lang`; Franco-Arabic is Latin script and does not. */
  script: "arabic" | "latin"
  gloss: string
  dialect: string
  verdict: string
  tone: "negative" | "positive" | "mixed"
  tags: string
}
