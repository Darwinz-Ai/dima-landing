import { FaqIntro } from "./FaqIntro"
import { FaqItem } from "./FaqItem"
import { QuestionAccordion } from "@/types"

interface FaqSectionProps {
  faqs: QuestionAccordion[]
}

export const FaqSection = ({ faqs }: FaqSectionProps) => (
  <section
    className="section-viewport bg-surface desktop-fit:scroll-mt-nav"
    id="faq"
  >
    <div className="page-container grid grid-cols-[.8fr_1.2fr] gap-25 max-md:grid-cols-1 max-md:gap-15 desktop-fit:min-h-120">
      <FaqIntro />

      <div className="border-t border-line-strong">
        {/* Changed FAQS constant to the faqs prop */}
        {faqs.map((faq, index) => (
          <FaqItem faq={faq} defaultOpen={index === 0} key={`faq-${index}`} />
        ))}
      </div>
    </div>
  </section>
)