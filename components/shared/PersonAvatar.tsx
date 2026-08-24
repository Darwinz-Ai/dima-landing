import Image from "next/image"

import { cn } from "@/lib/utils"

/**
 * A person, not a brand. Photographs are cropped to the top of the frame so a
 * face stays centred in the circle regardless of how much torso the original
 * headshot carries; people without one fall back to their initials.
 *
 * Sizing is the caller's call — pass it through `className`.
 */
export const PersonAvatar = ({
  name,
  photo,
  className,
  sizes = "56px",
}: {
  name: string
  /** Headshot, where the person has supplied one. */
  photo?: string
  className?: string
  /** Widths this avatar is rendered at, for the image srcset. */
  sizes?: string
}) => {

  function getInitials(str: string) {
    const parts = str.trim().split(/\s+/)

    return (
      parts.length > 1 ? parts[0][0] + parts[1][0] : str.slice(0, 2)
    ).toUpperCase()
  }

  if (!photo) {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-ink text-2.75 font-[520] tracking-[.02em] text-white",
          className
        )}
        aria-hidden
      >
        {getInitials(name)}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-muted",
        className
      )}
    >
      <Image
        className="object-cover object-top"
        src={photo}
        alt={name}
        fill
        sizes={sizes}
      />
    </span>
  )
}
