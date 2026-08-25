import Image from "next/image"
import { BRANDS } from "@/constants/brands"
import { cn } from "@/lib/utils"

export const HeroProof = ({ className }: { className?: string }) => (
  <div className={cn("w-[min(100%,600px)]", className)}>
    <p className="mb-3.5 text-3.75 leading-[1.45] font-[450] text-copy-strong max-sm:mb-3 max-sm:text-3.5">
      <span className="font-[560] text-ink">250+</span> leading agencies &
      enterprises trust dima
    </p>
    <ul
      className="grid grid-cols-6 border-t border-l border-line bg-white"
      aria-label="A few of the brands using dima"
    >
      {BRANDS.filter((b) => b.main).map((brand) => (
        <li
          className="flex h-16 items-center justify-center overflow-hidden border-r border-b border-line px-4 py-3 max-sm:h-13 max-sm:px-2.5 max-sm:py-1.5"
          key={brand.name}
        >
          <div className="flex items-center justify-center h-full w-full">
            <Image
              className={cn("h-[48px] max-h-full w-auto object-contain", brand.fit)}
              src={brand.src}
              alt={`${brand.name} logo`}
              width={200}
              height={90}
              sizes="(max-width: 600px) 130px, 200px"
              priority
            />
          </div>
        </li>
      ))}
    </ul>
  </div>
)