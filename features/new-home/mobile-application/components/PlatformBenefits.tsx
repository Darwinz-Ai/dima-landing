import { Icon } from "@/components/shared/Icon"
import { BENEFIT_ICONS } from "../constants"
import { useTranslations } from "next-intl"

export const PlatformBenefits = () => {
  const t = useTranslations("Home_New.mobile-application")
  const benefits = t.raw("benefits") as { title: string; description: string }[]

  return (
    <div className="my-10.5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-night-line bg-night-line max-md:hidden desktop-fit:my-7">
      {benefits.map((benefit, index) => (
        <div
          className="grid grid-cols-[auto_1fr] gap-x-3.25 bg-ink px-5 py-5.5 desktop-fit:p-4.25"
          key={benefit.title}
        >
          <span className="row-span-2 grid size-8.5 place-items-center rounded-lg bg-brand/12 text-brand">
            <Icon icon={BENEFIT_ICONS[index]} />
          </span>
          <h3 className="text-4 font-medium">{benefit.title}</h3>
          <p className="text-3.5 leading-[1.55] text-ui-label">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  )
}
