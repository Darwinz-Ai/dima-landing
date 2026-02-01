import SectionWrapper from "../../../../components/shared/SectionWrapper";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import RequestDemoButton from "../../../../components/shared/form/RequestDemoButton";

function DimaAiSection() {
  const t = useTranslations("Home.dimaAi");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <SectionWrapper>
      <div className="container mx-auto p-6 sm:px-24  text-white rounded-4xl lg:rounded-[64px] bg-[#043558] max-w-[1348px]">
        <div
          className={`flex flex-col lg:flex-row justify-between items-center gap-8`}
        >
          {/* Text Section */}
          <div className={`flex-1 space-y-6 text-left ${isRTL ? "text-right" : ""}`}>
            <p className="text-sm mb-4 font-bold">{t("badge")}</p>
            <h2 className="text-[24px] lg:text-[44px] font-normal text-[#95DDEE] leading-tight capitalize">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {t("description")}
            </p>
            <RequestDemoButton size={"xl"} className="bg-[#115687]! hover:bg-[#115687]/80! transition-colors duration-200" />
          </div>

          {/* Image Section */}
          <figure
            className={`relative w-full lg:flex-1 h-[220px] sm:h-[300px] lg:h-[500px] max-w-[500px] mr-0 lg:-mr-6`}
          >
            <Image
              src="/dima-phone.png"
              alt="stats"
              fill
              className="object-contain "
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default DimaAiSection;
