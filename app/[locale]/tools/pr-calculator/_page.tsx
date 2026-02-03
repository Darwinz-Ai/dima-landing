"use client";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { PRCalculator } from "./components/PRCalculator";
import { useTranslations } from "use-intl";

function PrCalculator() {
    const t = useTranslations("Tools.pr-calculator");
    return (
        <main>
            <SectionWrapper className="min-h-dvh">
                <div className="container mx-auto max-w-6xl mt-24">
                    {/* Main Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {t("description")}
                        </p>
                    </div>

                    {/* Calculator Component */}
                    <PRCalculator />

                    {/* Developer Notes */}
                    <div className="mt-12 p-6 bg-muted/50 rounded-lg border border-border">
                        <h3 className="text-lg font-semibold mb-3 text-foreground">
                            Developer Integration Notes
                        </h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                                <span className="font-semibold text-foreground">TODO:</span> Replace MOCK_PUBLICATIONS in PRCalculator.tsx with actual API endpoint
                            </p>
                            <p>
                                <span className="font-semibold text-foreground">TODO:</span> Implement backend API call for fetching publications list
                            </p>
                            <p>
                                <span className="font-semibold text-foreground">TODO:</span> Implement backend API call for saving custom publications
                            </p>
                            <p className="pt-2 italic">
                                All calculation logic is already implemented. The component will automatically calculate Reach and AVE based on the formulas provided.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}

export default PrCalculator;