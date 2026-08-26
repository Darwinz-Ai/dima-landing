import { useTranslations } from "next-intl"
import { ProductWalkthroughShell } from "./ProductWalkthroughShell"
import { ProductFrame } from "./ProductFrame"
import { PRODUCT_ASSETS } from "../constants"

export const ProductWalkthrough = () => {
  const t = useTranslations("Home_New.product-walkthrough")
  const totalSteps = String(PRODUCT_ASSETS.length).padStart(2, "0")

  // Hydrate the steps with translations
  const steps = PRODUCT_ASSETS.map((asset, index) => ({
    number: asset.number,
    eyebrow: t(`steps.${index}.eyebrow`),
    title: t(`steps.${index}.title`),
    outcome: t(`steps.${index}.outcome`),
    total: totalSteps,
  }))

  // Hydrate the screens with translations
  const screens = PRODUCT_ASSETS.map((asset, index) => ({
    ...asset,
    alt: t(`steps.${index}.alt`),
    eyebrow: t(`steps.${index}.eyebrow`),
    title: t(`steps.${index}.title`),
    outcome: t(`steps.${index}.outcome`),
    description: t(`steps.${index}.description`),
  }))

  return (
    <ProductWalkthroughShell
      steps={steps}
      sectionKicker={
        t.rich("sectionKicker", {
          brand: (chunks) => <span className="lowercase">{chunks}</span>,
        })
      }
    >
      {screens.map((screen, index) => (
        <ProductFrame
          screen={screen}
          index={index}
          total={PRODUCT_ASSETS.length}
          key={screen.id}
        />
      ))}
    </ProductWalkthroughShell>
  )
}