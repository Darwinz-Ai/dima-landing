import { ArrowLink } from "@/components/shared/ArrowLink"
import { CtaPattern } from "./CtaPattern"

import { DEMO_URL } from "@/constants"

export const FinalCta = () => (
  <section className="bg-surface">
    <div className="relative page-container flex min-h-[min(560px,calc(100svh-var(--spacing-nav)))] flex-col items-center justify-center overflow-hidden rounded-t-3xl bg-brand px-5 text-center max-sm:min-h-135">
      <CtaPattern />

      <span className="relative z-2 section-kicker text-3.5 text-ink/65">
        Your market is already talking
      </span>

      <h2 className="relative z-2 mt-5 text-[clamp(2.9rem,5.6vw,5.6rem)] leading-[.94] font-medium tracking-[-.075em] max-sm:text-[2.9rem] desktop-fit:text-[clamp(2.9rem,4.8vw,4.8rem)]">
        The question is whether
        <br />
        you hear it first.
      </h2>
      <p className="relative z-2 my-7.5 max-w-140 text-4 leading-[1.7] text-ink/75">
        See what dima finds in your own brand, your own competitors and
        your own dialects, before you commit to anything.
      </p>
      <div className="relative z-2">
        <ArrowLink href={DEMO_URL} light>
          See dima with your market
        </ArrowLink>
      </div>
      {/* Last objection, answered on the way out. */}
      <p className="relative z-2 mt-6 text-3.75 font-medium tracking-[.02em] text-ink/65">
        Live in 48-72 hours.
      </p>
    </div>
  </section>
)