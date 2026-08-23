"use client"

import { useRef } from "react"
import { useProductTimeline } from "../hooks"

import { type ProductStepType } from "../types"

/**
 * Owns the scroll tracking for the walkthrough. The frames themselves arrive as
 * `children` already rendered on the server, so only the step rail — the one
 * genuinely interactive part — ships to the browser.
 */
export const ProductWalkthroughShell = ({
  steps,
  children,
}: {
  steps: ProductStepType[]
  children: React.ReactNode
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const { activeIndex, progress, scrollToFeature } =
    useProductTimeline(sectionRef)

  console.log("activeIndex:", activeIndex)
  console.log("progress:", progress)
  console.log("scrollToFeature:", scrollToFeature)

  return (
    <section
      className="relative overflow-clip border-t border-line bg-surface"
      ref={sectionRef}
    >
      <div className="page-container grid grid-cols-[300px_minmax(0,1fr)] items-start gap-10.5 pb-12 max-md:block max-md:py-16.25 max-sm:py-13.75 md:max-lg:grid-cols-[260px_minmax(0,1fr)] md:max-lg:gap-7 md:max-lg:pb-10">
        {/*
         * Desktop-only step rail. On mobile it is pure duplication — each frame
         * already carries its own number, eyebrow and title — and the scroll
         * progress it visualises has no room to read, so it is dropped entirely.
         */}
        <div className="sticky top-nav flex min-h-[calc(100svh-var(--spacing-nav))] min-w-0 flex-col pt-10.5 pb-8 max-md:hidden">
          <span className="section-kicker gap-1 border-b border-line pb-4.5 max-lg:pb-3.5">
            How <span className="lowercase">dima</span> works
          </span>

          {steps.map((step, index) => (
            <a
              className="block w-full cursor-pointer py-5 text-inherit opacity-[.34] transition-opacity duration-250 ease-[ease] focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand data-active:opacity-100"
              data-active={activeIndex === index ? "" : undefined}
              href={`#product-feature-${index + 1}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToFeature(index)
              }}
              key={step.title}
            >
              <span className="font-mono text-2.25 tracking-[.09em] text-ui-muted uppercase">
                {step.number} / {step.total} · {step.eyebrow}
              </span>
              <h2 className="mt-1.5 text-[clamp(1.35rem,2vw,2rem)] leading-none font-medium tracking-tighter max-sm:text-[1.75rem]">
                {step.title}
              </h2>
              {/* The stage names the step; this line is what the step is worth. */}
              <p className="mt-2 text-3 leading-[1.45] font-[460] text-copy">
                {step.outcome}
              </p>
              <div
                className="mt-2.5 h-0.5 bg-progress-track"
                aria-hidden="true"
              >
                <span
                  className="block h-full origin-left bg-brand"
                  style={{
                    transform: `scaleX(${activeIndex === index ? progress : 0})`,
                  }}
                />
              </div>
            </a>
          ))}
        </div>

        <div className="relative min-w-0 max-md:grid max-md:gap-6">
          {children}
        </div>
      </div>
    </section>
  )
}
