
import { getTranslations } from "next-intl/server";

import SectionWrapper from "@/components/shared/SectionWrapper";
import TypewriterComponent from "@/features/home/components/TypewriterComponent";
import LogoCarousel from "@/features/home/components/carousels/LogoCarousel";
import HeroImage from "../components/HeroImage";

export default async function HeroSection() {
  const t = await getTranslations("Home.hero");

  return (
    <SectionWrapper className="flex-col justify-between min-h-dvh mt-12" >
      <div
        className={`container mx-auto flex flex-col lg:flex-row items-center justify-between overflow-hidden grow pb-8 gap-4`}
        id="hero-section"
      >
        {/* Left Side*/}
        <TypewriterComponent />

        {/* Right Side */}
        <HeroImage />
      </div>

      <div className="container mx-auto">
        <h2 className="text-[14px] sm:text-3xl text-center">{t("trustedBy")}</h2>
        <LogoCarousel />
      </div>
    </SectionWrapper>
  );
}