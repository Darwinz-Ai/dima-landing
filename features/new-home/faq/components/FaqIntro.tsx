import { TextArrowLink } from "@/components/shared/TextArrowLink"
import { DEMO_URL } from "@/constants"

/**
 * Pins 42px below the sticky header, matching the breathing room the
 * walkthrough rail gets from its own `pt-10.5`. Applied as an offset rather
 * than padding so the heading stays top-aligned with the questions column while
 * it is still in normal flow.
 */
export const FaqIntro = () => (
  <div className="sticky top-[calc(var(--spacing-nav)+2.625rem)] self-start max-md:static">
    <span className="section-kicker">Your questions, answered</span>
    <h2 className="section-title max-w-125">A clear view, from the start.</h2>
    <p className="my-6.25 max-w-105 text-3.5 leading-[1.7] text-copy">
      See dima with your own market and use case.
    </p>
    <TextArrowLink className="gap-2.25 text-3.25" href={DEMO_URL}>
      See dima with your market
    </TextArrowLink>
  </div>
)
