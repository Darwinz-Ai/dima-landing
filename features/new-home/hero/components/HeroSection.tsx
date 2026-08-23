import { HeroCardFan } from "./HeroCardFan"
import { HeroProof } from "./HeroProof"
import { PlatformScatter } from "./PlatformScatter"

import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { DEMO_URL } from "@/constants"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/shared/Icon"

const gridBackdrop = cn(
  "bg-surface",
  "[background-image:radial-gradient(circle_at_50%_28%,rgba(247,250,249,0.25),var(--surface)_76%),linear-gradient(rgba(10,35,51,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,35,51,0.045)_1px,transparent_1px)]",
  "[background-size:auto,3rem_3rem,3rem_3rem]"
)

export const HeroSection = () => (
  <section
    className={cn(
      "relative flex h-[calc(100svh-var(--spacing-chrome))] flex-col overflow-clip max-md:h-auto",
      gridBackdrop
    )}
    id="top"
  >
    <PlatformScatter className="max-md:hidden" />

    <div className="relative z-1 page-container flex h-full flex-col items-center pt-10 text-center max-sm:pt-9 desktop-fit:pt-11">
      <p className="mb-5 shrink-0 font-display text-2.75 leading-[1.75] tracking-[.14em] uppercase max-sm:mb-4 max-sm:text-2.5">
        <span className="block font-bold text-ink">
          Arabic-first media intelligence
        </span>
        <span className="block font-medium text-label">
          Built for agencies &amp; enterprises
        </span>
      </p>

      <h1 className="max-w-[15ch] shrink-0 text-[clamp(2.6rem,4.2vw,3.95rem)] leading-[.95] font-[520] tracking-[-.075em] text-balance max-sm:text-[clamp(2.35rem,10vw,2.9rem)]">
        Know what your market is saying.
        <span className="block max-sm:mt-1">
          <mark className="bg-transparent bg-[linear-gradient(transparent_52%,rgba(30,185,212,0.5)_52%)] bg-no-repeat bg-size-[0%_100%] animate-highlight box-decoration-clone px-[0.04em] font-[450] text-ink">
            Before anyone else.
          </mark>
        </span>
      </h1>

      <p className="mt-5 max-w-130 shrink-0 text-3.75 leading-[1.6] text-copy-strong">
        dima watches social, news, TV and radio in every Arabic dialect,
        then tells you what changed, why it happened, and what to do about it.
      </p>

      <form
        className="mt-6 flex h-13.5 w-[min(100%,500px)] shrink-0 border border-ink bg-white transition-shadow duration-160 ease-[ease] focus-within:shadow-[0_0_0_2px_var(--brand)] max-sm:h-13"
        action={DEMO_URL}
        method="get"
      >
        <label className="sr-only" htmlFor="demo-email">
          Work email
        </label>
        <input
          className="min-w-0 flex-1 bg-transparent px-4.5 text-3.25 outline-none placeholder:text-placeholder"
          id="demo-email"
          name="email"
          type="email"
          placeholder="Work email"
          autoComplete="email"
          required
        />

        <button
          className="group flex min-w-50 cursor-pointer items-center justify-center gap-3 border-l border-ink bg-ink px-4.5 text-3 font-[520] text-white max-sm:min-w-43 max-sm:gap-2 max-sm:px-3.25 max-sm:text-2.875"
          type="submit"
        >
          Book a demo
          <Icon
            className="shrink-0 transition-transform group-hover:translate-x-1"
            icon={ArrowRight01Icon}
            size={16}
          />
        </button>
      </form>

      <HeroProof className="mt-6 shrink-0 max-sm:mt-5" />

      <div className="mt-auto flex w-full min-w-0 shrink-0 justify-center overflow-x-clip deck-fade pt-8 pb-16 max-sm:pt-7 max-sm:pb-12">
        <HeroCardFan />
      </div>
    </div>
  </section>
)
