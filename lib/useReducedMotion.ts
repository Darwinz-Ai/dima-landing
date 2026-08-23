"use client"

import { useSyncExternalStore } from "react"

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
    const query = window.matchMedia(REDUCE_MOTION_QUERY)

    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
}

/**
 * Reads `prefers-reduced-motion` as an external store rather than mirroring it
 * into state from an effect, so there is no render-then-correct pass on mount
 * and no setState inside a `useEffect` body.
 *
 * The server snapshot is `false`: markup is rendered as if motion is allowed,
 * and a visitor who has asked for less of it gets the reduced treatment from
 * the first client render.
 */
export const useReducedMotion = () => {
    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(REDUCE_MOTION_QUERY).matches,
        () => false
    )
}
