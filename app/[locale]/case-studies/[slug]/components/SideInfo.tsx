
import { sideInfoIcons } from "@/data/case-studies";
import { CaseStudySideInfo } from "@/types";
import Image from "next/image";

function SideInfo({ index, title, description }: CaseStudySideInfo) {
    return (
        <article className="flex gap-4 py-4">
            <figure className="relative w-10 h-10">
                <Image
                    src={sideInfoIcons[index]}
                    alt="challenge icon"
                    fill
                    className="object-contain"
                    unoptimized={true}
                />
            </figure>
            <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3">{title}:</h3>
                <p className="text-lg">{description}</p>
            </div>
        </article>
    );
}

export default SideInfo;