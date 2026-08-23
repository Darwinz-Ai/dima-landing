
import { Icon } from "@/components/shared/Icon"
import { PLATFORMS } from "@/constants"

export const SourceMarquee = () => (
  <div className="overflow-hidden border-t border-night-line">
    <div className="flex w-max animate-marquee motion-reduce:animate-none">
      {[0, 1].map((copy) => (
        <ul
          className="flex min-w-screen shrink-0 items-center justify-around"
          aria-label={copy === 0 ? "Supported media sources" : undefined}
          aria-hidden={copy === 1}
          key={copy}
        >
          {PLATFORMS.map((platform) => (
            <li
              className="flex h-18.5 shrink-0 items-center px-1.75 text-white/75 max-md:h-14 max-md:px-5"
              key={platform.label}
            >
              <Icon icon={platform.icon} size={22} />
              <span className="sr-only">{platform.label}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
)
