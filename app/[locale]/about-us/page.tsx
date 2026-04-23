import dynamic from "next/dynamic"

import HeroSection from "./sections/HeroSection"
import ServingCustomersSection from "./sections/ServingCustomersSection"
// import TeamSection from "./sections/TeamSection"
import JsonLd from "@/components/shared/JsonLd"

import { Metadata } from "next"

import { buildLocalizedMetadata } from "@/lib/seo"
import { getOrganizationJsonLd } from "@/lib/jsonLd"

interface AboutUsPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata(
    { params }: AboutUsPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "AboutUs", {
        overrides: {
            openGraph: {
                url: `https://thedar.ai/${locale}/about-us`,
                siteName: "TheDar.AI",
                type: "website",
                images: [
                    {
                        url: "/og/aboutUs.png",
                        width: 1200,
                        height: 630,
                        alt: "dima About Us OG Image"
                    }
                ],

            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/aboutUs.png"]
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/about-us`,
                languages: {
                    en: "https://thedar.ai/en/about-us",
                    ar: "https://thedar.ai/about-us",
                    "x-default": "https://thedar.ai/en/about-us"
                }
            }
        }
    })
}

const ForTheRegionSection = dynamic(() => import("./sections/ForTheRegionSection"), {
    ssr: true
})
const MapSection = dynamic(() => import("./sections/MapSection"), {
    ssr: true
})
const ConnectSection = dynamic(() => import("./sections/ConnectSection"), {
    ssr: true
})

const AboutUsPage = async () => {
    const AboutUsJsonLd = await getOrganizationJsonLd();
    return (
        <main>
            <JsonLd data={[AboutUsJsonLd]} />

            <HeroSection />
            <ForTheRegionSection />
            <ServingCustomersSection />
            <MapSection />
            {/* <TeamSection /> */}
            <ConnectSection />
        </main>
    )
}

export default AboutUsPage