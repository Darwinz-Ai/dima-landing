
import { ArrowLink } from "@/components/shared/ArrowLink"
import { DEMO_URL } from "@/constants"
import { useTranslations } from "next-intl"

export const TimelineIntro = ({ titleId }: { titleId: string }) => {
  const t = useTranslations("Home_New.implementation")
  const tCommon = useTranslations("Home_New.common")

  return (
    <div className="flex items-end justify-between gap-12.5 max-md:block">
      <div className="max-w-155">
        <span className="section-kicker text-3.5">{t("kicker")}</span>
        <h2 className="section-title max-sm:text-[2.6rem]" id={titleId}>
          {t("title")}
        </h2>
        <p className="mt-4 max-w-142.5 text-4 leading-[1.7] text-copy">
          {t("description")}
        </p>
      </div>
      <div className="shrink-0 max-md:mt-5">
        <ArrowLink href={DEMO_URL}>{tCommon("seeDimaCta")}</ArrowLink>
      </div>
    </div>
  )
}
