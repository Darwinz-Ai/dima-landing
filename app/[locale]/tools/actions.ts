"use server";
import { analyzeDialectVertex } from "@/lib/flows/analyzeArabicDialectVertex";
import { analyzeKeywordsVertex } from "@/lib/flows/analyzeArabicKeywordsVertex";
import { getPostHogClient } from "@/lib/posthog-server";

// Arabic Dialect
export async function analyzeDialect(text: string, dialect: string, language: "en" | "ar") {
    if (!text || !dialect || !language) {
        throw new Error("Text, dialect and language are required");
    }

    try {
        const analysis = await analyzeDialectVertex({ text, dialect, language });
        const posthog = getPostHogClient();
        posthog.capture({
            distinctId: "anonymous",
            event: "arabic_dialect_analysis_requested",
            properties: {
                dialect,
                language,
                text_length: text.length,
                source: "server_action",
            },
        });
        return analysis;
    } catch (err) {
        console.error("Dialect analysis error:", err);
        throw new Error("AI analysis failed");
    }
}

// Arabic coverage
export async function analyzeKeywords(keywords: string[], countries: string[]) {
    try {
        const result = await analyzeKeywordsVertex({ keywords, countries });
        const posthog = getPostHogClient();
        posthog.capture({
            distinctId: "anonymous",
            event: "arabic_coverage_analysis_requested",
            properties: {
                keyword_count: keywords.length,
                country_count: countries.length,
                countries,
                source: "server_action",
            },
        });
        return result;
    } catch (err) {
        console.error("AI error:", err);
        throw new Error("AI processing failed");
    }
}
