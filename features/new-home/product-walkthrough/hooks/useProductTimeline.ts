"use client"

import { useEffect, useState, type RefObject } from "react"

/** Marks the scroll-tracked frames so the rail can measure them without a shared ref. */
export const PRODUCT_FRAME_SELECTOR = "[data-product-frame]"

const NAV_HEIGHT = 76
/** Frames become active once they cross this fraction of the viewport below the nav. */
const READING_LINE_RATIO = 0.18
/** How far into a frame a click should land, so it reads as "just started". */
const CLICKED_PROGRESS = 0.25

function getReadingLine() {
  return (
    NAV_HEIGHT +
    (window.innerHeight - NAV_HEIGHT) * READING_LINE_RATIO
  )
}

/**
 * Tracks which frame inside `sectionRef` is being read and how far through it
 * the reader is, updating at most once per animation frame.
 */
export const useProductTimeline = (
  sectionRef: RefObject<HTMLElement | null>
) => {
  const [timeline, setTimeline] = useState<{
    activeIndex: number
    progress: number
  }>({ activeIndex: 0, progress: 0 })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const frames = Array.from(
      section.querySelectorAll<HTMLElement>(PRODUCT_FRAME_SELECTOR)
    )
    let animationFrame = 0

    const updateTimeline = () => {
      animationFrame = 0
      const readingLine = getReadingLine()
      let activeIndex = 0

      frames.forEach((frame, index) => {
        if (frame.getBoundingClientRect().top <= readingLine)
          activeIndex = index
      })

      const activeRect = frames[activeIndex]?.getBoundingClientRect()
      const progress = activeRect
        ? Math.min(
          1,
          Math.max(0, (readingLine - activeRect.top) / activeRect.height)
        )
        : 0

      setTimeline((current) =>
        current.activeIndex === activeIndex &&
          Math.abs(current.progress - progress) < 0.001
          ? current
          : { activeIndex, progress }
      )
    }

    const requestUpdate = () => {
      if (!animationFrame)
        animationFrame = window.requestAnimationFrame(updateTimeline)
    }

    updateTimeline()

    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [sectionRef])

  const scrollToFeature = (index: number) => {
    const target = sectionRef.current?.querySelectorAll<HTMLElement>(
      PRODUCT_FRAME_SELECTOR
    )[index]

    if (!target) return

    const top =
      window.scrollY +
      target.getBoundingClientRect().top +
      target.offsetHeight * CLICKED_PROGRESS -
      getReadingLine()

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    window.scrollTo({
      top,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  return { ...timeline, scrollToFeature }
}