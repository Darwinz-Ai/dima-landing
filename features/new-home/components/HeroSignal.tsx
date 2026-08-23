"use client"


import Image from "next/image"
import productOverviewOne from "@/public/product/product-overview-1.png"
import productOverviewTwo from "@/public/product/product-overview-2.png"



import { cn } from "@/lib/utils"
import { HeroReadoutType } from "./types"
import { HERO_READOUT } from "./constants"
import { useRotation } from "@/lib/useRotation"
import { BrowserTab } from "@/components/shared/BrowserTab"

const HERO_SLIDE_DURATION_MS = 9000
const HERO_SLIDES = [
  {
    src: productOverviewOne,
    label: "Monitor",
    alt: "dima audience intelligence workspace tracking brand conversations",
  },
  {
    src: productOverviewTwo,
    label: "Topic Insights",
    alt: "dima topic insights workspace summarising audience conversations",
  },
] as const

const captionClass =
  "font-mono text-2.5 tracking-[.11em] text-ui-muted uppercase"
const cardClass =
  "flex h-full flex-col border border-ui-line bg-white p-4 shadow-panel max-sm:p-3.5"

const StatCard = ({ readout }: { readout: HeroReadoutType }) => (
  <figure className={cardClass}>
    <figcaption className={captionClass}>{readout.stat.caption}</figcaption>
    <p className="mt-auto pt-3.5 text-9.5 leading-[.85] font-[530] tracking-[-.07em] max-sm:text-8">
      {readout.stat.value}
    </p>
    <p className="mt-2.5 text-2.625 leading-[1.45] text-copy">
      {readout.stat.detail}
    </p>
  </figure>
)
const ReadCard = ({ readout }: { readout: HeroReadoutType }) => {
  return (
    <figure className={cardClass}>
      <figcaption className={captionClass}>{readout.read.caption}</figcaption>
      <blockquote className="mt-3 text-3 leading-normal font-[470] text-ink max-sm:text-2.875">
        {readout.read.body}
      </blockquote>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-3.5" aria-hidden>
        {readout.read.chips.map((chip) => (
          <li
            className="border border-line px-2 py-0.75 text-2.5 font-medium text-label"
            key={chip}
          >
            {chip}
          </li>
        ))}
      </ul>
    </figure>
  )
}

const SwappingCard = ({
  Card,
  className,
  index,
}: {
  Card: (props: { readout: HeroReadoutType }) => React.ReactElement
  className: string
  index: number
}) => (
  <div className={cn("relative", className)}>
    <Card readout={HERO_READOUT[index]} />
  </div>
)

export const HeroSignal = () => {
  const { index, select, pause, resume } = useRotation({
    count: HERO_SLIDES.length,
    durationMs: HERO_SLIDE_DURATION_MS,
  })

  return (
    <div
      className="relative w-full sm:pb-32 md:max-lg:pb-30"
      aria-label="dima analysing a brand's audience conversations"
      aria-roledescription="carousel"
      role="region"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div className="overflow-hidden border border-product-border bg-white shadow-float">
        <BrowserTab title={HERO_SLIDES[index].label} />

        <div className="relative aspect-2557/1390 bg-ui-chrome max-sm:aspect-[1.2]">
          {/*
           * Cropped rather than scaled down on phones: the full-width capture
           * shrinks to unreadable mush, while the left crop still reads as a
           * working screen behind the cards.
           *
           * Both screens stay mounted so the second is ready before its first
           * turn. The selected layer fades over an opaque sibling, which avoids
           * a washed-out midpoint.
           */}
          {HERO_SLIDES.map((slide, position) => (
            <Image
              className={cn(
                "absolute inset-0 object-cover object-top-left transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
                position === 0
                  ? "opacity-100"
                  : cn("z-1", position === index ? "opacity-100" : "opacity-0")
              )}
              src={slide.src}
              alt={position === index ? slide.alt : ""}
              aria-hidden={position !== index}
              fill
              preload={position === 0}
              sizes="(max-width: 800px) 100vw, 52vw"
              key={slide.label}
            />
          ))}
          {/* Fades the screen under the cards so the drawn copy stays first. */}
          <span
            className="absolute inset-0 z-2 bg-[linear-gradient(to_bottom,rgba(247,250,249,0)_46%,rgba(247,250,249,0.78))]"
            aria-hidden
          />
        </div>
      </div>

      <div
        className="relative z-4 flex justify-center gap-2 sm:absolute sm:inset-x-0 sm:bottom-0"
        aria-label="Choose a product screen"
        role="group"
      >
        {HERO_SLIDES.map((slide, position) => (
          <button
            className="group flex w-14 cursor-pointer items-center gap-2 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            onClick={() => select(position)}
            aria-label={"Show slide " + (position + 1) + ": " + slide.label}
            aria-current={position === index ? "true" : undefined}
            type="button"
            key={slide.label}
          >
            <span className="font-mono text-2.5 text-ui-muted" aria-hidden>
              {String(position + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "h-px flex-1 transition-colors duration-300",
                position === index
                  ? "bg-brand"
                  : "bg-line-control group-hover:bg-ink"
              )}
              aria-hidden
            />
          </button>
        ))}
      </div>

      {/*
       * Below sm the pair cannot float over the frame without colliding, so
       * they drop into normal flow underneath it and the frame keeps its full
       * width. The fixed heights above sm keep the two cards aligned as their
       * content changes.
       */}
      <div className="mt-0.5 grid gap-3 sm:mt-0 sm:block">
        <SwappingCard
          Card={StatCard}
          index={index}
          className="sm:absolute sm:bottom-10 sm:-left-6 sm:z-2 sm:h-41 sm:w-47 lg:h-44 lg:w-52"
        />
        <SwappingCard
          Card={ReadCard}
          index={index}
          className="sm:absolute sm:-right-6 sm:bottom-10 sm:z-3 sm:h-41 sm:w-61 lg:h-44 lg:w-68"
        />
      </div>
    </div>
  )
}
