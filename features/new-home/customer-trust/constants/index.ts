import { BRANDS } from "@/constants"

const splitIndex = Math.ceil(BRANDS.length / 2)

/** The two marquee rows that flow inward toward the dima mark. */
export const leftRowBrands = BRANDS.slice(0, splitIndex)
export const rightRowBrands = BRANDS.slice(splitIndex)
