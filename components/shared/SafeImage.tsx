"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Image01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@/components/shared/Icon"

export const SafeImage = (props: ImageProps) => {
    const [hasError, setHasError] = useState(false)

    return (
        <>
            {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-copy/40">
                    <Icon icon={Image01Icon} size={32} />
                    <span className="mt-2 text-2 text-copy/60 font-medium">Couldn't load image</span>
                </div>
            )}

            <Image
                {...props}
                alt={props.alt}
                className={cn(
                    props.className,
                    "transition-opacity duration-300",
                    hasError ? "opacity-0" : "opacity-100"
                )}
                onError={() => setHasError(true)}
            />
        </>
    )
}