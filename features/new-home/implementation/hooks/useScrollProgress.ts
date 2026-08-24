"use client"

import { useEffect, useState, type RefObject } from "react"

import { NAV_HEIGHT } from "../constants"

import { getAppScrollViewport } from "@/lib/app-scroll"

/**
 * Maps how far a tall, sticky section has been scrolled through onto 0–1,
 * updating at most once per animation frame.
 */
export const useScrollProgress = (
  sectionRef: RefObject<HTMLElement | null>
) => {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const section = sectionRef.current
    const scrollViewport = getAppScrollViewport()
    if (!section || !scrollViewport) return

    let animationFrame = 0

    const updateProgress = () => {
      animationFrame = 0
      const rect = section.getBoundingClientRect()
      const viewportTop = scrollViewport.getBoundingClientRect().top
      const stickyHeight = scrollViewport.clientHeight - NAV_HEIGHT
      const scrollDistance = Math.max(1, section.offsetHeight - stickyHeight)
      const nextProgress = Math.min(
        1,
        Math.max(0, (viewportTop + NAV_HEIGHT - rect.top) / scrollDistance)
      )

      setProgress((current) =>
        Math.abs(current - nextProgress) < 0.001 ? current : nextProgress
      )
    }

    const requestUpdate = () => {
      if (!animationFrame)
        animationFrame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    scrollViewport.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      scrollViewport.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [sectionRef])

  return progress
}
