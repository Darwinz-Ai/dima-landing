"use client"

import { getAppScrollViewport } from "@/lib/app-scroll"
import { useEffect, useState, type RefObject } from "react"


/** Marks the scroll-tracked frames so the rail can measure them without a shared ref. */
export const PRODUCT_FRAME_SELECTOR = "[data-product-frame]"

const NAV_HEIGHT = 76
/** Frames become active once they cross this fraction of the viewport below the nav. */
const READING_LINE_RATIO = 0.18
/** How far into a frame a click should land, so it reads as "just started". */
const CLICKED_PROGRESS = 0.25

function getReadingLine(scrollViewport: HTMLElement) {
  return (
    scrollViewport.getBoundingClientRect().top +
    NAV_HEIGHT +
    (scrollViewport.clientHeight - NAV_HEIGHT) * READING_LINE_RATIO
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
    const scrollViewport = getAppScrollViewport()
    if (!section || !scrollViewport) return

    const frames = Array.from(
      section.querySelectorAll<HTMLElement>(PRODUCT_FRAME_SELECTOR)
    )
    let animationFrame = 0

    const updateTimeline = () => {
      animationFrame = 0
      const readingLine = getReadingLine(scrollViewport)
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
    scrollViewport.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      scrollViewport.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [sectionRef])

  const scrollToFeature = (index: number) => {
    const target = sectionRef.current?.querySelectorAll<HTMLElement>(
      PRODUCT_FRAME_SELECTOR
    )[index]
    const scrollViewport = getAppScrollViewport()
    if (!target || !scrollViewport) return

    const top =
      scrollViewport.scrollTop +
      target.getBoundingClientRect().top +
      target.offsetHeight * CLICKED_PROGRESS -
      getReadingLine(scrollViewport)
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    scrollViewport.scrollTo({
      top,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }

  return { ...timeline, scrollToFeature }
}
