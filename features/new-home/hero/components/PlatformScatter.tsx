
import { cn } from "@/lib/utils"
import { PLATFORMS } from "@/constants"
import Image from "next/image"

const SCATTER = [
  {
    x: "7%",
    y: "19%",
    xSm: "4%",
    ySm: "13%",
    scale: 1,
    fade: "opacity-70",
    seconds: 7.5,
  },
  {
    x: "19%",
    y: "37%",
    xSm: "93%",
    ySm: "9%",
    scale: 0.82,
    fade: "opacity-45",
    seconds: 9,
  },
  {
    x: "5%",
    y: "54%",
    xSm: "3%",
    ySm: "33%",
    scale: 0.9,
    fade: "opacity-55",
    seconds: 6.5,
  },
  {
    x: "25%",
    y: "19%",
    xSm: "96%",
    ySm: "32%",
    scale: 0.76,
    fade: "opacity-40",
    seconds: 8.2,
  },
  {
    x: "14%",
    y: "66%",
    xSm: "8%",
    ySm: "51%",
    scale: 1.05,
    fade: "opacity-65",
    seconds: 7,
  },
  {
    x: "29%",
    y: "50%",
    xSm: "91%",
    ySm: "45%",
    scale: 0.72,
    fade: "opacity-35",
    seconds: 9.6,
  },
  {
    x: "73%",
    y: "16%",
    xSm: "2%",
    ySm: "69%",
    scale: 0.88,
    fade: "opacity-50",
    seconds: 8.6,
  },
  {
    x: "88%",
    y: "31%",
    xSm: "95%",
    ySm: "63%",
    scale: 1,
    fade: "opacity-70",
    seconds: 6.8,
  },
  {
    x: "70%",
    y: "49%",
    xSm: "11%",
    ySm: "87%",
    scale: 0.74,
    fade: "opacity-38",
    seconds: 9.2,
  },
  {
    x: "92%",
    y: "58%",
    xSm: "88%",
    ySm: "81%",
    scale: 0.94,
    fade: "opacity-55",
    seconds: 7.8,
  },
  {
    x: "80%",
    y: "68%",
    xSm: "97%",
    ySm: "94%",
    scale: 0.8,
    fade: "opacity-45",
    seconds: 8.9,
  },
]

type DriftStyle = React.CSSProperties & { [key: `--${string}`]: string }

const SCATTERED_PLATFORMS = PLATFORMS.map((platform, index) => {
  const slot = SCATTER[index % SCATTER.length]

  const style: DriftStyle = {
    "--x": slot.x,
    "--y": slot.y,
    "--x-sm": slot.xSm,
    "--y-sm": slot.ySm,
    animationDuration: `${slot.seconds}s`,
    animationDelay: `-${slot.seconds / 2}s`,
  }

  return { ...platform, fade: slot.fade, scale: slot.scale, style }
})

export const PlatformScatter = ({ className }: { className?: string }) => (
  <div
    className={cn("pointer-events-none absolute inset-0", className)}
    aria-hidden
  >
    {SCATTERED_PLATFORMS.map((platform) => (
      <span
        className={cn(
          "absolute top-(--y-sm) left-(--x-sm) -translate-x-1/2 -translate-y-1/2 animate-drift motion-reduce:animate-none md:top-(--y) md:left-(--x)",
          platform.fade
        )}
        style={platform.style}
        key={platform.label}
      >
        <span
          className="grid size-9 place-items-center rounded-full border border-line bg-white/80 text-ink/45 md:size-11"
          style={{ scale: platform.scale }}
        >
          <Image
            src={platform.image}
            alt={platform.label}
            width={28}
            height={28}
            className="object-contain"
            draggable={false}
            priority={false}
          />
        </span>
      </span>
    ))}
  </div>
)
