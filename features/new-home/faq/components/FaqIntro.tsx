import { TextArrowLink } from "@/components/shared/TextArrowLink"
import { DEMO_URL } from "@/constants"
import { useTranslations } from "next-intl"

/**
 * Pins 42px below the sticky header, matching the breathing room the
 * walkthrough rail gets from its own `pt-10.5`. Applied as an offset rather
 * than padding so the heading stays top-aligned with the questions column while
 * it is still in normal flow.
 */
export const FaqIntro = () => {
  const t = useTranslations("Home_New.faq")
  const tCommon = useTranslations("Home_New.common")

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
