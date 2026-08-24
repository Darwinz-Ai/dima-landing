import Image from "next/image"
import dimaLogo from "@/public/dima-logo/dima-logo.svg"

import { cn } from "@/lib/utils"

/** The dima wordmark. `light` knocks it out to white for dark backgrounds. */
export const BrandLogo = ({ light = false }: { light?: boolean }) => (
  <Image
    src={dimaLogo}
    alt="dima"
    preload
    className={cn("h-auto w-26", light && "brightness-0 invert")}
  />
)
