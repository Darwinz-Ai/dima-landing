import { enterpriseIcons } from "@/data/solutions/assets";
import { CardType } from "@/types";
import Image from "next/image";

function EntrepriseCard({ icon, title, description }: CardType) {
    return (
        <article className="flex flex-col justify-center items-center bg-[#95DDEE]/50 p-8 rounded-xl h-full min-h-80">
            <div className="flex-1 flex flex-col gap-8" >
                {/* Icon */}
                <div className={`flex lg:flex-col  gap-4`}>
                    <figure className="relative w-8 h-8 min-w-8 min-h-8 bg-[#2B558C] rounded-full">
                        <Image
                            src={enterpriseIcons[icon!]}
                            alt="icon"
                            fill
                            sizes="32px"
                            className="object-contain p-1"
                            unoptimized={true}
                        />
                    </figure>

                    {/* Title */}
                    <h3 className="text-lg font-bold">{title}</h3>
                </div>

                {/* Description */}
                <p className="text-lg">{description}</p>
            </div>
        </article>
    );
}

export default EntrepriseCard;