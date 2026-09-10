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
        <div className="container mx-auto p-6 md:py-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-stretch">
                {/* Header */}
                <div className="w-full flex flex-col justify-center mb-2 md:mb-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mb-4">
                        <span className={`${CONFIG.badgeClasses} rounded px-3 py-1 text-[11px] md:text-xs font-bold uppercase tracking-widest shrink-0`}>
                            {CONFIG.badgeLabel}
                        </span>
                        <h2 className="text-gray-900 text-xl md:text-2xl font-bold">
                            {title}
                        </h2>
                    </div>
                </div>
            </div>

            {imageSrc ? (
                <div
                    className={`flex flex-col md:flex-row gap-6 md:gap-12 items-stretch mt-4 md:mt-6 ${!isTextFirst ? "md:flex-row-reverse" : ""}`}
                >
                    {/* Body */}
                    <div className={`w-full md:w-4/7 flex flex-col justify-center`}>
                        <p className={`text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line`}>
                            {body}
                        </p>
                    </div>

                    {/* Image */}
                    <div className={`w-full md:w-3/7 shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center mt-4 md:mt-0`}>
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="object-cover w-full min-h-[250px] md:min-h-[300px] h-auto"
                        />
                    </div>
                </div>
            ) : (
                <div className="w-full flex flex-col justify-center mt-4 md:mt-6">
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                        {body}
                    </p>
                </div>
            )}
        </div>
    );
}

export default CaseStudyBodyBlock