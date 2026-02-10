
import SectionWrapper from "../../../../components/shared/SectionWrapper";
import Image from "next/image";
import TypewriterComponent from "../components/TypewriterComponent";
import { getLocale, getTranslations } from "next-intl/server";
import LogoCarousel from "../components/LogoCarousel";


export default async function HeroSection() {
  const t = await getTranslations("Home.hero");
  const locale = await getLocale();

  return (
    <SectionWrapper className="flex-col justify-between min-h-dvh mt-12">
      <div
        className={`container mx-auto flex flex-col lg:flex-row items-center justify-between overflow-hidden grow pb-8 gap-4`}
        id="hero-section"
      >
        {/* Left Side: Dynamic Text */}
        <TypewriterComponent />

        {/* Right Side: Image */}
        <figure className="relative w-full lg:flex-1 aspect-1920/1793 h-auto min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          <Image
            src={`/hero-bg-${locale}.webp`}
            alt="Hero image"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
            priority={true}
            fetchPriority="high"
            className="object-contain"

          />
          {/* <Image
            src={`/hero-bg-${locale}-mobile.png`}
            alt="Hero image"
            fill
            sizes="100vw"
            priority={true}
            fetchPriority="high"
            className="object-contain block sm:hidden"

          /> */}
        </figure>
      </div>
      <div className="container mx-auto">
        <h2 className="text-[14px] sm:text-3xl text-center">{t("trustedBy")}</h2>
        <LogoCarousel />
      </div>
    </SectionWrapper>
  );
}
