import { BrandMark } from "./BrandMark"
import { TestimonialAttribution } from "./TestimonialAttribution"

import { type TestimonialType } from "../types"
import { cn } from "@/lib/utils";

/**
 * The quote the section is built around: photograph, full quote at reading
 * size, and the company logo given room. Three equally weighted cards made a
 * reader choose which one to start with; this one does not.
 *
 * The fixed height is deliberate and derived: quotes here run from two lines to
 * five, and letting the card follow its content made the whole section jump on
 * every rotation. 344px is what the two neighbours beside it need to stack
 * cleanly, and it still clears the longest quote in the set.
 */
export const LeadTestimonial = ({
  testimonial,
  className,
}: {
  testimonial: TestimonialType;
  className: string;
}) => (
  <figure className={cn("flex h-full flex-col border border-line bg-surface p-8 max-sm:p-6 md:max-lg:col-span-2 lg:row-span-2 lg:h-86 rounded-3xl", className)}>
    <div className="flex gap-4 max-sm:gap-3.5">
      <span
        className="font-serif text-15.5 leading-[.72] text-brand max-sm:text-11.5"
        aria-hidden
      >
        &rdquo;
      </span>
      <blockquote className="text-5 leading-[1.45] font-[480] tracking-tight text-balance max-sm:text-4 desktop-fit:text-4.75">
        {testimonial.quote}
      </blockquote>
    </div>

    <figcaption className="mt-auto flex items-end justify-between gap-5 pt-8 max-sm:pt-6">
      <TestimonialAttribution testimonial={testimonial} slot="lead" />
      <BrandMark testimonial={testimonial} slot="lead" />
    </figcaption>
  </figure>
)
