import dynamic from "next/dynamic"
import { getTranslations } from "next-intl/server"

import { SectionHeading } from "@/components/shared/SectionHeading"

const TestimonialCarousel = dynamic(() => import("@/components/shared/testimonials/components/TestimonialCarousel"), { ssr: true })

export const TestimonialsSection = async () => {
  const t = await getTranslations("Home_New.testimonials")

  return (
    <section className="section-viewport bg-white">
      <div className="page-container">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <TestimonialCarousel />
      </div>
    </section>
  )
}
