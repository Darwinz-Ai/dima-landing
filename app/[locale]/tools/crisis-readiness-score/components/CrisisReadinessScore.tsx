"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { IconDownload, IconCircleCheck, IconCircleX, IconExternalLink } from "@tabler/icons-react";
import { jsPDF } from "jspdf";
import { useTranslations } from "next-intl";


interface Question {
    id: string;
    category: string;
    text: string;
    type: "boolean" | "slider";
    weight: number;
}

const questions: Question[] = [
    // Crisis Detection (25%)
    { id: "q1", category: "crisisDetection", text: "q1", type: "boolean", weight: 8.33 },
    { id: "q2", category: "crisisDetection", text: "q2", type: "boolean", weight: 8.33 },
    { id: "q3", category: "crisisDetection", text: "q3", type: "slider", weight: 8.34 },

    // Escalation Speed (25%)
    { id: "q5", category: "escalationSpeed", text: "q5", type: "boolean", weight: 8.33 },
    { id: "q6", category: "escalationSpeed", text: "q6", type: "boolean", weight: 8.33 },
    { id: "q7", category: "escalationSpeed", text: "q7", type: "slider", weight: 8.34 },

    // Channel Coverage (25%)
    { id: "q9", category: "channelCoverage", text: "q9", type: "boolean", weight: 8.33 },
    { id: "q10", category: "channelCoverage", text: "q10", type: "boolean", weight: 8.33 },
    { id: "q11", category: "channelCoverage", text: "q11", type: "slider", weight: 8.34 },

    // Arabic Sentiment Accuracy (25%)
    { id: "q13", category: "arabicSentiment", text: "q13", type: "boolean", weight: 8.33 },
    { id: "q14", category: "arabicSentiment", text: "q14", type: "boolean", weight: 8.33 },
    { id: "q15", category: "arabicSentiment", text: "q15", type: "slider", weight: 8.34 },
];

