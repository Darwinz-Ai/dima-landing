import SectionWrapper from "@/components/shared/SectionWrapper";
import { useLocale } from "next-intl";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArabicPolicy from "./components/ArabicPolicy";
import EnglishPolicy from "./components/EnglishPolicy";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type PrivacyPolicyPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: PrivacyPolicyPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "PrivacyPolicy", {
        overrides: {
            alternates: {
                canonical: "https://thedar.ai/privacy-policy",
                languages: {
                    "en-US": "https://thedar.ai/en/privacy-policy",
                    "ar-SA": "https://thedar.ai/ar/privacy-policy",
                }
            },
        },
    });
}

function PrivacyPolicyPage() {
    const locale = useLocale();
    const isRTL = locale === "ar";
    return (
        <main>
            <SectionWrapper className="min-h-dvh mt-24">
                <div className="container max-w-7xl mx-auto prose text-lg lg:text-xl">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Changing a tag into next.js Link tag
                            a: ({ href, children, ...props }) => {
                                return (
                                    <Link href={href || "#"} className="text-primary" {...props}>
                                        {children}
                                    </Link>
                                );
                            },
                        }}
                    >
                        {isRTL ? ArabicPolicy() : EnglishPolicy()}
                    </ReactMarkdown>
                </div>
            </SectionWrapper>
        </main>
    );
}

export default PrivacyPolicyPage;