import { getLocale, getTranslations } from "next-intl/server";
import SectionWrapper from "../../../../components/shared/SectionWrapper";
import OwnConversationContent from "../components/OwnConversationContent";

const OWN_CONVERSATION_KEYS = [
  "listen",
  "daily",
  "elevate",
  "benchmark",
  "understand",
] as const;

export default async function OwnConversationSection() {
  const t = await getTranslations("Home.ownConversation");
  const locale = await getLocale();

  const featureTranslations = Object.fromEntries(
    OWN_CONVERSATION_KEYS.map((key) => [
      key,
      {
        title: t(`features.${key}.title`),
        description: t(`features.${key}.description`),
      },
    ])
  );

  return (
    <SectionWrapper>
      <div className="flex flex-col items-center w-full">
        {/* Header */}
        <div className="space-y-3 text-center max-w-3xl">
          <h2 className="text-[24px] md:text-[44px] font-normal my-4">
            {t("title")}
          </h2>
          <p className="text-base lg:text-xl lg:font-light text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* Interactive content */}
        <OwnConversationContent
          featureTranslations={featureTranslations}
          locale={locale}
        />
      </div>
    </SectionWrapper>
  );
}
