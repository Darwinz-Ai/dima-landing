import SectionWrapper from "@/components/shared/SectionWrapper";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArabicPolicy from "./components/ArabicPolicy";
import EnglishPolicy from "./components/EnglishPolicy";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getPrivacyPolicyJsonLd } from "@/lib/jsonLd";
import { getLocale } from "next-intl/server";
import JsonLd from "@/components/shared/JsonLd";

type PrivacyPolicyPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: PrivacyPolicyPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "PrivacyPolicy", {
        overrides: {
            metadataBase: new URL("https://thedar.ai"),
            openGraph: {
                url: `https://thedar.ai/${locale}/privacy-policy`,
                siteName: "TheDar.AI",
                locale,
                type: "website",
                images: [{
                    url: "/og/privacy-policy.png",
                    width: 1200,
                    height: 630,
                    alt: "dima privacy policy OG image"
                }]
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/privacy-policy.png"]
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/privacy-policy`,
                languages: {
                    en: "https://thedar.ai/en/privacy-policy",
                    ar: "https://thedar.ai/ar/privacy-policy",
                    "x-default": "https://thedar.ai/en/privacy-policy"
                }
            },
        },
    });
}

async function PrivacyPolicyPage() {
    const privacyPolicyJsonLd = await getPrivacyPolicyJsonLd();
    const locale = await getLocale();
    const isRTL = locale === "ar";
    return (
        <main>
            <JsonLd data={[privacyPolicyJsonLd]} />

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