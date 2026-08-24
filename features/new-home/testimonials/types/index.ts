export type TestimonialType = {
  quote: string
  name: string
  role: string
  /** Shown as a logo when the brand has artwork, otherwise `mark` stands in. */
  company: string
  logo?: string
  /** Scales up logos whose artwork sits small inside its own canvas. */
  logoFit?: string
  /** Headshot, where the customer has supplied one. */
  photo?: string
}

/**
 * Which slot a testimonial is rendered into. The lead card carries the section;
 * the supporting cards are the same information, deliberately quieter.
 */
export type TestimonialSlotType = "lead" | "support"
