import React from 'react'
import HeroSection from './sections/HeroSection'
import FAQSection from './sections/FAQSection'
import RequestDemoSection from '@/components/shared/form/RequestDemoSection'
import TestimonialSection from '../(home)/sections/TestimonialSection'
import { Metadata } from 'next'
import { buildLocalizedMetadata } from '@/lib/seo'

interface FAQPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata(
    { params }: FAQPageProps
): Promise<Metadata> {
    const { locale } = await params;
    return buildLocalizedMetadata(locale, "FAQ", {
        overrides: {
            openGraph: {
                url: `https://thedar.ai/${locale}/faq`,
                siteName: "TheDar.AI",
                type: "website",
                images: [
                    {
                        url: "/og/faq.png",
                        width: 1200,
                        height: 630,
                        alt: "dima Tools & Calculators OG Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                images: ["/og/tools.png"],
            },
            alternates: {
                canonical: `https://thedar.ai/${locale}/faq`,
                languages: {
                    en: "https://thedar.ai/en/faq",
                    ar: "https://thedar.ai/ar/faq",
                    "x-default": "https://thedar.ai/en/faq"
                }
            },
        },
    });
}

const FAQPage = () => {
    return (
        <main>
            <HeroSection />
            <FAQSection />
            <RequestDemoSection />
            <TestimonialSection />
        </main>
    )
}

export default FAQPage