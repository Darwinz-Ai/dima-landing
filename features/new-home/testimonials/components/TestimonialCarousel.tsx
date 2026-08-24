"use client"

import { useRotation } from "@/lib/useRotation"

import { LeadTestimonial } from "./LeadTestimonial"
import { SupportTestimonial } from "./SupportTestimonial"
import { TestimonialProgress } from "./TestimonialProgress"

import { TESTIMONIAL_DURATION_MS, TESTIMONIALS } from "../constants"

export const TestimonialCarousel = () => {
  const count = TESTIMONIALS.length

  // Destructure reduceMotion from the hook
  const { index, progress, select, pause, resume, reduceMotion } = useRotation({
    count,
    durationMs: TESTIMONIAL_DURATION_MS,
    trackProgress: true,
  })

  // The two supporting slots always show what is coming next, so the rotation
  // reads as a queue rather than as three unrelated cards swapping at random.
  const following = (index + 1) % count
  const third = (index + 2) % count

  // Trigger the exit animation when progress is at 90%. 
  const isExiting = progress > 0.90

  // If the user prefers reduced motion, apply no animation classes.
  // Otherwise, apply the appropriate fade in/out class.
  const animationClass = reduceMotion
    ? ""
    : (isExiting ? "animate-fade-out" : "animate-fade-in")

  const handlePause = () => {
    if (!isExiting) {
      pause()
    }
  }

  return (
    <div
      // Hovering or tabbing in holds the current quote so it can be read.
      onMouseEnter={handlePause}
      onMouseLeave={resume}
      onFocusCapture={handlePause}
      onBlurCapture={resume}
      /*
       * Three widths, three shapes. Wide screens get the lead beside its two
       * neighbours; `grid-rows-2` is what keeps those neighbours the same
       * height, since auto rows sized them to their own quotes and left one
       * card 44px taller than the other. Between 800 and 1100px the lead runs
       * full width with the pair underneath. Below that the neighbours are
       * dropped entirely and the progress bar becomes the way through, which is
       * what the carousel did before it grew a hierarchy.
       */
      className="grid items-stretch gap-4 max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] lg:grid-rows-2"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <LeadTestimonial
        testimonial={TESTIMONIALS[index]}
        key={`lead-${TESTIMONIALS[index].name}`}
        className={animationClass}
      />
      <SupportTestimonial
        testimonial={TESTIMONIALS[following]}
        onSelect={() => select(following)}
        key={`next-${TESTIMONIALS[following].name}`}
        className={animationClass}
      />
      <SupportTestimonial
        testimonial={TESTIMONIALS[third]}
        onSelect={() => select(third)}
        key={`third-${TESTIMONIALS[third].name}`}
        className={animationClass}
      />

      <TestimonialProgress
        activeIndex={index}
        progress={progress}
        onSelect={select}
      />
    </div>
  )
}