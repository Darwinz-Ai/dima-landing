import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { METRICS, SAMPLES, DIFFERENTIATORS } from "../constants"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared/Icon"
import { SampleRow } from "./SampleRow"

const arabicBackdrop = cn(
  "bg-muted",
  "[background-image:radial-gradient(ellipse_78%_58%_at_16%_0%,rgba(30,185,212,0.11),transparent_70%)]"
)

export const ArabicIntelligence = () => (
  <section
    className={cn("section-viewport border-t border-line", arabicBackdrop)}
    id="arabic"
    aria-labelledby="arabic-title"
  >
    <div className="page-container grid grid-cols-[.85fr_1.15fr] items-center gap-x-17.5 gap-y-11 max-md:grid-cols-1 max-md:gap-y-9 md:max-lg:gap-x-10">
      <div className="min-w-0">
        {/* Increased from text-3 to text-3.5 */}
        <span className="section-kicker text-3.5">The part most platforms bolt on</span>
        <h2
          // Increased clamp bounds and max-sm sizes proportionally
          className="mt-4.25 text-[clamp(2.75rem,4.5vw,4.2rem)] leading-none font-medium tracking-[-.06em] max-sm:text-[2.875rem] desktop-fit:text-[clamp(2.8rem,3.75vw,3.7rem)]"
          id="arabic-title"
        >
          Everyone has AI now.
          <br />
          Not everyone has Arabic.
        </h2>

        <ul className="mt-8 grid gap-2.5 max-sm:mt-6 desktop-fit:mt-6">
          {DIFFERENTIATORS.map((point) => (
            <li
              // Increased from text-3.75 to text-4
              className="flex items-start gap-2.5 text-4 leading-normal text-copy-strong"
              key={point}
            >
              <Icon
                className="mt-px shrink-0 text-brand-dark"
                icon={CheckmarkCircle02Icon}
                size={18}
              />
              {/* Increased from text-3.875 to text-4.25 */}
              <span className="text-4.25">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The evidence. Three posts a generic pipeline gets wrong, and what dima returns. */}
      <div className="grid min-w-0 gap-3">
        {SAMPLES.map((sample) => (
          <SampleRow sample={sample} key={sample.post} />
        ))}
      </div>

      {/* Cleaned grid border structure */}
      <ul className="col-span-full grid grid-cols-3 gap-px border border-line bg-line rounded-3xl overflow-hidden max-md:mt-2 max-sm:grid-cols-1">
        {METRICS.map((metric) => (
          <li
            className={cn(
              "px-6.5 py-5.5 max-sm:px-5.5 transition-shadow duration-150",
              metric.featured
                ? "bg-brand text-white shadow-xl border-0 relative z-10 scale-[1.045] ring-4 ring-brand/15 ring-inset"
                : "bg-white"
            )}
            key={metric.title}
          >
            <strong className={cn(
              // Increased clamp bounds slightly
              "text-[clamp(2.5rem,3.5vw,3.4rem)] leading-[.9] font-[530] tracking-[-.07em]",
              metric.featured ? "text-white drop-shadow-md" : "text-brand"
            )}>
              {metric.value}
              <span className={metric.featured ? "text-white opacity-80" : "text-brand"}>
                {metric.suffix}
              </span>
            </strong>
            <h3
              className={cn(
                // Increased from text-4 to text-4.5
                "mt-4 text-4.5 font-medium",
                metric.featured && "text-white drop-shadow-sm"
              )}
            >
              {metric.title}
            </h3>
            <p
              className={cn(
                // Increased from text-3.25 to text-3.75
                "mt-2 text-3.75 leading-[1.65]",
                metric.featured ? "text-white/90" : "text-copy"
              )}
            >
              {metric.description}
            </p>
          </li>
        ))}
      </ul>

    </div>
  </section>
)