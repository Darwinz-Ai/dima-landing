import Image from "next/image"
import { HERO_CARDS } from "../constants/cards"


const FAN_CARDS = HERO_CARDS.map((card, index) => {
  const middle = (HERO_CARDS.length - 1) / 2
  const offset = (index - middle) / middle

  return {
    ...card,
    zIndex: HERO_CARDS.length - Math.abs(index - middle),
    transform: `translateY(${(offset * offset * 2.4).toFixed(2)}rem) rotate(${(
      offset * 13
    ).toFixed(2)}deg) rotateY(${(offset * -14).toFixed(2)}deg)`,
  }
})
const CENTRE_CARD = Math.floor(HERO_CARDS.length / 2)

export const HeroCardFan = () => (
  <div
    className="flex w-max items-start justify-center perspective-[1600px]"
    aria-label="Panels from the dima workspace"
    role="group"
  >
    {FAN_CARDS.map((card, index) => (
      <div
        className="-ml-10 shrink-0 first:ml-0"
        style={{ transform: card.transform, zIndex: card.zIndex }}
        key={card.alt}
      >
        <figure className="h-54 w-46 overflow-hidden border border-line-strong bg-white transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none">
          <Image
            className="size-full object-cover object-top-left"
            src={card.src}
            alt={card.alt}
            quality={92}
            sizes="(max-width: 1024px) 45vw, 620px"
            priority={index === CENTRE_CARD}
          />
        </figure>
      </div>
    ))}
  </div>
)
