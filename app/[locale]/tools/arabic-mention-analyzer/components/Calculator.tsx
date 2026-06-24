"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CONSTANTS = {
  TOOL_ACCURACY: {
    brandwatch: 0.35,
    talkwalker: 0.40,
    meltwater: 0.38,
    other: 0.30,
  },
  PLATFORM_MULTIPLIER: {
    twitter: 1.2,
    instagram: 1.0,
    facebook: 0.9,
    tiktok: 1.3,
    mixed: 1.1,
    other: 1.0,
  },
  SECTOR_RISK: {
    finance: 1.5,
    healthcare: 1.4,
    retail: 1.2,
    government: 1.6,
    other: 1.0
  }
}

interface CalculatorResults {
  missedMentions: number;
  sentimentSkew: number;
  riskAdjustedCost: number;
}

const Calculator = () => {
  const [platform, setPlatform] = useState("");
  const [arabicContent, setArabicContent] = useState("");
  const [currentTool, setCurrentTool] = useState("");
  const [sector, setSector] = useState("");
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const t = useTranslations("Tools.arabic-mention-analyzer");

  const platformMixLabels = (t.raw("input.platformMix.values") as string[]) ?? [];
  const toolLabels = (t.raw("input.currentTools.values") as string[]) ?? [];
  const sectorLabels = (t.raw("input.sector.values") as string[]) ?? [];
  const whoBenefitsCards =
    (t.raw("whoBenefits.cards") as { role: string; description: string }[]) ?? [];

  const platformOptions = [
    { value: "twitter", label: platformMixLabels[0] ?? "Twitter/X" },
    { value: "instagram", label: platformMixLabels[1] ?? "Instagram" },
    { value: "facebook", label: platformMixLabels[2] ?? "Facebook" },
    { value: "tiktok", label: platformMixLabels[3] ?? "TikTok" },
    { value: "mixed", label: platformMixLabels[4] ?? "Mixed Platforms" },
    { value: "other", label: platformMixLabels[5] ?? "Other" },
  ];

  const toolOptions = [
    { value: "brandwatch", label: toolLabels[0] ?? "Brandwatch" },
    { value: "talkwalker", label: toolLabels[1] ?? "Talkwalker" },
    { value: "meltwater", label: toolLabels[2] ?? "Meltwater" },
    { value: "other", label: toolLabels[3] ?? "Other" },
  ];

  const sectorOptions = [
    { value: "finance", label: sectorLabels[0] ?? "Finance" },
    { value: "healthcare", label: sectorLabels[1] ?? "Healthcare" },
    { value: "retail", label: sectorLabels[2] ?? "Retail" },
    { value: "government", label: sectorLabels[3] ?? "Government" },
    { value: "other", label: sectorLabels[4] ?? "Other" },
  ];

  const calculateResults = (e: React.FormEvent) => {
    e.preventDefault();
    const arabicPercent = parseFloat(arabicContent) || 0;

    // Calculation logic based on tool accuracy and Arabic content
    const toolAccuracy = currentTool === "brandwatch" ? CONSTANTS.TOOL_ACCURACY.brandwatch :
      currentTool === "talkwalker" ? CONSTANTS.TOOL_ACCURACY.talkwalker :
        currentTool === "meltwater" ? CONSTANTS.TOOL_ACCURACY.meltwater : CONSTANTS.TOOL_ACCURACY.other;

    const platformMultiplier = platform === "twitter" ? CONSTANTS.PLATFORM_MULTIPLIER.twitter :
      platform === "instagram" ? CONSTANTS.PLATFORM_MULTIPLIER.instagram :
        platform === "facebook" ? CONSTANTS.PLATFORM_MULTIPLIER.facebook :
          platform === "tiktok" ? CONSTANTS.PLATFORM_MULTIPLIER.tiktok :
            platform === "mixed" ? CONSTANTS.PLATFORM_MULTIPLIER.mixed : CONSTANTS.PLATFORM_MULTIPLIER.other;

    const sectorRisk = sector === "finance" ? CONSTANTS.SECTOR_RISK.finance :
      sector === "healthcare" ? CONSTANTS.SECTOR_RISK.healthcare :
        sector === "retail" ? CONSTANTS.SECTOR_RISK.retail :
          sector === "government" ? CONSTANTS.SECTOR_RISK.government : CONSTANTS.SECTOR_RISK.other;

    const missedMentions = Math.round((arabicPercent / 100) * (1 - toolAccuracy) * 10000 * platformMultiplier);
    const sentimentSkew = Math.round((1 - toolAccuracy) * 100 * 0.7);
    const riskAdjustedCost = Math.round(missedMentions * sectorRisk * 0.5);

    setResults({
      missedMentions,
      sentimentSkew,
      riskAdjustedCost,
    });
  };

  const handleReset = () => {
    setPlatform("");
    setArabicContent("");
    setCurrentTool("");
    setSector("");
    setResults(null);
  };


  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 bg-card border-2 flex">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">{t("input.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("input.description")}</p>
          </div>

          <form className="space-y-5 flex-1 flex flex-col justify-center" onSubmit={calculateResults}>
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-base font-medium">
                {t("input.platformMix.title")}
              </Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="platform" className="h-12 w-full">
                  <SelectValue placeholder={t("input.platformMix.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arabic-content" className="text-base font-medium">
                {t("input.arabicContent.title")}
              </Label>
              <Input
                id="arabic-content"
                type="number"
                placeholder={t("input.arabicContent.placeholder")}
                value={arabicContent}
                onChange={(e) => setArabicContent(e.target.value)}
                className="h-12"
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-tool" className="text-base font-medium">
                {t("input.currentTools.title")}
              </Label>
              <Select value={currentTool} onValueChange={setCurrentTool}>
                <SelectTrigger id="current-tool" className="h-12 w-full">
                  <SelectValue placeholder={t("input.currentTools.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {toolOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector" className="text-base font-medium">
                {t("input.sector.title")}
              </Label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger id="sector" className="h-12 w-full">
                  <SelectValue placeholder={t("input.sector.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {sectorOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                disabled={!platform || !arabicContent || !currentTool || !sector}
                className="flex-1 h-12 text-base font-semibold bg-primary! p-2"
                type="submit"
              >
                {t("input.buttons.calculate")}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 px-6 font-normal"
                type="reset"
              >
                {t("input.buttons.reset")}
              </Button>
            </div>
          </form>
        </Card>

        <div className="space-y-4">
          <div className="space-y-2 mb-6">
            <h2 className="text-2xl font-semibold text-foreground">{t("results.title")}</h2>
            <p className="text-sm text-muted-foreground">
              {results ? t("results.resultState.description") : t("results.emptyState.description")}
            </p>
          </div>

          {results ? (
            <div className="space-y-4">
              {/* Missed Mentions */}
              <Card className="p-6 bg-linear-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {t("results.resultState.missedMentions.title")}
                  </p>
                  <p className="text-5xl font-bold text-primary">
                    {results.missedMentions.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("results.resultState.missedMentions.description")}
                  </p>
                </div>
              </Card>

              {/* Sentiment Skew */}
              <Card className="p-6 bg-linear-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {t("results.resultState.sentimentSkew.title")}
                  </p>
                  <p className="text-5xl font-bold text-primary">
                    {results.sentimentSkew}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("results.resultState.sentimentSkew.description")}
                  </p>
                </div>
              </Card>

              {/* Risk-adjusted Cost */}
              <Card className="p-6 bg-linear-to-br from-destructive/10 to-destructive/5 border-2 border-destructive/20">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {t("results.resultState.riskCost.title")}
                  </p>
                  <p className="text-5xl font-bold text-destructive">
                    ${results.riskAdjustedCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("results.resultState.riskCost.description")}
                  </p>
                </div>
              </Card>

              <div className="mt-6 p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-foreground font-medium">
                  💡 <span className="font-semibold">{t("results.resultState.businessImpact.label")}:</span>{" "}
                  {t("results.resultState.businessImpact.text", { arabicContent })}
                </p>
              </div>
            </div>
          ) : (
            <Card className="p-12 flex items-center justify-center border-2 border-dashed min-h-[400px]">
              <div className="text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <svg
                    className="w-10 h-10 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground text-lg font-medium">
                  {t("results.emptyState.placeholder")}
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <Card className="p-6 bg-muted/30">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{t("whoBenefits.title")}</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {whoBenefitsCards.map((card) => (
              <div key={card.role} className="space-y-1">
                <p className="font-semibold text-primary">{card.role}</p>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="p-8 bg-linear-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">{t("closeGap.title")}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("closeGap.description")}</p>
          <a
            href="https://thedar.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            {t("closeGap.learnMore")}
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Calculator;
