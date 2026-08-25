import { BrandMark } from "./BrandMark"
import { TestimonialAttribution } from "./TestimonialAttribution"

import { type TestimonialType } from "../types"
import { cn } from "@/lib/utils";

/**
 * The quote the section is built around: photograph, full quote at reading
 * size, and the company logo given room.
 */
export const LeadTestimonial = ({
  testimonial,
  className,
}: {
  testimonial: TestimonialType;
  className: string;
}) => (
  // FIX: Removed lg:h-86 so the card naturally stretches to fill its grid row span!
  <figure className={cn("flex h-full flex-col border border-line bg-surface p-8 max-sm:p-6 md:max-lg:col-span-2 lg:row-span-2 rounded-3xl", className)}>
    <div className="flex gap-4 max-sm:gap-3.5">
      <span
        className="font-serif text-15.5 leading-[.72] text-brand max-sm:text-11.5"
        aria-hidden
      >
        &rdquo;
      </span>
      {/* Increased from text-5 to text-5.5, max-sm:text-4 to max-sm:text-4.5, and desktop-fit:text-4.75 to desktop-fit:text-5.25 */}
      <blockquote className="text-5.5 leading-[1.45] font-[480] tracking-tight text-balance max-sm:text-4.5 desktop-fit:text-5.25">
        {testimonial.quote}
      </blockquote>
    </div>

    <figcaption className="mt-auto flex items-end justify-between gap-5 pt-8 max-sm:pt-6">
      <TestimonialAttribution testimonial={testimonial} slot="lead" />
      <BrandMark testimonial={testimonial} slot="lead" />
    </figcaption>
  </figure>
)