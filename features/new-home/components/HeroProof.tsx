import Image from "next/image"

import { BRANDS } from "@/constants/brands"

import { cn } from "@/lib/utils"

export const HeroProof = ({ className }: { className?: string }) => (
  <div className={cn("w-[min(100%,520px)]", className)}>
    <ul
      className="grid grid-cols-6 border-t border-l border-line bg-white"
      aria-label="A few of the brands using dima"
    >
      {BRANDS.filter((b) => b.main).map((brand) => (
        <li
          className="flex h-12 items-center justify-center overflow-hidden border-r border-b border-line px-4 py-2.5 max-sm:h-11 max-sm:px-3 max-sm:py-2"
          key={brand.name}
        >
          <Image
            className={cn("h-full w-full object-contain", brand.fit)}
            src={brand.src}
            alt={`${brand.name} logo`}
            width={160}
            height={72}
            sizes="(max-width: 600px) 110px, 165px"
          />
        </li>
      ))}
    </ul>
    <p className="mt-3.5 text-3.25 leading-[1.45] font-[450] text-copy-strong max-sm:mt-3 max-sm:text-3">
      <span className="font-[560] text-ink">250+</span> leading agencies &
      enterprises trust dima
    </p>
  </div>
)
