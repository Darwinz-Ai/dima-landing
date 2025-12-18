import Image from "next/image";
import Calculator from "./components/Calculator";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lost Mentions & Missed Sentiment Calculator - dima Tool",
    description:
        "Estimate how many Arabic posts are being missed or misclassified with current tooling using dima's Lost Mentions & Missed Sentiment Calculator.",

    openGraph: {
        title: "Lost Mentions & Missed Sentiment Calculator - dima Tool",
        description:
            "Use dima's Lost Mentions & Missed Sentiment Calculator to identify Arabic social media posts that are missed or misclassified by your current monitoring tools.",
        url: "https://thedar.ai/tools/arabic-mention-analyzer",
        siteName: "dima",
        type: "website",
        images: [
            {
                url: "/og/tools/lost-mentions.png",
                width: 1200,
                height: 630,
                alt: "Lost Mentions & Missed Sentiment Calculator OG Image",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Lost Mentions & Missed Sentiment Calculator - dima Tool",
        description:
            "Estimate missed or misclassified Arabic posts with dima's Lost Mentions & Missed Sentiment Calculator.",
        images: ["/og/tools/lost-mentions.png"],
    },

    alternates: {
        canonical: "https://thedar.ai/tools/arabic-mention-analyzer",
    },
};


function ArabicMentionAnalyzerPage() {
    return (
        <SectionWrapper className="min-h-dvh mt-24">
            <div className="max-w-7xl mx-auto space-y-12">
                <figure className="flex justify-center">
                    <Image
                        src="/dima-logo/dima-logo.png"
                        alt="dima"
                        width={200}
                        height={60}
                        className="h-12 md:h-14 w-auto"
                        unoptimized={true}
                    />
                </figure>

                <Calculator />
            </div>
        </SectionWrapper>
    );
}

export default ArabicMentionAnalyzerPage;