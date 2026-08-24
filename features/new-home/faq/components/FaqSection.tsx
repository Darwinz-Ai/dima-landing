import { FaqIntro } from "./FaqIntro"
import { FaqItem } from "./FaqItem"

import { FAQS } from "../constants"

export const FaqSection = () => (
  <section
    className="section-viewport bg-surface desktop-fit:scroll-mt-nav"
    id="faq"
  >
    {/*
     * The `min-h` is what makes the heading actually stick. A sticky box can
     * only travel inside its own grid area, and while the grid was centred in
     * the section that area was just the height of the questions column —
     * about 95px more than the heading itself, so it pinned for a single
     * scroll step and released. This floor gives it roughly 230px of travel
     * without stretching the grid to the full pane, which left a screenful of
     * dead space under four questions.
     */}
    <div className="page-container grid grid-cols-[.8fr_1.2fr] gap-25 max-md:grid-cols-1 max-md:gap-15 desktop-fit:min-h-120">
      <FaqIntro />

      <div className="border-t border-line-strong">
        {FAQS.map((faq, index) => (
          <FaqItem faq={faq} defaultOpen={index === 0} key={faq.question} />
        ))}
      </div>
    </div>
  </section>
)
