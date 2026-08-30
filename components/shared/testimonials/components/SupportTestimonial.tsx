import { BrandMark } from "./BrandMark"
import { TestimonialAttribution } from "./TestimonialAttribution"

import { type TestimonialType } from "../types"
import { cn } from "@/lib/utils";

/** Supporting proof: same information, deliberately quieter. */
export const SupportTestimonial = ({
  testimonial,
  className,
  onSelect,
}: {
  testimonial: TestimonialType;
  className: string;
  onSelect: () => void
}) => (
  <figure
    className={cn("flex h-full cursor-pointer flex-col border border-line/60 bg-surface/50 p-5 transition-colors duration-300 hover:border-line hover:bg-surface max-md:hidden rounded-3xl", className)}
    onClick={onSelect}
  >
    <blockquote className="line-clamp-3 text-3.5 leading-[1.55] font-[460] tracking-[-.015em] text-copy-strong">
      {testimonial.quote}
    </blockquote>

    <figcaption className="mt-auto flex items-end justify-between gap-4 pt-5">
      <TestimonialAttribution testimonial={testimonial} slot="support" />
      <BrandMark testimonial={testimonial} slot="support" />
    </figcaption>
  </figure>
)
