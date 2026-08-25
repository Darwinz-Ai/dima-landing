"use client"

import { useRef } from "react"
import { useScrollProgress } from "../hooks"

import { HorizontalTimeline } from "./HorizontalTimeline"
import { TimelineIntro } from "./TimelineIntro"
import { VerticalTimeline } from "./VerticalTimeline"

import { currentMilestone } from "../helpers"

const TITLE_ID = "implementation-title"

/**
 * Client Component by necessity: every mark on the track is driven by live
 * scroll position, which has no server-rendered equivalent.
 */
export const ImplementationTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(sectionRef)

  const progressLabel = {
    role: "progressbar" as const,
    "aria-label": "dima implementation progress",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round(progress * 100),
    "aria-valuetext": currentMilestone(progress).title,
  }

  return (
    <section
      className="relative h-[220svh] border-y border-line bg-white"
      ref={sectionRef}
      aria-labelledby={TITLE_ID}
    >
      <div className="sticky top-nav flex h-[calc(100svh-var(--spacing-nav))] items-center overflow-hidden">
        <div className="page-container flex h-full flex-col justify-center py-12 max-md:justify-start max-md:pt-9 max-md:pb-8">
          <TimelineIntro titleId={TITLE_ID} />

          <div
            className="relative mt-18.5 hidden h-52.5 md:block"
            {...progressLabel}
          >
            <HorizontalTimeline progress={progress} />
          </div>

          {/*
           * The end cards are centred on the ends of the track, so half of each
           * hangs outside the wrapper: the top margin has to clear that overhang
           * as well as the gap the copy above it needs, and the bottom one keeps
           * the last card off the edge of the section.
           *
           * The track itself takes whatever height is left over rather than a
           * fixed one — on a short screen the intro copy wraps to more lines and
           * a fixed track would push the last card past the bottom of the
           * sticky viewport, where `overflow-hidden` clips it.
           */}
          <div
            className="relative mt-15.5 mb-10 ml-1 max-h-77.5 min-h-45 flex-1 max-sm:mt-18 md:hidden"
            {...progressLabel}
          >
            <VerticalTimeline progress={progress} />
          </div>

        </div>
      </div>
    </section>
  )
}
