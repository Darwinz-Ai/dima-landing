
import { solutionImages } from "@/data/solutions";
import { CardType } from "@/types";
import Image from "next/image";

function MobileScrollingCard({ title, description, slug, index }: CardType) {
    const image = solutionImages[slug!].scrollingSection[index];

    return (
        <article className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {/* Image */}
            <figure
                key={index}
                className="
            w-full sm:w-[340px]
            h-[340px] sm:h-[240px]
            shrink-0
            rounded-xl 
            bg-[linear-gradient(-125deg,#95DDEE_0%,#11A8CF_32%,#95DDEE_46%,#11A8CF_100%)] 
            relative 
        ">
                <Image
                    src={image}
                    alt={`Step ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 340px"
                    className="object-contain p-4"
                    priority={true}
                    fetchPriority="high"
                    quality={90}
                />
            </figure>

            {/* Text */}
            <div className="max-w-[550px]">
                <h2 className="text-2xl lg:text-[44px]">{title}</h2>
                <p className="font-light mt-4">{description}</p>
            </div>
        </article>

    );
}

export default MobileScrollingCard;