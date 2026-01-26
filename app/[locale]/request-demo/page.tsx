import SectionWrapper from "@/components/shared/SectionWrapper";
import Image from "next/image";
import { useTranslations } from "next-intl";
import RequestDemoForm from "../../../components/shared/form/RequestDemoForm";
import type { Metadata } from "next";
import { buildLocalizedMetadata } from "@/lib/seo";

type RequestDemoPageProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata(
    { params }: RequestDemoPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "RequestDemo", {
        overrides: {
            metadataBase: new URL("https://thedar.ai"),
            openGraph: {
                url: `https://thedar.ai/${locale}/request-demo`,
                siteName: "dima",
                locale,
                type: "website",
                images: [
                    {
                        url: "/requestDemo.jpg",
                        width: 1200,
                        height: 630,
                        alt: "Request Demo Page Preview",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/requestDemo.jpg"],
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/request-demo`,
                languages: {
                    en: "https://thedar.ai/en/request-demo",
                    ar: "https://thedar.ai/ar/request-demo",
                    "x-default": "https://thedar.ai/request-demo"
                }
            },
        },
    });
}

function RequestDemoPage() {
    const t = useTranslations("RequestDemo");
    return (
        <main
            style={{
                backgroundImage: "url('/request-demo-bg.svg')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                backgroundSize: "55% auto",
            }}
            className="bg-white"
        >
            <SectionWrapper className="min-h-dvh mt-12">
                <div className="container mx-auto flex flex-col-reverse lg:flex-row justify-center items-center lg:items-stretch gap-12 flex-1">
                    {/* Text & Form Section */}
                    <div className="flex-1 flex flex-col justify-center gap-4">
                        <p className="text-primary font-medium mb-4">{t("titlePrefix")}</p>
                        <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
                        <div className="text-lg sm:text-xl space-y-4">
                            <p className="font-semibold tracking-wide">
                                {t("subTitle")}
                            </p>
                            <p>
                                {t("description")}
                            </p>
                        </div>

                        {/* Form */}
                        <div>
                            <RequestDemoForm className="p-0" />
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex-1 flex justify-center lg:justify-end w-full">
                        <figure className="relative w-full h-72 sm:h-96 lg:h-full">
                            <Image
                                src="/request-demo-image.png"
                                alt="phone image"
                                fill
                                className="object-contain"
                                priority={true}
                                fetchPriority="high"
                                quality={90}
                            />
                        </figure>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}

export default RequestDemoPage;
