import { McpNote } from "./McpNote"
import { PromptConsole } from "./PromptConsole"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { DEMO_URL } from "@/constants"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared/Icon"
import { useLocale, useTranslations } from "next-intl"

const copilotBackdrop = cn(
  "bg-surface",
  "[background-image:radial-gradient(ellipse_58%_44%_at_50%_10%,rgba(30,185,212,0.16),transparent_72%),linear-gradient(rgba(10,35,51,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,35,51,0.035)_1px,transparent_1px)]",
  "[background-size:auto,3rem_3rem,3rem_3rem]"
)

export const CopilotSection = () => {
  const t = useTranslations("Home_New.copilot")
  const tCommon = useTranslations("Home_New.common")
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section
      className={cn(
        "flex min-h-dvh scroll-mt-nav items-center overflow-hidden border-t border-line py-24 max-md:py-16",
        copilotBackdrop
      )}
      id="dima-ai"
      aria-labelledby="copilot-title"
    >
      <div className="page-container min-w-0">
        <div className="mx-auto max-w-[60rem] text-center">
          <h2
            className="mx-auto max-w-[18ch] text-[clamp(2.4rem,4.2vw,3.6rem)] leading-[1.02] font-medium tracking-[-.06em] text-balance max-sm:text-[2.25rem]"
            id="copilot-title"
          >
            {t("title")}
          </h2>
          <p className="mx-auto mt-8 max-w-[45rem] text-4.25 leading-[1.7] text-copy-strong max-sm:text-4">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 max-sm:mt-8">
          <PromptConsole />
          <McpNote />
        </div>

        <div className="mt-10 flex justify-center max-sm:mt-8">
          <a
            className="group inline-flex h-16 items-center gap-4 rounded-full bg-ink pe-3 ps-9 text-3.875 font-medium tracking-[-.01em] text-white transition-colors duration-200 hover:bg-ink-hover max-sm:h-14 max-sm:pl-7 max-sm:text-3.75"
            href={DEMO_URL}
          >
            {tCommon("seeDimaCta")}
            <span
              className={cn(
                "grid size-11 place-items-center rounded-full bg-white/12 transition-transform duration-200 max-sm:size-9",
                isRTL
                  ? "group-hover:-translate-x-0.5 rotate-180"
                  : "group-hover:translate-x-0.5"
              )}
            >
              <Icon icon={ArrowRight01Icon} size={22} />
            </span>
          </a>
        </div>

      </div>
    </section>
  )
}
