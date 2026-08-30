import { FaqIntro } from "./FaqIntro"
import { FaqItem } from "./FaqItem"
import { QuestionAccordion } from "@/types"

interface FaqWidgetProps {
  faqs: QuestionAccordion[]
}

export const FaqWidget = ({ faqs }: FaqWidgetProps) => (
  <section
    className="section-viewport bg-surface desktop-fit:scroll-mt-nav"
    id="faq"
  >
    <div className="page-container grid grid-cols-[.8fr_1.2fr] gap-25 max-md:grid-cols-1 max-md:gap-15 desktop-fit:min-h-120">
      <FaqIntro />

      <div className="border-t border-line-strong">
        {faqs.map((faq, index) => (
          <FaqItem faq={faq} defaultOpen={index === 0} key={`faq-${index}`} />
        ))}
      </div>
    </div>
  </section>
)