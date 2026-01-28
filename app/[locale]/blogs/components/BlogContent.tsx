import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import SectionWrapper from "@/components/shared/SectionWrapper";
import Link from "next/link";
import { fetchSingleBlog } from "@/lib/firebase/blogsFunctions";
import CheckBlogs from "./CheckBlogs";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";


async function BlogContent({ slug }: { slug: string }) {
    const t = await getTranslations("Blog")
    const locale = await getLocale();

    try {
        const blog = await fetchSingleBlog(locale, slug);
        return (
            <article>
                <SectionWrapper className="mt-24">
                    {/* Heading */}
                    <div className="container mx-auto flex flex-col justify-center items-start gap-8 ">
                        <h2 className="bg-black text-white uppercase w-fit py-1 px-2 rounded-sm italic tracking-wide">{t("dimaBlogs")}</h2>
                        <h1 className="text-2xl lg:text-[48px] font-normal">{blog?.content.title}</h1>
                    </div>
                </SectionWrapper>

                {/* Sub title */}
                <div className="min-h-[400px] flex justify-center items-center bg-linear-to-b from-[#95DDEE] via-primary to-[#95DDEE]">
                    <div className="container mx-auto text-white">
                        <h3 className="lg:text-2xl font-bold leading-relaxed text-center">{blog?.content.description}</h3>
                    </div>
                </div>

                {/* Content */}
                <SectionWrapper>
                    <div className="container max-w-[1536px] mx-auto prose text-lg lg:text-xl">
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
                        >{blog?.content.body}</ReactMarkdown>
                    </div>
                </SectionWrapper>

                {/* Check more blogs  */}
                <SectionWrapper>
                    <CheckBlogs />
                </SectionWrapper>
            </article>
        );
    } catch (error) {
        return notFound()
    }


}

export default BlogContent;