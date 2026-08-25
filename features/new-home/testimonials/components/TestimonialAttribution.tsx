import { PersonAvatar } from "@/components/shared/PersonAvatar"
import { type TestimonialSlotType, type TestimonialType } from "../types"

import { cn } from "@/lib/utils"

/** Who said it: headshot, name, role. Sized to the slot it sits in. */
export const TestimonialAttribution = ({
  testimonial,
  slot,
}: {
  testimonial: TestimonialType
  slot: TestimonialSlotType
}) => {
  const isLead = slot === "lead"

  return (
    <div
      className={cn(
        "flex items-center",
        isLead ? "gap-3.5 max-sm:gap-2.5" : "gap-2.5"
      )}
    >
      <PersonAvatar
        name={testimonial.name}
        photo={testimonial.photo}
        className={isLead ? "size-14 max-sm:size-11" : "size-9"}
        sizes={isLead ? "56px" : "36px"}
      />
      <div className={cn(!isLead && "min-w-0")}>
        <strong
          className={cn(
            "block font-[520]",
            // Increased from text-3.75 to text-4.25 and text-3.125 to text-3.625
            isLead ? "text-4.25" : "truncate text-3.625"
          )}
        >
          {testimonial.name}
        </strong>
        <small
          className={cn(
            "block leading-normal text-copy",
            isLead
              // Increased from text-2.875 to text-3.375
              ? "mt-0.75 max-w-60 text-3.375"
              // Increased from text-2.625 to text-3.125
              : "mt-0.5 truncate text-3.125"
          )}
        >
          {testimonial.role}
        </small>
      </div>
    </div>
  )
}