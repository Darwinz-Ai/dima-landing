import { ArrowLink } from "@/components/shared/ArrowLink"
import { DEMO_URL } from "@/constants"
import { useTranslations } from "next-intl"

export const TimelineIntro = ({ titleId }: { titleId: string }) => {
  const t = useTranslations("Home_New.implementation")
  const tCommon = useTranslations("Home_New.common")

  return (
    <div className="flex items-end justify-between gap-12.5 max-md:block">
      <div className="max-w-155">
        <span className="section-kicker text-3.5 max-sm:text-3">{t("kicker")}</span>

        <h2 className="section-title max-sm:text-4xl max-sm:leading-tight" id={titleId}>
          {t("title")}
        </h2>

        <p className="mt-4 max-sm:mt-2 max-w-142.5 text-4 leading-[1.7] text-copy max-sm:text-3.5 max-sm:leading-snug">
          {t("description")}
        </p>
      </div>

      <div className="shrink-0 max-md:mt-5 max-sm:mt-4">
        <ArrowLink href={DEMO_URL}>{tCommon("seeDimaCta")}</ArrowLink>
      </div>
    </div>
  )
}