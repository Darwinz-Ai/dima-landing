"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "./useReducedMotion"

type UseRotationOptions = {
    count: number
    durationMs: number
    trackProgress?: boolean
}

/**
 * Rotates through a fixed number of items, with controls for manual selection
 * and pausing. Progress tracking is opt-in so consumers without a progress UI
 * can use a single timeout instead of rendering on every animation frame.
 */
export const useRotation = ({
    count,
    durationMs,
    trackProgress = false,
}: UseRotationOptions) => {
    const [index, setIndex] = useState<number>(0)
    const [progress, setProgress] = useState<number>(0)
    const [paused, setPaused] = useState<boolean>(false)
    const [rotation, setRotation] = useState<number>(0)
    const progressRef = useRef<number>(0)
    const reduceMotion = useReducedMotion()

    useEffect(() => {
        if (paused || reduceMotion || count < 2 || durationMs <= 0) return

        if (!trackProgress) {
            const timeout = window.setTimeout(() => {
                setIndex((current) => (current + 1) % count)
            }, durationMs)

            return () => window.clearTimeout(timeout)
        }

        let frame = 0
        let start = performance.now() - progressRef.current * durationMs

        const tick = (now: number) => {
            const elapsed = now - start

            if (elapsed >= durationMs) {
                start = now
                progressRef.current = 0
                setProgress(0)
                setIndex((current) => (current + 1) % count)
            } else {
                const nextProgress = elapsed / durationMs
                progressRef.current = nextProgress
                setProgress(nextProgress)
            }

            frame = window.requestAnimationFrame(tick)
        }

        frame = window.requestAnimationFrame(tick)
        return () => window.cancelAnimationFrame(frame)
    }, [count, durationMs, index, paused, reduceMotion, rotation, trackProgress])

    const select = useCallback((nextIndex: number) => {
        progressRef.current = 0
        setProgress(0)
        setIndex(nextIndex)
        setRotation((current) => current + 1)
    }, [])

    const pause = useCallback(() => setPaused(true), [])
    const resume = useCallback(() => setPaused(false), [])

    return { index, progress, select, pause, resume, reduceMotion }
}
