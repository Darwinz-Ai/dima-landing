import HeroSection from "./sections/HeroSection";
import DimaAiSection from "./sections/DimaAiSection";
import DimaSuiteSection from "./sections/DimaSuiteSection";
import CaseStudiesSection from "./sections/CaseStudiesSection";
import QuestionsAnsweredSection from "@/app/[locale]/(home)/sections/QuestionsAnsweredSection";
import type { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { buildLocalizedMetadata } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";
import { getFAQJsonLd, getOrganizationJsonLd, getProductJsonLd } from "@/lib/jsonLd";
import { QuestionAccordion } from "@/types";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";


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

const EmpoweringAgenciesSection = dynamic(() => import("./sections/EmpoweringAgenciesSection"), {
  ssr: true,
});

const OwnConversationSection = dynamic(() => import("./sections/OwnConversationSection"), {
  ssr: true,
});

const TestimonialSection = dynamic(() => import("./sections/TestimonialSection"), {
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