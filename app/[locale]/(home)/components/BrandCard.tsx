import { BrandCardInfo } from "@/types";
import Image from "next/image";

function BrandCard({ image, companyName, description }: BrandCardInfo) {
    return (
        <article className="flex flex-col justify-between items-center rounded-xl bg-white shadow-md transition-transform hover:scale-[1.02] duration-300 p-3 sm:p-4 md:p-6">
            <figure className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[330px]">
                <Image
                    src={image}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                    alt={companyName}
                    priority

                />
            </figure>

            <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 ">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{companyName}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
            </div>
        </article>
    );
}

export default BrandCard;
