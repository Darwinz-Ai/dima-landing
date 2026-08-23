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
      "flex min-h-[calc(100svh-var(--spacing-nav))] scroll-mt-nav items-center overflow-hidden border-t border-line py-14 max-md:py-12",
      copilotBackdrop
    )}
    id="dima-ai"
    aria-labelledby="copilot-title"
  >
    <div className="page-container min-w-0">
      {/*
       * The headline is the offer, not the technology. MCP and the assistant
       * logos below the console are genuinely impressive to a technical buyer
       * and genuinely confusing as a value proposition, so they stay an
       * aside to this line rather than a second pitch competing with it.
       */}
      <div className="mx-auto max-w-190 text-center">
        <h2
          className="mx-auto max-w-[18ch] text-[clamp(2.1rem,3.7vw,3.3rem)] leading-[1.02] font-medium tracking-[-.06em] text-balance max-sm:text-[1.95rem]"
          id="copilot-title"
        >
          Ask dima anything about your market.
        </h2>
        <p className="mx-auto mt-5 max-w-135 text-3.75 leading-[1.7] text-copy-strong max-sm:text-3.5">
          In English or in Arabic, and it answers in the same dialect it was
          asked in.
        </p>
      </div>

      <div className="mt-10 max-sm:mt-7">
        <PromptConsole />
        <McpNote />
      </div>

      {/*
       * Deliberately not the site-wide `ArrowLink`: its squared body and
       * bright arrow cap fight the rounded console above it. This section
       * carries the composer's language instead — pill body, ink fill, and
       * the same circular arrow as the send button.
       */}
      <div className="mt-9 flex justify-center max-sm:mt-8">
        <a
          className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pr-2 pl-7 text-3.375 font-medium tracking-[-.01em] text-white transition-colors duration-200 hover:bg-ink-hover max-sm:h-11 max-sm:pl-6 max-sm:text-3.25"
          href={DEMO_URL}
        >
          See dima with your market
          <span className="grid size-8 place-items-center rounded-full bg-white/12 transition-transform duration-200 group-hover:translate-x-0.5 max-sm:size-7">
            <Icon icon={ArrowRight01Icon} size={15} />
          </span>
        </a>
      </div>
    </div>
  </section>
)
