import dynamic from "next/dynamic";

import HeroSection from "@/features/home/sections/HeroSection";
import DimaAiSection from "@/features/home/sections/DimaAiSection";
import DimaSuiteSection from "@/features/home/sections/DimaSuiteSection";
import CaseStudiesSection from "@/features/home/sections/CaseStudiesSection";
import QuestionsAnsweredSection from "@/features/home/sections/QuestionsAnsweredSection";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import JsonLd from "@/components/shared/JsonLd";

import type { Metadata } from "next";
import { QuestionAccordion } from "@/types";

import { getTranslations } from "next-intl/server";
import { buildLocalizedMetadata } from "@/lib/seo";
import { getFAQJsonLd, getOrganizationJsonLd, getProductJsonLd } from "@/lib/jsonLd";


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

const EmpoweringAgenciesSection = dynamic(() => import("@/features/home/sections/EmpoweringAgenciesSection"), {
  ssr: true,
});

const OwnConversationSection = dynamic(() => import("@/features/home/sections/OwnConversationSection"), {
  ssr: true,
});

const TestimonialSection = dynamic(() => import("@/features/home/sections/TestimonialSection"), {
  ssr: true,
});

async function HomePage() {
  const tHomeQuestions = await getTranslations("Home.questionsAnswered");
  const faqs = (tHomeQuestions.raw("faqs") as QuestionAccordion[]) ?? [];

  const orgJsonLd = await getOrganizationJsonLd();
  const productJsonLd = await getProductJsonLd();
  const faqJsonLd = await getFAQJsonLd(faqs);



  return (
    <main className="h-full">
      <JsonLd data={[orgJsonLd, productJsonLd, faqJsonLd]} />

      <HeroSection />
      <EmpoweringAgenciesSection />
      <OwnConversationSection />
      <DimaAiSection />
      <DimaSuiteSection />
      <CaseStudiesSection />
      <TestimonialSection />
      <RequestDemoSection />
      <QuestionsAnsweredSection faqs={faqs} />
    </main>
  );
}

export default HomePage;