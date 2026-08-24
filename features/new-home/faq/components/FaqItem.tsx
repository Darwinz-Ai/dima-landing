import { type FaqType } from "../types"

/** Plus/minus toggle drawn from the marker's two pseudo-elements; the vertical stroke rotates flat when open. */
const toggleMarkClass =
  "relative size-6.5 shrink-0 border border-line-control before:absolute before:top-1/2 before:left-1/2 before:h-px before:w-2.25 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-ink after:absolute after:top-1/2 after:left-1/2 after:h-px after:w-2.25 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-90 after:bg-ink after:transition-transform group-open:after:rotate-0 rounded-sm"

/** Native `<details>` disclosure, so the FAQ needs no client JavaScript. */
export const FaqItem = ({
  faq,
  defaultOpen = false,
}: {
  faq: FaqType
  defaultOpen?: boolean
}) => (
  <details className="group border-b border-line-strong" open={defaultOpen}>
    <summary className="flex min-h-21.5 cursor-pointer list-none items-center justify-between gap-6.25 px-1.25 py-5 text-4.25 font-medium tracking-[-.015em] desktop-fit:min-h-18 [&::-webkit-details-marker]:hidden">
      {faq.question}
      <span className={toggleMarkClass} />
    </summary>
    <p className="max-w-175 pt-0 pr-13.75 pb-7 pl-1.25 text-3.25 leading-[1.75] text-label">
      {faq.answer}
    </p>
  </details>
)
