import HeroSection from "./sections/HeroSection";
import EmpoweringAgenciesSection from "./sections/EmpoweringAgenciesSection";
import OwnConversationSection from "./sections/OwnConversationSection";
import DimaAiSection from "./sections/DimaAiSection";
import DimaSuiteSection from "./sections/DimaSuiteSection";
import CaseStudiesSection from "./sections/CaseStudiesSection";
import TestimonialSection from "./sections/TestimonialSection";
import QuestionsAnsweredSection from "@/app/[locale]/(home)/sections/QuestionsAnsweredSection";
import type { Metadata } from "next";
import RequestDemoSection from "@/components/shared/form/RequestDemoSection";
import { buildLocalizedMetadata } from "@/lib/seo";

type HomePageProps = {
  params: { locale: string };
};

export async function generateMetadata(
  { params: { locale } }: HomePageProps
): Promise<Metadata> {
  return buildLocalizedMetadata(locale, "Home", {
    overrides: {
      metadataBase: new URL("https://thedar.ai"),
      openGraph: {
        url: "https://thedar.ai",
        siteName: "dima",
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
        canonical: "https://thedar.ai",
        languages: {
          "en-US": "https://thedar.ai/en",
          "ar-SA": "https://thedar.ai/ar"
        }
      },
    },
  });
}

function HomePage() {
  return (
    <main className="h-full">
      <HeroSection />
      <EmpoweringAgenciesSection />
      <OwnConversationSection />
      <DimaAiSection />
      <DimaSuiteSection />
      <CaseStudiesSection />
      <TestimonialSection />
      <RequestDemoSection />
      <QuestionsAnsweredSection />
    </main>
  );
}

export default HomePage;