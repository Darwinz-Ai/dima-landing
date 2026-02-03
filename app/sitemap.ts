import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SOLUTIONS_METADATA } from "./[locale]/solutions/[slug]/page";
import { fetchBlogs } from "@/lib/firebase/blogsFunctions";
import { fetchCaseStudies } from "@/lib/firebase/caseStudiesFunctions";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const domain = "https://thedar.ai";
    const locales = ["en", "ar"];

    const localeDirectory = path.join(process.cwd(), 'app', '[locale]');
    const [allBlogs, allCases] = await Promise.all([
        fetchBlogs("en"),
        fetchCaseStudies("en")
    ])

    // Parsing static files
    const getRoutes = (dir: string, routes: string[] = []) => {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath)

            if (stat.isDirectory()) {
                if (!file.startsWith('[') && !file.startsWith('(') && file !== "api")
                    getRoutes(filePath, routes);
            } else if (file === 'page.tsx') {
                const relativePath = path.relative(localeDirectory, dir).replace("\\", "/");
                const route = relativePath === '' ? '' : `/${relativePath}`;
                routes.push(route);
            }
        })
        return routes;
    }

    const allStaticRoutes = ["/", ...getRoutes(localeDirectory)];
    const solutionRoutes = Object.keys(SOLUTIONS_METADATA).map((slug) => `/solutions/${slug}`);
    const blogRoutes = allBlogs.map(blog => `/blogs/${blog.id}`);
    const caseRoutes = allCases.map(study => `/case-studies/${study.id}`);

    const allPaths = [
        ...allStaticRoutes,
        ...solutionRoutes,
        ...blogRoutes,
        ...caseRoutes
    ]

    return locales.flatMap((currentLocale) => {
        return allPaths.map((path) => {
            const cleanPath = path === "/" ? "" : path;

            return {
                url: `${domain}/${currentLocale}${cleanPath}`,
                lastModified: new Date(),
                alternates: {
                    languages: {
                        ...locales.reduce((acc: Record<string, string>, locale) => {
                            acc[locale] = `${domain}/${locale}${cleanPath}`;
                            return acc
                        }, {}),
                        "x-default": `${domain}/en${path === "/" ? "" : path}`
                    }
                }
            }
        })
    })
}