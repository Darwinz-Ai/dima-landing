import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared/Icon"
import { SampleRow } from "./SampleRow"
import { type MetricType, type SampleType } from "../types"
import { useTranslations } from "next-intl"

const arabicBackdrop = cn(
  "bg-muted",
  "[background-image:radial-gradient(ellipse_78%_58%_at_16%_0%,rgba(30,185,212,0.11),transparent_70%)]"
)

// Helper: for robust t pathing for this block
function useArabicIntelligenceStrings() {
  // Namespace matches en.json: Home_New.arabic-intelligence
  const t = useTranslations("Home_New.arabic-intelligence")
  return {
    sectionKicker: t("title"),
    mainHeading: t("mainHeading"),
    differentiators: t.raw("differentiators") as string[],
    samples: t.raw("samples") as SampleType[],
    metrics: t.raw("metrics") as MetricType[],
  }
}

export const ArabicIntelligence = () => {
  const { sectionKicker, mainHeading, differentiators, samples, metrics } = useArabicIntelligenceStrings()

  // Split mainHeading on \n (per en.json), with <br/> inserted
  const headingParts = mainHeading.split("\n")
  return (
    <section
      className={cn("section-viewport border-t border-line", arabicBackdrop)}
      id="arabic"
      aria-labelledby="arabic-title"
    >
      <div className="page-container grid grid-cols-[.85fr_1.15fr] items-center gap-x-17.5 gap-y-11 max-md:grid-cols-1 max-md:gap-y-9 md:max-lg:gap-x-10">
        <div className="min-w-0">
          {/* i18n title */}
          <span className="section-kicker text-3.5">{sectionKicker}</span>
          <h2
            className="mt-4.25 text-[clamp(2.75rem,4.5vw,4.2rem)] leading-none font-medium tracking-[-.06em] max-sm:text-[2.875rem] desktop-fit:text-[clamp(2.8rem,3.75vw,3.7rem)]"
            id="arabic-title"
          >
            {headingParts.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>

          <ul className="mt-8 grid gap-2.5 max-sm:mt-6 desktop-fit:mt-6">
            {differentiators.map((point) => (
              <li
                className="flex items-start gap-2.5 text-4 leading-normal text-copy-strong"
                key={point}
              >
                <Icon
                  className="mt-px shrink-0 text-brand-dark"
                  icon={CheckmarkCircle02Icon}
                  size={18}
                />
                <span className="text-4.25">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The evidence. */}
        <div className="grid min-w-0 gap-3">
          {samples.map((sample) => (
            <SampleRow sample={sample} key={sample.post} />
          ))}
        </div>

        <ul className="col-span-full grid grid-cols-3 gap-px border border-line bg-line rounded-3xl overflow-hidden max-md:mt-2 max-sm:grid-cols-1">
          {metrics.map((metric) => (
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
                  "mt-4 text-4.5 font-medium",
                  metric.featured && "text-white drop-shadow-sm"
                )}
              >
                {metric.title}
              </h3>
              <p
                className={cn(
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
}