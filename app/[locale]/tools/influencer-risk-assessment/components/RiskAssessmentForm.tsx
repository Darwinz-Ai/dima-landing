"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Shield } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";


interface RiskResult {
  category: string;
  status: "low" | "medium" | "high";
  message: string;
}

export const RiskAssessmentForm = () => {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<RiskResult[] | null>([{
    category: "test",
    status: "low",
    message: "message"
  }]);
  const t = useTranslations("Tools.influencer-risk-assessment.riskAssessment");

  const analyzeInfluencer = async () => {
    if (!username.trim() || !platform.trim()) {
      toast.error("Missing Information", {
        description: "Please enter both username and platform",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    // try {
    //   const { data, error } = await supabase.functions.invoke('analyze-influencer', {
    //     body: { username: username.trim(), platform: platform.trim() }
    //   });

    //   if (error) {
    //     throw new Error(error.message || 'Analysis failed');
    //   }

    //   if (!data || !data.results) {
    //     throw new Error('Invalid response from analysis service');
    //   }

    //   setResults(data.results);

    //   toast("Analysis Complete", {
    //     description: "Risk assessment has been generated successfully",
    //   });

    // } catch (error) {

    //   const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    //   if (errorMessage.includes('429') || errorMessage.includes('limit')) {
    //     toast.error("Rate Limit Reached", {
    //       description: "Analysis limit reached. Please try again later.",
    //     });
    //   } else if (errorMessage.includes('402') || errorMessage.includes('credits')) {
    //     toast.error("Service Unavailable", {
    //       description: "AI service requires additional credits. Please try again later.",
    //     });
    //   } else {
    //     toast.error("Analysis Failed", {
    //       description: "Unable to complete the analysis. Please check your inputs and try again.",
    //     });
    //   }
    // } finally {
    //   setIsAnalyzing(false);
    // }
  };

  const getRiskColor = (status: "low" | "medium" | "high") => {
    switch (status) {
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const getRiskIcon = (status: "low" | "medium" | "high") => {
    switch (status) {
      case "low":
        return <CheckCircle className="min-h-5 min-w-5 text-green-600" />;
      case "medium":
        return <Shield className="min-h-5 min-w-5 text-yellow-600" />;
      case "high":
        return <AlertCircle className="min-h-5 min-w-5 text-red-600" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t("cardTitle")}</CardTitle>
          <CardDescription className="text-base">
            {t("cardDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">{t("fields.username.label")}</Label>
              <Input
                id="username"
                placeholder={t("fields.username.placeholder")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-base">{t("fields.platform.label")}</Label>
              <Input
                id="platform"
                placeholder={t("fields.platform.placeholder")}
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
          <Button
            onClick={analyzeInfluencer}
            disabled={isAnalyzing || !username.trim() || !platform.trim()}
            className="w-full h-12 text-base font-semibold bg-primary px-2"
            size="lg"
          >
            {isAnalyzing ? t("analyzing") : t("run")}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{t("resultTitle")}</h2>
          <div className="grid gap-4">
            {results.map((result, index) => (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        {getRiskIcon(result.status)}
                        <h3 className="font-semibold text-lg">{result.category}</h3>
                      </div>
                      <p className="text-muted-foreground">{result.message}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getRiskColor(result.status)} px-4 py-1.5 text-sm font-semibold`}
                    >
                      {result.status.toUpperCase()} {t("risk")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-2 bg-accent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="min-h-6 min-w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("assessmentSummary.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("assessmentSummary.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <h3 className="font-semibold text-lg">{t("dima.title")}</h3>
                <p className="text-muted-foreground">
                  {t("dima.description")}
                </p>
                <Button
                  asChild
                  className="mt-4 px-4"
                >
                  <a
                    href="https://thedar.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("dima.explore")}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
