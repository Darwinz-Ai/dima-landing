import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getFAQJsonLd, getOrganizationJsonLd, getProductJsonLd } from "@/lib/jsonLd";

import JsonLd from "@/components/shared/JsonLd";

import { HeroSection } from "@/features/new-home/hero/components/HeroSection";
import { ArabicIntelligence } from "@/features/new-home/arabicIntelligence/component/ArabicIntelligence";
import { ProductWalkthrough } from "@/features/new-home/product-walkthrough/components/ProductWalkthrough";
import { CopilotSection } from "@/features/new-home/copilot/components/CopilotSection";
import { PlatformSection } from "@/features/new-home/mobile-application/components/PlatformSection";
import { CaseStudiesSection } from "@/features/new-home/case-studies/components/CaseStudiesSection";
import { FinalCta } from "@/features/new-home/final-cta/components/FinalCta";
import { TestimonialsSection } from "@/components/shared/testimonials/components/TestimonialsSection";
import { FaqWidget } from "@/components/shared/faq/components/FaqSection";
import { CustomerTrust } from "@/components/shared/customer-trust/components/CustomerTrust";

import { QuestionAccordion } from "@/types";
import pick from "lodash/pick";
import { NextIntlClientProvider } from "next-intl";

const ImplementationTimeline = dynamic(
  () => import("@/features/new-home/implementation/components/ImplementationTimeline"),
  { ssr: true }
);

type HomePageProps = {
  params: Promise<{ locale: string }>
};

export async function generateMetadata(
  { params }: HomePageProps
): Promise<Metadata> {
  const { locale } = await params;
  return buildLocalizedMetadata(locale, "Home", {
    overrides: {
      metadataBase: new URL("https://thedar.ai"),
      openGraph: {
        url: `https://thedar.ai/${locale}`,
        siteName: "TheDar.AI",
        locale,
        type: "website",
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: "dima OG Image",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: ["/og-image.png"],
      },
      alternates: {
        canonical: `https://thedar.ai/${locale}`,
        languages: {
          en: "https://thedar.ai/en",
          ar: "https://thedar.ai/ar",
          "x-default": "https://thedar.ai/en"
        }
      },
    },
  });
}

async function HomePage() {
  const tHomeQuestions = await getTranslations("Home.questionsAnswered");
  const faqs = tHomeQuestions.raw("faqs") as QuestionAccordion[] ?? [];

  const orgJsonLd = await getOrganizationJsonLd();
  const productJsonLd = await getProductJsonLd();
  const faqJsonLd = await getFAQJsonLd(faqs);

  const messages = await getMessages();
  const clientMessages = pick(messages, ["Home.testimonials.items", "Home_New.copilot", "Home_New.common", "Home_New.implementation"])

  return (
    <main className="h-full">
      <JsonLd data={[orgJsonLd, productJsonLd, faqJsonLd]} />

      <NextIntlClientProvider messages={clientMessages}>
        <HeroSection />
        <ArabicIntelligence />
        <ProductWalkthrough />
        <CustomerTrust />
        <CopilotSection />
        <PlatformSection />
        <ImplementationTimeline />
        <TestimonialsSection />
        <CaseStudiesSection />
        <FaqWidget faqs={faqs} />
        <FinalCta />
      </NextIntlClientProvider>

    </main>
  );
}

export default HomePage;