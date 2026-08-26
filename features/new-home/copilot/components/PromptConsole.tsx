"use client"

import { useEffect, useRef } from "react"
import { useRotation } from "@/lib/useRotation"

import { ScrollArea } from "@/components/ui/scroll-area"

import { ArrowUp01Icon } from "@hugeicons/core-free-icons"

import { PROMPT_META, PROMPT_DURATION_MS } from "../constants"
import { DEMO_URL } from "@/constants"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared/Icon"
import { useTranslations } from "next-intl"
import { type PromptInputType } from "../types"

export const PromptConsole = () => {
  const t = useTranslations("Home_New.copilot")
  const prompts = (t.raw("prompts") as PromptInputType[]).map((prompt, index) => ({
    ...prompt,
    arabic: PROMPT_META[index]?.arabic,
  }))

  const {
    index: active,
    select,
    pause,
    reduceMotion,
  } = useRotation({
    count: prompts.length,
    durationMs: PROMPT_DURATION_MS,
  })

  const chips = useRef<(HTMLLIElement | null)[]>([])

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

  const current = prompts[active]

  return (
    <div className="mx-auto w-full max-w-[55rem]">
      <div className="flex flex-col gap-6 rounded-[2.25rem] border border-line bg-white px-9 pt-8 pb-7 shadow-[0_20px_50px_-24px_rgba(10,35,51,0.38)] transition-shadow duration-200 hover:shadow-[0_26px_60px_-24px_rgba(10,35,51,0.45)] max-sm:rounded-[1.75rem] max-sm:px-5 max-sm:pt-6 max-sm:pb-6">
        <div className="flex items-start gap-6 max-sm:gap-4">
          <p
            className={cn(
              "min-h-[5rem] min-w-0 flex-1 text-4.5 leading-[1.6] text-ink max-sm:min-h-[4.5rem] max-sm:text-3.875",
              current.arabic && "text-right"
            )}
            dir={current.arabic ? "rtl" : undefined}
            lang={current.arabic ? "ar" : undefined}
            aria-live="polite"
          >
            <bdi>{current.prompt}</bdi>
            <span
              className="ms-0.5 inline-block h-[1.05em] w-px translate-y-[.16em] bg-brand-dark motion-safe:animate-pulse"
              aria-hidden="true"
            />
          </p>

          <a
            className="grid size-15 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors duration-200 hover:bg-ink-hover max-sm:size-12"
            href={DEMO_URL}
            aria-label="Request a demo to ask dima this"
          >
            <Icon icon={ArrowUp01Icon} size={26} />
          </a>
        </div>

        <ScrollArea
          orientation="horizontal"
          viewportClassName="overscroll-x-none"
        >
          <ul className="flex gap-3.5 max-sm:pb-3">
            {prompts.map((prompt, index) => (
              <li
                className="shrink-0"
                key={prompt.label}
                ref={(node) => {
                  chips.current[index] = node
                }}
              >
                <button
                  className={cn(
                    "cursor-pointer rounded-full border px-6 py-2.5 text-3.5! font-[460] transition-colors duration-200 max-sm:px-4 max-sm:py-2 max-sm:text-3.25!",
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
