import GroupedBlogs from "../components/GroupedBlogs";
import BlogCard from "../components/BlogCard";
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import CaseStudyCard from "../../case-studies/components/CaseStudyCard";
import CaseStudyCardSkeleton from "../../case-studies/components/CaseStudyCardSkeleton";
import { fetchBlogs } from "@/lib/firebase/blogsFunctions";
import { getLocale, getTranslations } from "next-intl/server";
import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions";

async function HeroSection() {
    const t = await getTranslations("Blogs");
    const locale = await getLocale();

    let blogs = null;
    let caseStudy = null;
    let blogsError = false;
    let caseStudyError = false;

    try {
        blogs = await fetchBlogs(locale, [t("editorsPick")], 3);
    } catch (error) {
        blogsError = true;
    }

    try {
        caseStudy = await fetchCaseStudies(locale, { featured: true }, 1);
    } catch (error) {
        caseStudyError = true;
    }

    return (
        <div className="container mx-auto flex flex-col justify-center items-start gap-2">
            <h2 className="bg-black text-white uppercase w-fit py-1 px-2 rounded-sm italic tracking-wide">{t("dimaBlogs")}</h2>

            {/* Content sections */}
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                {/* Featured Card */}
                <GroupedBlogs title={t("featuredCaseStudy")} className="flex-1 w-full lg:min-w-lg" includeViewAll={false}>
                    {caseStudyError && <p>Failed to load featured case study</p>}
                    {!caseStudyError && !caseStudy && <CaseStudyCardSkeleton />}
                    {!caseStudyError && caseStudy && <CaseStudyCard {...caseStudy[0]} />}
                </GroupedBlogs>

                {/* Editor's Picks */}
                <div className="flex-1">
                    <GroupedBlogs title={t("editorsPick")} className="items-start" includeViewAll={false}>
                        {blogsError && <p>Failed to load editor&apos;s pick blogs</p>}

                        <ul className="grid grid-cols-1 gap-4 divide-y w-full">
                            {!blogsError && !blogs
                                ? Array.from({ length: 3 }).map((_, idx) => (
                                    <li key={`skeleton-${idx}`} className="pb-2">
                                        <BlogCardSkeleton orientation="horizontal" />
                                    </li>
                                ))
                                : blogs && blogs.map((blog) => (
                                    <li key={blog.id} className="pb-2">
                                        <BlogCard orientation="horizontal" blog={blog} />
                                    </li>
                                ))}
                        </ul>
                    </GroupedBlogs>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
