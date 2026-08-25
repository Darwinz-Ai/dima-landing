import Image from "next/image"

import { BrowserTab } from "@/components/shared/BrowserTab"

import { type ProductScreenType } from "../types"

export function ProductFrame({
  screen,
  index,
  total,
}: {
  screen: ProductScreenType
  index: number
  total: number
}) {
  return (
    <article
      className="flex min-h-[calc(100svh-var(--spacing-nav))] scroll-mt-nav flex-col justify-center gap-4.5 border-b border-line py-8 last:border-b-0 max-md:min-h-0 max-md:gap-3.5 max-md:py-7"
      id={`product-feature-${index + 1}`}
      data-product-frame=""
    >
      <div>
        <span className="font-mono text-3.5 tracking-widest text-ui-muted uppercase">
          {screen.number} / {String(total).padStart(2, "0")} · {screen.title} ·{" "}
          {screen.eyebrow}
        </span>
        <h3 className="mt-2 max-w-180 text-[clamp(2.3rem,3.75vw,3.55rem)] leading-[.98] font-normal tracking-[-.06em]">
          {screen.outcome}
        </h3>
        <p className="mt-2.5 max-w-155 text-base leading-[1.55] text-copy">
          {screen.description}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-product-border bg-white shadow-float">
        <BrowserTab title={screen.title} />
        <div className="relative aspect-2557/1390 overflow-hidden bg-ui-chrome rounded-b-lg">
          <Image
            className="object-cover"
            src={screen.src}
            alt={screen.alt}
            fill
            preload={index === 0}
            sizes="(max-width: 800px) 100vw, 64vw"
          />
        </div>
      </div>
    </article>
  )
}