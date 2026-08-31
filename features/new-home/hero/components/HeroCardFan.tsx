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

  const { props: desktopProps } = getImageProps({ ...commonProps, src: heroImageDesktop })
  const { props: tabletProps } = getImageProps({ ...commonProps, src: heroImageTablet })
  const { props: mobileProps } = getImageProps({ ...commonProps, src: heroImageMobile })

  return (
    <div
      className="flex w-full items-start justify-center"
      aria-label="Panels from the dima workspace"
      dir="ltr"
    >
      <picture className="w-full">
        {/* Desktop: lg breakpoint (68.75rem / 1100px) */}
        <source
          media="(min-width: 68.75rem)"
          srcSet={desktopProps.src}
          width={1280}
          height={286}
        />
        {/* Tablet: md breakpoint (50rem / 800px) */}
        <source
          media="(min-width: 50rem)"
          srcSet={tabletProps.src}
          width={868}
          height={286}
        />
        {/* Mobile / Fallback */}
        <img
          src={mobileProps.src}
          alt="Panels from the dima workspace"
          width={558}
          height={286}
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