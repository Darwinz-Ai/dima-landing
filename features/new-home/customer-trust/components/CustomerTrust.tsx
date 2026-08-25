import Image from "next/image"
import { BrandFlow } from "./BrandFlow"

import { leftRowBrands, rightRowBrands } from "../constants"

export const CustomerTrust = () => (
  <section
    className="overflow-hidden border-y border-line bg-white"
    id="trusted-by"
    aria-label="dima customers"
  >
    <div className="page-container min-h-102.5 border-x border-line pt-18.5 pb-14.5 max-md:min-h-85 max-md:border-x-0 max-md:pt-13.5 max-md:pb-11.25">
      <h2 className="mx-auto max-w-215 px-6 text-center text-[clamp(2rem,3.2vw,2.8rem)] leading-[1.05] font-[520] tracking-[-.045em] text-ui-text max-md:max-w-125 max-md:px-4.5 max-md:text-[clamp(1.8rem,8vw,2.4rem)]">
        Trusted by the agencies and enterprises shaping the region.
      </h2>
      <div
        className="group/trust relative mt-14 grid h-28 grid-cols-[minmax(0,1fr)_112px_minmax(0,1fr)] items-center overflow-hidden max-md:mt-9.5 max-md:h-21.5 max-md:grid-cols-[minmax(0,1fr)_86px_minmax(0,1fr)]"
        aria-label="Customer logos flowing toward dima"
      >
        <BrandFlow brands={leftRowBrands} side="left" />
        <div
          className="relative z-3 grid size-28 place-items-center place-self-center rounded-xl bg-linear-to-br from-brand-dark to-brand-deep shadow-brand max-md:size-21.5"
          aria-label="dima"
        >
          <Image
            className="h-auto w-19.5 brightness-0 invert max-md:w-15"
            src="/dima-logo/dima-logo-white.svg"
            alt="dima"
            width={400}
            height={111}
          />
        </div>
        <BrandFlow brands={rightRowBrands} side="right" />
      </div>
      <p className="mt-10 flex items-center justify-center gap-2.5 text-3.75 font-[450] text-ui-text max-md:mt-8 max-md:text-3">
        250+ leading agencies & enterprises trust dima
      </p>
    </div>
  </section>
)
