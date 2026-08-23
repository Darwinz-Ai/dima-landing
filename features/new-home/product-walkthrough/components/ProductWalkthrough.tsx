import { ProductWalkthroughShell } from "./ProductWalkthroughShell"
import { ProductFrame } from "./ProductFrame"

import { PRODUCT_SCREENS, PRODUCT_STEPS } from "../constants"

export const ProductWalkthrough = () => (
  <ProductWalkthroughShell steps={PRODUCT_STEPS}>
    {PRODUCT_SCREENS.map((screen, index) => (
      <ProductFrame
        screen={screen}
        index={index}
        total={PRODUCT_SCREENS.length}
        key={screen.title}
      />
    ))}
  </ProductWalkthroughShell>
)
