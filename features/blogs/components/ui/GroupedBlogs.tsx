import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ContentSectionProps = {
    className?: string;
    children: React.ReactNode
    title: string;
    includeViewAll?: boolean;
    hrefViewAll?: string;
}

async function GroupedBlogs({ className, children, title, includeViewAll = true, hrefViewAll = "#" }: ContentSectionProps) {
    const t = await getTranslations("Blogs")
    const locale = await getLocale();
    const isRTL = locale === "ar";
    return (
        <div>
            {/* Separator */}
            <div className="h-0.5 bg-black my-4 w-full"></div>

            {/* Title and View All */}
            <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                <h2 className="text-lg sm:text-xl font-bold capitalize">{title}</h2>
                {includeViewAll && (
                    <Link href={hrefViewAll} className="text-primary text-sm inline-flex items-center font-bold">
                        {t("viewAll")} {isRTL ? <ChevronLeft /> : <ChevronRight />}
                    </Link>
                )}
            </div>

            {/* Content */}
            <div className={cn("flex flex-col sm:flex-row justify-center items-stretch gap-4 w-full", className)}>
                {children}
            </div>
        </div>
    );
}

export default GroupedBlogs;
