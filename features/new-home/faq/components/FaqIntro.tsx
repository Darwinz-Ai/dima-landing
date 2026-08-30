import { TextArrowLink } from "@/components/shared/TextArrowLink"
import { DEMO_URL } from "@/constants"
import { getTranslations } from "next-intl/server"


export const FaqIntro = async () => {
  const t = await getTranslations("Home_New.faq")
  const tCommon = await getTranslations("Home_New.common")

  return (
    <div className="sticky top-[calc(var(--spacing-nav)+2.625rem)] self-start max-md:static">
      <span className="section-kicker text-3.5">{t("kicker")}</span>
      <h2 className="section-title max-w-125">{t("title")}</h2>
      <p className="my-6.25 max-w-105 text-4.5 leading-[1.7] text-copy">
        {t("description")}
      </p>
      <TextArrowLink className="gap-2.25 text-3.75" href={DEMO_URL}>
        {tCommon("seeDimaCta")}
      </TextArrowLink>
    </div>
  )
}
