import { SectionHeading } from "@/components/shared/SectionHeading"
import { TestimonialCarousel } from "./TestimonialCarousel"

export const TestimonialsSection = () => (
  <section className="section-viewport bg-white">
    <div className="page-container">
      <SectionHeading
        eyebrow="From the teams inside"
        title="What listening better sounds like."
      />

      <TestimonialCarousel />
    </div>
  </section>
)
