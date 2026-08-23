import { Icon } from "@/components/shared/Icon"
import { HeroCardFan } from "./HeroCardFan"
import { HeroProof } from "./HeroProof"
import { PlatformScatter } from "./PlatformScatter"


import { cn } from "@/lib/utils"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

const gridBackdrop = cn(
  "bg-surface",
  "[background-image:radial-gradient(circle_at_50%_28%,rgba(247,250,249,0.25),var(--surface)_76%),linear-gradient(rgba(10,35,51,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,35,51,0.045)_1px,transparent_1px)]",
  "[background-size:auto,3rem_3rem,3rem_3rem]"
)


export const HeroSection = () => (
  <section
    className={cn(
      "relative flex h-svh min-h-[600px] flex-col overflow-clip max-md:h-auto",
      gridBackdrop
    )}
    id="top"
  >
    <PlatformScatter className="max-md:hidden" />

    <div className="relative z-1 page-container flex h-full flex-col items-center pt-20 max-sm:pt-32 desktop-fit:pt-36 text-center">
      <p className="mb-4 shrink-0 font-display text-3 leading-[1.75] tracking-[.14em] uppercase max-sm:mb-3 max-sm:text-2.75">
        <span className="block font-bold text-ink">
          Arabic-first media intelligence
        </span>
        <span className="block font-medium text-label">
          Built for agencies &amp; enterprises
        </span>
      </p>

      <h1 className="max-w-[15ch] shrink-0 text-[clamp(2.7rem,4.4vw,4.1rem)] leading-[.95] font-bold tracking-[-.075em] text-balance max-sm:text-[clamp(2.3rem,9vw,3rem)]">
        Know what your market is saying.
        <span className="block max-sm:mt-1">
          <mark className="bg-transparent bg-[linear-gradient(transparent_52%,rgba(30,185,212,0.5)_52%)] bg-no-repeat bg-size-[0%_100%] animate-highlight box-decoration-clone px-[0.04em] font-[450] text-ink">
            Before anyone else.
          </mark>
        </span>
      </h1>

      <p className="mt-4 max-w-130 shrink-0 text-3.875 leading-[1.5] text-copy-strong max-sm:text-3.5">
        dima watches social, news, TV and radio in every Arabic dialect,
        then tells you what changed, why it happened, and what to do about it.
      </p>

      <form
        className="mt-5 flex h-14 w-[min(100%,520px)] shrink-0 border border-ink bg-white transition-shadow duration-160 ease-[ease] focus-within:shadow-[0_0_0_2px_var(--brand)] max-sm:h-13"
        action={"/request-demo"}
        method="get"
      >
        <label className="sr-only" htmlFor="demo-email">
          Work email
        </label>
        <input
          className="min-w-0 flex-1 bg-transparent px-4 text-3.5 outline-none placeholder:text-placeholder"
          id="demo-email"
          name="email"
          type="email"
          placeholder="Work email"
          autoComplete="email"
          required
        />

        <button
          className="group flex min-w-52 cursor-pointer items-center justify-center gap-3 border-l border-ink bg-ink px-4 text-3.25 font-[520] text-white max-sm:min-w-44 max-sm:gap-2.5 max-sm:px-3 max-sm:text-3"
          type="submit"
        >
          Book a demo
          <Icon
            className="shrink-0 transition-transform group-hover:translate-x-1"
            icon={ArrowRight01Icon}
            size={17}
          />
        </button>
      </form>

      <HeroProof className="mt-4 shrink-0 max-sm:mt-4" />

      <div className="mt-auto flex w-full min-w-0 shrink-0 justify-center overflow-x-clip deck-fade pt-5 pb-12 max-sm:pt-5 max-sm:pb-10">
        <HeroCardFan />
      </div>
    </div>
  </section>
)