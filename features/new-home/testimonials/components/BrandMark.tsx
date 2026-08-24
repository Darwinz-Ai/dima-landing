import Image from "next/image"

import { type TestimonialSlotType, type TestimonialType } from "../types"

import { cn } from "@/lib/utils"

export const BrandMark = ({
  testimonial,
  slot,
}: {
  testimonial: TestimonialType
  slot: TestimonialSlotType
}) => {

  function getInitials(str: string) {
    const parts = str.trim().split(/\s+/)

    return (
      parts.length > 1 ? parts[0][0] + parts[1][0] : str.slice(0, 2)
    ).toUpperCase()
  }


  if (!testimonial.logo) {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center bg-ink text-2.75 font-medium text-white",
          slot === "lead" ? "size-13.5 max-sm:size-11.5" : "size-9.5"
        )}
      >
        {getInitials(testimonial.name)}
      </span>
    )
  }

  return (
    // White plate behind the logo: several brand files are JPEGs carrying their
    // own white background, which would otherwise read as a pale box on the card.
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-1.5 bg-white",
        slot === "lead"
          ? "h-13.5 w-32.5 p-2.5 max-sm:h-11.5 max-sm:w-26"
          : "h-9.5 w-23 p-2"
      )}
    >
      <Image
        className={cn("h-full w-full object-contain", testimonial.logoFit)}
        src={testimonial.logo}
        alt={`${testimonial.company} logo`}
        width={220}
        height={100}
        sizes="130px"
      />
    </span>
  )
}
