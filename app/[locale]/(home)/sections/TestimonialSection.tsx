import SectionWrapper from "../../../../components/shared/SectionWrapper";
import TestimonialCarousel from "../components/TestimonialCarousel";
import { testimonialsInfo } from "@/data/home-page";
import { getTranslations } from "next-intl/server";

export default async function TestimonialSection() {
  const t = await getTranslations("Home.testimonials");

  return (
    <SectionWrapper className="px-0 lg:px-6">
      <div className="container mx-auto">
        <h2 className="text-[24px] lg:text-[44px] font-normal text-center mb-8">
          {t("title")}
        </h2>
        <TestimonialCarousel
          items={testimonialsInfo}
        />
      </div>
    </SectionWrapper>
  );
}
