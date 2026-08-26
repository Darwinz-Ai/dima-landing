import { SectionHeading } from "@/components/shared/SectionHeading"
import { TestimonialCarousel } from "./TestimonialCarousel"
import { useTranslations } from "next-intl"

export const TestimonialsSection = () => {
  const t = useTranslations("Home_New.testimonials")

  return (
    <section className="section-viewport bg-white">
      <div className="page-container">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <TestimonialCarousel />
      </div>
    </section>
  )
}
