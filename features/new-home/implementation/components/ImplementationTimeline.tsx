"use client"

import { useRef } from "react"
import { useScrollProgress } from "../hooks"
import { useTranslations } from "next-intl"

import { HorizontalTimeline } from "./HorizontalTimeline"
import { TimelineIntro } from "./TimelineIntro"
import { VerticalTimeline } from "./VerticalTimeline"

import { currentMilestone } from "../helpers"
import { MILESTONE_AT } from "../constants"
import { type MilestoneType } from "../types"

const TITLE_ID = "implementation-title"

export const ImplementationTimeline = () => {
  const t = useTranslations("Home_New.implementation")
  const milestoneCopy = t.raw("milestones") as {
    title: string
    detail: string
  }[]
  const milestones: MilestoneType[] = MILESTONE_AT.map((at, index) => ({
    at,
    title: milestoneCopy[index].title,
    detail: milestoneCopy[index].detail,
  }))

  const sectionRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(sectionRef)

  const progressLabel = {
    role: "progressbar" as const,
    "aria-label": "dima implementation progress",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Math.round(progress * 100),
    "aria-valuetext": currentMilestone(progress, milestones).title,
  }

  return (
    <section
      className="relative h-[220svh] border-y border-line bg-white"
      ref={sectionRef}
      aria-labelledby={TITLE_ID}
    >
      {/* Mobile timeline*/}
      <div className="page-container pt-12 md:hidden">
        <TimelineIntro titleId={`${TITLE_ID}-mobile`} />
      </div>

      {/* 2. THE STICKY LOCK */}
      <div className="sticky top-nav flex h-[calc(100svh-var(--spacing-nav))] items-center overflow-hidden">
        <div className="page-container flex h-full w-full flex-col justify-center py-12 max-md:justify-center max-md:py-6">

          <div className="hidden md:block">
            <TimelineIntro titleId={TITLE_ID} />
          </div>

          <div
            className="relative mt-18.5 hidden h-52.5 md:block"
            {...progressLabel}
          >
            <HorizontalTimeline progress={progress} milestones={milestones} />
          </div>

          <div
            className="relative w-full h-80 my-auto md:hidden"
            {...progressLabel}
          >
            <VerticalTimeline progress={progress} milestones={milestones} />
          </div>
        </div>
      </div>
    </section>
  )
}