import { type StaticImageData } from "next/image"

export type ProductScreenType = {
  src: StaticImageData
  alt: string
  eyebrow: string
  number: string
  title: string
  outcome: string
  description: string
}

export type ProductStepType = Pick<
  ProductScreenType,
  "number" | "eyebrow" | "title" | "outcome"
> & { total: string }
