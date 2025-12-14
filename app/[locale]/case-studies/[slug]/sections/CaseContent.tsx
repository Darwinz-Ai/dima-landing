import ReactMarkdown from "react-markdown";
import SideInfo from "../components/SideInfo";
import Image from "next/image";
import SectionWrapper from "@/components/shared/SectionWrapper";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import { useLocale } from "next-intl";
import { CaseStudy } from "@/types";
import { usedSolutionsAssets } from "@/data/case-studies";

function CaseContent({ caseStudy }: { caseStudy: CaseStudy }) {
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
        <SectionWrapper>
            <div className="container mx-auto flex flex-col lg:flex-row justify-center items-start gap-8">
                {/* Main Text Content */}
                <div className="flex flex-col gap-6 flex-1">
                    {/* Description */}
                    <h2 className="text-[22px] font-bold leading-snug">
                        {caseStudy.content.description}
                    </h2>

                    {/* Attributes */}
                    <div className="flex flex-col gap-6">
                        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {caseStudy.content.attributes.map((attribute, i) => (
                                <li key={i} className={`rounded-2xl bg-muted lg:bg-white p-6 lg:p-0 ${i === 2 ? "col-span-2 lg:col-span-1" : ""}`}>
                                    <p className="text-lg sm:text-xl font-light mb-3">{attribute.title}</p>
                                    <p className="text-base sm:text-lg font-medium">{attribute.subTitle}</p>
                                </li>
                            ))}
                        </ul>

                        {/* Side Info (mobile) */}
                        <aside className="w-full lg:hidden flex flex-col gap-8 mt-10 lg:mt-0">
                            {/* Side Info Cards */}
                            <ul className="overflow-hidden divide-y divide-gray-700">
                                {caseStudy.content.sideInfo.map((info, i) => (
                                    <li key={i}>
                                        <SideInfo {...info} index={i} />
                                    </li>
                                ))}
                            </ul>

                            {/* Used Solutions */}
                            <div className="py-6">
                                <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 mb-4">
                                    {isRTL ? "الحلول المستخدمة" : "Used Solutions"}:
                                </h3>
                                <ul className="space-y-3">
                                    {caseStudy.content.usedSolutions.map((solution, i) => (
                                        <li key={i} >
                                            <Link href={usedSolutionsAssets[solution].href} className="flex items-center gap-4">
                                                <figure className="relative w-14 h-14 shrink-0">
                                                    <Image
                                                        src={usedSolutionsAssets[solution].icon}
                                                        alt={usedSolutionsAssets[solution].href}
                                                        fill
                                                        sizes="56px"
                                                        className="object-contain"
                                                        quality={90}
                                                    />
                                                </figure>
                                                <p className="text-base sm:text-lg">{usedSolutionsAssets[solution].title[locale as "en" | "ar"]}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Body */}
                        <div className="container max-w-[1536px] mx-auto prose text-lg lg:text-xl mt-6">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Changing a tag into next.js Link tag
                                    a: ({ href, children, ...props }) => {
                                        return (
                                            <Link href={href || "#"} className="text-primary" {...props}>{children}</Link>
                                        )
                                    },
                                }}
                            >
                                {caseStudy.content.body}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>

                {/* Sidebar (desktop)*/}
                <aside className="hidden lg:w-1/3 lg:flex flex-col gap-8 mt-10 lg:mt-0">
                    {/* Side Info Cards */}
                    <ul className="overflow-hidden divide-y divide-gray-700">
                        {caseStudy.content.sideInfo.map((info, i) => (
                            <li key={i}>
                                <SideInfo {...info} index={i} />
                            </li>
                        ))}
                    </ul>

                    {/* Used Solutions */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 mb-4">
                            {isRTL ? "الحلول المستخدمة" : "Used Solutions"}:
                        </h3>
                        <ul className="space-y-3">
                            {caseStudy.content.usedSolutions.map((solution, i) => (
                                <li key={i} >
                                    <Link href={usedSolutionsAssets[solution].href} className="flex items-center gap-4">
                                        <figure className="relative w-14 h-14 shrink-0">
                                            <Image
                                                src={usedSolutionsAssets[solution].icon}
                                                alt={usedSolutionsAssets[solution].href}
                                                fill
                                                className="object-contain"
                                            />
                                        </figure>
                                        <p className="text-base sm:text-lg">{usedSolutionsAssets[solution].title[locale as "en" | "ar"]}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </SectionWrapper>
    );
}

export default CaseContent;
