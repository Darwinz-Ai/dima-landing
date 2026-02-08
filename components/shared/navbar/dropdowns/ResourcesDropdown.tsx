"use client";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import useBlogs from "@/app/[locale]/blogs/hooks/useBlogs";
import BlogCard from "@/app/[locale]/blogs/components/BlogCard";
import BlogCardSkeleton from "@/app/[locale]/blogs/components/BlogCardSkeleton";
import { footerResourcesLinks } from "@/data/home-page";

function ResourcesDropdown() {
    const t = useTranslations("Navbar.resources.links");
    const locale = useLocale();
    const isRTL = locale === "ar";
    const { data: blogs, isLoading, isError } = useBlogs(2);
    return (
        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
            <div className={`flex justify-center items-start gap-8 divide-x w-full${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                {/* Blogs Section */}
                <div className="flex-1 w-full px-2">
                    <h2 className={`text-3xl font-semibold ${isRTL ? 'text-right' : ''}`}>{t("blogs.title")}</h2>
                    <div className={`w-8 h-0.5 bg-primary mb-4 flex ${isRTL ? 'ml-auto' : 'mr-auto'}`}></div>
                    {isError && <p>Failed to load blogs</p>}

                    {/* Blogs */}
                    <ul className={`grid grid-cols-1 gap-6 w-full ${isRTL ? 'text-right' : ''}`} dir={isRTL ? "rtl" : "ltr"}>
                        {
                            isLoading
                                ? Array.from({ length: 2 }).map((_, i) => (
                                    <li key={`skeleton-blog-${i}`}>
                                        <BlogCardSkeleton orientation="horizontal" />
                                    </li>
                                ))
                                : blogs?.map((blog) => (
                                    <li key={blog.id}>
                                        <BlogCard blog={blog} orientation="horizontal" />
                                    </li>
                                ))
                        }
                    </ul>
                    <Link href="/blogs">
                        <Button className="mt-4" size={"xl"}>{t("blogs.viewAllBlogs")}</Button>
                    </Link>
                </div>

                {/* More Resources Section */}
                <div className="flex-1 px-2">
                    <h2 className={`text-3xl font-semibold ${isRTL ? 'text-right' : ''}`}>{t("moreResources.title")}</h2>
                    <div className={`w-8 h-0.5 bg-primary mb-4 flex ${isRTL ? 'ml-auto' : 'mr-auto'}`}></div>
                    <ul className={`grid grid-cols-1 gap-y-4 gap-x-8 ${isRTL ? 'text-right' : ''}`}>
                        {footerResourcesLinks.map((link) => (
                            <li key={link.href} className={`inline-flex items-center gap-2 opacity-60 cursor-not-allowed ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                                <Image
                                    src={link.icon!}
                                    alt={"icon"}
                                    width={20}
                                    height={20}

                                />
                                {/* <Link href={link.href}>{t(`moreResources.${link.translationKey}.title`)}</Link> */}
                                <span>{t(`moreResources.${link.translationKey}.title`)}</span>
                                <p className="text-primary text-xs">{t(`moreResources.${link.translationKey}.comingSoon`)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ResourcesDropdown;