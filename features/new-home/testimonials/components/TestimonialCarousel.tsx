// TestimonialCarousel.tsx
"use client"

import { useLocale, useTranslations } from "next-intl"
import { useRotation } from "@/lib/useRotation"

import { LeadTestimonial } from "./LeadTestimonial"
import { SupportTestimonial } from "./SupportTestimonial"
import { TestimonialProgress } from "./TestimonialProgress"
import { TESTIMONIAL_DURATION_MS, TESTIMONIAL_ASSETS } from "../constants"
import { TestimonialType } from "../types"

export const TestimonialCarousel = () => {
  const t = useTranslations("Home.testimonials.items")
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const localizedTestimonials: TestimonialType[] = TESTIMONIAL_ASSETS.map((asset) => ({
    ...asset,
    quote: t(`${asset.translationKey}.quote`),
    name: t(`${asset.translationKey}.name`),
    role: t(`${asset.translationKey}.jobRole`),
  }))

  const count = localizedTestimonials.length

  const { index, progress, select, pause, resume, reduceMotion } = useRotation({
    count,
    durationMs: TESTIMONIAL_DURATION_MS,
    trackProgress: true,
  })

  const following = (index + 1) % count
  const third = (index + 2) % count

  const isExiting = progress > 0.90
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
      onMouseEnter={handlePause}
      onMouseLeave={resume}
      onFocusCapture={handlePause}
      onBlurCapture={resume}
      dir={isRTL ? 'rtl' : 'ltr'}
      className="grid overflow-hidden items-stretch gap-4 max-md:grid-cols-1 max-md:grid-rows-[minmax(0,1fr)_auto] md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto] h-[600px] md:h-[480px] lg:h-[540px]"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <LeadTestimonial
        testimonial={localizedTestimonials[index]}
        key={`lead-${localizedTestimonials[index].name}`}
        className={animationClass}
      />
      <SupportTestimonial
        testimonial={localizedTestimonials[following]}
        onSelect={() => select(following)}
        key={`next-${localizedTestimonials[following].name}`}
        className={animationClass}
      />
      <SupportTestimonial
        testimonial={localizedTestimonials[third]}
        onSelect={() => select(third)}
        key={`third-${localizedTestimonials[third].name}`}
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