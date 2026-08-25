import { TESTIMONIAL_ASSETS } from "../constants"

/**
 * Doubles as the progress readout and the accessible control set — a blockquote
 * cannot live inside a button, so this is what keyboard and assistive tech
 * actually operate.
 */
export const TestimonialProgress = ({
  activeIndex,
  progress,
  onSelect,
}: {
  activeIndex: number
  progress: number
  onSelect: (index: number) => void
}) => (
  <div className="col-span-full grid auto-cols-fr grid-flow-col gap-3 max-sm:gap-2">
    {TESTIMONIAL_ASSETS.map((testimonial, position) => (
      <button
        className="group cursor-pointer py-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        onClick={() => onSelect(position)}
        aria-label={`Show testimonial from ${testimonial.translationKey}`}
        aria-current={position === activeIndex ? "true" : undefined}
        type="button"
        key={testimonial.translationKey}
      >
        <span className="block h-0.5 bg-progress-track transition-colors group-hover:bg-line-control">
          <span
            className="block h-full origin-left bg-brand"
            style={{
              transform: `scaleX(${position === activeIndex ? progress : 0})`,
            }}
          />
        </span>
      </button>
    ))}
  </div>
)
