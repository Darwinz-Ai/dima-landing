import { LayeredCardProps } from "@/types";
import { useLocale } from "next-intl";

const getCardConfig = (index: number) => {
    switch (index) {
        case 0:
            return {
                bg: "bg-primary",
                text: "text-primary",
                rotation: "-rotate-10",
                suffixColor: "text-primary"
            };
        case 1:
            return {
                bg: "bg-blue-700",
                text: "text-blue-700",
                rotation: "rotate-10",
                suffixColor: "text-blue-700"
            };
        case 2:
            return {
                bg: "bg-purple-700",
                text: "text-purple-700",
                rotation: "-rotate-4 lg:-rotate-12",
                suffixColor: "text-purple-700"
            };
        default:
            return {
                bg: "",
                text: "",
                rotation: "",
                suffixColor: ""
            };
    }
};

function LayeredCard({ index, value, title, suffix, isLast }: LayeredCardProps) {
    const { bg, text: txt, rotation, suffixColor } = getCardConfig(index);
    const locale = useLocale();
    const isArabic = locale === "ar";
    return (
        <article className="relative md:h-52 lg:h-58 md:aspect-square w-full h-full md:w-fit">
            {/* Background card */}
            <div className={`absolute inset-0.5 rounded-2xl -z-10 blur-xs pointer-events-none ${bg} ${txt} ${rotation}`}></div>

            {/* Foreground card */}
            <div
                className={`relative flex h-full w-full rounded-2xl p-4 bg-white flex-col 
        ${isLast ? "items-center justify-center md:items-start md:justify-between" :
                        isArabic ? "items-start justify-between" : "items-start justify-between"}
        gap-3 text-black shadow-lg`}
            >
                <p className="font-bold text-[22px] md:text-[40px] leading-tight flex" dir="ltr">
                    {value}
                    <span className={suffixColor}>{suffix}</span>
                </p>

                <p className={`font-light md:text-xl ${isLast ? "text-center md:text-start" : ""}`}>
                    {title}
                </p>
            </div>
        </article>
    );
}

export default LayeredCard;
