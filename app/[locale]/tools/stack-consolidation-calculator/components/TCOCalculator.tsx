"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface CalculatorInputs {
  currentVendors: number;
  licenseCost: number;
  userCount: number;
  reportingHours: number;
  hourlyRate: number;
}

interface CalculatorResults {
  currentAnnualCost: number;
  manualHoursCost: number;
  totalCurrentCost: number;
  consolidatedCost: number;
  annualSavings: number;
  breakEvenMonths: number;
  savingsPercentage: number;
}

export const TCOCalculator = () => {
  const t = useTranslations("Tools.stack-consolidation-calculator");

  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentVendors: 3,
    licenseCost: 50000,
    userCount: 10,
    reportingHours: 20,
    hourlyRate: 75,
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
  };

  const calculateTCO = (e: React.FormEvent) => {
    e.preventDefault();

    // Current stack costs
    const currentAnnualCost = inputs.licenseCost * inputs.currentVendors;
    const manualHoursCost = inputs.reportingHours * 52 * inputs.hourlyRate;
    const totalCurrentCost = currentAnnualCost + manualHoursCost;

    // Consolidated solution (estimated 60% of current cost with no manual hours)
    const consolidatedCost = inputs.licenseCost * 0.6;
    const annualSavings = totalCurrentCost - consolidatedCost;
    const savingsPercentage = (annualSavings / totalCurrentCost) * 100;
    const breakEvenMonths = consolidatedCost / (annualSavings / 12);

    setResults({
      currentAnnualCost,
      manualHoursCost,
      totalCurrentCost,
      consolidatedCost,
      annualSavings,
      breakEvenMonths,
      savingsPercentage,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const resetForm = () => {
    setResults(null);
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="/dima-logo.svg"
            alt="dima"
            width={200}
            height={60}
            className="h-12 md:h-14 w-auto"
            quality={90}
          />
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-8 self-start">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t('form.title')}
            </h2>
            <form className="space-y-6" onSubmit={calculateTCO}>
              {/* Number of current vendors */}
              <div>
                <Label htmlFor="vendors" className="text-base font-medium">
                  {t('form.vendors.label')}
                </Label>
                <Input
                  id="vendors"
                  type="number"
                  min="1"
                  max="20"
                  value={inputs.currentVendors}
                  onChange={(e) => handleInputChange("currentVendors", e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {t('form.vendors.help')}
                </p>
              </div>

              {/* Average annual license cost per vendor */}
              <div>
                <Label htmlFor="license" className="text-base font-medium">
                  {t('form.license.label')}
                </Label>
                <Input
                  id="license"
                  type="number"
                  min="0"
                  max="1000000"
                  value={inputs.licenseCost}
                  onChange={(e) => handleInputChange("licenseCost", e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {t('form.license.help')}
                </p>
              </div>

              {/* Number of users */}
              <div>
                <Label htmlFor="users" className="text-base font-medium">
                  {t('form.users.label')}
                </Label>
                <Input
                  id="users"
                  type="number"
                  min="1"
                  max="100"
                  value={inputs.userCount}
                  onChange={(e) => handleInputChange("userCount", e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Weekly manual reporting hours */}
              <div>
                <Label htmlFor="hours" className="text-base font-medium">
                  {t('form.hours.label')}
                </Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max={"168"}
                  value={inputs.reportingHours}
                  onChange={(e) => handleInputChange("reportingHours", e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {t('form.hours.help')}
                </p>
              </div>

              <div>
                <Label htmlFor="rate" className="text-base font-medium">
                  {t('form.rate.label')}
                </Label>
                <Input
                  id="rate"
                  type="number"
                  min="0"
                  value={inputs.hourlyRate}
                  onChange={(e) => handleInputChange("hourlyRate", e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button
                className="w-full text-lg py-6 bg-primary!"
                size="lg"
                type="submit"
              >
                {t('buttons.calculate')}
              </Button>
              <Button
                className="w-full text-lg py-6"
                size="lg"
                type="reset"
                variant={"outline"}
                onClick={resetForm}
              >
                {t('buttons.reset')}
              </Button>
            </form>
          </Card>

          {/* Results */}
          {results ? (
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('results.title')}
              </h2>
              <div className="space-y-6">
                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('results.currentAnnualCost')}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatCurrency(results.currentAnnualCost)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('results.currentAnnualCostHelp')}
                  </p>
                </div>

                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('results.manualHoursCost')}
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    {formatCurrency(results.manualHoursCost)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('results.manualHoursCostHelp', { hours: inputs.reportingHours })}
                  </p>
                </div>

                <div className="p-4 bg-card rounded-lg border-2 border-primary/30">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('results.totalCurrentCost')}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(results.totalCurrentCost)}
                  </p>
                </div>

                <div className="h-px bg-border my-4" />

                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('results.consolidatedCost')}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(results.consolidatedCost)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('results.consolidatedCostHelp')}
                  </p>
                </div>

                <div className="p-6 bg-primary text-primary-foreground rounded-lg">
                  <p className="text-sm opacity-90 mb-2">{t('results.annualSavings')}</p>
                  <p className="text-4xl font-bold mb-2">
                    {formatCurrency(results.annualSavings)}
                  </p>
                  <p className="text-lg opacity-90">
                    {t('results.savingsPercentage', { pct: results.savingsPercentage.toFixed(1) })}
                  </p>
                </div>

                <div className="p-4 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t('results.breakEven')}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {results.breakEvenMonths.toFixed(1)} {t('results.breakEvenMonthsUnit')}
                  </p>
                </div>

                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t('additional.title')}
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-1">
                      <span className="text-primary mr-2">✓</span>
                      <span>{t('additional.benefit1')}</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-primary mr-2">✓</span>
                      <span>{t('additional.benefit2')}</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-primary mr-2">✓</span>
                      <span>{t('additional.benefit3')}</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-primary mr-2">✓</span>
                      <span>{t('additional.benefit4')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 flex items-center justify-center min-h-[600px] bg-muted/30">
              <div className="text-center">
                <p className="text-xl text-muted-foreground">
                  {t('emptyState')}
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {t('footerNote')}
          </p>
        </div>

        {/* Dima Value Proposition */}
        {results && (
          <div className="mt-16 text-center">
            <Card className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('dima.title')}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t('dima.description')}
              </p>
              <div className="flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary!"
                >
                  <a href="https://thedar.ai/" target="_blank" rel="noopener noreferrer">
                    {t('dima.learnMore')}
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
