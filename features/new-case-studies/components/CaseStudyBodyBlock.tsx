import { getTranslations } from "next-intl/server";

interface CaseStudyBodyBlockProps {
    type: "challenge" | "solution" | "result";
    title: string;
    body: string;
    imageSrc?: string;
    imageAlt?: string;
    orientation?: "text-image" | "image-text";
}

const CaseStudyBodyBlock = async ({
    type,
    title,
    body,
    imageSrc,
    imageAlt = "",
    orientation = "text-image",
}: CaseStudyBodyBlockProps) => {
    const t = await getTranslations("CaseStudy");

    const CONFIG = {
        challenge: {
            badgeLabel: t("challenge"),
            badgeClasses: "bg-destructive text-white",
        },
        solution: {
            badgeLabel: t("solution"),
            badgeClasses: "bg-brand text-white",
        },
        result: {
            badgeLabel: t("result"),
            badgeClasses: "bg-[#351672] text-white",
        },
    }[type];

    const isTextFirst = orientation === "text-image";

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
                {/* Header */}
                <div className="w-full md:w-auto flex flex-col justify-center mb-4 md:mb-0">
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`${CONFIG.badgeClasses} rounded px-3 py-1 text-xs font-bold uppercase tracking-widest`}>
                            {CONFIG.badgeLabel}
                        </span>
                        <h2 className="text-gray-900 text-lg md:text-2xl font-bold">
                            {title}
                        </h2>
                    </div>
                </div>
            </div>
            {imageSrc ? (
                <div
                    className={`flex flex-col md:flex-row gap-8 md:gap-12 items-stretch ${!isTextFirst ? "md:flex-row-reverse" : ""}`}
                >
                    {/* Body */}
                    <div className={`w-full md:w-4/7 flex flex-col justify-center`}>
                        <p className={`text-gray-600 text-sm md:text-lg leading-relaxed whitespace-pre-line`}>
                            {body}
                        </p>
                    </div>

                    {/* Image */}
                    <div className={`w-full md:w-3/7 shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center`}>
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="object-cover w-full min-h-[300px] h-auto"
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col justify-center mt-2">
                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed whitespace-pre-line">
                        {body}
                    </p>
                </div>
            )}
        </div>
    );
}

export default CaseStudyBodyBlock