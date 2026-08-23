import { HugeiconsIcon } from "@hugeicons/react"

import { type ArrowRight01Icon } from "@hugeicons/core-free-icons"

export type IconSvg = typeof ArrowRight01Icon

export const Icon = ({
    icon,
    size = 22,
    className,
}: {
    icon: IconSvg
    size?: number
    className?: string
}) => (
    <HugeiconsIcon
        icon={icon}
        size={size}
        strokeWidth={1.65}
        className={className}
    />
)
