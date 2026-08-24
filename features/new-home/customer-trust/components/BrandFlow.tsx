import Image from "next/image"

import { BRANDS } from "@/constants"

import { cn } from "@/lib/utils"

const sideStyles = {
  left: "after:right-0 after:bg-[linear-gradient(to_left,white,transparent)]",
  right: "after:left-0 after:bg-[linear-gradient(to_right,white,transparent)]",
} as const
const sideAnimation = {
  left: "animate-trust-rightward",
  right: "animate-trust-leftward",
} as const

/** Feathered edges so logos dissolve instead of being clipped by the container. */
const flowMask =
  "[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]"
/** Overlay strip painted over the inner edge, on top of the moving track. */
const edgeFade =
  "after:pointer-events-none after:absolute after:inset-y-0 after:z-1 after:w-8.5 after:content-['']"

export const BrandFlow = ({
  brands,
  side,
}: {
  brands: typeof BRANDS
  side: "left" | "right"
}) => (
  <div
    className={cn(
      "relative min-w-0 overflow-hidden py-2.75 max-md:py-1.75",
      flowMask,
      edgeFade,
      sideStyles[side]
    )}
  >
    <div
      className={cn(
        "flex w-max will-change-transform group-hover/trust:[animation-play-state:paused] motion-reduce:animate-none",
        sideAnimation[side]
      )}
    >
      {/* Two identical tracks: the animation translates by -50% for a seamless loop. */}
      {[0, 1].map((copy) => (
        <div
          className="flex shrink-0 gap-6.5 pr-6.5 max-md:gap-3.5 max-md:pr-3.5 md:max-lg:gap-5 md:max-lg:pr-5"
          aria-hidden={copy === 1}
          key={copy}
        >
          {brands.map((brand) => (
            <span
              className="flex size-22 shrink-0 items-center justify-center overflow-hidden rounded-2 border border-ui-line-soft bg-white p-3.5 max-md:size-17.5 max-md:p-2.5"
              key={`${copy}-${brand.name}`}
            >
              <Image
                src={brand.src}
                alt={copy === 0 ? `${brand.name} logo` : ""}
                width={160}
                height={72}
                className={cn("h-full w-full object-contain", brand.fit)}
                sizes="(max-width: 600px) 70px, 88px"
              />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
)
