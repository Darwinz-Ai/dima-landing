"use client"

import { useEffect, useRef } from "react"
import { useRotation } from "@/lib/useRotation"

import { ScrollArea } from "@/components/ui/scroll-area"

import { ArrowUp01Icon } from "@hugeicons/core-free-icons"

import { DUMMY_PROMPTS, PROMPT_DURATION_MS } from "../constants"
import { DEMO_URL } from "@/constants"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared/Icon"

/**
 * A preview of the copilot, not a live one — the field is presentational and
 * every route out of it leads to the demo, so nothing here pretends to answer.
 *
 * This is the one rounded object on the page: a chat composer is a shape people
 * recognise instantly, and squaring it off to match the site's flat panels made
 * it read as a form field instead. The rest of the section stays sharp. The
 * suggestions sit inside the card for the same reason — in a real composer they
 * belong to the field, not to the page around it. On phones they scroll
 * sideways rather than stacking, which would push the card past the fold — in
 * the app's scroll area, so the row is dragged and its bar drawn the same way
 * every other scrolling surface here is.
 *
 * The prompt cycles on its own until someone picks a suggestion, at which point
 * the rotation stops for good: once a visitor has taken control, moving the text
 * under them would read as a bug rather than as a demo.
 *
 * Because the row scrolls rather than wraps, the chip the rotation lands on can
 * sit outside the visible strip; it is scrolled back into view so the highlight
 * is never somewhere the visitor cannot see.
 */
export const PromptConsole = () => {
  const {
    index: active,
    select,
    pause,
    reduceMotion,
  } = useRotation({
    count: DUMMY_PROMPTS.length,
    durationMs: PROMPT_DURATION_MS,
  })

  const chips = useRef<(HTMLLIElement | null)[]>([])

  /**
   * Only moves when the active chip is actually clipped, and then centres it —
   * nudging it to the edge leaves no hint that the row continues. When the row
   * fits (it does at desktop widths) there is nothing to scroll and this is a
   * no-op.
   *
   * The destination is clamped to the scrollable range rather than left to the
   * browser: centring the first or last chip asks for a position past the end,
   * and Safari answers that with a rubber-band bounce that opens a gap beside
   * the row on the way back to the start.
   */
  useEffect(() => {
    const chip = chips.current[active]
    const viewport = chip?.closest<HTMLElement>(
      "[data-slot='scroll-area-viewport']"
    )

    if (!chip || !viewport) return

    const chipBox = chip.getBoundingClientRect()
    const viewBox = viewport.getBoundingClientRect()
    const clippedStart = chipBox.left - viewBox.left
    const clippedEnd = chipBox.right - viewBox.right

    if (clippedStart >= 0 && clippedEnd <= 0) return

    const centred =
      viewport.scrollLeft + clippedStart - (viewBox.width - chipBox.width) / 2
    const furthest = viewport.scrollWidth - viewport.clientWidth

    viewport.scrollTo({
      left: Math.max(0, Math.min(centred, furthest)),
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [active, reduceMotion])

  const current = DUMMY_PROMPTS[active]

  return (
    <div className="mx-auto w-full max-w-170">
      <div className="flex flex-col gap-2 rounded-6.5 border border-line bg-white px-6 pt-5.5 pb-5 shadow-[0_20px_50px_-24px_rgba(10,35,51,0.38)] transition-shadow duration-200 hover:shadow-[0_26px_60px_-24px_rgba(10,35,51,0.45)] max-sm:rounded-5 max-sm:px-4 max-sm:pt-4 max-sm:pb-4">
        <div className="flex items-start gap-4 max-sm:gap-3">
          <p
            className={cn(
              "min-h-[3.2rem] min-w-0 flex-1 text-4 leading-[1.6] text-ink max-sm:min-h-[3.9rem] max-sm:text-3.375",
              current.arabic && "text-right"
            )}
            dir={current.arabic ? "rtl" : undefined}
            lang={current.arabic ? "ar" : undefined}
            aria-live="polite"
          >
            {current.prompt}
            {/* Caret parked at the end of the line, as if the prompt was just typed. */}
            <span
              className="ms-0.5 inline-block h-[1.05em] w-px translate-y-[.16em] bg-brand-dark motion-safe:animate-pulse"
              aria-hidden="true"
            />
          </p>

          <a
            className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-200 hover:bg-ink-hover max-sm:size-9"
            href={DEMO_URL}
            aria-label="Request a demo to ask dima this"
          >
            <Icon icon={ArrowUp01Icon} size={18} />
          </a>
        </div>

        <ScrollArea
          orientation="horizontal"
          viewportClassName="overscroll-x-none"
        >
          <ul className="flex gap-2 max-sm:pb-3">
            {DUMMY_PROMPTS.map((prompt, index) => (
              <li
                className="shrink-0"
                key={prompt.label}
                ref={(node) => {
                  chips.current[index] = node
                }}
              >
                <button
                  className={cn(
                    "cursor-pointer rounded-full border px-3.5 py-1.5 text-3 font-[460] transition-colors duration-200 max-sm:text-2.75",
                    index === active
                      ? "border-ink bg-ink text-white"
                      : "border-line text-label hover:border-line-control hover:text-ink"
                  )}
                  onClick={() => {
                    select(index)
                    pause()
                  }}
                  type="button"
                  aria-pressed={index === active}
                >
                  {prompt.label}
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </div>
  )
}
