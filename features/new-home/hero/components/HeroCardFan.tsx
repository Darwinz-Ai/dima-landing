import { getImageProps } from "next/image"
import heroImageDesktop from "@/public/hero-slides/dima-hero-desktop.webp"
import heroImageTablet from "@/public/hero-slides/dima-hero-tablet.webp"
import heroImageMobile from "@/public/hero-slides/dima-hero-mobile.webp"

export const HeroCardFan = () => {
  const commonProps = {
    alt: "Panels from the dima workspace",
    priority: true,
    className: "h-auto w-full object-contain transition-transform duration-500 ease-out",
  }

  // 1. Explicitly tell Next.js the exact display widths for each device layout
  const { props: desktopProps } = getImageProps({ ...commonProps, src: heroImageDesktop, sizes: "100vw" })
  const { props: tabletProps } = getImageProps({ ...commonProps, src: heroImageTablet, sizes: "100vw" })
  const { props: mobileProps } = getImageProps({ ...commonProps, src: heroImageMobile, sizes: "220px" })

  return (
    <div
      className="flex w-full items-start justify-center"
      aria-label="Panels from the dima workspace"
      dir="ltr"
    >
      <picture className="w-full">
        {/* Desktop */}
        <source
          media="(min-width: 68.75rem)"
          srcSet={desktopProps.srcSet}
          sizes={desktopProps.sizes} // 2. Pass sizes explicitly so it doesn't inherit 220px
        />
        {/* Tablet */}
        <source
          media="(min-width: 50rem)"
          srcSet={tabletProps.srcSet}
          sizes={tabletProps.sizes} // 2. Pass sizes explicitly
        />
        {/* Mobile / Fallback */}
        <img
          {...mobileProps}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </picture>
    </div>
  )
}