const CrisisReadinessScore = () => {
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const t = useTranslations("Tools.crisis-readiness-score");
    // Initialize slider questions with default value of 50
    useEffect(() => {
        const sliderDefaults: Record<string, number> = {};
        questions.forEach(q => {
            if (q.type === "slider") {
                sliderDefaults[q.id] = 50;
            }
        });
        setAnswers(sliderDefaults);
    }, []);

    const handleBooleanAnswer = (questionId: string, value: boolean) => {
        setAnswers(prev => ({ ...prev, [questionId]: value ? 100 : 0 }));
    };

    const handleSliderAnswer = (questionId: string, value: number[]) => {
        setAnswers(prev => ({ ...prev, [questionId]: value[0] }));
    };

    const calculateScore = () => {
        let totalScore = 0;
        questions.forEach(q => {
            const answer = answers[q.id] ?? 0;
            totalScore += (answer / 100) * q.weight;
        });
        return Math.round(totalScore);
    };

    const calculateCategoryScore = (category: string) => {
        const categoryQuestions = questions.filter(q => q.category === category);
        let categoryScore = 0;
        categoryQuestions.forEach(q => {
            const answer = answers[q.id] ?? 0;
            categoryScore += (answer / 100) * q.weight;
        });
        return Math.round(categoryScore);
    };

    const getScoreColor = (score: number) => {
        if (score >= 75) return "hsl(var(--success))";
        if (score >= 50) return "hsl(var(--warning))";
        return "hsl(var(--error))";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 75) return t('scoreLabels.strong');
        if (score >= 50) return t('scoreLabels.moderate');
        return t('scoreLabels.needsImprovement');
    };

    const handleSubmit = () => {
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const downloadActionPlan = () => {
        const score = calculateScore();
        const categoryKeys = ["crisisDetection", "escalationSpeed", "channelCoverage", "arabicSentiment"];

        const pdf = new jsPDF();
        const pageWidth = pdf.internal.pageSize.getWidth();
        let yPosition = 20;

        // Header
        pdf.setFillColor(0, 188, 212); // Cyan color
        pdf.rect(0, 0, pageWidth, 30, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(22);
        pdf.setFont("geist", 'bold');
        pdf.text(t('pdf.title'), pageWidth / 2, 15, { align: 'center' });
        pdf.setFontSize(12);
        pdf.text(t('pdf.actionPlan'), pageWidth / 2, 22, { align: 'center' });

        yPosition = 45;
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);
        pdf.text(`${t('pdf.generated')} ${new Date().toLocaleDateString()}`, 20, yPosition);

        // Overall Score
        yPosition += 15;
        pdf.setFontSize(16);
        pdf.setFont("geist", 'bold');
        pdf.text(t('pdf.overallScore'), 20, yPosition);

        yPosition += 10;
        pdf.setFontSize(32);
        const scoreColor = score >= 75 ? [76, 175, 80] : score >= 50 ? [255, 152, 0] : [244, 67, 54];
        pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
        pdf.text(`${score}/100`, 20, yPosition);
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.text(`- ${getScoreLabel(score)}`, 50, yPosition);

        // Category Breakdown
        yPosition += 20;
        pdf.setFontSize(16);
        pdf.setFont("geist", 'bold');
        pdf.text(t('pdf.categoryBreakdown'), 20, yPosition);
        pdf.setFont("geist", 'normal');

        categoryKeys.forEach(categoryKey => {
            const categoryLabel = t(`questions.${categoryKey}.category`);
            const catScore = calculateCategoryScore(categoryKey);
            yPosition += 12;

            if (yPosition > 270) {
                pdf.addPage();
                yPosition = 20;
            }

            pdf.setFontSize(12);
            pdf.setFont("geist", 'bold');
            pdf.text(`${categoryLabel}:`, 20, yPosition);

            const catScoreColor = catScore * 4 >= 75 ? [76, 175, 80] : catScore * 4 >= 50 ? [255, 152, 0] : [244, 67, 54];
            pdf.setTextColor(catScoreColor[0], catScoreColor[1], catScoreColor[2]);
            pdf.text(`${catScore}/25`, 80, yPosition);
            pdf.setTextColor(0, 0, 0);
            pdf.setFont("geist", 'normal');
            pdf.text(`- ${getScoreLabel(catScore * 4)}`, 100, yPosition);

            const categoryQuestions = questions.filter(q => q.category === categoryKey);
            categoryQuestions.forEach(q => {
                const answer = answers[q.id] ?? 0;
                if (answer < 100) {
                    yPosition += 7;
                    if (yPosition > 270) {
                        pdf.addPage();
                        yPosition = 20;
                    }
                    pdf.setFontSize(9);
                    pdf.setTextColor(150, 150, 150);
                    pdf.text(`• ${t(`questions.${categoryKey}.${q.id}`)}`, 25, yPosition);
                    pdf.setTextColor(0, 0, 0);
                }
            });
        });

        // Recommended Actions
        if (score < 75) {
            yPosition += 15;
            if (yPosition > 250) {
                pdf.addPage();
                yPosition = 20;
            }

            pdf.setFontSize(16);
            pdf.setFont("geist", 'bold');
            pdf.text(t('pdf.recommendedActions'), 20, yPosition);
            pdf.setFont("geist", 'normal');

            const actions = [
                t('pdf.action1'),
                t('pdf.action2'),
                t('pdf.action3'),
                t('pdf.action4'),
                t('pdf.action5')
            ];

            actions.forEach((action, index) => {
                yPosition += 10;
                if (yPosition > 270) {
                    pdf.addPage();
                    yPosition = 20;
                }
                pdf.setFontSize(10);
                pdf.text(`${index + 1}. ${action}`, 20, yPosition);
            });
        }

        // Footer
        yPosition += 20;
        if (yPosition > 260) {
            pdf.addPage();
            yPosition = 20;
        }
        pdf.setFillColor(0, 188, 212);
        pdf.rect(0, yPosition, pageWidth, 20, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.text(t('pdf.footer'), pageWidth / 2, yPosition + 10, { align: 'center' });
        pdf.text('thedar.ai', pageWidth / 2, yPosition + 15, { align: 'center' });

        pdf.save('crisis-readiness-action-plan.pdf');
    };

    const totalScore = calculateScore();
    const categoryKeys = ["crisisDetection", "escalationSpeed", "channelCoverage", "arabicSentiment"];

    return (
        <div className="max-w-4xl mx-auto">
            {showResults ? (
                /* Results View */
                <div className="space-y-8">
                    <Card className="p-8 border-2 border-primary">
                        <h1 className="text-4xl font-bold text-center mb-2">{t('resultsView.scoreTitle')}</h1>
                        <div className="flex items-center justify-center gap-4 my-8">
                            <div className="text-7xl font-bold" style={{ color: getScoreColor(totalScore) }}>
                                {totalScore}
                            </div>
                            <div className="text-2xl text-muted-foreground">/100</div>
                        </div>
                        <p className="text-center text-xl text-muted-foreground mb-6">{getScoreLabel(totalScore)}</p>
                        <Progress value={totalScore} className="h-3" />
                    </Card>

                    {/* Category Heatmap */}
                    <Card className="p-8">
                        <h2 className="text-2xl font-bold mb-6">{t('resultsView.gapAnalysis')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {categoryKeys.map(categoryKey => {
                                const score = calculateCategoryScore(categoryKey);
                                return (
                                    <div key={categoryKey} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold">{t(`questions.${categoryKey}.category`)}</h3>
                                            <span className="text-lg font-bold" style={{ color: getScoreColor(score * 4) }}>
                                                {score}/25
                                            </span>
                                        </div>
                                        <Progress value={(score / 25) * 100} className="h-2" />
                                        <p className="text-sm text-muted-foreground">{getScoreLabel(score * 4)}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Action Items */}
                    <Card className="p-8">
                        <h2 className="text-2xl font-bold mb-6">{t('resultsView.priorityActions')}</h2>
                        <div className="space-y-4">
                            {questions
                                .filter(q => (answers[q.id] ?? 0) < 100)
                                .slice(0, 5)
                                .map(q => (
                                    <div key={q.id} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                                        <IconCircleX className="w-5 h-5 text-error mt-0.5 shrink-0" />
                                        <div>
                                            <p className="font-medium">{t(`questions.${q.category}.category`)}</p>
                                            <p className="text-sm text-muted-foreground">{t(`questions.${q.category}.${q.id}`)}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </Card>

                    {/* Download / Retake buttons */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Button onClick={downloadActionPlan} size="lg" className="gap-2">
                            <IconDownload className="w-5 h-5" />
                            {t('buttons.download')}
                        </Button>
                        <Button onClick={() => setShowResults(false)} variant="outline" size="lg">
                            {t('buttons.retake')}
                        </Button>
                    </div>

                    {/* Dima Value Proposition */}
                    <Card className="p-8 bg-primary/5 border-primary/20 mt-8">
                        <div className="text-center space-y-4">
                            <h3 className="text-2xl font-bold text-primary">{t('dimaValueProp.title')}</h3>
                            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t('dimaValueProp.description')}</p>
                            <div className="pt-4">
                                <Button asChild size="lg" className="gap-2">
                                    <a href="https://thedar.ai/" target="_blank" rel="noopener noreferrer">
                                        {t('buttons.learnMore')}
                                        <IconExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            ) : (
                /* Assessment View */
                <div className="space-y-8">
                    <Card className="p-8">
                        <div className="space-y-8">
                            {categoryKeys.map((categoryKey, catIndex) => (
                                <div key={categoryKey} className="space-y-6">
                                    <h2 className="text-2xl font-bold text-primary border-b-2 border-primary pb-2">
                                        {catIndex + 1}. {t(`questions.${categoryKey}.category`)}
                                    </h2>
                                    {questions
                                        .filter(q => q.category === categoryKey)
                                        .map((question, qIndex) => (
                                            <div key={question.id} className="space-y-3 pl-4">
                                                <label className="text-lg font-medium block">
                                                    {catIndex + 1}.{qIndex + 1} {t(`questions.${categoryKey}.${question.id}`)}
                                                </label>
                                                {question.type === "boolean" ? (
                                                    <div className="flex gap-4">
                                                        <Button
                                                            type="button"
                                                            variant={answers[question.id] === 100 ? "questionDefault" : "questionOutline"}
                                                            onClick={() => handleBooleanAnswer(question.id, true)}
                                                            className={`flex-1 gap-2 ${answers[question.id] === 100}`}
                                                        >
                                                            <IconCircleCheck className="w-4 h-4" />
                                                            {t('buttons.yes')}
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            variant={answers[question.id] === 0 ? "questionDefault" : "questionOutline"}
                                                            onClick={() => handleBooleanAnswer(question.id, false)}
                                                            className={`flex-1 gap-2 ${answers[question.id] === 100}`}
                                                        >
                                                            <IconCircleX className="w-4 h-4" />
                                                            {t('buttons.no')}
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <Slider
                                                            value={[answers[question.id] ?? 50]}
                                                            onValueChange={(value) => handleSliderAnswer(question.id, value)}
                                                            max={100}
                                                            step={10}
                                                            className="py-4"
                                                        />
                                                        <div className="flex justify-between text-sm text-muted-foreground">
                                                            <span>{t('buttons.poor')}</span>
                                                            <span>{t('buttons.excellent')}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex justify-center">
                        <Button
                            onClick={handleSubmit}
                            size="lg"
                            disabled={Object.keys(answers).length < questions.length}
                            className="px-12 bg-primary!"
                        >
                            {t('buttons.calculate')}
                        </Button>
                    </div>
                    {Object.keys(answers).length < questions.length && (
                        <p className="text-center text-sm text-muted-foreground">
                            {t('resultsView.pleaseAnswerAll')}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CrisisReadinessScore;
