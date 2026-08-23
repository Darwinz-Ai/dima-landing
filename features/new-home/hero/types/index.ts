type StatSectionType = {
  caption: string
  value: string
  detail: string
}
type ReadSectionType = {
  caption: string
  body: string
  chips: [string, string]
}

export type HeroReadoutType = {
  stat: StatSectionType
  read: ReadSectionType
}
