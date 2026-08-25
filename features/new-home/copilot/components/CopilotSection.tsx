import { McpNote } from "./McpNote"
import { PromptConsole } from "./PromptConsole"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { DEMO_URL } from "@/constants"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared/Icon"

const copilotBackdrop = cn(
  "bg-surface",
  "[background-image:radial-gradient(ellipse_58%_44%_at_50%_10%,rgba(30,185,212,0.16),transparent_72%),linear-gradient(rgba(10,35,51,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,35,51,0.035)_1px,transparent_1px)]",
  "[background-size:auto,3rem_3rem,3rem_3rem]"
)

export const CopilotSection = () => (
  <section
    className={cn(
      // Changed from min-h-[calc(100svh-var(--spacing-nav))] to min-h-dvh
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
          Ask dima anything about your market.
        </h2>
        <p className="mx-auto mt-8 max-w-[45rem] text-4.25 leading-[1.7] text-copy-strong max-sm:text-4">
          In English or in Arabic, and it answers in the same dialect it was
          asked in.
        </p>
      </div>

      {/* Pulled the console closer to the paragraph (mt-16 -> mt-12, max-sm:mt-8) */}
      <div className="mt-12 max-sm:mt-8">
        <PromptConsole />
        <McpNote />
      </div>

      {/* Pulled the CTA button closer to the MCP note (mt-14 -> mt-10, max-sm:mt-8) */}
      <div className="mt-10 flex justify-center max-sm:mt-8">
        <a
          className="group inline-flex h-16 items-center gap-4 rounded-full bg-ink pr-3 pl-9 text-3.875 font-medium tracking-[-.01em] text-white transition-colors duration-200 hover:bg-ink-hover max-sm:h-14 max-sm:pl-7 max-sm:text-3.75"
          href={DEMO_URL}
        >
          See dima with your market
          <span className="grid size-11 place-items-center rounded-full bg-white/12 transition-transform duration-200 group-hover:translate-x-0.5 max-sm:size-9">
            <Icon icon={ArrowRight01Icon} size={22} />
          </span>
        </a>
      </div>
    </div>
  </section>
)